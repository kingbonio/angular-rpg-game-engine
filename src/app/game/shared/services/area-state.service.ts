import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IAreaElement, IGridReferences } from '../../area/interfaces';
import { Character } from '../../character-classes/character';
import { ElementClass } from '../enums';
import { IAreaStateData, ILocation } from '../interfaces';
import locationDefaults from '../models/locations';

@Injectable()
export class AreaStateService implements OnInit {
  // Stores the location ID
  public currentArea: number;
  public newArea: number;
  public loadingPreviousArea = false;
  public loadingExistingArea = false;
  public loadingSavedGame = false;
  public locationKeys: any;
  public locations: IGridReferences;
  public previousPlayerLocation: string;
  public huntingList = [];

  public areaChange: BehaviorSubject<number>;
  public areaReady: BehaviorSubject<number>;

  constructor(
  ) {
    this.setDefaults();

    // TODO: Maybe we should have a generic area which has properties of
    // puzzle, enemy, design, potential items etc.
    this.areaChange = new BehaviorSubject(1);
    this.areaReady = new BehaviorSubject(1);
  }

  ngOnInit() {
  }

  get playerLocation(): string {

    // TODO Potentially worth rewriting
    for (const gridLocation in this.locations) {
      if (this.locations.hasOwnProperty(gridLocation) &&
        this.locations[gridLocation].element &&
        this.locations[gridLocation].element.type &&
        (this.locations[gridLocation].element.type === ElementClass.player)) {
        return gridLocation;
      }
    }
  }

  public removeCharacterFromHuntingList(character: Character): void {

    const index = this.huntingList.indexOf(character.id);

    if (index !== -1) {
      // Remove the item from the hunting list
      this.huntingList.splice(index, 1);
    }
  }

  public addCharacterToHuntingList(character: Character): void {

    if (this.huntingList.indexOf(character.id) === -1) {

      // Add the character to the hunting list
      this.huntingList.push(character.id);
    }
  }

  /**
   * Push all characters on grid into an array and return it
   */
  // TODO return type as interface
  public getCharactersOnGrid(): { character: Character, gridLocation: string }[] {
    const characterData = [];
    for (const gridLocation in this.locations) {
      if (this.locations.hasOwnProperty(gridLocation) &&
        this.locations[gridLocation].element &&
        this.locations[gridLocation].element.type &&
        (this.locations[gridLocation].element.type === ElementClass.enemy || this.locations[gridLocation].element.type === ElementClass.npc) &&
        !this.locations[gridLocation].element.isDead()) {
        const gridElement = this.locations[gridLocation].element;
        if (gridElement.type && (gridElement.type === ElementClass.enemy || gridElement.type === ElementClass.npc)) {
          characterData.push({
            character: gridElement,
            gridLocation
          });
        }
      }
    }
    return characterData;
  }

  public isCharacterNextToPlayer(gridLocation: string): boolean {
    const playerCoordinates = this.splitLocationReference(this.playerLocation);
    const characterCoordinates = this.splitLocationReference(gridLocation);
    const distanceFromPlayerCoordinates = this.getDistanceBetweenLocations(playerCoordinates, characterCoordinates);
    // Positive differences should be 0 and 1
    if (Math.abs(distanceFromPlayerCoordinates.xDistance) + Math.abs(distanceFromPlayerCoordinates.yDistance) === 1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Returns a positive or negative value for both x and y distances to target location
   * @param currentLocation The location we want the distance to
   * @param targetLocation The location we want the distance from
   */
  public getDistanceBetweenLocations(currentLocation: ILocation, targetLocation: ILocation): { yDistance: number, xDistance: number } {
    const differenceBetweenY = targetLocation.locationY.charCodeAt(0) - currentLocation.locationY.charCodeAt(0);
    const differenceBetweenX = currentLocation.locationX - targetLocation.locationX;
    return { yDistance: differenceBetweenY, xDistance: differenceBetweenX };
  }

  /**
   * Checks whether the location on the grid exists and can be moved into
   * @param location the grid reference for the location
   */
  public isLocationFree(location: string): boolean {
    return (this.locations[location] && !this.locations[location].element);
  }

  public repositionCharacter(newLocation: string, currentLocation: string) {

    this.locations[newLocation].element = this.locations[currentLocation].element;
    this.locations[currentLocation].element = null;

  }

  public movePlayer(newLocation: string) {
    if (newLocation !== this.playerLocation) {

      this.repositionCharacter(newLocation, this.playerLocation);
    }
  }

  public removeElementFromArea(target: IAreaElement, location: string) {
    this.locations[location].element = null;
  }

  public splitLocationReference(gridLocation: string): ILocation {
    return {
      locationY: gridLocation[0],
      locationX: Number(gridLocation[1]),
    };
  }

  public notifyAreaChange() {
    // Let the area state service handle the death of the component
    this.areaReady.next(this.newArea);
  }

  public updateLocation() {
    this.currentArea = this.newArea;
    this.newArea = null;
  }

  // TODO This isn't great, redo this
  /**
   * Backs up current location state, loads the new one and emits event to notify listeners
   * @param newAreaReference The target are to pull data for
   */
  public loadNewArea(newAreaReference: number) {
    this.loadingPreviousArea = true;
    // Back up current state
    this.saveAreaState(this.currentArea);
    // Save the new area reference
    this.newArea = newAreaReference;

    this.previousPlayerLocation = this.playerLocation;

    const targetAreaData = this.getAreaState(newAreaReference);
    if (targetAreaData) {
      this.loadingExistingArea = true;
      // Reset the locations to be the stored data
      this.locations = targetAreaData;
    } else {
      // Reset the locations to blank
      this.locations = this.cloneLocations(locationDefaults);
    }

    // TODO this isn't ideal really, look for the other subject type
    this.areaChange.next(newAreaReference ? newAreaReference : this.currentArea);

    // Update the location
    this.currentArea = this.newArea;
    this.newArea = null;
  }

  public loadFromSaveGame(savedState: IAreaStateData) {
    this.loadingExistingArea = true;

    this.areaChange.next(savedState.currentLocation);
    this.areaReady.next(savedState.currentLocation);
  }

  /**
   * Reset all local parameters to default
   */
  public setDefaults() {
    this.currentArea = 1;
    this.newArea = null;
    this.locations = this.cloneLocations(locationDefaults);
    this.locationKeys = Object.keys;
    this.loadingPreviousArea = false;
    this.loadingExistingArea = false;
    this.loadingSavedGame = false;
    this.previousPlayerLocation = null;
    this.huntingList = [];
  }

  /**
   * Save the area state to storage
   * @param newAreaReference the area number
   */
  public saveAreaState(newAreaReference: number) {
    localStorage.setItem(newAreaReference.toString(), JSON.stringify(this.locations));
  }

  /**
   * Get the area from storage
   * @param newAreaReference the area number
   */
  public getAreaState(newAreaReference: number): any | null {
    const stateJson = localStorage.getItem(newAreaReference.toString());
    if (stateJson && stateJson.length && stateJson !== "{}") {
      return JSON.parse(stateJson);
    } else {
      return null;
    }
  }

  private cloneLocations(sourceLocations) {
    return JSON.parse(JSON.stringify(sourceLocations));
  }

  /**
   * Return the area state for storage
   * @returns the state data relevant to this service
   * @returns the state data relevant to this service
   */
  public gatherState(): IAreaStateData {
    return {
      currentLocation: this.currentArea,
      newLocation: this.newArea,
      loadingArea: this.loadingPreviousArea,
      loadingExistingArea: this.loadingExistingArea,
      locationKeys: this.locationKeys,
      locations: this.locations,
      previousPlayerLocation: this.previousPlayerLocation,
    };
  }

  /**
   * Applies state data to this service
   * @param newState settings from storage to push to this state service
   */
  public applyState(newState: IAreaStateData): void {
    for (const stateSetting in newState) {
      if (newState.hasOwnProperty(stateSetting)) {
        this[stateSetting] = newState[stateSetting];
      }
    }
  }
}

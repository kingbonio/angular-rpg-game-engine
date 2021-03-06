import { Component } from '@angular/core';
import { Character } from '../../../character-classes/character';
import { Direction } from '../../enums';
import { ILocation, ILocationData } from '../../interfaces';
import { AreaStateService } from '../../services/area-state.service';
import { GridHelper } from '../area/grid-helper';
import { Dice } from '../dice';
import { PathfindingComponent } from './pathfinding/pathfinding.component';
import { GameSettingsService } from '../../../../shared/services/game-settings.service';

@Component({
    selector: 'app-movement',
    template: '',
})
export class MovementComponent {

    constructor(
        private areaStateService: AreaStateService,
        private pathfinding: PathfindingComponent
    ) { }

    /**
     * Return the locations the character can see at any time
     *
     * @param {number} viewDistance How many squares out the character can see
     * @param {Direction} direction Which way the character is facing
     * @param {string} gridLocation The current location of the character
     *
     * @returns {string[]}
     */
    public getViewAreaLocations(viewDistance: number, direction: Direction, gridLocation: string): string[] {
        const gridReferences = [];
        const splitLocation = this.areaStateService.splitLocationReference(gridLocation);

        // TODO Only catering for 1 view distance at the moment
        let location: string;
        switch (direction) {

            case Direction.N:

                // Get first location
                location = GridHelper.nextYReference(splitLocation.locationY) + GridHelper.previousXReference(splitLocation.locationX);
                gridReferences.push(location);

                // Get second location
                location = GridHelper.nextYReference(splitLocation.locationY) + splitLocation.locationX;
                gridReferences.push(location);

                // Get third location
                location = GridHelper.nextYReference(splitLocation.locationY) + GridHelper.nextXReference(splitLocation.locationX);
                gridReferences.push(location);

                break;
            case Direction.E:

                // Get first location
                location = GridHelper.nextYReference(splitLocation.locationY) + GridHelper.nextXReference(splitLocation.locationX);
                gridReferences.push(location);

                // Get second location
                location = splitLocation.locationY + GridHelper.nextXReference(splitLocation.locationX);
                gridReferences.push(location);

                // Get third location
                location = GridHelper.previousYReference(splitLocation.locationY) + GridHelper.nextXReference(splitLocation.locationX);
                gridReferences.push(location);

                break;
            case Direction.S:

                // Get first location
                location = GridHelper.previousYReference(splitLocation.locationY) + GridHelper.nextXReference(splitLocation.locationX);
                gridReferences.push(location);

                // Get second location
                location = GridHelper.previousYReference(splitLocation.locationY) + splitLocation.locationX;
                gridReferences.push(location);

                // Get third location
                location = GridHelper.previousYReference(splitLocation.locationY) + GridHelper.previousXReference(splitLocation.locationX);
                gridReferences.push(location);

                break;
            case Direction.W:

                // Get first location
                location = GridHelper.previousYReference(splitLocation.locationY) + GridHelper.previousXReference(splitLocation.locationX);
                gridReferences.push(location);

                // Get second location
                location = splitLocation.locationY + GridHelper.previousXReference(splitLocation.locationX);
                gridReferences.push(location);

                // Get third location
                location = GridHelper.nextYReference(splitLocation.locationY) + GridHelper.previousXReference(splitLocation.locationX);
                gridReferences.push(location);

                break;
            default:

            // Do nothing
        }

        return gridReferences;
    }

    /**
     * Try a random direction then move to that location, if it's blocked, try the other 3 directions or do nothing
     *
     * @param {Character} character The character we want to wander
     * @param {string} currentLocation The character's current location
     */
    public wander(character: Character, currentLocation: string): void {

        // Break out of this action if moving action is currently underway
        if (this.areaStateService.locations[currentLocation].element.isMovingForwards) {

            return;
        }

        const directionDiceRoll = Dice.roll1d4();

        let direction: Direction = GridHelper.getDirectionFromNumber(directionDiceRoll);

        let currentLocationDetails = this.areaStateService.splitLocationReference(currentLocation);

        let targetLocationDetails = GridHelper.getNextLocation(currentLocationDetails.locationY, currentLocationDetails.locationX, direction, this.areaStateService.locations);

        if (targetLocationDetails && targetLocationDetails.isLocationFree) {
            const targetLocation = targetLocationDetails.locationY + targetLocationDetails.locationX;
            this.areaStateService.locations[currentLocation].element.direction = direction;

            this.moveCharacterWithAnimation(currentLocationDetails, targetLocationDetails);
        } else {

            // Select a direction to move
            for (let i = 1; i < 4; i++) {

                if (i === directionDiceRoll) {
                    continue;
                }

                direction = GridHelper.getDirectionFromNumber(i);

                currentLocationDetails = this.areaStateService.splitLocationReference(currentLocation);

                targetLocationDetails = GridHelper.getNextLocation(currentLocationDetails.locationY, currentLocationDetails.locationX, direction, this.areaStateService.locations);

                if (targetLocationDetails && targetLocationDetails.isLocationFree) {
                    this.areaStateService.locations[currentLocation].element.direction = direction;

                    this.moveCharacterWithAnimation(currentLocationDetails, targetLocationDetails);

                    return;
                }
            }
        }

        // Do nothing
        return;
    }

    /**
     * Cycle through the direction of patrol for character
     * Only move if the next location is free
     *
     * @param {Character} character The character we're moving
     * @param {string} gridLocation The starting location of the character
     *
     * @returns {ILocationData}
     */
    public walkRoute(character: Character, gridLocation: string): ILocationData {

        // Break out of this action if moving action is currently underway
        if (this.areaStateService.locations[gridLocation].element.isMovingForwards) {

            return;
        }

        if (character.directionsForPatrol.length) {
            const routeIndex = character.currentPositionInRoute;
            const splitLocation = this.areaStateService.splitLocationReference(gridLocation);
            const direction = character.directionsForPatrol[character.currentPositionInRoute];
            const newLocation = GridHelper.getNextLocation(splitLocation.locationY, splitLocation.locationX, direction, this.areaStateService.locations);

            // Call the character's move method
            if (newLocation && newLocation.isLocationFree) {

                this.moveCharacterWithAnimation(splitLocation, newLocation);

                if (routeIndex >= (character.directionsForPatrol.length - 1)) {
                    character.currentPositionInRoute = 0;
                } else {
                    character.currentPositionInRoute++;
                }

                // Cycle back around if we're at the end of the route
                const previousDirection = character.currentPositionInRoute === 0 ?
                    character.directionsForPatrol[character.directionsForPatrol.length - 1] :
                    character.directionsForPatrol[character.currentPositionInRoute - 1];

                character.direction = previousDirection;
            } else {
                character.direction = character.directionsForPatrol[character.currentPositionInRoute];
            }

            // Character has moved to new location, return the new location data
            return newLocation;

        } else {

            return;
        }
    }

    /**
     * If direction is available move the character towards the player's location
     *
     * @param {Character} character The character that we will be moving
     * @param {string} characterLocation The current location of the character
     * @param {string} targetLocation The target location of the character
     * @param {boolean} moveTowardsLocation Whether to more towards or away from target location
     */
    public moveCharacterToLocation(character: Character, characterLocation: string, targetLocation: string, moveTowardsLocation = true): void {

        // Break out of this action if moving action is currently underway
        if (this.areaStateService.locations[characterLocation].element.isMovingForwards) {

            return;
        }

        const splitNewLocation: ILocation = this.areaStateService.splitLocationReference(targetLocation);
        const splitCharacterLocation: ILocation = this.areaStateService.splitLocationReference(characterLocation);

        // Get and apply the direction to face
        const furthestDirectionToPlayer = this.getDirectionWithRespectToLocation(splitNewLocation, splitCharacterLocation, moveTowardsLocation);
        this.areaStateService.locations[characterLocation].element.direction = furthestDirectionToPlayer;
        const targetLocationDetails = GridHelper.getNextLocation(splitCharacterLocation.locationY, splitCharacterLocation.locationX, furthestDirectionToPlayer, this.areaStateService.locations);

        // If the target location is free, move into it
        if (targetLocationDetails && targetLocationDetails.isLocationFree) {
            const targetLocationCoords = targetLocationDetails.locationY + targetLocationDetails.locationX;

            this.moveCharacterWithAnimation(splitCharacterLocation, targetLocationDetails);
        }
    }

    /**
     * Starts animations for movement and moves character
     *
     * @param {ILocation} splitCharacterLocation The starting location of the character
     * @param {ILocation} targetLocationDetails The location we're moving the character to
     */
    public moveCharacterWithAnimation(splitCharacterLocation: ILocation, targetLocationDetails: ILocation): void {
        this.beginCharacterMovementAnimation(splitCharacterLocation, targetLocationDetails);
        this.areaStateService.repositionGridElement(targetLocationDetails.locationY + targetLocationDetails.locationX, splitCharacterLocation.locationY + splitCharacterLocation.locationX);
    }

    /**
     * Start the movement of a character by duplicating character into target location,
     * Set character to animate,
     * Remove the character reference from the previous location
     *
     * @param {ILocation} characterLocation The location of the character
     * @param {function} additionalWork The function used to callback once animation is complete
     */
    public beginCharacterMovementAnimation(characterLocation: ILocation, additionalWork?: any): void {

        // Call the character's move method
        this.areaStateService.locations[characterLocation.locationY + characterLocation.locationX].element.moveForwards(() => {

            // Perform any extra work that needs to be enacted in the callback
            if (typeof additionalWork === "function") {
                additionalWork();
            }
        });
    }

    /**
     * Get the path to the target location and make the first step towards it if possible
     *
     * @param {Character} character The character that we will be moving
     * @param {string} characterLocation The current location of the character in question
     * @param {string} targetLocation The location we're moving the character towards
     */
    public moveTowardsLocation(character: Character, characterLocation: string, targetLocation: string): void {

        // If we can't get there there's no point in trying
        if (!this.areaStateService.isLocationFree(targetLocation)) {

            return;
        }

        const splitCurrentLocation = this.areaStateService.splitLocationReference(characterLocation);

        const splitNewLocation = this.areaStateService.splitLocationReference(targetLocation);

        character.currentPathToDestination = this.pathfinding.getShortestPath(splitCurrentLocation, splitNewLocation, this.areaStateService.locations);

        if (!character.currentPathToDestination || !character.currentPathToDestination.length) {

            // Ranmdoly move if target cannot be gotten to
            this.wander(character, characterLocation);

            return;
        }

        // Get the next target location
        const nextPathfindingLocation = character.currentPathToDestination[0];

        // Walk the path
        this.moveCharacterToLocation(character, characterLocation, nextPathfindingLocation, true);
    }

    /**
     * Get the path to the player location and make the first step towards it
     *
     * @param {Character} character The character that will be moving
     * @param {string} characterLocation The current location of the character
     */
    public moveTowardsPlayer(character: Character, characterLocation: string): void {
        const playerLocation = this.areaStateService.playerLocation;

        const splitCurrentLocation = this.areaStateService.splitLocationReference(characterLocation);

        const splitNewLocation = this.areaStateService.splitLocationReference(playerLocation);

        character.currentPathToDestination = this.pathfinding.getShortestPath(splitCurrentLocation, splitNewLocation, this.areaStateService.locations);

        if (!character.currentPathToDestination || !character.currentPathToDestination.length) {

            return;
        }

        // Get the next target location
        const nextPathfindingLocation = character.currentPathToDestination[0];

        this.moveTowardsLocation(character, characterLocation, nextPathfindingLocation);
    }

    /**
     * Returns the best direction towards or away from the a new location
     *
     * @param {ILocation} newLocation The location we're referencing the direction to
     * @param {ILocation} currentLocation The current location of the character to change direction
     * @param {boolean} towardsLocation Whether to get direction towards or away from new location
     *
     * @returns {Direction}
     */
    public getDirectionWithRespectToLocation(newLocation: ILocation, currentLocation: ILocation, towardsLocation: boolean): Direction {
        const distanceData = this.areaStateService.getDistanceBetweenLocations(newLocation, currentLocation);

        // Calculate which direction is furthest
        if (Math.abs(distanceData.yDistance) >= Math.abs(distanceData.xDistance)) {

            // Move vertically
            if (distanceData.yDistance >= 0) {

                return towardsLocation ? Direction.S : Direction.N;
            } else {

                return towardsLocation ? Direction.N : Direction.S;
            }
        } else {

            // Move horizontally
            if (distanceData.xDistance >= 0) {

                return towardsLocation ? Direction.E : Direction.W;
            } else {

                return towardsLocation ? Direction.W : Direction.E;
            }
        }
    }

    /**
     * Moves a character away from a selected location
     *
     * @param {Character} character The character we want to move
     * @param {ILocation} characterLocation The starting location of the character
     * @param {ILocation} locationToAvoid The location with which we move away from
     */
    public moveAwayFromLocation(character: Character, characterLocation: ILocation, locationToAvoid: ILocation): void {
        const directionToNewLocation = this.getDirectionWithRespectToLocation(locationToAvoid, characterLocation, false);

        character.direction = directionToNewLocation;

        const newLocation = GridHelper.getNextLocation(characterLocation.locationY, characterLocation.locationX, directionToNewLocation, this.areaStateService.locations);

        if (newLocation.isLocationFree) {
            this.moveCharacterWithAnimation(characterLocation, newLocation);
        }

        return;
    }
}

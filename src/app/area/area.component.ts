import { Component, OnInit } from '@angular/core';
import { AreaStateService } from '../shared/services/area-state.service';
import { IInventoryItem, IMonster } from '../shared/interfaces';
import { IAreaElement, IGridReferences, IPuzzle } from './interfaces';
import { copyConfig } from '@angular/router/src/config';
import { ILevelData } from './interfaces/ilevel-data';
import { AreaType } from './enums/area-type';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  private items: IInventoryItem[];
  private monsters: IMonster[];
  private puzzle: IPuzzle;
  private isStart: boolean;
  private isEnd: boolean;
  private locations: IGridReferences;

  constructor(public areaStateService: AreaStateService) {
    // TODO: Maybe we should have a generic area which has properties of
    // puzzle, enemy, design, potential items etc.
  }

  ngOnInit() {
    // Build the area
    // Set Items first

  }

  private addElementsToGrid(element: IAreaElement): void {
    // Check element's preferred grid reference and attempt to add it there
    const gridReference = element.startingPositionX + element.startingPositionY;
    if (!this.locations[gridReference]) {
      this.locations[gridReference] = element;
    } else {
      // TODO: Move them to another position, up to x amount (need to block overcrowding)
    }
  }

  /**
   * Allows the area component to collect data from the level received by the router
   * @returns The details about the level
   */
  public getCurrentLevelData(): ILevelData {
    // TODO: Dummy return data for now
    return {
      name: "test level",
      width: 6,
      height: 6,
      type: AreaType.puzzle
    } as ILevelData;
  }

}

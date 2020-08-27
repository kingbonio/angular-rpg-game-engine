import { IInventoryItem } from "../../item/interfaces";
import { Direction, ElementClass, ObjectType } from "../../shared/enums";
import { SoundEffects } from "../../../shared/enums";
import inventoryLocationsDefaults from "../../shared/models/inventoryLocations";

export class GridObject {
      public type = ElementClass.object;
      public name: string;
      public imageFileName: string;
      public soundEffect: SoundEffects;
      public canBeTraversed: boolean;
      public isInteractive: boolean;
      public isLocked: boolean;
      public lockedDialogue: string;
      public itemReferenceNeeded: string;
      public direction: Direction;
      public startingDirection: Direction;
      public loot: IInventoryItem[] = [];
      public objectType: ObjectType;

      public inventoryLocations: any;
      public locationKeys: any;

      constructor(elementProperties: any) {
            this.inventoryLocations = elementProperties.inventoryLocations || this.cloneInventoryLocations(inventoryLocationsDefaults);
            this.locationKeys = Object.keys;

            this.name = elementProperties.name;
            this.imageFileName = elementProperties.imageFileName;
            this.soundEffect = elementProperties.soundEffect;
            this.canBeTraversed = elementProperties.canBeTraversed;
            this.isInteractive = elementProperties.isInteractive;
            this.direction = elementProperties.startingDirection;
            this.startingDirection = elementProperties.startingDirection;
            this.isLocked = elementProperties.isLocked;
            this.lockedDialogue = elementProperties.lockedDialogue;
            this.itemReferenceNeeded = elementProperties.itemReferenceNeeded;
            this.loot = elementProperties.loot;
            this.objectType = elementProperties.objectType;

            // Overwrite existing inventoryLocations if provided
            if (elementProperties.inventoryLocations) {
                  this.inventoryLocations = elementProperties.inventoryLocations;
            } else if (this.loot && this.loot.length) {
                  elementProperties.loot.forEach((item: IInventoryItem) => {
                        for (const slot in this.inventoryLocations) {
                              if (this.inventoryLocations.hasOwnProperty(slot) && !this.inventoryLocations[slot]) {
                                    this.inventoryLocations[slot] = item;
                                    return;
                              }
                        }
                  });
            }
      }

      public unlock(item: IInventoryItem) {
            if (this.isLocked) {
                  if (item.itemReference && (item.itemReference === this.itemReferenceNeeded)) {
                        this.isLocked = false;
                  }
            } else {
                  this.isLocked = false;
            }
      }

      public cloneInventoryLocations(sourceInventoryLocations) {
            return JSON.parse(JSON.stringify(sourceInventoryLocations));
      }
}

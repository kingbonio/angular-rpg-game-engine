import { IAreaElement } from "../../game/area/interfaces";
import { IWeaponSlots } from "../../game/item/interfaces";
import { CharacterState, Direction, ElementClass, ObjectType } from "../../game/shared/enums";
import { armour, keyItems, potions, weapons } from "../items";
import { player } from "../characters";
import { BackgroundMusic } from "../../shared/enums";

export default {
    room: 4,
    backgroundMusic: BackgroundMusic.gameMusic,
    floorImageFileName: "grass.png",
    areaVisited: false,
    areaLoadMessage: "Drinking a Buff potion will give you a temporary ability. Use the 5-second Invisibility Potion to get past these guards. You might want to save your game in the Menu (bottom-right button)",
    areaElements: [
        player,
        // Left column
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "bac53a6c-ea18-41e6-a4db-d62bd055aeb0",
                maxHp: 30,
                baseDamage: 2,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Awful Gary",
                startingDirection: Direction.E,
                directionsForPatrol: [
                ],
                maxHuntingDuration: 3,
                startingState: CharacterState.still,
                speechResponse: "I'm gonna kill you",
                sleepResponse: "Zzzzzzzzzzzzzzzz",
                armour: {
                    head: armour.leatherHelmet,
                    arms: null,
                    hands: null,
                    torso: null,
                    legs: null,
                    boots: armour.leatherBoots,
                },
                weapons: {
                    primary: weapons.basicKnife,
                } as IWeaponSlots,
                loot: [
                    weapons.sword,
                ],
                imageFileName: "easy-enemy.png",
                startingLocation: "g3",
            },
            startingPositionY: "g",
            startingPositionX: 3,
        },
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "739bdb36-7cd6-4e69-a176-2ae62f1ed7b0",
                maxHp: 30,
                baseDamage: 2,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Awful Gary",
                startingDirection: Direction.E,
                directionsForPatrol: [
                ],
                maxHuntingDuration: 3,
                startingState: CharacterState.still,
                speechResponse: "I'm gonna kill you",
                sleepResponse: "Zzzzzzzzzzzzzzzz",
                armour: {
                    head: armour.leatherHelmet,
                    arms: null,
                    hands: null,
                    torso: null,
                    legs: null,
                    boots: armour.leatherBoots,
                },
                weapons: {
                    primary: weapons.basicKnife,
                } as IWeaponSlots,
                loot: [
                    potions.smallHealthPotion
                ],
                imageFileName: "easy-enemy.png",
                startingLocation: "f3",
            },
            startingPositionY: "f",
            startingPositionX: 3,
        },
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "b3d7d7b2-c672-48d6-82bd-f28e3863158b",
                maxHp: 30,
                baseDamage: 2,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Awful Gary",
                startingDirection: Direction.E,
                directionsForPatrol: [
                ],
                maxHuntingDuration: 3,
                startingState: CharacterState.still,
                speechResponse: "I'm gonna kill you",
                sleepResponse: "Zzzzzzzzzzzzzzzz",
                armour: {
                    head: armour.leatherHelmet,
                    arms: null,
                    hands: null,
                    torso: null,
                    legs: null,
                    boots: armour.leatherBoots,
                },
                weapons: {
                    primary: weapons.basicKnife,
                } as IWeaponSlots,
                loot: [
                    potions.largeDamageBuff,
                ],
                imageFileName: "easy-enemy.png",
                startingLocation: "e3",
            },
            startingPositionY: "e",
            startingPositionX: 3,
        },
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "b3d7d7b2-c672-4226-82bd-f28g3863158b",
                maxHp: 30,
                baseDamage: 2,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Awful Gary",
                startingDirection: Direction.E,
                directionsForPatrol: [
                ],
                maxHuntingDuration: 3,
                startingState: CharacterState.still,
                speechResponse: "I'm gonna kill you",
                sleepResponse: "Zzzzzzzzzzzzzzzz",
                armour: {
                    head: armour.leatherHelmet,
                    arms: null,
                    hands: null,
                    torso: null,
                    legs: null,
                    boots: armour.leatherBoots,
                },
                weapons: {
                    primary: weapons.basicKnife,
                } as IWeaponSlots,
                loot: [
                    potions.largeDamageBuff,
                ],
                imageFileName: "easy-enemy.png",
                startingLocation: "d3",
            },
            startingPositionY: "d",
            startingPositionX: 3,
        },
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "b3d7d7b2-c672-4226-82bd-f28g386ff58b",
                maxHp: 30,
                baseDamage: 2,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Awful Gary",
                startingDirection: Direction.E,
                directionsForPatrol: [
                ],
                maxHuntingDuration: 3,
                startingState: CharacterState.still,
                speechResponse: "I'm gonna kill you",
                sleepResponse: "Zzzzzzzzzzzzzzzz",
                armour: {
                    head: armour.leatherHelmet,
                    arms: null,
                    hands: null,
                    torso: null,
                    legs: null,
                    boots: armour.leatherBoots,
                },
                weapons: {
                    primary: weapons.basicKnife,
                } as IWeaponSlots,
                loot: [
                    potions.largeDamageBuff,
                ],
                imageFileName: "easy-enemy.png",
                startingLocation: "c3",
            },
            startingPositionY: "c",
            startingPositionX: 3,
        },
        // Right column
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "22adab29-22f8-4cf7-b996-bf98282a144f",
                maxHp: 30,
                baseDamage: 2,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Awful Gary",
                startingDirection: Direction.W,
                directionsForPatrol: [
                ],
                maxHuntingDuration: 3,
                startingState: CharacterState.still,
                speechResponse: "I'm gonna kill you",
                sleepResponse: "Zzzzzzzzzzzzzzzz",
                armour: {
                    head: armour.leatherHelmet,
                    arms: null,
                    hands: null,
                    torso: null,
                    legs: null,
                    boots: armour.leatherBoots,
                },
                weapons: {
                    primary: weapons.basicKnife,
                } as IWeaponSlots,
                loot: [
                    potions.smallArmourBuff
                ],
                imageFileName: "easy-enemy.png",
                startingLocation: "g5",
            },
            startingPositionY: "g",
            startingPositionX: 5,
        },
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "6fa3d2d4-b6d9-4dca-8c29-9778164152e7",
                maxHp: 30,
                baseDamage: 2,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Awful Gary",
                startingDirection: Direction.W,
                patrolArea: true,
                directionsForPatrol: [
                ],
                maxHuntingDuration: 3,
                startingState: CharacterState.still,
                speechResponse: "I'm gonna kill you",
                sleepResponse: "Zzzzzzzzzzzzzzzz",
                armour: {
                    head: armour.leatherHelmet,
                    arms: null,
                    hands: null,
                    torso: null,
                    legs: null,
                    boots: armour.leatherBoots,
                },
                weapons: {
                    primary: weapons.basicKnife,
                } as IWeaponSlots,
                loot: [
                    potions.smallHealthPotion,
                ],
                imageFileName: "easy-enemy.png",
                startingLocation: "f5",
            },
            startingPositionY: "f",
            startingPositionX: 5,
        },
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "89edf110-6545-43bf-82d6-ef3193b9ea4f",
                maxHp: 30,
                baseDamage: 2,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Awful Gary",
                startingDirection: Direction.W,
                directionsForPatrol: [
                ],
                maxHuntingDuration: 3,
                startingState: CharacterState.still,
                speechResponse: "I'm gonna kill you",
                sleepResponse: "Zzzzzzzzzzzzzzzz",
                armour: {
                    head: armour.leatherHelmet,
                    arms: null,
                    hands: null,
                    torso: null,
                    legs: null,
                    boots: armour.leatherBoots,
                },
                weapons: {
                    primary: weapons.basicKnife,
                } as IWeaponSlots,
                loot: [
                ],
                imageFileName: "easy-enemy.png",
                startingLocation: "e5",
            },
            startingPositionY: "e",
            startingPositionX: 5,
        },
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "89edf160-6f45-43bf-82d6-ef3fe3b9ea4f",
                maxHp: 30,
                baseDamage: 2,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Awful Gary",
                startingDirection: Direction.W,
                directionsForPatrol: [
                ],
                maxHuntingDuration: 3,
                startingState: CharacterState.still,
                speechResponse: "I'm gonna kill you",
                sleepResponse: "Zzzzzzzzzzzzzzzz",
                armour: {
                    head: armour.leatherHelmet,
                    arms: null,
                    hands: null,
                    torso: null,
                    legs: null,
                    boots: armour.leatherBoots,
                },
                weapons: {
                    primary: weapons.basicKnife,
                } as IWeaponSlots,
                loot: [
                    weapons.largeAxe,
                ],
                imageFileName: "easy-enemy.png",
                startingLocation: "d5",
            },
            startingPositionY: "d",
            startingPositionX: 5,
        },
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "89edf160-6f45-43bf-8e36-ef3fe3b9ea4f",
                maxHp: 30,
                baseDamage: 2,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Awful Gary",
                startingDirection: Direction.W,
                directionsForPatrol: [
                ],
                maxHuntingDuration: 3,
                startingState: CharacterState.still,
                speechResponse: "I'm gonna kill you",
                sleepResponse: "Zzzzzzzzzzzzzzzz",
                armour: {
                    head: armour.leatherHelmet,
                    arms: null,
                    hands: null,
                    torso: null,
                    legs: null,
                    boots: armour.leatherBoots,
                },
                weapons: {
                    primary: weapons.basicKnife,
                } as IWeaponSlots,
                loot: [
                ],
                imageFileName: "easy-enemy.png",
                startingLocation: "c5",
            },
            startingPositionY: "c",
            startingPositionX: 5,
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Old chest",
                objectType: ObjectType.lootObject,
                startingDirection: Direction.E,
                isInteractive: true,
                isLocked: true,
                itemReferenceNeeded: "b27f504c-4fb4-4855-a4e7-9facbf693c76",
                imageFileName: "old-chest.png",
                soundEffect: "openChest",
                loot: [
                    potions.invisiblityPotion,
                ]
            },
            startingPositionX: 3,
            startingPositionY: "a",
        },
    ] as IAreaElement[]
};

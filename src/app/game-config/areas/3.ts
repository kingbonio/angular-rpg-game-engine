import { IAreaElement } from "../../game/area/interfaces";
import { IWeaponSlots } from "../../game/item/interfaces";
import { CharacterState, Direction, ElementClass, ObjectType } from "../../game/shared/enums";
import { keyItems, potions, weapons } from "../items";
import { player } from "../characters";
import { BackgroundMusic } from "../../shared/enums";

export default {
    room: 3,
    backgroundMusic: BackgroundMusic.gameMusic,
    floorImageFileName: "grass.png",
    areaVisited: false,
    areaLoadMessage: "Try speaking to this Non Player Character using Speak (Q)",
    areaElements: [
        player,
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.E,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 1,
            startingPositionY: "c",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.E,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 2,
            startingPositionY: "c",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.E,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 3,
            startingPositionY: "c",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Door",
                objectType: ObjectType.door,
                startingDirection: Direction.E,
                isInteractive: true,
                isLocked: true,
                itemReferenceNeeded: "64c87a80-4f1a-4dc3-b2c8-c47a9c393f61",
                imageFileName: "door.png",
                soundEffect: "openWoodenDoor",
            },
            startingPositionX: 4,
            startingPositionY: "c",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.E,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 4,
            startingPositionY: "c",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.E,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 5,
            startingPositionY: "c",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.E,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 6,
            startingPositionY: "c",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.E,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 7,
            startingPositionY: "c",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Old chest",
                objectType: ObjectType.lootObject,
                startingDirection: Direction.N,
                isInteractive: true,
                isLocked: true,
                itemReferenceNeeded: "b27f504c-4fb4-4855-a4e7-9facbf693c76",
                imageFileName: "old-chest.png",
                soundEffect: "openChest",
                loot: [
                    weapons.sword,
                    potions.smallHealthPotion,
                ]
            },
            startingPositionX: 1,
            startingPositionY: "d",
        },
        {
            type: ElementClass.npc,
            elementProperties: {
                id: "424745e4-3bfc-452c-8ff6-78c04251a294",
                maxHp: 20,
                baseDamage: 2,
                lowHealthThreshold: 10,
                attackPauseDuration: 2,
                name: "David",
                startingDirection: Direction.W,
                directionsForPatrol: [
                ],
                maxHuntingDuration: 3,
                startingState: CharacterState.still,
                speechResponse: "I have a key to that chest through there, but I'm not going to give it to you!",
                sleepResponse: "Zzzzzzzzzzzzzzzz",
                armour: {
                    head: null,
                    arms: null,
                    hands: null,
                    torso: null,
                    legs: null,
                    boots: null,
                },
                weapons: {
                    primary: weapons.basicKnife,
                } as IWeaponSlots,
                loot: [
                    keyItems.rustyOldKey,
                    potions.smallHealthPotion,
                ],
                imageFileName: "npc.png",
                startingLocation: "a7",
            },
            startingPositionX: 7,
            startingPositionY: "a",
        },
    ] as IAreaElement[]
};

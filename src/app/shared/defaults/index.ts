import { Direction } from '../../game/shared/enums';

export default {
    // Player defaults
    initialPlayerStats: {
        health: 30,
        maxHealth: 50,
        strength: 10,
        dexterity: 10,
        magicka: 10,
        exp: 1,
        imageLocation: 'src/assets/images/player-image.jpg',
        locationX: 2,
        locationY: 'B',
        direction: Direction.N
    },
    playerMultipliers: {
        inventoryStorageMultiplier: 30,
        inventoryCapacityMultiplier: 30,
        levelCalculation: (exp) => {
            return exp / 3000;
        },
        levelStatMultiplier: 1.2,
        stealSuccessRequirement: 2,
    },
    initialAreaSettings: {
        type: 'start'
    },
    dialogue: {
        textOnScreenTimeMultiplier: 200,
        minimumOnScreenTime: 4000,
        nullElementResponse: "There is no response",
        keyItemNotActive: "You have not got the correct active item",
        computerName: "Computer",
        computerCharacterType: "computer",
        maximumMessagesOnScreen: 2,
        attackSuccess: "Your attack hits with damage: ",
        attackFailure: "Your attack fails",
        targetDead: "You have killed ",
        inventoryFull: "Your inventory is full",
        noWeaponEquipped: "You have no weapon equipped to attack with",
        stealAttemptFail: "You failed to steal from the target and you have angered them",
    },
    gameMenu: {
        menuOpenAtLoad: true,
        pages: [
            {
                title: "main",
                settings: [
                    {
                        name: "Example Option",
                        description: "Allows you to pick a setting for game play",
                        type: "checkbox"
                    }
                ]
            }
        ]
    },
    keyMap: {
        // https://keycode.info
        87: { type: "move", direction: "n" },
        68: { type: "move", direction: "e" },
        83: { type: "move", direction: "s" },
        65: { type: "move", direction: "w" },
        38: { type: "direction", direction: "n" },
        39: { type: "direction", direction: "e" },
        40: { type: "direction", direction: "s" },
        37: { type: "direction", direction: "w" },
        32: { type: "interaction", interaction: "attack" },
        17: { type: "interaction", interaction: "guard" },
        69: { type: "interaction", interaction: "interact" },
        81: { type: "interaction", interaction: "speak" },
    }
};

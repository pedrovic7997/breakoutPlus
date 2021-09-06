import "phaser"
import { GameScene } from "./gameScene";
const config: Phaser.Types.Core.GameConfig = {
    title: "Starfall",
    width: 800,
    height: 600,
    parent: "game",
    scene: [GameScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    backgroundColor: "#18216D"
};
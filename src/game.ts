import "phaser"
import { GameScene } from "./gameScene";
import { ScoreScene } from "./scoreScene";
import { WelcomeScene } from "./welcomeScene";

export const config: Phaser.Types.Core.GameConfig = {
    title: "Starfall",
    width: 800,
    height: 600,
    parent: "game",
    scene: [WelcomeScene, GameScene, ScoreScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    backgroundColor: "#18216D"
};

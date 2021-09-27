import "phaser"
import { GameScene } from "./gameScene";
import { ScoreScene } from "./scoreScene";
import { WelcomeScene } from "./welcomeScene";
import { YouLose } from "./YouLose";
import { YouWin } from "./YouWin";

export const config: Phaser.Types.Core.GameConfig = {
    title: "Starfall",
    width: 800,
    height: 600,
    parent: "game",
    scene: [WelcomeScene, GameScene, YouWin, YouLose],
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            debugShowBody: true
        }
    },
    backgroundColor: "#18216D"
};

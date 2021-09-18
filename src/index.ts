import "phaser";
import { config } from "./game";

export class StarfallGame extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}
window.onload = () => {
    var game = new StarfallGame(config);
}

import "phaser";
export class WelcomeScene extends Phaser.Scene {
    title: Phaser.GameObjects.Text;
    hint: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: "WelcomeScene"
        });
    }
    create(): void {
        var titleText: string = "Breakout plus";
        this.title = this.add.text(120, 200, titleText,
            { font: '100px Arial Bold', color: '#FBFBAC' });
        var hintText: string = "Click to start";
        this.hint = this.add.text(320, 350, hintText,
            { font: '24px Arial Bold', color: '#FBFBAC' });
        // const hiscoreValue = localStorage.getItem("Highscore");
        // const hiscoreText: string = `Your highest score is ${hiscoreValue ?? 0}`;
        // this.add.text(130, 450, hiscoreText,
        //     { font: '48px Arial Bold', color: '#FBFBAC' });
        this.input.on('pointerdown', function (/*pointer*/) {
            this.scene.start("GameScene");
        }, this);
    }
};
import "phaser";
export class YouWin extends Phaser.Scene {
    score: number;
    result: Phaser.GameObjects.Text;
    hint: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: "YouWin"
        });
    }
    init(params: {starsCaught: number}): void {
        // this.score = params.starsCaught;
    }
    create(): void {
        var resultText: string = 'You WIN!';
        this.result = this.add.text(150, 250, resultText,
            { font: '100px Arial Bold', color: '#FBFBAC' });
        var hintText: string = "Click to restart";
        this.hint = this.add.text(300, 400, hintText,
            { font: '24px Arial Bold', color: '#FBFBAC' });
        this.input.on('pointerdown', function (/*pointer*/) {
            this.scene.start("WelcomeScene");
        }, this);
        // localStorage.setItem("Highscore", String(this.score));
    }
    resetScore(): void{
        // this.score = 0;
    }
};
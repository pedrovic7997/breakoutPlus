import "phaser";
export class YouLose extends Phaser.Scene {
    score: number;
    result: Phaser.GameObjects.Text;
    hint: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: "YouLose"
        });
    }
    init(params: {starsCaught: number}): void {
        // this.score = params.starsCaught;
    }
    create(): void {
        var resultText: string = 'You LOSE! Dumbfuck...';
        this.result = this.add.text(200, 250, resultText,
            { font: '48px Arial Bold', color: '#FBFBAC' });
        var hintText: string = "Click to restart";
        this.hint = this.add.text(300, 350, hintText,
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
import "phaser";
export class ScoreScene extends Phaser.Scene {
    score: number;
    result: Phaser.GameObjects.Text;
    hint: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: "ScoreScene"
        });
    }
    init(params: {starsCaught: number}): void {
        this.score = params.starsCaught;
    }
    create(): void {
        var resultText: string = 'Your score is ' + this.score + '!';
        this.result = this.add.text(50, 250, resultText,
            { font: '36px Arial Bold', color: '#FBFBAC' });
        var hintText: string = "Click to restart";
        this.hint = this.add.text(300, 350, hintText,
            { font: '24px Arial Bold', color: '#FBFBAC' });
        this.input.on('pointerdown', function (/*pointer*/) {
            this.scene.start("WelcomeScene");
        }, this);
        localStorage.setItem("Highscore", String(this.score));
    }
    resetScore(): void{
        this.score = 0;
    }
};
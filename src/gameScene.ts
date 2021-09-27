import "phaser";
import { GameObjects } from "phaser";
import { ScoreScene } from "./scoreScene";
export class GameScene extends Phaser.Scene {
    ball: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    info: Phaser.GameObjects.Text;
    paddle: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    bricks: Phaser.Types.GameObjects.Group.GroupConfig;
    lives: number;

    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    hitSprite: Phaser.Sound.BaseSound;

    constructor() {
        super({
            key: "GameScene"
        });
    }
    init(params): void {
    }
    preload(): void {
        this.load.image("ball", "assets/image/Shiny_steel_ball.png");
        this.load.svg("paddle", "assets/image/paddle.svg");

        this.load.audio('hit', "assets/audio/hit1 - ball & paddle.mp3");

        this.load.atlas('bricks', 'assets/sprite/bricks-1.png', 'assets/sprite/bricks-1.json');
    }

    create(): void {

        
        this.lives = 3;
        var hpText = "Lives: " + this.lives
        this.info = this.add.text(710, 570, hpText,
            { font: '24px Arial Bold', color: '#FBFBAC' });
        
        //ScoreScene.resetScore();

        this.physics.world.setBoundsCollision(true, true, true, true);

        this.ball = this.physics.add.image(400, 300, 'ball')
            .setCollideWorldBounds(true)
            .setBounce(1);
        this.ball.setScale(0.03);
        this.ball.setVelocity(0, 150);
        this.ball.setMaxVelocity(697);

        this.paddle = this.physics.add.image(400, 500, 'paddle')
          .setCollideWorldBounds(true) // TODO tirar essa colisão, e fazer o paddle aparecer do outro lado
          .setImmovable()
          .setScale(0.5);
        this.paddle.body.setMaxVelocityX(1000);

        const group = this.physics.add.group({
            key: 'bricks',
            frame: [ 0, 1, 2, 3, 4 ],
            frameQuantity: 10,
            bounceX: 1,
            bounceY: 1,
            immovable: true,
            setScale: { x: 0.5,y : 1},
        } as Phaser.Types.GameObjects.Group.GroupConfig) ;

        Phaser.Actions.GridAlign(group.getChildren(), {
            width: 10,
            height: 5,
            cellWidth: 60,
            cellHeight: 30,
            x: 100,
            y: 60
        });

        // for (let i = 0; i < this.bricks.length; i++) {
        //     let brick = this.bricks[i];
        //     brick = this.add.graphics();

        //     const spaceFromBox = 60;
        //     const qtdX = 6;
        //     const qtdY = 4;

        //     const width = this.game.canvas.width - (spaceFromBox * 2);
        //     const height = 30;

        //     const x = i % 6 * width / qtdX + spaceFromBox;
        //     const y = spaceFromBox + Math.floor(i / 6) * height;

        //     // console.log({ x, y, width: width / qtdX, height });

        //     brick.fillRoundedRect(x, y, width / qtdX, height, 5).fillStyle(0xff00ff, 1);
        // }


        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.ball, group, (ball,brick) => {
            brick.destroy();
            if(group.countActive() === 0){
                this.ball.setVelocity(0,0);
                // Fazer outra scene
                this.scene.start("YouWin");
            }
        })

        this.physics.add.collider(this.ball, this.paddle, (ball, paddle) => {
            this.hitSprite.play();

            this.ball.setVelocityX(ball.body.velocity.x + (ball.body.center.x - paddle.body.center.x) * 5);
        });

        // SOUND

        this.hitSprite = this.sound.add('hit');

    }
    update(time: number): void {

        const PADDLE_ACCELERATION = 10000;

        if (this.cursors.right.isDown) {
            this.paddle.body.setAccelerationX(PADDLE_ACCELERATION);
        } else if (this.cursors.left.isDown) {
            this.paddle.body.setAccelerationX(-PADDLE_ACCELERATION);
        } else {
            this.paddle.body.setVelocityX(0);
            this.paddle.body.setAccelerationX(0);
        }
        if (this.ball.body.bottom === 600){
            if (this.lives >= 2) {
                this.lives--;
                var hpText = "Lives: " + this.lives
                this.info.destroy();
                this.info = this.add.text(710, 570, hpText,
                    { font: '24px Arial Bold', color: '#FBFBAC' });
            }
            else {
                // Fazer outra scene
                this.scene.start("YouLose");
            }
            this.resetGame();
        }
    }
    resetGame(): void {
        this.ball.setVelocity(0,0);
        this.ball.setPosition(400, 300);
        this.paddle.setPosition(400, 500);
        //while(true) {
            //if (this.cursors.right.isDown || this.cursors.left.isDown) {
        this.ball.setVelocity(0, 150);
                //break;
            //}
        //}
    }
}

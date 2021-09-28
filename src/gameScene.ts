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
    spaceKey: Phaser.Input.Keyboard.Key;

    hitSprite: Phaser.Sound.BaseSound;

    isPaused: boolean;

    constructor() {
        super({ key: "GameScene" });
    }
    init(params): void {
    }
    preload(): void {
        this.load.image("ball", "assets/image/Shiny_steel_ball.png");
        this.load.image("paddle", "assets/image/paddle.png");

        this.load.audio('hit-paddle', "assets/audio/hit1 - ball & paddle.mp3");
        this.load.audio('hit-brick', "assets/audio/Bonk-AudioTrimmer.com.mp3");

        this.load.image('vitor-lover', 'assets/image/vitor_lover.png');

        this.load.spritesheet('bricks', 'assets/sprite/bricks-1.png',{ frameWidth: 120, frameHeight: 30 });
    }

    create(): void {

        this.add.image(400, 135, 'vitor-lover').setScale(0.4);
        
        this.lives = 3;
        var hpText = "Lives: " + this.lives
        this.info = this.add.text(710, 570, hpText,
            { font: '24px Arial Bold', color: '#FBFBAC' });

        this.physics.world.setBoundsCollision(true, true, true, true);

        this.ball = this.physics.add.image(400, 300, 'ball')
            .setCollideWorldBounds(true)
            .setBounce(1);
        this.ball.setScale(0.03);
        this.ball.setVelocity(0, 225);
        this.ball.setMaxVelocity(697, 697);

        this.paddle = this.physics.add.image(400, 500, 'paddle')
          .setCollideWorldBounds(true)
          .setImmovable()
          .setScale(0.5);
        this.paddle.body.setMaxVelocityX(1000);


        const group = this.physics.add.group({
            key: 'bricks',
            frame: [0, 1, 2, 3, 0, 1],
            frameQuantity: 10,
            bounceX: 1,
            bounceY: 1,
            immovable: true,
            setScale: { x: 0.5,y : 1},
        });


        Phaser.Actions.GridAlign(group.getChildren(), {
            width: 10,
            height: 6,
            cellWidth: 60,
            cellHeight: 30,
            x: 100,
            y: 60
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.ball, group, (ball,brick) => {
            this.sound.add('hit-brick').play();
            brick.destroy();
            if(group.countActive() === 0){
                this.ball.setVelocity(0,0);
                this.ball.setVelocity(0, 225);
                this.scene.start("YouWin");
            }
        })

        this.physics.add.collider(this.ball, this.paddle, (ball, paddle) => {
            this.hitSprite.play();
            this.ball.setVelocityX(ball.body.velocity.x + (ball.body.center.x - paddle.body.center.x) * 5);
        });

        this.spaceKey = this.input.keyboard.addKey('SPACE');

        // SOUND

        this.hitSprite = this.sound.add('hit-paddle');

    }
    update(time: number): void {

        const PADDLE_ACCELERATION = 10000;

        if ((this.spaceKey.isDown || this.cursors.right.isDown || this.cursors.left.isDown) && this.isPaused) {
            this.isPaused = false;
            this.ball.setVelocity(0,225);
        }

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
                const hpText = "Lives: " + this.lives;
                this.info.destroy();
                this.info = this.add.text(710, 570, hpText,
                    { font: '24px Arial Bold', color: '#FBFBAC' });
            }
            else {
                this.scene.start("YouLose");
            }
            this.resetGame();
        }

        this.input.keyboard.on('keyup-END', (/*pointer*/) => {
            this.scene.start("YouWin");
        }, this);
    }
    resetGame(): void {
        this.ball.setVelocity(0,0);
        this.ball.setPosition(400, 300);
        this.paddle.setPosition(400, 500);
        this.isPaused = true;
    }
}

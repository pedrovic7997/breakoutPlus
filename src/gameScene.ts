import "phaser";
import { GameObjects } from "phaser";
export class GameScene extends Phaser.Scene {
    ball: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    info: Phaser.GameObjects.Text;
    paddle: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    bricks = new Array<Phaser.GameObjects.Graphics>(6 * 4);

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

        this.load.atlas('bricks', 'assets/images/bricks.png', 'assets/images/bricks.json');
    }

    create(): void {
        this.physics.world.setBoundsCollision(true, true, true, true);

        this.ball = this.physics.add.image(400, 300, 'ball')
            .setCollideWorldBounds(true)
            .setBounce(1);
        this.ball.setScale(0.05);
        this.ball.setVelocity(0, 150);
        this.ball.setMaxVelocity(697);

        this.paddle = this.physics.add.image(400, 500, 'paddle')
          .setCollideWorldBounds(true) // TODO tirar essa colisão, e fazer o paddle aparecer do outro lado
          .setImmovable()
          .setScale(0.5);
        this.paddle.body.setMaxVelocityX(1000);

        const group = this.add.group(undefined, {
            key: 'bricks',
            frame: [ 0, 1, 2, 3 ],
            frameQuantity: 6,

        });

        Phaser.Actions.GridAlign(group.getChildren(), {
            width: this.game.canvas.width - (2 * 60),
            height: 4 * 30,
            cellWidth: 120,
            cellHeight: 30,
            x: 60,
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

        this.physics.add.collider(this.ball, this.bricks, (ball,brick) => {
            brick.destroy();
            // if
        })
        this.physics.add.collider(this.ball, this.paddle, (ball, paddle) => {
            this.hitSprite.play();

            this.ball.setVelocityX(ball.body.velocity.x + (ball.body.center.x - paddle.body.center.x) * 1.5);
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
    }
}

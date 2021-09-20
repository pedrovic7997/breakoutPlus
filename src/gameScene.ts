import "phaser";
export class GameScene extends Phaser.Scene {
  ball: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  info: Phaser.GameObjects.Text;
  paddle: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

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
  }

  create(): void {
    this.physics.world.setBoundsCollision(true, true, true, true);

    this.ball = this.physics.add.image(400, 300, 'ball')
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.ball.body.bounce.setTo(1, 1);
    this.ball.setScale(0.1);
    this.ball.setVelocity(0, 150);

    this.paddle = this.physics.add.image(400, 500, 'paddle')
      .setCollideWorldBounds(true);
    this.paddle.body.setMaxVelocityX(1000);
    this.paddle.body.setAccelerationY(0);
    this.paddle.body.setMaxVelocityY(0);

    this.cursors = this.input.keyboard.createCursorKeys();

    // SOUND

    this.hitSprite = this.sound.add('hit');
    this.physics.add.existing(this.ball,false);

  }
  update(time: number): void {

    const PADDLE_ACCELERATION = 10000;

    if (this.cursors.right.isDown) {
      // this.paddle.setVelocityX(PADDLE_VELOCITY);
      this.paddle.body.setAccelerationX(PADDLE_ACCELERATION);
    } else if (this.cursors.left.isDown) {
      // this.paddle.setVelocityX(PADDLE_VELOCITY * (-1));
      this.paddle.body.setAccelerationX(-PADDLE_ACCELERATION);
    } else {
      this.paddle.body.setVelocityX(0);
      this.paddle.body.setAccelerationX(0);
    }

    // TODO: PQ A PORRA DA VELOCIDADE DA BOLA REFLETE NO Y TB ?????????
    this.physics.collide(this.ball, this.paddle, (ball, paddle) => {
      this.hitSprite.play();
        if (ball.body.bottom >= paddle.body.top){
          this.ball.body.setVelocityY(-150);
        }
        this.ball.body.setVelocityX(ball.body.velocity.x + (ball.body.center.x - paddle.body.center.x)*1.5);
    });



    // this.ball.body.bounce.set(1, 1);

    // if (this.ball.body.) {
    //   this.ball.setRandomPosition();
    // }
  }
}

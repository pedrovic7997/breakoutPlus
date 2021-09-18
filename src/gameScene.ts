import "phaser"
export class GameScene extends Phaser.Scene {
    delta: number;
    lastStarTime: number;
    starsCaught: number;
    starsFallen: number;
    sand: Phaser.Physics.Arcade.StaticGroup;
    bolota: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    info: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: "GameScene"
        });
    }
    init(params): void {
        this.delta = 1000;
        this.lastStarTime = 0;
        this.starsCaught = 0;
        this.starsFallen = 0;

    }
    preload(): void {
        // this.load.setBaseURL(
        //     "https://raw.githubusercontent.com/mariyadavydova/" +
        //     "starfall-phaser3-typescript/master/"
        // );
        this.load.image("bolota", "assets/image/steel_ball.jfif");
        // this.load.image("sand", "http://d3ugyf2ht6aenh.cloudfront.net/stores/963/751/products/areia_02_150x200h1-cd4184d2702faa4b0a15532063214270-640-0.jpg");
    }

    create(): void {
        this.physics.world.setBoundsCollision(true, true, true, true);

        this.bolota = this.physics.add.image(400, 300, 'bolota').setCollideWorldBounds(true).setBounce(1);
        this.bolota.body.bounce.setTo(1, 1);
        this.bolota.setScale(0.5);
        this.bolota.setVelocity(2000, 3057);

        // this.sand = this.physics.add.staticGroup({
        //     key: 'sand',
        //     frameQuantity: 20
        // });
        // Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
        //     new Phaser.Geom.Line(20, 580, 820, 580));
        // this.sand.refresh();
        // this.info = this.add.text(10, 10, '',
        //     { font: '24px Arial Bold', color: '#FBFBAC' }
        // );
    }
    update(time: number): void {

      // this.bolota.body.bounce.set(1, 1);

        // if (this.bolota.body.) {
        //   this.bolota.setRandomPosition();
        // }
    }
}

import Body from './Body';

export default class Player extends Body {
    constructor(game, size={width: 30, height: 10}, initialPosition) {
        initialPosition = initialPosition || {x: (game.canvas.width / 2) - (size.width / 2), y: game.canvas.height - size.height - 10};

        super(game, size, initialPosition);

        this.speed = 3;
        this.fireDelay = 120;
        this.isFiring = false;
    }

    update() {
        var input = this.game.input;

        if (input.isLeftPressed() && this.position.x > 0) {
            this.position.x -= this.speed;
        }

        if (input.isRightPressed() && this.game.canvas.width > this.position.x + this.size.width) {
            this.position.x += this.speed;
        }
    }
}
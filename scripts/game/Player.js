import Body from './Body';
import Bullet from './Bullet';

/**
 * @class Represents the player on the game screen
 * @extends {Body}
 */
export default class Player extends Body {
    /**
     * Class constructor
     * 
     * @param {Game} game game instance
     * @param {Object} size the size of the body
     * @param {Object} position initial position of the body
     */
    constructor(game, size={width: 30, height: 10}, initialPosition) {
        initialPosition = initialPosition || {x: (game.canvas.width / 2) - (size.width / 2), y: game.canvas.height - size.height - 10};

        super(game, size, initialPosition);

        this.speed = 3;
        this.fireDelay = 120;
        this.isFiring = false;
    }

    /**
     * Updates the body properties on each screen update of the game
     */
    update() {
        let input = this.game.input;

        if (input.isLeftPressed() && this.position.x > 0) {
            this.position.x -= this.speed;
        }

        if (input.isRightPressed() && this.game.canvas.width > this.position.x + this.size.width) {
            this.position.x += this.speed;
        }

        if (input.isActionPressed() && !this.isFiring) {
            this.shoot();
        }
    }

    /**
     * Adds a Bullet body to the game canvas (simulates shooting)
     */
    shoot() {
        this.game.addBody(new Bullet(
            this.game,
            {x: this.position.x + this.size.width / 2, y: this.position.y - 5},
            'up'
        ));

        this.game.playSound('shoot');

        this.isFiring = true;

        setTimeout(function() {
            this.isFiring = false;
        }.bind(this), this.fireDelay);
    }

    /**
     * gets executed when object is destroyed
     */
    onDestroyed() {
        window.alert('Game over! You lost :(');
    }
}
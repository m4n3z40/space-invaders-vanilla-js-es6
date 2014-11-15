/**
 * @class Base class for a game body
 */
export default class Body {
    /**
     * Class constructor
     * 
     * @param {Game} game game instance
     * @param {Object} size the size of the body
     * @param {Object} position initial position of the body
     */
    constructor(game, size, initialPosition) {
        this.game = game;
        this.size = size;
        this.position = initialPosition;
        this.speed = 0;
    }

    /**
     * Loads necessery assets for the body
     */
    load() {

    }

    /**
     * Executed when a collision on this body is reported by the game
     */
    collision() {
        this.onDestroyed();

        this.game.removeBody(this);
    }

    /**
     * Updates the body properties on each screen update of the game
     */
    update() {

    }

    /**
     * draws the body on the game canvas
     */
    draw() {
        this.game.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }

    /**
     * gets executed when body is destroyed by the game
     */
    onDestroyed() {

    }
}
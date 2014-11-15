import Body from './Body';
import Bullet from './Bullet';

/**
 * @class Represents an enemy on the screen
 * @extends {Body}
 */
export default class Enemy extends Body {
	/**
     * Class constructor
     * 
     * @param {Game} game game instance
     * @param {Object} position initial position of the body
     * @param {Object} size the size of the body
     */
	constructor(game, initialPosition, size={width: 15, height: 15}) {
		super(game, size, initialPosition);

		this.patrolX = 0;
		this.speed = 1;
	}

	/**
     * Updates the body properties on each screen update of the game
     */
	update() {
		if (this.patrolX < 0 || this.patrolX > 80) {
            this.speed = -this.speed;
        }

        if (Math.random() > 0.995 && !this.alliedBellow()) {
            this.shoot();
        }

        this.position.x += this.speed;
        this.patrolX += this.speed;
	}

	/**
	 * Indicates if there is as allied bellow
	 * 
	 * @return {boolean}
	 */
	alliedBellow() {
		let invader = this,
			alliesBellow = 0;

        for(let b of this.game.bodies) {
            if (
            	b instanceof Enemy &&
                Math.abs(invader.position.x - b.position.x) < b.size.width &&
                b.position.y > invader.position.y
            ) {
            	alliesBellow++
            }
        }

        return alliesBellow > 0;
	}

	/**
     * Adds a Bullet body to the game canvas (simulates shooting)
     */
	shoot() {
		this.game.addBody(new Bullet(
			this.game, 
			{x: this.position.x + this.size.width / 2, y: this.position.y + this.size.height + 5}
		));
	}

	/**
     * gets executed when object is destroyed
     */
	onDestroyed() {
		let self = this.constructor;

		if (--self.enemiesLeft <= 0) {
            self.onDestroyedAll();
        }

        console.log(self.enemiesLeft);
	}

	/**
	 * Gets executed when all enemies are destroyed
	 * 
	 * @static
	 */
	static onDestroyedAll() {
		window.alert('Game over! YOU WON \\o/');
	}
}
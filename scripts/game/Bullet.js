import Body from './Body';

/**
 * @class Represents a bullet on the screen
 * @extends {Body}
 */
export default class Bullet extends Body {
	/**
	 * Class constructor
	 * 
	 * @param {Game} game game instance
	 * @param {Object} position initial position of the body
	 * @param {string} direction the direction of the gravity of the bullet
	 * @param {Object} size the size of the body
	 */
	constructor(game, initialPosition, direction='down', size={width: 2, height: 5}) {
		super(game, size, initialPosition);

		this.direction = direction;
		this.speed = 5;
	}

	/**
	 * Updates the body properties on each screen update of the game
	 */
	update() {
		this.position.y += this.direction === 'up' ? -this.speed : this.speed;
	}
}
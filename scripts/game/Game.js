import Input from './Input';
import Player from './Player';
import Enemy from './Enemy';

/**
 * @class The game class, everything gets together here
 */
export default class Game {
    /**
     * Class constructor
     * 
     * @param {string} canvasId The id of the canvas element on the page
     * @param {Object} size the canvas size
     */
    constructor(canvasId='gameCanvas', size={width:320, height:480}) {
        let canvas = document.getElementById(canvasId);

        canvas.width = size.width;
        canvas.height = size.height;

        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.input = null;
        this.bodies = new Set;
        this.sounds = new Map;
        this.loaded = false;
    }

    /**
     * Loads all the necessery assets and initial bodies that the games need for it to begin
     */
    load() {
        this.addSound('shoot', document.getElementById('shootSound'));

        this.initPlayer();
        this.initEnemies();

        this.bodies.forEach(body => body.load());

        this.loaded = true;
        console.log('Game loaded.');
    }

    /**
     *  Updates all the bodies properties, reports collisions and collect garbage.
     *  Gets executed on every game loop iteration (24 per second)
     */
    update() {
        this.bodies.forEach(body => body.update());

        this.draw();

        this.reportCollisions();

        this.collectGarbage();

        window.requestAnimationFrame(this.update.bind(this));
    }

    /**
     * Draw all the bodies on the game screen
     * Gets executed on every game loop iteration (24 per second)
     */
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.bodies.forEach(body => body.draw());
    }

    /**
     * Initialize the game loop
     */
    init() {
        this.input = new Input();

        this.load();
        this.update();
        console.log('Game started.');
    }

    /**
     * Adds the player to the body list
     */
    initPlayer() {
        this.addBody(new Player(this));

        console.log('Player added.');
    }

    /**
     * Adds the enemies to de body list
     */
    initEnemies() {
        Enemy.enemiesLeft = 0;

        for(var i = 0; i < 30; i++) {
            this.addBody(new Enemy(this, {
                x: (i % 10) * 25 ,
                y: (i % 3) * 25 + 10
            }));

            Enemy.enemiesLeft++;
        }

        console.log('Enemies added');
    }

    /**
     * Adds a sound asset to the sounds list
     */
    addSound(name, sound) {
        this.sounds.set(name, sound);
    }

    /**
     * Plays a registerd sound
     */
    playSound(name) {
        if (this.sounds.has(name)) {
            this.sounds.get(name).load();
            this.sounds.get(name).play();
        }
    }

    /**
     * Adds a body to the list
     */
    addBody(body) {
        this.bodies.add(body);
    }

    /**
     * Removes a body to the list
     */
    removeBody(body) {
        this.bodies.delete(body);
    }

    /**
     * Removes all the bodies that are not currently visible anymore
     */
    collectGarbage() {
        let canvas = this.canvas,
            aliveBodies = new Set;

        for(let body of this.bodies) {
            if (
                !(body.position.x < -10 ||
                 body.position.x > canvas.width + 10 ||
                 body.position.y < -10 ||
                 body.position.y > canvas.height + 10)
            ) {
                aliveBodies.add(body);
            }
        }

        this.bodies = aliveBodies;
    }

    /**
     * Indicates if a collision has happened between the two bodies
     *
     * @return {boolean}
     */
    bodiesCollided(bodyA, bodyB) {
        return (
            bodyA !== bodyB &&
            bodyA.position.x < bodyB.position.x + bodyB.size.width &&
            bodyA.position.x + bodyA.size.width > bodyB.position.x &&
            bodyA.position.y < bodyB.position.y + bodyB.size.height &&
            bodyA.size.height + bodyA.position.y > bodyB.position.y
        );
    }

    /**
     * Checks if there are any body colliding with each other and reports the collision
     */
    reportCollisions() {
        let total = this.bodies.size,
            bodiesArray = Array.from(this.bodies),
            collidedPairs = new Set;

        for(let i = 0; i < total; i++) {
            for(let j = i + 1; j < total; j++) {
                let bodyA = bodiesArray[i];
                let bodyB = bodiesArray[j];

                if (this.bodiesCollided(bodyA, bodyB)) {
                    collidedPairs.add(bodyA);
                    collidedPairs.add(bodyB);
                }
            }
        }

        collidedPairs.forEach(collidedBody => collidedBody.collision());
    }
}
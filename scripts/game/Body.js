export default class Body {
    constructor(game, size, initialPosition) {
        this.game = game;
        this.size = size;
        this.position = initialPosition;
        this.speed = 0;
    }

    load() {

    }

    collision() {
        this.game.removeBody(this);
        
        this.onDestroyed();
    }

    update() {

    }

    draw() {
        this.game.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }

    onDestroyed() {

    }
}
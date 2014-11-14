 const SPACE = 32,
       LEFT = 37,
       RIGHT = 39;

export default class Input {
    constructor() {
        this.currentKeys = {};

        window.addEventListener('keyup', this.onKeyUp.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    onKeyUp(e) {
        this.currentKeys[e.keyCode] = false;
    }

    onKeyDown(e) {
        this.currentKeys[e.keyCode] = true;
    }

    isLeftPressed() {
        let currKeys = this.currentKeys;

        return LEFT in currKeys && currKeys[LEFT] === true;
    }

    isRightPressed() {
        var currKeys = this.currentKeys;

        return RIGHT in currKeys && currKeys[RIGHT] === true;
    }

    isActionPressed() {
        var currKeys = this.currentKeys;

        return SPACE in currKeys && currKeys[SPACE] === true;
    }
}
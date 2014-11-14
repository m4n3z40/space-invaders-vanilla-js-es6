 const SPACE = 32,
       LEFT = 37,
       RIGHT = 39;

export default class Input {
    constructor() {
        this.currentKeys = new Map;

        window.addEventListener('keyup', this.onKeyUp.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    onKeyUp(e) {
        this.currentKeys.set(e.keyCode, false);
    }

    onKeyDown(e) {
        this.currentKeys.set(e.keyCode, true);
    }

    isLeftPressed() {
        return this.currentKeys.get(LEFT);
    }

    isRightPressed() {
        return this.currentKeys.get(RIGHT);
    }

    isActionPressed() {
        return this.currentKeys.get(SPACE);
    }
}
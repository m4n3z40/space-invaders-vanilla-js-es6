 const SPACE = 32,
       LEFT = 37,
       RIGHT = 39;

/**
 * @class controls the game input from the user
 */
export default class Input {
    /**
     * Class contructor
     */
    constructor() {
        this.currentKeys = new Map;

        window.addEventListener('keyup', this.onKeyUp.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    /**
     * Gets executed when a key is released on the keyboard
     * 
     * @param {Object} e Event object
     */
    onKeyUp(e) {
        this.currentKeys.set(e.keyCode, false);
    }

    /**
     * Gets executed when a key is pressed on the keyboard
     * 
     * @param {Object} e Event object
     */
    onKeyDown(e) {
        this.currentKeys.set(e.keyCode, true);
    }

    /**
     * Indicates if the left key is pressed
     */
    isLeftPressed() {
        return this.currentKeys.get(LEFT);
    }

    /**
     * Indicates if the right key is pressed
     */
    isRightPressed() {
        return this.currentKeys.get(RIGHT);
    }

    /**
     * Indicates if the action key is pressed
     */
    isActionPressed() {
        return this.currentKeys.get(SPACE);
    }
}
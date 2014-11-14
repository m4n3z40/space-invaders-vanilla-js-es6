import Input from './Input';

export default class Game {
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

    load() {

    }

    update() {

    }

    init() {
        this.input = new Input();

        this.load();
        this.update();
        console.log('Game started.');
    }
}
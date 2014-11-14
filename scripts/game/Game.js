import Input from './Input';
import Player from './Player';

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
        this.addSound('shoot', document.getElementById('shootSound'));

        this.initPlayer();

        this.bodies.forEach(body => body.load());

        this.loaded = true;
        console.log('Game loaded.');
    }

    update() {
        this.bodies.forEach(body => body.update());

        this.draw();

        window.requestAnimationFrame(this.update.bind(this));
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.bodies.forEach(body => body.draw());
    }

    init() {
        this.input = new Input();

        this.load();
        this.update();
        console.log('Game started.');
    }

    initPlayer() {
        this.addBody(new Player(this));

        console.log('Player added.');
    }

    addSound(name, sound) {
        this.sounds.set(name, sound);
    }

    playSound(name) {
        if (this.sounds.has(name)) {
            this.sounds.get(name).load();
            this.sounds.get(name).play();
        }
    }

    addBody(body) {
        this.bodies.add(body);
    }

    removeBody(body) {
        this.bodies.delete(body);
    }
}
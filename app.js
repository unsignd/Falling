import { WaveGroup } from './wavegroup.js';
import { Figure } from './figure.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.waveGroup = new WaveGroup();
        this.figure = new Figure();

        const mobile = this.isMobile();

        const startEvt = (mobile) ? 'touchstart' : 'mousedown';
        const moveEvt = (mobile) ? 'touchmove' : 'mousemove';
        const endEvt = (mobile) ? 'touchend' : 'mouseup';

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.addEventListener(moveEvt, this.figure.update, false);
        window.addEventListener(startEvt, this.figure.startClick, false);
        window.addEventListener(endEvt, this.figure.endClick, false);

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.waveGroup.resize(this.stageWidth, this.stageHeight);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.figure.draw(this.ctx);
        this.waveGroup.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this))
    }

    isMobile() {
        if (navigator.userAgent.indexOf('Mobile') != -1) {
            return true;
        } else {
            return false;
        }
    }
}

window.onload = () => {
    new App();
};
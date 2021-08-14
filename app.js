import { WaveGroup } from './wavegroup.js';
import { Figure } from './figure.js';
import { FpsCtrl } from './fpsCtrl.js';

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

        const fpsCtrl = new FpsCtrl(60, this.animate.bind(this));

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.addEventListener(moveEvt, this.figure.update.bind(this.figure), false);
        window.addEventListener(startEvt, this.figure.startClick.bind(this.figure), false);
        window.addEventListener(endEvt, this.figure.endClick.bind(this.figure), false);

        fpsCtrl.start();
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.waveGroup.resize(this.stageWidth, this.stageHeight);
        this.figure.rects = [];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.figure.draw(this.ctx, this.stageHeight);
        this.waveGroup.draw(this.ctx);

        this.animate.bind(this);
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
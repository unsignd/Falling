export class FpsCtrl {
    constructor(fps, callback) {
        this.fps = fps;
        this.callback = callback;
        this.delay = 1000 / fps;
        this.time = null;
        this.frame = -1;
        this.isPlaying = false;
        this.tref;

        this.frameRate = (newfps) => {
            if (!arguments.length) {
                return this.fps;
            }

            this.fps = newfps;
            this.delay = 1000 / this.fps;
            this.frame = -1;
            this.time = null;
        };

        this.start = () => {
            if (!this.isPlaying) {
                this.isPlaying = true;
                this.tref = requestAnimationFrame(this.loop);
            }
        }

        this.pause = () => {
            if (this.isPlaying) {
                cancelAnimationFrame(this.tref);
                this.isPlaying = false;
                this.time = null;
                this.frame = -1;
            }
        }
    }

    loop(timestamp) {
        if (time === null) {
            this.time = timestamp;
        }

        this.seg = Math.floor((timestamp - this.time) / this.delay);

        if (this.seg > this.frame) {
            this.frame = this.seg;
            callback({
                time: timestamp,
                frame: this.frame,
            });
        }

        this.tref = requestAnimationFrame(this.loop);
    }
}
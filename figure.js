export class Figure {
    constructor() {
        this.isClick = false;
        this.sqr = null;

        this.start = {
            x: undefined,
            y: undefined,
        };

        this.end = {
            x: undefined,
            y: undefined,
        };

        this.rects = [];
        this.colorList = [
            'hsl(4, 89%, ',
            'hsl(24, 100%, ',
            'hsl(40, 84%, ',
            'hsl(78, 75%, ',
            'hsl(104, 73%, ',
            'hsl(158, 100%, ',
            'hsl(214, 100%, ',
            'hsl(245, 66%, ',
            'hsl(270, 69%, ',
            'hsl(269, 82%, ',
            'hsl(284, 95%, ',
            'hsl(335, 77%, ',
        ];
        this.prevColor = '';
    }

    update(event) {
        if (navigator.userAgent.indexOf('Mobile') != -1) {
            if (this.isClick) {
                this.start = {
                    x: event.changedTouches[0].clientX,
                    y: event.changedTouches[0].clientY,
                };

                this.isClick = null;
            } 
            
            if (this.isClick !== false) {
                this.end = {
                    x: event.changedTouches[0].clientX,
                    y: event.changedTouches[0].clientY,
                };
            }
        } else {
            if (this.isClick) {
                this.start = {
                    x: event.clientX,
                    y: event.clientY,
                };

                this.isClick = null;
            } 
            
            if (this.isClick !== false) {
                this.end = {
                    x: event.clientX,
                    y: event.clientY,
                };
            }
        }
    }

    startClick() {
        this.isClick = true;
    }

    endClick() {
        this.sqr = this.getSquare(this.start, this.end);
        this.isClick = false;

        while (true) {
            this.color = this.colorList[Math.round(Math.random() * (this.colorList.length - 1))];

            if (this.color !== this.prevColor) {
                this.prevColor = this.color;
                break;
            }
        }

        this.rects.push({
            vt1: {
                x: this.start.x,
                y: this.start.y,
            },
            vt2: {
                x: this.sqr[0].x,
                y: this.sqr[0].y,
            },
            vt3: {
                x: this.sqr[1].x,
                y: this.sqr[1].y,
            },
            vt4: {
                x: this.end.x,
                y: this.end.y,
            },
            speed: Math.random() * 10 + 25,
            defaultSpeed: Math.random() * 2 + 1,

            side: this.getSide(this.start, this.end),

            randomNum: Math.round(Math.random()),

            color: this.color,
            lightness: 60,
        });

        this.start = {
            x: undefined,
            y: undefined,
        };
        this.end = {
            x: undefined,
            y: undefined,
        };
    }

    draw(ctx, stageHeight) {
        this.stageHeight = stageHeight;

        for (let i = 0; i < this.rects.length; i++) {
            this.sqr = this.getSquare(this.rects[i].vt1, this.rects[i].vt4);
            this.lowestY = Math.min(this.rects[i].vt1.y, this.rects[i].vt2.y, this.rects[i].vt3.y, this.rects[i].vt4.y);
            
            ctx.beginPath();
            ctx.fillStyle = `${this.rects[i].color}${this.rects[i].lightness}%)`;
    
            ctx.moveTo(this.rects[i].vt1.x, this.rects[i].vt1.y);
            ctx.lineTo(this.rects[i].vt2.x, this.rects[i].vt2.y);
            ctx.lineTo(this.rects[i].vt3.x, this.rects[i].vt3.y);
        
            ctx.moveTo(this.rects[i].vt4.x, this.rects[i].vt4.y);
            ctx.lineTo(this.rects[i].vt2.x, this.rects[i].vt2.y);
            ctx.lineTo(this.rects[i].vt3.x, this.rects[i].vt3.y);
            ctx.fill(); 
            ctx.closePath()
            this.rects[i].vt1.y += (this.rects[i].speed / 10 + this.rects[i].defaultSpeed) / 924 * this.stageHeight;
            this.rects[i].vt2.y += (this.rects[i].speed / 10 + this.rects[i].defaultSpeed) / 924 * this.stageHeight;
            this.rects[i].vt3.y += (this.rects[i].speed / 10 + this.rects[i].defaultSpeed) / 924 * this.stageHeight;
            this.rects[i].vt4.y += (this.rects[i].speed / 10 + this.rects[i].defaultSpeed) / 924 * this.stageHeight;

            if (this.lowestY < this.stageHeight / 1.85) {
                this.rects[i].speed += this.rects[i].side / 3;
            } else {
                if (this.rects[i].lightness < 100) {
                    this.rects[i].lightness += Math.random() * 0.7;
                }

                this.rects[i].speed *= 0.8;
                this.variationRect(this.rects[i]);
            }
        }

        if (this.isClick !== false && this.end.x !== null || this.end.y !== null) {
            this.sqr = this.getSquare(this.start, this.end);

            ctx.beginPath();
            ctx.fillStyle = '#00000050';
    
            ctx.moveTo(this.start.x, this.start.y);
            ctx.lineTo(this.sqr[0].x, this.sqr[0].y);
            ctx.lineTo(this.sqr[1].x, this.sqr[1].y);
        
            ctx.moveTo(this.end.x, this.end.y);
            ctx.lineTo(this.sqr[0].x, this.sqr[0].y);
            ctx.lineTo(this.sqr[1].x, this.sqr[1].y);
            ctx.fill();
            ctx.closePath();
        }
    }

    getSquare(a, b) {
        const middle = (i, j) => (i + j) / 2;
        const halfDiagonal = (i, j) => (i - j) / 2;

        return [{
            x: middle(a.x, b.x) - halfDiagonal(a.y, b.y),
            y: middle(a.y, b.y) + halfDiagonal(a.x, b.x),
        }, {
            x: middle(a.x, b.x) + halfDiagonal(a.y, b.y),
            y: middle(a.y, b.y) - halfDiagonal(a.x, b.x),
        }];
    }

    getSide(a, b) {
        return Math.sqrt(Math.abs(a.x - b.x) + Math.abs(a.y - b.y));
    }

    variationRect(rect) {
        switch (rect.randomNum) {
            case 0:
                rect.vt1.y += Math.random() * this.getSide(rect.vt1, rect.vt4) / 30;
                rect.vt2.y -= Math.random() * this.getSide(rect.vt1, rect.vt4) / 30;
                rect.vt3.y += Math.random() * this.getSide(rect.vt1, rect.vt4) / 30;
                rect.vt4.y -= Math.random() * this.getSide(rect.vt1, rect.vt4) / 30;
                break;
            case 1:
                rect.vt1.y -= Math.random() * this.getSide(rect.vt1, rect.vt4) / 30;
                rect.vt2.y += Math.random() * this.getSide(rect.vt1, rect.vt4) / 30;
                rect.vt3.y -= Math.random() * this.getSide(rect.vt1, rect.vt4) / 30;
                rect.vt4.y += Math.random() * this.getSide(rect.vt1, rect.vt4) / 30;
                break;
        }
    }
}
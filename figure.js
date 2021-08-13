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
    }

    update(event) {
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

    startClick() {
        this.isClick = true;

        this.start = {
            x: undefined,
            y: undefined,
        };
        this.end = {
            x: undefined,
            y: undefined,
        };
    }

    endClick() {
        this.sqr = this.getSquare(this.start, this.end);

        this.isClick = false;

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
        });

        console.log(this.rects);
    }

    draw(ctx) {
        for (let i = 0; i < this.rects.length; i++) {
            this.sqr = this.getSquare(this.rects[i].vt1, this.rects[i].vt4);
            
            ctx.beginPath();
            ctx.fillStyle = '#ff0000';
    
            ctx.moveTo(this.rects[i].vt1.x, this.rects[i].vt1.y);
            ctx.lineTo(this.rects[i].vt2.x, this.rects[i].vt2.y);
            ctx.lineTo(this.rects[i].vt3.x, this.rects[i].vt3.y);
        
            ctx.moveTo(this.rects[i].vt4.x, this.rects[i].vt4.y);
            ctx.lineTo(this.rects[i].vt2.x, this.rects[i].vt2.y);
            ctx.lineTo(this.rects[i].vt3.x, this.rects[i].vt3.y);
            ctx.fill(); 
            ctx.closePath();
        }

        if (this.isClick !== false && this.end.x !== null || this.end.y !== null) {
            this.sqr = this.getSquare(this.start, this.end);

            ctx.beginPath();
            ctx.fillStyle = '#ffffff';
    
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
}
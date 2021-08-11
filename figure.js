let start = {x: undefined, y: undefined};
let end = {x: undefined, y: undefined};

export class Figure {
    constructor() {
        this.isClick = false;
        this.sqr = null;
    }

    update(event) {
        if (this.isClick) {
            start.x = event.clientX;
            start.y = event.clientY;

            this.isClick = null;
        } 
        
        if (this.isClick != false) {
            end.x = event.clientX;
            end.y = event.clientY;
        }
    }

    startClick() {
        this.isClick = true;
    }

    endClick() {
        this.isClick = false;
    }

    draw(ctx) {
        if (end.x === null || end.y === null) {
            return;
        }

        this.sqr = this.getSquare(start, end);

        ctx.beginPath();
        ctx.fillStyle = '#ffffff';

        ctx.moveTo(start.x, start.y);
        ctx.lineTo(this.sqr[0].x, this.sqr[0].y);
        ctx.lineTo(this.sqr[1].x, this.sqr[1].y);
        
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(this.sqr[0].x, this.sqr[0].y);
        ctx.lineTo(this.sqr[1].x, this.sqr[1].y);

        ctx.fill();
        ctx.closePath();
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
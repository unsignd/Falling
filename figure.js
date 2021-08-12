export class Figure {
    constructor() {
        this.isClick = false;
        this.sqr = null;
        this.start = {x: undefined, y: undefined};
        this.end = {x: undefined, y: undefined};
    }

    update(event) {
        if (this.isClick) {
            this.start = {x: event.clientX, y: event.clientY};

            this.isClick = null;
        } 
        
        if (this.isClick !== false) {
            this.end = {x: event.clientX, y: event.clientY};
        }
    }

    startClick() {
        this.isClick = true;
    }

    endClick() {
        this.isClick = false;

        this.start = {x: undefined, y: undefined};
        this.end = {x: undefined, y: undefined};
    }

    draw(ctx) {
        if (this.isClick === false || this.end.x === null || this.end.y === null) {
            return;
        }

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
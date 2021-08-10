let startX, startY, endX, endY;

export class Figure {
    constructor() {
        this.isClick = false;
    }

    update(event) {
        if (this.isClick) {
            startX = event.clientX;
            startY = event.clientY;

            this.isClick = null;
        } 
        
        if (this.isClick != false) {
            endX = event.clientX;
            endY = event.clientY;
        }
    }

    startClick() {
        this.isClick = true;
    }

    endClick() {
        this.isClick = false;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(startX, startY, endX - startX, endY - startY);
        ctx.fill();
        ctx.closePath();
    }
}
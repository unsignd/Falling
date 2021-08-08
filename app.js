let title, description, canvas, ctx;

const sw = 1920;
const sh = 1080;
const pixelRatio = 2;

function init() {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    canvas.width = sw * pixelRatio;
    canvas.height = sh * pixelRatio;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.marginTop = '0px';
    canvas.style.backgroundColor = '#222128';
    ctx.scale(pixelRatio, pixelRatio);

    title = new LeonSans({
        text: 'Noodly',
        color: ['#f3c95a'],
        size: 200,
        weight: 800,
        tracking: 0.25
    });

    let i, total = title.drawing.length;

    for (i = 0; i < total; i++) {
        TweenMax.fromTo(title.drawing[i], 1.5, {
            value: 0
        }, {
            delay: i * 0.2,
            value: 1,
            ease: Power4.easeOut
        });
    }

    requestAnimationFrame(animate);
}

function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, sw, sh);
    title.position((sw - title.rect.w) / 2, (sh - title.rect.h) / 2);
    title.draw(ctx);
}

window.onload = () => {
    init();
    setTimeout(() => {
        disappear = setInterval(() => {
            canvas.style.marginTop = ((parseFloat(canvas.style.marginTop, 10) + 1) * 1.1) +'px';
            if ((parseFloat(canvas.style.marginTop, 10) + 1) >= document.body.clientHeight) {
                clearInterval(disappear);
            }
         }, 12);
    }, 3000);
};

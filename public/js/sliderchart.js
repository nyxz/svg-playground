function sliderchart(data, chartContainerId) {
    var container = document.getElementById(chartContainerId);
    var width = container.offsetWidth;
    var height = container.offsetHeight;
    var mid = height / 2;

    var draw = SVG(chartContainerId);
    var line = draw.line(0, mid, draw.width(), mid);

    var diameter = 50;
    var deltaY = mid - (diameter / 2);
    var deltaX = 0;

    var circle = draw.circle(diameter).fill('#000')
                        .move(deltaX, deltaY)
                        .animate({duration: 3000, ease: SVG.easing.elastic})
                        .move(200, deltaY);

    diameter = 20;
    deltaY = mid - (diameter / 2);
    deltaX = 0;

    var circle2 = draw.circle(diameter).fill('#fff')
                        .move(deltaX, deltaY)
                        .animate({duration: 4000, ease: SVG.easing.elastic})
                        .move(200, deltaY);
}

function drawLine(draw, contMid, contWidth) {
	var x1 = 0,
	    x2 = contWidth,
	    y1 = contMid,
	    y2 = contMid;
	draw.line(x1, y1, x2, y2);
}

function drawOneRow(draw, width, height) {
    draw.drawCircle(50, 50, 50);
    draw.drawLine(30, 150);
}
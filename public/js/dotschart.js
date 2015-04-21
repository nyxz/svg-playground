var width = 700,
    height = 350,
    leftgutter = 10,
    topgutter = 10,
    strongBias = 0.8,
    weakBias = 0.4,
    xAxisSize = 100,
    yAxisSize = 50;

var radiusMap = {
    0: 1,
    10: 4,
    20: 5,
    30: 6,
    40: 7,
    50: 15,
    60: 17,
    70: 20,
    80: 21,
    90: 24,
    100: 37
}
var maxRadius = radiusMap[100],
    maxWidth = width - maxRadius,
    minWidth = leftgutter + maxRadius,
    maxHeight = height - maxRadius,
    minHeight = topgutter + maxRadius,
    xScaleSize = getScaleSize(0, maxWidth, xAxisSize),
    yScaleSize = getScaleSize(0, maxHeight, yAxisSize);

function dotschart(cultureFit, containerId) {
    var data = [];
    var paper = Raphael(containerId, width, height);

    $.each(cultureFit.all, function(idx, fit) {
        drawCultureFitCircle(paper, fit);
    });

    var currProfile = drawCultureFitCircle(paper, cultureFit.current);
    currProfile.node.setAttribute('class', 'current-profile-fit');
    var x = currProfile.attr('cx');
    var y = currProfile.attr('cy');
    var radius = currProfile.attr('r');

    paper.circle(x, y, radius + 6).node.setAttribute('class', 'current-profile-fit-border');
    paper.text(x, y, cultureFit.current.name).attr({"font": '12px Verdana, Fontin-Sans, Arial', 'font-weight': 'bold', stroke: "none", fill: "#fff"});
}

function drawCultureFitCircle(paper, fit) {
    var normFitVal = fit.value * xScaleSize;
    var randomY = randomIntBetween(minHeight, maxHeight);
    var circle = paper.circle(normFitVal, randomY, getRadius(fit.value));
    // paper.circle(normFitVal, randomY, 2).attr({fill: '#f00', stroke: 'none'});

    if (normFitVal > (maxWidth * strongBias)) {
        circle.node.setAttribute('class', 'strong-fit');
    } else if (normFitVal < (maxWidth * weakBias)) {
        circle.node.setAttribute('class', 'weak-fit');
    } else {
        // the gradient colors must match the ones for strong-fit and weak-fit styles
        circle.attr({fill: '0-#f16460-#b95d9f', 'fill-opacity': 0.7, opacity: 0.7, stroke: 'none'});
    }
    return circle;
}

function getScaleSize(min, max, size) {
    return (max - min) / size;
}

function norm(min, max, val) {
    return (val / max) * 100;
}

function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRadius(fitValue) {
    var floor = Math.floor(fitValue / 10) * 10;
    return radiusMap[floor];
}
var width = 700,
    height = 350,
    leftgutter = 10,
    topgutter = 10,
    strongBias = 0.8,
    weakBias = 0.4,
    xAxisSize = 100,
    yAxisSize = 50,
    zoomSize = 50,
    mouseoverBorderWidth = 4,
    profileBorderMargin = 6;

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
var maxRadius = (radiusMap[100] > zoomSize ? radiusMap[100] : zoomSize) + mouseoverBorderWidth,
    maxWidth = width - maxRadius,
    minWidth = leftgutter + maxRadius,
    maxHeight = height - maxRadius,
    minHeight = topgutter + maxRadius,
    xScaleSize = getScaleSize(0, maxWidth, xAxisSize),
    yScaleSize = getScaleSize(0, maxHeight, yAxisSize);

var textStyles = {
    'font': '14px Verdana, Fontin-Sans, Arial',
    'font-weight': 'bold',
    'stroke': 'none',
    'fill': '#fff'
};

var middleFitStyles = {
    // the gradient colors must match the
    // ones for strong-fit and weak-fit styles
    'fill': '0-#f16460-#b95d9f',
    'fill-opacity': 0.7,
    'opacity': 0.7,
    'stroke': '#B95D9F',
    'stroke-width': 0
}

var mouseoverStyle = {
    'stroke-width': mouseoverBorderWidth,
    'stroke': '#B95D9F',
    'r': zoomSize
}

function mouseoutStyle(initialRadius) {
    return {
        'stroke-width': 0,
        'stroke': 'none',
        'r': initialRadius
    };
}

function dotschart(cultureFit, containerId) {
    var data = [];
    var paper = Raphael(containerId, width, height);

    var profileSet = drawCurrentProfileCultureFitCircle(paper, cultureFit.current);
    animateProfileSet(profileSet);

    var mouseoverAnimation = getAnimation(mouseoverStyle);
    $.each(cultureFit.all, function(idx, fit) {
        paper.setStart();
        drawCultureFitCircle(paper, fit);
        var set = paper.setFinish();
        animateCirclesSet(set, mouseoverAnimation, profileSet);
    });
    profileSet.toFront();
}

function animateProfileSet(profileSet) {
    var profCircle = profileSet[0];
    var profCircleRadius = profCircle.attr('r');
    var profBorder = profileSet[2];
    var profBorderRadius = profBorder.attr('r');
    profileSet.mouseover(function() {
        profileSet.animate(getRadiusAnimation(zoomSize));
    });
    profileSet.mouseout(function() {
        profBorder.animate(getRadiusAnimation(profBorderRadius));
        profCircle.animate(getRadiusAnimation(profCircleRadius));
    });
}

function animateCirclesSet(set, mouseoverAnimation, profileSet) {
    var circle = set[0];
    var text = set[1];
    var initialRadius = circle.attr('r');
    set.mouseover(function() {
        set.toFront();
        text.show();
        circle.animate(mouseoverAnimation);
    });
    set.mouseout(function() {
        text.hide();
        circle.animate(getAnimation(mouseoutStyle(initialRadius)));
        profileSet.toFront();
    });
}

function drawCurrentProfileCultureFitCircle(paper, currCultureFit) {
    paper.setStart();
    var currProfile = drawCultureFitCircle(paper, currCultureFit);
    currProfile.node.setAttribute('class', 'current-profile-fit');
    var x = currProfile.attr('cx');
    var y = currProfile.attr('cy');
    var radius = currProfile.attr('r');

    paper.circle(x, y, radius + profileBorderMargin).node.setAttribute('class', 'current-profile-fit-border');

    var profileSet = paper.setFinish();
    var text = profileSet[1];
    text.show();
    profileSet.toFront();
    return profileSet;
}

function drawCultureFitCircle(paper, fit) {
    var normFitVal = fit.value * xScaleSize;
    var randomY = randomIntBetween(minHeight, maxHeight);
    var circle = paper.circle(normFitVal, randomY, getRadius(fit.value));

    if (normFitVal > (maxWidth * strongBias)) {
        circle.node.setAttribute('class', 'strong-fit');
    } else if (normFitVal < (maxWidth * weakBias)) {
        circle.node.setAttribute('class', 'weak-fit');
    } else {
        circle.attr(middleFitStyles);
    }
    var x = circle.attr('cx');
    var y = circle.attr('cy');
    var text = paper.text(x, y, fit.name).attr(textStyles).hide();

    return circle;
}

function mouseOver(circle, text) {
    return function() {
        circle.toFront();
        text.show();
    };
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

function getRadiusAnimation(radius) {
    return getAnimation({r : radius});
}

function getAnimation(attr) {
    var duration = 150;
    return Raphael.animation(attr, duration, "<>");
}
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

function oldDotchart() {
    // Grab the data
    // var data = [],
    //     axisx = [],
    //     axisy = [],
    //     table = $("#for-chart");
    // $("tbody td", table).each(function (i) {
    //     data.push(parseFloat($(this).text(), 10));
    // });
    // table.hide();
    // $("tbody th", table).each(function () {
    //     axisy.push($(this).text());
    // });
    // $("tfoot th", table).each(function () {
    //     axisx.push($(this).text());
    // });
    // Draw
    var data = [];
    $.each(cultureFitValues, function(idx, fit) {
        data.push(fit.value);
    });
    var width = 1200,
        height = 600,
        leftgutter = 10,
        bottomgutter = 10,
        r = Raphael("chart", width, height),
        txt = {"font": '10px Fontin-Sans, Arial', stroke: "none", fill: "#fff"},
        X = (width - leftgutter) / axisx.length,
        axisyLen = axisy.length,
        Y = randomIntBetween((height - bottomgutter) / axisyLen, axisyLen),
        color = $("#chart").css("color");
        max = Math.round(X / 2) - 1,
        p = 0;
    // r.rect(0, 0, width, height, 5).attr({fill: "#000", stroke: "none"});
    for (var i = 0, ii = axisx.length; i < ii; i++) {
        r.text(leftgutter + X * (i + .5), 10, axisx[i]).attr(txt);
    }
    for (var i = 0, ii = axisy.length; i < ii; i++) {
        r.text(10, Y * (i + .5), axisy[i]).attr(txt);
    }
    var o = 0;
    for (var i = 0, ii = axisy.length; i < ii; i++) {
        for (var j = 0, jj = axisx.length; j < jj; j++) {
            var R = data[o] && Math.min((Math.sqrt(data[o] / Math.PI) * 4).toFixed(2), max);
            if (R) {
                drawCircle(leftgutter + data[o] * 100, randomIntBetween((height - bottomgutter) / axisyLen, axisyLen), R, data[o], r, o); // leftgutter + X * (j + .5) - p - R, Y * (i + .5) - 10
            }
            o++;
        }
    }
}


function drawCircle(dx, dy, R, value, r, o) {
    var color = "hsb(" + [(1 - R / max) * .5, 1, .75] + ")";
    var dt = r.circle(dx + p + R, dy + 10, R).attr({stroke: "none", fill: color});
    if (R < 6) {
        var bg = r.circle(dx + p + R, dy + 10, 6).attr({stroke: "none", fill: "#000", opacity: .4}).hide();
    }
    var lbl = r.text(dx + p + R, dy + 10, data[o]).attr({"font": '10px Fontin-Sans, Arial', stroke: "none", fill: "#fff"}).hide();
    var dot = r.circle(dx + p + R, dy + 10, max).attr({stroke: "none", fill: "#000", opacity: 0});

    dot[0].onmouseover = function () {
        if (bg) {
            bg.show();
        } else {
            var clr = Raphael.rgb2hsb(color);
            clr.b = .5;
            dt.attr("fill", Raphael.hsb2rgb(clr).hex);
        }
        lbl.show();
    };

    dot[0].onmouseout = function () {
        if (bg) {
            bg.hide();
        } else {
            dt.attr("fill", color);
        }
        lbl.hide();
    };
}
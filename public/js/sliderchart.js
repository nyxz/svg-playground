function sliderchart(data, chartContainerId) {
    var container = document.getElementById(chartContainerId);
    var width = container.offsetWidth;
    var height = container.offsetHeight;
    var mid = height / 2;

    var paper = Raphael(chartContainerId, width, height);
    var line = paper.path(['M', 0, mid, 'L', width, mid]);
    paper.setStart();
    paper.circle(30, mid, 28).attr({'stroke-width': 4, 'stroke': '#005AB2'});
    paper.circle(30, mid, 20).attr({'stroke-width': 4, 'stroke': '#D72B14', 'fill': 'url(../img/person-redbg-40x40.png)'});
    var circleSet = paper.setFinish();
    circleSet.animate({cx: 200}, 3000, "elastic");
}


function sliderchart1(data, chartContainerId) {
    var container = document.getElementById(chartContainerId);
    var width = container.offsetWidth;
    var height = container.offsetHeight;
    var mid = height / 2;

    var paper = SVG(chartContainerId);
    var paperer = new Drawer(paper);

    var line = paperer.drawLineInTheMiddle(width, mid);

    var c1Diameter = 50;
    var c1Data = {
        diameter : c1Diameter,
        x: 0,
        y: (mid - (c1Diameter / 2)),
        distance: 200,
        color: "#FFF",
        strokeColor: "#005AB2"
    }
    var circle1 = paperer.drawCircle(c1Data);

    var c2Diameter = 36;
    var circle2 = paperer.drawCircle({
        diameter : c2Diameter,
        x: 0,
        y: (mid - (c2Diameter / 2)),
        distance: c1Data.distance + (c1Data.diameter / 2) - (c2Diameter / 2),
        color: '#D72B14',
        strokeColor: "#D72B14"
    });
}

function Drawer(paper) {

    this.paper = paper;

    this.drawLineInTheMiddle = function (x, y) {
        var x1 = 0,
            x2 = x,
            y1 = y,
            y2 = y;
        return this.paper.line(x1, y1, x2, y2);
    }

    this.drawCircle = function(data) {
        var diameter = data.diameter ? data.diameter : 0;
        var x = data.x ? data.x : 0;
        var y = data.y ? data.y : 0;
        var distance = data.distance ? data.distance : 0;
        var duration = data.duration ? data.duration : 3000;
        var color = data.color;
        var strokeColor = data.strokeColor;

        var circle = paper.circle(x, y, diameter)
                            .animate({duration: duration, ease: SVG.easing.elastic})
                            .move(distance, y);

        if (color) {
            circle = circle.fill(color);
        }
        if (strokeColor) {
        	circle = circle.stroke({color: strokeColor});
        }
        return circle;
    }

}
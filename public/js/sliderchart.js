function sliderchart(data, chartContainerId) {
	var companyData = data[0].axes;
	var personData = data[1].axes;
	var maxValForCompany = _maxVal(companyData);
	var maxValForPerson = _maxVal(personData);
	var maxVal = maxValForPerson > maxValForCompany ? maxValForPerson : maxValForCompany;

	personData.forEach(function(entry, index) {
		var currWrapper = createWrapper(chartContainerId, index);
		injectGraphic(currWrapper, entry.value, companyData[index].value, maxVal);
	});
}

function injectGraphic(container, companyValue, personValue, maxVal) {
	var containerId = container.attr('id');
	var width = container.outerWidth();
    var height = container.outerHeight();
    var mid = height / 2;

    var initialCircleX = 32;
	var normPersonVal = normalized(personValue, maxVal, width, initialCircleX);
	var normCompanyVal = normalized(companyValue, maxVal, width, initialCircleX);

    var paper = Raphael(containerId, width, height);
    var line = paper.path(['M', 0, mid, 'L', width, mid]);

    var companyAnimation = getMoveAnimation(normCompanyVal);
    var compValCircle =  paper.circle(initialCircleX, mid, 20).attr({'stroke-width': 4, 'stroke': '#6BB2E4', 'fill': '#6BB2E4'});
    compValCircle.animate(companyAnimation.delay(500));

    paper.setStart();
    paper.circle(initialCircleX, mid, 28).attr({'stroke-width': 4, 'stroke': '#005AB2'});
    paper.circle(initialCircleX, mid, 20).attr({'stroke-width': 4, 'stroke': '#D72B14', 'fill': 'url(../img/person-redbg-40x40.png)'});
    var circleSet = paper.setFinish();
    var personAnimation = getMoveAnimation(normPersonVal);
    circleSet.animate(personAnimation);
}

function getMoveAnimation(distance) {
	var duration = 1000; // in milliseconds
	return Raphael.animation({cx : distance}, duration, "backOut");
}

function createWrapper(containerId, index) {
	var container = $('#' + containerId);
	var generatedId = 'sliderchart-node-' + index;
	container.append('<div class="sliderchart-node" id="' + generatedId + '"><div>');
	return $('#' + generatedId);
}

function _maxVal(objectArr) {
	return Math.max.apply(Math, objectArr.map(function(o) { return o.value; }));
}

function normalized(value, maxValue, width, circleSize) {
	return (value / maxValue) * (width - circleSize);
}
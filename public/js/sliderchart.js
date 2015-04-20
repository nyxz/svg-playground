function sliderchart(data, chartContainerId) {
	var companyData = data[0].axes;
	var personData = data[1].axes;
	var maxValForCompany = _maxVal(companyData);
	var maxValForPerson = _maxVal(personData);
	var maxVal = maxValForPerson > maxValForCompany ? maxValForPerson : maxValForCompany;

	var container = $('#' + chartContainerId);

	var chartTableName = 'sliderchart-table';
	container.append('<table id="' + chartTableName + '"></table>');

	var chartTable = $('#' + chartTableName);
	personData.forEach(function(entry, index) {
		var rowId = "axis-label-" + index;
		chartTable.append('<tr class="axis-label" id="' + rowId + '"></tr>');

		var currRow = $('#' + rowId);
		currRow.append('<td>' + entry.axis + '</td>');

		var currWrapper = createWrapper(currRow, index);
		injectGraphic(currWrapper, entry.value, companyData[index].value, maxVal);
	});
}

function createWrapper(container, index) {
	var generatedId = 'sliderchart-node-' + index;
	container.append('<td><div class="sliderchart-node" id="' + generatedId + '"><div></td>');
	return $('#' + generatedId);
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
	return Raphael.animation({cx : distance}, duration, "<>");
}

function _maxVal(objectArr) {
	return Math.max.apply(Math, objectArr.map(function(o) { return o.value; }));
}

function normalized(value, maxValue, width, circleSize) {
	return (value / maxValue) * (width - circleSize);
}
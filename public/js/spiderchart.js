function spiderchart(data, chartContainerId) {
    RadarChart.defaultConfig.color = function() {};
    RadarChart.defaultConfig.radius = 3;
    RadarChart.defaultConfig.w = 400;
    RadarChart.defaultConfig.h = 400;
    RadarChart.defaultConfig.circles = false;

    RadarChart.draw('#' + chartContainerId, data);
}
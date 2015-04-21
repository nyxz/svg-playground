var data = [
  {
    className: 'company-values',
    axes: [
      {axis: "Exceed client expectation", value: 100},
      {axis: "Communicate openly", value: 89},
      {axis: "Innovate", value: 54},
      {axis: "Embrace diversity", value: 92},
      {axis: "Lead the way", value: 77},
      {axis: "Constantly learn", value: 34}
    ]
  },
  {
    className: "person-values",
    axes: [
      {axis: "Exceed client\n expectation", value: 88},
      {axis: "Communicate openly", value: 68},
      {axis: "Innovate", value: 78},
      {axis: "Embrace diversity", value: 90},
      {axis: "Lead the way", value: 40},
      {axis: "Constantly learn", value: 57}
    ]
  }
];

var cultureFitValues = [];
var axisx = [];
var axisy = [];

for (var i = 0; i < 100; i++) {
  cultureFitValues.push({
    name: randomName(),
    value: randomValue()
  });
}

var num = 10;
for (var i = 0; i < num; i++) {
  axisx.push(i);
  if (i % 2 == 0) {
    axisy.push(i / 2);
  }
};


function randomName() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}

function randomValue() {
  return ((Math.random() * 10) + 1).toFixed(2);
}

function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
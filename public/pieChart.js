
var PieChart = function(title, data) {

  var container = document.getElementById("pie-chart");

  var chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: container
    },
    title: { 
      text: title 
    },
    series: [
      {
        data: data
      }
    ]
  });

};
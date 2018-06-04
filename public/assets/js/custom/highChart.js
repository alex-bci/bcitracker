var server = 'http://localhost:3005';

var app = angular.module('omnitrend_view', []);

console.log("loaded view");

app.controller('chartCtrl', function($scope, $http){ 
 
  // Load the view-data from the node.js server
  $http.get(server + '/serve/'). 
     success(function(response) { 
          console.log(response); 
          
           // On success 
            // Set primary vars
            $scope.title = response.title;
            $scope.shortTitle = response.shortTitle;

            // Call initChart to populate data 
            initChart(response.data, setData);
                
        }). 
        error(function(response) { 
          console.log(response);
        }); 


  function setData(data) {
    console.log(data);
    $scope.today = data;
  }

}); 

function initChart(path, setData) {
  $.getJSON(path, function (data) {

      // populate today's data right away
      setData(data[data.length - 1]);

      // split the data set into set and volume
      var set = [],
          volume = [],
          dataLength = data.length,
          // set the allowed units for data grouping
          groupingUnits = [[
              'week',                         // unit name
              [1]                             // allowed multiples
          ], [
              'month',
              [1, 2, 3, 4, 6]
          ]],

          i = 0;

      for (i; i < dataLength; i += 1) {
          set.push([
              data[i][0], // the date
              data[i][1], // open
              data[i][2], // high
              data[i][3], // low
              data[i][5] // close
          ]);

          volume.push([
              data[i][0], // the date
              data[i][5] // the volume
          ]);
      }


      // create the chart
      Highcharts.stockChart('container', {

          rangeSelector: {
              selected: 1
          },

          title: {
              text: 'Litecoin (LTC) Global Sentiment Index'
          },

          yAxis: [{
              labels: {
                  align: 'right',
                  x: -3
              },
              title: {
                  text: 'Sentiment'
              },
              height: '60%',
              lineWidth: 2,
              resize: {
                  enabled: true
              }
          }, {
              labels: {
                  align: 'right',
                  x: -3
              },
              title: {
                  text: 'Volume'
              },
              top: '65%',
              height: '35%',
              offset: 0,
              lineWidth: 2
          }],

          tooltip: {
              split: true
          },

          series: [{
              name: 'LTC Sentiment',
              data: set,
              type: 'area',
              threshold: null,
              tooltip: {
                  valueDecimals: 2
              }
          }, {
              type: 'column',
              name: 'Volume',
              data: volume,
              yAxis: 1,
              dataGrouping: {
                  units: groupingUnits
              }
          }]
      });
  });
}
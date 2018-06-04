var server = 'http://localhost:3005';

var app = angular.module('app', []);

var page = "< pagename >";

console.log("loaded view");

// Page Identification
var page = getPage();

function getPage () {
  var url = window.location.href;
  
  if(url.split("view=").length > 1){
    var page = (url.split('view='))[1];
  } else {
    var set = url.split('/');
    var page = (set[set.length - 1]).split(".")[0];
  }
  console.log('page is ' + page);
  return page;
}

app.controller('head', function($scope, $http){ 
  $scope.title = page; 
});

app.controller('side-nav', function($scope, $http){ 
  
  var current = {
        "href":"#",
        "sign":"fa-line-chart",
        "text":" "+page,
        "class":"active-menu"
  };

  $scope.navbar = [
    {
      "href":"index.html",
      "sign":"fa-dashboard",
      "text":" Home",
      "class":""
    },{
      "href":"profile.html",
      "sign":"fa-user",
      "text":" Account",
      "class":""
    },{
      "href":"search.html",
      "sign":"fa-search",
      "text":" Search",
      "class":""
    },current
  ];
  // Don't forget to set class='active-menu' for whichever list item is currently selected

}); 

app.controller('trendingCtrl', function($scope, $http){ 

  $scope.trending = [{
    "score":"159",
    "title":"Somebody should put together a crowdfunding site to put a Litecoin commercial in the Super Bowl. ",
    "source":"reddit",
    "sourceURL":"https://www.reddit.com/r/litecoin/comments/7q7myk/somebody_should_put_together_a_crowdfunding_site/"
  },{
    "score":"165",
    "title":"Show KFC Canada that you care",
    "source":"twitter",
    "sourceURL":"https://www.reddit.com/r/litecoin/comments/7q6tew/show_kfc_canada_that_you_care/"
  },{
    "score":"359",
    "title":"MAZEFIT.COM NOW ACCEPTS LITECOIN PAYMENTS! ",
    "source":"reddit",
    "sourceURL":"https://www.reddit.com/r/litecoin/comments/7q703s/mazefitcom_now_accepts_litecoin_payments/"
  }];

});

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

// used by chartCtrl
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
      Highcharts.stockChart('omnicontainer', {

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


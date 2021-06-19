google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(ratingNumberP);
google.charts.setOnLoadCallback(thismonthRatingP);
google.charts.setOnLoadCallback(ratingAvgMonthL);




//PIECHART RATINGS
function ratingNumberP() {
    $.ajax({
      url: "https://usmpcrm-api.herokuapp.com/api/dashboard/rating/number",
      dataType: "json",
    }).done(function (jsonData) {
      var data = new google.visualization.DataTable();       
      data.addColumn('string', 'rating') 
      data.addColumn('number', 'count');
      jsonData.forEach(function (row) {
        data.addRow([
          row.rating,
          row.count
        ]);
      });
      

      var chart = new google.visualization.PieChart(document.getElementById('ratingNumber'));
      chart.draw(data, {
        animation:{
            duration: 1000,
            easing: 'out',
          },
        title: 'Rating General',
        is3D: true
      });
    }).fail(function (jq, text, err) {
      console.log(text + ' - ' + err);
    });
}

function thismonthRatingP() {
    $.ajax({
      url: "https://usmpcrm-api.herokuapp.com/api/dashboard/rating/month",
      dataType: "json",
    }).done(function (jsonData) {
      var data = new google.visualization.DataTable();       
      data.addColumn('string', 'rating') 
      data.addColumn('number', 'count');
      jsonData.forEach(function (row) {
        data.addRow([
          row.rating,
          row.count
        ]);
      });
      

      var chart = new google.visualization.PieChart(document.getElementById('thismonthRatingchart'));
      chart.draw(data, {
        animation:{
            duration: 1000,
            easing: 'out',
          },
        title: 'Rating this month',
        is3D: true
      });
    }).fail(function (jq, text, err) {
      console.log(text + ' - ' + err);
    });
}

//LINE CHART RATING
function ratingAvgMonthL() {
    $.ajax({
      url: "https://usmpcrm-api.herokuapp.com/api/dashboard/rating/avgmonth",
      dataType: "json",
    }).done(function (jsonData) {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'date');
      data.addColumn('number', 'average');

      jsonData.forEach(function (row) {
        data.addRow([
          row.date,
          row.average
        ]);
      });

      var MAX = jsonData.length;
      
      var options = {
        title: 'Rating per Month',
        hAxis: {title: 'Date', titleTextStyle: {color: 'red'}},
        animation: {
          startup: true,   /* Need to add this for animations */
          duration: 1000,
          easing: 'out',
        },
        pointSize: 10,
        curveType: 'function',
        hAxis: {viewWindow: {min:0, max:jsonData.length/2}}
      };
      var chart = new google.visualization.LineChart(document.getElementById('avgRatingMonth'));

      var dataView = new google.visualization.DataView(data);
      dataView.setColumns([
        // reference existing columns by index
        0, 1,
        // add function for line color
        {
          calc: function(data, row) {
            var colorDown = '#cfa01e';
            var colorUp = '#FF0000';
    
            if ((row === 0) && (data.getValue(row, 1) < data.getValue(row + 1, 1))) {
              return colorDown;
            } else if ((row > 0) && (data.getValue(row - 1, 1) <= data.getValue(row, 1))) {
              return colorDown;
            }
            return colorUp;
          },
          type: 'string',
          role: 'style'
        }
      ]);
      var prevButton = document.getElementById('b1');
      var nextButton = document.getElementById('b2');
      var changeZoomButton = document.getElementById('b3');

      function drawChart() {
        // Disabling the button while the chart is drawing.
        prevButton.disabled = true;
        nextButton.disabled = true;
        changeZoomButton.disabled = true;
        google.visualization.events.addListener(chart, 'ready',
            function() {
              prevButton.disabled = options.hAxis.viewWindow.min <= 0;
              nextButton.disabled = options.hAxis.viewWindow.max >= MAX;
              changeZoomButton.disabled = false;
            });
        chart.draw(dataView, options);
      }

      prevButton.onclick = function() {
        options.hAxis.viewWindow.min -= 1;
        options.hAxis.viewWindow.max -= 1;
        drawChart();
      }
      nextButton.onclick = function() {
        options.hAxis.viewWindow.min += 1;
        options.hAxis.viewWindow.max += 1;
        drawChart();
      }
      var zoomed = false;
      changeZoomButton.onclick = function() {
        if (zoomed) {
          options.hAxis.viewWindow.min = 0;
          options.hAxis.viewWindow.max = jsonData.length/2;
        } else {
          options.hAxis.viewWindow.min = 0;
          options.hAxis.viewWindow.max = MAX;
        }
        zoomed = !zoomed;
        drawChart();
      }
      drawChart();
    }).fail(function (jq, text, err) {
      console.log(text + ' - ' + err);
    });
}





//ONLY NUMBERS:
$(document).ready(function() {
    //This is to get all complaints API
    $.ajax({
      url: "https://usmpcrm-api.herokuapp.com/api/dashboard/rating/avg",
      dataType: "json",
    }).done(function (jsonData) {
  
      var mainContainer = document.getElementById("ratingAvgAll");
      for (var i = 0; i < jsonData.length; i++) {
      var div = document.createElement("h1");
      div.innerHTML = jsonData[i].average;
      mainContainer.appendChild(div);
      
      }
    }).fail(function (text, err) {
      console.log(text + ' - ' + err);
    });

    $.ajax({
        url: "https://usmpcrm-api.herokuapp.com/api/dashboard/rating/avgthismonth",
        dataType: "json",
      }).done(function (jsonData) {
    
        var mainContainer = document.getElementById("thismonthRating");
        for (var i = 0; i < jsonData.length; i++) {
        var div = document.createElement("h1");
        div.innerHTML = jsonData[i].average;
        mainContainer.appendChild(div);
        
        }
      }).fail(function (text, err) {
        console.log(text + ' - ' + err);
      });
  
  } 
  );
    
  
  
  
  
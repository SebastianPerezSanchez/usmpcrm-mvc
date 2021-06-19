google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(complaintsMonth);


function complaintsMonth() {
    $.ajax({
      url: "https://usmpcrm-api.herokuapp.com/api/dashboard/complaint/month",
      dataType: "json",
    }).done(function (jsonData) {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'date');
      data.addColumn('number', 'complaints');

      jsonData.forEach(function (row) {
        data.addRow([
          row.date,
          row.complaints
        ]);
      });

      var MAX = jsonData.length;
      
      var options = {
        title: 'Complaints per Month',
        hAxis: {title: 'Date', titleTextStyle: {color: 'red'}},
        animation: {
          startup: true,  
          duration: 1000,
          easing: 'out',
        },
        curveType: 'function',
        hAxis: {viewWindow: {min:0, max:jsonData.length/2}}
      };
      var chart = new google.visualization.SteppedAreaChart(document.getElementById('complaintsMonth'));

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
        chart.draw(data, options);
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
      url: "https://usmpcrm-api.herokuapp.com/api/dashboard/complaint/all",
      dataType: "json",
    }).done(function (jsonData) {
  
      var mainContainer = document.getElementById("allComplaints");
      for (var i = 0; i < jsonData.length; i++) {
      var div = document.createElement("h1");
      div.innerHTML = jsonData[i].complaints;
      mainContainer.appendChild(div);
      
      }
    }).fail(function (text, err) {
      console.log(text + ' - ' + err);
    });

    $.ajax({
        url: "https://usmpcrm-api.herokuapp.com/api/dashboard/complaint/thismonth",
        dataType: "json",
      }).done(function (jsonData) {
    
        var mainContainer = document.getElementById("thismonthComplaints");
        for (var i = 0; i < jsonData.length; i++) {
        var div = document.createElement("h1");
        div.innerHTML = jsonData[i].complaints;
        mainContainer.appendChild(div);
        
        }
      }).fail(function (text, err) {
        console.log(text + ' - ' + err);
      });
  
  } 
  );
    
  
  
  
  
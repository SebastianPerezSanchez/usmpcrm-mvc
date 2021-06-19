google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(customersMonthL);
google.charts.setOnLoadCallback(ratingNumberC);
google.charts.setOnLoadCallback(complaintMonthC);

//COLUMN CHART CUSTOMER PER MONTH
function customersMonthL() {
      $.ajax({
        url: "https://usmpcrm-api.herokuapp.com/api/dashboard/customer/month",
        dataType: "json",
      }).done(function (jsonData) {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'date');
        data.addColumn('number', 'customers');

        jsonData.forEach(function (row) {
          data.addRow([
            row.date,
            row.customers
          ]);
        });

        var MAX = jsonData.length;
        
        var options = {
          title: 'New Customers per Month',
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
        var chart = new google.visualization.LineChart(document.getElementById('customersMonth'));

        var dataView = new google.visualization.DataView(data);
        dataView.setColumns([
          // reference existing columns by index
          0, 1,
          // add function for line color
          {
            calc: function(data, row) {
              var colorDown = 'green';
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


//PIECHART RATINGS
function ratingNumberP() {
      $.ajax({
        url: "https://usmpcrm-api.herokuapp.com/api/dashboard/customer/age",
        dataType: "json",
      }).done(function (jsonData) {
        var data = new google.visualization.DataTable();       
        data.addColumn('string', 'ejemplo') 
        data.addColumn('number', 'a');
        data.addColumn('number', 'b');
        data.addColumn('number', 'c');
        jsonData.forEach(function (row) {
          data.addRow([
            row.ejemplo,
            row.a,
            row.b,
            row.c
          ]);
        });
        

        var chart = new google.visualization.PieChart(document.getElementById('ratingNumber'));
        chart.draw(data, {
          animation: {
            startup: true,   /* Need to add this for animations */
            duration: 1000,
            easing: 'out',
          },
          width: 400,
          height: 240,
          position: 'absolute'
        });
      }).fail(function (jq, text, err) {
        console.log(text + ' - ' + err);
      });
}

function ratingNumberC() {
  $.ajax({
    url: "https://usmpcrm-api.herokuapp.com/api/dashboard/rating/number",
    dataType: "json",
  }).done(function (jsonData) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'rating');
    data.addColumn('number', 'count');

    jsonData.forEach(function (row) {
      data.addRow([
        row.rating,
        row.count
      ]);
    });

    var chart = new google.visualization.ColumnChart(document.getElementById('ratingNumber'));
    chart.draw(data, {
      animation: {
        startup: true,   /* Need to add this for animations */
        duration: 1000,
        easing: 'out',
      },
      title: 'Count per Stars',
      hAxis: {title: 'Stars', titleTextStyle: {color: '9B870C'}}
    });
  }).fail(function (jq, text, err) {
    console.log(text + ' - ' + err);
  });
}

function complaintMonthC() {
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

    var chart = new google.visualization.ColumnChart(document.getElementById('complaintMonth'));
    chart.draw(data, {
      animation: {
        startup: true,   /* Need to add this for animations */
        duration: 1000,
        easing: 'out',
      },
      title: 'Complaints per Month',
      hAxis: {title: 'Date', titleTextStyle: {color: 'red'}}
    });
  }).fail(function (jq, text, err) {
    console.log(text + ' - ' + err);
  });
}









//ONLY NUMBERS:

$(document).ready(function() {
  //This is to get the average rating API
    $.ajax({
      url: "https://usmpcrm-api.herokuapp.com/api/dashboard/rating/avg",
      dataType: "json",
    }).done(function (jsonData) {

      var mainContainer = document.getElementById("avgRating");
      for (var i = 0; i < jsonData.length; i++) {
      var div = document.createElement("h3");
      div.className = "mt-0 mb-0";
      div.style.cssText = "font-weight: bold;"
      div.innerHTML = jsonData[i].average;
      mainContainer.appendChild(div);
      }
    }).fail(function (jq, text, err) {
      console.log(text + ' - ' + err);
    });


  //This is to get all customers API
    $.ajax({
      url: "https://usmpcrm-api.herokuapp.com/api/dashboard/customer/all",
      dataType: "json",
    }).done(function (jsonData) {

      var mainContainer = document.getElementById("allCustomers");
      for (var i = 0; i < jsonData.length; i++) {
      var div = document.createElement("h3");
      div.className = "mt-0 mb-0";
      div.style.cssText = "font-weight: bold;"
      div.innerHTML = jsonData[i].customers;
      mainContainer.appendChild(div);
      }
    }).fail(function (text, err) {
      console.log(text + ' - ' + err);
    });



  //This is to get all complaints API
  $.ajax({
    url: "https://usmpcrm-api.herokuapp.com/api/dashboard/complaint/all",
    dataType: "json",
  }).done(function (jsonData) {

    var mainContainer = document.getElementById("allComplaints");
    for (var i = 0; i < jsonData.length; i++) {
    var div = document.createElement("h3");
    div.className = "mt-0 mb-0";
    div.style.cssText = "font-weight: bold;"
    div.innerHTML = jsonData[i].complaints;
    mainContainer.appendChild(div);
    
    }
  }).fail(function (text, err) {
    console.log(text + ' - ' + err);
  });

} 
);
  




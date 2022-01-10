$(function () {
  "use strict";

  var gridLineColor = "rgba(77, 138, 240, .1)";

  var colors = {
    primary: "#727cf5",
    secondary: "#7987a1",
    success: "#42b72a",
    info: "#68afff",
    warning: "#fbbc06",
    danger: "#ff3366",
    light: "#ececec",
    dark: "#282f3a",
    muted: "#686868",
  };

  // Dashbaord date start
  if ($("#dashboardDate").length) {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    $("#dashboardDate").datepicker({
      format: "dd-MM-yyyy",
      todayHighlight: true,
      autoclose: true,
    });
    $("#dashboardDate").datepicker("setDate", today);
  }
  // Dashbaord date end

  // Apex chart1 start
  if ($("#apexChart1").length) {
    var options1 = {
      chart: {
        type: "line",
        height: 60,
        sparkline: {
          enabled: !0,
        },
      },
      series: [
        {
          data: [41, 45, 44, 46, 52, 54, 43],
        },
      ],
      stroke: {
        width: 2,
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      colors: ["#727cf5"],
      tooltip: {
        fixed: {
          enabled: !1,
        },
        x: {
          show: !1,
        },
        y: {
          title: {
            formatter: function (e) {
              return "";
            },
          },
        },
        marker: {
          show: !1,
        },
      },
    };
    new ApexCharts(document.querySelector("#apexChart1"), options1).render();
  }
  // Apex chart1 end

  // Apex chart2 start
  if ($("#apexChart2").length) {
    var options2 = {
      chart: {
        type: "line",
        height: 60,
        sparkline: {
          enabled: !0,
        },
      },
      series: [
        {
          data: [41, 45, 44, 46, 52, 54, 43],
        },
      ],
      stroke: {
        width: 2,
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      colors: ["#727cf5"],
      tooltip: {
        fixed: {
          enabled: !1,
        },
        x: {
          show: !1,
        },
        y: {
          title: {
            formatter: function (e) {
              return "";
            },
          },
        },
        marker: {
          show: !1,
        },
      },
    };
    new ApexCharts(document.querySelector("#apexChart2"), options2).render();
  }
  // Apex chart2 end

  // Apex chart3 start
  if ($("#apexChart3").length) {
    var options3 = {
      chart: {
        type: "line",
        height: 60,
        sparkline: {
          enabled: !0,
        },
      },
      series: [
        {
          data: [41, 45, 44, 46, 52, 54, 43],
        },
      ],
      stroke: {
        width: 2,
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      colors: ["#727cf5"],
      tooltip: {
        fixed: {
          enabled: !1,
        },
        x: {
          show: !1,
        },
        y: {
          title: {
            formatter: function (e) {
              return "";
            },
          },
        },
        marker: {
          show: !1,
        },
      },
    };
    new ApexCharts(document.querySelector("#apexChart3"), options3).render();
  }
  // Apex chart3 end

  // Monthly sales chart start
  if ($("#monthly-sales-chart").length) {
    var monthlySalesChart = document
      .getElementById("monthly-sales-chart")
      .getContext("2d");
    new Chart(monthlySalesChart, {
      type: "bar",
      data: {
        labels: [
          "Senin",
          "Selasa",
          "Rabu",
          "Kamis",
          "Jumat",
          "Sabtu",
          "Minggu",
        ],
        datasets: [
          {
            label: "Sales",
            data: [32, 36, 35, 36.5, 36.5, 36.6, 36.8],
            backgroundColor: colors.primary,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            display: false,
          },
        },
        scales: {
          xAxes: [
            {
              display: true,
              barPercentage: 1,
              categoryPercentage: 0.6,
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: "#8392a5",
                fontSize: 10,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: gridLineColor,
              },
              ticks: {
                fontColor: "#8392a5",
                fontSize: 10,
                min: 30,
                max: 40,
              },
            },
          ],
        },
      },
    });
  }
  // Monthly sales chart end
});

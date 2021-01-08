import Highcharts from "highcharts";

const chartOne = (stateID) => {
  const colors = {
    deaths: "#1E8F62",
    costs: "#DD2678",
    white: "#ffffff",
    offWhite: "#cccccc",
    background: "#444444"
  };
  const healthData = {
    state: {
      deaths: {
        residential: 122,
        commercial: 2
      },
      costs: {
        residential: 1.375,
        commercial: 0.026
      }
    }
  };

  Highcharts.chart("chart-one", {
    chart: {
      zoomType: "xy",
      backgroundColor: colors.background
    },
    credits: false,
    title: {
      text: "Health Impacts: Residential vs. Commercial Buildings",
      margin: 50,
      style: {
        color: colors.white
      }
    },
    xAxis: [
      {
        categories: ["Residential", "Commercial"],
        crosshair: false,
        labels: {
          style: {
            color: colors.white,
            fontSize: "14px"
          }
        }
      }
    ],
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: "{value}",
          style: {
            color: colors.deaths
          }
        },
        title: {
          text: "# of Deaths",
          margin: 20,
          style: {
            color: colors.deaths,
            fontSize: "15px",
            fontWeight: "600"
          }
        }
      },
      {
        // Secondary yAxis
        title: {
          text: "Health Impact Costs",
          margin: 30,
          style: {
            color: colors.costs,
            fontSize: "15px",
            fontWeight: "600"
          }
        },
        labels: {
          format: "${value}B",
          style: {
            color: colors.costs
          }
        },
        opposite: true
      }
    ],
    tooltip: {
      shared: false,
      enabled: false
    },
    legend: {
      layout: "horizontal",
      floating: false,
      itemStyle: {
        color: colors.white
      },
      itemHoverStyle: {
        color: colors.offWhite
      }
    },
    series: [
      {
        name: "Deaths",
        type: "column",
        yAxis: 0,
        // data: [122, 2],
        data: [
          healthData.state.deaths.residential,
          healthData.state.deaths.commercial
        ],
        color: colors.deaths,
        borderColor: colors.deaths,
        dataLabels: {
          enabled: true,
          color: colors.white,
          style: {
            fontSize: "13px"
          }
        }
      },
      {
        name: "Costs",
        type: "column",
        data: [
          healthData.state.costs.residential,
          healthData.state.costs.commercial
        ],
        yAxis: 1,
        color: colors.costs,
        borderColor: colors.costs,
        dataLabels: {
          enabled: true,
          color: colors.white,
          style: {
            fontSize: "13px"
          },
          format: "${y}B"
        }
      }
    ]
  });
};

const chartTwo = (stateID) => {
  const colors = {
    nox: "#4C5480",
    voc: "#9C4F3D",
    white: "#ffffff",
    offWhite: "#cccccc",
    background: "#444444"
  };
  const healthData = {
    state: {
      nox: {
        residential: 34,
        commercial: 4
      },
      voc: {
        residential: 82,
        commercial: 1
      }
    }
  };

  Highcharts.chart("chart-two", {
    chart: {
      zoomType: "xy",
      backgroundColor: colors.background
    },
    credits: false,
    title: {
      text: "Health Impact Costs by Emissions Source in Buildings",
      margin: 50,
      style: {
        color: colors.white
      }
    },
    xAxis: [
      {
        categories: ["Residential", "Commercial"],
        crosshair: false,
        labels: {
          style: {
            color: colors.white,
            fontSize: "14px"
          }
        }
      }
    ],
    yAxis: [
      {
        title: {
          text: "Health Impact Costs",
          margin: 30,
          style: {
            color: colors.white,
            fontSize: "15px",
            fontWeight: "500"
          }
        },
        labels: {
          formatter: function () {
            if (this.value > 0) {
              return "$" + this.value + "M";
            } else {
              return this.value;
            }
          },
          style: {
            color: colors.white
          }
        }
      }
    ],
    tooltip: {
      shared: false,
      enabled: false
    },
    legend: {
      useHTML: true,
      layout: "horizontal",
      floating: false,
      itemStyle: {
        color: colors.white
      },
      itemHoverStyle: {
        color: colors.offWhite
      }
    },
    series: [
      {
        name: "NO<sub>x</sub>",
        type: "column",
        yAxis: 0,
        // data: [122, 2],
        data: [
          healthData.state.nox.residential,
          healthData.state.nox.commercial
        ],
        color: colors.nox,
        borderColor: colors.nox,
        dataLabels: {
          enabled: true,
          color: colors.white,
          style: {
            fontSize: "13px"
          },
          format: "${y}M"
        }
      },
      {
        name: "VOC",
        type: "column",
        data: [
          healthData.state.voc.residential,
          healthData.state.voc.commercial
        ],
        yAxis: 0,
        color: colors.voc,
        borderColor: colors.voc,
        dataLabels: {
          enabled: true,
          color: colors.white,
          style: {
            fontSize: "13px"
          },
          format: "${y}M"
        }
      }
    ]
  });
};

export { chartOne, chartTwo };

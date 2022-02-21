<template>
  <div>
    <v-row class="mt-8">
      <v-col id="learningCurve" md="12" align="center"></v-col>
      <v-col id="learningCurve2" md="12" align="center"></v-col>
    </v-row>
  </div>
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from "echarts/charts";
import { PieChart } from "echarts/charts";

// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from "echarts/components";
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  PieChart,
  LegendComponent,
]);

export default {
  props: ["typeList"],
  data() {
    return {
      hhmmArr: [],
      nameArr: [],
      dataList: [],
    };
  },
  methods: {
    initChart1() {
      var myChart = echarts.init(
        document.getElementById("learningCurve"),
        null,
        {
          width: 900,
          height: 600,
        }
      );
      // 绘制图表
      var option = {
        title: {
          text: "今日学习",
          subtext: "各科时间数据",
          left: "center",
          textStyle: {
            color: "white",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
          textStyle: {
            color: "white",
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: this.dataList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    initChart2() {
      var myChart = echarts.init(
        document.getElementById("learningCurve2"),
        null,
        {
          width: 1400,
          height: 800,
        }
      );
      var option = {
        textStyle: {
          color: "white",
        },
        xAxis: {
          type: "category",
          data: this.nameArr,
          textStyle: {
            color: "white",
          },
        },
        yAxis: {
          type: "value",
          textStyle: {
            color: "white",
          },
        },
        title: {
          text: "今日学习",
          subtext: "各科时间数据",
          left: "center",
          textStyle: {
            color: "white",
          },
        },
        series: [
          {
            data: this.hhmmArr,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    this.typeList.forEach((item) => {
      var hhmm = item.time.split("-");
      var strTime1 = hhmm[0].split(":");
      var strTime2 = hhmm[1].split(":");
      var b = new Date();
      var e = new Date();
      b.setHours(strTime1[0]);
      b.setMinutes(strTime1[1]);
      b.setSeconds(0);
      b.setMilliseconds(0);
      e.setHours(strTime2[0]);
      e.setMinutes(strTime2[1]);
      e.setSeconds(0);
      e.setMilliseconds(0);
      this.hhmmArr.push((e.getTime() - b.getTime()) / 10000 / 6);
      this.nameArr.push(item.type);
    });
    for (let i = 0; i < this.hhmmArr.length; i++) {
      this.dataList.push({ value: this.hhmmArr[i], name: this.nameArr[i] });
    }
    this.initChart1();
    this.initChart2();
  },
};
</script>

<style>
</style>
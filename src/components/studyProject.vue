<template>
  <div class="studyProject" :style="progressActive?'':{top:0}">
    <v-slide-group class="sub">
      <v-slide-item
        v-for="(item, index) in typeList"
        :key="index"
        v-slot="{ toggle }"
      >
        <div class="mx-2 subList pl-2" @click="toggle">
          <div class="kemu">{{ item.type }}</div>
          <div class="time" ref="time">{{ item.time }}</div>
        </div>
      </v-slide-item>
    </v-slide-group>

    <div class="subBox" v-if="!progressActive">
      <div class="btnSub">
        <div @click="isStudyFin = !isStudyFin">学习详情</div>
      </div>
      <study-fin v-show="!isStudyFin" :typeList="typeList"></study-fin>
      <study-charts v-show="isStudyFin" :typeList="typeList"></study-charts>
    </div>
    <v-progress-linear
      :value="progressValue"
      color="#3629a8"
      height="10"
      fixed
      bottom
      :active="progressActive"
    ></v-progress-linear>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
import studyCharts from '../components/studyCharts.vue'
import studyFin from "../components/studyFin.vue";
export default {
  components: { studyFin,studyCharts },
  name: "studyProject",
  data() {
    return {
      isClick: false,
      learnCurve: {},
      next: 0,
      prev: 0,
      isStudyFin: false,
      progressValue: 0,
      progressActive: true,
    };
  },
  computed: {
    typeList() {
      let res = [];
      let typeMap = new Map();
      let indexArr = [];
      this.$store.state.dataListOptions.typeList.forEach((item, index) => {
        let hhmm = item.time.split("-", 1)[0];
        let hh = hhmm.split(":");
        let sum = hh.reduce((total, val) => {
          return (total += val);
        }, "");
        res.push(parseInt(sum));
        typeMap.set(parseInt(sum), index);
      });
      console.log("排序前的res", res);
      res.sort(function (a, b) {
        return a - b;
      });
      console.log("排序后的res", res);
      res.forEach((item) => {
        indexArr.push(typeMap.get(item));
      });
      console.log("下标", indexArr);
      let finalArr = [];
      indexArr.forEach((item) => {
        this.$store.state.dataListOptions.typeList.forEach((data, index) => {
          if (index === item) {
            finalArr.push(data);
          }
        });
      });
      console.log("最终数组", finalArr);
      return finalArr;
    },

  },
  methods: {
    transSub(type) {
      let subBox = this.$refs.subBox;
      let len = this.$store.state.dataListOptions.typeList.length;
      let count = parseInt(len / 4);
      var transX = null;
      if (count > 0) {
        if (type === "next" && this.next < count) {
          this.next++;
          this.prev++;
          transX = this.next * -37.5 + "%";
        } else if (type === "prev" && this.prev > 0) {
          this.next--;
          this.prev--;
          transX = this.prev * -37.5 + "%";
        }
        subBox.style.transform = `translateX(${transX})`;
      }
    },
  },
  mounted() {
    var timeArr = [];
    var typeNameArr = [];
    this.typeList.forEach((item) => {
      timeArr.push(item.time);
      typeNameArr.push(item.type);
    });
    var len = this.typeList.length;
    pubsub.publish("judgeTime", [timeArr, typeNameArr, len]);
    this.tid = setInterval(() => {
      if (this.progressValue !== 100) {
        this.progressValue += 20;
      } else {
        this.progressActive = false;
        clearInterval(this.tid);
      }
    }, 500);
  },
  beforeRouteEnter(to, from, next) {
    if (to.path === "/studyProject") {
      if (localStorage.getItem("typeList")) {
        next();
      } else {
        alert("请新建一个计划");
      }
    }
  },
};
</script>

<style lang="less" scoped>
.studyProject {
  position: relative;
  top: 25%;
  transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  .sub {
    display: block;
    margin-top: 15%;
    .subList {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 335px;
      height: 130px;
      border: 1px solid grey;
      border-radius: 10px;
      font-size: 20px;
      transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    .subList:hover {
      background-color: #2a1e96;
    }
  }

  .subBox {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    background: linear-gradient(to right, black, #0f0948) !important;
    .btnSub {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 342px;
      margin-top: 50px;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 165px;
        height: 50px;
        border: 1px solid grey;
        border-radius: 7px;
        cursor: pointer;
      }
    }
  }
}
</style>>

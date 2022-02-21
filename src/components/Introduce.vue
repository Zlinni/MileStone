<template>
  <div class="intro">
    <div class="text-h2 font-weight-bold">{{ title }}</div>
    <div class="text-h4 mt-5">{{ subtitle }}</div>
    <v-btn
      color="#2a1e96"
      height="70"
      width="180"
      class="mt-5 text-h5"
      v-if="isShowBtn"
      to="/customProject"
    >
      快速开始
    </v-btn>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  data() {
    return {
      intro2: "现在开始你的学习计划",
      typeName: "",
      endTime: "",
      hours: "",
      minutes: "",
      beginTime: "",
      state: "",
    };
  },
  computed: {
    title() {
      if (this.$route.path === "/studyProject") {
        return this.typeName;
      } else {
        return this.$route.meta.title;
      }
    },
    subtitle() {
      if (this.$route.path === "/studyProject") {
        return this.endTime;
      } else {
        return this.$route.meta.subtitle;
      }
    },
    isShowBtn() {
      return this.$route.meta.isShowBtn;
    },
  },
  methods: {
    selectTimezone() {
      var d = new Date();
      //得到1970年一月一日到现在的秒数
      var len = d.getTime();
      //确定时区
      var timezone = -d.getTimezoneOffset() / 60;
      //本地时间与GMT时间的时间偏移差
      var offset = d.getTimezoneOffset() * 60000;
      //得到现在的格林尼治时间
      var utcTime = len + offset;
      return new Date(utcTime + 3600000 * timezone);
    },
    calTime() {
      var n = this.selectTimezone();
      var chazhi = this.beginTime - n;
      this.minutes = Math.floor((chazhi / 1000 / 60) % 60);
      this.hours = Math.floor((chazhi / 1000 / 60 / 60) % 24);
      if (this.hours > 0) {
        if (this.state === "start") {
          this.endTime = `距离下一个任务开始还有${this.hours}小时${this.minutes}分钟`;
        } else if (this.state === "end") {
          this.endTime = `距离学习结束还有${this.hours}小时${this.minutes}分钟`;
        }
      } else {
        if (this.state === "start") {
          this.endTime = `距离下一个任务开始还有${this.minutes}分钟`;
        } else if (this.state === "end") {
          this.endTime = `距离学习结束还有${this.minutes}分钟`;
        }
      }
      if (chazhi > 0) {
        setTimeout(() => {
          this.calTime();
        }, 1000);
      } else {
        this.$router.go(0);
      }
    },
  },
  mounted() {
    this.pid = pubsub.subscribe(
      "judgeTime",
      (msg, [timeArr, typeNameArr, len]) => {
        try {
          timeArr.forEach((item, index) => {
            var hhmm = item.split("-");
            var strTime1 = hhmm[0].split(":");
            var strTime2 = hhmm[1].split(":");
            var b = this.selectTimezone();
            var e = this.selectTimezone();
            var n = this.selectTimezone();
            b.setHours(strTime1[0]);
            b.setMinutes(strTime1[1]);
            b.setSeconds(0);
            b.setMilliseconds(0);
            e.setHours(strTime2[0]);
            e.setMinutes(strTime2[1]);
            e.setSeconds(0);
            e.setMilliseconds(0);

            if (b.getTime() - n.getTime() > 0) {
              this.typeName = "还未到学习时间";
              console.log(b);
              this.beginTime = b;
              this.state = "start";
              this.calTime();
              localStorage.removeItem("dayEnd");
              throw new Error("end");
            } else if (
              n.getTime() - b.getTime() >= 0 &&
              n.getTime() - e.getTime() < 0
            ) {
              this.typeName = typeNameArr[index];
              this.beginTime = e;
              this.state = "end";
              this.calTime();
              localStorage.removeItem("dayEnd");
              throw new Error("end");
            } else if (index === len - 1 && n.getTime() - e.getTime() >= 0) {
              this.typeName = "今日任务已完成";
              this.endTime = "点击查看今日总结~";
              localStorage.setItem("dayEnd", "end");
              throw new Error("end");
            }
          });
        } catch (e) {
          if (e.message !== "end") {
            throw e;
          }
        }
      }
    );
  },
  beforeDestroy() {
    pubsub.unsubscribe(this.pid);
  },
};
</script>

<style scoped lang="less">
.intro {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
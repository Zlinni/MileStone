<template>
  <v-container class="timeBar">
    <div class="title">时间管理</div>
    <span class="close"
      ><a href="/#/customProject"
        ><i :class="['iconfont', 'icon-guanbi']"></i></a
    ></span>
    <div class="prevSub" @mouseover="transSub('prev')">&lt;</div>
    <div class="nextSub" @mouseover="transSub('next')">&gt;</div>
    <div class="subBox" ref="subBox">
      <label
        class="subject"
        v-for="(s, index) in kemu"
        :key="index"
        @click="sendType(s.subject, index)"
        :class="{ active: index === currentIndex }"
        ><input
          type="radio"
          name="subject"
          style="display: none"
          :checked="index === 0"
          ref="checks"
        />{{ s.subject }}</label
      >
      <div
        class="tab"
        :style="{ left: currentIndex * 201.5 + 'px' }"
        v-if="!isNaN(currentIndex)"
      ></div>
    </div>
    <timeList :subject="subject" :people="this.$route.params.people"></timeList>
    <v-row justify="end">
      <v-col cols="4">
        <span class="addType">
          <i
            class="iconfont icon-tianjia mr-5"
            style="font-size: 30px"
            @click="addType"
          ></i>
          <v-btn light width="100px" @click.native="sendTypeArr"
            ><p style="color: black">确定</p></v-btn
          >
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import timeList from "../components/timeList.vue";
export default {
  data() {
    return {
      subject: "",
      currentIndex: "home",
      next: 0,
      prev: 0,
    };
  },
  components: {
    timeList,
  },
  computed: {
    kemu() {
      let res = [];
      this.$store.state.dataListOptions.dataList.forEach((data) => {
        if (data.people === this.$route.params.people) {
          res = data.kemu;
        }
      });
      return res;
    },
  },
  methods: {
    sendType(subject, index) {
      this.subject = subject;
      this.currentIndex = index;
    },
    transSub(type) {
      let subBox = this.$refs.subBox;
      let len = this.kemu.length;
      let count = parseInt(len / 4);
      var transX = null;
      if (count > 0) {
        if (type === "next" && this.next < count) {
          this.next++;
          this.prev++;
          transX = this.next * -33.5 + "%";
        } else if (type === "prev" && this.prev > 0) {
          this.next--;
          this.prev--;
          transX = this.prev * -33.5 + "%";
        }
        subBox.style.transform = `translateX(${transX})`;
      }
    },
    addType() {
      this.$store.commit("dataListOptions/addType", [
        this.$route.params.people,
        this.subject,
      ]);
    },
    sendTypeArr() {
      this.$store.dispatch(
        "dataListOptions/transType",
        this.$route.params.people
      );

      this.$router.push("/studyProject");
    },
  },
};
</script>

<style lang="less" scoped>
.timeBar {
  position: absolute;
  z-index: 99;
  left: 50%;
  top: 44%;
  padding-left: 10px;
  padding-right: 10px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 550px;
  background-color: white;
  color: black;
  border-radius: 10px;
  overflow-x: hidden;
  .title {
    margin-top: 20px;
    padding-left: 10px;
    font-size: 32px;
    font-weight: 700;
  }
  .close {
    position: absolute;
    z-index: 99;
    top: 10px;
    right: 0;
    margin-right: 20px;
    i {
      color: black;
    }
  }
  .nextSub {
    position: absolute;
    z-index: 99;
    top: 95px;
    right: -10px;
    margin-right: 20px;
    opacity: 0;
  }
  .prevSub {
    position: absolute;
    z-index: 99;
    top: 95px;
    left: 0;
    margin-right: 20px;
    opacity: 0;
  }
  .subBox {
    position: relative;
    display: flex;
    justify-content: start;
    align-items: center;
    width: 1200px;
    height: 52px;
    margin-top: 20px;
    transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    .subject {
      position: relative;
      z-index: 3;
      margin-left: 20px;
      width: 180px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border-radius: 5px;
      border: 1px solid grey;
    }
    .subject:nth-child(1) {
      margin-left: 0;
    }
    .active {
      transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      color: white;
    }
    .tab {
      position: absolute;
      z-index: 2;
      left: 0;
      width: 180px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border-radius: 5px;
      background: #5224d4 !important;
      transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
  }
  .addType {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.timeBar::-webkit-scrollbar {
  display: none;
}
</style>
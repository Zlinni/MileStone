<template>
  <div class="timeBar">
    <div class="settingBox">
      <div class="title">时间管理</div>
      <span class="close"
        ><a href="/#/customProject"
          ><i :class="['iconfont', 'icon-guanbi']"></i></a
      ></span>
      <div class="prevSub" @mouseover="prevSub">&lt;</div>
      <div class="nextSub" @mouseover="nextSub">&gt;</div>
      <div class="subBox">
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
        <div class="tab" :style="{ left: currentIndex * 202.5 + 'px' }"></div>
      </div>
      <timeList
        :subject="subject"
        :people="this.$route.params.people"
      ></timeList>
      <hr />
      <div class="footer">
        <i class="iconfont icon-tianjia addType" @click="addType"></i>
        <div class="confirm">
          <button>确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import timeList from "../components/timeList.vue";
export default {
  data() {
    return {
      subject: "",
      currentIndex: 0,
    };
  },
  components: {
    timeList,
  },
  computed: {
    kemu() {
      let res = [];
      this.$store.state.dataList.forEach((data) => {
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
    nextSub() {
      console.log("aaa");
      let subbox = document.getElementsByClassName("subBox")[0];
      subbox.style.transform = "translateX(-33.5%)";
    },
    prevSub() {
      let subbox = document.getElementsByClassName("subBox")[0];
      subbox.style.transform = "translateX(0)";
    },
    addType() {
      this.$store.commit("addType", [this.$route.params.people, this.subject]);
    },
  },
};
</script>

<style lang="less" scoped>
.timeBar {
  .settingBox {
    position: absolute;
    z-index: 99;
    left: 50%;
    top: 50%;
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
      top: 10px;
      right: 0;
      margin-right: 20px;
      a {
        color: black;
      }
    }
    .nextSub {
      position: absolute;
      z-index: 99;
      top: 95px;
      right: -10px;
      margin-right: 20px;
      cursor: pointer;
      opacity: 0;
    }
    .prevSub {
      position: absolute;
      z-index: 99;
      top: 95px;
      left: 0;
      margin-right: 20px;
      cursor: pointer;
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
    .footer {
      display: flex;
      justify-content: end;
      margin: 20px;
      .addType {
        margin-top: 5px;
        margin-right: 10px;
        font-size: 32px;
        color: gray;
        cursor: pointer;
      }
      .confirm {
        button {
          width: 200px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid grey;
          background-color: #fff;
        }
        button:hover {
          transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          background: #5224d4 !important;
          color: white;
        }
      }
    }
  }
  .settingBox::-webkit-scrollbar {
    display: none;
  }
}
</style>
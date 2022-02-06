<template>
  <v-container fluid class="navi">
    <v-row justify="space-between">
      <v-col class="navTab" md="5">
        <router-link
          class="navTabItem"
          v-for="(item, index) in items"
          :key="index"
          :to="item.paths"
        >
          <i :class="['navTabItem_icon', 'iconfont', item.icon]"></i>
          <p class="navTabItem_label">{{ item.label }}</p>
        </router-link>
        <div
          class="tab"
          :style="{ left: currentIndex * 202 + 'px' }"
          v-if="!isNaN(currentIndex)"
        ></div>
      </v-col>
      <v-col class="calender" md="3">
        <p>日历</p>
        <i class="iconfont icon-xiala" @click="isActive = !isActive"></i>
        <collapse>
          <calendars v-show="isActive"></calendars>
        </collapse>
      </v-col>
      <v-col class="memo" md="3">
        <p>备忘录</p>
        <i class="iconfont icon-xiala" @click="isActive"></i>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import calendars from "../components/calendars.vue";
import collapse from "../plugins/collapse";
export default {
  data() {
    return {
      items: [
        { icon: "icon-xuexijihua", label: "学习计划", paths: "/studyProject" },
        { icon: "icon-zongjie", label: "今日总结", paths: "/summary" },
        { icon: "icon-shouye", label: "自定义计划", paths: "/customProject" },
      ],
      isActive: false,
    };
  },
  components: {
    calendars,
    collapse,
  },
  computed: {
    currentIndex() {
      return this.$route.meta.currentIndex;
    },
  },
};
</script>

<style scoped lang="less">
.navi {
  margin-top: 20px;
  margin-bottom: 50px;
  .navTab {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border: 1px solid grey;
    border-radius: 6px;
    padding-left: 2px;
    padding-right: 2px;
    input[type="radio"] {
      display: none;
    }
    .tab {
      position: absolute;
      z-index: 2;
      left: 0.5%;
      width: 188px;
      height: 30px;
      background: #2a1e96 !important;
      border-radius: 6px;
      transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .navTabItem {
      position: relative;
      z-index: 3;
      display: flex;
      justify-content: start;
      align-items: center;
      width: 188px;
      height: 30px;
      border: 1px solid grey;
      border-radius: 6px;
    }
    .navTabItem_icon {
      margin-left: 38px;
    }
    .navTabItem_label {
      margin-left: 20px;
    }
  }
  .calender,
  .memo {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border: 1px solid grey;
    border-radius: 6px;
    padding-left: 20px;
    .icon-xiala {
      cursor: pointer;
    }
  }
}
@keyframes enter {
  from {
    display: none;
  }
  to {
    display: block;
  }
}
@keyframes leave {
  from {
    height: 300px;
  }
  to {
    height: 0;
  }
}
/* 来的时候 */
.v-enter-active {
  animation: enter 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
/* 去的时候 */
.v-leave-active {
  animation: leave 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
</style>
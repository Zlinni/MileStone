<template>
  <div class="navi">
    <div class="navTab">
      <router-link class="navTabItem" v-for="(item,index) in items" :key="index"  :to="item.paths">
        <i :class="['navTabItem_icon', 'iconfont', item.icon]"></i>
        <p class="navTabItem_label">{{
          item.label
        }}</p>
      </router-link>
      <div class="tab" :style="{left:currentIndex * 220 + 'px'}" v-if="!isNaN(currentIndex)"></div>
    </div>
    <div class="calender">
      <a href="#">日历</a>
    </div>
    <div class="memo">
      <a href="#">备忘录</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { icon: "icon-xuexijihua", label: "学习计划", paths: "/studyProject" },
        { icon: "icon-zongjie", label: "今日总结", paths: "/summary" },
        { icon: "icon-shouye", label: "自定义计划", paths: "/customProject" },
      ],
    };
  },
  computed:{
    currentIndex(){
      return this.$route.meta.currentIndex;
    }
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style scoped lang="less">
.navi {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  .navTab {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 650px;
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
      width: 213px;
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
      width: 212px;
      height: 30px;
      border: 1px solid grey;
      border-radius: 6px;
    }
    .navTabItem_icon{
      margin-left: 50px;
    }
    .navTabItem_label{
      margin-left: 20px;
    }
  }
  .calender,
  .memo {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 350px;
    height: 40px;
    border: 1px solid grey;
    border-radius: 6px;
    padding-left: 20px;
  }
}
</style>
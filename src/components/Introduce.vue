<template>
  <div class="intro">
    <transition-group appear>
      <div class="title" :key="1">{{ $route.meta.title }}</div>
      <div class="subtitle" :key="2">{{ $route.meta.subtitle}}</div>
      <div class="btnStart" :key="3" v-if="isShowBtn">
        <router-link to="/customProject">快速开始</router-link>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      intro2: "现在开始你的学习计划",
    };
  },
  computed: {
    isShowBtn(){
      return this.$route.meta.isShowBtn;
    }
  },
};
</script>

<style scoped lang="less">
.intro {
  display: flex;
  justify-content: center;
  flex-direction: column;
  .title {
    height: 100px;
    font-size: 70px;
    font-weight: 700;
  }
  .subtitle {
    height: 50px;
    font-size: 30px;
  }
  .btnStart {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 200px;
    height: 84px;
    background-color: #2a1e96;
    border-radius: 4px;
    a {
      font-size: 32px;
      font-weight: 600;
    }
  }
}
@keyframes enter {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
/* 来的时候 */
.v-enter-active {
  animation: enter 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
/* 去的时候 */
.v-leave-active {
  animation: enter 0.6s reverse;
}
</style>
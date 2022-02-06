<template>
  <div class="intro">
    <div class="text-h2 font-weight-bold" :key="1">{{ title }}</div>
    <div class="text-h4 mt-5" :key="2">{{ subtitle }}</div>
    <v-btn
      color="#2a1e96"
      height="70"
      width="180"
      class="mt-5"
      :key="3"
      v-if="isShowBtn"
    >
      <router-link to="/customProject" class="text-h5">快速开始</router-link>
    </v-btn>
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
    title() {
      return this.$route.meta.title;
    },
    subtitle() {
      return this.$route.meta.subtitle;
    },
    isShowBtn() {
      return this.$route.meta.isShowBtn;
    },
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
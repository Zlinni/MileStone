<template>
  <v-container fluid>
    <v-row justify="space-between" no-gutters>
      <v-col class="logo" cols="1">
        <i class="iconfont icon-xuexi"></i>
        <p class="text-h5 font-weight-bold ml-2">MileStone</p>
      </v-col>
      <v-col class="iconBox" cols="1" align-self="center">
        <i class="iconfont icon-gerenzhongxin2"></i>
        <i class="iconfont icon-shizhong ml-3" @click="isClock"></i>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["clockChoose"],
  methods: {
    isClock() {
      this.clockChoose();

    },
  },
};
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.iconfont {
  font-size: 32px;
}
</style>
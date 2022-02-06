<template>
  <v-container fluid class="header">
    <div class="logo text-h5 font-weight-bold">
      <i class="iconfont icon-xuexi"></i>
      MileStone
    </div>
    <div class="switch">
      <a href="#">专注模式</a>
      <a href="#">切换视图</a>
    </div>
    <div class="menu"><a href="#">菜单</a></div>
    <div class="iconAvatar">
      <i class="iconfont icon-user"></i>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "myheader",
  methods: {},
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  .switch {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 210px;
    height: 50px;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      border-radius: 6px;
      border: 1px solid grey;
      background-color: black;
    }
    a:hover {
      background-color: #5124de;
      transition: background-color 0.5s ease-in-out;
    }
  }
}
.iconfont{
  font-size: 32px;
}
</style>
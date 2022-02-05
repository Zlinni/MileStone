<template>
  <div class="header">
    <div class="logo">
      <img src="../statics/img/学习.png" alt="" />
      MileStone
    </div>
    <div class="switch">
      <a href="#">专注模式</a>
      <a href="#">切换视图</a>
    </div>
    <div class="menu"><a href="#">菜单</a></div>
    <div class="iconAvatar">
      <img src="../statics/img/头像.png" alt="" width="25px" height="25px" />
    </div>
  </div>
</template>

<script>
export default {
  name: "myheader",
  methods: {},
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}
.logo {
  font-size: 25px;
  font-weight: 700;
}
.logo img {
  width: 25px;
  height: 25px;
  background-color: #fff;
}
.switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 210px;
  height: 50px;
}
.switch a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  border-radius: 6px;
  border: 1px solid grey;
  background-color: black;
}

.switch a:hover {
  background-color: #5124de;
  transition: background-color 0.5s ease-in-out;
}
.iconAvatar img {
  background-color: #fff;
}
</style>
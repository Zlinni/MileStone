<template>
  <div id="app">
    <myheader></myheader>
    <navi></navi>
    <intro></intro>
    <router-view></router-view>
  </div>
</template>

<script>
import myheader from "./components/MyHeader";
import navi from "./components/Navigation";
import intro from "./components/Introduce";
export default {
  name: "App",
  components: {
    myheader,
    navi,
    intro,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  padding-top: 50px;
  padding-left: 50px;
  padding-right: 50px;
  overflow-x: hidden;
  background: black;
  color: white;
}
body::-webkit-scrollbar {
  display: none;
}
a {
  text-decoration: none;
  color: white;
}
li {
  list-style: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
input {
  background: none;
  outline: none;
  border: none;
}

#app {
}
</style>
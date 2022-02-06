<template>
  <v-app>
    <myheader></myheader>
    <navi></navi>
    <transition>
      <intro></intro>
    </transition>
    <router-view></router-view>
  </v-app>
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
  background: black !important;
  color: white;
}
body::-webkit-scrollbar {
  display: none;
}
a {
  text-decoration: none;
  color: white !important;
}
p {
  margin-bottom: 0 !important;
}
.v-application ol,
.v-application ul {
  padding-left: 0 !important;
}
#app {
  background: black !important;
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
<template>
  <div class="calendars">
    <transition appear>
        <v-sheet height="300">
      <v-calendar
        ref="calendar"
      ></v-calendar>
    </v-sheet>
    </transition>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less">
.calendars {
  position: absolute;
  z-index: 1;
  top: 40px;
  left: 0;
  width: 100%;
  height: 300px;
}

</style>
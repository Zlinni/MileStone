<template>
  <div class="studyFin">
    <div class="itemCount">今日学习:{{ typeList.length }}</div>
    <table class="finishTime">
      <tr class="finshNavi">
        <td>序号</td>
        <td>名称</td>
        <td>时间</td>
        <td>备注</td>
      </tr>
      <tr v-for="(item, index) in typeList" :key="index" class="finishList">
        <td>{{ index + 1 }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.time }}</td>
        <td>{{ item.remarks }}</td>
      </tr>
    </table>
    <div class="countMonth">From {{getTime}}</div>
  </div>
</template>

<script>
export default {
  props: ["typeList"],
  computed:{
    getTime(){
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth()+1;
      let day = now.getDate();
      return `${year}-${month}-${day}`
    }
  },
  mounted() {
    console.log(this.typeList)
  },
};
</script>

<style lang="less" scoped>
.itemCount {
  margin-top: 100px;
  font-size: 32px;
  font-weight: 700;
}
.finishTime {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 20px;

  .finshNavi td {
    height: 50px;
    border-bottom: 1px solid grey;
  }
  .finishList td {
    height: 100px;
    border-bottom: 1px solid grey;
  }
}
.countMonth {
  display: flex;
  justify-content: end;
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>
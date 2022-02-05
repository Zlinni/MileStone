<template>
  <div>
    <ul class="sub">
      <li v-for="item in subList" :key="item.id" class="subList">
        <div class="kemu" @click="showKemuMsg(item.id)">{{ item.kemu }}</div>
        <div class="time">{{ item.time }}</div>
      </li>
    </ul>
    <div class="subBox" v-if="isClick">
      <div class="btnSub">
        <a href="#">完成度</a>
        <a href="#">学习曲线</a>
      </div>
      <div class="itemCount">近日学习:{{ finishedTime.length }}</div>
      <table class="finishTime">
        <tr class="finshNavi">
          <td>次数</td>
          <td>时间</td>
          <td>目标</td>
          <td>评价</td>
        </tr>
        <tr v-for="item in finishedTime" :key="item.id" class="finishList">
          <td>{{ item.count }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.target }}</td>
          <td>{{ item.assessments }}</td>
        </tr>
      </table>
      <div class="countMonth">From 1月份</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'studyProject',
  data() {
    return {
      isClick: true,
      subList: [
        { id: "001", kemu: "高数", time: "13:00-15:00" },
        { id: "002", kemu: "英语", time: "13:00-15:00" },
        { id: "003", kemu: "政治", time: "13:00-15:00" },
        { id: "004", kemu: "计算机网络", time: "13:00-15:00" },
      ],
      finishedTime: [
        {
          id: "001",
          count: "1",
          time: "1-27 13:00-15:00",
          target: "学习第一章绪论",
          assessments: "自我感觉良好",
        },
        {
          id: "002",
          count: "2",
          time: "1-27 13:00-15:00",
          target: "学习第一章绪论",
          assessments: "自我感觉良好",
        },
        {
          id: "003",
          count: "3",
          time: "1-27 13:00-15:00",
          target: "学习第一章绪论",
          assessments: "自我感觉良好",
        },
      ],
      learnCurve: {},
    };
  },
  methods: {
    showKemuMsg(id) {
      console.log(id);
    },
  },
  mounted() {
    console.log(this.finishedTime.length);
  },
};
</script>

<style lang="less" scoped>
.sub {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  margin-top: 200px;
  .subList {
    display: flex;
    justify-content: space-between;
    // align-items: center;
    flex-direction: column;
    width: 310px;
    height: 100px;
    border: 1px solid grey;
    border-radius: 10px;
    list-style: none;
    padding: 15px;
    font-size: 20px;
  }
}
.subBox {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  background: linear-gradient(to right,black,#0f0948) !important;
  .btnSub {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 342px;
    margin-top: 50px;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 165px;
      height: 50px;
      border: 1px solid grey;
      border-radius: 7px;
    }
  }
  .itemCount {
    margin-top: 100px;
    font-size: 32px;
    font-weight: 700;
  }
  .finishTime {
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
}
</style>>

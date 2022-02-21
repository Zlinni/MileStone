<template>
  <div>
    <table class="typeBox" cellspacing="0">
      <tr class="typeOption">
        <td>名称</td>
        <td>时间</td>
        <td>备注</td>
        <td>修改</td>
      </tr>
      <tr v-for="(t, index) in typeList" :key="index" class="typeList">
        <td
          v-show="!t.edit"
          @mouseover="currentIndex = index"
          :class="{ active: currentIndex === index }"
        >
          {{ t.type }}
        </td>
        <td v-show="t.edit">
          <input
            type="text"
            :placeholder="t.type"
            style="width: 100px"
            ref="inputTask"
          />
        </td>
        <td
          v-show="!t.edit"
          @mouseover="currentIndex = index"
          :class="{ active: currentIndex === index }"
        >
          {{ t.time }}
        </td>
        <td v-show="t.edit">
          <v-dialog>
            <template v-slot:activator="{ on, attrs }">
              <v-btn light depressed v-on="on" v-bind="attrs">设置时间</v-btn>
            </template>
            <v-row justify="space-around" align="center">
              <v-col style="width: 350px; flex: 0 1 auto">
                <h2>Start:</h2>
                <v-time-picker v-model="start" :max="end" light></v-time-picker>
              </v-col>
              <v-col style="width: 350px; flex: 0 1 auto">
                <h2>End:</h2>
                <v-time-picker v-model="end" :min="start" light></v-time-picker>
              </v-col>
            </v-row>
          </v-dialog>
        </td>
        <td
          v-show="!t.edit"
          @mouseover="currentIndex = index"
          :class="{ active: currentIndex === index }"
        >
          {{ t.remarks }}
        </td>
        <td v-show="t.edit">
          <input
            type="text"
            :placeholder="t.remarks"
            style="width: 100px"
            ref="inputTask"
          />
        </td>
        <td :class="{ active: currentIndex === index }">
          <i
            class="iconfont icon-xiugaioryijian"
            @click="isEdit(t)"
            v-if="!t.edit"
          ></i>
          <i
            class="iconfont icon-duigou_kuai"
            @click="editFinish(t, t.id)"
            v-if="t.edit"
          ></i>
          <i class="iconfont icon-shanchu" @click="isDelete(t.id)"></i>
        </td>
      </tr>
      <div
        class="tab"
        :style="{ top: (currentIndex + 1) * 60 + 'px' }"
        v-if="!isNaN(currentIndex)"
      ></div>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: "reset",
      start: null,
      end: null,
    };
  },
  props: ["subject", "people"],
  computed: {
    typeList() {
      let res = [];
      this.$store.state.dataListOptions.dataList.forEach((data) => {
        if (data.people === this.people) {
          data.kemu.forEach((kemu) => {
            if (kemu.subject === this.subject) {
              res = kemu.typeList;
            }
          });
        }
      });
      return res;
    },
  },
  methods: {
    isEdit(typeList) {
      if (typeList.edit !== undefined) {
        typeList.edit = true;
      } else {
        this.$set(typeList, "edit", true);
      }
    },
    editFinish(typeList, typeId) {
      typeList.edit = false;
      var defaultValue = ["新任务", "暂无"];
      var typeValue = this.$refs.inputTask.reduce((res, item, index) => {
        return index < 2
          ? res.concat(item.value.trim() || defaultValue[index])
          : res;
      }, []);
      typeValue.push(this.start+'-'+this.end);
      this.$store.commit("dataListOptions/updatedType", [
        this.people,
        this.subject,
        typeId,
        typeValue,
      ]);
    },
    isDelete(typeId) {
      this.$store.commit("dataListOptions/deleteType", [this.people, this.subject, typeId]);
      this.currentIndex = "home";
    },
  },
  mounted() {
    this.currentIndex = "reset";
  },
};
</script>

<style lang="less" scoped>
.typeBox {
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;
  .typeList {
    td {
      position: relative;
      z-index: 3;
      width: 150px;
      height: 60px;
      border-bottom: 1px solid rgb(231, 228, 228);
      .iconfont {
        margin-right: 5px;
        font-size: 20px;
        cursor: pointer;
      }

    }
  }
  .typeOption {
    td {
      width: 150px;
      height: 60px;
      border-bottom: 1px solid #bbb8b8;
    }
  }
  .tab {
    position: absolute;
    z-index: 2;
    width: 600px;
    height: 60px;
    background: #5224d4 !important;
    color: white;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .active {
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    color: white;
  }
}

</style>
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
          <input
            type="text"
            :placeholder="t.time"
            style="width: 100px"
            ref="inputTask"
          />
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
  props: ["subject", "people"],
  data() {
    return {
      currentIndex: "home",
    };
  },
  computed: {
    typeList() {
      let res = [];
      this.$store.state.dataList.forEach((data) => {
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
      var typeValue = this.$refs.inputTask.reduce((res, item) => {
        return res.concat(item.value.trim());
      }, []);
      this.$store.commit("updatedType", [
        this.people,
        this.subject,
        typeId,
        typeValue,
      ]);
    },
    isDelete(typeId) {
      this.$store.commit("deleteType", [this.people, this.subject, typeId]);
    },
  },
};
</script>

<style lang="less" scoped>
.typeBox {
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;
  .typeOption td {
    width: 150px;
    height: 60px;
    border-bottom: 1px solid #bbb8b8;
  }
  .typeList td {
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
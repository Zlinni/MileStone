<template>
  <div class="customBox d-flex flex-column">
    <ul
      class="people"
      v-for="(p, index) in dataList"
      :key="index"
      @mouseenter="currentIndex = index"
      @mouseleave="currentIndex = 'home'"
      @click="isChoose"
    >
      <li class="peopleList">
        <i :class="['iconfont', items[index].icon]"></i>
        <router-link
          :to="{
            name: 'timeBar',
            params: {
              people: p.people,
            },
          }"
          >{{ p.people }}
        </router-link>
      </li>
      <v-expand-transition>
        <li class="showBooksBox" v-show="isActive(index)">
          <div class="showBooks" v-for="(k, index) in p.kemu" :key="index">
            <div class="imgBox">
              <img src="../statics/img/book.png" alt="" />{{ k.subject }}
            </div>
            <div class="bookBox">
              <div class="books" v-for="(t, index) in k.type" :key="index">
                {{ t }}
              </div>
            </div>
          </div>
        </li>
      </v-expand-transition>
    </ul>
    <div v-if="getChoose">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "customProject",
  data() {
    return {
      items: [
        { icon: "icon-ziyuanldpi", label: "考公" },
        { icon: "icon-yanjiusheng", label: "考研" },
        { icon: "icon-daxue", label: "大学" },
        { icon: "icon-shuben" },
      ],
      people: "",
      currentIndex: "home",
      getChoose:localStorage.getItem("choose") || false
    };
  },
  components: {
  },
  computed: {
    ...mapState("dataListOptions",["dataList"]),
  },
  methods: {
    isChoose() {
      localStorage.setItem("choose", true);
      this.getChoose = localStorage.getItem("choose");
    },
    isActive(index) {
      if (this.currentIndex === index) {
        return true;
      } else {
        return false;
      }
    },
  },

};
</script>

<style lang="less" scoped>
.customBox {
  height: 700px;
  .people:nth-child(1) {
    margin-top: 50px;
  }
  .people:last-child {
    margin-bottom: 50px;
  }
  .people {
    .peopleList {
      position: relative;
      z-index: 20;
      display: flex;
      justify-content: start;
      align-items: center;
      text-align: center;
      margin-top: 10px;
      padding: 20px;
      padding-left: 40px;
      height: 100px;
      border: 2px solid grey;
      i {
        font-size: 60px;
        margin-right: 10px;
      }
      a {
        font-size: 64px;
        font-weight: 700;
        font-style: italic;
        letter-spacing: 10px;
      }
    }
    .peopleList:hover {
      background: linear-gradient(to right, black, #0f0948) !important;
    }
    .showBooksBox {
      position: relative;
      z-index: 10;
      top: 0px;
      display: flex;
      justify-content: start;
      align-items: center;
      padding-top: 20px;
      padding-bottom: 20px;
      height: 200px;
      border: 1px solid grey;
      transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      .showBooks {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-left: 50px;
        .imgBox {
          width: 100px;
          img {
            width: 100%;
          }
        }
        .bookBox {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}
</style>
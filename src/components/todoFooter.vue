<template>
  <div class="todo-footer" v-show="total">
    <label>
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{ doneTodo }}</span> / 全部 {{ total }}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "MyFooter",
  computed: {
    ...mapState("todoOptions", ["todoObj"]),
    total() {
      return this.todoObj.length;
    },
    doneTodo() {
      return this.todoObj.reduce(
        (pre, current) => pre + (current.done ? 1 : 0),
        0
      );
    },
    isAll: {
      get() {
        return this.doneTodo === this.total && this.total > 0;
      },
      set(value) {
        this.$store.commit("todoOptions/checkAllTodo", value);
      },
    },
  },
  methods: {
    ...mapMutations("todoOptions", {
      clearAll: "clearTodo",
    }),
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
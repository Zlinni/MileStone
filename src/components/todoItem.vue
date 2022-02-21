<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @click="isCheck(todo.id)" />
      <span v-show="!todo.edit">{{ todo.title }}</span>
      <input
        v-show="todo.edit"
        type="text"
        :value="todo.title"
        @blur="isBlur(todo, $event)"
        ref="edit"
      />
    </label>
    <button class="btn btn-danger" @click="isDelete(todo.id)">删除</button>
    <button v-show="!todo.edit" class="btn btn-danger" @click="isEdit(todo)">
      编辑
    </button>
  </li>
</template>

<script>
export default {
  name: "MyItem",
  props: ["todo"],
  methods: {
    isCheck(id) {
      this.$store.commit("todoOptions/checkTodo", id);
    },
    isDelete(id) {
      if (confirm("确定删除吗?")) this.$store.commit("todoOptions/deleteTodo", id);
    },
    isEdit(todo) {
      if (todo.edit !== undefined) {
        todo.edit = true;
      } else {
        this.$set(todo, "edit", true);
      }
      // setTimeout(() => {
      //   this.$refs.edit.focus();
      // }, 200);
      this.$nextTick(function () {
        this.$refs.edit.focus();
      });
    },
    isBlur(todo, e) {
      todo.edit = false;
      this.$store.commit("todoOptions/updateTodo", [todo.id, e.target.value]);
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
}

li:hover button {
  display: block;
}
</style>
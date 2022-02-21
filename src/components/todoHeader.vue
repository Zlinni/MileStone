<template>
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      @keyup.enter="addTodos"
    />
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "MyHeader",
  methods: {
    addTodos(e) {
      if (e.target.value != "") {
        this.$store.commit("todoOptions/addTodo",{ id: nanoid(), title: e.target.value, done: false })
        e.target.value = "";
      }
    },
  },
};
</script>

<style scoped>
/*header*/
.todo-header{
  margin-bottom: 10px;
}
.todo-header input {
  width: 100%;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
  color:white
}
</style>
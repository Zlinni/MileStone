<template>
  <div class="todolist">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader />
        <MyList />
        <MyFooter/>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "./todoHeader.vue";
import MyList from "./todoListList.vue";
import MyFooter from "./todoFooter.vue";

export default {
  components: { MyHeader, MyList, MyFooter },
};
</script>

<style>
.todolist{
  position: absolute;
  z-index: 1;
  top: 40px;
  left: 0;
  width: 100%;
  height: 300px;
}
.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.btn-danger {
  color: #fff;
  background-color: #2a1e96;
  border: 1px solid #2a1e96;
}
.btn-danger:hover {
  color: #fff;
  background-color: #1505a7;
}
.btn:focus {
  outline: none;
}
.todo-container {
  margin: 0 auto;
}
.todo-container .todo-wrap {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>

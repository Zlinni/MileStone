import Vue from 'vue';
import vuex from 'vuex';
Vue.use(vuex);
var dataList = JSON.parse(localStorage.getItem('dataList')) || [{
    id: '001',
    people: "考公",
    kemu: [{
      subject: "行测",
      typeList: [{
        id: "001",
        type: "行测",
        time: '12:40-12:42',
        remarks: '暂无'
      }]
    }, {
      subject: "申论",
      typeList: [{
        id: "001",
        type: "申论",
        time: '15:00-16:00',
        remarks: '暂无'
      }]
    }],
  },
  {
    id: '002',
    people: "考研",
    kemu: [{
        subject: "数学",
        typeList: [{
            id: '001',
            type: "高等数学",
            time: '14:00-15:00',
            remarks: '暂无'
          },
          {
            id: '002',
            type: "线性代数",
            time: '15:00-16:00',
            remarks: '暂无'
          },
          {
            id: '003',
            type: "概率论",
            time: '16:00-17:00',
            remarks: '暂无'
          }
        ]
      },
      {
        subject: "英语",
        typeList: [{
          id: '001',
          type: "英语",
          time: '18:00-19:00',
          remarks: '暂无'
        }]
      },
      {
        subject: "政治",
        typeList: [{
          id: '001',
          type: "政治",
          time: '9:00-10:00',
          remarks: '暂无'
        }]
      },
      {
        subject: "计算机综合",
        typeList: [{
            id: '001',
            type: "数据结构",
            time: '10:00-10:30',
            remarks: '暂无'
          },
          {
            id: '002',
            type: "计算机组成原理",
            time: '10:30-10:40',
            remarks: '暂无'
          },
          {
            id: '003',
            type: "计算机网络",
            time: '10:40-10:41',
            remarks: '暂无'
          },
          {
            id: '004',
            type: "操作系统",
            time: '10:41-10:42',
            remarks: '暂无'
          }
        ],
      },
    ],
  },
  {
    id: '003',
    people: "大学",
    kemu: [{
        subject: "计算机编程基础",
        typeList: [{
            id: "001",
            type: "java语言",
            time: '13:00-15:00',
            remarks: '暂无'
          },
          {
            id: "002",
            type: "python语言",
            time: '13:00-15:00',
            remarks: '暂无'
          },
          {
            id: "003",
            type: "C语言",
            time: '13:00-15:00',
            remarks: '暂无'
          }
        ]
      },
      {
        subject: "前端基础",
        typeList: [{
            id: "001",
            type: "html",
            time: '13:00-15:00',
            remarks: '暂无'
          },
          {
            id: "002",
            type: "css",
            time: '13:00-15:00',
            remarks: '暂无'
          },
          {
            id: "003",
            type: "js",
            time: '13:00-15:00',
            remarks: '暂无'
          }
        ]
      },
      {
        subject: "前端进阶",
        typeList: [{
            id: "001",
            type: "jquery",
            time: '13:00-15:00',
            remarks: '暂无'
          },
          {
            id: "002",
            type: "nodejs",
            time: '13:00-15:00',
            remarks: '暂无'
          },
          {
            id: "003",
            type: "vue",
            time: '13:00-15:00',
            remarks: '暂无'
          }
        ]
      },
    ],
  },
];
var typeList = JSON.parse(localStorage.getItem('typeList')) || [];
var todoObj =  JSON.parse(localStorage.getItem("todoObj")) || [
  {id: "X5DX4v8Wz4r97xjs", title: "阿斯顿", done: false}
];
import {
  nanoid
} from 'nanoid';
const dataListOptions = {
  namespaced: true,
  actions: {
    transType(context, people) {
      if (context.state.typeList.length > 0) {
        context.state.typeList = [];
      }
      context.state.dataList.forEach(data => {
        if (data.people === people) {
          data.kemu.forEach(kemu => {
            context.commit('TRANSTYPE', kemu.typeList);
          })
          localStorage.setItem('kemuLens',data.kemu.length);
        }
        localStorage.setItem('typeList', JSON.stringify(context.state.typeList));
      });
    },
  },

  mutations: {
    updatedType(state, [people, subject, typeId, typeValue]) {
      console.log(typeValue);
      state.dataList.forEach(data => {
        if (data.people === people) {
          data.kemu.forEach(kemu => {
            if (kemu.subject === subject) {
              kemu.typeList.forEach(typelist => {
                if (typelist.id === typeId) {
                  Vue.set(typelist, 'type', typeValue[0]);
                  Vue.set(typelist, 'time', typeValue[2]);
                  Vue.set(typelist, 'remarks', typeValue[1]);
                }
              })
            }
          })
        }
      });
      localStorage.setItem('dataList', JSON.stringify(state.dataList));
    },
    deleteType(state, [people, subject, typeId]) {
      state.dataList.forEach(data => {
        if (data.people === people) {
          data.kemu.forEach(kemu => {
            if (kemu.subject === subject) {
              kemu.typeList.forEach((typelist, index) => {
                if (typelist.id === typeId) {
                  kemu.typeList.splice(index, 1)
                  console.log(kemu.typeList);
                }
              })
            }
          })
        }
      });
      localStorage.setItem('dataList', JSON.stringify(state.dataList));
    },
    addType(state, [people, subject]) {
      state.dataList.forEach(data => {
        if (data.people === people) {
          data.kemu.forEach(kemu => {
            if (kemu.subject === subject) {
              kemu.typeList.unshift({
                id: nanoid(),
                type: "新名称",
                time: "时间",
                remarks: "暂无"
              })
              console.log(kemu.typeList);
            }
          })
        }
      });
      localStorage.setItem('dataList', JSON.stringify(state.dataList));
    },
    TRANSTYPE(state, value) {
      value.forEach(item => {
        state.typeList.push(item);
      })
    }
  },

  state: {
    dataList: dataList,
    typeList: typeList
  }
}

const todoOptions = {
  namespaced: true,
  actions: {

  },
  mutations: {
      addTodo(state, obj) {
          state.todoObj.unshift(obj);
          localStorage.setItem("todoObj", JSON.stringify(state.todoObj));
      },
      checkTodo(state, id) {
          state.todoObj.forEach((todo) => {
              if (todo.id === id) todo.done = !todo.done;
          });
          localStorage.setItem("todoObj", JSON.stringify(state.todoObj));
      },
      deleteTodo(state, id) {
          state.todoObj = state.todoObj.filter((todo) => todo.id !== id);
          localStorage.setItem("todoObj", JSON.stringify(state.todoObj));

      },
      clearTodo(state) {
          state.todoObj = state.todoObj.filter((todo) => todo.done === false);
          localStorage.setItem("todoObj", JSON.stringify(state.todoObj));

      },
      checkAllTodo(state, done) {
          state.todoObj.forEach((todo) => {
              todo.done = done;
          });
          localStorage.setItem("todoObj", JSON.stringify(state.todoObj));

      },
      updateTodo(state, [id, title]) {
          state.todoObj.forEach((todo) => {
              if (todo.id === id) todo.title = title;
          });
          localStorage.setItem("todoObj", JSON.stringify(state.todoObj));

      },
  },
  state: {
      todoObj:todoObj
  },
}

// 创建并暴露store
export default new vuex.Store({
  modules: {
    dataListOptions,
    todoOptions
  }
})
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
        time: '11:00-15:00',
        remarks: '暂无'
      }]
    }, {
      subject: "申论",
      typeList: [{
        id: "001",
        type: "申论",
        time: '13:00-15:00',
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
            time: '13:00-15:00',
            remarks: '暂无'
          },
          {
            id: '003',
            type: "概率论",
            time: '13:00-15:00',
            remarks: '暂无'
          }
        ]
      },
      {
        subject: "英语",
        typeList: [{
          id: '001',
          type: "英语",
          time: '13:00-15:00',
          remarks: '暂无'
        }]
      },
      {
        subject: "政治",
        typeList: [{
          id: '001',
          type: "政治",
          time: '13:00-15:00',
          remarks: '暂无'
        }]
      },
      {
        subject: "计算机综合",
        typeList: [{
            id: '001',
            type: "数据结构",
            time: '13:00-15:00',
            remarks: '暂无'
          },
          {
            id: '002',
            type: "计算机组成原理",
            time: '13:00-15:00',
            remarks: '暂无'
          },
          {
            id: '003',
            type: "计算机网络",
            time: '13:00-15:00',
            remarks: '暂无'
          },
          {
            id: '004',
            type: "操作系统",
            time: '13:00-15:00',
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
import {
  nanoid
} from 'nanoid';
// actions mutation state
const actions = {

};

const mutations = {
  updatedType(state, [people, subject, typeId, typeValue]) {
    console.log(typeValue);
    state.dataList.forEach(data => {
      if (data.people === people) {
        data.kemu.forEach(kemu => {
          if (kemu.subject === subject) {
            kemu.typeList.forEach(typelist => {
              if (typelist.id === typeId) {
                Vue.set(typelist, 'type',typeValue[0]);
                Vue.set(typelist, 'time',typeValue[1]);
                Vue.set(typelist, 'remarks',typeValue[2]);
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
  }
};

const state = {
  dataList: dataList
};

// 创建并暴露store
export default new vuex.Store({
  actions,
  mutations,
  state
})
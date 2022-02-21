import vuerouter from 'vue-router'
import customProject from '../components/customProject.vue'
import studyProject from '../components/studyProject.vue'
import summary from '../components/summary.vue'
import timeBar from '../components/timeBar.vue'
export default new vuerouter({
    routes:[
        {
            path:'/',
            meta:{title:'里程碑',subtitle:'现在开始你的学习计划',isShowBtn:true,currentIndex:'home'}
        },
        {
            path:'/studyProject',
            component:studyProject,
            meta:{currentIndex:0},
        },
        {
            path:'/summary',
            component:summary,
            meta:{currentIndex:1},
        },
        {
            path:'/customProject',
            component:customProject,
            meta:{title:'选择一项计划快速开始',currentIndex:2},
            children:[{
                name:'timeBar',
                path:'timeBar/:people',
                component:timeBar,
                meta:{title:'规划时间',subtitle:'请在右侧规划任务和时间'}
            }]
        },
    ]
})
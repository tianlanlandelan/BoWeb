import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/404.vue'

import Topic from "./views/TopicInfo.vue"
import Exercise from "./views/ExerciseInfo.vue"
import End1 from "./views/End1.vue"
import End2 from "./views/End2.vue"

import Main from './views/Main.vue'
import Password from "./views/Password.vue"

import Admin from "./views/Admin.vue"
import TopicList from "./views/topic/list.vue"
import TopicEdit from "./views/topic/edit.vue"

import ExerciseList from "./views/exercise/list.vue"
import ExerciseEdit from "./views/exercise/edit.vue"

import SroceList from "./views/admin/ScoreList.vue"
import Settings from "./views/admin/Settings.vue"
import UserList from "./views/admin/UserList.vue"

let routes = [
	{
	    path: '/Manager',
	    component: Admin,
	    name: '课程管理',
	    iconCls: 'el-icon-message',//图标样式class
	    children: [
			{ path: '/SroceList', component: SroceList, name: '分类数据' },
			{ path: '/Settings', component: Settings, name: '设置' },
			{ path: '/UserList', component: UserList, name: '概览' }
	  //       { path: '/TopicList', component: TopicList, name: '课程列表' },
	  //       { path: '/TopicEdit', component: TopicEdit, name: '编辑课程' },
			// { path: '/ExerciseList', component: ExerciseList, name: '练习列表' },
			// { path: '/ExerciseEdit', component: ExerciseEdit, name: '编辑练习' }
	    ],
		//是否显示在Admin页面的左侧菜单列表中
		show:true
	},
	{ path: '/Topic', component: Topic, name: 'Topic' },
	{ path: '/Exercise', component: Exercise, name: 'Exercise' },
	{ path: '/End1', component: End1, name: 'End1' },
	{ path: '/End2', component: End2, name: 'End2' },
    {
        path: '/Login/:type',
        component: Login,
        name: ''
    },
	{
	    path: '/Password',
	    component: Password
	},
	{
	    path: '/Login/1',
		component: Login,
		alias: '/up1'
	},
	{
	    path: '/Login/2',
		component: Login,
		alias: '/down2'
	},
	{
	    path: '/Login/3',
		component: Login,
		alias: '/inter3'
	},
	{
	    path: '/Login/4',
		component: Login,
		alias: '/intra4'
	},
	{
	    path: '/Login/5',
		component: Login,
		alias: '/vague5'
	},
	{
	    path: '/Login/6',
		component: Login,
		alias: '/control6'
	},
	{
	    path: '/Login/99',
		component: Login,
		alias: '/admin'
	},
    {
        path: '/Register',
        component: Register,
        name: ''
    },
    {
        path: '/404',
        component: NotFound,
        name: ''
    }
	,
    {
        path: '*',
        redirect: { path: '/404' }
    }
];

export default routes;
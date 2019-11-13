import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/404.vue'

import Topic from "./views/Topic.vue"
import Exercise from "./views/ExerciseInfo.vue"

import Main from './views/Main.vue'
import Password from "./views/Password.vue"

import Admin from "./views/Admin.vue"
import TopicList from "./views/topic/list.vue"
import TopicEdit from "./views/topic/edit.vue"

import CourseEidt from "./views/course/edit.vue"
import CourseList from "./views/course/list.vue"
import CourseView from "./views/course/view.vue"

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
			{ path: '/UserList', component: UserList, name: '概览' },
	        { path: '/TopicList', component: TopicList, name: '课时列表' },
	        { path: '/TopicEdit', component: TopicEdit, name: '编辑课时' },
			{ path: '/ExerciseList', component: ExerciseList, name: '练习列表' },
			{ path: '/ExerciseEdit', component: ExerciseEdit, name: '编辑练习' },
			{ path: '/CourseEidt', component: CourseEidt, name: '编辑课程' },
			{ path: '/CourseList', component: CourseList, name: '课程列表' },
			{ path: '/CourseView', component: CourseView, name: '课程展示' }
	    ],
		//是否显示在Admin页面的左侧菜单列表中
		show:true
	},
	{ 	path: '/Topic', component: Topic, name: 'Topic' },
	{ 	path: '/Exercise', component: Exercise, name: 'Exercise' },
    {	path: '/Login/:type',component: Login,name: ''},
	{ 	path: '/Password',component: Password},
	{	path: '/Login/1',component: Login,alias: '/'},
	{	path: '/Login/99',component: Login,alias: '/admin'},
    { 	path: '/Register',component: Register, name: ''},
    {	path: '/404',component: NotFound,name: ''},
    {	path: '*', redirect: { path: '/404' },
	}
];

export default routes;
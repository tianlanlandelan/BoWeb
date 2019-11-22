import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/404.vue'

import Exercise from "./views/ExerciseInfo.vue"

import Main from './views/Main.vue'
import Password from "./views/Password.vue"

import Admin from "./views/Admin.vue"
import Home from "./views/Home.vue"
import TopicList from "./views/topic/list.vue"
import TopicEdit from "./views/topic/edit.vue"
import Topic from "./views/topic/view.vue"

import CourseEidt from "./views/course/edit.vue"
import CourseList from "./views/course/list.vue"
import Course from "./views/course/view.vue"

import SroceList from "./views/admin/ScoreList.vue"
import Settings from "./views/admin/Settings.vue"
import UserList from "./views/admin/UserList.vue"

import markdown from "./components/MarkDown.vue"

let routes = [
	{
	    path: '/Manager',
	    component: Admin,
	    name: '管理页面',
	    iconCls: 'el-icon-message',//图标样式class
	    children: [
			{ path: '/SroceList', component: SroceList, name: '分类数据' },
			{ path: '/Settings', component: Settings, name: '设置' },
			{ path: '/UserList', component: UserList, name: '概览' },
			{ path: '/CourseList', component: CourseList, name: '课程列表' }
	    ],
		//是否显示在Admin页面的左侧菜单列表中
		show:true
	},
	{
	    path: '/SubManager',
	    component: Admin,
	    name: '管理子页面',
	    iconCls: 'el-icon-message',//图标样式class
	    children: [

	        { path: '/TopicList', component: TopicList, name: '课时列表' },
	        { path: '/TopicEdit', component: TopicEdit, name: '编辑课时' },
			{ path: '/CourseEidt', component: CourseEidt, name: '编辑课程' }
	    ],
		//是否显示在Admin页面的左侧菜单列表中
		show:false
	},
	{
	    path: '/Home',
	    component: Home,
	    name: '用户主页面',
	    children: [
	       { 	path: '/Topic', component: Topic, name: 'Topic' },
	       { 	path: '/Course', component: Course, name: 'Course' },
	       { 	path: '/Exercise', component: Exercise, name: 'Exercise' }
	    ]
	},
	{ 	path: '/Password',component: Password},
	{	path: '/login',component: Login,name:"login"},
    { 	path: '/Register',component: Register, name: 'Register'},
    {	path: '/markdown',component: markdown,name: 'markdown'},
	{	path: '/404',component: NotFound,name: ''},
    {	path: '*', redirect: { path: '/404' },
	
	}
];

export default routes;
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/404.vue'

import Exercise from "./views/ExerciseInfo.vue"

import Main from './views/Main.vue'
import Password from "./views/Password.vue"

import Admin from "./views/Admin.vue"
import Home from "./views/Home.vue"
import NoteList from "./views/note/list.vue"
import NoteEdit from "./views/note/edit.vue"
import Note from "./views/note/view.vue"

import CourseEidt from "./views/course/edit.vue"
import CourseList from "./views/course/list.vue"
import Course from "./views/course/view.vue"

import SroceList from "./views/admin/ScoreList.vue"
import Settings from "./views/admin/Settings.vue"
import UserList from "./views/admin/UserList.vue"

import markdown from "./components/MarkDown.vue"

let routes = [
	{	path: '/',component: Login,name:"login"},
	{
	    path: '/SystemAdmin',
	    component: Admin,
	    name: '系统设置',
	    iconCls: 'el-icon-message',//图标样式class
	    children: [
			{ path: '/SroceList', component: SroceList, name: '分类数据' },
			{ path: '/Settings', component: Settings, name: '设置' },
			{ path: '/UserList', component: UserList, name: '概览' }
	    ],
		//是否显示在Admin页面的左侧菜单列表中
		show:true
	},
	{
	    path: '/ContentAdmin',
	    component: Admin,
	    name: '内容管理',
	    iconCls: 'el-icon-message',//图标样式class
	    children: [
			{ path: '/CourseList', component: CourseList, name: '笔记本' }
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

	        { path: '/NoteList', component: NoteList, name: '笔记' },
	        { path: '/NoteEdit', component: NoteEdit, name: '编辑笔记' },
			{ path: '/CourseEidt', component: CourseEidt, name: '编辑笔记本' }
	    ],
		//是否显示在Admin页面的左侧菜单列表中
		show:false
	},
	{ 	path: '/Password',component: Password},
    { 	path: '/Register',component: Register, name: 'Register'},
    {	path: '/Home',component: Home,name: 'Home'},
	{	path: '/404',component: NotFound,name: ''},
    {	path: '*', redirect: { path: '/404' },
	
	}
];

export default routes;
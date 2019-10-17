import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Password from "./views/Password.vue"

import Admin from "./views/Admin.vue"
import TopicList from "./views/topic/list.vue"
import TopicEdit from "./views/topic/edit.vue"

let routes = [
	{
	    path: '/Manager',
	    component: Admin,
	    name: '课程管理',
	    iconCls: 'el-icon-message',//图标样式class
	    children: [
	        { path: '/TopicList', component: TopicList, name: '课程列表' },
	        { path: '/TopicEdit', component: TopicEdit, name: '编辑课程' }
	    ],
		//是否显示在Admin页面的左侧菜单列表中
		show:true
	},
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
    },
    {
        path: '/Home',
        component: Home,
        name: ''
    }
	,
    {
        path: '*',
        redirect: { path: '/404' }
    }
];

export default routes;
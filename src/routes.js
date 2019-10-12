import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Password from "./views/Password.vue"



let routes = [
    {
        path: '/Login/:type',
        component: Login,
        name: '',
        hidden: true
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
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/Home',
        component: Home,
        name: ''
    }
	,
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
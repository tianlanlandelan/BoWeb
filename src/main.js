import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'
import './index.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
	//使用history模式来避免页面输入路由参数后自动加 # 
	mode: 'history',
	routes
})

//过滤路由，只有登录和注册页面允许未登录状态下访问
router.beforeEach((to, from, next) => {
  if (to.path == '/Login' || to.path == '/Register') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  let admin = sessionStorage.getItem('admin');
  //未登录状态下访问用户页面
  if (!user 
		&& (to.path == '/Topic' 
			|| to.path == '/Exercise'
			|| to.path == '/End1'
			|| to.path == '/End2'
			) 
		) {
    next({ path: '/404' });
  } 
  
  //非管理员访问管理员页面
  if(admin!="admin"
	&& (to.path == '/SroceList' 
		|| to.path == '/Settings'
		|| to.path == '/UserList'
		)
	){
		next({ path: '/404' });	
	}
	
    next();
  
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


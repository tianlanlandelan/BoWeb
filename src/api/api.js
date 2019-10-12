import axios from 'axios';
import md5 from 'js-md5';
/** 需要先登录再访问的路由 */
let api = 'api';

/** 不需要登录就能访问的路由 */
let base = 'base';

/**
 * 注册
 */
export const req_register = (user) => { 
    return axios.post(api, {
		type:user.type,
        email:user.email,
		sid:user.sid,
        password:user.password
    },{
		headers:{
			'method':'register'
		}
	}).then(res => res.data); 
};
/**
 * 修改个人信息
 */
export const req_updateUserInfo = (user) => { 
    return axios.put(api, {
		id:user.id,
		firstName:user.firstName,
		lastName:user.lastName,
		avatarId:user.avatarId
    },{
		headers:{
			'method':'userInfo'
		}
	}).then(res => res.data); 
};
/**
 * 登录接口
 */
export const req_logon = (user) => { 
    return axios.post(api, {
        type:user.type,
        name:user.email,
		password:user.password
    },{
		headers:{
			'method':'login'
		}
	}).then(res => res.data); 
};

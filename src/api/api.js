import axios from 'axios';
import md5 from 'js-md5';
/** 需要先登录再访问的路由 */
let api = 'api';
let form = "api/form"

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
        password:user.password,
		code:user.code
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
export const req_setTimer = (userId,timer) => { 
    return axios.put(api, {
		userId:userId,
		timer:timer
    },{
		headers:{
			'method':'rate'
		}
	}).then(res => res.data); 
};

export const req_feedBack = (userId,feedback1,feedback2) => { 
    return axios.put(api, {
		userId:userId,
		feedback1:feedback1,
		feedback2:feedback2
    },{
		headers:{
			'method':'rate/feedback'
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
	}).then(res => res.data)
	.catch(err =>{console.log("loginError",err)}); 
};

// TODO
export const req_forgetPassword = (user) => { 
    return axios.post(api, {
        type:user.type,
        name:user.email
    },{
		headers:{
			'method':'forgetPassword'
		}
	}).then(res => res.data); 
};
/**
 * 添加课程
 */
export const req_saveTopic = (topic) => { 
    return axios.post(api, {
        sort		:topic.sort,
        title		:topic.title,
        content		:topic.content,	
        pptUrl		:topic.pprUrl,
        videoUrl	:topic.videoUrl	
    },{
		headers:{
			'method':'topicInfo'
		}
	}).then(res => res.data); 
};
export const req_getTopicList = () => { 
    return axios.get(form, {
		headers:{
			'method':'topicInfo/getAll'
		}
	}).then(res => res.data); 
};
export const req_getCurrent = (userId) => { 
    return axios.get(form, {
		params:{
			userId:userId
		},
		headers:{
			'method':'topicInfo/getCurrent'
		}
	}).then(res => res.data); 
};
export const req_getNext = (userId) => { 
    return axios.get(form, {
		params:{
			userId:userId
		},
		headers:{
			'method':'topicInfo/getNext'
		}
	}).then(res => res.data); 
};

export const req_getTopicInfo = (id) => { 
    return axios.get(form, {
		params:{
			id:id
		},
		headers:{
			'method':'topicInfo'
		}
	}).then(res => res.data); 
};

/**
 * 添加练习
 */
export const req_saveExercise = (exercise) => { 
    return axios.post(api, {
        topicId	:exercise.topicId	,
		sort	:exercise.sort		,
        title	:exercise.title		,
        content	:exercise.content	,
        img		:exercise.img		,
        question:exercise.question	,
        optionA	:exercise.optionA	,
        optionB	:exercise.optionB	,
        optionC	:exercise.optionC	,
        optionD	:exercise.optionD	,
        answer	:exercise.answer	
    },{
		headers:{
			'method':'exerciseInfo'
		}
	}).then(res => res.data); 
};
export const req_getExerciseList = () => { 
    return axios.get(form, {
		headers:{
			'method':'exerciseInfo/getAll'
		}
	}).then(res => res.data); 
};
/**
 * get方法提交的参数要按照form表单的形式接收
 */
export const req_getExerciseInfo = (id) => { 
    return axios.get(form, {
		params:{
			id:id
		},
		headers:{
			'method':'exerciseInfo'
		}
	}).then(res => res.data); 
};
/**
 * 获取用户主页左侧导航菜单
 */
export const req_getMenu = (userId) => { 
    return axios.get(form, {
		params:{
			userId:userId
		},
		headers:{
			'method':'getMenu'
		}
	}).then(res => res.data); 
};


export const req_saveScore = (userId,exerciseId,score,answer) => { 
    return axios.post(api, {
        userId:userId,
		exerciseId:exerciseId,
		score:score,
		answer:answer
    },{
		headers:{
			'method':'rate'
		}
	}).then(res => res.data); 
};
/**
 * 获取排行榜
 */
export const req_getLeaderBoard1 = (userId) => { 
    return axios.get(form, {
		params:{
			userId:userId
		},
		headers:{
			'method':'rate/getUp'
		}
	}).then(res => res.data); 
};

export const req_getLeaderBoard2 = (userId) => { 
    return axios.get(form, {
		params:{
			userId:userId
		},
		headers:{
			'method':'rate/getDown'
		}
	}).then(res => res.data); 
};
export const req_getLeaderBoard3 = (userId) => { 
    return axios.get(form, {
		params:{
			userId:userId
		},
		headers:{
			'method':'rate/getMiddle'
		}
	}).then(res => res.data); 
};


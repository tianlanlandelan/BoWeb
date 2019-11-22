import axios from 'axios';
import md5 from 'js-md5';
/** 需要先登录再访问的路由 */
let api = 'api';
let form = "form"

/** 不需要登录就能访问的路由 */
let base = 'base';

/**
 * 注册
 */
export const req_register = (user) => { 
    return axios.post(api, {
		type:user.type,
        email:user.email,
        password:user.password,
		code:user.code
    },{
		headers:{
			'method':'register'
		}
	}).then(res => res.data).catch(err => err); 
};
/**
 * 修改个人信息
 */
export const req_updateUserInfo = (user) => { 
    return axios.put(api, {
		id:user.id,
		nickName:user.nickName,
		avatarId:user.avatarId
    },{
		headers:{
			'method':'userInfo'
		}
	}).then(res => res.data).catch(err => err); 
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
	}).then(res => res.data).catch(err => err); 
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
	}).then(res => res.data).catch(err => err); 
};
/**
 * 添加课程
 */
export const req_saveTopic = (topic) => { 
    return axios.post(api, {
		id			:topic.id,
		courseId	:topic.courseId,
		chapterId	:topic.chapterId,
        sort		:topic.sort,
        title		:topic.title,
		contentMD	:topic.contentMD,	
        content		:topic.content,	
        videoUrl	:topic.videoUrl	
    },{
		headers:{
			'method':'topicInfo'
		}
	}).then(res => res.data).catch(err => err); 
};

/**
 * 修改课时顺序
 */
export const req_updateTopic = (id,chapterId,sort) => { 
    return axios.put(api, {
		id:id,
		chapterId:chapterId,
		sort:sort
    },{
		headers:{
			'method':'topicInfo'
		}
	}).then(res => res.data).catch(err => err); 
};

export const req_deleteTopic = (id) => { 
    return axios.delete(form, {
		params:{
			id:id
		},
		headers:{
			'method':'topicInfo'
		}
	}).then(res => res.data).catch(err => err); 
};
export const req_saveCourse = (course) => { 
    return axios.post(api, {
		id:course.id,
        title:course.title,
		subTitle:course.subTitle,
		img:course.img,
		overviewMD:course.overviewMD,
		overview:course.overview,
		price:course.price,
		status:course.status
    },{
		headers:{
			'method':'course'
		}
	}).then(res => res.data)
	.catch(err => err); 
};
export const req_saveChapter = (chapter) => { 
    return axios.post(api, {
		id:chapter.id,
        courseId:chapter.courseId,
		name:chapter.name,
		sort:chapter.sort
    },{
		headers:{
			'method':'chapter'
		}
	}).then(res => res.data)
	.catch(err => err); 
};
export const req_updateChapter = (id,sort,name) => { 
    return axios.put(api, {
		id:id,
		sort:sort,
		name:name
    },{
		headers:{
			'method':'chapter'
		}
	}).then(res => res.data).catch(err => err); 
};
export const req_getCourseList = () => { 
    return axios.get(form, {
		headers:{
			'method':'course/getAll'
		}
	}).then(res => res.data).catch(err => err);  
};
export const req_getChapterList = (courseId) => { 
    return axios.get(form, {
		params:{
			courseId:courseId
		},
		headers:{
			'method':'chapter'
		}
	}).then(res => res.data).catch(err => err);  
};
export const req_deleteChapter = (id) => { 
    return axios.delete(form, {
		params:{
			id:id
		},
		headers:{
			'method':'chapter'
		}
	}).then(res => res.data).catch(err => err); 
};
export const req_getCourse = (id) => { 
    return axios.get(form, {
		params:{
			id:id
		},
		headers:{
			'method':'course'
		}
	}).then(res => res.data).catch(err => err); 
};
export const req_getTopicList = (courseId) => { 
    return axios.get(form, {
		params:{
			courseId:courseId
		},
		headers:{
			'method':'topicInfo/getList'
		}
	}).then(res => res.data).catch(err => err); 
};

export const req_getTopicInfo = (id) => { 
    return axios.get(form, {
		params:{
			id:id
		},
		headers:{
			'method':'topicInfo'
		}
	}).then(res => res.data).catch(err => err); 
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
	}).then(res => res.data).catch(err => err); 
};
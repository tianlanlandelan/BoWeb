

const config={
	nginxUrl : "http://127.0.0.1:8081/nginx",
	type:{
		register:0,
		login:1,
		resetPassword:2
	}
}

const user={
	id:0,
	type:1,
	email: '',
	password: '',
	code:'',
	nickName:'',
	avatarId:0,
	//初始化时赋值为true，此时用户尚未输入内容，不提示错误
	sidChecked:true,
	emailChecked:true,
	passChecked:true,
	codeChecked:true,
	//没有输入用户名时，提交按钮是禁用状态
	nameChecked:true,
	checkEmail(){
		if(this.email == ""){
		   this.emailChecked = false;
		}else{
			this.emailChecked =  true;
		}
		return this.emailChecked;
	},
	checkPassword(){
		if(this.password == "" || this.password.length < 6){
			this.passChecked = false;
		}else{
			this.passChecked = true;
		}
		return this.passChecked;
	},
	checkCode(){
		if(this.code == ""){
			this.codeChecked = false;
		}else{
			this.codeChecked = true;
		}
		return this.codeChecked;
	},
	checkUserName(){
		if(this.nickName == ""){
			this.nameChecked = false;		   
		}else{
			this.nameChecked = true;
		}
		return this.nameChecked;
	}
}

const topic = {
	id:0,
	sort:0,
	title:"",
	content:"",
	videoTitle:"",
	videoUrl:"",
	createTime:"",
	init(){
		this.id=0,
		this.sort=0,
		this.title="",
		this.content="",
		this.videoTitle="",
		this.videoUrl="",
		this.createTime=""
	}
}

const exercise = {
	id:0,
	topicId:0,
	sort:0,
	title:"",
	content:"",
	img:"",
	question:"",
	optionA:"",
	optionB:"",
	optionC:"",
	optionD:"",
	answer:"",
	toString(){
		return "ExerciseInfo{" +
                "id=" + this.id +
                ", topicId=" + this.topicId +
                ", sort=" + this.sort +
                ", title='" + this.title + '\'' +
                ", content='" + this.content + '\'' +
                ", img='" + this.img + '\'' +
                ", question='" + this.question + '\'' +
                ", optionA='" + this.optionA + '\'' +
                ", optionB='" + this.optionB + '\'' +
                ", optionC='" + this.optionC + '\'' +
                ", optionD='" + this.optionD + '\'' +
                ", answer='" + this.answer + '\'' +
                '}';
	},
	init(){
		this.id=0,
		this.topicId=0,
		this.sort=0,
		this.title="",
		this.content="",
		this.img="",
		this.question="",
		this.optionA="",
		this.optionB="",
		this.optionC="",
		this.optionD="",
		this.answer=""
	}
}


const utils = {
	/**
	 * 获取url 中的带的查询参数
	 * @param {Object} name
	 */
	getParameter(name) {
		var query = window.location.search;
		var iLen = name.length;
		var iStart = query.indexOf(name);
		if(iStart == -1)
			return "";
		var iEnd = query.indexOf("&", iStart);
		if(iEnd != -1){
			return query.substring(iStart + iLen + 1,iEnd);
		}else{
			return query.substring(iStart + iLen + 1);
		}	
	},
	warningCannotStudy(){
		this.$notify({
		title: 'Please follow the specified learning path', 
		message: 'You can\'t preview the topic not yet started!',
		type: 'warning'
		});
	}
	,
	warningCannotDoExercise(){
		this.$notify({
		title: 'Please follow the specified learning path', 
		message: 'You can\'t preview the exercises not yet started!',
		type: 'warning'
		});
	}
	,
	warningReStudy(){
		this.$notify({
		title: 'Please follow the specified learning path', 
		message: 'You can\'t review the topic completed previously!',
		type: 'warning'
		});
	}
	,
	warningReExercise(){
		this.$notify({
		title: 'Please follow the specified learning path',
		message: 'You can\'t review the submitted exercises!',
		type: 'warning'
		});
	}
}
export {
	user,topic,exercise,utils,config
}
<template>
<el-row class="container">	
	<!-- 页面内容 -->
	<el-row>
		<!--左侧导航-->
		<div class="left-bar float">
			<div class="center">
				<img class="portrait" :src="'../../static/icon/' + user.avatarId + '.png'" /> 
			</div>
			<div class="center font24 ColorInfo">
				Hello,{{user.firstName}} {{user.lastName}}!
			</div>
			<el-collapse v-model="topic.id" accordion>
				<el-collapse-item :name="topic.id" v-for="topic in list" :key="topic.id">
					<template slot="title">
						<div class="ColorCommon">
							- {{topic.title}}
							<i v-if="topic.status === 2" class="el-icon-success Success " ></i>
							<i v-if="topic.status === 1" class="el-icon-loading Blue " ></i>
							<i v-if="topic.status === 0" class="el-icon-remove-outline Info " ></i>
						</div>
					</template>
					<!--课程内容-->
					<div class="ColorCommon font16 marginLeft" v-if="topic.title1" @click="showTopic(topic.id,topic.status)">
						- {{topic.title1}}
						<i v-if="topic.status === 2" class="el-icon-success Success " ></i>
						<i v-if="topic.status === 1" class="el-icon-loading Blue " ></i>
						<i v-if="topic.status === 0" class="el-icon-remove-outline Info " ></i>
					</div>
					<!--课程PPT-->
					<div class="ColorCommon font16 marginLeft" v-if="!topic.title1" @click="showTopic(topic.id,topic.status)">
						- Slides: {{topic.title1}}
						<i v-if="topic.videoStatus === 2" class="el-icon-success Success " ></i>
						<i v-if="topic.videoStatus === 1" class="el-icon-loading Blue " ></i>
						<i v-if="topic.videoStatus === 0" class="el-icon-remove-outline Info " ></i>
					</div>
					<!--课程练习-->
					<div class="ColorCommon font16 marginLeft" v-for="exercise in topic.list" :key="exercise.id"
						@click="showExercise(exercise.id,exercise.status)">
						- {{exercise.title}}
						<i v-if="exercise.status === 2" class="el-icon-success Success " ></i>
						<i v-if="exercise.status === 1" class="el-icon-loading Blue " ></i>
						<i v-if="exercise.status === 0" class="el-icon-remove-outline Info " ></i>		
					</div>
				</el-collapse-item>
				<el-collapse-item name="7">
					<template slot="title">
						<div class="ColorCommon">
							- Thank you page
						</div>
					</template>
					<!--课程内容-->
					<div class="ColorCommon font16 marginLeft">
						- One more thing
					</div>
					<div class="ColorCommon font16 marginLeft">
						- Thank you and congratulations!	
					</div>
				</el-collapse-item>
			</el-collapse>
		</div>

		<!--右侧内容-->
		<div class="right-content" :style="'float: left;width:' + reWidth + 'px;'">
			<div>
				<!--展示文字内容-->
				<div v-if="topic.content">
					<div class="font24 ColorMain font-bold">{{topic.title}}</div>
					<div class="font22 ColorMain lineHeight marginTop" v-html="topic.content"></div>
					<div class="alignRight">
						<el-button type="primary" @click="getNext()" v-show="topic.status != 2">Got it!</el-button>
					</div>
				</div>
				<!--展示PPT-->
				<div v-else>
					<div class="font24 Danger margin20 center ">Your time to study this topic is: [{{Math.floor(time/60)}}m {{time%60}}s]</div>
					<!-- <video :src="topic.videoUrl" controls="controls" @play="onPlay()"></video> -->
					<div>
						<iframe :src="topic.pptUrl" width="100%" height="627" frameborder="0" scrolling="no"></iframe>
					 </div>
					
					<!--按钮，点击按钮开始答题-->
					<div class="alignRight">
						<!-- <el-button type="primary" :disabled="gotItDisabled" @click="getNext()">Got it!</el-button> -->
						<el-button type="primary"  @click="getNext()">Got it!</el-button>
					</div>
				</div>
			</div>
		</div>
	</el-row>

</el-row>
</template>

<script>
	import $ from 'jquery';
	import {req_getMenu,req_getCurrent,req_getNext,req_setTimer} from "../api/api.js";
	export default {
		data() {
			return {
				user:{},
				list:[],
				topic:{},
				reWidth:0,
				time:330,
				interval:{},
			}
		},
		methods: {
			warningCannotStudy(){
				this.$notify({
				title: '您不能开始学习本课程',
				message: '只有学完了本课程之前的全部课程内容，才能开始本课程的学习',
				type: 'warning'
				});
			}
			,
			warningCannotDoExercise(){
				this.$notify({
				title: '您不能开始做本练习',
				message: '只有学完了本课程对应的内容，并做完了本练习前的所有练习，才能开始',
				type: 'warning'
				});
			}
			,
			showTopic(id,status){
				console.log("showTopic id:",id);
				if(status !== 1){
					this.warningCannotStudy();
					return;
				}
			},
			showExercise(id,status){
				console.log("showExercise id:",id);
				if(status !== 1){
					this.warningCannotDoExercise();
					return;
				}
			},
	
			getMenu(){
				//查询左侧菜单，查询回来的数据为：课程id、课程标题、视频地址、课程对应的练习等
				req_getMenu(this.user.id).then(response => {
				  console.log("getMenu，Response:",response);
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.handleError(message);
				  } else {
				    this.list = data;
					this.getCurrent();
				  }
				});	
			},
			handleError(message){
				if(message == "Topic Over"){
				  	this.$router.push({ path: '/End2' });
				  }
				this.$message({
				  message: message,
				  type: 'error'
				});
			},
			getCurrent(){
				req_getCurrent(this.user.id).then(response => {
				  console.log("req_getCurrent，Response:",response);
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
					  this.handleError(message);
				  } else {
					  this.handleResponse(data);
				  }
				});
			},
			handleResponse(data){
				if(data.topicId){
					  this.clearInterval();
					  this.$router.push({ path: '/Exercise' });
				}else{
					  this.topic = data;
					  if(data.content){
						  
					  }else{
						  this.init();
						  this.startInterval();
					  }
					  
				}
			},
			getNext(){
				this.clearInterval();
				req_getNext(this.user.id).then(response => {
				  console.log("req_getNext，Response:",response);
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
					  this.handleError(message);
				  } else {
					  this.getMenu();
					  this.handleResponse(data);
				  }
				});
			},
			init(){
				this.clearInterval();
				//如果this.topic.timer有值就设置time,这里再判断下0值的情况
				if(this.topic.timer || this.topic.timer == 0){
					console.log("this.topic.timer",this.topic.timer);
					this.time = this.topic.timer;
				}else{
					this.time = 330;
					console.log("this.topic.timer",this.topic.timer);
				}
			},startInterval(){
				let that = this;
				that.interval = setInterval((function () {
					//倒计时结束后跳到习题页面
					if(that.time >0){
						that.time --;
						that.setTimer();
						if(that.time <=0){
							that.clearInterval();
							that.getNext();
						}
					}else{
						that.clearInterval();
					}
					
				}),1000);
			}
			,
			/**
			 * 清除页面的计时器
			 */
			clearInterval(){
				window.clearInterval(this.interval);
			},
			setTimer(){
				req_setTimer(this.user.id,this.time).then(response=>{
					console.log("req_setTimer，Response:",response);
					//解析接口应答的json串
					let { data, message, success } = response;
					//应答不成功，提示错误信息
					if (success !== 0) {
					  this.handleError(message);
					} 
				});
			}
		},
		mounted() {
			this.init();
			//减410是减去左边导航栏固定宽度350、左边导航栏左右padding各20、右边内容区padding-left 20
			this.reWidth = $(window).width() - 420;
			var user = sessionStorage.getItem('user');
			if (user) {
				this.user = JSON.parse(user);
				this.getMenu();
			}else{
				this.$router.push({ path: '/404' });
			}
			var that = this;
			window.onresize = function () {
				that.reWidth = $(window).width() - 420;
			}
			
		}
	}

</script>
<style scoped lang="scss">
	@import '~scss_vars';
	.portrait{
		width: 120px;
		height: 120px;
	}
	.left-bar{
		padding-left: 20px;
		width: 340px;
		float: left;
	}

	.right-content{
		padding:20px;
		min-width: 400px;
	}
	.split{
		background-color: #DCDFE6;
		line-height: 30px;
		font-size:18px;
		
	}

	.Success{
		color:#67C23A;
	}
	.Blue{
		color:#409EFF;
	}
	.Info{
		color:#909399;
	}

	.iBig{
		font-size: 24px;
	}
	

	.inline{
		display: inline;
	}
	.lineHeight{
		line-height: 22px;
	}
	video{
		width: 100%;
	}
	
	
</style>

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
	
			<el-collapse v-model="activityName" accordion>
				<el-collapse-item :name="topic.id" v-for="topic in list" :key="topic.id">
					<template slot="title">
						<div class="ColorCommon font16">
							- Topic{{topic.sort}}: {{topic.title}}
							<i v-if="topic.status === 2" class="el-icon-success Success " ></i>
							<i v-if="topic.status === 1" class="el-icon-loading Blue " ></i>
							<i v-if="topic.status === 0" class="el-icon-remove-outline Info " ></i>
						</div>
					</template>
					<!--课程内容-->
					<div class="ColorCommon font16 marginLeft" v-show="topic.videoTitle == ''" @click="showTopic(topic.id,topic.status)">
						- Text: {{topic.title}}
						<i v-if="topic.status === 2" class="el-icon-success Success " ></i>
						<i v-if="topic.status === 1" class="el-icon-loading Blue " ></i>
						<i v-if="topic.status === 0" class="el-icon-remove-outline Info " ></i>
					</div>
					<!--课程视频-->
					<div class="ColorCommon font16 marginLeft" v-show="topic.videoTitle != ''" @click="showTopic(topic.id,topic.status)">
						- Video: {{topic.videoTitle}}
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
			</el-collapse>
		</div>

		<!--右侧内容-->
		<div class="right-content" :style="'float: left;width:' + reWidth + 'px;'">
			<!-- 动态加载课程内容，传入topic，接受子组件方法调用 -->
			<Topic :topic="topic" @topicFun="topicFun" v-if="mask.topic" ></Topic>
			<Exercise :exercise="exercise" :userId="user.id" @exerciseFun="exerciseFun" ref="sonExercise" v-if="mask.exercise"></Exercise>
		</div>
	</el-row>

</el-row>
</template>

<script>
	import $ from 'jquery';
	import {req_getMenu,req_getCurrent,req_getNext} from "../api/api.js";
	import Topic from "../components/TopicInfo.vue"
	import Exercise from "../components/ExerciseInfo.vue"
	export default {
		components:{Topic,Exercise},
		data() {
			return {
				activityName:1,
				user:{},
				list:[],
				topic:{
				},
				exercise:{},
				reWidth:0,
				mask:{
					topic:false,
					exercise:false,
					leader1:false,
					leader2:false,
					leader3:false,
					leader4:false,
					leader5:false,
					leader6:false
				}
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
			/**
			 * Topic组件调用的方法
			 * @param {Object} data
			 */
			topicFun(data){
				console.log("topicFun",data);
				this.getNext();
			},
			/**
			 * Exercise组件调用的方法
			 * @param {Object} data
			 */
			exerciseFun(data){
				console.log("exerciseFun",data);
				this.getNext();
			},
			getMenuAndCurrent(){
				//查询左侧菜单，查询回来的数据为：课程id、课程标题、视频地址、课程对应的练习等
				req_getMenu(this.user.id).then(response => {
				  console.log("getMenuAndCurrent，Response:",response);
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
					//生成菜单
				    this.list = data;
					this.getCurrent();
				  }
				});	
			},
			getMenu(){
				//查询左侧菜单，查询回来的数据为：课程id、课程标题、视频地址、课程对应的练习等
				req_getMenu(this.user.id).then(response => {
				  console.log("getMenu，Response:",response);
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
					//生成菜单
				    this.list = data;
				  }
				});	
			},
			getCurrent(){
				req_getCurrent(this.user.id).then(response => {
				  console.log("req_getCurrent，Response:",response);
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
					  this.showContent(data);
				  }
				});
			},
			/**
			 * 根据查回来的数据显示内容
			 * @param {Object} data 查回来的数据
			 */
			showContent(data){
				this.mask.exercise = false;
				this.mask.topic = false;
				//如果返回数据里有topicId，说明是练习题
				if(data.topicId){
					this.exercise = data;
					this.mask.exercise = true;
					this.$refs.sonExercise.init();
					this.$refs.sonExercise.startInterval();
				}else{
					this.topic = data;
					this.mask.topic = true;
				}	
			},
			getNext(){
				req_getNext(this.user.id).then(response => {
				  console.log("req_getNext，Response:",response);
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
					  this.showContent(data);
					  this.getMenu();
				  }
				});
			},
		},
		mounted() {
			//减410是减去左边导航栏固定宽度350、左边导航栏左右padding各20、右边内容区padding-left 20
			this.reWidth = $(window).width() - 410;
			var user = sessionStorage.getItem('user');
			if (user) {
				this.user = JSON.parse(user);
				//页面刷新时，获取菜单和内容
				this.getMenuAndCurrent();
			}else{
				this.$router.push({ path: '/404' });
			}
			var that = this;
			window.onresize = function () {
				that.reWidth = $(window).width() - 410;
			}
			if(this.topic.id){
				this.activityName = this.topic.id;
			}else{
				this.activityName = this.exercise.topicId;
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
		width: 350px;
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
</style>

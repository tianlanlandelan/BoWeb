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
	
			<el-collapse v-model="this.topic.id" accordion>
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
			<div>
				<!--展示文字内容-->
				<div v-show="topic.videoUrl == ''">
					<div class="font24 ColorMain">{{topic.title}}</div>
					<div class="font16 ColorMain lineHeight marginTop" v-html="topic.content"></div>
					<div class="alignRight">
						<el-button type="primary" @click="getNext()" v-show="topic.status != 2">Got it!</el-button>
					</div>
				</div>
				<!--展示视频-->
				<div v-show="topic.videoUrl">
					<div class="font24 ColorMain">{{topic.videoTitle}}</div>
					<!-- <video :src="topic.videoUrl" controls="controls" @play="onPlay()"></video> -->
					<iframe src="https://onedrive.live.com/embed?cid=EFF3B846380AF0CE&resid=EFF3B846380AF0CE%211163&authkey=ADrVFdTbhHtSp7Q&em=2"
					 width="100%" height="627" frameborder="0" scrolling="no"></iframe>
					
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
	import {req_getMenu,req_getCurrent,req_getNext} from "../api/api.js";
	export default {
		data() {
			return {
				user:{},
				list:[],
				topic:{},
				//gotIt按钮是否禁用，默认禁用，观看视频2分钟后启用
				gotItDisabled:true,
				reWidth:0
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
			,
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
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
				    this.list = data;
					this.getCurrent();
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
					  if(data.topicId){
						  this.$router.push({ path: '/Exercise' });
					  }
				    this.topic = data;
				  }
				});
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
					  this.getMenu();
				    if(data.topicId){
				    	  this.$router.push({ path: '/Exercise' });
				      }
				    this.topic = data;
				  }
				});
			},
			/**
			 * 要求观看视频至少2分钟后，才能答题
			 * 在用户开始播放视频时计时开始
			 * 在调用setTimeout时要注意，不要在函数里用this调用data的数据，函数里的this不是页面的this
			 */
			onPlay(){
				let that = this;
				console.log("onPlay");
				setTimeout(function(){
					that.gotItDisabled = false;
					console.log("gotItDisabled",that.gotItDisabled);
				//在测试时，先设置为3秒，实际改成3000 * 60 * 2 就是2分钟
				},3000);
			}
		},
		mounted() {
			//减410是减去左边导航栏固定宽度350、左边导航栏左右padding各20、右边内容区padding-left 20
			this.reWidth = $(window).width() - 410;
			var user = sessionStorage.getItem('user');
			if (user) {
				this.user = JSON.parse(user);
				this.getMenu();
			}else{
				this.$router.push({ path: '/404' });
			}
			var that = this;
			window.onresize = function () {
				that.reWidth = $(window).width() - 410;
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
		line-height: 20px;
	}
	video{
		width: 100%;
	}
	
	
</style>

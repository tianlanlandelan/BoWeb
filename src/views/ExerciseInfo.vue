<template>
<el-row class="container">	
	<!-- 页面内容 -->
	<el-row>
		<!--左侧导航-->
		<!-- <el-col :lg="6" :md="8" :sm="10" class= "left-bar"> -->
		<div class="left-bar float">
			<div class="center">
				<img class="portrait" :src="'../../static/icon/' + user.avatarId + '.png'" /> 
			</div>
			<div class="center font24 ColorInfo">
				Hello,{{user.firstName}} {{user.lastName}}!
			</div>
		
			<el-collapse v-model="this.exercise.topicId" accordion>
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
						<i v-if="topic.status === 2" class="el-icon-success Success " ></i>
						<i v-if="topic.status === 1" class="el-icon-loading Blue " ></i>
						<i v-if="topic.status === 0" class="el-icon-remove-outline Info " ></i>
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
		<!-- </el-col> -->

		<!--右侧内容-->
		<!-- <el-col :lg="18" :md="16" :sm="14" class="right-content"> -->
		<div class="right-content" :style="'float: left;width:' + reWidth + 'px;'">
			<!--课程或练习内容展示-->
			<div class="exercise">
				<el-row>
					<!--左边的文字部分-->
					<!-- <el-col :span="exercise.img?12:24"> -->
					<el-col :span="24">
						<div class="font24 alignRight">
							Timer:{{time}} sec
						</div>
						<!--练习内容部分的Header-->
						<div class="font18 padding5 exreciseTitle" v-show="exercise.content">
							<i class="el-icon-question"></i>{{exercise.title}}
						</div>
						<!--练习内容-->
						<div v-html="exercise.content" class="marginTop marginBottom" v-show="exercise.content"></div>
						<!--练习题图片-->
						<div  v-show="exercise.img" class="exerciseImg">
							<img :src="exercise.img" />
						</div>
						<!--问题部分的Header-->
						<div class="font18 padding5 exerciseQuestion">
							<i class="el-icon-success"></i>Answer the question
						</div>
						<!--问题-->
						<div class="font18 ">{{exercise.question}}</div>
						<!--选项-->
						<div class="marginTop10">
							<table >
								<td><el-radio v-model="answer" label="A">&nbsp;</el-radio></td>
								<td>A.</td>
								<td><div class="inline" v-html="exercise.optionA"></div></td>
							</table>
						</div>
						<div class="marginTop10">
							<table >
								<td><el-radio v-model="answer" label="B">&nbsp;</el-radio></td>
								<td>B.</td>
								<td><div class="inline" v-html="exercise.optionB"></div></td>
							</table>
						</div>
						<div class="marginTop10">
							<table >
								<td><el-radio v-model="answer" label="C">&nbsp;</el-radio></td>
								<td>C.</td>
								<td><div class="inline" v-html="exercise.optionC"></div></td>
							</table>
						</div>
						<div class="marginTop10">
							<table >
								<table >
									<td><el-radio v-model="answer" label="D">&nbsp;</el-radio></td>
									<td>D.</td>
									<td><div class="inline" v-html="exercise.optionD"></div></td>
								</table>
							</table>
						</div>
						<div class="alignRight">
							<span class="ColorDanger font18" v-show="isShowAnswer">Correct Answer:{{exercise.answer}}</span>
							<el-button type="success" :disabled="answer == ''" @click="onSubmitAnswer(exercise.answer)" v-show="!isShowNext">Submit Answer</el-button>
							<el-button type="primary" @click="getCurrent()()" v-show="isShowNext">Next</el-button>
							
						</div>
					</el-col><!--左边的文字部分-->
					<!--右边展示图片-->
					<!-- <el-col :span="12" v-show="exercise.img" class="exerciseImg">
						<img :src="exercise.img" />
					</el-col> -->
				</el-row>
			</div>
		</div>
		<!-- </el-col> -->
	</el-row>

</el-row>
</template>

<script>
	import LeaderBoard1 from "../components/leaderboard1.vue";
	import {req_getMenu,req_getCurrent,req_saveScore,req_setTimer} from "../api/api.js";
	export default {
		components:{LeaderBoard1},
		data() {
			return {
				user:{},
				list:[],
				//练习
				exercise:{},
				//用户选择的答案
				answer:"",
				//习题的计时器，从90秒开始倒计时
				time:"",
				interval:{},
				isShowAnswer:false,
				isShowNext:false,
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
				  }
				});	
			},
			init(){
				//如果this.exercise.timer有值就设置time,这里再判断下0值的情况
				if(this.exercise.timer || this.exercise.timer == 0){
					console.log("this.exercise.timer",this.exercise.timer);
					this.time = this.exercise.timer;
				}else{
					this.time = 90;
				}
				this.clearInterval();
				this.answer = "";
				this.isShowAnswer = false;
				this.isShowNext = false;
			},
			startInterval(){
				let that = this;
				that.interval = setInterval((function () {
					if(that.time >0){
						that.time --;
						that.setTimer();
						if(that.time <=0){
							// that.onSubmitAnswer(that.answer);
							that.clearInterval();
						}
					}else{
						that.clearInterval();
					}
					
				}),1000);
			}
			,
			setTimer(){
				req_setTimer(this.user.id,this.time).then(response=>{
					console.log("req_setTimer，Response:",response);
					//解析接口应答的json串
					let { data, message, success } = response;
					//应答不成功，提示错误信息
					if (success !== 0) {
					  this.$message({
					    message: message,
					    type: 'error'
					  });
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
					  this.getMenu();
					  if(data.topicId){
						  this.exercise = data;
						  this.init();
						  this.startInterval();
					  }else{
						  this.clearInterval();
						  this.$router.push({ path: '/Topic' });
					  }  
				  }
				});
			},
			/**
			 * 提交答案
			 * @param {Object} answer
			 */
			onSubmitAnswer(answer){
				this.clearInterval();
				let score = 0;
				if(this.answer == ''){
					return;
				}else if(this.answer == answer){
					this.$message({
					  message: "Answer Right!",
					  type: 'success'
					});
					score = 100 + this.time;
				}else{
					this.$message({
					  message: "Answer Error!",
					  type: 'error'
					});
					this.isShowAnswer = true;
				}
				req_saveScore(this.user.id,this.exercise.id,score).then(response=>{
					console.log("req_saveScore，Response:",response);
					let { data, message, success } = response;
					//应答不成功，提示错误信息
					if (success !== 0) {
					  this.$message({
					    message: message,
					    type: 'error'
					  });
					}else{
						this.isShowNext = true;
					}
				});
			},
			/**
			 * 清除页面的计时器
			 */
			clearInterval(){
				window.clearInterval(this.interval);
			}
		},
		mounted() {
			this.reWidth = window.innerWidth - 410;
			this.init();
			var user = sessionStorage.getItem('user');
			if (user) {
				this.user = JSON.parse(user);
				this.getCurrent(this.user.id);
				this.getMenu();
			}else{
				this.$router.push({ path: '/404' });
			}	
			var that = this;
			window.onresize = function () {
				that.reWidth = window.innerWidth - 410;
				var Width = window.innerWidth;
				var Height = window.innerHeight;
				 
				console.log(Width, Height);
				 
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
	
	table,td{
		margin: 0px;padding: 0px;
	}
	
	img{
		width: 100%;
	}
	.exercise{
		border: 5px solid #edf3f2;
		padding: 10px;
	}
	.exreciseTitle{
		font-size: 1.6rem;
		background-color: #dbdfe6;
	}
	.exerciseQuestion{
		background-color: #cfdcdf;
	}
	.exerciseImg{
		padding: 0 10px;
	}
	.exerciseOption{
		max-width: 40px;
		line-height: 30px;
	}
	.option{
		line-height: 30px;
	}
	
	
</style>

<template>
<el-row class="container">	
	<!-- 页面内容 -->
	<el-row>
		<!--左侧导航-->
		<el-col :lg="6" :md="8" :sm="10" class= "left-bar">
			<div class="center">
				<img class="portrait" :src="'../../static/icon/' + user.avatarId + '.png'" /> 
			</div>
			<div class="center font24 ColorInfo">
				Hello,{{user.firstName}} {{user.lastName}}!
			</div>
			
			
			<el-collapse v-model="activeName" accordion>
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
		</el-col>

		<!--右侧内容-->
		<el-col :lg="18" :md="16" :sm="14" class="right-content">
			<!--课程展示-->
			<div v-show="isShowTopic" class="showTopic">
				<!--展示文字内容-->
				<div v-show="topic.videoUrl == ''">
					<div class="font24 ColorMain">{{topic.title}}</div>
					<div class="font16 ColorMain lineHeight marginTop" v-html="topic.content"></div>
					<div class="alignRight">
						<el-button type="primary" @click="onSaveUserTopic(topic.id)" v-show="topic.status != 2">Got it!</el-button>
					</div>
				</div>
				<!--展示视频-->
				<div v-show="topic.videoUrl">
					<div class="font24 ColorMain">{{topic.videoTitle}}</div>
					<video :src="topic.videoUrl" controls="controls" @play="onPlay()"></video>
					<!--按钮，点击按钮开始答题-->
					<div class="alignRight">
						<el-button type="primary" :disabled="gotItDisabled" @click="onGotItClick(topic.id)">Got it!</el-button>
					</div>
				</div>
			</div>
			
			<!--练习展示-->
			<div v-show="isShowExercise">
				<div class="exercise">
					<el-row>
						<!--左边的文字部分-->
						<el-col :span="exercise.img?12:24">
							<div class="font24 alignRight">
								Timer:{{time}} sec
							</div>
							<!--练习内容部分的Header-->
							<div class="font18 padding5 exreciseTitle" v-show="exercise.content">
								<i class="el-icon-question"></i>{{exercise.title}}
							</div>
							<!--练习内容-->
							<div v-html="exercise.content" class="marginTop marginBottom" v-show="exercise.content"></div>
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
								<el-button type="success" :disabled="answer == ''" @click="onSubmitAnswer(exercise.answer)">Submit Answer</el-button>
								<el-button type="primary" @click="onNextClick(exercise.topicId,exercise.id)">Next</el-button>
							</div>
						</el-col><!--左边的文字部分-->
						<!--右边展示图片-->
						<el-col :span="12" v-show="exercise.img" class="exerciseImg">
							<img :src="exercise.img" />
						</el-col>
						
					</el-row>
	
				</div>
			</div>
		
			<!--LeaderBoard1-->
			<!-- <el-row>
				<LeaderBoard1></LeaderBoard1>
			</el-row> -->
		</el-col>
	</el-row>

</el-row>
</template>

<script>
	import LeaderBoard1 from "../components/leaderboard1.vue";
	import {req_getMenu,req_getTopicInfo,req_getExerciseInfo,req_saveUserTopic,req_saveScore} from "../api/api.js";
	export default {
		components:{LeaderBoard1},
		data() {
			return {
				user:{},
				list:[],
				//折叠面板导航栏默认打开页面
				activeName: 1,
				//课程
				topic:{},
				//练习
				exercise:{},
				isShowTopic:false,
				isShowExercise:false,
				//gotIt按钮是否禁用，默认禁用，观看视频2分钟后启用
				gotItDisabled:true,
				//用户选择的答案
				answer:"",
				//习题的计时器，从90秒开始倒计时
				time:90,
				interval:{},
				isShowAnswer:false
			}
		},
		methods: {
			//控制左侧导航栏展开收起
			collapse(){
				this.isCollapse=!this.isCollapse;
			},
			onSubmit() {
				console.log('submit!');
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			//个人消息
			mymessage(){
				console.log("个人消息");
			},
			//设置
			mysetting(){
				console.log("设置");
			},
			//退出登录
			mylogout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});
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
			/**
			 * 显示课程 
			 * 隐藏练习显示区
			 * 显示课程显示区
			 * 查询课程信息并显示
			 * @param {Object} id 课程ID
			 * @param {Object} status 课程状态，只有状态为2或1的课程可以查看
			 */
			showTopic(id,status){
				console.log("showTopic id:",id);
				if(status === 0){
					this.warningCannotStudy();
					return;
				}
				this.gotItDisabled = true;
				this.isShowExercise = false;
				this.exercise = {};
				req_getTopicInfo(id).then(response => {
				  console.log("req_getTopicInfo，Response:",response);
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
				    this.topic = data;
				  }
				});
				this.isShowTopic = true;
			},
			/**
			 * 显示练习
			 * 隐藏课程显示区
			 * 显示练习显示区
			 * 查询练习并显示
			 * @param {Object} id 练习ID
			 */
			showExercise(id,status){
				console.log("showExercise id:",id);
				if(status === 0){
					this.warningCannotDoExercise();
					return;
				}
				this.time = 90;
				this.clearInterval();
				this.answer = "";
				this.isShowTopic = false;
				this.isShowAnswer = false;
				this.topic = {};
				req_getExerciseInfo(id).then(response => {
				  console.log("req_getExerciseInfo，Response:",response);
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
				    this.exercise = data;
				  }
				});
				this.isShowExercise = true;
				let that = this;
				that.interval = setInterval((function () {
					that.time --;
					if(that.time <=0){
						that.clearInterval();
					}
				}),1000);
			},
			/**
			 * 清除页面的计时器
			 */
			clearInterval(){
				window.clearInterval(this.interval);
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
			,
			/**
			 * 点击视频课程的Git it!按钮，显示练习
			 * @param {Object} id 课程ID
			 */
			onGotItClick(id){
				let i = 0;
				for(i = 0;i < this.list.length;i++){
					//如果菜单中课程的id等于传入的id,且课程有练习题，显示第1个练习
					if(this.list[i].id == id && this.list[i].list){
						this.showExercise(this.list[i].list[0].id,1);
						this.list[i].list[0].status = 1;
						return;
					}
				}
			},
			onNextClick(topicId,id){
				let i = 0 ;
				for(i = 0;i < this.list.length;i++){
					//如果菜单中课程的id等于传入的id,且课程有练习题，找到当前练习题，显示下一个练习题
					if(this.list[i].id == topicId && this.list[i].list){
						let exerList = this.list[i].list;
						let j = 0;
						for(j = 0 ; j < exerList.length;j++){
							//有下一题，显示下一题
							if(id == exerList[j].id && j < exerList.length - 1){
								this.showExercise(exerList[j+1],1);
								this.list[i].list[j+1].status = 1;
								return;
							}
							//没下一题，显示下一课程
							if(id == exerList[j].id && j == exerList.length -1){
								this.onSaveUserTopic(topicId);
							}
						}
					}
				}
			}
			,
			onSubmitAnswer(answer){
				let score = 0;
				if(this.answer == answer){
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
					} 
				});
			},
			/**
			 * 设置本课程已学习
			 * @param {Object} id
			 */
			onSaveUserTopic(id){
				req_saveUserTopic(this.user.id,id).then(response=>{
					console.log("req_saveUserTopic，Response:",response);
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
				    this.list = data;
					if(this.list){
						for(let i = 0 ; i < this.list.length ; i ++){
							if(this.list[i].status == 1){
								this.activeName = this.list[i].id;
								this.showTopic(this.list[i].id,1);
								return;
							}
						}
					}
					
				  }
				});	
			}
		},
		mounted() {
			
			// this.$message({
			//   message: document.body.clientWidth,
			//   type: 'success'
			// });
			//从Session里拿到用户信息并解析，主要为了显示用户头像和昵称
			var user = sessionStorage.getItem('user');
			if (user) {
				this.user = JSON.parse(user);
			}else{
				this.$router.push({ path: '/404' });
			}
			this.getMenu();
			
		}
	}

</script>
<style scoped lang="scss">
	@import '~scss_vars';
	table,td{
		margin: 0px;padding: 0px;
	}
	video{
		width: 100%;
	}
	.exerciseImg{
		padding: 0 10px;
	}
	img{
		width: 100%;
	}
	.exerciseOption{
		max-width: 40px;
		line-height: 30px;
	}
	.option{
		line-height: 30px;
	}
	.exerciseTitle{
		font-size: 1.6rem;
	}
	
	.portrait{
		width: 120px;
		height: 120px;
	}
	.left-bar{
		padding-left: 20px;
		min-width: 360px;
	}

	.right-content{
		padding:20px;
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
	.exercise{
		border: 5px solid #edf3f2;
		padding: 10px;
	}

	.inline{
		display: inline;
	}
	.lineHeight{
		line-height: 20px;
	}
	
	.exreciseTitle{
		background-color: #dbdfe6;
	}
	.exerciseQuestion{
		background-color: #cfdcdf;
	}
</style>

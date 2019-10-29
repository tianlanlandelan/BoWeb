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
		
			<el-collapse v-model="exercise.topicId" accordion>
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
						<div class="font24 alignRight Danger font-bold">
							Timer:{{time}} sec
						</div>
						<!--练习内容部分的Header-->
						<div class="font18 padding5 exreciseTitle">
							<i class="el-icon-question"></i>{{exercise.title}}
						</div>
						<!--练习内容-->
						<div v-html="exercise.content" class="marginTop marginBottom" v-show="exercise.content"></div>
						<!--练习题图片-->
						<div  v-show="exercise.img" class="exerciseImg">
							<img :src="exercise.img" />
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
						<div>
							<br>
							<span class="ColorDanger font18" v-show="isShowAnswer">Correct Answer:{{exercise.answer}}</span>
							<el-button type="success" :disabled="answer == ''" @click="onSubmitAnswer(exercise.answer)" v-show="!isShowNext">Submit Answer</el-button>
							<el-button type="primary" @click="getCurrent()" v-show="isShowNext">Next</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
		
	</el-row>
	<div class="box" v-show="box.show" :style="'width:' + box.width + 'px;height:' + box.height + 'px;'">
		
	</div>
	<!-- 排行榜  -->
	<LeaderBoard @func="closeBox()" v-show= "box.show" 
	class="boxCenter" :style="'top:'+ box.contentHeight+ 'px;'" 
	ref="leaderBoard"></LeaderBoard>
</el-row>
</template>

<script>
	import LeaderBoard from "../components/Leaderboard.vue";
	import {utils} from "../data.js";
	import {req_getMenu,req_getCurrent,req_saveScore,req_setTimer} from "../api/api.js";
	import $ from 'jquery';
	export default {
		components:{LeaderBoard},
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
				reWidth:0,
				isShowBox:false,
				//遮罩层
				box:{
					show:false,
					index:0,
					width:0,
					height:0,
					contentHeight:0
				}
			}
		},
		methods: {
			showTopic(id,status){
				if(status === 0){
					utils.warningCannotStudy();
					return;
				}
				if(status === 2){
					utils.warningReStudy();
					return;
				}
			},
			showExercise(id,status){
				if(status === 0){
					utils.warningCannotDoExercise();
					return;
				}
				if(status === 2){
					utils.warningReExercise();
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
					if(message == "Topic Over"){
						this.$router.push({ path: '/End1' });
					}
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
					  message: "You answer is correct!",
					  type: 'success'
					});
					score = 100 + this.time;
				}else{
					this.$message({
					  message: "You answer is not correct!",
					  type: 'error'
					});
				}
				req_saveScore(this.user.id,this.exercise.id,score,this.answer).then(response=>{
					console.log("req_saveScore，Response:",response);
					let { data, message, success } = response;
					//应答不成功，提示错误信息
					if (success !== 0) {
					  this.$message({
					    message: message,
					    type: 'error'
					  });
					}else{
						this.showBox();
						this.isShowNext = true;
						//调用子组件LeaderBoard 的 load方法，开始加载排行榜
						this.$refs.leaderBoard.load();
					}
				});
			},
			/**
			 * 清除页面的计时器
			 */
			clearInterval(){
				window.clearInterval(this.interval);
			}
			,
			/**
			 * 关闭遮罩层和遮罩层上的排行榜
			 */
			closeBox(){
				this.box.show = false;
			},
			/**
			 * 显示遮罩层和遮罩层上的排行榜，调整遮罩层遮住整个页面，调整排行榜的位置在当前屏幕
			 */
			showBox(){
				/**
					获取网页被滚动条卷去的高度：
　　　　				scrollHeight = $(window).scrollTop();
　　					获取网页全文的高度——兼容写法：
　　　　				windowHeight = $(document).height();
　　					获取网页可视区域的高度——兼容写法：
　　　　				screenHeight = $(window).height();
　　					获取某个元素的高度——利用DOM对象的属性：
　　　　				domHeight = domElement.height();
				 */
				this.box.show = true;
				this.initBox();
			},
			initBox(){
				this.box.width = $(document).width();
				this.box.height = $(document).height();
				this.box.contentHeight = $(window).scrollTop();
			}
		},
		mounted() {
			this.reWidth = $(window).width() - 420;
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
				that.reWidth = $(window).width() - 420;	
				that.initBox();
			}
			
		}
	}

</script>
<style scoped lang="scss">
	@import '~scss_vars';
	
	.container{
		width: 100%;
		height: 100%;
	}
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
		line-height: 20px;
	}
	
	table,td{
		margin: 0px;padding: 0px;
	}
	
	img{
		width: 50%;
		max-width: 500px;
		max-height: 450px;
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

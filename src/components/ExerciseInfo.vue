<template>
	<div>
		<!-- <iframe src="http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=true&_key=tr3ycpaoxbbidkmaajczqmsxhu&_xdoc=http://72.167.226.78:8081/images/index.pdf" 
		width='100%' height='500px'></iframe>
		
		<iframe  src='http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc=http://72.167.226.78:8081/images/index.pptx' 
		width='100%' height='500px' ></iframe> -->
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
						<el-button type="primary" @click="father()" v-show="isShowNext">Next</el-button>
					</div>
				</el-col><!--左边的文字部分-->
				<!--右边展示图片-->
				<!-- <el-col :span="12" v-show="exercise.img" class="exerciseImg">
					<img :src="exercise.img" />
				</el-col> -->
			</el-row>
		</div>
		
			<div class="box" v-show="box.show" :style="'width:' + box.width + 'px;height:' + box.height + 'px;'" v-if="box.show">
			
		</div>
		<!---->
		<LeaderBoard1 @func="closeBox()" :userId="userId" v-if = "box.show" 
		class="boxCenter" :style="'top:'+ box.contentHeight+ 'px;'" ></LeaderBoard1>
		<!-- <LeaderBoard2 @func="closeBox()" v-show = "box.show" 
		class="boxCenter" :style="'top:'+ box.contentHeight+ 'px;'" 
		ref="leaderBoard1"></LeaderBoard2> -->
	</div>
</template>

<script>
	import LeaderBoard1 from "./Leaderboard1.vue";
	import LeaderBoard2 from "./Leaderboard2.vue";
	
	import {req_saveScore,req_setTimer} from "../api/api.js";
	import $ from 'jquery';
	export default {
		props:{
			//练习
			exercise:{},
			userId:0
		},
		components:{LeaderBoard1,LeaderBoard2},
		data() {
			return {
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
				},
			}
		},
		methods: {
			father(){
				this.$emit('exerciseFun',"ExerciseInfo");
			},
			init(){
				console.log("Exercise init",this.exercise.timer);
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
				req_setTimer(this.userId,this.time).then(response=>{
					// console.log("req_setTimer，Response:",response);
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
					this.showBox();
				}
				req_saveScore(this.userId,this.exercise.id,score).then(response=>{
					console.log("req_saveScore，Response:",response);
					let { data, message, success } = response;
					//应答不成功，提示错误信息
					if (success !== 0) {
					  this.$message({
					    message: message,
					    type: 'error'
					  });
					}else{
						this.box.show = true;
						this.isShowNext = true;
						//调用子组件LeaderBoard1 的 load方法，并传入userId，开始查询排行榜
						// this.$refs.leaderBoard1.load(this.userId);
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
				// this.box.index = index;
				this.box.width = $(document).width();
				this.box.height = $(document).height();
				this.box.contentHeight = $(window).scrollTop();
				console.log($(document).height(),$(window).height(),$(window).scrollTop());
				console.log($(document).width(),$(window).width(),$(window).scrollLeft());
			}
		},
		mounted() {	
			console.log(this.userId);
			this.init();
			this.startInterval();
			//Test
			// this.showBox();
			// this.$refs.leaderBoard1.load(this.user.id);
		}
	}

</script>
<style scoped lang="scss">
	@import '~scss_vars';
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

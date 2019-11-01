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
				<div>
					<div class="font24 ColorMain font-bold exreciseTitle">Thank you and congratulations!</div>
					<div class="font24 ColorMain lineHeight margin20" >
						<p>Congratulations again! You’ve successfully completed this learning module. 
						We thank you for your participation.</p>
						<br>
						<br>
						<p>Please help us improve the design of leaderboard by taking this 10-minute survey: 
						<a href="http://eccles.qualtrics.com/jfe/form/SV_dbwaT9uEgYqpdGt">http://eccles.qualtrics.com/jfe/form/SV_dbwaT9uEgYqpdGt</a></p>
						<br>
						<br>
						<p>A completion code will be provided at the end of survey for you to receive compensation for your participations. Thank you again!</p>

					</div>
				</div>
				
			</div>
		</div>
	</el-row>

</el-row>
</template>

<script>
	import $ from 'jquery';
	import {req_getMenu} from "../api/api.js";
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
			},
			showTopic(id,status){
				if(status === 0){
					this.warningCannotStudy();
					return;
				}
				if(status === 2){
					this.warningReStudy();
					return;
				}
			},
			showExercise(id,status){
				if(status === 0){
					this.warningCannotDoExercise();
					return;
				}
				if(status === 2){
					this.warningReExercise();
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
			}
		},
		mounted() {
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
	.exreciseTitle{
		padding:5px 20px;
		background-color: #dbdfe6;
	}
	
	
</style>

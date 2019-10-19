<template>
<el-row class="container">
	<!-- 页头 -->
<!-- 	<el-row>
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo">
				{{sysName}}
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="mymessage">我的消息</el-dropdown-item>
						<el-dropdown-item @click.native="mysetting">设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="mylogout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
	</el-row> -->
	
	<!-- 页面内容 -->
	<el-row>
		<!--左侧导航-->
		<el-col :span="6" class= "left-bar">
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
					<!--课程视频-->
					<div class="ColorCommon font16 marginLeft" v-show="topic.videoTitle != ''" @click="showTopic(topic.id)">
						- Video: {{topic.videoTitle}}
					</div>
					<div class="ColorCommon font16 marginLeft" v-for="exercise in topic.list" :key="exercise.id"
						@click="showExercise(exercise.id)">
						- {{exercise.title}}
						<i v-if="exercise.status === 2" class="el-icon-success Success " ></i>
						<i v-if="exercise.status === 1" class="el-icon-loading Blue " ></i>
						<i v-if="exercise.status === 0" class="el-icon-remove-outline Info " ></i>		
					</div>
				</el-collapse-item>
			</el-collapse>
		</el-col>

		<!--右侧内容-->
		<el-col :span="18" class="right-content">
			<!--课程展示-->
			<div v-show="isShowTopic" class="showTopic">
				<div v-show="topic.videoUrl == ''">
					<div class="font18 ColorMain">{{topic.title}}</div>
					<div class="content" v-html="topic.content"></div>
				</div>
				<div v-show="topic.videoUrl">
					<div class="font24 ColorMain">{{topic.videoTitle}}</div>
					<video :src="topic.videoUrl" controls="controls" ></video>
				</div>
			</div>
			
			<!--练习展示-->
			<div v-show="isShowExercise">
				<div class="exercise">
					<el-row>
						<el-col class="font24 ColorMain">
							Investment research
						</el-col>
					</el-row>
					<div v-html="exercise.content" class="marginTop marginBottom"></div>
					
					<!--图片和问题展示区-->
					<el-row>
						<el-col :span="12" v-show="exercise.img" class="exerciseImg">
							<img :src="exercise.img" />
						</el-col>
						<el-col :span="exercise.img?12:24">
							<div class="font18">{{exercise.question}}</div>
							<el-row class="marginTop10">
								<table >
									<td><el-radio v-model="answer" label="A">&nbsp;</el-radio></td>
									<td>A.</td>
									<td><div class="inline" v-html="exercise.optionA"></div></td>
								</table>
							</el-row>
							<el-row class="marginTop10">
								<table >
									<td><el-radio v-model="answer" label="B">&nbsp;</el-radio></td>
									<td>B.</td>
									<td><div class="inline" v-html="exercise.optionB"></div></td>
								</table>
							</el-row>
							<el-row class="marginTop10">
								<table >
									<td><el-radio v-model="answer" label="C">&nbsp;</el-radio></td>
									<td>C.</td>
									<td><div class="inline" v-html="exercise.optionC"></div></td>
								</table>
							</el-row>
							<el-row class="marginTop10">
								<table >
									<table >
										<td><el-radio v-model="answer" label="D">&nbsp;</el-radio></td>
										<td>D.</td>
										<td><div class="inline" v-html="exercise.optionD"></div></td>
									</table>
								</table>
							</el-row>
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
	import {req_getMenu,req_getTopicInfo,req_getExerciseInfo} from "../api/api.js";
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
				answer:""
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
			},
			showSubTopic(subtopic){
				console.log("showSubTopic",subtopic.id,subtopic.status,subtopic.title);
				if(subtopic.status === 0){
					this.warningCannotStudy();
				}
			}
			,
			warningCannotStudy(){
				this.$notify({
				title: '您不能开始学习本课程',
				message: '只有学完了本课程之前的全部课程内容，才能开始本课程的学习',
				type: 'warning'
				});
			},
			getTopic(id){
				console.log("getTopic id:",id);
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
			},
			getExersice(id){
				console.log("getExersice id:",id);
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
			}
			,
			showTopic(id){
				this.isShowExercise = false;
				this.exercise = {};
				this.getTopic(id);
				this.isShowTopic = true;
			},
			showExercise(id){
				this.isShowTopic = false;
				this.topic = {};
				this.getExersice(id);
				this.isShowExercise = true;
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				this.user = JSON.parse(user);
			}
			req_getMenu().then(response => {
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
		// border-right: 1px solid #409EFF;
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

</style>

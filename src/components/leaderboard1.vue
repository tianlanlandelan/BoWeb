<template>
	<!--第一个网站的排行榜-->
	<div class="bg" v-show="show">
		<div class = "popover-bg">
			<div class = "popover-div">
				<div v-for="score in scores" :key = "score.id" v-if="score.id != id">
					<!--其他人成绩的遮罩层-->
					<el-row class = "popover-margin" :style="{width: score.percentage + '%'}"></el-row>
					<!--其他人成绩-->
					<el-row class = "popover-row">
						<el-col :span="2">
							{{score.sort}}
						</el-col>
						<el-col :span="4">
							<img :src="'../../static/icon/' + score.avatarId + '.png'" /> 
						</el-col>
						<el-col :span="16">
							{{score.firstName}} {{score.lastName}}
						</el-col>
						<el-col :span="2">
							{{score.score}}
						</el-col>
					</el-row>
					<!--分割栏-->
					<el-row class = "popover-split"></el-row>
				</div>
			</div>
			<div class = "me-bg">
				<el-row class = "me-margin" :style="{width: myScore.percentage + '%'}"></el-row>
				<!--自己的成绩-->
				<el-row class = "me-row">
					<el-col :span="2">
						{{myScore.sort}}
					</el-col>
					<el-col :span="4">
						<img :src="'../../static/icon/' + myScore.avatarId + '.png'" /> 
					</el-col>
					<el-col :span="16">
						You
					</el-col>
					<el-col :span="2">
						{{myScore.score}}
					</el-col>
				</el-row>
			</div>
			
			
			<el-row class = "popover-split"></el-row>
			<div class="center">
				<el-button @click="close()">Continue</el-button>
			</div>
			<br>
		</div>
	
	</div>
</template>

<script>
	import {req_getLeaderBoard1} from "../api/api.js";
	
	export default {
	  data () {
		return {
			show:false,
			scores:[],
			myScore:{},
		  id:0
		}
	  }
	  ,mounted() {
			console.log("LeaderBoard1",this.id);
	  },methods:{
		  load(userId){
			  this.id = userId;
			  req_getLeaderBoard1(userId).then(response => {
				  console.log("req_getLeaderBoard1，Response:",response);
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
				    this.scores = data;
					this.myScore = data[data.length - 1];
				    this.show = true;
				  }
				});	
		  },
		  close(){
			 this.$emit('func',false);
		  }
	  }
	}
</script>

<style>
	.bg{
		background: #000000;
		padding: 20px;
	}
	.popover-bg{
		background-color: #409EFF;
		opacity: 1;
	}
	.popover-div{
		padding:20px;
		line-height: 30px;
		font-size: 18px;
		color: #FFFFFF;
	}

	.popover-row{
		padding:5px 20px;
		height: 40px;
		margin-top:-40px;
	}
	.popover-row img{
		width: 30px;
		border-radius: 15px;
	}
	.popover-margin{
		background-color: #67C23A;
		height: 40px;
		opacity:0.5;
		border-radius: 10px;
	}
	.popover-split{
		height: 5px;
		background-color: #409EEE;
	}
	.me-bg{
		margin:5px 10px;
		background-color: #EBEEF5;
		border-radius: 10px;
	}
	.me-margin{
		background-color: #DCDFE6;
		height: 50px;
		opacity:0.9;
		border-radius: 10px;
	}
	.me-row{
		padding:5px 10px;
		height: 50px;
		margin-top:-50px;
		font-size: 24px;
		line-height: 40px;
		color:#303133;
	}
	.me-row img{
		width: 40px;
		border-radius: 20px;
	}
	
	
</style>

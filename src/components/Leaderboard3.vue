<!--第一种排行榜，只显示比自己排名靠前的人的数据-->
<template>
	<div class="bg">
		<div class = "popover-bg">
			<div class = "popover-div">
				<div v-for="score in scores" :key = "score.id" >
					<ScoreRow class = "score-row" :score="score" v-if="score.id != user.id && score.id != 0"></ScoreRow>
					<OtherScoreRow class = "score-row" v-if="score.id == 0" ></OtherScoreRow>
					<MyScoreRow :score="score" v-if="score.id == user.id && score.id != 0"></MyScoreRow>
					<!--分割栏-->
					<el-row class = "popover-split"></el-row>
				</div>
			</div>
			<div class="center">
				<el-button @click="close()">Continue</el-button>
			</div>
			<br>
		</div>
	</div>
</template>

<script>
	import {req_getLeaderBoard1,req_getLeaderBoard2,req_getLeaderBoard3} from "../api/api.js";
	import MyScoreRow from "./MyScoreRow.vue"	
	import ScoreRow from "./ScoreRow.vue"
	import OtherScoreRow from "./OtherScoreRow.vue"
	export default {
	components:{MyScoreRow,ScoreRow,OtherScoreRow},
	  data () {
		return {
			/**
			 * 用户
			 */
			user:{},
			/**
			 * 排行榜
			 */
			scores:[]
		}
	  }
	  ,mounted() {
		  var user = sessionStorage.getItem('user');
		  if (user) {
		  	this.user = JSON.parse(user);
		  	console.log("Leaderboard mounted",this.user.id,this.user.type);
		  }else{
		  	this.$router.push({ path: '/404' });
		  }
	  },methods:{
		  handlerResponse(response){
			  console.log("req_getLeaderBoard，Response:",response);
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
			    }	
		  },
		  load(){
			  switch(this.user.type){
				  case 1:req_getLeaderBoard1(this.user.id).then(response => {this.handlerResponse(response)});break;
				  case 2:req_getLeaderBoard2(this.user.id).then(response => {this.handlerResponse(response)});break;
				  case 3:req_getLeaderBoard3(this.user.id).then(response => {this.handlerResponse(response)});break;
				  default:this.$router.push({ path: '/404' });
			  }
		  },
		  /**
		   * 调用父组件方法，关闭排行榜
		   */
		  close(){
			 this.$emit('func');
		  }
	  }
	}
</script>

<style>
	.bg{
		background: #000000;
		padding: 20px;
	}
	.score-row{
		padding: 0 20px;
	}
	.popover-bg{
		background-color: #409EFF;
		opacity: 1;
	}
	.popover-div{
		padding:20px 0;
		line-height: 30px;
		font-size: 18px;
		color: #FFFFFF;
	}
	.popover-split{
		height: 5px;
		background-color: #409EEE;
	}
</style>

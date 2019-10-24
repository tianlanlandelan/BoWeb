<!--第二种排行榜，只显示比自己排名靠后的人的数据-->
<template>
	<div class="bg" v-show="show">
		<div class = "popover-bg">
			<el-row class = "popover-split"></el-row>
			<MyScoreRow :score="myScore"></MyScoreRow>
	
			<div class = "popover-div">
				<div v-for="score in scores" :key = "score.id" >
					<ScoreRow :score="score" v-if="score.id != id && score.id != 0"></ScoreRow>
					<div v-if="score.id == 0" class="center others">... ...</div>
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
	import {req_getLeaderBoard2} from "../api/api.js";
	import MyScoreRow from "./MyScoreRow.vue"
	import ScoreRow from "./ScoreRow.vue"
	export default {
	components:{MyScoreRow,ScoreRow},
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
			  req_getLeaderBoard2(userId).then(response => {
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


	.popover-split{
		height: 5px;
		background-color: #409EEE;
	}

	.others{
		height: 40px;
		line-height: 40px;
	}
	
	
</style>

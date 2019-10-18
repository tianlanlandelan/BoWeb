<template>
	<div>
		<el-row v-for="exercise in list" :key = "exercise.id">
		  <el-col :span="6" >
			<h4>{{exercise.title}}</h4>
		  </el-col>
		  <el-col :span="18" >
			  <div v-html="exercise.content"></div>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
	import {req_getExerciseList} from "../../api/api.js";
	export default{
		data(){
			return{
				list:[]
			}
		},
		methods:{
			
		},mounted(){
			req_getExerciseList().then(response => {
			  console.log("Topic Saved，Response:",response);
			  //解析接口应答的json串
			  let { data, message, success } = response;
			  //应答不成功，提示错误信息
			  if (success !== 0) {
			    this.$message({
			      message: message,
			      type: 'error'
			    });
			  //应答成功，将用户信息缓存起来。跳转到默认页面
			  } else {
			    this.list = data;
			  }
			});
		}
	}
</script>

<style>
</style>

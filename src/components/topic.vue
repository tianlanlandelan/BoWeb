
<template>
	<!--课程展示页面-->
    <div>
        
    </div>
</template>

<script>
	import { req_getTopicInfo } from '../api/api';
	import {topic} from "../data.js";
    export default{
		props:{
			topicId:0
		},
		data(){
			return{
				topic:topic
			}
		},
		methods:{
			
		},mounted(){
			this.topic.init();
			console.log("topicId",this.topicId);
			// req_getTopicInfo().then(response => {
			//   console.log("Topic Saved，Response:",response);
			//   //解析接口应答的json串
			//   let { data, message, success } = response;
			//   //应答不成功，提示错误信息
			//   if (success !== 0) {
			//     this.$message({
			//       message: message,
			//       type: 'error'
			//     });
			//   } else {
			//     this.topic = data;
			//   }
			// });
		}
	}
</script>

<style>
</style>



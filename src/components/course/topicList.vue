<!-- 课时目录组件 -->
<template>
	<div>
		<div v-for="chapter in topicList" :key="chapter.id">
			<div class="font18 ColorMain">{{chapter.name}}</div>
				<el-row class="margin5-0"  v-for="topic in chapter.list" :key="topic.title">
					<el-col :span="18" :offset="1">
						<span  :class="topicId == topic.id ? ' ColorPrimary font-bold':'cursorPointer  ColorCommon'"
						 @click="handleTopicClick(topic.id)">{{topic.title}}</span>
					</el-col>
				</el-row>
		</div>
	</div>
</template>

<script>
	import {req_getTopicList} from "../../api/api.js";
    export default{
		data(){
			return{
				courseId:0,
				topicId:0,
				topicList:[]
			}
		},
		methods:{
			/**
			 * 点击课时时的回调函数，该函数会给父组件传递课时id，父组件使用 @func 接收处理即可
			 * @param {Object} topicId
			 */
			handleTopicClick(topicId){
				this.$emit('func',topicId);
			},
			/**
			 * 加载课时目录，如果已经加载过，不重复加载
			 */
			load(topicId,courseId){
				this.topicId = topicId;
				this.courseId = courseId;
				if(this.topicList.length > 0){
					return;
				}
				console.log("do getTopicList",this.courseId);
				req_getTopicList(this.courseId).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$notify.warning({
					  title:'warning',
				      message: message
				    });
				  } else {
				    this.topicList = data;
				  }
				});
			}
		},mounted(){
			
		}
	}
</script>

<style scoped>
</style>



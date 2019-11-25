<!-- 课程列表 -->
<template>
    <div>
		<el-row class="border-2-info marginBottom20 padding10-0">
			<el-col>
				<el-button type="primary" @click="handleAddCourse()">添加课程</el-button>
			</el-col>
		</el-row>
		
		<div v-for="course in list" :key = "course.id">
			<CourseRow :course="course"></CourseRow>
		</div>
		
    </div>
</template>

<script>
	
	import {req_getCourseList} from "../../api/api.js";
	import CourseRow from "../../components/course/row.vue"
    export default{
		data(){
			return{
				list:[]
			}
		},
		components:{CourseRow},
		methods:{
			handleAddCourse(){
				this.$router.push('/CourseEidt');	
			},
			handleEditCourse(courseId){
				this.$router.push({ path: '/CourseEidt', query: { courseId: courseId }});
			},
			handleTopicList(courseId){
				this.$router.push({ path: '/TopicList', query: { courseId: courseId }});
			}
		},mounted(){
			req_getCourseList().then(response => {
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

<style scoped>
</style>



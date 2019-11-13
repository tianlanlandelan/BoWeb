<!-- 课程列表 -->
<template>
    <div>
		<el-row>
			<el-col>
				<el-button type="primary" @click="handleAddCourse()">添加课程</el-button>
			</el-col>
		</el-row>
		
		<el-row v-for="course in list" :key = "course.id">
			<el-col :span="16">
				<!-- 课程总览 -->
				<CourseRow :course="course"></CourseRow>
			</el-col>
			<el-col :span="8">
				<!-- 课程管理 -->
				<el-button type="primary" @click="handleEditCourse(course.id)">编辑课程</el-button>
				<el-button type="primary" @click="handleTopicList(course.id)">管理课时</el-button>
				<el-button type="primary">查看评价</el-button>
			</el-col>
		</el-row>
		
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

<style>
</style>



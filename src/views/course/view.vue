
<template>
    <div class="courseView">
		<!-- 课程展示 -->
        <CourseRow :course="course"></CourseRow>
		<div>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<!-- 课程介绍 -->
				<el-tab-pane label="概览" name="1">
					<div v-html="course.overview"></div>
				</el-tab-pane>
				<!-- 课程目录 -->
				<el-tab-pane label="目录" name="2">
					<TopicList @func="handleGoTopicInfo" ref="topicList"></TopicList>
				</el-tab-pane>
				<el-tab-pane label="资料" name="3">
					3
				</el-tab-pane>
				<el-tab-pane label="问答" name="4">
					4
				</el-tab-pane>
				<el-tab-pane label="评价" name="5">
					5
				</el-tab-pane>
			</el-tabs>
		</div>
    </div>
</template>

<script>
	var Base64 = require('js-base64').Base64;
	import {req_getCourse} from "../../api/api.js";
	import CourseRow from "../../components/course/row.vue"
	import TopicList from "../../components/course/TopicList.vue"
    export default{
		components:{CourseRow,TopicList},
		data(){
			return{
				activeName:"1",
				course:{
					id:0,
					title:"",
					subTitle:"",
					img:"",
					overview:"",
					overviewMD:"",
					price:0,
					status:0
				}
			}
		},
		methods:{
			handleGoTopicInfo(topicId){
				this.$router.push({ path: '/Topic', query: { id:topicId,courseId: this.course.id ,courseTitle:this.course.title}});
			},
			handleClick(tab, event) {
				this.$notify.info({
					title:tab.name,
					message:""
				});
				if(tab.name == "2"){
					this.$refs.topicList.load(0,this.course.id);
				}
			}
		},mounted(){
			let that = this;
			//编辑课程
			if(this.$route.query.courseId){
				this.course.id = this.$route.query.courseId;
				req_getCourse(this.course.id).then(response => {
					if(response){
						//解析接口应答的json串
						let { data, message, success } = response;
						//应答不成功，提示错误信息
						if (success !== 0) {
						  this.$message({
						    message: "获取课程失败：" + message + "！！！",
						    type: 'error'
						  });
						} else {
							that.course = data;
							that.course.overview = Base64.decode(data.overview);
						}
					}
				});
			}
		}
	}
</script>

<style>
	.courseView{
		margin: 0 20%;
	}
</style>



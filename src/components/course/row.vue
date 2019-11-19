<!-- 课程按行展示，用于课程管理页面的列表和课程学习页面的课程简介 -->
<template>
    <div>
        <el-row class="row padding5 margin5" :gutter="20">
			<el-col :span="8">
				<img :src="config.nginxUrl + course.img" />
			</el-col>
			<el-col :span="16" class="padding0-5">
				<div class="font20 ColorMain font-bold" >{{course.title}}</div>
				<div class="font16 ColorCommon margin5-0">{{course.subTitle}}</div>
				<div class="ColorInfo margin5-0">{{course.topicNumber}}课时 | {{course.gotNumber}}人已学 | {{course.evaluatedNumber}}评论</div>
				<el-rate class="margin5-0"
				  v-model="course.evaluation"
				  disabled
				  show-score
				  text-color="#ff9900"
				  :score-template="course.evaluation + ''">
				</el-rate>
				<div>
					<span class="ColorCommon">价格: </span>
					<span class="ColorPrimary font20 font-bold" v-if="course.price !== 0">{{course.price}}</span>
					<span class="font18 font-bold ColorCommon" v-if="course.price !== 0"> ￥</span>
					<span class="ColorPrimary font20 font-bold" v-if="course.price === 0"> 免费</span>
				</div>
				<div class="marginTop20">
					<el-link class="font16" icon="el-icon-edit" @click="handleEditCourse(course.id)">编辑</el-link>
					&nbsp;&nbsp;
					<el-link class="font16" icon="el-icon-view" @click="handleViewCourse(course.id)">预览</el-link>
					&nbsp;&nbsp;
					<el-link class="font16" icon="el-icon-notebook-2" @click="handleTopicList(course.id)">课时</el-link>
					&nbsp;&nbsp;
					<el-link class="font16" icon="el-icon-star-off">评价</el-link>
					&nbsp;&nbsp;
					<el-link class="font16" icon="el-icon-folder-opened">资料</el-link>
					&nbsp;&nbsp;
					<el-link class="font16" icon="el-icon-chat-dot-round">问答</el-link>
				</div>
			</el-col>
		</el-row>
    </div>
</template>

<script>
	import {config} from "../../data.js";
    export default{
		props:{
			course:{}
		},
		data(){
			return{
				config:config
				
			}
		},
		methods:{
			handleViewCourse(courseId){
				this.$router.push({ path: '/Course', query: { courseId: courseId }});
			},
			handleEditCourse(courseId){
				this.$router.push({ path: '/CourseEidt', query: { courseId: courseId }});
			},
			handleTopicList(courseId){
				this.$router.push({ path: '/TopicList', query: { courseId: courseId }});
			}
		},mounted(){
			
		}
	}
</script>

<style>
	.row{
		height: 220px;
	}
	img{height: 220px;}
</style>



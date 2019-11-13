<!-- 课程按行展示，用于课程管理页面的列表和课程学习页面的课程简介 -->
<template>
    <div>
        <el-row class="row padding5 margin5">
			<el-col :span="6">
				<img :src="config.nginxUrl + course.img" />
			</el-col>
			<el-col :span="18" class="padding0-5">
				<div class="font20 ColorMain font-bold" >{{course.title}}</div>
				<div class="font16 ColorCommon margin5-0">{{course.subTitle}}</div>
				<div class="ColorInfo margin5-0">52课时 | 5649人已学 | 10评论</div>
				<el-rate class="margin5-0"
				  v-model="value"
				  disabled
				  show-score
				  text-color="#ff9900"
				  score-template="{value}">
				</el-rate>
				<div>
					<span class="ColorCommon">价格: </span>
					<span class="ColorPrimary font20 font-bold" v-if="course.price !== 0">{{course.price}}</span>
					<span class="font18 font-bold ColorCommon" v-if="course.price !== 0"> ￥</span>
					<span class="ColorPrimary font20 font-bold" v-if="course.price === 0"> 免费</span>
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
				config:config,
				value:3.7,
				
			}
		},
		methods:{
			
		},mounted(){
			
		}
	}
</script>

<style>
	.row{
		height: 150px;
	}
	img{height: 150px;}
</style>



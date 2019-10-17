<template>
	<div>
		<el-form label-position="left" label-width="80px" >   
			<el-form-item label="课程标题">
				<el-input v-model="topic.title" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="上传视频">
				<el-upload
				    action="/upload/video"
					:file-list="fileList"
				    :multiple="true"
					:before-upload="beforeAvatarUpload"
				    :on-remove="handleRemove"
				    :on-success="handleSuccess">
				    <el-button size="small" type="primary">点击上传</el-button>
				    </el-upload>
			</el-form-item>
			<el-form-item label="视频标题">
				<el-input v-model="topic.videoTitle" placeholder="请输入内容"></el-input>
			</el-form-item>
		</el-form> 
	</div>
</template>

<script>
	import {topic} from "../../data.js";
	export default{
		data(){
			return{
				fileList:[],
				topic:topic
			}
		},
		methods:{
			beforeAvatarUpload(file) {
				console.log("file.type",file.type);
				const isJPG = file.type === 'video/mp4';
				const isLt2M = file.size / 1024 / 1024 < 200;

				if (!isJPG) {
				  this.$message.error('上传视频只能是 MP4 格式!');
				}
				if (!isLt2M) {
				  this.$message.error('上传视频大小不能超过 200MB!');
				}
				return isJPG && isLt2M;
			  },
			handleRemove(file, fileList) {
			},
			handlePictureCardPreview(file) {
			},
			handleSuccess(response,file,fileList){
			    if(response.success == 0){
			        console.log(response);
			    }
			},
		},mounted(){
			
		}
	}
	
</script>

<style>
</style>

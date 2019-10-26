<template>
	<div>
		<el-form label-position="left" label-width="80px" >   
			<el-form-item label="课程标题">
				<el-input v-model="topic.title" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="课程内容">
				<div id = "editor"></div>
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
			<el-form-item label="ppt预览地址" >
				<el-input v-model="topic.pptUrl" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click = "submit()">添加课程</el-button>
			</el-form-item>
		</el-form> 
	</div>
</template>

<script>
	import {req_saveTopic} from "../../api/api.js";
	import {topic} from "../../data.js";
	import E from 'wangeditor';
	
	export default{
		data(){
			return{
				fileList:[],
				topic:topic,
				editor : new E("#editor")
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
			//上传视频成功
			handleSuccess(response,file,fileList){
			    if(response.success == 0){
			        console.log(response);
					this.topic.videoUrl = response.data;
			    }
			},
			submit(){
				if(this.editor.txt.text()){
					this.topic.content = this.editor.txt.html();
					console.log("html",this.editor.txt.html());	
				}
				
				req_saveTopic(this.topic).then(response => {
				  console.log("Topic Saved，Response:",response);
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
				    this.$message({
				      message: "Save Topic Success!",
				      type: 'success'
				    });
					this.$router.push('/TopicList');
				  }
				});
			}
		},mounted(){
			this.topic.init();
			// this.editor.customConfig.uploadImgServer = '/upload/img';
			// 将图片大小限制为 3M
			// this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
			// 限制一次最多上传 5 张图片
			// this.editor.customConfig.uploadImgMaxLength = 5
			// this.editor.customConfig.uploadImgShowBase64 = true ;
			this.editor.create();
			// 配置服务器端地址
    
    
		}
	}
	
</script>

<style>
</style>

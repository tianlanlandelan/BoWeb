<template>
	<div>
		<el-form label-position="left" label-width="80px" >   
			<el-form-item label="标题">
				<el-input v-model="exercise.title" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="内容">
				<div id = "editor"></div>
			</el-form-item>
			<el-form-item label="图片">
				<el-upload
				    action="/upload/img"
					:file-list="fileList"
				    :multiple="true"
					:before-upload="beforeAvatarUpload"
				    :on-remove="handleRemove"
				    :on-success="handleSuccess">
				    <el-button size="small" type="primary">点击上传</el-button>
				    </el-upload>
			</el-form-item>
			<el-form-item label="问题" >
				<el-input v-model="exercise.question" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="A" >
				<el-input v-model="exercise.optionA" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="B" >
				<el-input v-model="exercise.optionB" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="C" >
				<el-input v-model="exercise.optionC" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="D" >
				<el-input v-model="exercise.optionD" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="答案" >
				<el-radio-group v-model="exercise.answer">
					<el-radio label="A">A</el-radio>
					<el-radio label="B">B</el-radio>
					<el-radio label="C">C</el-radio>
					<el-radio label="D">D</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click = "submit()">添加课程</el-button>
			</el-form-item>
		</el-form> 
	</div>
</template>

<script>
	import {req_saveExercise} from "../../api/api.js";
	import {exercise,utils} from "../../data.js";
	import E from 'wangeditor';
	
	export default{
		props:{
			id:0,
			topicId:0
		},
		data(){
			return{
				fileList:[],
				exercise:exercise,
				editor : new E("#editor")
			}
		},
		methods:{
			beforeAvatarUpload(file) {
				console.log("file.type",file.type);
				const isJPG = file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
				  this.$message.error('上传图片只能是 png 格式!');
				}
				if (!isLt2M) {
				  this.$message.error('上传图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			  },
			handleRemove(file, fileList) {
			},
			//
			handleSuccess(response,file,fileList){
			    if(response.success == 0){
			        console.log(response);
					this.exercise.img = response.data;
			    }
			},
			submit(){
				if(this.editor.txt.text()){
					this.exercise.content = this.editor.txt.html();
				}
				console.log(this.exercise.toString());
				req_saveExercise(this.exercise).then(response => {
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
				    
				  }
				});
			}
		},mounted(){
			this.editor.create();
			this.exercise.id = utils.getParameter("id");
			this.exercise.topicId = utils.getParameter("topicId");
			
		}
	}
	
</script>

<style>
</style>

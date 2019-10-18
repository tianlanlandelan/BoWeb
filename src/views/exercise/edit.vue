<template>
	<div>
		<el-form label-position="left" label-width="80px" >   
			<el-form-item label="标题">
				<el-input v-model="exercise.title" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="内容">
				<div id = "editorTitle"></div>
				<div id = "editorContent" class = "editorContent"></div>
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
				<div id = "editorATitle" v-show="false"></div>
				<div id = "editorAContent" class="editorContent"></div>
			</el-form-item>
			<el-form-item label="B" >
				<div id = "editorBTitle" v-show="false"></div>
				<div id = "editorBContent" class="editorContent"></div>
			</el-form-item>
			<el-form-item label="C" >
				<div id = "editorCTitle" v-show="false"></div>
				<div id = "editorCContent" class="editorContent"></div>
			</el-form-item>
			<el-form-item label="D" >
				<div id = "editorDTitle" v-show="false"></div>
				<div id = "editorDContent" class="editorContent"></div>
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
				<el-button type="primary" @click = "submit()">添加练习</el-button>
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
				editor : new E("#editorTitle","#editorContent"),
				editorA : new E("#editorATitle","#editorAContent"),
				editorB : new E("#editorBTitle","#editorBContent"),
				editorC : new E("#editorCTitle","#editorCContent"),
				editorD : new E("#editorDTitle","#editorDContent")
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
				if(this.editorA.txt.text()){
					this.exercise.optionA = this.editorA.txt.html();
				}
				if(this.editorB.txt.text()){
					this.exercise.optionB = this.editorB.txt.html();
				}
				if(this.editorC.txt.text()){
					this.exercise.optionC = this.editorC.txt.html();
				}
				if(this.editorD.txt.text()){
					this.exercise.optionD = this.editorD.txt.html();
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
					  this.$message({
					    message: "Exercise Save Success",
					    type: 'success'
					  });
				    this.$router.push('/ExerciseList');
				  }
				});
			}
		},mounted(){
			
			this.editor.create();
			this.editorA.create();
			this.editorB.create();
			this.editorC.create();
			this.editorD.create();
			
			this.exercise.init();
			this.exercise.id = utils.getParameter("id");
			this.exercise.topicId = utils.getParameter("topicId");
			
		}
	}
	
</script>

<style>
	
	.editor{
		border: 1px solid #ccc;
	}
	.editorContent{
		min-height: 100px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}
	.editorContent{
		min-height: 40px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}
	.editorContent :hover{
		border-color: #409eff;
	}
	
</style>

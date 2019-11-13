
<template>
    <div>
        <el-form label-position="left" label-width="80px" >   
			<el-form-item label="标题">
				<el-input v-model="course.title" placeholder="请输入标题"></el-input>
			</el-form-item>
			<el-form-item label="副标题">
				<el-input v-model="course.subTitle" placeholder="请输入副标题"></el-input>
			</el-form-item>
			<el-form-item label="图片">
					<el-upload
					  class="avatar-uploader"
					  action="/upload/img"
					  :show-file-list="false"
					  :on-success="handleSuccess">
					  <img v-if="course.img" :src="config.nginxUrl + course.img" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
			</el-form-item>
			<el-form-item label="概述">
				<div id = "editor"></div>
			</el-form-item>
			<el-form-item label="价格">
				<el-input v-model="course.price" placeholder="请输入价格"></el-input>
			</el-form-item>
			<el-form-item >
				<el-row>
					<el-col :span="12">
						<el-button type="primary" @click = "handleSave()">保存</el-button>
					</el-col>
					<el-col :span="12">
						<el-button type="success" @click = "handleSubmit()">发布</el-button>
					</el-col>
				</el-row>
			</el-form-item>
		</el-form>
    </div>
</template>

<script>
	import {config} from "../../data.js";
	import {req_saveCourse} from "../../api/api.js";
	import E from 'wangeditor';
    export default{
		data(){
			return{
				config:config,
				/**
				 * 课程
				 */
				course:{
					id:0,
					title:"",
					subTitle:"",
					img:"",
					overview:"",
					price:0,
					status:0
				},
				editor : new E("#editor")
			}
		},
		methods:{
			handleSuccess(response,file,fileList){
			    if(response.success == 0){
					this.course.img = response.data;
			    }
			},
			getOverview(){
				if(this.editor.txt.text()){
					this.course.overview = this.editor.txt.html();
				}
			},
			/**
			 * 保存草稿
			 */
			handleSave(){
				this.getOverview();
				this.course.status = 1;
				this.doPost();
			},
			handleSubmit(){
				this.getOverview();
				this.doPost();
			},
			doPost(){
				req_saveCourse(this.course).then(response => {
					if(response){
						//解析接口应答的json串
						let { data, message, success } = response;
						//应答不成功，提示错误信息
						if (success !== 0) {
						  this.$message({
						    message: "添加课程失败：" + message + "！！！",
						    type: 'error'
						  });
						} else {
						  this.$message({
						    message: "Save Course Success!",
						    type: 'success'
						  });
							this.$router.push('/CourseList');
						}
					}
				});
			}
		},mounted(){
			this.editor.create();
		}
	}
</script>

<style>
	
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>



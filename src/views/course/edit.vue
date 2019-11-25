
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
				<!-- MarkDown编辑器 -->
				<MarkDown @func="markdownChanged" :mdstr="course.overviewMD" :htmlstr="course.overview" ref="markdown"></MarkDown>
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
	import {req_saveCourse,req_getCourse} from "../../api/api.js";
	import MarkDown from "../../components/MarkDown.vue"
    export default{
		components:{MarkDown},
		data(){
			return{
				loadMarkDown:false,
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
					overviewMD:"",
					price:0,
					status:0
				},
				/**
				 * 定时器，每60秒自动保存编辑中的课程简介
				 */
				interval : ''
			}
		},
		methods:{
			handleSuccess(response,file,fileList){
			    if(response.success == 0){
					this.course.img = response.data;
			    }
			},
			/**
			 * 保存草稿
			 */
			handleSave(auto){
				this.course.status = 1;
				this.doPost(auto);
			},
			handleSubmit(){
				this.course.status = 0;
				this.doPost();
			},
			doPost(auto){
				let id = this.course.id;
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
						  if(auto){
							  this.$message({
							    message: "已自动保存为草稿",
							    type: 'success'
							  }); 
						  }else{
							 this.$message({
							   message: id==0?"添加课程成功！":"修改课程成功！",
							   type: 'success'
							 }); 
							 clearInterval(this.interval);
							 this.$router.push('/CourseList');
						  }
						}
					}
				});
			},
			/**
			 * markdown内容发生变化后的回调
			 * @param {Object} content markdown内容
			 * @param {Object} html HTML内容
			 */
			markdownChanged(content,html){
				this.course.overviewMD = content;
				this.course.overview = html;
	
				if(this.interval == ''){
					console.log("开启计时器");
					//开启计时器，每60秒自动保存课程内容
					this.interval = setInterval(()=>{
						if(this.course.title && this.course.overviewMD){
							this.handleSave(true);
						}
					}, 60000)
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
							//将课程内容回显在 MarkDown 编辑器中
							this.$refs.markdown.load(this.course.overviewMD,this.course.overview);
						}
					}
				});
			}
			
		},destroyed(){
			/**
			 * 在使用setInterval 时一定要注意在 destroyed 时清除定时器
			 */
			console.log("销毁计时器");
			clearInterval(this.interval);
		}
	}
</script>

<style scoped>
	
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



<!-- 笔记 -->
<template>
    <div>
		<div v-if="show" >
			<el-row class="border-2-info font18 ColorCommon marginBottom10 padding5">
				<el-col :span="16">
					<div class="font-bold ">{{note.title}}</div>
				</el-col>
				<!-- 操作按钮 -->
				<el-col :span="8">
					<!-- 编辑 -->
					<el-link :underline="false" @click="handleEdit()" v-show="!editMode" >
						<i class="el-icon-edit">编辑</i>&nbsp;&nbsp;
					</el-link>
					
					<!-- 删除 -->
					<el-link :underline="false" @click="handleDelete()" v-show="!editMode" >
						<i class="el-icon-delete"></i><span>删除</span>&nbsp;&nbsp;
					</el-link>					
					
					<!-- 预览 -->
					<el-link :underline="false" @click="handleView()" v-show="editMode" >
						<i class="el-icon-view">退出编辑模式</i>&nbsp;&nbsp;
					</el-link>
				</el-col>
			</el-row>
			<!-- 编辑模式 -->
			<div v-if="editMode" >
				<!-- MarkDown编辑器 -->
				<mavon-editor 
				    v-model="editorStr" 
				    ref="md" 
					@imgAdd="imgAdd"
				    @change="markdownChanged" 
					@save="markdownSave"
				    style="min-height: 400px;"
				/>
			</div>
			<!-- 阅读模式 -->
			<div v-else class="ColorMain" v-html="htmlStr"></div>
		</div>
		
    </div>
</template>

<script>
	import { mavonEditor } from 'mavon-editor';
	import 'mavon-editor/dist/css/index.css';
	import axios from 'axios';
	import {config} from "../data.js";
	var Base64 = require('js-base64').Base64;
	import {req_saveNote,req_deleteTopic} from "../api/api.js";
	
    export default{
		components: {
		    mavonEditor
		},
		data(){
			return{
				editorStr:"",
				htmlStr:"",
				show:false,
				editMode:false,
				note:{}
			}
		},
		methods:{
			/**
			 * 切换到编辑模式，加载markdown编辑器
			 */
			handleEdit(){
				this.editMode=true;
			},
			/**
			 * 删除笔记
			 */
			handleDelete(){
				this.editMode=false;
				this.show=false;
			},
			/**
			 * 切换到阅读模式，保存正在编辑的笔记
			 */
			handleView(){
				this.saveNote();
				this.editMode=false;
				
				
			},
			// 将图片上传到服务器，返回地址替换到md中
			imgAdd(pos, $file){
			    let formdata = new FormData();
				/**
				 * 服务端接口用 MultipartFile file 参数接收的，此处用formdata.append('file', $file)传
				 */
			   formdata.append('file', $file);
			    axios.post('/upload/img',
						formdata
					 ,{
					headers:{
						'Content-Type': 'multipart/form-data' 
					}
				}).then(res => {
					// 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
					/**
					* $vm 指为mavonEditor实例，可以通过如下两种方式获取
					* 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
					* 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
					*/
			        console.log(res.data);
			        this.$refs.md.$img2Url(pos, config.nginxUrl + res.data.data);
			    }).catch(err => {
					this.$notify.error({
					  title:'Failed',
					  message: err
					});
			    });
				
			},
			markdownSave(value, render){
				this.saveNote();
			},
			// 所有操作都会被解析重新渲染
			markdownChanged(value, render){
			    this.htmlStr = render;
			},
			saveNote(){
				this.note.contentMD = Base64.encodeURI(this.editorStr);
				this.note.content = Base64.encodeURI(this.htmlStr);
				req_saveNote(this.note).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
				    this.$notify.success({
						title:"success",
						message:"笔记已保存"
					});
				  }
				});
			},
			load(note){
				this.show = true;
				this.editMode=false;
				this.note = note;
				if(note.contentMD){
					this.editorStr = Base64.decode(note.contentMD);
				}
				if(note.content){
					this.htmlStr = Base64.decode(note.content);
				}
			}
		},mounted(){
			
		}
	}
</script>

<style scoped>
	
</style>



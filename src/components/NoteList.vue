<!-- 笔记列表 -->
<template>
    <div>
		<div class="border-2-info font18 ColorCommon marginBottom10">{{notes.title}}</div>
		<draggable
        		group="chapter"
        	    v-model="list"
        	    @change="chapterListChange()">
        				<div v-for="chapter in list" :key="chapter.name">
        					<div class="font18 ColorCommon cursorPointer">
								{{chapter.name}} 
								<el-dropdown>
								  <span class="el-dropdown-link">
									<i class="el-icon-edit"></i>
								  </span>
								  <el-dropdown-menu slot="dropdown">
									<el-dropdown-item icon="el-icon-plus">添加</el-dropdown-item>
									<el-dropdown-item icon="el-icon-edit">修改</el-dropdown-item>
									<el-dropdown-item icon="el-icon-delete">删除</el-dropdown-item>
								  </el-dropdown-menu>
								</el-dropdown>
							</div>
        					<draggable
        						group="note"
        					    v-model="chapter.list"
        					    @change="noteListChange(chapter)">
        								<el-row class="margin5-0"  v-for="note in chapter.list" :key="note.title">
											<el-col :span="16" :offset="1">
												<span :class="noteId == note.id ? 'cursorPointer ColorPrimary font-bold':'cursorPointer  ColorCommon'"
												 @click="getNoteById(note.id)">{{note.title}}</span>
											</el-col>
        									
        								</el-row>
        					</draggable>
        				</div>
        	</draggable>
    </div>
</template>

<script>
	import draggable from 'vuedraggable';
	import {req_getNoteList,req_getNote,req_updateNote,req_updateChapter,req_deleteChapter,req_deleteTopic} from "../api/api.js";
    export default{
		components:{draggable},
		data(){
			return{
				notes:{},
				list:[],
				noteId:0
			}
		},
		methods:{
			getNoteList(){
				req_getNoteList(this.notes.id).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
				    this.list = data;
				  }
				});
			},
			/**
			 * 目录发生改变时，修改目录
			 */
			chapterListChange(){
				for(var i = 0; i < this.list.length ; i ++){
					console.log(this.list[i].id,this.list[i].name);
					this.updateChapter(this.list[i].id,i,this.list[i].name);
				}
				
			},
			/**
			 * 修改目录
			 * @param {Object} id
			 * @param {Object} sort
			 * @param {Object} name
			 */
			updateChapter(id,sort,name){
				req_updateChapter(id,sort,name).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
					this.$notify.error({
					  title:'Failed',
					  message: message
					});
				  } 
				});
			},
			/**
			 * 章节下的课程排序发生变化，修改课时/章节关系及课时顺序
			 * @param {Object} chapterId 章节Id
			 */
			noteListChange(chapter){
				console.log("========",chapter.id,chapter.name,"========");
				for(var i = 0; i < chapter.list.length ; i ++){
					this.updateNote(chapter.list[i].id,chapter.id,i);
					console.log("id:",chapter.list[i].id ,"chapterId:",chapter.id,"sort:",i,"title:",chapter.list[i].title);
				}
				console.log("========END========");
			},
			updateNote(id,chapterId,sort){
				req_updateNote(id,chapterId,sort).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
					this.$notify.error({
					  title:'Failed',
					  message: message
					});
				  } 
				});
			},
			getNoteById(noteId){
				if(this.noteId == noteId){
					return;
				}
				req_getNote(noteId).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
					this.$notify.error({
					  title:'Failed',
					  message: message
					});
				  }else{
					 this.noteId = data.id;
					 this.$emit('func',data); 
				  } 
				});
				
			},
			load(notes){
				this.notes = notes;
				this.getNoteList();
			}
		},mounted(){
			/**
			 * draggable在火狐浏览器中使用时，拖拽事件会打开新的标签页，在此要阻止窗口事件
			 * @param {Object} event
			 */
			document.body.ondrop = function (event) {
				event.preventDefault();
				event.stopPropagation();
			}
		}
	}
</script>

<style scoped>
</style>



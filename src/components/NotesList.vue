
<template>
    <div>
		<div class="border-2-info font18 ColorCommon marginBottom10">我的笔记本</div>
        <div class="cursorPointer" v-for="item in list" :key="item.id + item.title">
			<span class="font18 ColorCommon"><i class="el-icon-notebook-1"></i>&nbsp;&nbsp;{{item.title}}</span>
			<span class="font12 ColorInfo"><i class="el-icon-notebook-2"></i>{{item.noteNumber}}</span>
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
    </div>
</template>

<script>
	import {format} from "../data.js";
	import {req_saveNotes,req_getNotesList} from "../api/api.js";
    export default{
		data(){
			return{
				list:[],
				eidtId:0,
				notes:{}
			}
		},
		methods:{
			/**
			 * 获取笔记本列表
			 */
			getNotesList(userId){
				req_getNotesList(userId).then(response => {
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
					this.notes = this.list[0];
					this.func();
				  }
				});
			},
			saveNotes(notes){
				req_saveNotes(notesId).then(response => {
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
			},
			load(userId){
				this.getNotesList(userId);
			},
			func(){
				this.$emit('func',this.notes); 
			}
		},mounted(){
			
		}
	}
</script>

<style scoped>
</style>



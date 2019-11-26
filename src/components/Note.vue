<!-- 笔记 -->
<template>
    <div>
		<el-row>
			<el-col :span="16">
				<div class="font18 font-bold ColorCommon">{{note.title}}</div>
			</el-col>
			<el-col :span="8">
				<i class="el-icon-edit cursorPointer" v-show="!editMode" @click="editMode=true"></i>
				<i class="el-icon-delete cursorPointer" v-show="!editMode"></i>
				
				<i class="el-icon-view cursorPointer" v-show="editMode" @click="editMode=false"></i>
				
			</el-col>
		</el-row>
        
		<div class="ColorMain" v-html="note.content"></div>
    </div>
</template>

<script>
	var Base64 = require('js-base64').Base64;
    export default{
		data(){
			return{
				editMode:false,
				note:{}
			}
		},
		methods:{
			load(note){
				this.note = note;
				if(note.contentMD){
					this.note.contentMD = Base64.decode(note.contentMD);
				}
				if(note.content){
					this.note.content = Base64.decode(note.content);
				}
				
			}
		},mounted(){
			
		}
	}
</script>

<style scoped>
</style>



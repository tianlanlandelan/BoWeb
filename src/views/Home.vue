<template>
	<div>
		<div class="alignCenter font20 ColorInfo">Header</div>
		<el-row>
			<!-- 笔记本列表 -->
			<el-col :span="3" class="padding10">
				<el-dropdown split-button type="primary">
				  <i class="el-icon-circle-plus-outline"></i>新建
				  <el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click="addNotes()">笔记本</el-dropdown-item>
					<el-dropdown-item>目录</el-dropdown-item>
					<el-dropdown-item>笔记</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
				
				<NotesList ref="notesList"></NotesList>
			</el-col>
			<!-- 笔记列表 -->
			<el-col :span="3" class="padding10">
				<NoteList @func = "getNote" ref="noteList"></NoteList>
			</el-col>
			<!-- 笔记内容 -->
			<el-col :span="14" class="padding10">
				<note ref="note"></note>
			</el-col>
		</el-row>
		<router-view></router-view>
	</div>
</template>

<script>
	import NotesList from "../components/NotesList.vue";
	import NoteList from "../components/NoteList.vue";
	import Note from "../components/Note.vue";
	import {req_saveNotes,req_getNotesList,req_getNoteList} from "../api/api.js";
	export default {
		components:{NotesList,NoteList,Note},
		data() {
			return {
				user:{},
				/**
				 * 当前选择的笔记本
				 */
				notes:{},
				/**
				 * 当前打开的笔记
				 */
				note:{},
				notesList:[],
				noteList:[]
				
			}
		},
		methods: {
			addNotes(){
				
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
				    this.noteList = data;
					this.$refs.noteList.load(this.noteList);
				  }
				});
			},
			getNote(note){
				this.note = note;
				this.$refs.note.load(this.note);
			},
			getNoteList(notesId){
				req_getNoteList(notesId).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
				    this.noteList = data;
					this.$refs.noteList.load(this.noteList);
				  }
				});
			},
			/**
			 * 获取笔记本列表
			 */
			getNotesList(){
				req_getNotesList(this.user.id).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
				    this.notesList = data;
					this.$refs.notesList.load(this.notesList);
					this.notes = this.notesList[0];
					//获取第一个笔记本里的笔记列表
					this.getNoteList(this.notes.id);
				  }
				});
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				this.user = JSON.parse(user);
				console.log("Home mounted",this.user.id,this.user.type);
				this.getNotesList();
			}else{
				this.$router.push({ path: '/404' });
			}
			
		}
	}

</script>
<style scoped lang="scss">
	
</style>

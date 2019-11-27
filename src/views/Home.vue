<template>
	<div>
		<div class="myHeader alignCenter font20 ColorInfo">Header</div>
		<el-row>
			<!-- 笔记本列表 -->
			<el-col :span="3" :style="'max-height:' + height + 'px;'" class="padding10 myBody">
				<NotesList @func="getNotes" ref="notesList"></NotesList>
			</el-col>
			<!-- 笔记列表 -->
			<el-col :span="5" :style="'max-height:' + height + 'px;'" class="padding10 myBody">
				<NoteList @func = "getNote" ref="noteList"></NoteList>
			</el-col>
			<!-- 笔记内容 -->
			<el-col :span="16" :style="'max-height:' + height + 'px;'" class="padding10 myBody">
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
	import $ from 'jquery';
	export default {
		components:{NotesList,NoteList,Note},
		data() {
			return {
				height:0,
				user:{},
				/**
				 * 当前选择的笔记本
				 */
				notes:{},
				/**
				 * 当前打开的笔记
				 */
				note:{}
				
			}
		},
		methods: {
			getNotes(notes){
				this.notes= notes;
				//获取第一个笔记本里的笔记列表
				this.$refs.noteList.load(this.notes);
			},
			getNote(note){
				this.note = note;
				this.$refs.note.load(this.note);
			}
		},
		mounted() {
			this.height = $(window).height() - 40;
			var user = sessionStorage.getItem('user');
			if (user) {
				this.user = JSON.parse(user);
				console.log("Home mounted",this.user.id,this.user.type);
				this.$refs.notesList.load(this.user.id);
			}else{
				this.$router.push({ path: '/404' });
			}
			let that = this;
			window.onresize = function () {
				that.height = $(window).height() - 40;	
			}
			
		}
	}

</script>
<style scoped lang="scss">
	.myHeader{
		height:40px;
	}
	.myBody{
		overflow:auto;
	}
</style>

<!-- 课时列表 -->
<template>
	<div class="padding10">
		<el-row>
			<!-- 课时列表 -->
			<el-col :span="12">
				<el-button type="primary" @click="handleAddTopic()">添加课时</el-button>
				<!-- 课时列表，可拖动排序 -->
				<div class=" width50 font-bold font18 ColorInfo margin10-0 border-2-info">课时列表，可拖动排序</div>
				<div v-for="chapter in list" :key="chapter.name">
					<div class="font18 ColorMain"> {{chapter.name}}</div>
					<draggable
						group="chapter"
					    v-model="chapter.list"
					    @change="topicListChange(chapter)"
						@start="start">
								<el-row class="margin5-0"  v-for="topic in chapter.list" :key="topic.title">
									<el-col :span="18" :offset="1">
										<span class="cursorPointer font16 ColorCommon">{{topic.title}}</span>
									</el-col>
								</el-row>
					</draggable>
				</div>
			</el-col>
			
			<!-- 章节列表 -->
			<el-col :span="12">
				<el-row class="margin10-0">
					<el-col :span="18">
						<el-input v-model="chapter.name" placeholder="第一章: JavaScript简介"></el-input>
					</el-col>
					<el-col :span="5" :offset="1">
						<el-button type="primary" @click="handleAddChapter()">添加章节</el-button>
					</el-col>
				</el-row>
				<!-- 章节列表，可拖动排序 -->
				<div class="width50 font-bold font18 ColorInfo margin10-0 border-2-info">章节列表，可拖动排序</div>
				<draggable
					:group="{ name: 'chapter', pull: 'clone', put: false }"
				    v-model="list"
				    @change="draggableChange">
							<el-row class="margin5-0"  v-for="chapter in list" :key="chapter.id">
								<el-col :span="18">
									<span class="cursorPointer font18 ColorCommon">{{chapter.name}}</span>
								</el-col>
								<el-col :span="6">
									<el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDeleteChapter(chapter.id)"></el-button>
								</el-col>
							</el-row>
				</draggable>
			</el-col>
		</el-row>
		
		  
		
	</div>
</template>

<script>
	import draggable from 'vuedraggable';
	import {req_saveChapter,req_getTopicList} from "../../api/api.js";
	export default{
		components:{draggable},
		data(){
			return{
				courseId:0,
				list:[],
				chapter:{
					id:0,
					courseId:0,
					name:"",
					sort:0
				},
				list1: [
				  { name: "Jesus", id: 1 },
				  { name: "Paul", id: 2 },
				  { name: "Peter", id: 3 }
				],
				list2: [
				  { name: "Luc", id: 5 },
				  { name: "Thomas", id: 6 },
				  { name: "John", id: 7 }
				],
				controlOnStart: true
			}
		},
		methods:{
			start({ originalEvent }) {
			  this.controlOnStart = originalEvent.ctrlKey;
			},
			/**
			 * 章节下的课程排序发生变化，修改课时/章节关系及课时顺序
			 * @param {Object} chapterId 章节Id
			 */
			topicListChange(chapter){
				console.log("========",chapter.id,chapter.name,"========");
				for(var i = 0; i < chapter.list.length ; i ++){
					console.log(i,chapter.id,chapter.list[i].id,chapter.list[i].title);
				}
				console.log("========END========");
			},
			/**
			 * 章节顺序发生改变，修改章节顺序
			 */
			draggableChange(){
				for(var i = 0; i < this.list.length ; i ++){
					console.log(this.list[i].id,this.list[i].name);
				}
			},
			
			handleAddChapter(){
				this.chapter.courseId = this.courseId;
				let id = this.chapter.id;
				req_saveChapter(this.chapter).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
					this.$notify.error({
					  title:'Failed',
					  message: message
					});
				  } else {
					  this.$notify.success({
						title:'Success',
					    message: id==0?"添加成功":"修改成功"
					  });
					this.getList();
				  }
				});
			},
			handleDeleteChapter(id){
				console.log(id);
			},
			getTopicList(){
				req_getTopicList(this.courseId).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$notify.warning({
					  title:'warning',
				      message: message
				    });
				  } else {
				    this.list = data;
				  }
				});
			},
			handleAddTopic(){
				this.$router.push({ path: '/TopicEdit', query: { courseId: this.courseId }});
			}
		},mounted(){
			this.courseId  = this.$route.query.courseId;
			console.log("courseId",this.courseId);
			this.getTopicList();
			
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

<style>
</style>

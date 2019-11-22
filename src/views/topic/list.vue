<!-- 课时列表 -->
<template>
	<div class="padding10">
		<div class="alignCenter font18">{{courseTitle}}</div>
		<div class="margin10-0">
			<el-link @click="handleGoCourseList()" icon="el-icon-back">返回课程</el-link>
		</div>
		
		<el-row>
			<!-- 课时列表 -->
			<el-col :span="12">
				<el-button type="primary" @click="handleAddTopic()">添加课时</el-button>
				<!-- 课时列表，可拖动排序 -->
				<div class=" width50 font-bold font18 ColorInfo margin10-0 border-2-info">课时列表，可拖动排序</div>
				<div v-for="chapter in list" :key="chapter.name">
					<div class="font18 ColorMain">{{chapter.name}}</div>
					<draggable
						group="chapter"
					    v-model="chapter.list"
					    @change="topicListChange(chapter)"
						@start="start">
								<el-row class="margin5-0"  v-for="topic in chapter.list" :key="topic.title">
									<el-col :span="16" :offset="1">
										<span class="cursorPointer font16 ColorCommon" @click="handleGoTopicInfo(topic.id)">{{topic.title}}</span>
									</el-col>
									<el-col :span="4">
										<el-button size="mini" type="primary" icon="el-icon-edit" 
											circle @click="handleEditTopic(topic.id)"></el-button>
										<!-- topic.v_delete 为虚拟字段，仅在页面用来控制 el-popover 组件的显示 -->
										<el-popover
										  placement="top"
										  width="160" v-model="topic.v_delete">
										  <p>确定删除该课时吗？此操作不可恢复</p>
										  <div style="text-align: right; margin: 0">
											<el-button size="mini" type="text" @click="topic.v_delete = false">取消</el-button>
											<el-button type="danger" size="mini" @click="topic.v_delete = false;handleDeleteTopic(topic.id)">删除</el-button>
										  </div>
										  <el-button slot="reference" size="mini" type="danger" icon="el-icon-delete" 
										  	circle ref="b"></el-button>
										</el-popover>
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
							<el-row class="margin5-0"  v-for="item in list" :key="item.id">
								<el-col :span="18">
									<el-input class="width80" v-model="item.name" 
										v-if="chapterEditer.editing && chapterEditer.current === item.id"></el-input>
									<span class="cursorPointer font18 ColorCommon" 
										v-else>
										{{item.name}}
									</span>
									
								</el-col>
								<el-col :span="6">
									<el-button size="mini" type="success" icon="el-icon-check" 
										circle v-if="chapterEditer.editing && chapterEditer.current === item.id"
										@click="handleEditedChapter(item)"></el-button>
									<el-button size="mini" type="primary" icon="el-icon-edit" 
										circle v-else
										@click="handleEditChapter(item.id)"></el-button>
										
										<!-- item.v_delete 为虚拟字段，仅在页面用来控制 el-popover 组件的显示 -->
										<el-popover
										  placement="top"
										  width="160" v-model="item.v_delete">
										  <p>确定删除该章节吗？请确保该章节下没有课时</p>
										  <div style="text-align: right; margin: 0">
											<el-button size="mini" type="text" @click="item.v_delete = false">取消</el-button>
											<el-button type="danger" size="mini" @click="item.v_delete = false;handleDeleteChapter(item.id)">删除</el-button>
										  </div>
										  <el-button slot="reference" size="mini" type="danger" icon="el-icon-delete" 
										  	circle ref="b"></el-button>
										</el-popover>
									
								</el-col>
							</el-row>
				</draggable>
			</el-col>
		</el-row>
		
		  
		
	</div>
</template>

<script>
	import draggable from 'vuedraggable';
	import {req_saveChapter,req_getTopicList,req_updateTopic,req_updateChapter,req_deleteChapter,req_deleteTopic} from "../../api/api.js";
	export default{
		components:{draggable},
		data(){
			return{
				courseId:0,
				courseTitle:'',
				list:[],
				chapter:{
					id:0,
					courseId:0,
					name:"",
					sort:0
				},
				chapterEditer:{
					//编辑状态
					editing:false,
					//删除状态
					deleting:false,
					//当前操作的章节
					current:0
				}
			}
		},
		methods:{
			/**
			 * 返回课程列表
			 */
			handleGoCourseList(){
				this.$router.push("/CourseList");
			},
			handleGoTopicInfo(topicId){
				console.log("handleGoTopicInfo");
				this.$router.push({ path: '/Topic', query: { id:topicId,courseId: this.courseId,courseTitle:this.courseTitle}});
			},
			handleAddTopic(){
				this.$router.push({ path: '/TopicEdit', query: { courseId: this.courseId }});
			},
			handleEditTopic(topicId){
				this.$router.push({ path: '/TopicEdit', query: { courseId: this.courseId ,id:topicId}});
			},
			handleDeleteTopic(topicId){
				console.log("handleDeleteTopic",topicId);
				req_deleteTopic(topicId).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
					this.$notify.error({
					  title:'Failed',
					  message: message
					});
				  }else{
					  this.$notify.success({
					    title:'Success',
					    message: "课时已删除"
					  });
					  this.getTopicList();
				  } 
				});
			},
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
					this.updateTopic(chapter.list[i].id,chapter.id,i);
					console.log("id:",chapter.list[i].id ,"chapterId:",chapter.id,"sort:",i,"title:",chapter.list[i].title);
				}
				console.log("========END========");
			},
			/**
			 * 修改课时的排序
			 * @param {Object} id
			 * @param {Object} chapterId
			 * @param {Object} sort
			 */
			updateTopic(id,chapterId,sort){
				req_updateTopic(id,chapterId,sort).then(response => {
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
			 * 章节顺序发生改变，修改章节顺序
			 */
			draggableChange(){
				for(var i = 0; i < this.list.length ; i ++){
					console.log(this.list[i].id,this.list[i].name);
					this.updateChapter(this.list[i].id,i,this.list[i].name);
				}
			},
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
			 * 添加章节
			 */
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
					this.getTopicList();
				  }
				});
			},
			/**
			 * 开始修改章节，去掉<span>节点，替换为<input>
			 * @param {Object} id
			 */
			handleEditChapter(id){
				this.chapterEditer.editing = true;
				this.chapterEditer.current = id;
			},
			handleEditedChapter(chapter){
				this.chapterEditer.editing = false;
				this.chapterEditer.current = 0;
				this.updateChapter(chapter.id,chapter.sort,chapter.name);
			},
			handleDeleteChapter(id){
				console.log(id);
				req_deleteChapter(id).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$notify.error({
					  title:'warning',
				      message: message
				    });
				  } else {
					  this.$notify.success({
					    title:'Success',
					    message: "章节已删除"
					  });
				    this.getTopicList();
				  }
				});
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
			}
			
		},mounted(){
			this.courseId  = this.$route.query.courseId;
			this.courseTitle = this.$route.query.courseTitle;
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

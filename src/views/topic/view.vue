<!-- 课时详情 -->
<template>
	<div>
		<el-row>
			<el-col :span="6">
				<el-row>
					<el-col :span="4">
						<!-- 左侧导航 -->
						<div class="left-menu alignCenter"  :style="'height:' + menu.height  + 'px;'">
							<div  v-for="item in menu.items" @click="handMenuClick(item.index)" :key="item.index">
								<div  class="padding10 cursorPointer  "
								:class="{'left-menu-active':menu.active == item.index}"  >
									<i class="font24" :class="item.icon"></i>
									<div>{{item.title}}</div>
								</div>
							</div>
						</div>
					</el-col>
					<el-col :span="20" class="padding10">
						<div class="alignCenter font20 font-bold ColorCommon border-2-info margin10-0">深度学习与自然语言处理</div>
						<!-- 课程目录 -->
						<div v-if="menu.active == 0">
							<TopicList @func="handleGetTopic" ref="topicList"></TopicList>
						</div>
						<div v-if="menu.active == 1">
							问答
						</div>
						<div v-if="menu.active == 2">
							笔记
						</div>
						<div v-if="menu.active == 3">
							资料
						</div>
					</el-col>
				</el-row>
			</el-col>
			<!-- 右侧内容 -->
			<el-col :span="18" class="BgColorCommon padding10">
				<div class="alignCenter font18 font-bold ColorCommon margin10-0">{{topicInfo.title}}</div>
				<video class="width100" :src="topicInfo.videoUrl" controls v-if="topicInfo.videoUrl"></video>
				<div class="ColorMain" v-html="topicInfo.content" v-else></div>
				<div class="margin10-0">
					<el-button type="primary" round>下一课</el-button>
					<el-button type="primary" round>学过了</el-button>
				</div>
				
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import $ from 'jquery';
	import {req_getTopicInfo} from "../../api/api.js";
	import TopicList from "../../components/course/TopicList.vue";
	var Base64 = require('js-base64').Base64;
	export default {
		components:{TopicList},
		data() {
			return {
				//课程id
				courseId:0,
				topicId:0,
				topicInfo:{},
				//菜单
				menu:{
					//菜单栏高度
					height:400,
					//当前选中的菜单
					active:0,
					//菜单选项
					items:[
						{index:0,icon:"el-icon-location",title:"目录"},
						{index:1,icon:"el-icon-menu",title:"问答"},
						{index:2,icon:"el-icon-document",title:"笔记"},
						{index:3,icon:"el-icon-setting",title:"资料"}
					]
				},
				//问答
				questions:{
					got:false,
					data:[]
				},
				//学习笔记
				notes:{
					got:false,
					data:""
				},
				//学习资料
				documents:{
					got:false,
					data:[]
				}
				
			}
		},
		methods: {
			handleGetTopic(topicId){
				if(topicId != this.topicId){
					this.getTopicInfo(topicId);
				}
			},
			getTopicInfo(topicId){
				req_getTopicInfo(topicId).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$notify.warning({
					  title:'warning',
				      message: message
				    });
				  } else {
				    this.topicInfo = data;
					this.topicId = this.topicInfo.id;
					this.topicInfo.content = Base64.decode(data.content);
					this.getTopicList();
				  }
				});
			},
			/**
			 * 菜单栏点击事件
			 * @param {Object} index
			 */
			handMenuClick(index){
				this.menu.active = index;
				switch(index){
					case(0):;break;
					case(1):this.getQuestions();break;
					case(2):this.getNotes();break;
					default:this.getDocuments();
					
				}
			},
			/**
			 * 获取课程列表
			 */
			getTopicList(){
				this.$refs.topicList.load(this.topicId,this.courseId);
			},
			/**
			 * 获取问答列表
			 */
			getQuestions(){
				if(this.questions.got){
					return;
				}
				this.questions.got = true;
				console.log("do getQuestions");
			},
			/**
			 * 获取学习资料
			 */
			getDocuments(){
				if(this.documents.got){
					return;
				}
				this.documents.got = true;
				console.log("do getDocuments");
			},
			/**
			 * 获取学习笔记
			 */
			getNotes(){
				if(this.notes.got){
					return;
				}
				this.notes.got = true;
				console.log("do getNotes");
			},
			/**
			 * 左侧菜单栏 select 事件的回调
			 * @param {Object} key
			 * @param {Object} keyPath
			 */
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		},
		mounted() {
			this.menu.height = $(window).height();
			let that = this;
			window.onresize = function () {
				that.menu.height = $(window).height();
			}
			
			if(this.$route.query.id){
				this.topicId  = this.$route.query.id;
				this.getTopicInfo(this.topicId);
			}
			if(this.$route.query.courseId){
				this.courseId  = this.$route.query.courseId;
				
			}
			console.log("topicId:",this.topicId,"courseId:",this.courseId);
			this.getTopicList();
			
		}
	}

</script>
<style scoped lang="scss">
	.left-menu {
		background-color:#545c64;
		color:#fff;	
	}
	.left-menu :hover{
		color:#ffd04b;
	}
	.left-menu-active{
		color:#ffd04b;
	}	
	
</style>

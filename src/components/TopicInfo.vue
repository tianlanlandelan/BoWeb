<template>
	<div>
		<!--展示文字内容-->
		<div v-show="topic.videoUrl == ''">
			<div class="font24 ColorMain">{{topic.title}}</div>
			<div class="font16 ColorMain lineHeight marginTop" v-html="topic.content"></div>
			<div class="alignRight">
				<el-button type="primary" @click="getNext()" v-show="topic.status != 2">Got it!</el-button>
			</div>
		</div>
		<!--展示视频-->
		<div v-show="topic.videoUrl">
			<div class="font24 ColorMain">{{topic.videoTitle}}</div>
			<!-- <video :src="topic.videoUrl" controls="controls" @play="onPlay()"></video> -->
			<iframe src="https://onedrive.live.com/embed?cid=EFF3B846380AF0CE&resid=EFF3B846380AF0CE%211163&authkey=ADrVFdTbhHtSp7Q&em=2" width="802" height="627" frameborder="0" scrolling="no"></iframe>
			
			<!--按钮，点击按钮开始答题-->
			<div class="alignRight">
				<!-- <el-button type="primary" :disabled="gotItDisabled" @click="getNext()">Got it!</el-button> -->
				<el-button type="primary"  @click="father()">Got it!</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			topic:{}
		},
		data() {
			return {
				//gotIt按钮是否禁用，默认禁用，观看视频2分钟后启用
				gotItDisabled:true,
				reWidth:0
			}
		},
		methods: {
			father(){
				this.$emit('topicFun',"TopicInfo");
			},
			/**
			 * 要求观看视频至少2分钟后，才能答题
			 * 在用户开始播放视频时计时开始
			 * 在调用setTimeout时要注意，不要在函数里用this调用data的数据，函数里的this不是页面的this
			 */
			onPlay(){
				let that = this;
				console.log("onPlay");
				setTimeout(function(){
					that.gotItDisabled = false;
					console.log("gotItDisabled",that.gotItDisabled);
				//在测试时，先设置为3秒，实际改成3000 * 60 * 2 就是2分钟
				},3000);
			}
		},
		mounted() {
			
		}
	}

</script>
<style scoped lang="scss">
	@import '~scss_vars';	
	video{
		width: 100%;
	}
</style>

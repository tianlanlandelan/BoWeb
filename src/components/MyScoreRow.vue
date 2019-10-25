<!--排行榜上自己排名的显示-->
<template>
    <div class = "me-bg">
    	<el-row class = "me-margin" :style="{width: score.percentage + '%'}"></el-row>
    	<!--自己的成绩-->
    	<el-row class = "me-row">
    		<el-col :span="2">
    			<span v-if="showScore">{{score.sort}}</span>
    			<span v-else>&nbsp;</span>
    		</el-col>
    		<el-col :span="4">
    			<img :src="'../../static/icon/' + score.avatarId + '.png'" /> 
    		</el-col>
    		<el-col :span="15">
    			You
    		</el-col>
    		<el-col :span="3" class="center">
    			<span v-if="showScore">{{score.score}}</span>
    			<span v-else>&nbsp;</span>
    		</el-col>
    	</el-row>
    </div>
</template>

<script>
    export default{
		props:{
			score:{},
			/**
			 * 是否显示排名和得分
			 */
			showScore:true
		},
		data(){
			return{
				
			}
		},
		methods:{
			
		},mounted(){
			console.log("MyScoreRow");
		}
	}
</script>

<style>
	.me-bg{
		margin:5px 10px;
		background-color: #EBEEF5;
		border-radius: 10px;
	}
	.me-margin{
		background-color: #DCDFE6;
		height: 50px;
		opacity:0.9;
		border-radius: 10px;
	}
	.me-row{
		padding:5px 10px;
		height: 50px;
		margin-top:-50px;
		font-size: 24px;
		line-height: 40px;
		color:#303133;
	}
	.me-row img{
		width: 40px;
		border-radius: 20px;
	}
</style>



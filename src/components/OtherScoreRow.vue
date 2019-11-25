<!--排行榜上的每一行排名显示-->
<template>
    <div>
        <!--排行的遮罩层-->
        <el-row class = "popover-margin" ></el-row>
        <!--排行数据-->
        <el-row class = "popover-row">
			<!--名次-->
        	<el-col :span="2">
        		&nbsp;
        	</el-col>
			<!--头像-->
        	<el-col :span="4">
        		<img src="../../static/icon/0.png" /> 
        	</el-col>
			<!--名称-->
        	<el-col :span="16">
        		&nbsp;
        	</el-col>
			<!--得分-->
        	<el-col :span="2">
        		&nbsp;
        	</el-col>
        </el-row>
        
    </div>
</template>

<script>
    export default{
		data(){
			return{
				
			}
		},
		methods:{
			
		},mounted(){
			
		}
	}
</script>

<style scoped>
	.popover-row{
		padding:5px 20px;
		height: 40px;
		margin-top:-40px;
	}
	.popover-row img{
		width: 30px;
		border-radius: 15px;
	}
	.popover-margin{
		background-color: #67C23A;
		height: 40px;
		opacity:0.5;
		border-radius: 10px;
		width: 0;
	}

</style>



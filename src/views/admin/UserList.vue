<!-- 概览 -->
<template>
    <div>
        <div class = "mytitle">
        	概览
        </div>
        <el-form  label-width="120px">
          <el-form-item label="用户总数">
        	<el-tag>{{count}}</el-tag>
          </el-form-item>
        </el-form>
        
		<div class = "mytitle">
			Top20
		</div>
		<el-table stripe  :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
		  <el-table-column label="排名" prop="sort"></el-table-column>
		  <el-table-column label="uid" prop="sid"></el-table-column>
		  <el-table-column label="uemail" prop="email"></el-table-column>
		  <el-table-column label="firstName"  prop="firstName"></el-table-column>
		  <el-table-column label="lastName" prop="lastName" ></el-table-column>
		  <el-table-column label="用户来源" prop="type">
		  	<template slot-scope="scope">
		  		LeaderBoard{{scope.row.type}}
		  	</template>  
		  </el-table-column>
		  <el-table-column label="总分" prop="score"> </el-table-column>
		</el-table>
    </div>
</template>

<script>
	import {req_admin_getUserCount,
		req_admin_getLeaderBoardTop20} from "../../api/api.js";
    export default{
		data(){
			return{
				count:0,
				list:[]
			}
		},
		methods:{
			getCount(){
				req_admin_getUserCount().then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
				    this.count = data;
				  }
				});
			},
			getTop20(){
				req_admin_getLeaderBoardTop20().then(response => {
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
				  }
				});
			}
		},mounted(){
			this.getTop20();
			this.getCount();
		}
	}
</script>

<style>
	.mytitle{
		font-size: 16px;
		background-color: #dbdfe6;
		margin: 20px 0;
		padding: 10px;
	}
</style>



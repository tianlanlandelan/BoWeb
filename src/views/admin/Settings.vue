<!-- 管理员设置页面 -->
<template>
    <div>
		<div class = "mytitle">
			邀请码设置
		</div>
		<el-form  label-width="120px">
		  <el-form-item label="邀请码" v-show="!show">
			<el-tag class="mycode" @click="showSetCode">{{code}}</el-tag>
		  </el-form-item>
		  <el-form-item label="设置邀请码" v-show="show">
			<el-input v-model="code"></el-input>
		  </el-form-item>
		  <el-form-item label="确认设置" v-show="show">
			<el-button type="primary" @click= "setCode">设置</el-button>
		  </el-form-item>
		</el-form>
		<br>
		
		<div class = "mytitle">
			删除用户
		</div>
		<el-form :inline="true" label-width="120px" >
		  <el-form-item label="uemail">
			<el-input v-model="email"></el-input>
		  </el-form-item>
		  <el-form-item >
			<el-button type="primary" @click= "getByEmail">查询</el-button>
		  </el-form-item>
		</el-form>
		<el-table  :data="delList" element-loading-text="拼命加载中" border fit highlight-current-row>
		  <el-table-column label="uid" prop="sid"></el-table-column>
		  <el-table-column label="uemail" prop="email"></el-table-column>
		  <el-table-column label="用户来源" prop="type">
				<template slot-scope="scope">
					LeaderBoard{{scope.row.type}}
				</template>  
		  </el-table-column>
		  <el-table-column label="firstName"  prop="firstName"></el-table-column>
		  <el-table-column label="lastName" prop="lastName" ></el-table-column>
		 <el-table-column label="删除">
		   <template slot-scope="scope">
		 		<el-button type="danger" icon="el-icon-delete" @click="delUser(scope.row.id)"></el-button> 
		   </template>
		 </el-table-column>
		</el-table>
		
		
		<br>
		<div class = "mytitle">
			忘记密码的用户
		</div>
		
		<el-table  :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
		  <el-table-column label="uid" prop="sid"></el-table-column>
		  <el-table-column label="uemail" prop="email"></el-table-column>
		  <el-table-column label="用户来源" prop="type">
				<template slot-scope="scope">
					LeaderBoard{{scope.row.type}}
				</template>  
		  </el-table-column>
		  <el-table-column label="firstName"  prop="firstName"></el-table-column>
		  <el-table-column label="lastName" prop="lastName" ></el-table-column>
		 <el-table-column label="重置密码">
		   <template slot-scope="scope">
		 			 <el-row>
		 				 <el-col :span="12">
		 					 <el-input v-model="scope.row.code"></el-input>
		 				 </el-col>
		 				 <el-col :span="12">
		 				 	<el-button type="primary" @click="reSet(scope.row.id,scope.row.code)">重置</el-button>			 
		 				 </el-col>
		 			 </el-row>
		   </template>
		 </el-table-column>
		</el-table>
		
    </div>
</template>

<script>
	import {req_admin_setInviteCode,
		req_admin_getInviteCode,
		req_admin_getFotPasswordUser,
		req_admin_resetPassword,
		req_admin_getByEmail,
		req_admin_deleteUser
		} from "../../api/api.js";
	
    export default{
		data(){
			return{
				code:"",
				email:"",
				show:false,
				list:[],
				delList:[]
			}
		},
		methods:{
			showSetCode(){
				this.show = true;
			}
			,getCode(){
				req_admin_getInviteCode().then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
				    this.code = data;
				  }
				});
			}
			,setCode(){
				req_admin_setInviteCode(this.code).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
				    this.show = false;
				  }
				});
			},
			/**
			 * 获取忘记密码的用户
			 */
			getUser(){
				req_admin_getFotPasswordUser().then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.list = [];
				  } else {
				    this.list = data;
				  }
				});
			},
			/**
			 * 重置用户密码
			 * @param {Object} id
			 * @param {Object} password
			 */
			reSet(id,password){
				console.log(id,password);
				req_admin_resetPassword(id,password).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
				    this.getUser();
				  }
				});
				
			},
			getByEmail(){
				req_admin_getByEmail(this.email).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.delList = [];
				  } else {
				    this.delList = data;
				  }
				});
			},
			delUser(id){
				req_admin_deleteUser(id).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$message({
				      message: message,
				      type: 'error'
				    });
				  } else {
				    this.$notify({
						title: '删除成功', 
						message: '',
						type: 'success'
				    });
					this.getByEmail();
				  }
				});
			}
		},mounted(){
			this.getCode();
			this.getUser();
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
	.mycode{
		cursor:pointer;
	}
</style>



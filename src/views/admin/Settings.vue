<!-- 管理员设置页面 -->
<template>
    <div>
		<el-form  label-width="120px">
		  <el-form-item label="邀请码" v-show="!show">
			<el-tag @click="showSetCode">{{code}}</el-tag>
		  </el-form-item>
		  <el-form-item label="设置邀请码" v-show="show">
			<el-input v-model="code"></el-input>
		  </el-form-item>
		  <el-form-item label="确认设置" v-show="show">
			<el-button type="primary" @click= "setCode">设置</el-button>
		  </el-form-item>
		</el-form>
		
    </div>
</template>

<script>
	import {req_admin_setInviteCode,req_admin_getInviteCode} from "../../api/api.js";
	
    export default{
		data(){
			return{
				code:"",
				show:false
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
			}
		},mounted(){
			this.getCode();
		}
	}
</script>

<style>
</style>



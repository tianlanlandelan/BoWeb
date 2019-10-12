<template>
  <el-row>
    <el-form label-position="left" 
		label-width="0px" class="demo-ruleForm login-container">
		  <h3 class="title">Reset Password</h3>
		    
		    <el-form-item>
				<!-- 用户名输入框 -->
				<span class="tip">Umail </span>
				<span class="Danger" v-show="!user.emailChecked"> ( please enter your umail )</span>
				<el-input type="text" v-model="user.email" auto-complete="off" 
					placeholder="u1145615@YourUniversity.edu" @blur="user.checkEmail()"></el-input>
		    </el-form-item>
		    <!-- 登录按钮 -->
		    <el-form-item style="width:100%;">
		      <el-button type="primary" style="width:100%;" @click.native.prevent="commit()" :loading="logining">Commit</el-button>
		    </el-form-item>
		  </el-form> 
  </el-row>
</template>

<script>
  import { req_forgetPassword } from '../api/api';
  import {user} from "../data.js";
  export default {
    data() {
      return {
        //登录用户数据
        user: user,
        //登录按钮是否显示加载动画
        logining: false
      };
    },
    methods: {
      //提交修改密码的申请
      commit() {
        //验证表单内容是否符合规则
          if (this.user.checkEmail()) {
            //显示加载动画
            this.logining = true;
            //调用登录接口，上传用户名和密码
            req_forgetPassword(this.user).then(response => {
              console.log("登录完毕，Response:",response);
              this.logining = false;
              //解析接口应答的json串
              let { data, message, success } = response;
              //应答不成功，提示错误信息
              if (success !== 0) {
                this.$message({
                  message: message,
                  type: 'error'
                });
              //应答成功，将用户信息缓存起来。跳转到默认页面
              } else {
                this.$message({
                  message: data,
                  type: 'success'
                });
              }
            });
          }
      }
    },mounted(){
		//获取用户类型
		let type = sessionStorage.getItem('type');
		let path = sessionStorage.getItem('path');
		//如果不是从登录页面进来的，不能确定用户类型，此时，返回到错误页面
		if(!type || !path){
			this.$router.push({ path: "/404"});
		}else{
			this.user.type = type;
			this.path = path;
			console.log("password,type:",type,path);
		}
	}
  }

</script>

<style lang="scss" scoped>
	html{
		font-size: 16px;
	}
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 500px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login-container .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .login-container .remember {
      margin: 0px 0px 35px 0px;
    }
  
  .sm-login-form {
	font-size: 4rem;
    border-radius: 5px;
    background-clip: padding-box;
    width: 100%;
	margin-top:200px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .sm-login-form .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
	font-size: 4rem;
  }
  .sm-login-form .title img{
	  width: 50%;
	  height: 4rem;
  }
  .sm-login-form .input{
  	  width: 70%;
  	  border: none;
	
	  font-size: 4rem;
  }
  
  .sm-login-form .input:focus{
    outline: 0;
	border: none;
}
  .sm-login-form .remember {
    margin: 0px 0px 35px 0px;
  }
  .sm-div{
	  border-bottom: 4px solid #cac6c6;
	  padding: 1rem;
	  
  }
  .sm-div:hover{
  	  border-bottom: 4px solid #66afe9;

  }
  .sm-font{
	 font-size: 4rem; 
  }
</style>
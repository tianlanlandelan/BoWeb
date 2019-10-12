<template>
  <el-row>
    <el-form label-position="left" 
		label-width="0px" class="demo-ruleForm login-container"
		>
		  <h3 class="title">Log in</h3>
		    
		    <el-form-item>
				<!-- 用户名输入框 -->
				<span class="tip">Umail </span>
				<span class="Danger" v-show="isShow.email"> ( please enter your umail )</span>
				<el-input type="text" v-model="user.email" auto-complete="off" 
					placeholder="u1145615@YourUniversity.edu" @blur="checkUserName()"></el-input>
		    
				<!-- 密码输入框 -->
				<span class="tip">Password </span>
				<span class="Danger" v-show="isShow.password"> ( please enter your password )</span>
				<el-input type="password" v-model="user.password" auto-complete="off" 
					placeholder="password" @blur="checkPassword()"></el-input>
		    </el-form-item>
		    <!-- 忘记密码和新用户注册按钮 -->
		    <el-form-item>
		      <el-col :span="12">
		        <el-button type="text" @click="showRegister">Forgot password ?</el-button>
		      </el-col>
		      <el-col :span="12">
		        <el-button type="text" @click="showRegister">New user signup</el-button>
		      </el-col>
		    </el-form-item>
		    <!-- 登录按钮 -->
		    <el-form-item style="width:100%;">
		      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogon" :loading="logining">LOG IN</el-button>
		    </el-form-item>
		  </el-form> 
  </el-row>
</template>

<script>
  import { req_logon } from '../api/api';
  import {user} from "../data.js";
  export default {
    data() {
      return {
        //登录用户数据
        user: user,
		isShow:{
			email:false,
			password:false
		},
        //登录按钮是否显示加载动画
        logining: false
      };
    },
    methods: {
      //登录操作
      handleLogon(ev) {
        //验证表单内容是否符合规则
        
          if (this.checkPassword() && this.checkUserName()) {
            //显示加载动画
            this.logining = true;
            //调用登录接口，上传用户名和密码
            req_logon(this.user).then(response => {
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
                this.user = data;
                sessionStorage.setItem('user', JSON.stringify(this.user));
                this.$router.push({ path: '/Home' });
              }
            });
          } 
      },
      showRegister(){
        console.log('showRegister');
        this.$router.push('/Register');
      },
	  checkUserName(){
	  		   if(this.user.email == "" || !this.user.email.endsWith("edu") || this.user.email.indexOf("@") < 0 ){
	  		   		this.isShow.email = true;
	  				return false;
	  		   }else{
	  		   		this.isShow.email = false;
	  				return true;
	  		   }
	  },
	  checkPassword(){
	  		   if(this.user.password == "" || this.user.password.length < 6){
	  		   		this.isShow.password = true;
	  				return false;
	  		   }else{
	  				this.isShow.password = false;
	  				return true;
	  		   }
	  }
    },mounted(){
		let type = this.$route.params.type;
		console.log("router",this.$route.path);
		this.user.type = type;
		sessionStorage.setItem('type', type);
		sessionStorage.setItem('path',this.$route.path);
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
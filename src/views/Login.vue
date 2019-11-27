<template>
  <el-row>
    <el-form label-position="left" 
		label-width="0px" class="demo-ruleForm login-container"
		>
		  <h3 class="title">kyleNotes 登录</h3>
		    
		    <el-form-item>
				<!-- 用户名输入框 -->
				<span class="tip">邮箱 </span>
				<span class="ColorDanger" v-show="!user.emailChecked"> ( 请输入正确的邮箱地址 )</span>
				<el-input type="text"  autofocus="autofocus" v-model="user.email" auto-complete="off" 
					placeholder="kyleNotes@foxmail.com" @blur="user.checkEmail()"></el-input>
		    
				<!-- 密码输入框 -->
				<span class="tip">密码 </span>
				<span class="ColorDanger" v-show="!user.passChecked"> ( 请输入密码 )</span>
				<el-input type="password" v-model="user.password" auto-complete="off" 
					placeholder="6到12位,英文字符和数字的组合" @blur="user.checkPassword()"></el-input>
		    </el-form-item>
		    <!-- 忘记密码和新用户注册按钮 Admin登录页面不显示-->
		    <el-form-item v-if="!admin">
		      <el-col :span="12">
		        <el-button type="text" @click="showPassword">忘记密码 ？</el-button>
		      </el-col>
		      <el-col :span="12">
		        <el-button type="text" @click="showRegister">注册账号</el-button>
		      </el-col>
		    </el-form-item>
		    <!-- 登录按钮 -->
		    <el-form-item style="width:100%;">
		      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogon" :loading="logining">登录</el-button>
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
        //登录按钮是否显示加载动画
        logining: false,
		admin:false
      };
    },
    methods: {
      //登录操作
      handleLogon(ev) {
        //验证表单内容是否符合规则
          if (this.user.checkPassword() && this.user.checkEmail()) {
            //显示加载动画
            this.logining = true;
            //调用登录接口，上传用户名和密码
            req_logon(this.user).then(response => {
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
				//如果是管理员，在Session中记录,跳转到管理员页面
				if(this.admin){
					sessionStorage.setItem('admin', "admin");
					this.$router.push({ path: '/SroceList' });
				}else{
					sessionStorage.setItem('user', JSON.stringify(this.user));
					this.$router.push({ path: '/Home' });
				}
              
              }
            });
          } 
      },
      showRegister(){
        console.log('showRegister');
        this.$router.push({path:'/Register',query:{type:this.user.type}});
      },
	  showPassword(){
	    console.log('showPassword');
	    this.$router.push('/Password');
	  }
    },mounted(){
		//每次访问登录页面，先清空session
		sessionStorage.removeItem('user');
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
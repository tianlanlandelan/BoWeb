<template>
<el-row>
  <!-- 注册界面 -->
  <el-form  
	label-position="left" 
	label-width="0px" 
	class="demo-ruleForm login-container">
    
    <!-- 第一步-->
    <el-row v-show="showStep1">
		<h3 class="title">Welcome to New User Signup</h3>
		<el-form-item>
			<!--学号输入框-->
			<span class="tip">Sign up with your UNID </span>
			<span class="Danger" v-show="!user.sidChecked"> (please enter your 8-digit UNID starting with “u”)</span>
			<el-input type="text" v-model="user.sid"  placeholder="u1145615" @blur="user.checkSid()"></el-input>
		  
			<!--学校邮箱输入框-->
			<span class="tip">Sign up with your umail </span>
			<span class="Danger" v-show="!user.emailChecked"> (please enter a valid umail)</span>
			<el-input type="text" v-model="user.email" placeholder="u1145615@YourUniversity.edu" @blur="user.checkEmail()"></el-input>
			
			<!--密码输入框-->
			 <span class="tip">Set Password</span>
			 <span class="Danger" v-show="!user.passChecked"> (please use 6 or more characters)</span>
			 <el-input type="password" v-model="user.password" placeholder="Set Password" @blur="user.checkPassword()"></el-input>
			 <!-- 邀请码，必填 -->
			 <span class="tip">Invitation Code</span>
			 <span class="Danger" v-show="!user.codeChecked"> (please enter invitation code)</span>
			 <el-input type="text" v-model="user.code" placeholder="Invitation Code" @blur="user.checkCode()"></el-input>
		</el-form-item>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary"  style="width:100%;" @click="handleRegister">Next</el-button>
      </el-form-item>
    </el-row>
    <!-- 第二步-->
    <!-- <el-row v-show="showStep2">
      <el-form-item prop="code">
        <el-input type="text" v-model="user.code" placeholder="Input Verification Code"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary"  style="width:100%;" @click="handleRegister">Submit</el-button>
      </el-form-item>
    </el-row> -->
    <!-- 第三步-->
    <el-row v-show="showStep2">
		<h3 class="title">Let's complete your account</h3>
		<el-form-item >
			<span class="tip">First Name </span>
		  <el-input type="text" v-model="user.firstName" placeholder="Michael " @blur="user.checkUserName()"></el-input>
			<span class="tip">Last Name </span>
		  <el-input type="text" v-model="user.lastName" placeholder="Jordan " @blur="user.checkUserName()"></el-input>
		</el-form-item>
		<el-form-item style="width:100%;">
		  <el-row >
			  <el-col :span="12">
				  <el-row>
					<el-button type="primary" style="width:100%;"  v-popover:popover @click="handleSelect">Select an avatar</el-button>  
					</el-row>
				  <el-row class="margin" v-show="showSelected">
					  <el-button type="primary"  style="width:100%;" @click="handleSubmit" :disabled="!user.nameChecked || user.avatarId == 0">Complete sign up</el-button>
				  </el-row>
				  
			  </el-col>
		  	   <el-col class="center" :span="12" v-show="showSelected">
					<img width="100px" :src="'../../static/icon/' + user.avatarId + '.png'"/>
		  	   </el-col>
		  </el-row>
		  
		</el-form-item>
		<el-popover
		  ref="popover"
		  placement="bottom-start"
		  width="400"
		  trigger="click"
		  :value=showIcon
		  >
		  <el-row class="popover">
			  <el-col class="icon_col center" :span="4" v-for="i in 12" :key = "i">
				  <img width="90%" :src="'../../static/icon/' + i + '.png'" @click="handleSelectIcon(i)" />
			  </el-col>
		  </el-row>
		</el-popover>
    </el-row>  
  </el-form>
</el-row>
</template>

<script>
	import {req_register,req_updateUserInfo} from '../api/api';
	import {user} from "../data.js";
  export default {
    data() {
      return {
		  showIcon:true,
		  showSelected:false,
        //注册用户数据
        user: user,
		
		path:"",
        //注册界面步骤条当前步骤Index
        stepsActive:0,
        showStep1:true,
        showStep2:false,
        showStep3:false,
		dialogImageUrl: '',
		dialogVisible: false,
      };
    },
    methods: {
      /**
       * 发送验证码
       */
      handleSendCode(){
		this.handleStep(2);
      },
      //校验验证码
      handleRegister(){
		if(this.user.checkSid() && this.user.checkEmail() && this.user.checkPassword() && this.user.checkCode()){
			//调用注册接口
			req_register(this.user).then(response => {
			  //解析接口应答的json串
			  let { data, message, success } = response;
			  //应答不成功，提示错误信息
			  if (success !== 0) {
			    this.$message({
			      message: message,
			      type: 'error'
			    });
				this.$router.push({ path: this.path});
			  } else{
					this.user.id = data;
					this.handleStep(2);
			  }
			}).catch(response=>{
				let { data, message, success } = response;
				this.$message({
				  message: message,
				  type: 'error'
				});
			});
		}else{
			console.log("信息不全");
		}
      },
	  
      showRegister(index){
        this.showStep1 = false;
        this.showStep2 = false;
        this.showStep3 = false;
        switch (this.stepsActive)
          {
          case 0:
            this.showStep1 = true;
            break;
          case 1:
            this.showStep2 = true;
            break;
          case 2:
            this.showStep3 = true;
            break;
          }
      },
      handleStep(index){
        this.stepsActive ++;
        this.showRegister(index);  
       },
	   handleSelect(){
		   this.showIcon = true;
	   },
	   handleSelectIcon(i){
		   console.log("已选择头像",i,this.showIcon);
		   this.showIcon = false;
		   this.showSelected = true;
		   this.user.avatarId = i;
		   console.log(i,this.showIcon);
	   },
	   handleSubmit(){
		   req_updateUserInfo(this.user).then(response => {
				   //解析接口应答的json串
				   let { data, message, success } = response;
				    console.log("req_updateUserInfo success",data,message,success);
				   //应答不成功，提示错误信息
				   if (success !== 0) {
				     this.$message({
				       message: message,
				       type: 'error'
				     });
				   } else{
					   this.$router.push({ path: this.path});
				   }
				 });
	   }
    },mounted() {
		//获取用户类型
    	let type = sessionStorage.getItem('type');
		let path = sessionStorage.getItem('path');
		//如果不是从登录页面进来的，不能确定用户类型，此时，返回到错误页面
		if(!type || !path){
			this.$router.push({ path: "/404"});
		}else{
			this.user.type = type;
			this.path = path;
			console.log("register,type:",type,path);
		}
    }
  }

</script>

<style lang="scss" scoped>
	.center{
		text-align: center;
	}
	.popover{
		background-color: #F2F6FC;
		border-radius: 20px;
		padding: 10px;
	}
	.icon_col:hover{
		background-color: #009eff;
	}
	.margin{
		margin-top:20px;
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
    .title {
      margin: 0px auto 10px auto;
      text-align: center;
      color: #303133;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
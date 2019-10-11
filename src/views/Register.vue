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
			<span class="Danger" v-show="isShow.sid"> (please enter your 8-digit UNID starting with “u”)</span>
			<el-input type="text" v-model="user.sid"  placeholder="u1145615" @blur="checkSid()"></el-input>
		  
			<!--学校邮箱输入框-->
			<span class="tip">Sign up with your umail </span>
			<span class="Danger" v-show="isShow.email"> (please enter a valid umail)</span>
			<el-input type="text" v-model="user.email" placeholder="u1145615@YourUniversity.edu" @blur="checkEmail()"></el-input>
			
			<!--密码输入框-->
			 <span class="tip">Set Password</span>
			 <span class="Danger" v-show="isShow.password"> (please use 6 or more characters)</span>
			 <el-input type="password" v-model="user.password" placeholder="Set Password" @blur="checkPassword()"></el-input>
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
		  <el-input type="text" v-model="user.firstName" placeholder="Michael " @blur="blured"></el-input>
			<span class="tip">Last Name </span>
		  <el-input type="text" v-model="user.lastName" placeholder="Jordan " @blur="blured"></el-input>
		</el-form-item>
		<el-form-item style="width:100%;">
		  <el-row >
			  <el-col :span="12">
				  <el-row>
					<el-button type="primary" style="width:100%;"  v-popover:popover @click="handleSelect">Select an avatar</el-button>  
					</el-row>
				  <el-row class="margin" v-show="showSelected">
					  <el-button type="primary"  style="width:100%;" @click="handleSubmit" :disabled="isShow.noName || user.avatarId == 0">Complete sign up</el-button>
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
  export default {
    data() {
      return {
		  showIcon:true,
		  showSelected:false,
        //注册用户数据
        user: {
		  id:0,
		  type:1,
          sid: '',
          email: '',
          password: '',
		  code:'',
		  firstName:'',
		  lastName:'',
		  avatarId:0
        },
		//控制是否显示的一系列开关
		isShow:{
			sid:false,
			email:false,
			password:false,
			buttonDisable:false,
			noName:true
		},
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
		//TODO 发送验证码之前，先校验学号、邮箱是否已注册
		console.log("学号",this.user.sid,"学校邮箱",this.user.email,"密码",this.user.password);
		this.handleStep(2);
      },
      //校验验证码
      handleRegister(){
		if(this.checkSid() && this.checkEmail() && this.checkPassword()){
			//调用注册接口
			req_register(this.user).then(response => {
			  //解析接口应答的json串
			  let { data, message, success } = response;
			   console.log("登录完毕，Response:",data,message,success);
			  //应答不成功，提示错误信息
			  if (success !== 0) {
			    this.$message({
			      message: message,
			      type: 'error'
			    });
			  } else{
						   this.user.id = data;
						   this.handleStep(2);
			  }
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
					   this.$router.push({ path: '/Login' });
				   }
				 });
	   },
	   //输入框失去焦点的事件，在此时间中校验必填字段
	   blured(){
		   if(this.user.firstName == "" || this.user.lastName == ""){
			   this.isShow.noName = true;
			   console.log("No",this.user.firstName,this.user.lastName);
		   }else{
			   this.isShow.noName = false;
			   console.log("Yes",this.user.firstName,this.user.lastName);
		   }
	   },
	   checkSid(){
		   if(this.user.sid == "" || !this.user.sid.startsWith("u")){
		   		this.isShow.sid = true;
				return false;
		   }else{
		   		this.isShow.sid = false;
				return true;
		   }
	   }
	   ,
	   checkEmail(){
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
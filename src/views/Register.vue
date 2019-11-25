<template>
<el-row>
  <!-- 注册界面 -->
  <el-form  
	label-position="left" 
	label-width="0px" 
	class="demo-ruleForm login-container">
	<div class="alignCenter font24 font-bold marginBottom20">注册</div>
	
    <el-steps :active="step" finish-status="success">
	  <el-step title="验证邮箱"></el-step>
	  <el-step title="设置密码"></el-step>
	  <el-step title="完善资料"></el-step>
	</el-steps>
	<br>
    <!-- 第一步 ，输入邮箱，获取验证码-->
    <el-row v-if="step == 0">
		<el-form-item>
			<!--邮箱输入框-->
			<span class="ColorCommon font-bold">邮箱</span>
			<span class="ColorDanger" v-show="!user.emailChecked"> (请填写邮箱地址)</span>
			<el-input type="text" v-model="user.email" placeholder="kyleblog@foxmail.com" autofocus="autofocus" @blur="user.checkEmail()"></el-input>
		</el-form-item>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary"  style="width:100%;" @click="handleGetCode">获取验证码</el-button>
      </el-form-item>
    </el-row>
	
	<!-- 第二步，输入验证码，设置密码，完成注册-->
    <el-row v-if="step == 1">
      <el-form-item>
		<!-- 验证码，必填 -->
		<span class="ColorCommon font-bold">验证码</span>
		<span class="ColorDanger" v-show="!user.codeChecked"> (请填写验证码)</span>
		<el-input type="text" v-model="user.code" placeholder="6位长度的验证码" autofocus="autofocus" @blur="user.checkCode()"></el-input>
      </el-form-item>
	  <el-form-item style="width:100%;">
	    <!--密码输入框-->
		<span class="ColorCommon font-bold">密码</span>
		<span class="ColorDanger" v-show="!user.passChecked"> (请设置密码)</span>
	     <el-input type="password" v-model="user.password" placeholder="6到12位,英文字符和数字的组合" @blur="user.checkPassword()"></el-input>
	  </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary"  style="width:100%;" @click="handleRegister">注册</el-button>
      </el-form-item>
    </el-row>

    <!-- 第三步，设置昵称和头像，完善个人信息-->
    <el-row v-if="step == 2">
		<el-form-item >
			<span class="ColorCommon font-bold">设置昵称</span>
			<span class="ColorDanger" v-show="!user.nameChecked"> (请输入昵称)</span>
		  <el-input type="text" v-model="user.nickName" placeholder="kyleBlog" @blur="user.checkUserName()"></el-input>
		</el-form-item>
		<el-form-item style="width:100%;">
		  <el-row >
			  <el-col :span="12">
				  <el-row>
					  <el-popover  placement="bottom-start" width="600" trigger="click" :value="showIcon">
					    <el-row class="popover">
					  	  <el-col class="icon_col center" :span="4" v-for="i in 12" :key = "i">
					  		  <img class="img" :src="'../../static/icon/' + i + '.png'" @click="handleSelectIcon(i)" />
					  	  </el-col>
					    </el-row>
						<el-button slot="reference" type="primary" style="width:100%;"  
						 @click="handleSelect">Select an avatar</el-button>  
					  </el-popover>
					</el-row>
				  <el-row class="margin" v-show="showSelected">
					  <el-button type="primary"  style="width:100%;" @click="handleSubmit" :disabled="!user.nameChecked || user.avatarId == 0">Complete sign up</el-button>
				  </el-row>
				  
			  </el-col>
		  	   <el-col class="center" :span="12" v-show="showSelected">
					<img class="img" :src="'../../static/icon/' + user.avatarId + '.png'"/>
		  	   </el-col>
		  </el-row>
		  
		</el-form-item>
		
		
    </el-row>  
  </el-form>
</el-row>
</template>

<script>
	import {req_register,req_getCode,req_updateUserInfo} from '../api/api';
	import {config,user} from "../data.js";
  export default {
    data() {
      return {
		  showIcon:false,
		  showSelected:false,
        //注册用户数据
        user: user,
		
		path:"",
        //注册界面步骤条当前步骤Index
        stepsActive:0,
        step:0,
		dialogImageUrl: '',
		dialogVisible: false,
      };
    },
    methods: {
      /**
       * 发送验证码
       */
      handleGetCode(){
		  this.step ++;
		  // let email = this.user.email;
		  // req_getCode(config.type.register,email).then(response => {
		  //   //解析接口应答的json串
		  //   let { data, message, success } = response;
		  //   //应答不成功，提示错误信息
		  //   if (success !== 0) {
		  //     this.$message({
		  //       message: message,
		  //       type: 'error'
		  //     });
		  //   } else{
				// this.$notify.success({
				//   title:email,
				//   message: "验证码已发送到您的邮箱，请及时查收"
				// });
		 	//    this.step ++;
		  //   }
		  // });
		
      },
      //校验验证码
      handleRegister(){
		  this.step ++;
		// if(this.user.checkEmail() && this.user.checkPassword() && this.user.checkCode()){
		// 	//调用注册接口
		// 	req_register(this.user).then(response => {
		// 	  //解析接口应答的json串
		// 	  let { data, message, success } = response;
		// 	  //应答不成功，提示错误信息
		// 	  if (success !== 0) {
		// 	    this.$message({
		// 	      message: message,
		// 	      type: 'error'
		// 	    });
		// 		// this.$router.push({ path: this.path});
		// 	  } else{
		// 			this.user.id = data;
		// 			this.handleStep(2);
		// 	  }
		// 	}).catch(response=>{
		// 		let { data, message, success } = response;
		// 		this.$message({
		// 		  message: message,
		// 		  type: 'error'
		// 		});
		// 	});
		// }else{
		// 	console.log("信息不全");
		// }
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
		this.user.type  = this.$route.query.type;
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
  .img{
	  width: 100px;
	  height: 100px;
  }
</style>
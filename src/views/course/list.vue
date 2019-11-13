
<template>
    <div>
		
        <!-- <el-row v-for="course in list" :key = "course.id">
          <el-col :span="12" >
        	<h4>{{course.title}}</h4>
          </el-col>
          
        </el-row> -->
		
		<el-row v-for="course in list" :key = "course.id">
			<el-col :span="20">
				<CourseRow :course="course"></CourseRow>
			</el-col>
		</el-row>
		
    </div>
</template>

<script>
	
	import {req_getCourseList} from "../../api/api.js";
	import CourseRow from "../../components/course/row.vue"
    export default{
		data(){
			return{
				list:[]
			}
		},
		components:{CourseRow},
		methods:{
			
		},mounted(){
			req_getCourseList().then(response => {
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
	}
</script>

<style>
</style>



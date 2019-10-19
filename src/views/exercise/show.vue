
<template>
    <div>
        <el-row>
			<el-col v-html="exercise.content">
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				kj
			</el-col>
			<el-col :span="12">
				<div>{{exercise.question}}</div>
				<!-- <el-radio-group v-model="exercise.answer"> -->
					<el-row>
						<el-col :span="4">
							<el-radio label="A">A</el-radio>
						</el-col>
						<el-col :span="20" v-html="exercise.optionA">
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="4">
							<el-radio label="B">B</el-radio>
						</el-col>
						<el-col :span="20" v-html="exercise.optionB">
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="4">
							<el-radio label="C">C</el-radio>
						</el-col>
						<el-col :span="20" v-html="exercise.optionC">
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="4">
							<el-radio label="D">D</el-radio>
						</el-col>
						<el-col :span="20" v-html="exercise.optionD">
						</el-col>
					</el-row>
				<!-- </el-radio-group> -->
			</el-col>
		</el-row>
    </div>
</template>

<script>
	import {exercise,utils} from "../../data.js";
    export default{
		data(){
			return{
				exercise:exercise,
				list:[]
			}
		},
		methods:{
			
		},mounted(){
			this.exercise.init();
			this.exercise.id = utils.getParameter("id");
			
			var list = sessionStorage.getItem('exerciseList');
			if (list) {
				this.list = JSON.parse(list);
			}
			let i = 0;
			
			for(i = 0 ; i < this.list.length; i ++){
				if(this.list[i].id == this.exercise.id){
					this.exercise = this.list[i];
					console.log("exercise",this.exercise.optionA,this.exercise.optionB);
				}
			}
			
		}
	}
</script>

<style>
	.radio{
		margin: 2px;
	}
	p{
		margin: 2px;
		padding: 0;
	}
</style>



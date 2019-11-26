
<template>
    <div>
        <div class="cursorPointer" v-for="item in list" :key="item.id + item.title">
        	<el-row>
        		<el-col :span="4" >
        			<div class="font24 ColorInfo">
        				<i class="el-icon-notebook-1"></i>
        			</div>
        		</el-col>
        		<el-col :span="20">
        			<div :title="item.subTitle">{{item.title}}</div>
        			<el-row class="font12 ColorInfo">
        				<el-col :span="6">
        					<i class="el-icon-notebook-2"></i>{{item.noteNumber}}
        				</el-col>
        				<el-col :span="18" class="alignRight">
        					{{item.createTime}}
        				</el-col>
        			</el-row>
        	
        		</el-col>
        	</el-row>
        	
        </div>
    </div>
</template>

<script>
	import {format} from "../data.js";
    export default{
		data(){
			return{
				list:[]
			}
		},
		methods:{
			load(list){
				this.list = list;
				for(let i = 0 ; i < this.list.length; i ++){
					this.list[i].createTime = format.formatDate(this.list[i].createTime);
				}
			}
		},mounted(){
			
		}
	}
</script>

<style scoped>
</style>



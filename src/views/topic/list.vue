<template>
	<div>
		
	</div>
</template>

<script>
	import {req_getTopicList} from "../../api/api.js";
	export default{
		data(){
			return{
				courseId:0,
				list:[]
			}
		},
		methods:{
			
		},mounted(){
			this.courseId  = this.$route.query.courseId;
			console.log("courseId",this.courseId);
		}
	}
</script>

<style>
</style>

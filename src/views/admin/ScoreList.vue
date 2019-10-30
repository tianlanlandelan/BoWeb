<!-- 浏览、下载用户成绩 -->
<template>
    <div>
		<el-button type="primary" @click="export2Excel()"></el-button>
    </div>
</template>

<script>
	import {req_admin_getInfoByType} from "../../api/api.js";
    export default{
		data(){
			return{
				type:1,
				list:[]
			}
		},
		methods:{
			getInfo(){
				req_admin_getInfoByType(this.type).then(response => {
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
			,
			 formatJson(filterVal, jsonData) {
  　　　　return jsonData.map(v => filterVal.map(j => v[j]))
  　　},
	  export2Excel() {
	  　　　　require.ensure([], () => {
	  　　　　　　const { export_json_to_excel } = require('@/vendor/Export2Excel');
	  　　　　　　const tHeader = ['userId','uid','uemail','firstName','lastName',
							'1 Time','1.1 Score','1.1 Time','1.2 Score','1.2 Time','1.3 Score','1.3 Time',
							'2 Time','2.1 Score','2.1 Time','2.2 Score','2.2 Time','2.3 Score','2.3 Time',
							'3 Time','3.1 Score','3.1 Time','3.2 Score','3.2 Time','3.3 Score','3.3 Time',
							'4 Time','4.1 Score','4.1 Time','4.2 Score','4.2 Time','4.3 Score','4.3 Time',
							'5 Time','5.1 Score','5.1 Time','5.2 Score','5.2 Time','5.3 Score','5.3 Time',
							'6 Time','6.1 Score','6.1 Time','6.2 Score','6.2 Time','6.3 Score','6.3 Time'
							];
	  　　　　　　const filterVal = ['userId','uid','uemail','firstName','lastName',
							'topicTime1','score1' ,'time1' ,'score2' ,'time2' ,'score3' ,'time3' ,
							'topicTime2','score4' ,'time4' ,'score5' ,'time5' ,'score6' ,'time6' ,
							'topicTime3','score7' ,'time7' ,'score8' ,'time8' ,'score9' ,'time9' ,
							'topicTime4','score10','time10','score11','time11','score12','time12',
							'topicTime5','score13','time13','score14','time14','score15','time15',
							'topicTime6','score16','time16','score17','time17','score18','time18'
							];
	  　　　　　　const list = this.list;
	  　　　　　　const data = this.formatJson(filterVal, list);
	  　　　　　　export_json_to_excel(tHeader, data, '商品管理列表');
	  　　　　});
	  　 }
		},mounted(){
			this.getInfo();
		}
	}
</script>

<style>
</style>



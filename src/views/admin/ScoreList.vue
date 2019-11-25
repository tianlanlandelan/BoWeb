<!-- 浏览、下载用户成绩 -->
<template>
    <div class="marginTop">
		<el-select v-model="label" placeholder="请选择" @change="onSelected">
		<el-option
		  v-for="item in options"
		  :key="item.value"
		  :label="item.label"
		  :value="item.value">
		</el-option>
	  </el-select>
		<el-button type="primary" @click="export2Excel()">导出明细</el-button>
		<br>
		<br>
		<el-table  :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
		  <el-table-column label="uid" prop="uid"></el-table-column>
		  <el-table-column label="uemail" prop="uemail"></el-table-column>
		  <el-table-column label="firstName"  prop="firstName"></el-table-column>
		  <el-table-column label="lastName" prop="lastName" ></el-table-column>
		  <el-table-column label="排名" prop="sort"></el-table-column>
		  <el-table-column label="总分" prop="score"> </el-table-column>
		  <el-table-column label="当前学习进度"  prop="topic"></el-table-column>
		  <el-table-column label="当前答题进度" prop="exercise" ></el-table-column>
		  <el-table-column label="答卷1" prop="feedback1"></el-table-column>
		  <el-table-column label="答卷2" prop="feedback2"></el-table-column>
		</el-table>
    </div>
	
</template>

<script>
	import {req_admin_getInfoByType} from "../../api/api.js";
    export default{
		data(){
			return{
				type:1,
				label:"LeaderBoard1",
				list:[],
				options: [{
				  value: '1',
				  label: 'LeaderBoard1'
				}, {
				  value: '2',
				  label: 'LeaderBoard2'
				}, {
				  value: '3',
				  label: 'LeaderBoard3'
				}, {
				  value: '4',
				  label: 'LeaderBoard4'
				}, {
				  value: '5',
				  label: 'LeaderBoard5'
				}, {
				  value: '6',
				  label: 'LeaderBoard6'
				}]
			  
			}
		},
		methods:{
			onSelected(value){
				console.log("onSelected",value);
				this.type = value;
				this.getInfo();
			}
			,
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
							'排名','总分','当前学习进度','当前答题进度','答卷1','答卷2',
							'第1课学习时间','第1.1题得分','第1.1题用时','第1.2题得分','第1.2题用时','第1.3题得分','第1.3题用时',
							'第2课学习时间','第2.1题得分','第2.1题用时','第2.2题得分','第2.2题用时','第2.3题得分','第2.3题用时',
							'第3课学习时间','第3.1题得分','第3.1题用时','第3.2题得分','第3.2题用时','第3.3题得分','第3.3题用时',
							'第4课学习时间','第4.1题得分','第4.1题用时','第4.2题得分','第4.2题用时','第4.3题得分','第4.3题用时',
							'第5课学习时间','第5.1题得分','第5.1题用时','第5.2题得分','第5.2题用时','第5.3题得分','第5.3题用时',
							'第6课学习时间','第6.1题得分','第6.1题用时','第6.2题得分','第6.2题用时','第6.3题得分','第6.3题用时'
							];
	  　　　　　　const filterVal = ['userId','uid','uemail','firstName','lastName',
							'sort','score','topic','exercise','feedback1','feedback2',
							'topicTime1','score1' ,'time1' ,'score2' ,'time2' ,'score3' ,'time3' ,
							'topicTime2','score4' ,'time4' ,'score5' ,'time5' ,'score6' ,'time6' ,
							'topicTime3','score7' ,'time7' ,'score8' ,'time8' ,'score9' ,'time9' ,
							'topicTime4','score10','time10','score11','time11','score12','time12',
							'topicTime5','score13','time13','score14','time14','score15','time15',
							'topicTime6','score16','time16','score17','time17','score18','time18'
							];
	  　　　　　　const list = this.list;
	  　　　　　　const data = this.formatJson(filterVal, list);
	  　　　　　　export_json_to_excel(tHeader, data, 'LeaderBoard' + this.type + "学习记录明细表");
	  　　　　});
	  　 }
		},mounted(){
			this.getInfo();
		}
	}
</script>

<style scoped>
</style>



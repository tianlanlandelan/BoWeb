<!-- 将mavon-editor组件包装下，作为markdown编辑器插件 -->
<template>
    <div>
        <mavon-editor 
            v-model="content" 
            ref="md" 
			@imgAdd="imgAdd"
            @change="change" 
            style="min-height: 600px"
        />
    </div>
</template>
<script>

import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import axios from 'axios';
import {config} from "../data.js";
var Base64 = require('js-base64').Base64;
	
export default {
	props:{
			mdstr:'',
			htmlstr:''
		},
    // 注册
    components: {
        mavonEditor
    },
    data() {
        return {
			content:"",
            html:""
        }
    },
    methods: {
		// 将图片上传到服务器，返回地址替换到md中
        imgAdd(pos, $file){
            let formdata = new FormData();
			/**
			 * 服务端接口用 MultipartFile file 参数接收的，此处用formdata.append('file', $file)传
			 */
           formdata.append('file', $file);
            axios.post('/upload/img',
					formdata
				 ,{
				headers:{
					'Content-Type': 'multipart/form-data' 
				}
			}).then(res => {
				// 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
				/**
				* $vm 指为mavonEditor实例，可以通过如下两种方式获取
				* 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
				* 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
				*/
                console.log(res.data);
                this.$refs.md.$img2Url(pos, config.nginxUrl + res.data.data);
            }).catch(err => {
				this.$notify.error({
				  title:'Failed',
				  message: err
				});
            });
			
        },
        // 所有操作都会被解析重新渲染
        change(value, render){
            // render 为 markdown 解析后的结果[htmlStr]
            this.html = render;
			/**
			 * 在这里一定要用Base64.encodeURI()，不能用Base64.encode(),否则会出现中文乱码情况
			 */
			this.$emit('func',Base64.encodeURI(value),Base64.encodeURI(render));
        },
		load(content,html){
			this.content = Base64.decode(content);
			this.html = Base64.decode(html);
		}
    },
    mounted() {
		if(this.content ){
			this.content = Base64.decode(that.mdstr);
		}
		if(this.html){
			this.html = Base64.decode(that.htmlstr);
		}
    }
}
</script>
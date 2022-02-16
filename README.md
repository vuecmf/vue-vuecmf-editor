# vue-vuecmf-editor
> vuecmf editor是一款基于vue3+typescript+element plus的HTML5富文本编辑器

- 示例演示： http://www.vuecmf.com

## 安装

``` bash
# yarn方式安装 vue-vuecmf-editor
yarn add vue-vuecmf-editor

# npm方式安装 vue-vuecmf-editor
npm install vue-vuecmf-editor
```

## 项目中使用

###1、先在项目中的main.ts 引入
```
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

//导入
import VuecmfEditor from "vue-vuecmf-editor"

createApp(App).use(VuecmfEditor).mount('#app')
```
###2、在模板中使用
```
<template>
  <h3>vuecmf-table demo</h3>

  <vuecmf-editor
      id="myeditor"
      :content="contentHtml"
      @on-change="getContent"
      height="400px"
      size="default"
  ></vuecmf-editor>
  
  <button @click="save">保存</button>

</template>


<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'App',
  components: {
  },
  setup(){
    const contentHtml = ref('Hello world!')

    const getContent = (content:string, id: string) => {
      console.log('id=', id)
      contentHtml.value = content
    }

    const save = ():void => {
      alert(contentHtml.value)
    }

    return {
      getContent,
      contentHtml,
      save
    }

  }
});
</script>
```

### 自定义编辑器功能
```
<!-- 添加tools属性 可自定义编辑器 -->
<vuecmf-editor
      id="myeditor"
      :content="contentHtml"
      @on-change="getContent"
      height="400px"
	  tools="heading, align-left, align-center, align-right, bold"
  ></vuecmf-editor>
```
### 属性
#### id
编辑器id

#### size
编辑器中工具条大小样式，默认default, 可选（large, small）

#### content 
编辑器内容。

#### height 
编辑器高度

#### tools
编辑器工具条设置
<br>heading  标题</br>
<br>align-left  左对齐</br>
<br>align-center  居中对齐</br>
<br>align-right  右对齐</br>
<br>bold  加粗</br>
<br>italic  斜体</br>
<br>underline  下横线</br>
<br>strikethrough  删除线</br>
<br>superscript  上角标</br>
<br>subscript  下角标</br>
<br>quote-left  块引用</br>
<br>link  添加超链接</br>
<br>unlink  取消超链接</br>
<br>font  字体</br>
<br>font-size  字大小</br>
<br>font-color  字体颜色</br>
<br>font-bg-color  文本背景色</br>
<br>indent  增加缩进</br>
<br>outdent  减少缩进</br>
<br>list-ol  有序列表</br>
<br>list-ul  无序列表</br>
<br>select-all  全选</br>
<br>remove-format  清除格式</br>
<br>cut  剪切</br>
<br>copy  复制</br>
<br>hr  插入水平线</br>
<br>table  插入表格</br>
<br>image  插入图片</br>
<br>film  插入视频</br>
<br>code  插入代码</br>
<br>redo  恢复</br>
<br>undo  撤销</br>

### 事件
#### on-change
添加或修改编辑器中的内容时，触发此事件，参数为当前编辑的全部内容。
返回的参数第一个为编辑器内容，第二个为编辑器ID


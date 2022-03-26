<template>
  <div class="editor-tool-bar">
    <template :key="index" v-for="(item, index) in editor_tool_config">
      <el-dropdown @command="item.fun" trigger="click" v-if=" ['heading','font','text-height'].indexOf(item.icon) !== -1 ">
        <el-button :size="size" :title="item.tips">
          <font-awesome-icon :icon="item.icon"></font-awesome-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="val.key" :key="idx" v-for="(val,idx) in item.list"><div v-html="val.value"/> </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-button class="color_btn" :size="size" :title="item.tips" v-else-if=" item.icon === 'glass-martini-alt' ">
        <el-color-picker v-model="color_value" :size="size" @change="item.fun" show-alpha :predefine="predefine_colors" />
      </el-button>

      <el-button class="color_btn" :size="size" :title="item.tips" v-else-if=" item.icon === 'glass-martini' ">
          <el-color-picker v-model="bg_color_value"  :size="size" @change="item.fun" show-alpha :predefine="predefine_colors"  />
      </el-button>

      <el-button :size="size" :title="item.tips" v-else-if=" item.icon === 'link' ">
        <font-awesome-icon :icon="item.icon" @click="link_dlg = true"></font-awesome-icon>
      </el-button>

      <el-button :size="size" :title="item.tips" v-else-if=" item.icon === 'table' ">
        <font-awesome-icon :icon="item.icon" @click="table_dlg = true"></font-awesome-icon>
      </el-button>

      <el-button :size="size" :title="item.tips" v-else-if=" item.icon === 'image' ">
        <font-awesome-icon :icon="item.icon" @click="image_dlg = true"></font-awesome-icon>
      </el-button>

      <el-button :size="size" :title="item.tips" v-else-if=" item.icon === 'film' ">
        <font-awesome-icon :icon="item.icon" @click="video_dlg = true"></font-awesome-icon>
      </el-button>

      <el-button :size="size" :title="item.tips" v-else-if=" item.icon === 'code' ">
        <font-awesome-icon :icon="item.icon" @click="code_dlg = true"></font-awesome-icon>
      </el-button>

      <el-button :size="size" :title="item.tips" v-else-if=" item.icon === 'question-circle'">
        <font-awesome-icon :icon="item.icon" @click="about_dlg = true"></font-awesome-icon>
      </el-button>

      <el-button :size="size" :title="item.tips" v-else>
        <font-awesome-icon :icon="item.icon" @click="item.fun"></font-awesome-icon>
      </el-button>

    </template>

  </div>
  <div
      class="content"
      :style="'width:100%; height:'+ height"
      contenteditable
      ref="editor_ref"
  >
  </div>

  <!-- 添加超链接对话框 -->
  <vuecmf-dialog :model_value="link_dlg" title="添加超链接" @updateVisible="showLinkDlg">
    <template #content>
      <el-form :size="size" :inline="true">
        <el-form-item label="链接地址">
          <el-input :size="size" v-model="link_url" placeholder="请以http://或https://开头"></el-input>
        </el-form-item>
        <el-form-item label="打开方式">
          <el-select v-model="link_target" placeholder="请选择" :size="size">
            <el-option label="新窗口" value="_blank"></el-option>
            <el-option label="当前窗口" value="_self"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button type="default" :size="size"  @click="link_dlg = false">取消</el-button>
      <el-button type="primary" :size="size"  @click="linkEvent">确定</el-button>
    </template>
  </vuecmf-dialog>

  <!-- 插入表格对话框 -->
  <vuecmf-dialog :model_value="table_dlg" title="插入表格" @updateVisible="showTableDlg">
    <template #content>
      <el-form :size="size" :inline="true">
        <fieldset>
          <legend>表格</legend>
          <el-form-item label="宽度">
            <el-input-number v-model="table_width" :precision="0" :step="1" :min="1"  />
          </el-form-item>
          <el-form-item label="行数">
            <el-input-number v-model="table_row" :precision="0" :step="1" :min="1"  />
          </el-form-item>
          <el-form-item label="列数">
            <el-input-number v-model="table_col" :precision="0" :step="1" :min="1"  />
          </el-form-item>
          <el-form-item label="边框">
            <el-color-picker v-model="table_border_color" :size="size"  show-alpha :predefine="predefine_colors"  />
          </el-form-item>
        </fieldset>

        <fieldset>
          <legend>列头</legend>
          <el-form-item>
            <el-select v-model="table_head" placeholder="请选择" :size="size">
              <el-option label="无" value=""></el-option>
              <el-option label="第一行" value="first_row"></el-option>
              <el-option label="第一列" value="first_col"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="背景色">
            <el-color-picker v-model="table_head_bg_color" :size="size"  show-alpha :predefine="predefine_colors"  />
          </el-form-item>
          <el-form-item label="文字颜色">
            <el-color-picker v-model="table_head_color" :size="size"  show-alpha :predefine="predefine_colors"  />
          </el-form-item>
        </fieldset>
      </el-form>
    </template>

    <template #footer>
      <el-button type="default" :size="size"  @click="table_dlg = false">取消</el-button>
      <el-button type="primary" :size="size"  @click="insertTableEvent">确定</el-button>
    </template>
  </vuecmf-dialog>

  <!-- 插入图片 -->
  <vuecmf-dialog :model_value="image_dlg" title="插入图片" @updateVisible="showImageDlg">
    <template #content>
      <el-form :size="size" :inline="true">
        <el-form-item label="地址">
          <el-input :size="size" v-model="image_url" placeholder="请以http://或https://开头"></el-input>
        </el-form-item>
        <el-form-item label="宽度">
          <el-input-number v-model="image_width" :precision="0" :step="1" :min="1" />
        </el-form-item>
        <el-form-item label="高度">
          <el-input-number v-model="image_height" :precision="0" :step="1" :min="1" />
        </el-form-item>
        <el-form-item label="对齐">
          <el-select v-model="image_align" placeholder="请选择" :size="size">
            <el-option label="左对齐" value="left"></el-option>
            <el-option label="右对齐" value="right"></el-option>
            <el-option label="顶对齐" value="top"></el-option>
            <el-option label="居中对齐" value="middle"></el-option>
            <el-option label="底对齐" value="bottom"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </template>

    <template #footer>
      <el-button type="default" :size="size"  @click="image_dlg = false">取消</el-button>
      <el-button type="primary" :size="size"  @click="insertImageEvent">确定</el-button>
    </template>
  </vuecmf-dialog>

  <!-- 插入视频 -->
  <vuecmf-dialog :model_value="video_dlg" title="插入视频" @updateVisible="showVideoDlg">
    <template #content>
      <el-form :size="size" :inline="true">
        <fieldset>
          <legend>支持三种视频文件格式（MP4、WebM、Ogg）</legend>
          <el-form-item label="地址">
            <el-input :size="size" v-model="video_url" placeholder="请以http://或https://开头"></el-input>
          </el-form-item>
          <el-form-item label="宽度">
            <el-input-number v-model="video_width" :precision="0" :step="1" :min="1" />
          </el-form-item>
          <el-form-item label="高度">
            <el-input-number v-model="video_height" :precision="0" :step="1" :min="1" />
          </el-form-item>
          <el-form-item label="对齐">
            <el-select v-model="video_align" placeholder="请选择" :size="size">
              <el-option label="左对齐" value="left"></el-option>
              <el-option label="居中对齐" value="center"></el-option>
              <el-option label="右对齐" value="right"></el-option>
            </el-select>
          </el-form-item>
        </fieldset>

      </el-form>
    </template>

    <template #footer>
      <el-button type="default" :size="size"  @click="video_dlg = false">取消</el-button>
      <el-button type="primary" :size="size"  @click="insertVideoEvent">确定</el-button>
    </template>
  </vuecmf-dialog>

  <!-- 插入代码 -->
  <vuecmf-dialog :model_value="code_dlg" title="插入代码" @updateVisible="showCodeDlg">
    <template #content>
      <el-input v-model="code_content" :rows="5" type="textarea" placeholder="请输入内容" />
    </template>
    <template #footer>
      <el-button type="default" :size="size"  @click="code_dlg = false">取消</el-button>
      <el-button type="primary" :size="size"  @click="insertCodeEvent">确定</el-button>
    </template>
  </vuecmf-dialog>

  <!-- 关于对话框 -->
  <vuecmf-dialog :model_value="about_dlg" title="关于" @updateVisible="showAboutDlg">
    <template #content>
      <div class="about">
        <strong>Vuecmf editor</strong>
        <div>HTML5富文本编辑器</div>
        <div>版本：1.3.2</div>
        <div>基于MIT开源协议</div>
        <div>特别感谢：<a href="https://v3.cn.vuejs.org" target="_blank">vuejs</a>, <a href="https://element-plus.org" target="_blank">Element Plus</a>, <a href="https://fontawesome.com" target="_blank">Font Awesome</a><br> </div>
        <div>&copy; 2022 <a href="http://www.vuecmf.com" target="_blank">www.vuecmf.com</a> All rights reserved.</div>
      </div>
    </template>
    <template #footer>
      <div class="about"><el-button type="default" :size="size"  @click="about_dlg = false">关闭</el-button></div>
    </template>
  </vuecmf-dialog>



</template>
<script lang="ts" setup>
import { defineProps, defineEmits, toRefs } from 'vue';
import Service from "./Service";

const props = defineProps({
  //编辑器ID
  id: {
    type: String,
    required: true
  },
  //编辑器内容
  content: {
    type: String,
    default: ''
  },
  //编辑器高度
  height: {
    type: String,
    default: '300px'
  },
  //自定义工具条， 多个英文逗号分隔
  tools: {
    type: String,
    default: ''
  },
  //编辑器中按钮、输入框的统一大小样式
  size: {
    type: String,
    default: 'default',
    validator: function (value:string) {
      return ['default', 'large', 'small'].indexOf(value) !== -1
    }
  }
})
const emit = defineEmits(['onChange'])
const { id, content, height, tools } = toRefs(props)

//初始化服务类
const service = new Service(id, content, emit, tools?.value)
const editor_ref = service.editor_ref

//工具条功能配置
const editor_tool_config = service.editor_tool_config
const about_dlg = service.about_dlg

//文本颜色设置
const color_value = service.color_value
const bg_color_value = service.bg_color_value
const predefine_colors = service.predefine_colors

//插入超链接相关
const link_dlg = service.link_dlg
const link_url = service.link_url
const link_target = service.link_target

//插入表格相关
const table_dlg = service.table_dlg
const table_row = service.table_row
const table_col = service.table_col
const table_border_color = service.table_border_color
const table_width = service.table_width
const table_head = service.table_head
const table_head_bg_color = service.table_head_bg_color
const table_head_color = service.table_head_color

//插入图片相关
const image_dlg = service.image_dlg
const image_url = service.image_url
const image_width = service.image_width
const image_height = service.image_height
const image_align = service.image_align

//插入视频相关
const video_dlg = service.video_dlg
const video_url = service.video_url
const video_width = service.video_width
const video_height = service.video_height
const video_align = service.video_align

//插入代码相关
const code_dlg = service.code_dlg
const code_content = service.code_content

//事件
const linkEvent = service.linkEvent
const insertTableEvent = service.insertTableEvent
const insertImageEvent = service.insertImageEvent
const insertVideoEvent = service.insertVideoEvent
const insertCodeEvent = service.insertCodeEvent

const showLinkDlg = () => link_dlg.value = false
const showTableDlg = () => table_dlg.value = false
const showImageDlg = () => image_dlg.value = false
const showVideoDlg = () => video_dlg.value = false
const showCodeDlg = () => code_dlg.value = false
const showAboutDlg = () => about_dlg.value = false

//初始化编辑器
service.init()

</script>

<script lang="ts" >
import {defineComponent} from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeading, faAlignLeft, faAlignCenter, faAlignRight, faBold, faItalic, faUnderline, faStrikethrough, faSubscript, faSuperscript, faQuoteLeft, faLink, faIndent, faListOl, faListUl, faCopy, faUnlink, faOutdent, faCut, faPaste, faObjectGroup, faRemoveFormat, faRedo, faUndo, faQuestionCircle, faFont, faTextHeight, faGlassMartiniAlt, faGlassMartini, faArrowsAltH, faTable, faImage, faFilm, faCode } from '@fortawesome/free-solid-svg-icons'

library.add(faHeading, faAlignLeft, faAlignCenter, faAlignRight, faBold, faItalic, faUnderline, faStrikethrough, faSubscript, faSuperscript, faQuoteLeft, faLink, faIndent, faListOl, faListUl, faCopy, faUnlink, faOutdent, faCut, faPaste, faObjectGroup, faRemoveFormat, faRedo, faUndo, faQuestionCircle, faFont, faTextHeight, faGlassMartiniAlt, faGlassMartini, faArrowsAltH, faTable, faImage, faFilm, faCode )

export default defineComponent({
  name: 'vuecmf-editor',
  components: {
    FontAwesomeIcon
  },
});
</script>

<style lang="scss" scoped>
/* 工具条 */
.editor-tool-bar{
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #DCDFE6;
  border-bottom:0;
  :deep(.el-button--default){
    border:0;
    margin:0;
    padding: 3px 10px;
    font-size: 14px;
  }
  :deep(.el-button--small){
    border:0;
    margin:0;
    padding: 3px 10px;
    font-size: 14px;
  }
  :deep(.el-button--large){
    border:0;
    margin:0;
    padding: 3px 10px;
    font-size: 14px;
  }
}

fieldset{
  border-color: #DCDFE6;
  border-width: 1px;
  border-style: solid;
  margin-bottom: 8px;
}

:deep(.el-dropdown-menu__item){
  padding: 4px 8px;
  line-height: normal;
  height: auto;
  h1,h2,h3,h4,h5,h6{
    margin: 0;
  }
}

.el-button.color_btn {
  padding: 2px 8px;
  :deep(.el-color-picker--mini){
    .el-color-picker__trigger {
      padding: 2px;
      width: 24px;
      height: 24px;
    }
  }
}

.about{
  text-align: center;
  div{ margin-top: 8px;}
  strong{
    font-size: 18px;
  }
}

/* 编辑区域 */
.content{
  overflow: auto;
  padding: 10px;
  border: 1px solid #DCDFE6;
  &:focus{
    outline: none;
    border-color: #C0C4CC;
  }
}

</style>

<style lang="scss">
.el-color-picker__trigger{
  border: 0px solid #e6e6e6 !important;
}
</style>


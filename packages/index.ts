// +----------------------------------------------------------------------
// | Copyright (c) 2020~2021 http://www.vuecmf.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( https://github.com/emei8/vuecmf/blob/master/LICENSE )
// +----------------------------------------------------------------------
// | Author: emei8 <2278667823@qq.com>
// +----------------------------------------------------------------------

import VuecmfEditor from './src/VuecmfEditor.vue'
import { App } from 'vue'

/**
 * 为组件提供 install 安装方法，供按需引入
 * @param app
 */
VuecmfEditor.install = (app: App):void => {
  if(VuecmfEditor.installed) return
  VuecmfEditor.installed = true
  app.component(VuecmfEditor.name, VuecmfEditor)
}

/**
 * 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
 * @param app
 */
const install = (app: App):void => {
  app.use(VuecmfEditor.install)
}

// 默认导出组件
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  VuecmfEditor
}
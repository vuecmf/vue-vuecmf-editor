// +----------------------------------------------------------------------
// | Copyright (c) 2020~2022 http://www.vuecmf.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( https://github.com/emei8/vuecmf/blob/master/LICENSE )
// +----------------------------------------------------------------------
// | Author: emei8 <2278667823@qq.com>
// +----------------------------------------------------------------------

import {onMounted, Prop, ref} from "vue";
import EventService from './EventService'
import {VuecmfEditor} from "./typings/VuecmfEditor";
import AnyObject = VuecmfEditor.AnyObject;


/**
 * vuecmf editor 服务类
 */
export default class Service {
    editor_ref = ref();                           //编辑器ref
    content = ref();                              //组件传入的编辑器内容

    link_dlg = ref(false);                  //是否显示超链接对话框
    link_url = ref('');                     //超链接地址
    link_target = ref('_blank');            //超链接打开方式

    about_dlg = ref(false);                 //是否显示关于对话框
    color_value = ref('#000000');           //字体颜色值
    bg_color_value = ref('#ffffff');        //文本背景色
    predefine_colors = ref([
        '#000000',
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577',
    ]);                //预设颜色值

    table_dlg = ref(false);                 //是否显示插入表格对话框
    table_row = ref(1);                     //插入表格的行数
    table_col = ref(1);                     //插入表格的列数
    table_width = ref(300);                 //插入表格的宽度
    table_border_color = ref('#DCDFE6');    //插入的表格边框颜色
    table_head = ref('first_row');          //第一行为列头
    table_head_bg_color = ref('#EBEEF5');   //列头背景色
    table_head_color = ref('#666666');      //列头字体颜色

    image_dlg = ref(false);                 //是否显示插入图片对话框
    image_url = ref('');                    //图片地址
    image_width = ref(300);                 //图片宽度
    image_height = ref(200);                //图片高度
    image_align = ref('middle');            //图片对齐方式

    video_dlg = ref(false);                 //是否显示插入视频对话框
    video_url = ref('');                    //视频地址
    video_width = ref(300);                 //视频宽度
    video_height = ref(200);                //视频高度
    video_align = ref('center');            //视频对齐方式

    code_dlg = ref(false);                  //是否显示插入代码对话框
    code_content = ref('');                 //插入代码内容

    editor_tool_config: AnyObject;                //编辑器工具配置
    eventService: EventService;                   //事件服务类实例

    /**
     * 构造器
     * @param id  编辑器ID标识
     * @param content  编辑器内容
     * @param emit  emit对象
     */
    constructor(id: Ref<[StringConstructor] extends [Prop<infer V, infer D>] ? (unknown extends infer V ? IfAny<V, V, D> : V) : (StringConstructor | undefined)> | undefined, content: Ref<[StringConstructor] extends [Prop<infer V, infer D>] ? (unknown extends infer V ? IfAny<V, V, D> : V) : (StringConstructor | undefined)> | undefined, emit: EmitFn<EE[]>, tools?: string | undefined) {
        console.log('vuecmf-editor service init')
        this.content = content
        this.eventService = new EventService(id, this.editor_ref, emit)
        this.link_dlg.value = false

        this.editor_tool_config = [
            {icon: 'heading', tips: '标题', fun: this.eventService.headingEvent, list: [
                    {key:'H1', value: '<h1>一级标题</h1>'},
                    {key:'H2', value: '<h2>二级标题</h2>'},
                    {key:'H3', value: '<h3>三级标题</h3>'},
                    {key:'H4', value: '<h4>四级标题</h4>'},
                    {key:'H5', value: '<h5>五级标题</h5>'},
                    {key:'H6', value: '<h6>六级标题</h6>'},
                ]},
            {icon: 'align-left', tips: '左对齐', fun: this.eventService.leftAlignEvent},
            {icon: 'align-center', tips: '居中对齐', fun: this.eventService.centerAlignEvent},
            {icon: 'align-right', tips: '右对齐', fun: this.eventService.rightAlignEvent},
            {icon: 'bold', tips: '加粗', fun: this.eventService.boldEvent},
            {icon: 'italic', tips: '斜体', fun: this.eventService.italicEvent},
            {icon: 'underline', tips: '下横线', fun: this.eventService.underlineEvent},
            {icon: 'strikethrough', tips: '删除线', fun: this.eventService.throughEvent},
            {icon: 'superscript', tips: '上角标', fun: this.eventService.supFontEvent},
            {icon: 'subscript', tips: '下角标', fun: this.eventService.subFontEvent},
            {icon: 'quote-left', tips: '块引用', fun: this.eventService.blockquoteEvent},
            {icon: 'link', tips: '添加超链接', fun: this.eventService.linkEvent},
            {icon: 'unlink', tips: '取消超链接', fun: this.eventService.unlinkEvent},
            {icon: 'font', tips: '字体', fun: this.eventService.fontNameEvent, list:[
                    {key:'Arial', value: '<span style="font-family: Arial">Arial</span>'},
                    {key:'Helvetica', value: '<span style="font-family: Helvetica">Helvetica</span>'},
                    {key:'Tahoma', value: '<span style="font-family: Tahoma">Tahoma</span>'},
                    {key:'Verdana', value: '<span style="font-family: Verdana">Verdana</span>'},
                    {key:'Lucida Grande', value: '<span style="font-family: Lucida Grande">Lucida Grande</span>'},
                    {key:'Times New Roman', value: '<span style="font-family: Times New Roman">Times New Roman</span>'},
                    {key:'Georgia', value: '<span style="font-family: Georgia">Georgia</span>'},
                    {key:'SimSun', value: '<span style="font-family: SimSun">宋体</span>'},
                    {key:'SimHei', value: '<span style="font-family: SimHei">黑体</span>'},
                    {key:'Microsoft Yahei', value: '<span style="font-family: Microsoft Yahei">微软雅黑</span>'},
                    {key:'KaiTi', value: '<span style="font-family: KaiTi">楷体</span>'},
                    {key:'NSimSun', value: '<span style="font-family: NSimSun">新宋体</span>'},
                    {key:'FangSong', value: '<span style="font-family: FangSong">仿宋</span>'},
                ]},
            {icon: 'text-height', tips: '字大小', fun: this.eventService.fontSizeEvent, list:[
                    {key:'1', value: '<font size="1">1号字</font>'},
                    {key:'2', value: '<font size="2">2号字</font>'},
                    {key:'3', value: '<font size="3">3号字</font>'},
                    {key:'4', value: '<font size="4">4号字</font>'},
                    {key:'5', value: '<font size="5">5号字</font>'},
                    {key:'6', value: '<font size="6">6号字</font>'},
                    {key:'7', value: '<font size="7">7号字</font>'},
                ]},
            {icon: 'glass-martini-alt', tips: '字体颜色', fun: this.eventService.foreColorEvent},
            {icon: 'glass-martini', tips: '文本背景色', fun: this.eventService.hiliteColorEvent},
            {icon: 'indent', tips: '增加缩进', fun: this.eventService.indentEvent},
            {icon: 'outdent', tips: '减少缩进', fun: this.eventService.outdentEvent},
            {icon: 'list-ol', tips: '有序列表', fun: this.eventService.olEvent},
            {icon: 'list-ul', tips: '无序列表', fun: this.eventService.ulEvent},
            {icon: 'object-group', tips: '全选', fun: this.eventService.selectAllEvent},
            {icon: 'remove-format', tips: '清除格式', fun: this.eventService.removeFormatEvent},
            {icon: 'cut', tips: '剪切', fun: this.eventService.cutEvent},
            {icon: 'copy', tips: '复制', fun: this.eventService.copyEvent},
            {icon: 'arrows-alt-h', tips: '插入水平线', fun: this.eventService.horizontalEvent},
            {icon: 'table', tips: '插入表格', fun: this.eventService.insertTableEvent},
            {icon: 'image', tips: '插入图片', fun: this.eventService.insertImageEvent},
            {icon: 'film', tips: '插入视频', fun: this.eventService.insertVideoEvent},
            {icon: 'code', tips: '插入代码', fun: this.eventService.insertCodeEvent},
            {icon: 'redo', tips: '恢复', fun: this.eventService.redoEvent},
            {icon: 'undo', tips: '撤销', fun: this.eventService.undoEvent},
            {icon: 'question-circle', tips: '关于'},
        ]

        //自定义工具条
        if(typeof tools != 'undefined' && tools.trim() != ''){
            const tool_cfg: VuecmfEditor.AnyObject = []
            const tool_arr = tools.trim().split(',')
            tool_arr.forEach((item: string, key: number) => {
                let val = item.trim()
                if(val == 'font-size'){
                    val = 'text-height'
                }else if(val == 'font-color'){
                    val = 'glass-martini-alt'
                }else if(val == 'font-bg-color'){
                    val = 'glass-martini'
                }else if(val == 'select-all'){
                    val = 'object-group'
                }else if(val == 'hr'){
                    val = 'arrows-alt-h'
                }
                tool_arr[key] = val
            })
            this.editor_tool_config.forEach((item: AnyObject, index: number) => {
                if(tool_arr.indexOf(item.icon) !== -1 || index == this.editor_tool_config.length - 1){
                    tool_cfg.push(item)
                }
            })
            this.editor_tool_config = tool_cfg
        }
        
    }



    /**
     * 编辑器初始化
     */
    init = ():void => {
        onMounted(()=>{
            this.editor_ref.value.innerHTML = this.content.value
            this.eventService.init()
        })
    }

    /**
     * 设置超链接
     */
    linkEvent = ():void => {
        this.eventService.linkEvent(this.link_url, this.link_target)
        this.link_dlg.value = false
    }

    /**
     * 插入表格
     */
    insertTableEvent = ():void => {
        this.eventService.insertTableEvent(this.table_width.value, this.table_row.value, this.table_col.value, this.table_border_color.value, this.table_head.value, this.table_head_bg_color.value, this.table_head_color.value)
        this.table_dlg.value = false
    }

    /**
     * 插入图片
     */
    insertImageEvent = ():void => {
        this.eventService.insertImageEvent(this.image_url.value.trim(), this.image_width.value, this.image_height.value, this.image_align.value)
        this.image_dlg.value = false
    }

    /**
     * 插入视频
     */
    insertVideoEvent = ():void => {
        this.eventService.insertVideoEvent(this.video_url.value.trim(), this.video_width.value, this.video_height.value, this.video_align.value)
        this.video_dlg.value = false
    }

    /**
     * 插入代码
     */
    insertCodeEvent = ():void => {
        this.eventService.insertCodeEvent(this.code_content.value.trim())
        this.code_dlg.value = false
    }

}
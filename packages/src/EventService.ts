// +----------------------------------------------------------------------
// | Copyright (c) 2020~2022 http://www.vuecmf.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( https://github.com/emei8/vuecmf/blob/master/LICENSE )
// +----------------------------------------------------------------------
// | Author: emei8 <2278667823@qq.com>
// +----------------------------------------------------------------------

import {VuecmfEditor} from "./typings/VuecmfEditor";
import AnyObject = VuecmfEditor.AnyObject;
import { ElMessage } from 'element-plus'

/**
 * 编辑器事件服务类
 */
export default class EventService {
    id: AnyObject;              //编辑器ID标识
    editor: AnyObject;          //编辑器ref
    content_range:Range | null; //Range实例
    emit: EmitFn<EE[]>;         //emit实例

    constructor(id: AnyObject, editor: AnyObject, emit:EmitFn<EE[]>) {
        this.id = id
        this.editor = editor
        this.content_range = null
        this.emit = emit
    }

    /**
     * 事件初始化
     */
    init = ():void => {
        //给编辑器添加监听事件
        this.editor.value.addEventListener('mouseup', this.setRange, false)
        this.editor.value.addEventListener('keyup', this.setRange, false)
        this.editor.value.addEventListener('mouseout', (e:Event) => {
            if(e.target == this.editor.value){
                this.setRange()
            }
        }, false)
        this.editor.value.addEventListener('touchend', (e:Event) => {
            if (this.editor.value.contains(e.target)) {
                this.setRange()
            }
        }, false)
    }

    /**
     * 设置编辑器的 range
     */
    private setRange = ():void => {
        //当前光标及焦点位置编辑器中时，更新 content_range
        const selection = window.getSelection() ? window.getSelection() : document.getSelection()
        if(selection != null && selection.rangeCount > 0){
            for(let i = 0; i < selection.rangeCount; i++){
                const range = selection.getRangeAt(0)
                if (this.editor.value.contains(range.startContainer)
                    && this.editor.value.contains(range.endContainer)) {
                    this.content_range = range
                    break
                }
            }
        }
        this.emit('onChange', this.editor.value.innerHTML, this.id.value)
    }

    /**
     * 重置焦点区域到编辑器中
     */
    private resetSelection = ():Selection|null => {
        const selection = window.getSelection ? window.getSelection() : document.getSelection()
        if(selection && this.content_range){
            selection.removeAllRanges()
            selection.addRange(this.content_range)
        }
        return selection
    }

    /**
     * 修改DOM (暂停用此方法)
     * @param style  样式
     * @param element_name  元素名称
     * @param attribute   属性
     */
    private editDom = ( style?: AnyObject | null, element_name?: string, attribute?: AnyObject):void => {
        const selection = this.resetSelection()
        if (selection != null && this.content_range && selection.rangeCount > 0) {
            if(typeof element_name == 'undefined' || element_name == '')  element_name = 'div'
            if(typeof style == 'undefined') style = null
            //获取选中的文本
            const old_node_val = this.content_range.toString().trim()

            if(old_node_val == ''){
                ElMessage.error('请先选择需要设置标题的文本内容！')
            }else{
                //清除原节点
                this.content_range.deleteContents()
                //创建新节点
                const dom_node_list = element_name.split(',')
                console.log('dom=',dom_node_list)
                const new_parent = document.createElement(dom_node_list[0])
                let el = null
                dom_node_list.forEach((node_name, index) => {
                    if(index > 0){
                        el = document.createElement(node_name)
                        new_parent.appendChild(el)
                    }
                })

                //添加样式
                if(style){
                    Object.keys(style).forEach((key) => {
                        new_parent.style[key] = style[key]
                    })
                }
                //添加属性
                if(attribute){
                    Object.keys(attribute).forEach((key) => {
                        new_parent.setAttribute(key, attribute[key])
                    })
                }

                if(el != null){
                    el.innerHTML = old_node_val
                }else{
                    new_parent.innerHTML = old_node_val
                }

                this.content_range.insertNode(new_parent)
                this.content_range.detach()
            }
        }
    }

    /**
     * 执行编辑命令
     * @param action 命令名称
     * @param args  参数值
     */
    private command = (action:string, args?: string):boolean => {
        const selection = this.resetSelection()
        if (selection != null && this.content_range && selection.rangeCount > 0) {
            return document.execCommand(action, false, args)
        }
        return true
    }


    /**
     * 设置标题
     */
    headingEvent = (heading:string):void => {
        /*const element = heading != 'normal' ? heading : 'div'
        this.editDom(null, element)*/
        const args = this.content_range ? '<'+heading+'>' + this.content_range.toString().trim() + '</'+heading+'>' : ''
        this.command('insertHTML', args)
    }

    /**
     * 左对齐
     */
    leftAlignEvent = ():void => {
        //this.editDom({ 'text-align': 'left'})
        this.command('justifyLeft')
    }

    /**
     * 居中对齐
     */
    centerAlignEvent = ():void => {
        //this.editDom({ 'text-align': 'center'})
        this.command('justifyCenter')
    }

    /**
     * 右对齐
     */
    rightAlignEvent = ():void => {
        //this.editDom({ 'text-align': 'right'})
        this.command('justifyRight')
    }

    /**
     * 加粗
     */
    boldEvent = ():void => {
        //this.editDom({ 'font-weight': 'bold'})
        this.command('bold')
    }

    /**
     * 斜体
     */
    italicEvent = ():void => {
        //this.editDom({ 'font-style': 'italic'})
        this.command('italic')
    }

    /**
     * 下横线
     */
    underlineEvent = ():void => {
        //this.editDom({ 'text-decoration': 'underline'})
        this.command('underline')
    }

    /**
     * 删除线
     */
    throughEvent = ():void => {
        //this.editDom({ 'text-decoration': 'line-through'})
        this.command('strikeThrough')
    }

    /**
     * 上角标
     */
    supFontEvent = ():void => {
        //this.editDom(null, 'sup')
        this.command('superscript')
    }

    /**
     * 下角标
     */
    subFontEvent = ():void => {
        //this.editDom(null, 'sub')
        this.command('subscript')
    }

    /**
     * 块引用
     */
    blockquoteEvent = ():void => {
        //this.editDom(null, 'blockquote')
        this.command('formatBlock')
    }

    /**
     * 超链接
     */
    linkEvent = (link_url: Ref<UnwrapRef<string>>, link_target: Ref<UnwrapRef<string>>):void|boolean => {
        /*this.editDom(null, 'a', {
            href: link_url.value,
            target: link_target.value
        })*/
        if(link_url.value.trim() ==''){
            ElMessage.error('链接地址不能为空')
            return false
        }

        if(this.content_range){
            this.command('insertHTML', '<a href="'+ link_url.value +'" target="'+link_target.value+'">'+ this.content_range.toString().trim() +'</a>')
        }
    }

    /**
     * 取消超链接
     */
    unlinkEvent = ():void => {
        this.command('unlink')
    }

    /**
     * 字体
     */
    fontNameEvent = (font_name:string):void => {
        this.command('fontName', font_name)
    }

    /**
     * 字大小
     */
    fontSizeEvent = (font_size:string):void => {
        this.command('fontSize', font_size)
    }

    /**
     * 字体颜色
     */
    foreColorEvent = (color:string):void => {
        this.command('foreColor', color)
    }

    /**
     * 文本背景色
     */
    hiliteColorEvent = (color:string):void => {
        this.command('hiliteColor', color)
    }

    /**
     * 增加缩进
     */
    indentEvent = ():void => {
        //this.editDom({ 'text-indent': '1cm'})
        this.command('indent')
    }

    /**
     * 减少缩进
     */
    outdentEvent = ():void => {
        this.command('outdent')
    }

    /**
     * 有序列表
     */
    olEvent = ():void => {
        //this.editDom(null, 'ol,li')
        this.command('insertOrderedList')
    }

    /**
     * 无序列表
     */
    ulEvent = ():void => {
        //this.editDom(null, 'ul,li')
        this.command('insertUnorderedList')
    }

    /**
     * 全选
     */
    selectAllEvent = ():void => {
        this.command('selectAll')
    }

    /**
     * 清除格式
     */
    removeFormatEvent = ():void => {
        this.command('removeFormat')
    }

    /**
     * 剪切
     */
    cutEvent = ():void => {
        this.command('cut')
    }

    /**
     * 复制
     */
    copyEvent = ():void => {
        this.command('copy')
    }

    /**
     * 插入水平线
     */
    horizontalEvent = ():void => {
        this.command('insertHorizontalRule')
    }

    /**
     * 插入表格
     */
    insertTableEvent = (table_width: number, table_row:number, table_col:number, table_border_color: string,  table_head: string, table_head_bg_color: string, table_head_color: string):void => {

        let dom = '<table width="'+table_width+'" style="border-spacing:0; border-left: 1px solid '+table_border_color+'; border-top: 1px solid '+table_border_color+'; " >'
        for(let r = 0; r < table_row; r++){
            dom += '<tr>'

            for(let c = 0; c < table_col; c++){
                let td = 'td', bg = ''
                if((table_head == 'first_row' && r == 0) || (table_head == 'first_col' && c == 0)){
                    td = 'th'
                    bg = 'background-color: ' + table_head_bg_color + '; color: '+ table_head_color
                }
                dom += '<'+td+' style="border-right: 1px solid '+table_border_color+'; border-bottom: 1px solid '+table_border_color+'; '+ bg +'">&nbsp;</'+td+'>'
            }

            dom += '</tr>'
        }
        dom += '</table>'
        this.command('insertHTML', dom)
        this.command('enableInlineTableEditing', 'true')
        this.command('enableObjectResizing','true')

    }

    /**
     * 插入图片
     */
    insertImageEvent = (url:string, width:number, height: number, align: string):void|boolean => {
        if(url == ''){
            ElMessage.error('图片地址不能为空')
            return false
        }
        const dom = '<img src="'+url+'" width="'+width+'" height="'+height+'" align="'+align+'" alt="'+url+'" />'
        this.command('insertHTML', dom)
        this.command('enableObjectResizing','true')
    }

    /**
     * 插入视频
     */
    insertVideoEvent = (url:string, width:number, height: number, align: string):void|boolean => {
        if(url == ''){
            ElMessage.error('视频地址不能为空')
            return false
        }
        const dom = '<div style="text-align: '+align+'"><video controls="controls" src="'+url+'" width="'+width+'" height="'+height+'" /></div>'
        this.command('insertHTML', dom)
        this.command('enableObjectResizing','true')
    }

    /**
     * 插入代码
     */
    insertCodeEvent = (content: string):void|boolean => {
        if(content == ''){
            ElMessage.error('内容不能为空')
            return false
        }
        this.command('insertHTML', content)
    }

    /**
     * 恢复
     */
    redoEvent = ():void => {
        this.command('redo')
    }

    /**
     * 撤销
     */
    undoEvent = ():void => {
        this.command('undo')
    }

}


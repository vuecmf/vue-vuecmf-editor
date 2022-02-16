<template>
  <h3>vuecmf-table demo</h3>

  <vuecmf-editor
      id="myeditor"
      :content="contentHtml"
      @on-change="getContent"
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



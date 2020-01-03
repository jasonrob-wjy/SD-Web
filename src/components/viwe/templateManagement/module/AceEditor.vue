<template>
  <editor
    v-model="newContent"
    :options="options"
    @init="editorInit"
    :lang="lang"
    theme="chrome"
    width="100%"
    height="100%"
  ></editor>
  <!-- //  height="calc(100% - 36px)" -->
</template>
<script>
import aceEditor from "vue2-ace-editor";
export default {
  name: "aceeditor",
  components: {
    editor: aceEditor
  },

  data: () => ({
    // lang: "json", // html、javascript、json
    newContent: "",
    html: "",
    options: {
      wrap: true, // 换行
      enableLiveAutocompletion: true, // 智能补全
      enableSnippets: true // 启用代码段
      // enableBasicAutocompletion: true, // 启用基本完成 不推荐使用
      // autoScrollEditorIntoView: false, // 自动滚动编辑器视图
    }
  }),
  props: ["content", "lang"],
  watch: {
    content(val) {
      this.newContent = val;
    },
    newContent(val) {
      this.onChange(val);
    }
  },
  mounted() {},
  methods: {
    setData(data){
       this.newContent = data;
       console.log(this.newContent);
       
    },
    onChange(data) {
      this.$emit("on-change", data);
    },
    editorInit() {
      require("brace/ext/language_tools");
      require("brace/mode/html");
      require("brace/mode/javascript");
      require("brace/mode/less");
      require("brace/mode/json");
      require("brace/theme/chrome");
      require("brace/snippets/javascript");
    }
  }
};
</script>

<style lang="scss">
.ace-chrome .ace_print-margin {
  visibility: hidden !important;
}
// .ace_scroller,.ace_gutter{
//   margin: 10px 0 !important;
// }
</style>
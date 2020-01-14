<template>
  <div class="quill-editor" :class="[isFullscreen?'fullscreen':'']">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
    <span class="fullscreen-open" @click="handlefullscreen">
      <Icon type="ios-expand" />
    </span>
  </div>
</template>

<script>
// you can also register quill modules in the component
// import Quill from "quill";
// import { someModule } from "../yourModulePath/someQuillModule.js";
// Quill.register("modules/someModule", someModule);
import * as Quill from "quill";
// let fontSizeStyle = Quill.import('attributors/style/size');
// fontSizeStyle.whitelist = ['10px', '12px', '14px', '16px', '20px', '24px', '36px', false];
export default {
  data() {
    return {
      // content: `<p>[步骤]</p><p><br></p><p><br></p><p>[结果]</p><p><br></p><p><br></p><p>[期望]</p><p><br></p><p><br></p><p><br></p><p><br></p>`,
      isFullscreen: false,
      editorOption: {
        height: "200px",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
            [{ align: [] }], //对齐方式
            // [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向

            ["blockquote", "code-block"], //引用，代码块
            ["clean"], //清除字体样式
            ["image"] //上传图片、上传视频
          ]
        },
        theme: "snow"
      }
    };
  },
  props: ["content"],
  // manually control the data synchronization
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    onEditorBlur(quill) {
      // console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      // console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      // console.log("editor ready!", quill);
    },
    onEditorChange(quill) {
      let ql_editor = this.$refs.myQuillEditor.$el.querySelector(".ql-editor");
      //获取所有的img标签
      let elements = ql_editor.getElementsByTagName("img");
      for (let j = 0; j < elements.length; j++) {
        //循环给所有的img的标签，动态绑定onclick方法
        elements[j].onclick = function() {
          console.log(this);

          // // 1. 获取两个大小div
          // var oPanel = document.getElementById("panel");
          // var oDragIcon = document.getElementById("dragIcon");
          // // 定义4个变量
          // var disX = 0; //鼠标按下时光标的X值
          // var disY = 0; //鼠标按下时光标的Y值
          // var disW = 0; //拖拽前div的宽
          // var disH = 0; // 拖拽前div的高
          // //3. 给小div加点击事件
          // oDragIcon.onmousedown = function(ev) {
          //   var ev = ev || window.event;
          //   disX = ev.clientX; // 获取鼠标按下时光标x的值
          //   disY = ev.clientY; // 获取鼠标按下时光标Y的值
          //   disW = oPanel.offsetWidth; // 获取拖拽前div的宽
          //   disH = oPanel.offsetHeight; // 获取拖拽前div的高
          //   document.onmousemove = function(ev) {
          //     var ev = ev || window.event;
          //     //拖拽时为了对宽和高 限制一下范围，定义两个变量
          //     var W = ev.clientX - disX + disW;
          //     var H = ev.clientY - disY + disH;
          //     if (W < 100) {
          //       W = 100;
          //     }
          //     if (W > 800) {
          //       W = 800;
          //     }
          //     if (H < 100) {
          //       H = 100;
          //     }
          //     if (H > 500) {
          //       H = 500;
          //     }
          //     oPanel.style.width = W + "px"; // 拖拽后物体的宽
          //     oPanel.style.height = H + "px"; // 拖拽后物体的高
          //   };
          //   document.onmouseup = function() {
          //     document.onmousemove = null;
          //     document.onmouseup = null;
          //   };
          // };




        };
      }
      this.$emit("on-change", quill);
    },
    handlefullscreen() {
      this.isFullscreen = !this.isFullscreen;
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    // console.log("this is current quill instance object", this.editor);
  }
};
</script>
<style lang="scss">
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="10px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
  content: "12px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
  content: "16px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
  content: "20px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
  content: "24px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="36px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="36px"]::before {
  content: "36px";
}
.ql-toolbar.ql-snow {
  border: 1px solid #dcdee2;
  border-radius: 4px 4px 0 0;
}
.ql-container.ql-snow {
  border: 1px solid #dcdee2;
  border-radius: 0 0 4px 4px;
  min-height: 200px;
}

.quill-editor {
  position: relative;
}
.fullscreen-open {
  top: 75px;
  right: 30px;
  font-size: 20px;
  position: absolute;
  cursor: pointer;
}
.fullscreen {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #fff;
  z-index: 100000;
  width: 99.3% !important;
  margin-right: 0 !important;
  .fullscreen-open {
    top: 55px;
  }
  .ql-container {
    height: calc(100vh - 42px);
    overflow-y: auto !important;
  }
}
.ql-snow .ql-editor pre.ql-syntax {
  color: #666;
}
</style>
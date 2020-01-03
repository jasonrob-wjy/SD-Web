<template>
  <div>
    <Modal v-model="oneBugIsShow" width="70%" @on-cancel="handleShow">
      <div slot="header">
        <h3>
          <Icon type="ios-create-outline" size="22" />新建 / 编辑
        </h3>
      </div>
      <div class="qhan">
        <span @click="handleCharge('0')" :class="[chartClass==='0'?'active':'']">Echarts图谱</span>
        <span @click="handleCharge('1')" :class="[chartClass==='1'?'active':'']">非Echarts图谱</span>
      </div>
      <div class="warp">
        <div>
          <label>封面上传：</label>
          <Upload
            multiple
            type="drag"
            :action="$url+'/api/template/chart/img'"
            :on-success="handleSuccess"
            :show-upload-list="false"
          >
            <div class="upload" v-if="!imgSrc">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或拖拽上传</p>
            </div>
            <div v-else>
              <img :src="$url+'/'+imgSrc" />
            </div>
          </Upload>
        </div>
        <p>
          <label>图谱标题：</label>
          <Input v-model="title" placeholder="请输入标题..." style="width: 300px" />
        </p>
        <div v-if="isAddClear">
          <label>图谱类型：</label>
          <Select v-model="type" style="width:300px">
            <Option v-for="(item,i) in typeArr" :value="item" :key="i+'w'">{{ item }}</Option>
          </Select>
          <Icon type="ios-add-circle-outline" class="add-clear" size="26" @click="handleAddClear" />
        </div>
        <div v-else>
          <label>图谱类型：</label>
          <Input v-model="type" placeholder="请输入图谱类型..." style="width: 300px" />
          <Icon
            type="ios-close-circle-outline"
            class="add-clear"
            size="26"
            @click="handleAddClear"
          />
        </div>
        <div>
          <label v-if="chartClass==='0'">Option：</label>
          <label v-else>JS 代码：</label>
          <Input v-model="option" type="textarea" :rows="8" :placeholder="chartClass==='0'?'请输 option 内容... let option = { ... }':'请输入 JS 代码...'" />
        </div>
        <div>
          <label>API 数据：</label>
          <Input v-model="data" type="textarea" :rows="8" placeholder="请输入 API 数据... 例如：let data = { ... }" />
        </div>
        <!-- <div>
          <label>theme 数据：</label>
          <Input v-model="theme" type="textarea" :rows="8" placeholder="请输入主题配置... 例如：let themeObj = { ... } （ 此部分可以不用填写 ）" />
        </div> -->
        <div>
          <label v-if="chartClass==='0'">备注：</label>
          <label v-else>使用说明：</label>
          <QuillEditor class="editor" :content="explain" @on-change="onEditorChange" />
        </div>
      </div>
      <div slot="footer">
        <Button type="success" @click="handleSubmit('yes')">提交发布</Button>
        <Button type="info" @click="handleSubmit('no')">保存草稿</Button>
        <Button type="primary" @click.stop="handleShow">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import QuillEditor from "../../../public/QuillEditor";
import AceEditor from "./AceEditor";
export default {
  components: {
    QuillEditor,
    AceEditor
  },
  computed: {
    oneBugIsShow() {
      return this.$store.state.show.oneBugIsShow;
    }
  },
  props: ["typeArr"],
  // watch: {
  //   oneBugIsShow(val) {
  //     console.log(val);
  //     this.isShow = val;
  //   }
  // },
  data() {
    return {
      quillContent: "",
      isShow: true,
      value: "",
      isAddClear: true,
      cityList: [
        {
          value: "饼状图谱",
          label: "饼状图谱"
        },
        {
          value: "柱状图谱",
          label: "柱状图谱"
        }
      ],
      model1: "",
      bid: "",
      title: "",
      type: "",
      look: 1,
      author: "",
      option: "",
      theme: "",
      data: "",
      imgSrc: "",
      url: "",
      explain: "",
      bid: "",
      date: "",
      chartClass: "0"
    };
  },
  mounted() {
    this.author = this.$store.state.variable.user.name;
    this.url = this.$store.state.variable.user.url;
  },
  methods: {
    handleClear() {
      this.bid = "";
      this.title = "";
      this.type = "";
      this.author = "zll";
      this.option = "";
      this.data = "";
      this.url = "";
      this.imgSrc = "";
      this.theme = "";
      this.explain = "";
      this.bid = "";
      this.date = "";
      this.chartClass = "0";
    },
    getBidData(bid) {
      this.bid = bid;
      this.$axios.get("/api/template/chart", { params: { bid } }).then(res => {
        if (res.data.result) {
          // console.log(res.data.content);
          let content = res.data.content;
          this.title = content.title;
          this.type = content.type;
          this.option = content.option;
          this.data = content.data;
          this.imgSrc = content.imgSrc;
          this.theme = content.theme;
          this.chartClass = content.chartClass;
          this.explain = content.explain;
        } else {
          this.$Message["error"]({
            background: true,
            content: "数据请求失败！"
          });
        }
      });
    },
    handleSubmit(val) {
      let data = {
        title: this.title,
        type: this.type,
        author: this.author,
        option: this.option,
        data: this.data,
        // theme: this.theme,
        imgSrc: this.imgSrc ? this.imgSrc : "/assets/img/df.png",
        url: this.url ? this.url : "/assets/img/dt.png",
        chartClass: this.chartClass,
        publish: val,
        explain: this.explain
      };
      //判断更新数据还是添加数据
      if (this.bid) {
        this.$axios
          .put(
            "/api/template/chart",
            this.$qs.stringify({ bid: this.bid, data })
          )
          .then(res => {
            if (res.data.result) {
              this.$Message["success"]({
                background: true,
                content: "数据提交成功！"
              });
              this.handleShow();
            } else {
              this.$Message["error"]({
                background: true,
                content: "数据上传失败！"
              });
            }
            // this.$router.push({ path: "/Artlist" });
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.$axios
          .post("/api/template/chart", this.$qs.stringify(data))
          .then(res => {
            if (res.data.result) {
              this.$Message["success"]({
                background: true,
                content: "数据提交成功！"
              });
              this.handleShow();
            } else {
              this.$Message["error"]({
                background: true,
                content: "数据上传失败！"
              });
            }
            // this.$router.push({ path: "/Artlist" });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    handleAddClear() {
      this.isAddClear = !this.isAddClear;
    },
    handleCharge(val) {
      this.chartClass = val;
    },
    handleShow() {
      this.handleClear();
      this.$store.commit("setOneBugIsShow", false);
      this.$emit("on-change");
    },
    onEditorChange(quill) {
      // console.log(quill);
      this.explain = quill.html;
    },
    handleSuccess(res, file) {
      if (res.result) {
        this.imgSrc = res.fileInfo.path;
        this.$Message["success"]({
          background: true,
          content: "图片上传成功！"
        });
      } else {
        this.$Message["error"]({
          background: true,
          content: "图片上传失败！"
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.qhan {
  position: absolute;
  top: 3px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  span {
    padding: 10px;
    margin: 6px 12px;
    border: 1px solid #fff;
    border-radius: 6px 6px 0 0;
    cursor: pointer;
  }
  span:hover,
  span.active {
    border: 1px solid #e8eaec;
    background-color: #fff;
    border-bottom: 0px;
    color: #19be6b;
  }
}
.warp {
  img {
    display: block;
    width: 218px;
    height: 155px;
  }
  .upload {
    padding: 30px 50px;
  }
  p,
  > div {
    padding: 10px 10px;
    display: flex;
    align-items: center;
    label {
      width: 100px;

      text-align: right;
    }
    > div {
      margin-right: 40px;
    }
    .editor {
      width: 86%;
    }
  }
  .add-clear {
    cursor: pointer;
  }
  .add-clear:hover {
    color: #19be6b;
  }
}
</style>

<style lang="scss">
.ivu-input-wrapper {
  width: calc(97% - 100px);
}
</style>

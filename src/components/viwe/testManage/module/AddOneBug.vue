<template>
  <div>
    <Modal v-model="isShow" width="70%" @on-cancel="handleShow">
      <div slot="header">
        <h3>
          <Icon type="ios-create-outline" size="22" />新建任务
        </h3>
      </div>
      <div class="warp">
        <p>
          <label>任务标题：</label>
          <Input v-model="title" placeholder="请输入标题..." style="width: 300px; margin-right: 40px;" />
          <label>所属项目：</label>
          <Select v-model="project" style="width:300px">
            <Option
              v-for="item in projectArr"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </p>
        <p>
          <label>当前指派：</label>
          <Select v-model="assign" style="width:300px; margin-right: 40px;">
            <Option v-for="item in assignArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <label>任务类型：</label>
          <Select v-model="type" style="width:300px;">
            <Option v-for="item in typeArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </p>
        <p>
          <label>优先级别：</label>
          <RadioGroup v-model="level">
            <Radio label="高">
              <span>高（加急处理）</span>
            </Radio>
            <Radio label="中">
              <span>中（暂缓处理）</span>
            </Radio>
            <Radio label="低">
              <span>低（暂不处理）</span>
            </Radio>
          </RadioGroup>
        </p>
        <div>
          <label>上传附件：</label>
          <Upload
            multiple
            :action="$url+'/api/task/files'"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            ref="upload"
          >
            <Button icon="ios-cloud-upload-outline">附件上传</Button>
          </Upload>
          <em style="color:red;font-size:12px;" v-if="!uploadList.length">（可上传文件、文本、图片等）</em>
        </div>
        <div>
          <label>任务内容：</label>
          <QuillEditor class="editor" :content="step" @on-change="onEditorChange" />
        </div>
        <div>
          <label>备注：</label>
          <Input v-model="remarks" type="textarea" :rows="4" placeholder="此处可以不填。" />
        </div>
      </div>
      <div slot="footer">
        <Button type="success" @click="handleSubmit('yes')">提交</Button>
        <!-- <Button type="info" @click="handleSubmit('no')">保存草稿</Button> -->
        <Button type="primary" @click="handleShow">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import QuillEditor from "../../../public/QuillEditor";
export default {
  components: {
    QuillEditor
  },

  data() {
    return {
      title: "",
      project: "",
      assign: "",
      level: "高",
      author: "",
      url: "",
      date: "",
      state: "待处理",
      type: "",
      remarks: "",
      appendix: "",
      step: `<p>[步骤]</p><p><br></p><p><br></p><p>[结果]</p><p><br></p><p><br></p><p>[期望]</p><p><br></p><p><br></p><p><br></p><p><br></p>`,

      uploadList: [],
      // ----------------
      // isShow: false,
      value: "asd",
      projectArr: [
        {
          value: "项目1",
          label: "项目1"
        },
        {
          value: "项目2",
          label: "项目2"
        }
      ],
      assignArr: [
        {
          value: "郑玲璐",
          label: "郑玲璐"
        },
        {
          value: "李学东",
          label: "李学东"
        }
      ],
      typeArr: [
        {
          value: "功能相关",
          label: "功能相关"
        },
        {
          value: "页面相关",
          label: "页面相关"
        },
        {
          value: "需求相关",
          label: "需求相关"
        },
        {
          value: "设计相关",
          label: "设计相关"
        },
        {
          value: "开发相关",
          label: "开发相关"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      model1: ""
    };
  },
  computed: {
    isShow() {
      let data = this.$store.state.variable.rowData;
      let state = this.$store.state.show.oneBugIsShow;
      if (state && data) {
        console.log(data);
        
        this.getBidData(data);
      }
      return state;
    }
  },
  // watch: {
  //   isShow(val) {

  //   }
  // },
  mounted() {
    let author = this.$store.state.user.info;
    this.author = author.name;
    this.url = author.url;
  },
  methods: {
    clearData() {
      this.title = "";
      this.project = "";
      this.assign = "";
      this.level = "高";
      this.url = "";
      // date: this.date,
      this.state = "待处理";
      this.type = "";
      this.remarks = "";
      this.step = `<p>[步骤]</p><p><br></p><p><br></p><p>[结果]</p><p><br></p><p><br></p><p>[期望]</p><p><br></p><p><br></p><p><br></p><p><br></p>`;
       this.$refs.upload.fileList = [];
    },
    getBidData(data) {
      this.title = data.title;
      this.project = data.project;
      this.assign = data.assign;
      this.level = data.level;
      this.author = data.author;
      this.url = data.url;
      // date: this.date,
      this.state = data.state;
      this.type = data.type;
      this.remarks = data.remarks;
      this.step = data.step;
      this.$refs.upload.fileList = JSON.parse(data.appendix);
      // this.isShow = true;
    },
    handleSubmit(val) {
      this.$Message.destroy();
      // 判断输入内容是否为空
      if (!this.title) {
        this.$Message["error"]({
          background: true,
          content: "图谱标题不得为空！"
        });
        return;
      }
      if (!this.type) {
        this.$Message["error"]({
          background: true,
          content: "图谱类型不得为空！"
        });
        return;
      }

      let data = {
        title: this.title,
        project: this.project,
        assign: this.assign,
        level: this.level,
        author: this.author,
        url: this.url,
        // date: this.date,
        state: this.state,
        type: this.type,
        remarks: this.remarks,
        step: this.step,
        appendix: JSON.stringify(this.uploadList)
      };
      //判断更新数据还是添加数据
      if (this.bid) {
        this.$axios
          .put(
            "/api/template/component",
            this.$qs.stringify({ bid: this.bid, data })
          )
          .then(res => {
            if (res.data.result) {
              this.$Message["success"]({
                background: true,
                content: "数据提交成功！"
              });
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
          .post("/api/task", this.$qs.stringify(data))
          .then(res => {
            if (res.data.result) {
              this.$Message["success"]({
                background: true,
                content: "数据提交成功！"
              });
             
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
      this.handleShow();
      this.$emit("on-change");
    },
    onEditorChange(quill) {
      // console.log(quill);
      this.step = quill.html;
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file) {
      if (res.result) {
        this.$Message["success"]({
          background: true,
          content: "文件上传成功！"
        });
        let uploadList = this.$refs.upload.fileList;
        this.uploadList = [];

        uploadList.forEach(item => {
          if (item.response) {
            this.uploadList.push(item.response.fileInfo);
          } else {
            this.uploadList.push(item);
          }
        });
      } else {
        this.$Message["error"]({
          background: true,
          content: "文件上传失败！"
        });
      }
    },
    // 文件上传失败时的钩子
    handleError(file) {
      this.$Message["error"]({
        background: true,
        content: "文件上传失败！"
      });
    },
    // 点击已上传的文件链接时的钩子
    handlePreview(file) {},
    // 文件列表移除文件时的钩子
    handleRemove(file) {
      let uploadList = this.$refs.upload.fileList;
      let data = {
        name: file.name
      };
      this.$axios
        .post("/api/task/files/remove", this.$qs.stringify(data))
        .then(res => {
          if (res.data.result) {
            this.$Message["success"]({
              background: true,
              content: "文件删除成功！"
            });
            this.uploadList = [];
            uploadList.forEach(item => {
              this.uploadList.push(item.response.fileInfo);
            });
          } else {
            this.$Message["error"]({
              background: true,
              content: "文件删除失败！"
            });
            this.$refs.upload.fileList = uploadList;
          }
          // this.$router.push({ path: "/Artlist" });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleShow() {
      this.clearData();
       this.$store.commit("setRowData", null);
      this.$store.commit("setOneBugIsShow", false);
    }
    // -------------

    // show(index) {
    //   this.$Modal.info({
    //     title: "User Info",
    //     content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
    //   });
    // },
    // remove(index) {
    //   this.data6.splice(index, 1);
    // }
  }
};
</script>
<style lang="scss" scoped>
.warp {
  p,
  > div {
    padding: 10px 10px;
    display: flex;
    align-items: center;
    > label {
      width: 75px;
    }
    > div {
      margin-right: 10px;
    }
    .editor {
      width: 86%;
    }
  }
}
</style>
<style lang="scss" >
.ivu-upload {
  display: flex;
  align-items: center;
  ul {
    display: flex;
    margin: 0;
    li {
      margin-left: 12px;
      color: cadetblue;
    }
  }
}
</style>


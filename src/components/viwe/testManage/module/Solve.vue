<template>
  <div>
      <!-- 指派框 -->
    <Modal v-model="isShow" width="60%" @on-cancel="handleShow">
      <div slot="header">
        <h3>
          <Icon type="md-checkbox-outline" size="22" />指派提交
        </h3>
      </div>
      <div class="warp-box">
        <p>
          <label>任务标题：</label>
          <span>{{contentData.title}}</span>
        </p>
        <p>
          <label>所属项目：</label>
          <span>{{contentData.project}}</span>
        </p>
        <p>
          <label>任务类型：</label>
          <span>{{contentData.type}}</span>
        </p>
        <p>
          <label>指派给：</label>
          <Select v-model="assign" style="width:150px">
            <Option v-for="item in assignArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </p>
        <p>
          <label>抄送给：</label>
          <Select v-model="send" filterable multiple style="width:600px">
            <Option v-for="item in assignArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </p>

        <div>
          <label>批注/备注：</label>
          <QuillEditor class="editor" :content="step" @on-change="onEditorChange" />
        </div>
      </div>
      <div slot="footer">
        <Button type="info" @click="handleSubmit">确定</Button>
        <Button type="primary" @click.stop="handleShow">关闭</Button>
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
      contentData: null,
      isShow: true,

      // assignShow: false,
      assign: "",
      send: [],
      step: "",
      // model12: "",
      assignArr: [
        {
          value: "代码错误",
          label: "配置相关"
        }
      ]
      // model1: ""
    };
  },
  // computed: {
  //   solveBugIsShow() {
  //     this.content = this.$store.state.variable.rowData;
  //     let state = this.$store.state.show.solveBugIsShow;
  //     // if (state && this.content) {
  //     //   // this.getBidData(data);
  //     // }
  //     return state;
  //   }
  // },

  props: ["value", "content"],
  watch: {
    isShow() {
      this.handleShow();
    }
  },
  mounted() {
    this.assignArr = this.value;
    if (this.content) {
      this.contentData = this.content;
    }
    // this.content = this.$store.state.variable.rowData;
  },
  methods: {
    // 确定 回测
    // handleBackTest() {
    //   if (this.content) {
    //     let bid = this.content.bid;
    //     let data = {
    //       state: "待回测"
    //     };
    //     this.$axios
    //       .put("/api/task", this.$qs.stringify({ bid, data }))
    //       .then(res => {
    //         if (res.data.result) {
    //           this.$Message["success"]({
    //             background: true,
    //             content: "状态变更已提交，请耐心等待！"
    //           });
    //           this.$emit("on-change");
    //         } else {
    //           this.$Message["error"]({
    //             background: true,
    //             content: "状态变更已提交失败！"
    //           });
    //         }
    //         // this.$router.push({ path: "/Artlist" });
    //       })
    //       .catch(function(error) {
    //         console.log(error);
    //       });
    //     this.handleShow();
    //   } else {
    //     this.$Message["error"]({
    //       background: true,
    //       content: "状态变更异常！"
    //     });
    //   }
    // },

    // 指派
    // handleAssignShow() {
    //   this.handleShow();
    //   this.assignShow = !this.assignShow;
    // },
    // handleClose(){

    // },
    //指派数据更新
    handleSubmit() {
      let bid = this.contentData.bid;
      let data = {
        assign: this.assign,
        step: this.step,
        send: JSON.stringify(this.send)
      };
      this.$axios
        .put("/api/task", this.$qs.stringify({ bid, data }))
        .then(res => {
          if (res.data.result) {
            this.$Message["success"]({
              background: true,
              content: "提交成功！"
            });
            this.handleShow();
          } else {
            this.$Message["error"]({
              background: true,
              content: "提交失败！"
            });
          }
          // this.$router.push({ path: "/Artlist" });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onEditorChange(quill) {
      // console.log(quill);
      this.step = quill.html;
    },
    // show(index) {
    //   this.$Modal.info({
    //     title: "User Info",
    //     content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
    //   });
    // },
    // remove(index) {
    //   this.data6.splice(index, 1);
    // },
    handleShow() {
      this.$emit("on-change", "c");
      // this.$store.commit("setSolveBugIsShow", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.warp-box {
  p,
  > div {
    padding: 10px 10px;
    display: flex;
    align-items: center;
    label {
      width: 75px;
    }
    > div,
    span {
      margin-right: 40px;
    }
    .editor {
      width: 86%;
    }
  }
}
</style>



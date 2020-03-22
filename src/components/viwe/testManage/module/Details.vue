<template>
  <div>
    <Modal v-model="isShow" width="70%" @on-cancel="handleShow">
      <div slot="header">
        <h3>
          <Icon type="ios-create-outline" size="22" />详情内容
        </h3>
      </div>
      <div class="warp-box">
        <div>
          <p>
            <label>任务标题：</label>
            <span>{{title}}</span>
          </p>
          <p>
            <label>所属项目：</label>
            <span>{{project}}</span>
          </p>
        </div>
        <div>
          <p>
            <label>状态：</label>
            <span>{{state}}</span>
          </p>
          <p>
            <label>任务类型：</label>
            <span>{{type}}</span>
          </p>
        </div>

        <div>
          <p>
            <label>创建者：</label>
            <span>{{author}}</span>
          </p>
          <p>
            <label>创建时间：</label>
            <span>{{date}}</span>
          </p>
        </div>
        <div>
          <p>
            <label>指派给：</label>
            <span>{{assign}}</span>
          </p>
          <p>
            <label>抄送给：</label>
            <span v-for="(item,i) in send" :key="i+'q'">{{item}}{{send.length-1!==i?'、':''}}</span>
          </p>
        </div>
        <div>
          <label>附件内容：</label>
          <ul class="fj" v-for="item in appendix" :key="item.name">
            <li>{{item.name}}</li>
          </ul>
        </div>
        <div>
          <label>任务内容：</label>
          <div v-html="step"></div>
        </div>
        <div>
          <label>备注：</label>
          <span>{{remarks}}</span>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" @click.stop="handleShow">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: true,
      title: "",
      project: "",
      assign: "",
      level: "高",
      author: "",
      url: "",
      date: "",
      state: "待处理",
      type: "",
      send: "",
      remarks: "",
      appendix: "",
      step: "",
      uploadList: []
    };
  },
  props: ["value", "content"],
  watch: {
    isShow() {
      this.handleShow();
    }
  },
  mounted() {
    this.getData(this.content);
    // this.content = this.$store.state.variable.rowData;
  },
  // computed: {
  //   detailsIsShow() {
  //     let data = this.$store.state.variable.rowData;
  //     let state = this.$store.state.show.detailsIsShow;
  //     if (state && data) {
  //       this.$nextTick(() => {
  //         this.getData(data);
  //       });
  //     } else {
  //       this.$store.commit("setRowData", {});
  //     }
  //     return state;
  //   }
  // },
  methods: {
    getData(data) {
      this.title = data.title;
      this.project = data.project;
      this.assign = data.assign;
      this.level = data.level;
      this.author = data.author;
      this.url = data.url;
      this.date = data.date;
      this.state = data.state;
      this.type = data.type;
      this.send = JSON.parse(data.send);
      this.remarks = data.remarks;
      this.step = data.step;
      this.appendix = JSON.parse(data.appendix);
      // this.isShow = true;
    },
    handleShow() {
      this.$emit("on-change", "d");
    }
  }
};
</script>
<style lang="scss" scoped>
.warp-box {
  > div,
  p {
    // padding: 10px 10px;
    display: flex;
    margin: 10px 0;
    // align-items: center;
    label {
      align-items: flex-start;
      font-weight: 400;
      width: 75px;
      text-align: right;

      margin-right: 10px;
    }
    > p {
      width: 50%;
      margin: 0;
    }

    .editor {
      width: 86%;
    }
  }
  .fj {
    li {
      margin-right: 15px;
      padding: 3px 6px;
      color: cadetblue;
    }
  }
}
</style>



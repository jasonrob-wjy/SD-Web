<template>
  <div>
    <Modal v-model="detailsIsShow" width="50%" @on-cancel="handleShow">
      <div slot="header">
        <h3>
          <Icon type="ios-create-outline" size="22" />详情内容
        </h3>
      </div>
      <div class="warp-box">
        <div>
          <label>任务标题：</label>
          <span>{{title}}</span>
        </div>
        <div>
          <p>
            <label>所属项目：</label>
            <span>{{project}}</span>
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
            <label>状态：</label>
            <span>{{state}}</span>
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
      step: "",

      uploadList: []
    };
  },
  // watch: {
  //   oneBugIsShow(val) {
  //     console.log(val);
  //     this.isShow = val;
  //   }
  // },
  computed: {
    detailsIsShow() {
      let data = this.$store.state.variable.rowData;
      let state = this.$store.state.show.detailsIsShow;
      if (state && data) {
        this.getData(data);
      }
      return state;
    }
  },
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
      this.remarks = data.remarks;
      this.step = data.step;
      this.appendix = JSON.parse(data.appendix);
      // this.isShow = true;
    },
    handleShow() {
      this.$store.commit("setDetailsIsShow", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.warp-box {
  > div {
    padding: 10px 10px;
    display: flex;
    align-items: center;
    label {
      font-weight: 400;
    }
    > p {
      width: 50%;
    }

    .editor {
      width: 86%;
    }
  }
  .fj{
    li{
      margin-right: 15px;
      padding: 3px 6px;
      color: cadetblue;
    }
  }
}
</style>



<template>
  <div class="content">
    <div class="query">
      <div class="select">
        <label>项目</label>
        <Select v-model="project" clearable @on-change="getData" style="width:100px">
          <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <label>状态</label>
        <Select v-model="state" clearable @on-change="getData" style="width:100px">
          <Option v-for="item in stateArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="handle">
        <Input v-model="title" search enter-button @on-search="getData" placeholder="请输入任务标题..." />
        <div>
          <Dropdown trigger="click" style="margin-left: 20px">
            <Button type="info" ghost>
              <!-- 导出EXCEL -->
              <Icon type="ios-download-outline" size="18" />导出
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem>导出EXCEL表</DropdownItem>
              <DropdownItem>导出CSV表</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
          <Button type="success" ghost @click="onTableChange({})">+ 新建任务</Button>
        </div>
      </div>
    </div>
    <div class="warp">
      <!-- 表格 -->
      <MyTable ref="table" @on-change="onTableChange" />

      <Page
        class="page-warp"
        prev-text="上一页"
        next-text="下一页"
        show-elevator
        show-total
        :page-size-opts="pageSizeOpts"
        :page-size="limit"
        :total="count"
        show-sizer
        @on-change="changePage"
        @on-page-size-change="changeSizePage"
      />

      <!-- 新建Bug -->
      <AddOneBug @on-change="onChange" :value="assignArr" :content="content" v-if="bjrw" />
      <!-- 解决Bug -->
      <Solve :value="assignArr" @on-change="onChange" :content="content" v-if="zpg" />
      <!-- 详情 -->
      <Details @on-change="onChange" :content="content" v-if="xq" />
      <!-- 回测 -->
      <Modal v-model="isShow" width="360" :closable="false" @on-cancel="handleShow(false)">
        <div slot="header" style="color:#f60;text-align:center">
          <Icon type="md-help-circle" size="20" />
          <span>回测确认提示</span>
        </div>
        <div style="text-align:center">
          <p>
            若（此问题）已解决请点击确认按钮进行回测
            <br />是否继续？
          </p>
        </div>
        <div slot="footer">
          <Button type="primary" ghost @click="getReset(content)">确认</Button>
          <!-- <Button type="info" ghost @click.stop="handleAssignShow">指派</Button> -->
          <Button type="success" ghost @click="handleShow(false)">关闭</Button>
        </div>
      </Modal>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import MyTable from "./MyTable";
import AddOneBug from "./AddOneBug";
import Solve from "./Solve";
import Details from "./Details";
export default {
  name: "bug",
  components: {
    MyTable,
    AddOneBug,
    Solve,
    Details
  },
  data() {
    return {
      bjrw: false,
      zpg: false,
      xq: false,
      isShow: false,
      show: true,
      content: null,

      project: "",
      state: "",
      title: "",
      author: "",
      url: "",
      assignArr: [],
      pageNo: 1,
      pageSize: 10,
      count: 0,
      pageSizeOpts: [10, 20, 30, 40, 50],
      limit: 10,
      type: "",
      cityList3: [
        {
          value: "项目1",
          label: "项目1"
        },
        {
          value: "项目2",
          label: "项目2"
        }
      ],

      stateArr: [
        {
          value: "待处理",
          label: "待处理"
        },
        {
          value: "待回测",
          label: "待回测"
        },
        {
          value: "未解决",
          label: "未解决"
        },
        {
          value: "已解决",
          label: "已解决"
        },
        {
          value: "已关闭",
          label: "已关闭"
        },
        {
          value: "被延期",
          label: "被延期"
        }
      ]
    };
  },
  created() {
    this.$axios
      .get("/api/person/user")
      .then(res => {
        if (res.data.result) {
          let data = res.data.data;
          this.assignArr = data.map(item => {
            return {
              value: item.name,
              label: item.name
            };
          });
        } else {
          this.$Message["error"]({
            background: true,
            content: "数据请求失败！"
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  mounted() {
    let author = this.$store.state.user.info;
    this.author = author.name;
    this.url = author.url;
    this.getData();
  },
  methods: {
    getData(type, pageNo) {
      //初始化页数
      if (pageNo) {
        this.pageNo = pageNo;
      }
      if (type || type === "") {
        this.type = type;
      }
      // this.$Message.loading({
      //   content: "加载中，请稍后...",
      //   duration: 0
      // });
      let data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      switch (this.type) {
        case "指派给我":
          data.assign = this.author;
          break;
        case "指派他人":
          data.mark = this.author;
          break;
        case "由我创建":
          data.author = this.author;
          break;
        default:
          break;
      }

      if (this.state) {
        data.state = this.state;
      }
      if (this.title) {
        data.title = this.title;
      }
      if (this.project) {
        data.project = this.project;
      }
      this.$axios.get("/api/task", { params: data }).then(res => {
        if (res.data.result) {
          let content = res.data.list;
          this.count = res.data.total * 1;
          this.$refs.table.setData(content);
          // this.$emit("on-detail", { data: this.bidData, mark: true });
        } else {
          this.$Message["error"]({
            background: true,
            content: "数据请求失败！"
          });
        }
      });
    },
    changePage(event) {
      this.pageNo = event;
      this.getData();
    },
    changeSizePage(event) {
      this.pageSize = event;
      this.getData();
    },
    handleShow(val) {
      this.isShow = val;
    },
    onChange(val) {
      switch (val) {
        case "a":
          break;
        case "b":
          this.bjrw = false;
          break;
        case "c":
          this.zpg = false;
          break;
        case "d":
          this.xq = false;
          break;

        default:
          break;
      }
      this.getData();
    },
    onTableChange(val) {
      this.$Message.destroy();
      this.content = null;
      switch (val.mark) {
        case "a":
          this.content = val.data;
          this.handleShow(true);
          break;
        case "b":
          this.content = val.data;
          this.bjrw = true;
          break;
        case "c":
          this.content = val.data;
          this.zpg = true;
          break;
        case "d":
          this.content = val.data;
          this.xq = true;
          break;
        default:
          this.bjrw = true;
          break;
      }
    },
    getReset(val) {
      if (val.bid) {
        let data = {
          state: "待回测"
        };
        this.$axios
          .put("/api/task", this.$qs.stringify({ bid: val.bid, data }))
          .then(res => {
            if (res.data.result) {
              this.$Message["success"]({
                background: true,
                content: "状态更新成功！"
              });
              this.getData();
              this.handleShow(false);
            } else {
              this.$Message["error"]({
                background: true,
                content: "状态更新失败！"
              });
            }
            // this.$router.push({ path: "/Artlist" });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
    // setIsShow() {
    //   this.$store.commit("setOneBugIsShow", true);
    // }
  }
};
</script>
<style lang="scss" scoped>
.content {
  .query {
    background: #fcfcfc;
    padding: 10px 16px;
    box-shadow: 0 1px 0 0 #e3e9ed;
    display: flex;
    justify-content: space-between;

    .select {
      display: flex;
      align-items: center;
      .ivu-select {
        margin-right: 20px;
      }
      label {
        padding: 5px 10px;
        background: #f7f9fa;
        height: 32px;
        border: 1px solid #dcdee2;
        border-right: 0px;
      }
    }
    .handle {
      display: flex;
      align-items: center;
      > div {
        margin-left: 10px;
      }
    }
  }
  .warp {
    padding: 15px;
  }
  .page-warp {
    display: flex;
    justify-content: center;
    padding: 15px;
    margin-top: 20px;
    border-top: 1px solid #eee;
  }
}
</style>

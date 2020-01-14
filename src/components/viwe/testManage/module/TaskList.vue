<template>
  <div class="content">
    <div class="query">
      <div class="select">
        <label>项目</label>
        <Select v-model="project"  clearable @on-change="getData" style="width:100px">
          <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <label>状态</label>
        <Select v-model="state"  clearable @on-change="getData" style="width:100px">
          <Option v-for="item in stateArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="handle">
        <Input
          v-model="title"
          search
          enter-button
          @on-search="getData"
          placeholder="请输入任务标题..."
        />
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
          <Button type="success" ghost @click.stop="setOneBugIsShow">+ 新建任务</Button>
        </div>
      </div>
    </div>
    <div class="warp">
      <!-- 表格 -->
      <MyTable ref="table"/>
      <!-- 新建Bug -->
      <AddOneBug @on-change="getData"/>
      <!-- 解决Bug -->
      <Solve />
      <!-- 详情 -->
      <Details />
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
      project:"",
      state:"",
      title:"",
      author:"",
      content:[],
      cityList3: [
        {
          value: "默认全部",
          label: "默认全部"
        },
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
          value: "默认全部",
          label: "默认全部"
        },
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
      ],
      pageNo:1,
      pageSize:15,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    
    getData() {
      console.log();
      
      this.$Message.loading({
        content: "加载中，请稍后...",
        duration: 0
      });
      let data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      if (this.author) {
        data.author = this.author;
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
          this.content = res.data.list;
          this.$refs.table.setData(this.content);
          // this.$emit("on-detail", { data: this.bidData, mark: true });
        } else {
          this.$Message["error"]({
            background: true,
            content: "数据请求失败！"
          });
        }
        this.$Message.destroy();
      });
    },
    handleQuery() {
      this.$emit("on-query", {
        author: this.authorVal,
        publish: this.publishVal,
        title: this.titleVal,
        class: this.classVal
      });
    },

    setOneBugIsShow() {
      this.$store.commit("setOneBugIsShow", true);
    }
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
}
</style>

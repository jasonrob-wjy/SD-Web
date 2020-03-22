<template>
  <Layout>
    <!-- collapsible -->
    <Sider :collapsed-width="78" v-model="isCollapsed" :style="{background: '#fff'}">
      <Menu active-name="1-0" theme="light" width="auto" :class="menuitemClasses">
        <MenuItem name="1-0" @click.native="onQuery('',true)">
          <!-- <i class="fa fa-pie-chart"></i> -->
          <span>全部组件（{{typeCount}}）</span>
        </MenuItem>
        <MenuItem
          v-for="(item,i) in typeArr"
          :key="i+'q'"
          :name="'1-'+(i+1)"
          @click.native="onQuery(item.type,true)"
        >
          <!-- <i class="fa fa-pie-chart"></i> -->
          <span>{{item.type}}（{{item.count}}）</span>
        </MenuItem>
      </Menu>
    </Sider>
    <Layout>
      <div class="content-right">
        <ChartList ref="chart" @on-change="onChange" @on-page="onPage" @on-query="onQuery" />
      </div>
    </Layout>
  </Layout>
</template>

<script>
import ChartList from "./module/ChartList";
export default {
  name: "temmain",
  components: {
    ChartList
  },
  data() {
    return {
      isCollapsed: false,
      isOk: true,
      pageNo: 1,
      pageSize: 18,
      typeVal: "",
      content: [],
      typeCount: 0,
      typeArr: []
    };
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  created() {
    this.$axios
      .get("/api/template/chart/type")
      .then(res => {
        if (res.data.result) {
          this.typeArr = res.data.type;
          this.typeCount = res.data.count;
          //传递到子组件
          let chart = this.$refs.chart;
          chart.setData(
            this.content,
            this.typeArr,
            this.content.length !== this.total
          );
        } else {
          this.$Message["error"]({
            background: true,
            content: "数据请求失败！"
          });
        }

        // this.$router.push({ path: "/Artlist" });
      })
      .catch(function(error) {
        console.log(error);
      });
    this.getData({});
  },
  methods: {
    onQuery(obj, mark) {
      this.pageNo = 1;
      if (mark) {
        this.typeVal = obj;
        this.getData({});
      } else {
        this.getData(obj);
      }
    },
    onChange() {
      this.getData({});
    },
    onPage(page) {
      this.pageNo = page;
      this.getData({}, "page");
    },
    getData(obj, page) {
      this.$Message.destroy();
      this.$Message.loading({
        content: "加载中，请稍后...",
        duration: 0
      });
      if (this.isOk) {
        this.isOk = false;
        let data = {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        };

        if (obj.author) {
          data.author = obj.author;
        }
        if (obj.publish) {
          data.publish = obj.publish;
        }
        if (obj.title) {
          data.title = obj.title;
        }
        if (this.typeVal) {
          data.type = this.typeVal;
        }
        this.$axios
          .get("/api/template/chart", { params: data })
          .then(res => {
            if (res.data.result) {
              if (page === "page") {
                this.content = [...this.content, ...res.data.list];
              } else {
                this.content = res.data.list;
              }
              //传递到子组件
              this.total = res.data.total;
              let chart = this.$refs.chart;
              chart.setData(
                this.content,
                this.typeArr,
                this.content.length !== this.total,
                this.pageNo
              );
              this.$Message.destroy();
            } else {
              this.$Message["error"]({
                background: true,
                content: "数据请求失败！"
              });
            };
            this.isOk = true;
            // this.$router.push({ path: "/Artlist" });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    setOneBugIsShow() {
      this.$store.commit("setOneBugIsShow", true);
    }
  }
};
</script>
<style lang="scss">
.ivu-layout-sider-children {
  overflow-y: auto;
}
</style>

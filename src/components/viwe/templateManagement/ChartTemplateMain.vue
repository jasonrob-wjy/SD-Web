<template>
  <div class="content">
    <div class="left">
      <h2>默认主题</h2>
      <div style="padding:5px;">
        <Select v-model="typeVal" clearable @on-change="onQuery">
          <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <h2>图表类型</h2>
      <ul>
        <li :class="[!typeVal?'active':'']" @click="onQuery('',true)">默认全部（{{typeCount}}）</li>
        <li
          v-for="(item,i) in typeArr"
          :key="i+'q'"
          :class="[typeVal===item.type?'active':'']"
          @click="onQuery(item.type,true)"
        >{{item.type}}（{{item.count}}）</li>
      </ul>
    </div>
    <div class="right">
      <ChartList ref="chart" @on-change="onChange" @on-page="onPage" @on-query="onQuery" />
    </div>
  </div>
</template>

<script>
// import pie from "./module/pie";
// import MyTable from "./module/MyTable";
// import AddOneBug from "./module/AddOneBug";
// import Solve from "./module/Solve";
import ChartList from "./module/ChartList";
export default {
  name: "temmain",
  components: {
    // pie,
    // MyTable,
    // AddOneBug,
    // Solve,
    ChartList
  },
  data() {
    return {
      cityList3: [
        {
          value: "项目1",
          label: "项目1"
        }
      ],
      cityList4: [
        {
          value: "默认全部",
          label: "默认全部"
        }
      ],
      cityList5: [
        {
          value: "默认全部",
          label: "默认全部"
        }
      ],
      pageNo: 1,
      pageSize: 12,
      typeVal: "",
      content: [],
      typeCount: 0,
      typeArr: []
    };
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
    },
    setOneBugIsShow() {
      this.$store.commit("setOneBugIsShow", true);
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  .left,
  .right {
    background-color: #fff;
    border: 1px solid #eee;
  }
  .left {
    width: 15%;
    padding: 0 8px;
    margin-right: 10px;
    h2 {
      font-size: 18px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    ul {
      li {
        padding: 10px;
        cursor: pointer;
        color: #005980;
        position: relative;
        border-bottom: 1px solid #eee;
      }
    }
  }
  .active {
    color: #fe7300 !important;
  }
  .active::after {
    position: absolute;
    display: block;
    content: "";
    top: 10px;
    right: -33px;
    width: 0;
    height: 0;
    // z-index: 100;
    border-top: 12px solid transparent;
    border-right: 12px solid #fff;
    border-bottom: 12px solid transparent;
  }
  .right {
    //  padding: 20px;
    width: 85%;
  }
  .warp {
    padding: 10px;
  }
}
</style>

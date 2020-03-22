<template>
  <div>
    <div class="query">
      <div class="select">
        <label>编辑</label>
        <Select v-model="authorVal" clearable @on-change="handleQuery" style="width:90px">
          <Option v-for="item in cityList1" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
        <label>状态</label>
        <Select v-model="publishVal" clearable @on-change="handleQuery" style="width:90px">
          <Option v-for="(item,i) in cityList2" :value="item.value" :key="i+'s'">{{ item.name }}</Option>
        </Select>
      </div>
      <div class="search-mar">
        <Input
          v-model="titleVal"
          search
          enter-button
          @on-search="handleQuery"
          placeholder="请输入图表名称..."
        />
        <Button type="success" ghost @click.stop="setIsShow(false)">+ 新建图表</Button>
      </div>
    </div>
    <div v-if="content.length">
      <div class="content">
        <Card v-for="item in content" :key="item.bid">
          <p slot="title">
            <span
              v-if="item.author===author"
              class="isBj"
              @click.stop="setIsShow(item.bid)"
            >{{item.title}}</span>
            <span v-else>{{item.title}}</span>
          </p>
          <div slot="extra" class="author">
            <img :src="$url+'/'+item.url" />
            <span>{{item.author}}</span>
          </div>

          <div class="img-warp">
            <div class="img-box">
              <img :src="$url+'/'+item.imgSrc" />
            </div>

            <!-- 根据角色分配操作按钮 开始 -->
            <div class="shade" v-if="item.publish==='yes'">
              <p v-if="item.chartClass==='0'">
                <a href="javascript:void(0);" @click="handleDownload(item.bid)">使用</a>
                <a href="javascript:void(0);" @click="handleRouter(item.bid)">编辑</a>
              </p>
              <p v-else>
                <a href="javascript:void(0);" @click="handleDownload(item.bid)">查看使用</a>
              </p>
            </div>
            <div class="shade" v-else>
              <p v-if="item.author===author">
                <a href="javascript:void(0);" @click.stop="setIsShow(item.bid)">我要发布</a>
              </p>
              <p class="no-publish" v-else>
                <span href="javascript:void(0);">发布中...</span>
              </p>
            </div>
            <!-- 根据角色分配操作按钮 结束 -->

            <p class="edit">
              <span>
                <i class="fa fa-calendar"></i>
                {{item.date}}
              </span>
              <span>
                <i class="fa fa-eye"></i>
                {{item.look}}
              </span>
              <span>
                <i class="fa fa-cubes"></i>
                {{item.type}}
              </span>
              <!-- <router-link :to="{ path: '/components_api/add/editor', query: { }}">编辑</router-link> -->
            </p>
          </div>
        </Card>
      </div>
      <div class="load-more" @click="handleMore" v-if="mark">
        <p>
          <Icon type="ios-arrow-dropdown" size="18" />
          <span>加载更多</span>
          <Icon type="ios-arrow-dropdown" size="18" />
        </p>
      </div>
      <div v-else class="load-more">
        <p>
          <span>没有更多啦！</span>
        </p>
      </div>
    </div>
    <!-- 加载动画 -->
    <div v-else class="web-box demo-spin-col">
      <i class="fa fa-spinner fa-pulse"></i>
    </div>
    <!-- echarts使用弹出框 -->
    <Modal v-if="bidData.chartClass==='0'" v-model="isDown" footer-hide width="60%">
      <p slot="header">
        图谱
        <span style="color:#f60;margin-right:5px;">{{bidData.title}}</span>使用
      </p>
      <Tabs type="card" :animated="false" name="tab1">
        <TabPane label="Js版本" tab="tab1" index="1">
          <JsEdition :content="bidData" />
        </TabPane>
        <TabPane label="Vue版本" tab="tab1" index="2">
          <VueEdition :content="bidData" />
        </TabPane>
        <TabPane label="Option配置" tab="tab1" index="3">
          <OptionEdition :content="bidData" />
        </TabPane>

        <TabPane label="Api接口" tab="tab1" index="4">
          <ApiEdition :content="bidData" style="height:450px" />
        </TabPane>
        <TabPane v-if="bidData.theme" label="Theme配置" tab="tab1">
          <ThemeEdition :content="bidData" />
        </TabPane>
        <TabPane label="使用说明" tab="tab1" v-if="bidData.explain">
          <div v-html="bidData.explain"></div>
        </TabPane>
      </Tabs>
    </Modal>
    <!-- 非echarts使用弹出框 -->
    <Modal v-else v-model="isDown" footer-hide width="60%">
      <p slot="header">
        图谱
        <span style="color:#f60;margin-right:5px;">{{bidData.title}}</span>查看使用
      </p>
      <Tabs type="card" :animated="false" name="tab1">
        <TabPane label="图谱源码" tab="tab1">
          <AceEditor :content="bidData.option" lang="javascript" style="height:385px" />
        </TabPane>
        <TabPane label="Api数据" tab="tab1">
          <AceEditor :content="bidData.data" lang="javascript" style="height:385px" />
        </TabPane>
        <TabPane label="使用说明" tab="tab1">
          <div v-html="bidData.explain"></div>
        </TabPane>
      </Tabs>
    </Modal>
    <!-- 新建Bug -->
    <AddChart :typeArr="typeArr" ref="addChart" @on-change="onChange" />
  </div>
</template>

<script>
import JsEdition from "./JsEdition";
import VueEdition from "./VueEdition";
import OptionEdition from "./OptionEdition";
import ApiEdition from "./ApiEdition";
import ThemeEdition from "./ThemeEdition";
import AceEditor from "./AceEditor";
import AddChart from "./AddChart";
// import EchartsEdition from "./EchartsEdition";
export default {
  name: "chartlist",
  components: {
    JsEdition,
    VueEdition,
    OptionEdition,
    AddChart,
    ThemeEdition,
    AceEditor,
    ApiEdition
    // EchartsEdition
  },
  data: () => ({
    isDown: false,
    mark: true,
    author: "",
    page: 1,
    content: [],
    typeArr: [],
    cityList1: [],
    cityList2: [
      { name: "已发布", value: "yes" },
      { name: "待发布", value: "no" }
    ],
    bid: "",
    authorVal: "",
    publishVal: "",
    class: "", //通过类型判断 page 是否置1
    titleVal: "",
    bidData: {}
  }),
  props: {
    msg: String
  },
  mounted() {
    this.author = this.$store.state.variable.user.name;
    this.$axios
      .get("/api/person/user")
      .then(res => {
        if (res.data.result) {
          this.cityList1 = res.data.data;
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
  methods: {
    handleDownload(bid) {
      this.isDown = !this.isDown;
      if (this.isDown) {
        this.getBidData(bid);
      }
    },
    //使用相关
    getBidData(bid) {
      this.bid = bid;
      this.$axios.get("/api/template/chart", { params: { bid } }).then(res => {
        if (res.data.result) {
          this.bidData = res.data.content;
        } else {
          this.$Message["error"]({
            background: true,
            content: "数据请求失败！"
          });
        }
      });
    },
    handleQuery() {
      this.$emit("on-query", {
        author: this.authorVal,
        publish: this.publishVal,
        title: this.titleVal
      });
    },
    //编辑列表数据
    setIsShow(bid) {
      this.$store.commit("setOneBugIsShow", true);
      if (bid) {
        this.$refs.addChart.getBidData(bid);
      }
    },
    //获取从父级传过来的列表数据
    setData(data, type, mark, page) {
      this.page = page;
      this.mark = mark;
      this.typeArr = type.map(item => {
        return item.type;
      });
      this.content = data;
    },
    //路由跳转
    handleRouter(bid) {
      this.$router.push({
        path: "/template/edition",
        query: { bid }
      });
    },
    //新建窗口关闭
    onChange() {
      this.$emit("on-change");
    },
    //分页查询
    handleMore() {
      this.page = this.page + 1;
      this.$emit("on-page", this.page);
    }
  }
};
</script>

<style lang="scss" scoped>
.query {
  background: #fcfcfc;
  padding: 10px 16px;
  box-shadow: 0 1px 0 0 #e3e9ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .search-mar {
    display: flex;
    align-items: center;
    > button {
      margin-left: 20px;
    }
  }
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
}

.load-more {
  text-align: center;
  padding: 15px 16px;
  margin-bottom: 20px;
  border-top: 1px solid #eee;
  cursor: pointer;
  span {
    font-size: 15px;
    margin: 0 5px;
  }
}
.load-more:hover {
  color: #19be6b;
}
.content {
  display: flex;
  flex-wrap: wrap;
  padding: 12px;
  > div {
    margin: 8px;
  }
  .author {
    display: flex;
    align-items: center;
    img {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
  .isBj {
    cursor: pointer;
    color: #19be6b;
  }
  .img-warp {
    position: relative;
    overflow: hidden;
    .img-box {
      display: flex;
      width: 250px;
      height: 170px;
      padding: 2px;
      align-items: center;
      img {
        width: 100%;
        // border: 1px solid #dfdfdf;
      }
    }

    .shade p {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease;
      a {
        color: #fff;
        border: 1px solid #fff;
        border-radius: 5px;
        padding: 5px 12px;
        z-index: 10;
        transition: all 0.3s ease;
        transform: scale(0);
        margin: 18px;
      }
      a:nth-child(1) {
        background: #2db7f5;
      }
      a:nth-child(2) {
        background: #19be6b;
      }
    }
    .shade:hover p {
      background: rgba(253, 252, 252, 0.2);
      a {
        transform: scale(1);
      }
    }
    .no-publish {
      // opacity: 0.5;
      background-color: rgba(255, 255, 255, 0.5);
      span {
        color: #fff;
        opacity: 0.9;
        border: 1px solid #fff;
        background: #fa785e;
        border-radius: 5px;
        padding: 5px 12px;
      }
    }
    .edit {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      padding: 10px;
      background: rgba(0, 0, 0, 0.4);
      transition: all 0.2s ease;
      transform: translate(0, 42px);
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      span {
        color: #fff;
        i {
          margin-right: 5px;
        }
      }
    }
  }
  .img-warp:hover {
    .edit {
      transform: translate(0px);
    }
  }
}

</style>
<style lang="scss" >
.ivu-card-head {
  padding: 10px;
  line-height: 0;
  p {
    color: #666;
    font-size: 14px;
  }
}
.ivu-card-body {
  padding: 3px;
}
.ivu-card-extra {
  right: 12px;
  top: 7px;
  color: #999;
  cursor: pointer;
}
.ivu-tabs-bar {
  margin-bottom: 0;
}
.ivu-tabs-bar {
  border-bottom: 0px;
}
.ivu-tabs-content {
  border: 1px solid #dcdee2;
}
.ivu-tabs-tabpane {
  padding: 12px;
}
body .ivu-modal-fullscreen {
  margin-bottom: 0px;
  top: 0px;
}
</style>

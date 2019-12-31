<template>
  <div>
    <div class="query">
      <div class="select">
        <label>编辑者</label>
        <Select v-model="model1" style="width:150px">
          <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="search-mar">
        <Input search enter-button placeholder="请输入图表名称..." />
        <Button type="success" ghost @click.stop="setIsShow">+ 新建图表</Button>
      </div>
    </div>
    <div class="content">
      <Card>
        <p slot="title">折线图谱</p>
        <span slot="extra">编辑：zll</span>
        <div class="img-warp">
          <img
            src="https://echarts.baidu.com/ecg-storage/ec_gallery_thumbnail/area-stack.png?v=1461575559876"
          />
          <div class="shade">
            <a href="javascript:void(0);" @click="handleDownload">下载</a>
            <a href="javascript:void(0);" @click="handleRouter">编辑</a>
          </div>
          <p class="edit">
            <span>
              <i class="fa fa-calendar"></i>2019-3-12
            </span>
            <span>
              <i class="fa fa-eye"></i>3423
            </span>
            <span>
              <i class="fa fa-cubes"></i>柱状图谱
            </span>
            <!-- <router-link :to="{ path: '/components_api/add/editor', query: { }}">编辑</router-link> -->
          </p>
        </div>
      </Card>
      <Card>
        <p slot="title">收到</p>
        <span slot="extra">作者：zll</span>
        <div class="img-warp">
          <img
            src="https://echarts.baidu.com/ecg-storage/ec_gallery_thumbnail/area-stack.png?v=1461575559876"
          />
          <div class="shade">
            <a href="javascript:void(0);" @click="handleDownload">下载</a>
            <a href="item.source_url" target="_blank">编辑</a>
          </div>
          <p class="edit">
            <span>
              <i class="fa fa-calendar"></i>2019-3-12
            </span>
            <span>
              <i class="fa fa-eye"></i>3423
            </span>
            <span>
              <i class="fa fa-cubes"></i>柱状图谱
            </span>
          </p>
        </div>
      </Card>
      <Card>
        <p slot="title">收到</p>
        <span slot="extra">作者：zll</span>
        <div class="img-warp">
          <img
            src="https://echarts.baidu.com/ecg-storage/ec_gallery_thumbnail/area-stack.png?v=1461575559876"
          />
          <div class="shade">
            <a href="javascript:void(0);" @click="handleDownload">下载</a>
            <a href="item.source_url" target="_blank">编辑</a>
          </div>
          <p class="edit">
            <span>
              <i class="fa fa-calendar"></i>2019-3-12
            </span>
            <span>
              <i class="fa fa-eye"></i>3423
            </span>
            <span>
              <i class="fa fa-cubes"></i>柱状图谱
            </span>
          </p>
        </div>
      </Card>
      <Card>
        <p slot="title">收到</p>
        <span slot="extra">作者：zll</span>
        <div class="img-warp">
          <img
            src="https://echarts.baidu.com/ecg-storage/ec_gallery_thumbnail/area-stack.png?v=1461575559876"
          />
          <div class="shade">
            <a href="javascript:void(0);" @click="handleDownload">下载</a>
            <a href="item.source_url" target="_blank">编辑</a>
          </div>
          <p class="edit">
            <span>
              <i class="fa fa-calendar"></i>2019-3-12
            </span>
            <span>
              <i class="fa fa-eye"></i>3423
            </span>
            <span>
              <i class="fa fa-cubes"></i>柱状图谱
            </span>
          </p>
        </div>
      </Card>
      <Card>
        <p slot="title">收到</p>
        <span slot="extra">编辑：zll</span>
        <div class="img-warp">
          <img
            src="https://echarts.baidu.com/ecg-storage/ec_gallery_thumbnail/area-stack.png?v=1461575559876"
          />
          <div class="shade">
            <a href="javascript:void(0);" @click="handleDownload">下载</a>
            <a href="item.source_url" target="_blank">编辑</a>
          </div>
          <p class="edit">
            <span>
              <i class="fa fa-calendar"></i>2019-3-12
            </span>
            <span>
              <i class="fa fa-eye"></i>3423
            </span>
            <span>
              <i class="fa fa-cubes"></i>柱状图谱
            </span>
          </p>
        </div>
      </Card>
      <Card>
        <p slot="title">收到</p>
        <span slot="extra">作者：zll</span>
        <div class="img-warp">
          <img
            src="https://echarts.baidu.com/ecg-storage/ec_gallery_thumbnail/area-stack.png?v=1461575559876"
          />
          <div class="shade">
            <a href="javascript:void(0);" @click="handleDownload">下载</a>
            <a href="javascript:void(0);" @click="handleRouter">编辑</a>
          </div>
          <p class="edit">
            <span>
              <i class="fa fa-calendar"></i>2019-3-12
            </span>
            <span>
              <i class="fa fa-eye"></i>3423
            </span>
            <span>
              <i class="fa fa-cubes"></i>柱状图谱
            </span>
          </p>
        </div>
      </Card>
    </div>
    <!-- 弹出框 -->
    <Modal v-model="isDown" footer-hide width="60%">
      <p slot="header">
        <span style="color:#f60;margin-right:5px;">xxx</span>图谱下载
      </p>
      <Tabs type="card" :animated="false" name="tab1">
        <TabPane label="Js版本" tab="tab1">
          <JsEdition />
        </TabPane>
        <TabPane label="Vue版本" tab="tab1">
          <VueEdition />
        </TabPane>
        <TabPane label="Option配置" tab="tab1">
          <OptionEdition />
        </TabPane>
        <TabPane label="Api接口" tab="tab1">
          <ApiEdition />
        </TabPane>
      </Tabs>
    </Modal>
    <!-- 新建Bug -->
    <AddChart />
  </div>
</template>

<script>
import JsEdition from "./JsEdition";
import VueEdition from "./VueEdition";
import OptionEdition from "./OptionEdition";
import ApiEdition from "./ApiEdition";
import AddChart from "./AddChart";
// import EchartsEdition from "./EchartsEdition";
export default {
  name: "chartlist",
  components: {
    JsEdition,
    VueEdition,
    OptionEdition,
    AddChart,
    ApiEdition
    // EchartsEdition
  },
  data: () => ({
    isDown: false,
    pageNo: 1,
    pageSize: 10
  }),
  props: {
    msg: String
  },
  created() {
    let data = {
      pageNo: this.pageNo,
      pageSize: this.pageSize
    };
    this.$axios
      .get("/api/template/chart", {
        params: {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      })
      .then(res => {
        if (res.data.result) {
          console.log(res);
          
          // this.$Message["success"]({
          //   background: true,
          //   content: "数据提交成功！"
          // });
        } else {
          // this.$Message["error"]({
          //   background: true,
          //   content: "数据上传失败！"
          // });
        }

        // this.$router.push({ path: "/Artlist" });
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    handleDownload() {
      this.isDown = !this.isDown;
    },
    setIsShow() {
      this.$store.commit("setOneBugIsShow", true);
    },
    handleRouter() {
      this.$router.push({
        path: "/template/edition",
        query: { userId: 123456789 }
      });
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

.content {
  display: flex;
  flex-wrap: wrap;
  padding: 12px;
  > div {
    margin: 8px;
  }
  .img-warp {
    position: relative;
    overflow: hidden;
    img {
      width: 250px;
      height: 185px;
      padding: 2px;
      // border: 1px solid #dfdfdf;
    }
    .shade {
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
      }
      a:nth-child(1) {
        margin-right: 30px;
        background: #2db7f5;
      }
      a:nth-child(2) {
        margin-right: 10px;
        background: #19be6b;
      }
    }
    .shade:hover {
      background: rgba(253, 252, 252, 0.2);
      a {
        transform: scale(1);
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
  top: 11px;
  color: #999;
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
<template>
  <div>
    <div class="query">
      <div class="select">
        <label>创建者</label>
        <Select v-model="authorVal" clearable @on-change="handleQuery" style="width:90px">
          <Option v-for="item in cityList1" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
        <label>类别</label>
        <Select v-model="classVal" clearable @on-change="handleQuery" style="width:90px">
          <Option v-for="(item,i) in cityList3" :value="item" :key="i+'h'">{{ item }}</Option>
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
          placeholder="请输入组件名称..."
        />
        <Button type="success" ghost @click.stop="setIsShow(false)">+ 新建组件</Button>
      </div>
    </div>
    <div class="content">
      <div v-for="item in content" :key="item.bid" class="item">
        <div class="img-warp">
          <div class="img-box">
            <img :src="$url+'/'+item.imgSrc" />
            <!-- 根据角色分配操作按钮 开始 -->
            <div class="shade" v-if="item.publish==='yes'">
              <p>
                <a href="javascript:void(0);" @click="getBidData(item.bid)">查看详情</a>
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
          </div>

          <div class="jieshi">
            <div>
              <span
                v-if="item.author===author"
                class="isBj"
                @click.stop="setIsShow(item.bid)"
              >{{item.title}}</span>
              <span v-else>{{item.title}}</span>
            </div>
            <p>
              <span>{{item.brief}}</span>
            </p>
          </div>
          <div class="edit">
            <span>
              <i class="fa fa-calendar"></i>
              {{item.date}}
            </span>
            <span>
              <i class="fa fa-eye"></i>
              {{item.look}}
            </span>
            <span class="author-img">
              <img :src="$url+'/'+item.url" />
              <span>{{item.author}}</span>
            </span>
            <!-- <router-link :to="{ path: '/components_api/add/editor', query: { }}">编辑</router-link> -->
          </div>
        </div>
      </div>
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
    <!-- 新建Bug -->
    <AddComponent :typeArr="typeArr" :classArr="cityList3" ref="addChart" @on-change="onChange" />
  </div>
</template>

<script>
import AddComponent from "./AddComponent";

export default {
  name: "chartlist",
  components: {
    AddComponent
  },
  data: () => ({
    isDetail: true,
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
    cityList3: [],
    bid: "",
    authorVal: "",
    classVal: "",
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
    // handleDownload(bid) {
    //  /components/details
    // },
    //使用相关
    getBidData(bid) {
      this.bid = bid;
      this.$axios
        .get("/api/template/component", { params: { bid } })
        .then(res => {
          if (res.data.result) {
            this.bidData = res.data.content;
            this.$emit("on-detail", { data: this.bidData, mark: true });
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
        title: this.titleVal,
        class: this.classVal
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
    setData(data, type, mark, page, classArr) {
      this.page = page;
      this.mark = mark;
      this.cityList3 = classArr;
      this.typeArr = type.map(item => {
        return item.type;
      });
      this.content = data;
    },
    //路由跳转
    // handleRouter(bid) {

    //   // this.$router.push({
    //   //   path: "/components/details",
    //   //   query: { bid }
    //   // });
    // },
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
  min-height: 450px;
  > div {
    margin: 7px;
    border-radius: 3px;
  }
  .jieshi {
    padding: 10px;
    border-top: 1px solid #efefef;
    > p {
      color: #2c3e50;
      span {
        height: 42px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    > div {
      margin-bottom: 10px;
      .isBj {
        cursor: pointer;
        color: #19be6b;
      }
    }
  }

  .img-warp {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24), 0 0 2px rgba(0, 0, 0, 0.12);
    width: 260px;
    .img-box {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 2px;
      img {
        width: 100%;
        height: 175px;
      }
    }
    .shade {
      width: 100%;
      height: 100%;
    }
    .shade p {
      position: absolute;
      top: 0px;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
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
  }
  .edit {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #efefef;
    padding: 10px;
    font-size: 14px;
    color: #aaa;
    span {
      // color: #fff;
      i {
        margin-right: 5px;
      }
    }
  }
  .author-img {
    display: flex;
    align-items: center;
    img {
      margin-right: 8px;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
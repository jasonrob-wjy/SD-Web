<template>
  <div>
    <div class="content">
      <div class="left">
        <div class="warp">
          <div class="holder">
            <img
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
            />
            <p>Serati Ma</p>
            <p>海纳百川，有容乃大</p>
          </div>
          <div class="list-row">
            <div>
              <Icon type="ios-briefcase-outline" />
              <span>管理员</span>
            </div>
            <div>
              <Icon type="ios-git-network" />
              <span>产品预测、产品订购</span>
            </div>
            <div>
              <Icon type="ios-pin-outline" />
              <span>北京市</span>
            </div>
            <div>
              <i class="fa fa-calendar-minus-o"></i>
              <span>2019-10-12</span>
            </div>
            <div>
              <Icon type="ios-at-outline" />
              <span>18230086651@163.com</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <Tabs value="name1">
          <TabPane label="任务安排" name="name1">标签一的内容</TabPane>
          <TabPane label="TA的项目" name="name2">标签二的内容</TabPane>
        </Tabs>
      </div>
    </div>

    <!-- <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
      
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow title="操作历史">
          <Table :columns="columns1" :data="data1"></Table>
        </Card>
      </i-col>
    </Row>-->
  </div>
</template>

<script>
export default {
  name: "center",
  components: {},
  data() {
    return {
      columns1: [
        {
          title: "登录设备",
          key: "key1"
        },
        {
          title: "登录时间",
          key: "key2"
        },
        {
          title: "IP地址",
          key: "key3"
        },
        {
          title: "操作行为",
          key: "key4"
        },
        {
          title: "操作内容",
          key: "key5"
        }
      ],
      data1: [
        {
          key1: "John Brown",
          key2: 18,
          key3: "New York No. 1 Lake Park",
          key4: "2016-10-03",
          key5: "sdfvd"
        },
        {
          key1: "Jim Green",
          key2: 24,
          key3: "London No. 1 Lake Park",
          key4: "2016-10-03",
          key5: "sdfvd"
        },
        {
          key1: "Joe Black",
          key2: 30,
          key3: "Sydney No. 1 Lake Park",
          key4: "2016-10-03",
          key5: "sdfvd"
        },
        {
          key1: "Jon Snow",
          key2: 26,
          key3: "Ottawa No. 2 Lake Park",
          key4: "2016-10-03",
          key5: "sdfvd"
        }
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.warp {
  .holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
    }
    p:nth-child(2) {
      margin-bottom: 4px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
    }
  }
  .list-row {
    > div {
      margin: 12px 0;
      i {
        margin-right: 7px;
      }
    }
  }
}
.content {
  padding-top: 10px;
  display: flex;
  .left,
  .right {
    background-color: #fff;
    border: 1px solid #eee;
  }
  h2 {
    font-size: 18px;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
  }
  .left {
    width: 252px;
    padding: 20px;
    margin-right: 10px;

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
     padding: 20px;
    width: 85%;
  }
}
</style>

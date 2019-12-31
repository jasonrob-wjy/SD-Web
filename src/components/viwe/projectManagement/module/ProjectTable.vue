<template>
  <div class="table-warp">
    <ul>
      <li>
        <div class="left">
          <img
            src="https://beta.vilson.xyz/static/upload//20190921/aaaca5d521f9db51e263a32f9044ab4c.png"
            alt
          />
          <div>
            <span>项目23</span>
            <p>生命就像一盒巧克力，结果往往出人意料</p>
          </div>
        </div>
        <ol class="right">
          <li>
            <span>创建日期</span>
            <p>2019-12-16</p>
          </li>
          <li>
            <span>创建人</span>
            <p>zhangsan</p>
          </li>
          <li>
            <span>当前进度</span>
            <div class="progress-outer">
              <em class="progress-bg"></em>
              <span>66.6%</span>
            </div>
          </li>
          <li class="shezhi">
            <Tooltip content="添加成员" placement="top" theme="light">
              <i class="fa fa-user-plus"></i>
            </Tooltip>
            <Tooltip content="移至回收站" placement="top" theme="light">
              <i class="fa fa-trash"></i>
            </Tooltip>
            <Tooltip content="项目设置" placement="top" theme="light">
              <i class="fa fa-gear"></i>
            </Tooltip>
            <Tooltip content="加入收藏" placement="top" theme="light">
              <i class="fa fa-star"></i>
            </Tooltip>
            <!-- <i class="fa fa-star-o" aria-hidden="true"></i> -->
          </li>
        </ol>
      </li>
        <li>
        <div class="left">
          <img
            src="https://beta.vilson.xyz/static/upload//20190921/aaaca5d521f9db51e263a32f9044ab4c.png"
            alt
          />
          <div>
            <span>项目23</span>
            <p>生命就像一盒巧克力，结果往往出人意料</p>
          </div>
        </div>
        <ol class="right">
          <li>
            <span>创建日期</span>
            <p>2019-12-16</p>
          </li>
          <li>
            <span>创建人</span>
            <p>zhangsan</p>
          </li>
          <li>
            <span>当前进度</span>
            <div class="progress-outer">
              <em class="progress-bg"></em>
              <span>66.6%</span>
            </div>
          </li>
          <li class="shezhi">
            <Tooltip content="添加成员" placement="top" theme="light">
              <i class="fa fa-user-plus"></i>
            </Tooltip>
            <Tooltip content="移至回收站" placement="top" theme="light">
              <i class="fa fa-trash"></i>
            </Tooltip>
            <Tooltip content="项目设置" placement="top" theme="light">
              <i class="fa fa-gear"></i>
            </Tooltip>
            <Tooltip content="加入收藏" placement="top" theme="light">
              <i class="fa fa-star"></i>
            </Tooltip>
            <!-- <i class="fa fa-star-o" aria-hidden="true"></i> -->
          </li>
        </ol>
      </li>
        <li>
        <div class="left">
          <img
            src="https://beta.vilson.xyz/static/upload//20190921/aaaca5d521f9db51e263a32f9044ab4c.png"
            alt
          />
          <div>
            <span>项目23</span>
            <p>生命就像一盒巧克力，结果往往出人意料</p>
          </div>
        </div>
        <ol class="right">
          <li>
            <span>创建日期</span>
            <p>2019-12-16</p>
          </li>
          <li>
            <span>创建人</span>
            <p>zhangsan</p>
          </li>
          <li>
            <span>当前进度</span>
            <div class="progress-outer">
              <em class="progress-bg"></em>
              <span>66.6%</span>
            </div>
          </li>
          <li class="shezhi">
            <Tooltip content="添加成员" placement="top" theme="light">
              <i class="fa fa-user-plus"></i>
            </Tooltip>
            <Tooltip content="移至回收站" placement="top" theme="light">
              <i class="fa fa-trash"></i>
            </Tooltip>
            <Tooltip content="项目设置" placement="top" theme="light">
              <i class="fa fa-gear"></i>
            </Tooltip>
            <Tooltip content="加入收藏" placement="top" theme="light">
              <i class="fa fa-star"></i>
            </Tooltip>
            <!-- <i class="fa fa-star-o" aria-hidden="true"></i> -->
          </li>
        </ol>
      </li>
    </ul>

    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="100" :current="1" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns12: [
        {
          title: "项目",
          slot: "name"
        },
        {
          title: "级别",
          slot: "name1"
        },

        {
          title: "Bug标题",
          slot: "name"
        },

        {
          title: "指派给",
          key: "address"
        },
        {
          title: "创建者",
          key: "address"
        },
        {
          title: "创建日期",
          key: "address"
        },
        {
          title: "状态",
          key: "age",
          width: 100
        },
        {
          title: "操作",
          slot: "action",
          width: 120
        }
      ],
      data6: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park"
        }
      ]
    };
  },
  methods: {
    setSolveBugIsShow() {
      this.$store.commit("setSolveBugIsShow", true);
    },
    setOneBugIsShow() {
      this.$store.commit("setOneBugIsShow", true);
    },
    setDetailsIsShow() {
      this.$store.commit("setDetailsIsShow", true);
    }
    // show(index) {
    //   this.$Modal.info({
    //     title: "User Info",
    //     content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
    //   });
    // },
    // remove(index) {
    //   this.data6.splice(index, 1);
    // }
  }
};
</script>
<style lang="scss" scoped>
.table-warp {
  > ul {
    > li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e8e8e8;
      padding: 8px 0px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
     
      .left {
        display: flex;
        img {
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }
        > div {
          span {
            color: #1890ff;
          }
        }
      }
      .right {
        display: flex;
        .shezhi {
          width: 120px;
          padding: 0px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          i{
            cursor: pointer;
          }
        }
        li {
          margin-left: 30px;
          .progress-outer {
            width: 200px;
            background-color: #f5f5f5;
            border-radius: 100px;
            vertical-align: middle;
            position: relative;
            margin-top: 8px;
            span {
              position: absolute;
              right: 0;
              bottom: 2px;
            }
            .progress-bg {
              display: block;
              width: 66.67%;
              height: 5px;
              background-color: #1890ff;
              border-radius: 100px;
            }
          }
        }
      }
    }
  }
}
</style>
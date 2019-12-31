<template>
  <div class="table-warp">
    <ul>
      <li>
        <div class="left">
          <img
            src="https://beta.vilson.xyz/static/upload//20190921/aaaca5d521f9db51e263a32f9044ab4c.png"
            alt
          />
          <div class="item">
            <h3>
              万有引力
              <span>超级管理员</span>
            </h3>
            <p>yoyiorlee@higgses.com</p>
          </div>
        </div>
        <ol class="right">
          <li>
            <span>所在团队</span>
            <p>
              <span>web团队、</span>
              <span>设计团队、</span>
              <span>测试团队</span>
            </p>
          </li>
          <li>
            <span>所在项目</span>
            <p>
              <span>项目1、</span>
              <span>项目2、</span>
              <span>项目3、</span>
            </p>
          </li>
          <li>
            <span>最近登录时间</span>
            <p>2 天前</p>
          </li>
          <li>
            <span>登录IP</span>
            <p>183.14.133.150</p>
          </li>
          <li class="shezhi">
            <Tooltip content="停用账号" placement="top" theme="light">
              <i class="fa fa-user-times"></i>
            </Tooltip>
            <Tooltip content="移至回收站" placement="top" theme="light">
              <svg
                viewBox="64 64 896 896"
                data-icon="user-delete"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                class
              >
                <path
                  d="M678.3 655.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.67 371.67 0 0 0-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 518 759.6 444.7 759.6 362c0-137-110.8-248-247.5-248S264.7 225 264.7 362c0 82.7 40.4 156 102.6 201.1-.4.2-.8.3-1.2.5-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 0 0-80.4 119.5A373.6 373.6 0 0 0 137 901.8a8 8 0 0 0 8 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C357 641.2 432.2 610 512.2 610c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 0 0 8.1.3zM512.2 534c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 0 1 340.5 362c0-45.9 17.9-89.1 50.3-121.6S466.3 190 512.2 190s88.9 17.9 121.4 50.4A171.2 171.2 0 0 1 683.9 362c0 45.9-17.9 89.1-50.3 121.6C601.1 516.1 558 534 512.2 534zM880 772H640c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"
                />
              </svg>
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
          <div class="item">
            <h3>
              万有引力
              <span>超级管理员</span>
            </h3>
            <p>yoyiorlee@higgses.com</p>
          </div>
        </div>
        <ol class="right">
          <li>
            <span>所在团队</span>
            <p>
              <span>web团队、</span>
              <span>设计团队、</span>
              <span>测试团队</span>
            </p>
          </li>
          <li>
            <span>所在项目</span>
            <p>
              <span>项目1、</span>
              <span>项目2、</span>
              <span>项目3、</span>
            </p>
          </li>
          <li>
            <span>最近登录时间</span>
            <p>2 天前</p>
          </li>
          <li>
            <span>登录IP</span>
            <p>183.14.133.150</p>
          </li>
          <li class="shezhi">
            <Tooltip content="停用账号" placement="top" theme="light">
              <i class="fa fa-user-times"></i>
            </Tooltip>
            <Tooltip content="移至回收站" placement="top" theme="light">
              <svg
                viewBox="64 64 896 896"
                data-icon="user-delete"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                class
              >
                <path
                  d="M678.3 655.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.67 371.67 0 0 0-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 518 759.6 444.7 759.6 362c0-137-110.8-248-247.5-248S264.7 225 264.7 362c0 82.7 40.4 156 102.6 201.1-.4.2-.8.3-1.2.5-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 0 0-80.4 119.5A373.6 373.6 0 0 0 137 901.8a8 8 0 0 0 8 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C357 641.2 432.2 610 512.2 610c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 0 0 8.1.3zM512.2 534c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 0 1 340.5 362c0-45.9 17.9-89.1 50.3-121.6S466.3 190 512.2 190s88.9 17.9 121.4 50.4A171.2 171.2 0 0 1 683.9 362c0 45.9-17.9 89.1-50.3 121.6C601.1 516.1 558 534 512.2 534zM880 772H640c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"
                />
              </svg>
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
          <div class="item">
            <h3>
              万有引力
              <span>超级管理员</span>
            </h3>
            <p>yoyiorlee@higgses.com</p>
          </div>
        </div>
        <ol class="right">
          <li>
            <span>所在团队</span>
            <p>
              <span>web团队、</span>
              <span>设计团队、</span>
              <span>测试团队</span>
            </p>
          </li>
          <li>
            <span>所在项目</span>
            <p>
              <span>项目1、</span>
              <span>项目2、</span>
              <span>项目3、</span>
            </p>
          </li>
          <li>
            <span>最近登录时间</span>
            <p>2 天前</p>
          </li>
          <li>
            <span>登录IP</span>
            <p>183.14.133.150</p>
          </li>
          <li class="shezhi">
            <Tooltip content="停用账号" placement="top" theme="light">
              <i class="fa fa-user-times"></i>
            </Tooltip>
            <Tooltip content="移至回收站" placement="top" theme="light">
              <svg
                viewBox="64 64 896 896"
                data-icon="user-delete"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                class
              >
                <path
                  d="M678.3 655.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.67 371.67 0 0 0-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 518 759.6 444.7 759.6 362c0-137-110.8-248-247.5-248S264.7 225 264.7 362c0 82.7 40.4 156 102.6 201.1-.4.2-.8.3-1.2.5-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 0 0-80.4 119.5A373.6 373.6 0 0 0 137 901.8a8 8 0 0 0 8 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C357 641.2 432.2 610 512.2 610c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 0 0 8.1.3zM512.2 534c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 0 1 340.5 362c0-45.9 17.9-89.1 50.3-121.6S466.3 190 512.2 190s88.9 17.9 121.4 50.4A171.2 171.2 0 0 1 683.9 362c0 45.9-17.9 89.1-50.3 121.6C601.1 516.1 558 534 512.2 534zM880 772H640c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"
                />
              </svg>
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
      padding: 15px 0px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      p {
        margin-top: 5px;
      }
      .left {
        display: flex;
        img {
          width: 40px;
          height: 40px;
          border-radius: 100%;
          margin-right: 10px;
        }

        .item {
          h3 {
            font-size: 15px;
            color: #005980;
            transition: all 0.3s;
            cursor: pointer;
            span {
              margin-left: 10px;
              border-radius: 2px;
              padding: 2px 4px;
              font-size: 12px;
              color: #db2828;
              border: 1px solid #f14333;
              font-weight: 400;
            }
          }
          h3:hover {
            color: #40a9ff;
          }
        }
      }
      .right {
        display: flex;

        li {
          margin-left: 30px;
          span {
            color: #999;
          }
          > p,
          > p span {
            font-size: 12px;
            color: #aaa;
          }
        }
      }
      .shezhi {
        width: 70px;
        padding: 0px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 20px;
        i,
        svg {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
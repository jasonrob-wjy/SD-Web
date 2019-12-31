<template>
  <div class="content">
    <div class="left">
      <h2>迭代日志</h2>
      <ul>
        <li class="active">v2.8.6 --- 2019.09.03</li>
        <li>v2.8.6 --- 2019.09.03</li>
        <li>v2.8.6 --- 2019.09.03</li>
        <li>v2.8.6 --- 2019.09.03</li>
        <li>v2.8.6 --- 2019.09.03</li>
      </ul>
    </div>
    <div class="right">
       <h1>2019.09.03 更新说明</h1>
       <div class="article">

       </div>
    </div>
  </div>
</template>

<script>
// import pie from "./module/pie";
// import MyTable from "./module/MyTable";
// import AddOneBug from "./module/AddOneBug";
// import Solve from "./module/Solve";
// import Details from "./module/Details";
export default {
  name: "edition-index",
  components: {
    // pie,
    // MyTable,
    // AddOneBug,
    // Solve,
    // Details
  },
  data() {
    return {
      cityList3: [
        {
          value: "项目1",
          label: "项目1"
        },
        {
          value: "项目2",
          label: "项目2"
        },
        {
          value: "项目3",
          label: "项目3"
        },
        {
          value: "项目4",
          label: "项目4"
        },
        {
          value: "项目5",
          label: "项目5"
        },
        {
          value: "项目6",
          label: "项目6"
        }
      ],
      cityList4: [
        {
          value: "默认全部",
          label: "默认全部"
        },
        {
          value: "指派给我",
          label: "指派给我"
        },
        {
          value: "指派他人",
          label: "指派他人"
        },
        {
          value: "由我创建",
          label: "由我创建"
        }
      ],
      cityList5: [
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
      ]
    };
  },
  methods: {
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
  h2 {
    font-size: 18px;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
  }
  .left {
    width: 15%;
    padding: 0 20px;
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
    //  padding: 20px;
    width: 85%;
    h1{
      text-align: center;
      font-size: 24px;
      margin: 20px;
      margin-bottom: 0px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }
    .article{

    }
  }
}
</style>

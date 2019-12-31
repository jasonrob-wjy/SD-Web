<template>
  <div class="content">
    <div class="left">
      <h2>默认主题</h2>
      <div style="padding:5px;">
        <Select v-model="model1">
          <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
       <h2>图表类型</h2>
      <ul>
        <li class="active">默认全部（130）</li>
        <li>饼状图谱（10）</li>
        <li>柱状图谱（20）</li>
        <li>折线图谱（1）</li>
        <li>力导图谱（20）</li>
        <li>散点图谱</li>
        <li>雷达图谱</li>
        <li>树状图谱</li>
        <li>平行坐标</li>
        <li>主题河流</li>
      </ul>
    </div>
    <div class="right">
     <ChartList/>
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

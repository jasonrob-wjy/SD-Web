<template>
  <div class="content">
    <div class="query">
      <div class="select">
        <label>参与者</label>
        <Select v-model="model1" style="width:150px">
          <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <!-- <label>指派</label>
        <Select v-model="model1" style="width:100px">
          <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <label>状态</label>
        <Select v-model="model1" style="width:100px">
          <Option v-for="item in cityList5" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select> -->
      </div>
      <div class="handle">
        <!-- <div>
          <Dropdown trigger="click" style="margin-left: 20px">
            <Button type="info" ghost>
         
              <Icon type="ios-download-outline" size="18" />导出
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem>导出EXCEL表</DropdownItem>
              <DropdownItem>导出CSV表</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>-->
           <div class="search-mar">
            <Input search enter-button placeholder="请输入项目名..." />
          </div>
        <div>
          <Button type="success" ghost @click.stop="setOneBugIsShow">+ 创建新项目</Button>
        </div>
      </div>
    </div>
    <div class="warp">
       <ProjectTable/>
    </div>
  </div>
</template>

<script>
import ProjectTable from "./module/ProjectTable";

export default {
  name: "peojectlist",
  components: {
    ProjectTable,
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
      ]
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.content {
     border: 1px solid #e3e9ed;
  .query {
    background: #fcfcfc;
    padding: 10px 10px;
    border-bottom: 1px solid #dcdee2;
    display: flex;
    justify-content: space-between;
    .search-mar{
        margin-right: 20px;
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
    .handle {
      display: flex;
      align-items: center;
      > div {
        margin-left: 10px;
      }
    }
  }
  .warp{
      background-color: #fff;
      padding: 10px;
  }
}
</style>

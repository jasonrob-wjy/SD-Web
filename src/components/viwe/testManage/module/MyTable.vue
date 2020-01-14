<template>
  <div>
    <Table border :columns="columns" :data="content" ref="table">
      <template slot-scope="{ row }" slot="title">
        <strong>{{ row.title }}</strong>
      </template>
      <template slot-scope="{ row }" slot="project">
        <p>{{ row.project }}</p>
      </template>
      <template slot-scope="{ row }" slot="level">
        <p>{{ row.level }}</p>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Tooltip content="解决Bug" placement="top" theme="light">
          <!-- <Icon
            type="md-checkbox-outline"
            size="22"
            class="icon-active"
          />-->
          <i class="fa fa-check-square-o fa-lg" @click="setSolveBugIsShow(index)"></i>
        </Tooltip>
        <Tooltip content="编辑Bug" placement="top" theme="light">
          <i class="fa fa-edit fa-lg"></i>
        </Tooltip>
        <Tooltip content="查看详情" placement="top" theme="light">
          <Icon
            type="ios-log-in"
            size="22"
            @click.stop="setDetailsIsShow(index)"
            class="icon-active icon-size"
          />
        </Tooltip>
      </template>
    </Table>

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
      content:[],
      columns: [
        {
          title: "任务标题",
          slot: "title"
        },
        {
          title: "所属项目",
          slot: "project"
        },
        {
          title: "级别",
          slot: "level"
        },
        {
          title: "指派给",
          key: "assign"
        },
        {
          title: "创建者",
          key: "author"
        },
        {
          title: "创建日期",
          key: "date"
        },
        {
          title: "状态",
          key: "state",
          width: 100
        },
        {
          title: "操作",
          slot: "action",
          width: 120
        }
      ],
     
    };
  },
  methods: {
    setData(data){
      this.content = data;
    },
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
.icon-active {
  margin: 0px 5px;
  cursor: pointer;
}
.icon-active:hover {
  color: blue;
}
.icon-size {
  font-weight: 600;
}
</style>
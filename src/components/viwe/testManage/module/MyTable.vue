<template>
  <div>
    <Table border :columns="columns" :data="content" ref="table">
      <!-- <template slot-scope="{ row }" slot="title">
        <strong>{{ row.title }}</strong>
      </template>-->

      <template slot-scope="{ row }" slot="level">
        <p class="p-warp" v-if="row.level==='高'">
          <span class="level l1">{{ row.level }}</span>（急需处理）
        </p>
        <p class="p-warp" v-if="row.level==='中'">
          <span class="level l2">{{ row.level }}</span>（暂缓处理）
        </p>
        <p class="p-warp" v-if="row.level==='低'">
          <span class="level l3">{{ row.level }}</span>（暂不处理）
        </p>
      </template>
      <template slot-scope="{ row }" slot="state">
        <p>{{ row.state }}</p>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Tooltip content="完成任务" placement="top" theme="light">
          <!-- <Icon
            type="md-checkbox-outline"
            size="22"
            class="icon-active"
          />-->
          <i class="fa fa-check-square-o fa-lg" @click="setSolveBugIsShow"></i>
        </Tooltip>
        <Tooltip content="编辑任务" placement="top" theme="light">
          <i class="fa fa-edit fa-lg" @click="setEditorIsShow(row)"></i>
        </Tooltip>
        <Tooltip content="查看详情" placement="top" theme="light">
          <Icon
            type="ios-log-in"
            size="22"
            @click.stop="setDetailsIsShow(row)"
            class="icon-active icon-size"
          />
        </Tooltip>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: [],
      columns: [
        {
          title: "任务标题",
          key: "title"
        },
        {
          title: "所属项目",
          key: "project"
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
          title: "级别",
          slot: "level"
        },
        {
          title: "状态",
          slot: "state"
          // width: 100
        },
        {
          title: "操作",
          slot: "action",
          width: 120
        }
      ]
    };
  },
  methods: {
    setData(data) {
      this.content = data;
    },
    setSolveBugIsShow() {
      this.$store.commit("setSolveBugIsShow", true);
    },
    setEditorIsShow(row) {
      this.$store.commit("setOneBugIsShow", true);
      this.$store.commit("setRowData", row);
    },
    setDetailsIsShow(row) {
      this.$store.commit("setDetailsIsShow", true);
      this.$store.commit("setRowData", row);
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
.p-warp {
  display: flex;
   font-size: 12px;
}
.level {
  display: block;
  padding: 1px 4px;
  margin-bottom: 1px;
  border-radius: 100%;
}
.l1 {
  color: #d50000;
  border: 2px solid #d50000;
}
.l2 {
  color: #ff9800;
  border: 2px solid #ff9800;
}
.l3 {
  color: #2098ee;
  border: 2px solid #2098ee;
}
</style>
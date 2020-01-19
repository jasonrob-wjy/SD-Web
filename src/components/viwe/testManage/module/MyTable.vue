<template>
  <div>
    <Table border :columns="columns" :data="content" ref="table">
      <!-- <template slot-scope="{ row }" slot="title">
        <strong>{{ row.title }}</strong>
      </template>-->

      <template slot-scope="{ row }" slot="level">
        <div class="p-warp" v-if="row.level==='高'">
          <span class="level l1">{{ row.level }}</span>
          <em style="background-color: #d50000;">急需处理</em>
        </div>
        <div class="p-warp" v-if="row.level==='中'">
          <span class="level l2">{{ row.level }}</span>
          <em style="background-color: #ff9800;">暂缓处理</em>
        </div>
        <div class="p-warp" v-if="row.level==='低'">
          <span class="level l3">{{ row.level }}</span>
          <em style="background-color: #2098ee;">暂不处理</em>
        </div>
      </template>
      <template slot-scope="{ row }" slot="state">
        <div class="state">
          <span v-if="row.state==='待处理'" class="fcb1">{{ row.state }}</span>
          <span v-if="row.state==='待回测'" class="fcb2">{{ row.state }}</span>
          <span v-if="row.state==='未解决'" class="fcb3">{{ row.state }}</span>
          <span v-if="row.state==='已解决'" class="fcb4">{{ row.state }}</span>
          <span v-if="row.state==='已关闭'" class="fcb5">{{ row.state }}</span>
        </div>
      </template>
      <template slot-scope="{ row }" slot="action">
        <div class="active">
          <!-- <Tooltip v-if="row.author!==author" content="完成任务" placement="top">
            <Icon type="ios-checkbox-outline" size="20" @click="setSolveBugIsShow" />
          </Tooltip>
          <Tooltip v-if="row.author===author" content="编辑任务" placement="top">
            <Icon type="ios-create-outline" size="22" @click="setEditorIsShow(row)" />
          </Tooltip>-->
          <Tooltip content="解决回测" placement="top">
            <Icon type="ios-repeat" size="24" @click="setResetIsShow(row)" />
          </Tooltip>
          <Tooltip content="指派给" placement="top">
            <Icon type="ios-send-outline" size="24" @click="setSendIsShow(row)" />
          </Tooltip>
          <Tooltip content="编辑任务" placement="top">
            <Icon type="ios-create-outline" size="22" @click="setEditorIsShow(row)" />
          </Tooltip>
          <Tooltip content="查看详情" placement="top">
            <Icon type="ios-paper-outline" size="20" @click.stop="setDetailsIsShow(row)" />
          </Tooltip>
        </div>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      author: "",
      url: "",
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
          title: "创建者",
          key: "author"
        },
        {
          title: "指派给",
          key: "assign"
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
          align: "center",
          width: 150
        }
      ]
    };
  },
  mounted() {
    let author = this.$store.state.user.info;
    this.author = author.name;
    this.url = author.url;
  },
  methods: {
    setData(data) {
      this.content = data;
    },
    setResetIsShow(row) {
      // this.$store.commit("setSolveBugIsShow", true);
      // this.$store.commit("setRowData", row);
      this.$emit("on-change", { mark: "a", data: row });
    },
    setSendIsShow(row) {
      // this.$store.commit("setSolveBugIsShow", true);
      // this.$store.commit("setRowData", row);
      this.$emit("on-change", { mark: "c", data: row });
    },
    setDetailsIsShow(row) {
      // this.$store.commit("setSolveBugIsShow", true);
      // this.$store.commit("setRowData", row);
      this.$emit("on-change", { mark: "d", data: row });
    },
    setEditorIsShow(row) {
      this.$emit("on-change", { mark: "b", data: row });
      // this.$store.commit("setOneBugIsShow", true);
      // this.$store.commit("setRowData", row);
    }
    // setDetailsIsShow(row) {
    //   this.$store.commit("setDetailsIsShow", true);
    //   this.$store.commit("setRowData", row);
    // }
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
  align-items: center;
  em {
    padding: 2px 8px;
    border-radius: 5px;
    font-style: normal;
    color: #fff;
    opacity: 0.7;
    margin-left: 5px;
  }
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
.active {
  width: 100%;
  display: flex;
  justify-content: center;
  i {
    margin: 0 5px;
    font-weight: 500;
    transition: all 0.3s;
  }
  i:hover {
    color: #43a047;
    transform: scale(1.1);
  }
}
.state {
  span {
    padding: 1px 5px;
    display: block;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 600;
  }
  .fcb1 {
    border: 1px solid red;
    color: red;
  }
  .fcb2 {
    border: 1px solid #fdb81b;
    color: #fdb81b;
  }
  .fcb3 {
    border: 1px solid #3cb2ef;
    color: #3cb2ef;
  }
  .fcb4 {
    border: 1px solid #43a047;
    color: #43a047;
  }
  .fcb5 {
    border: 1px solid #aaa;
    color: #aaa;
  }
}
</style>
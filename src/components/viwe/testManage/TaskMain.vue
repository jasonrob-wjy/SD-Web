<template>
  <Layout>
    <Sider :collapsed-width="78" v-model="isCollapsed" :style="{background: '#fff'}">
      <Menu active-name="1-0" theme="light" width="auto" :class="menuitemClasses">
        <MenuItem name="1-0" @click.native="onQuery('',true)">
          <i class="fa fa-pie-component"></i>
          <span>全部任务</span>
        </MenuItem>
        <MenuItem
          v-for="(item,i) in typeArr"
          :key="i+'q'"
          :name="'1-'+(i+1)"
          @click.native="onQuery(item.type,true)"
        >
          <i class="fa fa-pie-component"></i>
          <span>{{item.type}}</span>
        </MenuItem>
      </Menu>
    </Sider>
    <Layout>
      <div class="content-right">
        <!-- <TestList
          v-if="!detail.mark"
          ref="component"
          @on-change="onChange"
          @on-page="onPage"
          @on-query="onQuery"
          @on-detail="onDetail"
        /> -->
        <TaskList ref="task"/>
      </div>
    </Layout>
  </Layout>
</template>

<script>
import TaskList from "./module/TaskList";
export default {
  name: "tasklist",
  components: {
    TaskList
  },
  data() {
    return {
      isCollapsed: false,
      pageNo: 1,
      detail: { mark: false },
      pageSize: 12,
      typeVal: "",
      content: [],
      typeCount: 0,
      typeArr: [
        {
          type: "指派给我",
          count: 5
        },
        {
          type: "指派他人",
          count: 5
        },
        {
          type: "由我创建",
          count: 5
        }
      ],
      classArr: []
    };
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  // created() {
  //   this.$axios
  //     .get("/api/template/component/type")
  //     .then(res => {
  //       if (res.data.result) {
  //         //   this.typeArr = res.data.type;
  //         //   this.typeCount = res.data.count;
  //         //   this.classArr = res.data.classArr;
  //         //   //传递到子组件
  //         //   let component = this.$refs.component;
  //         //   component.setData(
  //         //     this.content,
  //         //     this.typeArr,
  //         //     this.content.length !== this.total,
  //         //     this.pageNo,
  //         //     this.classArr
  //         //   );
  //       } else {
  //         this.$Message["error"]({
  //           background: true,
  //           content: "数据请求失败！"
  //         });
  //       }

  //       // this.$router.push({ path: "/Artlist" });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  //   this.getData({});
  // },
  methods: {
    // onDetail(obj) {
    //   this.detail = obj;
    // },
    // onIsDetail(val) {
    //   this.detail.mark = val;
    //   this.getData({});
    // },
    onQuery(obj, mark) {
      // this.detail.mark = false;
      this.pageNo = 1;
      this.$refs.task.getData(obj)
      // if (mark) {
      //   this.typeVal = obj;
      //   // this.getData({});
      // } else {
      //   // this.getData(obj);
      // }
    },
    // onChange() {
    //   this.getData({});
    // },
    // onPage(page) {
    //   this.pageNo = page;
    //   this.getData({}, "page");
    // },
    // getData(obj, page) {
    //   let data = {
    //     pageNo: this.pageNo,
    //     pageSize: this.pageSize
    //   };

    //   if (obj.author) {
    //     data.author = obj.author;
    //   }
    //   if (obj.publish) {
    //     data.publish = obj.publish;
    //   }
    //   if (obj.title) {
    //     data.title = obj.title;
    //   }
    //   if (obj.class) {
    //     data.class = obj.class;
    //   }
    //   if (this.typeVal) {
    //     data.type = this.typeVal;
    //   }
    //   this.$axios
    //     .get("/api/template/component", { params: data })
    //     .then(res => {
    //       if (res.data.result) {
    //         if (page === "page") {
    //           this.content = [...this.content, ...res.data.list];
    //         } else {
    //           this.content = res.data.list;
    //         }
    //         //传递到子组件
    //         this.total = res.data.total;
    //         let component = this.$refs.component;
    //         component.setData(
    //           this.content,
    //           this.typeArr,
    //           this.content.length !== this.total,
    //           this.pageNo,
    //           this.classArr
    //         );
    //       } else {
    //         this.$Message["error"]({
    //           background: true,
    //           content: "数据请求失败！"
    //         });
    //       }

    //       // this.$router.push({ path: "/Artlist" });
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
    // setOneBugIsShow() {
    //   this.$store.commit("setOneBugIsShow", true);
    // }
  }
};
</script>
<style lang="scss">
.ivu-layout-sider-children {
  overflow-y: auto;
}
</style>

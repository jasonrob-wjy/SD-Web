<template>
  <div>
    <Modal v-model="oneBugIsShow" width="70%" @on-cancel="handleShow">
      <div slot="header">
        <h3>
          <Icon type="ios-create-outline" size="22" />新建图谱
        </h3>
      </div>
      <div class="warp">
        <!-- <p>
          <label>图谱标题：</label>
          <Input v-model="value" placeholder="Enter something..." style="width: 300px" />
        </p>-->
        <div>
          <label>封面上传：</label>
          <Upload multiple action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">封面上传</Button>
          </Upload>
          <span>上传文件、文本、图片等</span>
        </div>
        <p>
          <label>图谱标题：</label>
          <Input v-model="value" placeholder="Enter something..." style="width: 300px" />
          <label>图谱类型：</label>
          <Select v-model="model1" style="width:300px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </p>
        <!-- <p>
          <label>当前指派：</label>
          <Select v-model="model1" style="width:300px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <label>优先级别：</label>
          <Select v-model="model1" style="width:300px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </p>-->

        <div>
          <label>Option：</label>
          <Input v-model="value6" type="textarea" :rows="8" placeholder="请输入 Option 配置代码..." />
        </div>
        <div>
          <label>API数据：</label>
          <Input v-model="value6" type="textarea" :rows="8" placeholder="请输入 API 数据..." />
        </div>
        <div>
          <label>备注：</label>
          <QuillEditor class="editor" />
        </div>
      </div>
      <div slot="footer">
        <Button type="info">确定</Button>
        <Button type="primary" @click.stop="handleShow">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import QuillEditor from "../../../public/QuillEditor";
import AceEditor from "./AceEditor";
export default {
  components: {
    QuillEditor,
    AceEditor
  },
  computed: {
    oneBugIsShow() {
      return this.$store.state.show.oneBugIsShow;
    }
  },
  // watch: {
  //   oneBugIsShow(val) {
  //     console.log(val);
  //     this.isShow = val;
  //   }
  // },
  data() {
    return {
      isShow: true,
      value: "asd",
      cityList: [
        {
          value: "饼状图谱",
          label: "饼状图谱"
        },
        {
          value: "柱状图谱",
          label: "柱状图谱"
        },
        {
          value: "折线图谱",
          label: "折线图谱"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      model1: ""
    };
  },
  methods: {
    handleShow() {
      this.$store.commit("setOneBugIsShow", false);
    },
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.warp {
  p,
  > div {
    padding: 10px 10px;
    display: flex;
    align-items: center;
    label {
      width: 100px;

      text-align: right;
    }
    > div {
      margin-right: 40px;
    }
    .editor {
      width: 86%;
    }
  }
}
</style>



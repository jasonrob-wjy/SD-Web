<template>
  <div class="detail">
    <h2>
      <span>{{newData.title}}</span>
      <p @click="handleClose">
        <Icon type="ios-redo-outline" size="28" />
      </p>
    </h2>
    <div class="content" v-html="newData.explain">sdcvsdvsd</div>
  </div>
</template>

<script>
export default {
  name: "detail",
  props: ["content"],
  data:()=>({
    newData:{}
  }),
  watch:{
    content(data){
      this.newData = data;
       console.log(this.newData);
    }
  },
  mounted() {
    this.newData = this.content;
  },
  methods: {
    handleClose(){
       this.$emit("on-change",false);
    }
  }
};
</script>
<style lang="scss" scoped>
.detail {
  padding: 12px;
  h2 {
    text-align: center;
    border-bottom: 1px dashed #eee;
    padding: 10px;
    position: relative;
    p {
      position: absolute;
      right: 12px;
      top: 5px;
      cursor: pointer;
    }
    p:hover {
      color: #2d8cf0;
    }
  }
  .content {
    padding: 15px;
    min-height: 450px;
  }
}
</style>

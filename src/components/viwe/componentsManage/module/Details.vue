<template>
  <div>
    <div class="query">
      <div class="left">
        <div>
          <img :src="$url+'/'+newData.url" />
          <span>{{newData.author}}</span>
        </div>
        <div>
          <span>
            <i class="fa fa-calendar" style=" font-size: 15px;"></i>
            {{newData.date}}
          </span>
        </div>
        <div>
          <span>
            <i class="fa fa-eye" style=" font-size: 18px;"></i>
            {{newData.look}}
          </span>
        </div>
      </div>
      <div class="search-mar">
        <Button type="success" ghost @click.stop="handleClose">
          <Icon type="ios-redo-outline" size="20" />返回
        </Button>
      </div>
    </div>
    <div class="detail">
      <h2>
        <span>{{newData.title}}</span>
        <!-- <p @click="handleClose">
          <Icon type="ios-redo-outline" size="28" />
        </p>-->
      </h2>
      <div v-highlight class="content" v-html="newData.explain">sdcvsdvsd</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  props: ["content"],
  data: () => ({
    newData: {}
  }),
  watch: {
    content(data) {
      this.newData = data;
      console.log(this.newData);
    }
  },
  mounted() {
    this.newData = this.content;
  },
  methods: {
    handleClose() {
      this.$emit("on-change", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.detail {
  padding: 12px;
  margin-top: 8px;
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
.query {
  background: #fcfcfc;
  padding: 10px 16px;
  box-shadow: 0 1px 0 0 #e3e9ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .search-mar {
    display: flex;
    align-items: center;
    > button {
      margin-left: 20px;
    }
  }
  .left {
    display: flex;
    align-items: center;
    > div {
      margin-right: 15px;
      height: 27px;
      span {
        display: block;
        padding-top: 6px;
        i {
          margin-right: 5px;
         
        }
      }
    }
    > div:nth-child(1) {
      display: flex;
      img {
        width: 26px;
        height: 26px;
      }
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>

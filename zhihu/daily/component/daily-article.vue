<template>
  <div class="daily-article">
    <div class="daily-article-title">{{ data.title }}</div>
    <div class="dialy-article-content" v-html="data.body"></div>
  </div>
</template>
<script>
import $ from "../lib/util";
export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      data: {},
    };
  },
  methods: {
    getArticle() {
      $.mockdata("/article", this.id).then((res) => {
        this.data = res
        // 返回最顶端
        window.scrollTo(0, 0)
      });
    },
  },
  watch: {
      id(val) {
          if(val) this.getArticle()
      }
  }
};
</script>
<style scoped>
.daily-article{
    margin-left: 450px;
    padding: 20px;
}
.daily-article-title{
    font-size: 28px;
    font-weight: bold;
    color: #222;
    padding: 10px 0;
}
.view-more a{
    display: block;
    cursor: pointer;
    background-color: #f5f7f9;
    text-align: center;
    color: inherit;
    text-decoration: none;
    padding: 4px 0;
    border-radius: 3px;
}
</style>
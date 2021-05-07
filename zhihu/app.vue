<template>
  <div class="daily">
    <div class="daily-menu">
      <div
        class="daily-menu-item"
        :class="{ on: type === 'recommend' }"
        @click="handleToRecommend"
      >
        每日推荐
      </div>
      <div
        class="daily-menu-item"
        :class="{ on: type === 'daily' }"
        @click="showThemes = !showThemes"
      >
        主题日报
      </div>
      <ul v-show="showThemes">
        <li v-for="(item, index) in themes" :key="index">
          <a
            href="#"
            :class="{ on: item.id === themeId && type === 'daily' }"
            @click="handleToTheme(item.id)">{{ item.name }}</a>
        </li>
      </ul>
    </div>
    <template>
      <div class="daily-list" ref="list">
        <template v-if="type === 'recommend'">
          <div v-for="(list, index) in recommendList" :key="index">
            <div class="daily-date">{{ formatDay(list.date) }}</div>
            <Item
              v-for="item in list.stories"
              :data="item"
              :key="item.id"
              @click.native="handleClick(item.id)"
            ></Item>
          </div>
        </template>
        <template v-if="type === 'daily'">
          <Item v-for="item in list.stories" :data="item" :key="item.id"></Item>
        </template>
      </div>
    </template>
    <template>
      <div class="daily">
          <daily-article :id="articleId"></daily-article>
      </div>
    </template>
  </div>
</template>
<script>
import $ from "./daily/lib/util";
import Item from "./daily/component/item.vue";
import dailyArticle from './daily/component/daily-article.vue'
export default {
  data() {
    return {
      themes: [],
      showThemes: false,
      type: "recommend",
      themeId: 0,
      isLoading: false,
      recommendList: [],
      articleId: 0,
    };
  },
  methods: {
    handleToRecommend() {
      // 每日推荐
      this.recommendList = [];
    },
    getRecommendList() {
      this.isLoading = true;
      $.mockdata("/recommend").then((res) => {
        this.recommendList.push(res);
        this.isLoading = false;
      });
    },
    handleToTheme(id) {
      // 改变菜单type 为 主体日报
      this.type = "daily";
      this.themeId = id;
      $.mockdata("/theme", id).then((res) => {
        console.log(res);
        this.list = res.stories.filter((item) => item.type !== 1);
      });
    },
    getThemes() {
      //
      $.mockdata("/data/index").then((res) => {
        this.themes = res.others;
      });
    },
    formatDay(date) {
      let message = date.substr(0, 2);
      console.log(message);
      if (message === "am") {
        return `早上: ${date.substr(2)}`;
      }
      return `晚上: ${date.substr(2)}`;
    },
    handleClick(id) {
      this.articleId = id
    }
  },
  mounted() {
    this.getThemes();
    this.getRecommendList(); // 每日推荐

    // 获取到DOM
    const $list = this.$refs.list;
    // 监听滚动事件
    $list.addEventListener('scroll', () => {
      // 主题日报或者加载推荐列表是 停止操作
      console.log($list.scrollTop);
      console.log(document.body.clientHeight);
      console.log($list.scrollHeight);
      if(this.type === 'daily' || this.isLoading) return
      if($list.scrollTop + document.body.clientHeight >= $list.scrollHeight) {
        console.log(2);
        this.getRecommendList();
      } 
    })
  },
  components: {
    Item: Item,
    dailyArticle
  },
};
</script>
<style scoped>

.daily-menu {
  width: 150px;
  position: fixed;
  overflow: auto;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: #f5f7f9;
}
.daily-menu-item {
  font-size: 18px;
  text-align: center;
  margin: 5px 0;
  padding: 10px 0;
  cursor: pointer;
  border-right: 2px solid transparent;
  transition: all 0.3 ease-in-out;
}
.daily-menu-item:hover {
  background-color: #e3e8ee;
}
.daily-menu-item.on {
  border-right: 2px solid #3399ff;
}
.daily-list {
  width: 300px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 150px;
  overflow: auto;
  border-right: 1px solid #d7dde4;
}
.daily-item {
  display: block;
  color: inherit;
  text-decoration: none;
  padding: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3 ease-in-out;
}
.daily-item:hover {
  background-color: #e3e8ee;
}
.daily-article {
  margin-left: 20px;
}
.daily-list {
  width: 300px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 150px;
  overflow: auto;
  border-right: 1px solid #d7dde4;
}
.daily-date {
  text-align: center;
  margin: 10px 0;
}
</style>
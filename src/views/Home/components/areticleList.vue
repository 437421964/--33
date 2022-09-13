<template>
  <div class="article">
    <!-- 属性 -->
    <!-- @load 触底触发load事件 -->
    <!-- offset：滚动条和底部距离多少的时候触发load事件，默认值300px  -->
    <!-- immediate-check：初渲染的时候是否执行load方法， 默认值是true -->
    <!-- v-model="loading" -->
    <!-- loading为true的时候load不会被触发 -->
    <!-- loading为false的时候 load会被触发 -->
    <!-- loading会在load触发之后 被van-list修改为true 需要手动的改为false -->
    <!-- finished:boolean false:load事件会被触发 true：load事件不会被触发了 并且显示finished-text的文案-->
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <van-list
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，请重新加载"
        finished-text="没有更多文案咯~"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 发送请求 获取文章内容
import { getArticles } from '@/api'
import ArticleItem from './AreticleItem.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: [],
      preTimeStamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticles(this.id, +new Date())

        this.articles = data.data.results
        // console.log(data.data.results)
        this.preTimeStamp = data.data.pre_timestamp
      } catch (error) {
        // js错误我上抛 400 上抛中文，507原封不动上抛
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageArticle() {
      try {
        // 1. 发送请求
        const { data } = await getArticles(this.id, this.preTimeStamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 如果是下滑加载，将数据放在最后
        // 如果是下拉刷新，将数据放在最前面
        // 2. 添加到articles
        if (this.loading) {
          this.articles.push(...data.data.results)
        } else {
          this.articles.unshift(...data.data.results)
        }

        // 3. 更新时间戳
        this.preTimeStamp = data.data.pre_timestamp
      } catch (error) {
        // 错误进行处理
        this.error = true
      } finally {
        // finally语句一定会执行
        // 4. 更新loading
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// 如何给盒子拥有自己的滚动条
// - 1.定高 2.overflow:auto/scroll/overlay
.article {
  height: calc(100vh - 1.0375rem - 1.0375rem - 1.25rem);
  overflow: auto;
  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  //::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 5px;
  }
}
</style>

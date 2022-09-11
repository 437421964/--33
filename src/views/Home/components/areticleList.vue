<template>
  <div>
    <ArticleItem
      v-for="item in articles"
      :key="item.art_id"
      :article="item"
    ></ArticleItem>
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
      articles: []
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
        console.log(data.data.results)
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
    }
  }
}
</script>

<style></style>

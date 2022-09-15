<template>
  <div>
    <!-- 搜索 -->
    <form action="/">
      <van-search
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        class="serach"
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>
    <!-- 搜索历史/建议/结果 -->
    <!-- <component is=""></component> -->
    <!-- <search-history></search-history>
    <search-suggestion></search-suggestion>
    <search-result></search-result> -->
    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },

  computed: {
    ...mapState(['histories']),
    componentName() {
      // 搜索历史： 搜索框为空的时候
      // 搜索建议： 搜索框有值，并且不渲染搜索结果
      // 搜索结果：触发搜索时 显示搜索结果
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      // this.keywords一定有值
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      // 既不渲染搜索结果也不渲染搜索历史
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      // 把keywords关键词存起来
      // 1.用户手动敲回车 2.点击了搜索框
      // 储存搜索历史
      // 去重：1.获取没有去重的数组，用new Set(arr) 3.[..set]
      const distincyHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distincyHistories)
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>

<style scoped lang="less">
.serach {
  [role='button'] {
    color: #fff;
    background-color: transparent;
  }
}
</style>

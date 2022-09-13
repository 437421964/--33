<template>
  <div>
    <!-- 搜索栏 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button icon="search" size="small" round block>搜索</van-button>
      </template>
    </van-nav-bar>

    <!-- 频道及文章展示 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 文章详情 -->
        <ArticalList :id="item.id"></ArticalList>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelEdit
        :my-channels="channels"
        @change-active=";[(isShow = false), (active = $event)]"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getChannelAPI } from '@/api'
import ArticalList from './components/areticleList'
import ChannelEdit from './components/ChannelEdit.vue'
export default {
  components: {
    ArticalList,
    ChannelEdit
  },
  data() {
    return {
      active: 0,
      channels: [],
      isShow: false
    }
  },
  created() {
    this.getChannel()
  },
  // 1 ?? ==>相当于||，常用于语句
  // 2. ?. ==>可选链操作符，？前面是undifined,那么不会往后取值

  methods: {
    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        this.channels = data.data.channels

        // console.log(data.data)
      } catch (error) {
        // js的错误，给程序员，axios状态码507，提示用户刷新
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          status === 507 && this.$toast.fail('服务端异常，请刷新')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa; // inherit 继承 // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }
  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 0.825rem;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0; /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 2.6rem;
      height: 1.025rem;
    } /* tab标签下划线 */
    .van-tabs__line {
      width: 30px;
      height: 6px;
      background-color: #3296fa;
      bottom: 20px;
    }
  }
} /* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 0.825rem;
  height: 1.025rem;
  font-size: 0.5rem;
  line-height: 1.025rem;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    // width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>

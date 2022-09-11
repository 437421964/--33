<template>
  <div>
    <!-- 导航 -->
    <van-nav-bar title="登录" class="nav-bar" />

    <!-- 表单 -->
    <van-form @submit="onSubmit" class="from" ref="form">
      <!-- 手机号 -->
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <!-- 验证码 -->
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 发送验证码 -->
        <template #button>
          <van-button
            class="send-sms-btn"
            round
            size="small"
            type="default"
            block
            native-type="button"
            v-if="isShowCodeBtn"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            v-else
            :time="6 * 1000"
            format="ss秒"
            @finish="isShowCodeBtn = true"
          />
        </template>

        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
      </van-field>
      <!-- 登录 -->
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          class="van-button"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rule'
import { Login, senCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    // submit 事件只有表单校验通过以后会被触发
    async onSubmit(values) {
      // loading
      // message 提示文案
      // forbidClick 禁止点击
      // duration 展示时长 为0 一直展示 单位：毫秒
      this.$toast.loading()
      // 登录
      try {
        const { data } = await Login(this.mobile, this.code)
        // 将token 存入 vuex
        this.SET_TOKEN(data.data)
        // 跳转路由
        this.$router.push('/profile')
        // 登录成功提示
        this.$toast.success('登录成功')
      } catch (error) {
        // 细分失败
        // 如果是手机号或者验证错了，用户能知道
        // error 1.js抛出的错误 2.axios封装的error对象

        // axios封装的error对象
        // - error.response.data 后端返回的数据
        // - error.response.status 后端返回的状态码
        if (error.response?.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          console.log(error)
          this.$toast.clear()
          throw error
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 1000
      })
    },
    async sendCode() {
      // 0.验证用户是否输入了有效的手机号
      // 1. form绑定ref
      // 2. $refs.form.validate(name)

      await this.$refs.form.validate('mobile')
      this.loading()
      //  发送请求
      try {
        await senCodeAPI(this.mobile)
        // 显示倒计时组件
        this.isShowCodeBtn = false

        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// scoped 样式作用于当前组件
// vue-cli 提供语法 :deep() 深度选择器
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}

:deep(.from) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
  .send-sms-btn {
    height: 0.64rem;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    border-color: #ededed;
  }
}
</style>

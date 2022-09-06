<template>
  <div>
    <!-- 导航 -->
    <van-nav-bar title="登录" class="nav-bar" />

    <!-- 表单 -->
    <van-form @submit="onSubmit" class="from">
      <!-- 手机号 -->
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern:
              /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号格式错误'
          }
        ]"
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
        :rules="[
          { required: true, message: '请填写验证码' },
          {
            pattern: /[0-9]{6}/,
            message: '验证码格式错误'
          }
        ]"
      >
        <!-- 发送验证码 -->
        <template #button>
          <van-button class="send-sms-btn" round size="small" type="default"
            >发送验证码</van-button
          >
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
export default {
  data() {
    return { mobile: '', code: '' }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    }
  }
}
</script>

<style scoped lang="less">
// scoped 样式作用于当前组件
// vue-cli 提供语法 :deep() 深度选择器
.nav-bar {
  background-color: hotpink;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.van-button {
  background-color: hotpink;
  border-color: hotpink;
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
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    border-color: #ededed;
  }
}
</style>

<template>
  <div>
    <!-- <router-view></router-view> -->
    <h1>{{ count }}</h1>
    <h1>count的十倍:{{ bigNumber }}</h1>
    <button @click="SET_COUNT(10)">点击count++</button>
  </div>
</template>

<script>
//  mapState-->将vuex里面state映射 computed
// 使用
// -引入mapState:函数，返回一个对象
// -参数：['映射的属性']

// mapState-->将vuex里面getters映射 computed

// mapMutations --->将vuex里面mutation映射 methods

import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNumber'])
  }
}
</script>

<style></style>

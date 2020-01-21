<template>
  <div>
    <h1>test page</h1>
    <div>
      <router-link to="/child">去child页面</router-link>
    </div>
    <ul>
      <template v-for="(item, index) in goodsType">
        <li :key="index">{{item}}</li>
      </template>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  async asyncData ({ store, route }) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    await store.dispatch('getGoodsType')
  },
  computed: {
    ...mapState(['goodsType'])
  },
  beforeMount () {
    console.log(this.goodsType)
  }
}
</script>

<template>
  <div>
    <h1>child page</h1>
    <div>
      <router-link to="/">去test页面</router-link>
    </div>
    <ul>
      <template v-for="(item, index) in goods">
        <li :key="index">{{item}}</li>
      </template>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  async asyncData ({ store, route }) {
    await store.dispatch('getGoods')
  },
  computed: {
    ...mapState(['goods'])
  }
}
</script>

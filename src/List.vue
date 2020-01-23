<template>
  <ul class="list">
    <li @click="$router.push('/item')">123</li>
  </ul>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    async asyncData({ store, route }) {
      await store.dispatch('getList')
    },
    computed: {
      ...mapState(['list'])
    },
    mounted() {
      console.log('list', this.list)
    }
  }
</script>
<style lang="scss" scoped>
  ul {
    background-color: red;
  }
</style>

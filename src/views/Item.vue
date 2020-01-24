<template>
  <div>
    <h1>title</h1>
    <main>content</main>
    <button @click="$router.push('/')"></button>
  </div>
</template>
<script>
  export default {
    mounted() {
      console.log('item')
    }
  }
</script>
<style lang="scss" scoped>
  div {
    background-color: navy;
  }
</style>

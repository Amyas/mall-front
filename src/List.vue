<template>
  <ul class="list">
    <li @click="$router.push('/item')">123</li>
  </ul>
</template>
<script>
export default {
  mounted() {
    console.log("list");
  }
};
</script>
<style lang="scss" scoped>
ul {
  background-color: red;
}
</style>

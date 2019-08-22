<template>
  <section class="main">
    <header>统计</header>
    <Count :data="list" />
  </section>
</template>
<script>
import Count from "@/components/Count.vue";
export default {
  components: {
    Count
  },
  data: () => ({list: []}),
  async asyncData({ $axios }) {
    const { data } = await $axios.get("http://106.53.78.76:3030/api/getData");
    return { list: data.data };
  }
};
</script>
<style lang="scss">
@import '../assets/styles/header.scss';
</style>
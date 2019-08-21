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
    const { data } = await $axios.get("http://127.0.0.1:3030/api/getData");
    console.log("lst", data.data);
    return { list: data.data };
  }
};
</script>
<style lang="scss">
@import '../assets/styles/header.scss';
</style>
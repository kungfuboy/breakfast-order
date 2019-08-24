<template>
  <section class="main">
    <header>统计</header>
    <Count :data="list" :typeList="typeList" @update="handleGetData" />
  </section>
</template>
<script>
import Count from "@/components/Count.vue";
export default {
  components: {
    Count
  },
  data: () => ({ list: [], typeList: [] }),
  async asyncData({ $axios }) {
    const { data } = await $axios.get("/api/getData");
    const res = await $axios.get("/api/getMenu");
    return { list: data.data, typeList: res.data.data };
  },
  methods: {
    async handleGetData() {
      const { data } = await this.$axios.get("/api/getData");
      this.list = data.data;
    }
  }
};
</script>
<style lang="scss">
@import "../assets/styles/header.scss";
</style>
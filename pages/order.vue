<template>
  <section class="main">
    <header>下单</header>
    <Order :options="options" />
  </section>
</template>
<script>
import Order from "@/components/Order.vue";
export default {
  data: () => ({ options: [] }),
  components: {
    Order
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get("/api/getMenu");
    return { options: data.data };
  }
};
</script>
<style lang="scss">
@import "../assets/styles/header.scss";
</style>
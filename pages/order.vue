<template>
    <section class="main">
       <header>下单</header>
       <Order />
    </section>
</template>
<script>
import Order from '@/components/Order.vue'
export default {
    components: {
        Order
    }
}
</script>
<style lang="scss">
@import '../assets/styles/header.scss';
</style>
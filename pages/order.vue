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
* {
    box-sizing: border-box;
}
.main {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
}
header {
    background: #178bb2;
    height: 50px;
    color: #fff;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px #178bb2;
}
</style>
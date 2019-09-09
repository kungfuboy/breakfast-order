<template>
<section class="error">
    <h1>抱歉，周日不允许下单</h1>
</section> 
</template>
<script>
export default {
    name: 'Error'
}
</script>
<style lang="scss" scoped>
.error {
    height:100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #455;
}
</style>
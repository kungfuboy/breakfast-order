<template>
  <section class="main">
    <header>统计</header>
  </section>
</template>
<script>
export default {
  name: "count",
  data: () => ({ list: [] }),
  asyncData({ $axios }) {
    $axios.get("http://127.0.0.1:3030/api/getData")
    .then(res => {
        console.log(res)
        return { list:res }
    })
  }
};
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
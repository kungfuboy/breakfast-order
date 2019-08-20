<template>
  <section class="order">
    <el-input v-model="name" placeholder="请输入姓名"></el-input>
    <div class="order-main" v-for="(day, index) in days" :key="index">
      <div class="title">
        <span>星期{{day}}</span>
        <i class="add" @click="handleAdd(index)"></i>
      </div>
      <div class="choose" v-for="(its, i) in data[index]" :key="i">
        <el-select v-model="its.value" placeholder="请选择面点">
          <el-option
            v-for="item in options"
            :key="item.code"
            :label="item.label"
            :value="item.code"
          ></el-option>
        </el-select>
        <el-input-number v-model="its.number" :min="0" :max="5"></el-input-number>
      </div>
    </div>
    <el-button type="primary" @click="handlePost">提交</el-button>
  </section>
</template>
<script>
import options from "@/assets/data.js";

export default {
  name: "Order",
  data: () => ({
    name: "",
    data: [0, 1, 2, 3, 4].map(() => [{ value: "", number: 0 }]),
    days: ["一", "二", "三", "四", "五"],
    options: options
  }),
  methods: {
    handleAdd(index) {
        this.data[index].push({ value: "", number: 0 })
    },
    async handlePost() {
        const res = await this.$axios.post('http://127.0.0.1:3030/api/pushData', this.data)
    }
  }
};
</script>
<style lang="scss" scoped>
.order {
  flex: 1;
  height: 1px;
  overflow: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  -webkit-overflow-scrolling: touch;
  .order-main {
    margin: 10px 0;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .add {
        display: inline-block;
        background-color: #178bb2;
        background-image: url('../assets/icon/add.svg');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 70% 70%;
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
    }
  }
  .choose {
    display: flex;
    margin: 10px 0;
    .el-select {
      flex: 4;
      margin-right: 20px;
    }
    .el-input-number {
      flex: 3;
    }
  }
}
.el-button {
  &.el-button--primary {
    background-color: #178bb2;
    border-color: #178bb2;
  }
}
</style>
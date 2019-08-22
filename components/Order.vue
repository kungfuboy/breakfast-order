<template>
  <section class="order">
    <div class="order-title">
      <el-input v-model="name" placeholder="请输入姓名"></el-input>
      <i class="button" @click="handleSearch"></i>
    </div>
    <div class="order-main" v-for="(day, index) in days" :key="index">
      <div class="title">
        <span>下周{{day}}({{week[index]}})</span>
        <i class="add" @click="handleAdd(index)"></i>
      </div>
      <div class="choose" v-for="(its, i) in data[index]" :key="i">
        <el-select v-model="its.code" @change="hanldeChange(index)" placeholder="请选择面点">
          <el-option
            v-for="item in options"
            :key="item.code"
            :label="`${item.label} - ￥${item.price}元`"
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
const getWeek = () => {
  const week = [];
  for (let i = 0; i < 7; i++) {
    let Stamp = new Date();
    let num = 7 - Stamp.getDay() + 1 + i;
    Stamp.setDate(Stamp.getDate() + num);
    week[i] = Stamp.getMonth() + 1 + "月" + Stamp.getDate() + "日";
  }
  return week;
};

export default {
  name: "Order",
  data: () => ({
    name: "",
    data: [0, 1, 2, 3, 4].map(() => [{ code: "", number: 0 }]),
    days: ["一", "二", "三", "四", "五"],
    week: getWeek(),
    options: options
  }),
  methods: {
    handleAdd(index) {
      this.data[index].push({ code: "", number: 0 });
    },
    async handlePost() {
      if (!this.name) {
        this.$message.error("请先输入姓名");
        return;
      }
      const {data} = await this.$axios.post("http://106.53.78.76:3030/api/pushData", {
        name: this.name,
        order: this.data.map(arr => arr.filter(li => !!li.code && !!li.number))
      });
      if(data.status === 200) {
        this.$message.success('下单成功！')
      }
    },
    hanldeChange(index) {
      const {number} = this.data[index]
      number === 0 && (this.data[index].number = 1)
    },
    async handleSearch() {
      if (!this.name) {
        return;
      }
      const { data } = await this.$axios.get(
        `http://106.53.78.76:3030/api/search?name=${this.name}`
      );
      if (data.data) {
        this.data = data.data;
      }
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
      color: #677;
      .add {
        display: inline-block;
        background-color: #fff;
        background-image: url("../assets/icon/add.svg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 70% 70%;
        border: 1px solid #178bb2;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        box-shadow: 0 0 5px rgba(23, 139, 178, 0.6);
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
.order-title {
  display: flex;
  margin-bottom: 30px;
  .button {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: #178bb2;
    border-color: #178bb2;
    box-shadow: 0 0 5px rgba(23, 139, 178, 0.6);
    margin-left: 15px;
    flex-shrink: 0;
    background-image: url("../assets/icon/search.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
    outline: none;
  }
}
</style>
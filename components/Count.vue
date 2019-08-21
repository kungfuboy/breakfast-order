<template>
  <section class="count">
      <h1>下周总计：￥{{getWeekPrice(getData)}}元</h1>
    <div v-for="(item, index) in days" :key="index" class="days">
      <span class="some-day">星期{{item}}({{week[index]}}): ￥{{ countDayPrice(getData[index]) }}元</span>
      <table class="table">
        <thead>
          <tr>
            <th width="45%">面点</th>
            <th width="45%">明细</th>
            <th width="10%">合计</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(food, key) in getData[index]" :key="key">
            <td>{{key | typeFilter}}</td>
            <td>{{ food | detailFilter }}</td>
            <td>{{ food | countFilter(key) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-button type="primary" @click="$router.push('/menu')">编辑菜单</el-button>
  </section>
</template>
<script>
import typeList from "@/assets/data.js";
const days = ["一", "二", "三", "四", "五"];
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
  name: "Count",
  props: ["data"],
  data: () => ({ days: days, dayPrice: [], week: getWeek() }),
  computed: {
    getData() {
      const _arr = this.days.map((item, index) => {
        const object = {};
        this.data.forEach(({ name, order }) => {
          // 拿到order的每一项，order还是个数组
          const _foodList = order[index];
          _foodList.forEach(({ code, number }) => {
            if (!object[code]) {
              object[code] = [];
            }
            object[code].push({ name, number });
          });
        });
        return object;
      });
      return _arr;
    }
  },
  filters: {
    typeFilter(key) {
      const [data] = typeList.filter(item => Number(key) === item.code);
      return `${data.label}(￥${data.price})`;
    },
    detailFilter(value) {
      return value.map(item => `${item.name}(${item.number})`).join(";");
    },
    countFilter(food, key) {
      const [data] = typeList.filter(item => Number(key) === item.code);
      let num = 0;
      food.forEach(item => {
        num += item.number * data.price;
      });
      return num;
    }
  },
  methods: {
    countDayPrice(data) {
      const keys = Object.keys(data);
      if (!keys.length) {
        return 0;
      }
      let num = 0;
      keys.forEach((key, index) => {
        const [_data] = typeList.filter(item => Number(key) === item.code);
        const _price = _data.price;
        const _number = data[key].map(item => item.number);
        _number.forEach(item => {
          num += item * _price;
        });
      });
      return num;
    },
    getWeekPrice(arr) {
        let num = 0
        days.forEach((item, index) => {
            num += this.countDayPrice(arr[index])
        })
        return num
    }
  }
};
</script>
<style lang="scss" scoped>
.count {
      flex: 1;
  height: 1px;
  overflow: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  -webkit-overflow-scrolling: touch;
}
h1 {
    color: #178bb2;
    margin-top: 20px;
    text-align: right;
}
.days {
  .some-day {
    display: flex;
    align-items: center;
    margin-top: 20px;
    color: #178bb2;
    font-weight: bold;
  }
  .table {
      width: 100%;
      padding: 5px 0;
      border: 1px solid rgba(132,162,212, .6);
      box-shadow: 0 0 5px rgba(132,162,212, .6);
      border-radius: 4px;
      margin: 5px 0;
      thead {
          font-size: 14px;
          color: #334;
          th {
              text-align: center;
          }
      }
    tbody {
      font-size: 12px;
      color: #455;
    }
  }
}
.el-button {
    width: 100%;
    margin: 20px 0;
    &.el-button--primary{
        background-color: #178bb2;
        border-color: #178bb2;
    }
}
</style>
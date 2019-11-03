<template>
  <section class="count">
    <h1>下周总计：￥{{getWeekPrice(getData)}}元</h1>
    <div v-for="(item, index) in days" :key="index" class="days">
      <div class="some-day">
        <span>星期{{item}}({{week[index]}})</span> 
        <span>￥{{ countDayPrice(getData[index]) }}元</span>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th width="35%">面点</th>
            <th width="45%">明细</th>
            <th width="20%">合计</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(food, key) in getData[index]" :key="key">
            <td>{{key | typeFilter(typeList)}}</td>
            <td>{{ food | detailFilter }}</td>
            <td align="center">{{ food | countFilter(key, typeList) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h1>个人总计</h1>
    <ul class="person-count">
      <li v-for="(item, key) in countPerson" :key="key">
        <span>{{key}}</span>
        <span>￥{{item | personFilter }}元</span>
      </li>
    </ul>
    <el-button type="primary" @click="$router.push('/menu')">编辑菜单</el-button>
    <el-button type="danger" @click="handleDeleteOrder">清除订单</el-button>
  </section>
</template>
<script>
import { getWeek } from '@/utils/index.js'
const days = ["一", "二", "三", "四", "五"];
export default {
  name: "Count",
  props: ["data", 'typeList'],
  data: () => ({ days: days, dayPrice: [], week: getWeek(), person: [] }),
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
      this.person = _arr;
      return _arr;
    },
    countPerson() {
      const arr = this.person;
      const res = {};
      arr.forEach(day => {
        const keys = Object.keys(day);
        if (keys.length) {
          keys.forEach(code => {
            const _arr = day[code];
            _arr.forEach(person => {
              if (!res[person.name]) {
                res[person.name] = [];
              }
              res[person.name].push({
                number: person.number,
                code,
                price: this.findPrice(code)
              });
            });
          });
        }
      });
      return res;
    }
  },
  filters: {
    typeFilter(key, list) {
      const [data] = list.filter(item => Number(key) === item.code);
      return `${data.label}(￥${data.price})`;
    },
    detailFilter(value) {
      return value.map(item => `${item.name}(${item.number})`).join(";");
    },
    countFilter(food, key, list) {
      const [data] = list.filter(item => Number(key) === item.code);
      let price = 0, num = 0;
      food.forEach(item => {
        price += item.number * data.price;
        num += item.number
      });
      return `￥${price}（${num}个）`;
    },
    personFilter(arr) {
      return arr.map(item => item.number * item.price).reduce((item, n) => item += n)
    }
  },
  methods: {
    findPrice(code) {
      const [data] = this.typeList.filter(item => Number(code) === item.code);
      return data.price;
    },
    countDayPrice(data) {
      const keys = Object.keys(data);
      if (!keys.length) {
        return 0;
      }
      let num = 0;
      keys.forEach((key, index) => {
        const [_data] = this.typeList.filter(item => Number(key) === item.code);
        const _price = _data.price;
        const _number = data[key].map(item => item.number);
        _number.forEach(item => {
          num += item * _price;
        });
      });
      return num;
    },
    async handleDeleteOrder() {
      const {data} = await this.$axios.delete('/api/deleteOrder')
      if(data.success) {
        this.$message.success('已删除所有订单记录')
        this.$emit('update')
      }
    },
    getWeekPrice(arr) {
      let num = 0;
      days.forEach((item, index) => {
        num += this.countDayPrice(arr[index]);
      });
      return num;
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
    justify-content: space-between;
    margin-top: 20px;
    color: #178bb2;
    font-weight: bold;
    font-size: 14px;
    font-weight: 500;
  }
  .table {
    width: 100%;
    padding: 5px 0;
    //   border: 1px solid rgba(23,139,178, .6);
    box-shadow: 0 0 5px rgba(23, 139, 178, 0.5);
    border-radius: 4px;
    margin: 8px 0;
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
.person-count {
  li {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #455;
    border-bottom: 1px solid rgba(23, 139, 178, 0.2);
  }
}
.el-button {
  height: 40px;
  flex-shrink: 0;
  width: 100%;
  margin: 20px 0;
  &.el-button--primary, 
  &.el-button--primary.is-active, 
  &.el-button--primary:focus, 
  &.el-button--primary:hover
  &.el-button--primary:active  {
    background-color: #178bb2;
    border-color: #178bb2;
  }
}
</style>
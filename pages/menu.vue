<template>
  <section class="main">
    <header>菜单</header>
    <div class="content">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <span>
            <i class="delete" @click="handleDelete(index)"></i>
            <span>{{item.label}}</span>
          </span>
          <span @click="handleEdit(index)">
            单价：{{ item.price }}
            <i class="edit"></i>
          </span>
        </li>
      </ul>
      <el-button type="primary" @click="handleAdd">添加面点</el-button>
    </div>
    <div class="fixed" v-if="editData">
      <i @click="editData = null"></i>
      <div class="box">
        <span class="inline">
          <span>面点：</span>
          <el-input v-model="editData.label" placeholder="面点名称"></el-input>
        </span>
        <span class="inline">
          <span>单价：</span>
          <el-input type="number" placeholder="面点单价" v-model="editData.price" />
        </span>
        <el-button type="primary" @click="handleChange(activeIndex)">提交</el-button>
      </div>
    </div>
  </section>
</template>
<script>
// import data from "@/assets/data.js";

export default {
  data: () => ({
    list: [],
    editData: null,
    activeIndex: null
  }),
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/getMenu')
    return { list: data.data }
  },
  methods: {
    async handleDelete(index) {
      this.list.splice(index, 1);
      const { data } = await this.$axios.post(
        "/api/changeMenu",
        { data: this.list.filter(item => !!item.label && !!item.price) }
      );
      if (data.success) {
        this.$message.success("删除成功！");
      }
    },
    handleEdit(index) {
      this.activeIndex = index;
      this.editData = this.list[index];
    },
    handleAdd() {
      this.list.push({ code: Date.now(), label: "", price: 0 });
      this.handleEdit(this.list.length - 1);
      this.activeIndex = this.list.length - 1;
    },
    async handleChange(index) {
      this.list[index] = this.editData;
      this.editData = null;
      const { data } = await this.$axios.post(
        "/api/changeMenu",
        { data: this.list.filter(item => !!item.label && !!item.price) }
      );
      if (data.success) {
        this.$message.success("成功更新菜单");
      }
    }
  }
};
</script>
<style lang="scss">
@import "../assets/styles/header.scss";
.delete {
  width: 30px;
  height: 30px;
  margin-right: 15px;
  display: inline-block;
  background-image: url("../assets/icon/delete.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70%;
}
.edit {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  display: inline-block;
  background-image: url("../assets/icon/edit.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70%;
}
.content {
  color: #677;
  font-size: 14px;
  flex: 1;
  height: 1px;
  overflow: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  -webkit-overflow-scrolling: touch;
  li {
    display: flex;
    height: 45px;
    align-items: center;
    border-bottom: 1px solid rgba(23, 139, 178, 0.2);
    justify-content: space-between;
    span {
      height: 100%;
      display: inline-flex;
      align-items: center;
    }
  }
}
.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .box {
    z-index: 2;
    background: #fafafa;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
    width: 80%;
    height: 40%;
    display: flex;
    flex-direction: column;
    padding: 15px;
    border-radius: 5px;
    span.inline {
      font-size: 14px;
      display: flex;
      flex-direction: column;
      color: #677;
      margin: 10px 0;
      > span {
        display: block;
        margin-bottom: 5px;
      }
    }
  }
}
.el-button {
  margin-top: 20px;
  background-color: #178bb2;
  border-color: #178bb2;
  &.el-button--primary,
  &.el-button--primary.is-active,
  &.el-button--primary:focus,
  &.el-button--primary:hover &.el-button--primary:active {
    background-color: #178bb2;
    border-color: #178bb2;
  }
}
</style>
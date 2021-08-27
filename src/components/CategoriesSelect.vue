<template>
  <select v-model="selectedCategory" @change="selectCategory" class="select">
      <option :value="null" disabled>Select category</option>
      <option :value="item" v-for="item in categories" :key="item">
          {{item}}
      </option>
  </select>
</template>

<script>

export default {
  name: 'CategoriesSelect',
  props:{
      categories:{
          required: true,
          default: []
      }
  },
  data() {
      return {
		selectedCategory: null,
      }
  },
  methods:{
    selectCategory() {
        this.$emit("selectCategory", this.selectedCategory);
    }
  }
}
</script>

<style scoped lang="scss">
.select{
    width: 100%;
    margin-bottom: 30px;
    padding: 6px 7px;
    cursor: pointer;
}
</style>
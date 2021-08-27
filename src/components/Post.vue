<template>
  <div class="post-item">
    <div class="post-item-container">
      <router-link :to="{ path: '/' + this.item.id }">
      <h3 class="post-item-title">{{ item.title }}</h3>
      <p class="post-item-text">{{ item.text }}</p>
      <ul class="post-item-tags">
        <li
          class="post-item-tags_item"
          v-for="tag in item.tags"
          :key="tag.id"
        >
          <p>{{ tag.text }}</p>
        </li>
      </ul>
      <p class="post-item-category">Category: {{ item.category }}</p>
      </router-link>
      <div class="post-item-buttons-container">
        <button class="post-item-buttons-container-button edit" @click="editPost">Edit</button>
        <button class="post-item-buttons-container-button delete" @click="deletePost">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    item: {
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    editPost() {
      this.$emit('editPost', this.item.id);
    },
    deletePost() {
      this.$emit('deletePost', this.item.id);
    }
  }
};
</script>

<style scoped lang="scss">
.post-item {
  word-break: break-all;
  &-title{
    font-size: 25px;
    text-align: center;
    margin-bottom: 15px;
  }
  &-text{
    font-size: 16px;
    margin-bottom: 10px;
    text-align: left;
  }
  &-category{
    text-align: left;
    margin-bottom: 20px;
  }
  &-tags {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 10px;
    &_item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      min-width: 43%;
      position: relative;
      margin-bottom: 10px;
      background-color: #95c221;
      border-radius: 40px;
      padding: 5px 10px;
      text-align: center;
      border: 1px solid #4d611f;
    }
  }
  &-buttons-container{
    display: flex;
    justify-content: space-between;
    &-button{
      border: 1px solid #7a7575;
      padding: 7px 0;
      max-width: 80px;
      width: 100%;
      color: #fff;
      &.delete{
        background-color: red;
      }
      &.edit{
        background-color: green;
      }
      &:hover{
        transition: 0.2s ease-in;
        opacity: 0.6;
      }
    }
  }
}
</style>

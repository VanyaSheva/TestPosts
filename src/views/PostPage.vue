<template>
  <div class="post-item">
    <h3 class="post-item-title">Title: {{ post.title }}</h3>
    <p class="post-item-text">Text: {{ post.text }}</p>
    <ul class="post-item-tags">
      <li class="post-item-tags_item" v-for="tag in post.tags" :key="tag.id">
        <p>{{ tag.text }}</p>
      </li>
    </ul>
    <p class="post-item-category">Category: {{ post.category }}</p>
  </div>
</template>

<script>
export default {
  name: "PostPage",
  data() {
    return {
      post: null
    };
  },
  created() {
    this.post = JSON.parse(localStorage.getItem("posts")).find(
      item => item.id === this.$route.params.id
    );
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.post-item {
  word-break: break-all;
  padding: 150px 0;
  max-width: 20%;
  margin: 0 auto;
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
      min-width: 40%;
      position: relative;
      margin-bottom: 10px;
      background-color: #95c221;
      border-radius: 40px;
      padding: 5px 10px;
      text-align: center;
      border: 1px solid #4d611f;
    }
  }
}
</style>

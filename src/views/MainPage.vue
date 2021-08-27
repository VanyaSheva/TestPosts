<template>
  <div>
    <Modal
      v-if="showModal"
      @closeModal="closeModal"
      @postSaved="getPosts"
      :currentEditPost="currentEditPost"
    />
    <div class="button-container">
      <AddButton @openModal="showModal = true" />
    </div>
    <div class="wrapper">
      <div>
        <FilterPosts @searchByTag="filterBy" />
        <CategoriesSelect :categories="categories" @selectCategory="redirectToCategoryPage"/>
        <ul class="list">
          <Post
            class="list-item"
            v-for="item in currentPosts"
            :key="item.id"
            :item="item"
            @editPost="editPost"
            @deletePost="deletePost"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Post from "../components/Post.vue";
import FilterPosts from "../components/FilterPosts.vue";
import AddButton from "../components/AddButton.vue";
import Modal from "../components/Modal.vue";
import CategoriesSelect from "../components/CategoriesSelect.vue";

export default {
  name: "PostsList",
  components: {
    Post,
    FilterPosts,
    AddButton,
    Modal,
    CategoriesSelect,
  },
  data() {
    return {
      filterPostsQuery: null,
      showModal: false,
      currentEditPost: null,
    };
  },
  computed: {
    ...mapGetters(["POSTS"]),
    currentPosts() {
      if (!this.filterPostsQuery) {
        return this.POSTS;
      }
      return [...this.POSTS].filter(item => {
        if (this.filterPostsQuery) {
          for (let property in item) {
            if (property !== 'id' && typeof item[property] !== 'object' && item[property] !== null && item[property].includes(this.filterPostsQuery)) {
              return item;
            }
            if (Array.isArray(item[property]) && item[property].find(tag => tag.text.includes(this.filterPostsQuery))) {
              return item;
            }
          }
        }
      });
    },
    categories() {
      const categories = [];
      if(this.POSTS.length > 0) {
        this.POSTS.forEach(item => {
          categories.push(item.category)
        })
        return [...new Set(categories)];
      }
      return categories;
    }
  },
  created() {
    this.getPosts();
  },
  methods: {
    filterBy(value) {
      this.filterPostsQuery = value;
    },
    closeModal() {
      this.currentEditPost = null;
      this.showModal = false;
    },
    editPost(id) {
      this.currentEditPost = this.currentPosts.find(item => item.id === id);
      this.showModal = true;
    },
    getPosts() {
      this.$store.dispatch("GET_POSTS");
    },
    deletePost(id) {
      let existingEntries = JSON.parse(localStorage.getItem("posts"));
      existingEntries = existingEntries.filter(item => {
        return item.id !== id
      })
      localStorage.setItem("posts", this.form);
      localStorage.setItem("posts", JSON.stringify(existingEntries));
      this.getPosts();
    },
    redirectToCategoryPage(category) {
      this.$router.push({ path: 'category', query: { category: category } })
    },
  }
};
</script>

<style scoped lang="scss">
.button-container {
  position: relative;
  margin-bottom: 40px;
  padding: 10px;
  width: 100%;
}
.list {
  display: flex;
  flex-wrap: wrap;
  &-item {
    width: 22%;
    margin-bottom: 20px;
    border: 1px solid black;
    padding: 10px 15px;
    &:not(:nth-child(4n)){
      margin-right: 4%;
    }
  }
}
</style>

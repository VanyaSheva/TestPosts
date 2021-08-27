<template>
  <div>
    <Modal
      v-if="showModal"
      @closeModal="closeModal"
      @postSaved="getPosts"
      :isCategoryPage="true"
      :currentEditPost="currentEditPost"
    />
    <div class="button-container">
      <AddButton @openModal="showModal = true" />
    </div>
    <div class="wrapper">
      <div>
        <FilterPosts @searchByTag="filterBy" />
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

export default {
  name: "PostsListFilteredByCategory",
  components: {
    Post,
    FilterPosts,
    AddButton,
    Modal,
  },
  data() {
    return {
      filterPostsQuery: null,
      showModal: false,
      category: null,
      currentEditPost: null,
    };
  },
  computed: {
    ...mapGetters(["POSTS"]),
    currentPosts() {
      if (!this.filterPostsQuery) {
        return [...this.POSTS].filter(item => {
          return item.category === this.category;
        });
      }
      return [...this.POSTS].filter(item => {
        if (this.filterPostsQuery && item.category === this.category) {
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
  },
  created() {
    this.category = this.$route.query.category
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
      this.getPosts()
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

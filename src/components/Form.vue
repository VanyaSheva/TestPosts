<template>
  <form class="modal-form" @submit.prevent="isEditPost ? editPost() : savePost()">
    <button
      class="modal-close"
      @click="handleCloseModal"
      type="button"
    ></button>
    <input
      type="text"
      class="modal-form_input"
      placeholder="Enter title"
      v-model="form.title"
      required
    />
    <input
      type="text"
      class="modal-form_input"
      placeholder="Enter text"
      v-model="form.text"
      required
    />
    <div class="modal-form-category-container">
      <input
        type="text"
        class="modal-form_input"
        placeholder="Enter tag"
        v-model="tag"
      />
      <button type="button" @click="addTag">Add tag</button>
    </div>
    <ul class="modal-form-tags-list" v-if="tags.length > 0">
      <p class="modal-form-tags-list_title">Tags list:</p>
      <li class="modal-form-tags-list_item" v-for="tag in tags" :key="tag.id">
        {{ tag.text }}
        <div class="modal-form-tags-list_item-delete" @click="deleteTag(tag.id)"></div>
      </li>
    </ul>
    <input
      type="text"
      class="modal-form_input"
      placeholder="Enter category"
      v-model="form.category"
      required
      :disabled="isCategoryPage"
    />
    <button class="modal-form-save" type="submit">Save post</button>
  </form>
</template>

<script>
import { v1 as uuidv1 } from "uuid";

export default {
  name: "Form",
  props:{
    isCategoryPage:{
      required: false,
      default: false,
    },
    currentEditPost:{
      required: true,
      default: null,
    }
  },
  data() {
    return {
      tag: null,
      tags: [],
      isEditPost: false,
      form: {
        title: null,
        text: null,
        category: null,
        tags: [],
        id: uuidv1()
      },
    };
  },
  mounted(){
    if(this.currentEditPost){
      this.isEditPost = true;
      this.form = {
        ...this.currentEditPost
      }
    }
    if(this.isCategoryPage && !this.currentEditPost){
      this.form.category = this.$route.query.category;
    }
    this.tags = [...this.form.tags];
  },
  methods: {
    handleCloseModal() {
      this.$emit("closeModal");
    },
    addTag() {
      if(this.tag === null){
        return;
      }
      this.tags.push({
        text: this.tag,
        id: uuidv1()
      });
      this.tag = null;
    },
    deleteTag(id) {
      this.tags = this.tags.filter(item => {
        return item.id !== id;
      })
    },
    savePost() {
      this.form.tags = [...this.tags];
      if(this.form.tags.length === 0){
        return
      }
      let existingEntries = JSON.parse(localStorage.getItem("posts"));
      if (existingEntries === null) existingEntries = [];
      localStorage.setItem("posts", this.form);
      existingEntries.push(this.form);
      localStorage.setItem("posts", JSON.stringify(existingEntries));
      this.form = {
        title: null,
        text: null,
        category: null,
        tags: []
      };
      this.$emit("closeModal");
      this.$emit("postSaved");
    },
    editPost() {
      this.form.tags = [...this.tags];
      if(this.form.tags.length === 0){
        return
      }
      let existingEntries = JSON.parse(localStorage.getItem("posts"));
      existingEntries = existingEntries.map(item => {
        if(item.id === this.form.id){
          return item = {...this.form}
        }
        return item;
      })
      localStorage.setItem("posts", this.form);
      localStorage.setItem("posts", JSON.stringify(existingEntries));
      this.form = {
        title: null,
        text: null,
        category: null,
        tags: []
      };
      this.$emit("closeModal");
      this.$emit("postSaved");
    }
  }
};
</script>

<style scoped lang="scss">
.modal-close {
  top: 4px;
  right: 4px;
  cursor: pointer;
  position: absolute;
  z-index: 5;
  width: 20px;
  height: 20px;
  background: transparent;
  border: none;
  &::before {
    position: absolute;
    top: 50%;
    right: 50%;
    content: "";
    height: 16px;
    width: 2px;
    transform: translate(-50%, -50%) rotate(45deg);
    background-color: rgb(0, 0, 0);
  }
  &::after {
    position: absolute;
    top: 50%;
    right: 50%;
    content: "";
    height: 16px;
    width: 2px;
    transform: translate(-50%, -50%) rotate(-45deg);
    background-color: rgb(0, 0, 0);
  }
}
.modal-form {
  background-color: rgb(201, 198, 198);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 35px 20px;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  z-index: 10;
  &-category-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    input {
      width: 65%;
      margin-bottom: 0;
    }
    button {
      width: 30%;
    }
  }
  &_input {
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #5f768d;
    border-radius: 20px;
  }
  &-save {
    padding: 10px;
  }
  &-tags-list {
    text-align: start;
    margin-bottom: 20px;
    &_title {
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    &_item {
      margin-bottom: 5px;
      position: relative;
      display: flex;
      justify-content: space-between;
      &-delete {
        position: relative;
        width: 14px;
        height: 14px;
        border: 1px solid black;
        border-radius: 50%;
        background-color: red;
        cursor: pointer;
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 7px;
          height: 1px;
          background-color: black;
        }
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          width: 7px;
          height: 1px;
          background-color: black;
        }
      }
    }
  }
}
</style>

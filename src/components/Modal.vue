<template>
  <div class="modal" @click="closeModalByOverlay($event)" ref="modal">
		<Form 
      @closeModal="closeModal" 
      @postSaved="postSaved" 
      :isCategoryPage="isCategoryPage" 
      :currentEditPost="currentEditPost"
    />
  </div>
</template>

<script>
import Form from "../components/Form.vue";

export default {
  name: "Modal",
	components:{
		Form
	},
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
  mounted() {
    document.addEventListener("keydown", (e) => {
        if (e.key === 'Escape') {
            this.$emit('closeModal');
        }
    });
  },
  methods: {
		closeModal() {
      this.$emit("closeModal");
    },
    closeModalByOverlay(e) {
      if(e.target === this.$refs.modal){
        this.$emit("closeModal");
      }
    },
    postSaved() {
      this.$emit("postSaved");
    }
  }
};
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  transition: opacity 200ms linear;
  z-index: 10;
}
</style>

<template>
  <button type="button" class="add-post-button" @click="handleOpenModal"></button>
</template>

<script>

export default {
  name: 'AddPost',
  methods:{
    handleOpenModal() {
      this.$emit('openModal')
    }
  }
}
</script>

<style scoped lang="scss">
.add-post-button{
  width: 30px;
  height: 30px;
  position: absolute;
  right: 50px;
  border: none;
  border-radius: 50%;
  background-color: #3f51b5;
  cursor: pointer;
  box-shadow: 0 3px 5px -1px rgba(0,0,0,20%);
  &::before{
    position: absolute;
    content: '';
    width: 1px;
    height: 50%;
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &::after{
    position: absolute;
    content: '';
    width: 1px;
    height: 50%;
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
  }
}
</style>
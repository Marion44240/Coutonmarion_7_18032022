<template>
  <header class="header-forum">
    <img src="../assets/Logo-groupomania.png" alt="Logo Groupomania" />
  </header>
</template>

<script>
export default {
  name: "HeaderForum",
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  height: 60px;
  background: linear-gradient(violet, red);
  padding: 10px;

  img {
    width: 150px;
  }
}
</style>

<template>
  <header class="header-forum">
    <img src="../assets/Logo-groupomania.png" alt="Logo Groupomania" />
    <nav id="navbar">
      <img @click="profil" src="../assets/avatar.png" alt="Boutton de profil">
      <img @click="logout" src="../assets/logout.png" alt="Boutton de déconnexion">
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderForum",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/');
    }
  },
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background: linear-gradient(violet, red);
  padding: 10px;

  img {
    width: 150px;
  }
}
#navbar {
  display:flex;
  align-items: center;
  height: 30px;
  gap: 15px;
  margin-right: 10px;
  img {
    width: 30px;
    cursor: pointer;
  }
}
</style>

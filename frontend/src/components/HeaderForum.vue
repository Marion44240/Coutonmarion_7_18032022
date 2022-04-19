<template>
  <header class="header-forum">
    <img src="../assets/Logo-groupomania.png" alt="Logo Groupomania" />
    <nav id="navbar">
      <img @click="profil" v-if="avatar != ''" :src="avatar" alt="Bouton de profil">
      <img @click="profil" v-else src="../assets/avatar.png" alt="avatar">
      <img @click="home" src="../assets/home.webp" alt="Bouton du forum">
      <img @click="logout" src="../assets/logout.png" alt="Bouton de déconnexion">
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderForum",
  data() {
    return {
      avatar: ''
    }
  },
  mounted() {
    const id = localStorage.getItem('userId')
    this.axios.get(`http://localhost:3000/api/auth/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((res) => {
      console.log(res)
      this.avatar = res.data.avatar
    })
    .catch((err) => {
      console.log(err)
    });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/');
    },
    profil() {
      this.$router.push('/profil');
    },
    home() {
      this.$router.push('/forum');
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
    height: 30px;
    object-fit: cover;
    cursor: pointer;
    border-radius: 50%;
  }
}
</style>

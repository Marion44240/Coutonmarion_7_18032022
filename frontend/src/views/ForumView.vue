<template>
  <div class="forum">
    <HeaderForum/>
    <main>
      <section id="hello">
        <h1>Bonjour {{ username }}</h1>
      </section>

      <section id="container">
        <div id="container__forum">

          <div id="container__publish">
            <form id="publish">
              <img src="../assets/avatar.png" alt="Photo de profil utilisateur">   
              <div id="publish__description">
                <input v-model="description" type="text" placeholder="Créez une publication...">
              </div>
              <div id="publish__button">
                <button type="file" ref="file" id="file" @change="selectFile()"></button>
                <button @click="publish()">Publier !</button>
              </div>         
            </form>
          </div>

          <div id="container__post">
            <h2>Fil d'actualité</h2>
          </div>
          <div id="post">
            Voici les posts
          </div>
        </div>
      
      </section>
    </main>
  </div>
</template>

<script>
import HeaderForum from '@/components/HeaderForum.vue'

export default {
  name: 'ForumView',
  components: {
    HeaderForum
  },
  data() {
    return {
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      description: '',
      file: '',
    }
  },
  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0]
    },
    publish() {
      const data = new FormData();   
      data.append('userId', this.userId);
      data.append('description', this.description);
      data.append('image', this.file, this.file.name)
      
      this.axios.post('http://localhost:3000/api/post/', data, {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('token')
        }
      })
      .then(() => {
        window.location.reload();
      }).catch((err) => {
        console.log(err, 'le poste n\'a pas pu être créer !')
      });
    }
  },
}
</script>

<style lang="scss" scoped>
main {
  padding: 20px;
  #hello {
    display: flex;
    text-align: center;
    justify-content: center;
    background: -webkit-linear-gradient(violet, red);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 20px;
  }
  #container {
    display: flex;
    justify-content: center;

    &__forum {
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 1px 1px 6px rgb(231, 75, 101);
      border-radius: 8px;
      width: 70%;   
      padding: 15px;
      margin: 20px 10px;
      background: white;
    }
    &__publish {  
      display: flex; 
      flex-wrap: wrap;
      border-radius: 5px;
      padding: 15px;
      margin: 10px;
      width: 95%;
      background: linear-gradient(violet, red);

      #publish {
        display: flex;
        align-items: center;
        gap: 15px; 
        img {
          flex: 1;
        }
        &__description {
          flex: 3;
          height: 90%;
          input {
            width: 100%;
            height: 100%;
            outline: none;
            padding: 10px;
          }
        }
        &__button {
          display: flex;
          flex: 1;
          flex-wrap: wrap;
          gap: 20px;
          button {
            height: 40px;
            width: 100%;
            border-radius: 10px;
            font-size: 12px;
            font-weight: bold;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
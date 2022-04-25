<template>
  <div class="forum">
    <HeaderForum/>
    <main>
      <section id="hello">
        <h1>Bonjour {{ username }}, <br/>
          ici vous pouvez poster et suivre notre fil d'actualité.
        </h1>
      </section>

      <section id="container">
        <div id="container__forum">

          <div id="container__publish">
            <form id="publish">

              <div id="publish__user">
                <img v-if="avatar != ''" :src="avatar" class="avatar" alt="photo de profil"> 
                <img v-else src="../assets/avatar.png" class="avatar" alt="avatar">
                <p id="name">{{ username }}</p>
              </div>

              <div id="publish__description">
                <input v-model="description" type="text" aria-label="description" placeholder="Créez une publication...">
              </div>     

              <div id="publish__button">
                <label for="file" class="button">Ajouter une image</label>
                <input v-on:change="selectFile" id="file" name="file" type="file" accept="image/*">
                <img :src="viewImage" v-if="viewImage">
                <button @click="publish()" class="button">Publier</button>
              </div>
              
            </form>
          </div>

          <div id="container__post">
            <h2>Fil d'actualité</h2>
          </div>

          <ListPost />

        </div>
      
      </section>
    </main>
  </div>
</template>

<script>
import HeaderForum from '@/components/HeaderForum.vue'
import ListPost from '@/components/ListPost.vue'

export default {
  name: 'ForumView',
  components: {
    HeaderForum,
    ListPost
  },
  data() {
    return {
      username: '',
      avatar: '',
      description: '',
      image: '',
      viewImage: ''
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
      this.username = res.data.username
      this.avatar = res.data.avatar
    })
    .catch((err) => {
      console.log(err)
    });
  },
  methods: {
    selectFile(e) {
      this.image = e.target.files[0];
      this.viewImage = URL.createObjectURL(this.image);
    },
    publish() {
      if (this.description.length <= 4 && this.image === '') {
        alert('Aucun contenu à publier !')
      } 
      else {
        const data = new FormData();
        data.append('userId', localStorage.getItem('userId'));
        data.append('description', this.description);
        data.append('image', this.image);
        this.axios.post('http://localhost:3000/api/post', data, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((res) => {
          console.log('Publication créée', res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  padding: 20px;
  @media screen and (max-width: 400px) { padding: 20px 5px; }
  #hello {
    display: flex;
    text-align: center;
    justify-content: center;
    background: -webkit-linear-gradient(violet, red);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 18px;
    @media screen and (max-width: 450px) {
        font-size: 13px;     
    }
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
      width: 60%;   
      margin: 20px 10px;
      background: white;
      @media screen and (max-width: 860px) { 
        width: 80%; 
      }
      @media screen and (max-width: 550px) {
        width: 100%;   
      }
    }
    &__publish {  
      border-radius: 5px;
      padding: 15px 25px;
      margin: 25px 0;
      width: 80%;
      background: linear-gradient(violet, red);
      @media screen and (max-width: 680px) {
        width: 95%;
      }
      @media screen and (max-width: 540px) { padding: 10px; }

      #publish {
        display: flex;
        flex-direction: column;
        &__user {
          display: flex;
          align-items: center;
          gap: 10px;
          .avatar {
            border-radius: 50%;
            width: 50px;
            height: 50px;
            object-fit: cover;
            border: 2px solid white;
          }
          #name {
            width: 50%;
            color: white;
            text-shadow: 1px 2px 4px black;
          }
        }

        &__description{
          input {
            outline: none;
            padding: 10px;
            border: none;
            border-radius: 5px;
            height: 90px;
            width: 100%;
          }
        }

        &__button {
          display: flex;
          justify-content: flex-end;
          gap: 4px;
          .button {
            cursor: pointer;
            height: 100%;
            border: 1px dotted red;
            padding: 8px;
            background: rgb(250, 231, 234);
            font-weight: bold;
            font-size: 14px;
            color: #94142A;
            border-radius: 5px;
            @media screen and (max-width: 450px) {
              font-size: 12px;     
            }
            &:hover {
              opacity: 0.8;
            }
          }
          img { 
            width: 50px;
            height: 33px;
            border-radius: 5px;
            object-fit: cover;
          }
          #file { 
            display: none; 
          }
        }
      }
    }
    &__post {
      background: -webkit-linear-gradient(violet, red);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      @media screen and (max-width: 450px) {
        font-size: 13px;     
      }
    }
  }
}
</style>
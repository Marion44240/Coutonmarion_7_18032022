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
            <form>
              <img src="../assets/avatar.png" alt="Photo de profil utilisateur">
              <input type="text" placeholder="Créez une publication...">
              <div id="button">
                <button>Choisir une image</button>
                <button>Publier !</button>
              </div>         
            </form>
          </div>

          <div id="container__post">
            <h2>Fil d'actualité</h2>
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
  }
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
      border-radius: 5px;
      padding: 15px;
      margin: 10px;
      background: linear-gradient(violet, red);

      form {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px;
        img {
          width: 12%;
        }
        input {
          width: 65%;
          outline: none;
          padding: 15px;
        }
        #button {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 12%;
          
        }
      }
    }
  }
}
</style>
<template>
  <div class="post">
      <div>
          <div id="post__user">
                <img src="" alt="avatar">
                <p>{{ posts.username }}</p>
                <p>date de création</p>
          </div>
          <div id="post__description">
                <p>{{ posts.description }}</p>
                <img src="" alt="image du post">
          </div>
          <div id="post__button">
                <button>
                    <i class="fa fa-trash"></i>Supprimer
                </button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ListPost',
    data() {
        return {
            posts: {
                description: "Bonjour tout le monde",
                username: "Marion",
                image: '',
                avatar: '',
            },
        }
    },
}
</script>

<style>

</style>
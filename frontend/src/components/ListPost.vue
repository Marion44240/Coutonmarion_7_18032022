<template>
  <div class="viewFil">
      <div id="post" v-for="post in posts" :key="post.id">
            <div id="post__container">
                <div id="post__user">
                    <img v-if="post.User.avatar != ''" :src="post.User.avatar" alt="avatar">
                    <img v-else src="../assets/avatar.png" alt="avatar">
                    <div id="info">
                        <p id="name">{{ post.User.username }}</p>
                        <p id="date">{{ dateFormat(post.createdAt) }}</p>
                    </div>
                </div>
                <div id="post__button">
                        <i class="fa fa-trash" v-if="post.userId == userId || isAdmin == 'true'" @click="deletePost(post.id)" aria-label="supprimer post"></i>
                </div>
             </div>
            <div id="post__description">
                <p>{{ post.description }}</p>
                <img v-if="post.image != ''" :src="post.image" alt="image du post">
            </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'ListPost',
    data() {
        return {
            userId: localStorage.getItem('userId'),
            isAdmin: localStorage.getItem('isAdmin'),
            avatar: '',
            posts: [],
            post: '',
            image: '',
            description: '',
        }
    },
    mounted() {
        this.axios.get('http://localhost:3000/api/post', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((res) => {
            console.log(res)
            this.posts = res.data 
        }).
        catch((err) => {
            console.log(err)
        });
    },
    methods: {
        dateFormat(date) {
            return moment(date).format('DD/MM/YY à HH:mm')
        },
        deletePost(id) {
            this.axios.delete('http://localhost:3000/api/post/' + id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                alert('Votre publication est supprimé !');
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.viewFil {
    width: 80%;
    #post {
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        padding: 15px 25px;
        margin: 25px 0;
        background: linear-gradient(violet, red);

        &__container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &__user {
            display: flex;
            align-items: center;
            gap: 10px;
            img {
                border-radius: 50%;
                width: 50px;
                height: 50px;
                object-fit: cover;
                border: 2px solid white;
            }
            #info {          
                #name {
                    color: white;               
                    text-shadow: 1px 2px 4px black;
                }
                #date {
                    color: black;               
                    font-size: 11px;
                }          
            } 
        }
        &__button {
            i{
                cursor: pointer;
                color: #94142A;
                &:hover {
                    color:rgb(250, 231, 234)
                }
            }
        }
        &__description {
            background: white;
            border-radius: 5px;
            padding: 10px;
            img{
                margin-top: 10px;
                width: 100%;
                height: 250px;
                object-fit: cover;
            }
        }
    }        
}
</style>
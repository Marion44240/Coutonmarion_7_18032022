<template>
    <div class="viewFil">
        <div id="post" v-for="post in posts" :key="post.id">
            <div id="post__container">
                <div id="post__user">
                    <img v-if="post.User.avatar != ''" :src="post.User.avatar" alt="photo de profil">
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
            <div id="post__comment">
                <div id="likeComment">
                    <i id="like" @click="likePost(post)" class="fas fa-thumbs-up" aria-label="like post"></i>
                    <span>{{ post.Likes.length }}</span>
                </div>     
                <button id="viewComment" @click="show(post)" v-if="post.isDisplay">Fermer</button>
                <button id="viewComment" @click="show(post)" v-else>
                    {{ post.Comments.length }} commentaire<span v-if="post.Comments.length > 1">s</span>
                </button>
            </div>

            <div id="viewComment" v-if="post.isDisplay">
                <div id="viewComment__comment" v-for="comment in post.Comments" :key="comment.id">                   
                    <div id="viewComment__user">
                        <img v-if="comment.User.avatar" :src="comment.User.avatar" alt="photo de profil">
                        <img v-else src="../assets/avatar.png" alt="avatar">
                        <div id="viewComment__content">
                            <p id="name">{{ comment.User.username }}</p>
                            <p id="content">{{ comment.content }}</p>                              
                        </div>
                    </div>                   
                    <div id="viewComment__info">
                        <p id="date">{{ dateFormat(comment.createdAt) }}</p> 
                        <i class="fa fa-trash" v-if="comment.userId == userId || isAdmin == 'true'" @click="deleteComment(comment.id)" aria-label="supprimer comment"></i>     
                    </div>
                </div>
                
                <p id="noPublish__comment" v-if="post.isDisplay && post.Comments.length === 0">Aucun commentaire...</p>
            
                <div id="comment">
                    <div id="comment__user">
                        <img v-if="avatar != ''" :src="avatar" class="avatar" alt="photo de profil"> 
                        <img v-else src="../assets/avatar.png" class="avatar" alt="avatar">
                        <p id="name">{{ username }}</p>
                    </div>
                    <form id="comment__content">
                        <input v-model="post.commentContent" type="text" aria-label="commentaire" placeholder="Votre commentaire...">
                        <button @click="createComment(post)" aria-label="publier commentaire">
                            <i class="far fa-paper-plane"></i>
                        </button>
                    </form>               
                </div>
            
            </div>        
        </div>
        <p id="noPublish__post" v-if="posts.length === 0">Aucune publication à afficher... A vous de jouer !</p>
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
            username: '',
            avatar: '',
            posts: [],
            post: '',
            image: '',
            description: '',
            comments: [],
            likes: [],
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

        this.axios.get('http://localhost:3000/api/post', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((res) => {
            console.log(res)
            this.posts = res.data.map(d => {
                d.isDisplay = false;
                d.commentContent = '';
                return d;
            })
        })
        .catch((err) => {
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
        },

        show(post) {
            post.isDisplay =! post.isDisplay
            post.commentContent = ''
        },

        createComment(post) {
            if (post.commentContent === '') {
                alert('Aucun commentaire à envoyer !')
            } 
            else {
                this.axios.post('http://localhost:3000/api/post/' + post.id + '/comment/', {
                    content: post.commentContent,
                }, 
                { 
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    alert('Commentaire créé')
                    window.location.reload()
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        },

        deleteComment(id) {
            this.axios.delete('http://localhost:3000/api/comment/' + id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                alert('Votre commentaire est supprimé !');
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
        },

        likePost(post) {                                             
            if(post.Likes.find(d => d.userId == this.userId)) {
                this.like = false  
                this.axios.post('http://localhost:3000/api/post/' + post.id + '/like', {
                    like: this.like,
                },{
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    alert("Like supprimé !");
                    window.location.reload();

                })
                .catch((err) => {
                    console.log(err)
                })
            } 
            else {
                this.like = true                  
                this.axios.post('http://localhost:3000/api/post/' + post.id + '/like', {
                    like: this.like,
                },{
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    alert("Like ajouté !");
                    window.location.reload();

                })
                .catch((err) => {
                    console.log(err)
                })
            }           
        },
    },
}
</script>

<style lang="scss" scoped>
.viewFil {
    width: 80%;
    @media screen and (max-width: 680px) {
        width: 95%;     
    }
    #post {
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        padding: 15px 25px;
        margin: 25px 0;
        background: linear-gradient(violet, red);
        @media screen and (max-width: 450px) {
            padding: 10px;     
        }
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
                    width: 100%;
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
                    color: white;
                }
            }
        }
        &__description {
            background: white;
            border-radius: 5px;
            padding: 10px;
            font-style: italic;
            @media screen and (max-width: 450px) {
                font-size: 14px;     
            }
            img{
                margin-top: 10px;
                width: 100%;
                height: 250px;
                object-fit: cover;
            }
        }
        &__comment {
            display: flex;
            justify-content: space-between;
            #likeComment {
                display: flex;
                gap: 5px;
                color: white;
                cursor: pointer;
                margin: 10px 0 0 3px;
                font-size: 14px;
                i:hover {
                    color: black;
                }
            }
            #viewComment {
                background: transparent;
                border: transparent;
                color: white;
                margin-top: 8px;
                padding: 2px;
                font-weight: bold;
                font-size: 13px;
                text-shadow: 1px 2px 4px black;
                border-bottom: 1px dotted white;
                cursor: pointer;
                &:hover {
                    opacity: 0.8;
                }
            }
        }
        #comment {
            border: 1px dotted white;
            margin: 5px 20px;
            padding: 10px;
            border-radius: 5px;
            @media screen and (max-width: 550px) {
                margin: 5px 0px;   
            }
            &__user {
                display: flex;
                align-items: center;
                gap: 10px;
                img {
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    border: 2px solid white;
                }         
                #name {
                    color: white;               
                    text-shadow: 1px 2px 4px black;
                    font-size: 12px;
                    width: 50%;
                }         
            }
            &__content {
                display: flex;
                justify-content: center;
                input {
                    outline: none;
                    padding: 10px;
                    border: none;
                    border-radius: 5px 0 0 5px;
                    height: 30px;
                    width: 90%;
                }
                button {
                    border-radius: 0 5px 5px 0;
                    height: 30px;
                    width: 10%;
                    border: none;
                    cursor: pointer;
                    background: rgb(250, 231, 234);
                    &:hover {
                        opacity: 0.8
                    }
                    i {
                        color: #94142A;
                        font-weight: bold;
                    }
                }           
            }
        }
        #viewComment {
            &__comment {
                border-radius: 5px;
                border: 2px solid white;
                background: linear-gradient(rgb(239, 157, 239), rgb(248, 68, 68));
                margin: 10px 20px 0 20px;
                padding: 10px;
                @media screen and (max-width: 550px) {
                    margin: 5px 0;     
                }
            }
            &__user {
                display: flex;
                gap: 10px;
                img {
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    border: 2px solid white;
                }
            }
            &__content {
                display: flex;
                flex-direction: column;
                gap: 5px;
                background-color: white;
                border-radius: 5px;
                padding: 8px;
                flex: 2;
                #name {
                    background: -webkit-linear-gradient(violet, red);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: bold;
                }
                #content {
                    font-size: 14px;
                    font-style: italic;
                }
            }
            &__info {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                margin-top: 10px;
                i{
                    font-size: 14px;
                    cursor: pointer;
                    color: #6a0f1e;
                    &:hover {
                        color: white;
                    }
                }
            }          
        }
    }
    #noPublish { 
        &__comment {
            display: flex;
            justify-content: center; 
            padding: 10px; 
            margin: 10px 20px 0 20px;
            border: 1px solid white;
            @media screen and (max-width: 550px) {
                margin: 5px 0;     
            }
        }
        &__post {
            display: flex;
            justify-content: center;
            padding: 10px;
            margin: 30px;
            font-style: italic;
            color: #94142A;
            border-radius: 5px;
            box-shadow: 1px 1px 6px rgb(231, 75, 101);
            border: 1px solid violet;
        }
    }  
}
</style>
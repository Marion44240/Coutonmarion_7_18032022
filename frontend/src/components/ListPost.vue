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
            <div id="post__comment">
                <p id="viewComment" @click="viewComment()" v-if="toClickComment === true">Voir les commentaires</p>
                <p id="viewComment" @click="hideComment()" v-else>Cacher les commentaires</p>             
                <button id="newComment" @click="show()">Commenter</button>     
            </div>

            <div id="comment" v-if="isDisplay">
                <div id="comment__user">
                    <img v-if="avatar != ''" :src="avatar" class="avatar" alt="photo de profil"> 
                    <img v-else src="../assets/avatar.png" class="avatar" alt="avatar">
                    <p id="name">{{ username }}</p>
                </div>
                <form id="comment__content">
                    <input v-model="content" type="text" aria-label="commentaire" placeholder="Votre commentaire...">
                    <button @click="createComment(post.id)" aria-label="publier commentaire">
                        <i class="far fa-paper-plane"></i>
                    </button>
                </form>               
            </div>

            <div id="viewComment" v-if="toSeeComment === true">
                <div id="viewComment__comment" v-for="comment in comments" :key="comment.id">                   
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
                <p id="noPublish__comment" v-if="toSeeComment === true && comments.length === 0">Aucun commentaire !</p>
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
            comment: '',
            content: '',
            isDisplay: false,
            toSeeComment: false,
            toClickComment: true,
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
            this.posts = res.data 
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
        show(){
            this.isDisplay = true
        },
        createComment(id) {
            if (this.content === '') {
                alert('aucun commentaire a envoyer !')
            } 
            else {
                this.axios.post('http://localhost:3000/api/comment/', {
                    userId: this.userId,
                    content: this.content,
                    postId: id
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
        viewComment() {
            this.axios.get('http://localhost:3000/api/comment', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((res) => {
                this.comments = res.data;
                this.toClickComment = false
                this.toSeeComment = true
            })
            .catch((err) => {
                console.log(err)
            })
        },
        hideComment(){
            this.toSeeComment = false
            this.toClickComment = true
        }
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
                    color:rgb(250, 231, 234)
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
            justify-content: flex-end;
            @media screen and (max-width: 450px) {
                justify-content: space-between;     
            }
            #viewComment {
                margin: 8px;
                color: rgb(250, 231, 234);
                font-weight: bold;
                font-size: 14px;
                text-shadow: 1px 2px 4px #69101f;
                border-bottom: 1px dotted white;
                cursor: pointer;
                @media screen and (max-width: 380px) {
                    font-size: 12px;     
                }
            }
            #newComment {
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
            margin-top: 5px;
            border: 1px solid white; 
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
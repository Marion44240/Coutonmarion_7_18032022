<template>
    <div class="profil">
        <HeaderForum/>
        <main>
            <section id="hello">
                <h1>Profil de {{ username }}</h1>
            </section>

            <section id="container">
                <div id="container__profil">
                    <img :src="avatar" alt="avatar utilisateur">
                    <label for="file">Modifier votre avatar :</label>
                    <input v-on:change="selectFile" name="file" type="file" accept="avatar/*">
                    <div id="container__form">
                        <p>Vos informations</p>
                            <label for="pseudo">Pseudo :
                                <input type="text" name="pseudo" id="pseudo" v-model="username">
                            </label>
                            <label for="email">Email :
                                <input type="email" name="email" id="email" v-model="email">
                            </label>
                        <button @click="updateUser()">Modifier mes informations</button>
                        <button @click="deleteUser()">Supprimer mon compte</button>
                    </div>           
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import HeaderForum from "@/components/HeaderForum.vue";
export default {
    name: "ProfilView",
    components: { 
        HeaderForum
    },
    data() {
        return {
            username: '',
            email: '',
            avatar: '',
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
            this.email = res.data.email
            this.avatar = res.data.avatar
        })
        .catch((err) => {
            console.log(err)
        });
    },

    methods: {
        selectFile(e) {
            const id = localStorage.getItem('userId')
            this.avatar = e.target.files[0];
            const data = new FormData()
            data.append('image', this.avatar)
            this.axios.put(`http://localhost:3000/api/auth/${id}`, data, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((res) => {
                this.avatar = res.data.avatar
            })
            .catch((err) => {
                console.log(err)
            });
        },

        updateUser() {
            const id = localStorage.getItem('userId')
            const data = new FormData();
            data.append('email', this.email);
            data.append('username', this.username);
            this.axios.put(`http://localhost:3000/api/auth/${id}`, data, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((res) => {
                this.uersname = res.data.username,
                this.email = res.data.email,
                window.location.reload();
            })
            .catch((err) => {
                console.log(err)
            });
        },

        deleteUser() {
            const id = localStorage.getItem('userId')
            this.axios.delete(`http://localhost:3000/api/auth/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                alert('Votre compte est supprimé !');
                localStorage.clear()
                this.$router.push('/');
            })
            .catch((err) => {
                console.log(err)
            })
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

    &__profil {
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 1px 1px 6px rgb(231, 75, 101);
        border-radius: 8px;
        width: 50%;   
        padding: 15px;
        margin: 20px 10px;
        background: white;
        img { width: 40%; }
    }

    &__form {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 15px;
        margin: 10px;
        width: 95%;
        background: linear-gradient(violet, red);
        border-radius: 5px;
    }
  }
}
</style>
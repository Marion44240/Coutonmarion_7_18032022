<template>
    <div class="profil">
        <HeaderForum/>
        <main>
            <section id="hello">
                <h1>Profil de {{ username }}</h1>
            </section>

            <section id="container">

                <div id="container__profil">
                    <img v-if="avatar != ''" :src="avatar" class="avatar" alt="photo de profil">
                    <img v-else src="../assets/avatar.png" class="avatar" alt="avatar">
                    <label for="file" id="label">Modifier ma photo</label>
                    <input v-on:change="selectFile" id="file" name="file" type="file" accept="avatar/*">

                    <div id="container__form">
                        <h2>Vos informations</h2>
                        <div id="form">
                            <label for="pseudo">Pseudo :</label>
                            <input type="text" name="pseudo" id="pseudo" v-model="username">
                            <label for="email">Email :</label>
                            <input type="email" name="email" id="email" v-model="email">
                            <div id="error">{{ error }}</div>
                        </div>
                        <div id="button">
                            <button @click="updateUser()">Modifier mes informations</button>
                            <button @click="deleteUser()">Supprimer mon compte</button>
                        </div>
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
            error: '',
            regexUsername: /[a-zâäàéèùêëîïôöçñA-Z-0-9\s]{4,25}/,
            regexEmail: /[a-zâäàéèùêëîïôöçñA-Z0-9.-_]+[@]{1}[a-zA_Z0-9.-_]+[.]{1}[a-z]{2,4}/
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
            if (this.username == '' || this.email == '') {
                return this.error ='⚠ Veuillez renseigner tous les champs du formulaire !'
            } 
            else if (!this.regexUsername.test(this.username)){
                return this.error ='⚠ pseudo non conforme !'
            } 
            else if (!this.regexEmail.test(this.email)){
                return this.error ='⚠ email non conforme !'
            }
            else {
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
            }
        },

        deleteUser() {
            const id = localStorage.getItem('userId')
            if (confirm('Êtes-vous sur de vouloir supprimer votre compte ?')) {
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
        }
    },
}
</script>

<style lang="scss" scoped>
main {
  padding: 20px;
  @media screen and (max-width: 450px) {
      padding: 20px 0;   
  }
  #hello {
    display: flex;
    text-align: center;
    justify-content: center;
    background: -webkit-linear-gradient(violet, red);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 18px;
    @media screen and (max-width: 450px) {
        font-size: 15px;     
    }
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
        @media screen and (max-width: 770px) {
            width: 80%;
        }
        @media screen and (max-width: 450px) {
            width: 100%;
        }
        .avatar {
            border-radius: 50%;
            width: 260px;
            height: 260px;
            object-fit: cover;
            padding: 10px;
            border: 1px dotted violet;
            color: white;
            @media screen and (max-width: 550px) {
                width: 200px;
                height: 200px;
            }
        }
        #file {
            display: none;
        }
        #label {
            cursor: pointer;
            border: 1px dotted #94142A;
            padding: 8px;
            background: rgb(250, 231, 234);
            margin: 10px;
            font-weight: bold;
            font-size: 14px;
            color: #94142A;
            &:hover {
                box-shadow: 2px 3px 4px violet;
                transition: all 0.3s;
            }
        }
    }

    &__form {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 15px;
        margin: 10px;
        width: 80%;
        gap: 10px;
        background: linear-gradient(violet, red);
        border-radius: 5px;
        @media screen and (max-width: 500px) {
            width: 100%;
        }
        h2 {
            display: flex;
            justify-content: center;
            width: 90%;
            font-size: 18px;
            font-weight: bold;
            color: white;
            text-shadow: 2px 2px 4px black;
        }
        #form {
            display: flex;
            flex-direction: column;
            padding: 0px 10px;
            width: 90%;
            gap: 5px;
            @media screen and (max-width: 500px) {
                width: 100%;
            }
            label {
               font-size: 14px;
               color: white;
               text-shadow: 1px 2px 2px black;
            }
            input {
                outline: none;
                border: none;
                padding: 7px;
                border-radius: 8px;
                margin-bottom: 8px;
                color: #94142A;
                background-color: rgb(250, 231, 234);
            }
            #error {
                display: flex;
                justify-content: center;
                font-size: 12px;
            }
        }
        #button {
            display: flex;
            justify-content: space-between;
            width: 90%;
            @media screen and (max-width: 500px) {
                width: 100%;
            }   
            button {
                cursor: pointer;
                border: 1px dotted #94142A;
                padding: 8px;
                background: rgb(250, 231, 234);
                margin: 10px;
                font-weight: bold;
                font-size: 13px;
                color: #94142A;
                &:hover {
                    box-shadow: 2px 3px 4px violet;
                    transition: all 0.2s;
                }
            }
        }
    }
  }
}

</style>
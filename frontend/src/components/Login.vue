<template>
<div class="form-login">
    <h2>Connexion</h2>
    <form @submit="login">
        <input type="email"
                placeholder="Entrez votre email" 
                aria-label="email"
                v-model="email"
                required>
        <div id="password">
            <input :type="showPassword ? 'text' : 'password'"
                    aria-label="password"
                    placeholder="Entrez votre mot de passe"
                    v-model="password"                
                    required>
            <span @click="toggleShow" class="fas" :class="{ 'fa-eye': showPassword, 'fa-eye-slash': !showPassword }">
            </span>
        </div>
        <button aria-label="connexion" type="submit">Se connecter</button>
    </form>
</div>
</template>

<script>
export default {
    name: 'LoginHome',
    data() {
        return {
            email: '',
            password: '',
            showPassword: false
        }
    },
    methods: {
        toggleShow() {
            this.showPassword =! this.showPassword;
        },
        login (e) {
            this.axios.post('http://localhost:3000/api/auth/login', {
                email: this.email,
                password: this.password,
            }) 
            .then ((res) => {
                console.log('Connexion réussi !', res);
                window.localStorage.setItem('token', res.data.token);
                window.localStorage.setItem('username', res.data.username);
                window.localStorage.setItem('userId', res.data.userId);
                this.$router.push('/forum');
            }) 
            .catch((error) => {
                console.log('Utilisateur non trouvé !', error);
            })
            e.preventDefault();
        }
    }
}
</script>

<style scoped lang="scss">
.form-login {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;
    gap: 20px;
    h2 {
     background: -webkit-linear-gradient( red, violet);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    }
}
form {
  display: flex;
  flex-direction: column;
  width: 100%;
    input {
        width: 100%;
        height: 35px;
        margin-bottom: 10px;
        padding: 10px;
        border: none;
        outline: none;
        background-color: rgb(250, 231, 234);
        border-radius: 10px;
        font-size: 12px;
    }
    #password {
        position: relative;   
        span {
            position: absolute;
            right: 20px;
            top: 8px;
            opacity: 0.5;
            cursor: pointer;
            &:hover {
                color: red;
            }
        }
    }
    button {
        margin: 20px 0;
        height: 35px;
        border: none;
        border-radius: 10px;
        background: -webkit-linear-gradient(red, violet);
        cursor: Pointer;
        font-size: 18px;
        font-weight: bold;
        color: white;
        &:hover {
            opacity: 0.8;
        }
    }
}
</style>
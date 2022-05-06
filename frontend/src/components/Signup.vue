<template>
  <div class="form-signup">
    <h2>Inscription</h2>
    <form>
        <input type="text"
                aria-label="username"
                placeholder="Entrez votre pseudo"
                v-model="username"
                pattern="[a-zâäàéèùêëîïôöçñA-Z-0-9\s]{4,25}"
                required>
        <input type="email"
                aria-label="email"
                placeholder="Entre votre email"
                v-model="email"
                pattern="[a-zâäàéèùêëîïôöçñA-Z0-9.-_]+[@]{1}[a-zA_Z0-9.-_]+[.]{1}[a-z]{2,4}"
                required>
        <div id="password">
                <input :type="showPassword ? 'text' : 'password'"
                        aria-label="password"
                        placeholder="Entrez votre mot de passe"
                        v-model="password"
                        pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d{2,25}).{8,15}"                
                        required>
                <span @click="toggleShow" class="fas" :class="{ 'fa-eye': showPassword, 'fa-eye-slash': !showPassword }">
                </span>
        </div>
        <div id="error">{{ error }}</div>

      <button aria-label="Inscription" @click="signup()">S'inscrire</button>
    </form>
  </div>
</template>

<script>
export default {
    name: "SignupHome",
    data() {
        return {
            password: '',
            email: '',
            username: '',
            error: '',
            showPassword: false
        }
    },
    methods: {
        toggleShow() {
            this.showPassword =! this.showPassword;
        },
        signup () {
            if (this.email == '' || this.username == '' || this.password == '') {
                return this.error = '⚠ Veuillez renseigner tous les champs du formulaire dans un format conforme. Votre pseudo doit comprendre 4 caractères min, votre mail doit étre valide ex:groupomania@email.com'
            }  
            else {
                this.axios.post('http://localhost:3000/api/auth/signup', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                })
                .then((res) => {
                    console.log('Utilisateur créé !', res);
                    alert('Inscription réussi');
                    window.location.reload();
                })
                .catch((error) => {
                    this.error = error.response.data.message
                });
            }
        }
    }
};

</script>

<style scoped lang="scss">
.form-signup {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;
    gap: 12px;
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
    #error {
        font-size: 11px;
        color: rgb(183, 9, 9);
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
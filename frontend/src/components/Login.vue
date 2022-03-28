<template>
<div class="form">
    <h2>Connexion</h2>
    <form>
        <input type="text"
                id="email"
                placeholder="Entrez votre email" 
                aria-label="email"
                v-model="email"
                required>
        <input type="text"
                id="password"
                aria-label="password"
                placeholder="Entrez votre mot de passe"
                v-model="password"
                required>
        <button aria-label="connexion" @click="login()">Se connecter</button>
    </form>
</div>
</template>

<script>
export default {
    name: 'LoginHome'
}
</script>

<style scoped lang="scss">
.form {
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
        height: 35px;
        margin-bottom: 10px;
        padding: 10px;
        border: none;
        outline: none;
        background-color: rgb(250, 231, 234);
        border-radius: 10px;
        font-size: 12px;
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
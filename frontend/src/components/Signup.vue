<template>
  <div class="form">
    <h2>Inscription</h2>
    <form>
      <input type="text"
              id="username"
              aria-label="username"
              placeholder="Entrez votre pseudo"
              v-model="username"
              required>
      <input type="text"
              id="email"
              aria-label="email"
              placeholder="Entre votre email"
              v-model="email"
              required>
      <input type="text"
              id="password"
              aria-label="password"
              placeholder="Entrez votre mot de passe"
              v-model="password"
              required>
      <button aria-label="Inscription" @click="signup()">S'inscrire</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignupHome",
};
</script>

<style scoped lang="scss">
.form {
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
    margin-top: 15px;
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
<template>
    <footer>
        <a class="social" href="https://www.twitter.com" aria-label="logo twitter">
        <span class="fa fa-twitter icon-md"></span></a>
        <a class="social" href="https://dribbble.com" aria-label="logo dribbble">
        <span class="fa fa-dribbble icon-md"></span></a>
        <a class="social" href="https://fr-fr.facebook.com" aria-label="logo facebook">
        <span class="fa fa-facebook icon-md"></span></a>
        <a class="social" href="https://www.instagram.com" aria-label="logo instagram">
        <span class="fa fa-instagram icon-md"></span></a>
    </footer>
</template>

<script>
export default {
    name: 'FooterPage'
}
</script>

<style lang="scss" scoped>
footer { display: flex; 
    justify-content: center; 
    align-items: center; 
    height: 55px;
    background: linear-gradient(red 25%, violet);
    
    a { 
        text-decoration: none;
        padding: 0 20px;
        &:hover {
            opacity: 0.7;
        }
        
        span {
            font-size: 25px;
            color: white;
        }
    } 
}
</style>>
<template>
    <div class="home-container">
        <h1>Product Review App</h1>
        <p>You can check out a link to the products to review <a @click.prevent="this.$router.push('/product')">here</a>.</p>
        <p>Or you can see a random product <a @click.prevent="randomProduct">here</a>.</p>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'HomeView',
    methods: {
        randomProduct() {
            axios.get('/api/randproduct/')
            .then(rep => {
                this.$router.push('/product/' + rep.data.id + '/')
                })
            .catch(err => {console.log(err)})
        }
    }

}
</script>

<style lang="sass">
.home-container
    margin-top: 5em
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 2em
    a
        text-decoration: underline
        color: blue
    a:hover
        cursor: pointer
    h1
        font-weight: bold
        font-size: 1.5em
        color:  white
        -webkit-text-stroke: .25px black
        background-color: #383E65
        padding:  .5em 1em
        border-radius: 1em
        box-shadow: 1px 1px 4px grey

@media (min-width: 700px)
    .home-container
        h1
            display: none
    
</style>
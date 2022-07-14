<template>
  <HamBurger class="mobile-menu"></HamBurger>
  <NavBar class="main-menu"></NavBar>
  <router-view></router-view>
  <p class="login-username" v-if="isUsername = 'Anonymous User'">Signed in as: {{ isUsername }}</p>
</template>

<script>
import axios from 'axios'
import HamBurger from './components/HamBurger.vue'
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  computed: {
    isUsername() {
      return this.$store.getters.checkIfUsername
    }
  },
  components: {
    HamBurger,
    NavBar,
  },
  beforeCreate() {
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }
  },
}
</script>

<style lang="sass">
* 
  margin: 0
  padding: 0
  box-sizing: border-box

body
  line-height: 1.5em
  background-color: #f2f2f2


@media (max-width: 701px)
  .main-menu
    display: none
  .form-main
    width: 300px

@media (min-width: 700px) 
  .mobile-menu 
    display: none
  .form-main
    margin-right: 10em
    width: 100%
    border-radius: 0 1em 1em 0

@media (min-width: 1000px)
  .form-main
    width: 600px

.form-main
  padding: .5em
  background-color: white
  border: 1px solid black
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: 2em
  border-radius: 1em
  box-shadow: 2px 2px 5px hsl(282, 45%, 73%)

.form-input
  width: 250px
  display: flex
  flex-direction: row
  justify-content: space-between
  gap: 1em
  input
    padding: 0 .5em
    border-radius: .5em
    border: none
    border-bottom: 1px solid black
    background-color: lavender
  .input-color:focus
    outline: 2px solid purple
.form-controls
  display: flex
  gap: 1em
  button
    width: 75px
    height: 30px
    border-radius: 1em
    border: none
.form-container
    margin-top: 5em
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
.login-username
  position: absolute
  bottom: 5px
  right: 5px
  font-size: .6em
</style>
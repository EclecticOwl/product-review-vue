<template>
  <nav class="navbar">
    <span>Product Review App</span>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li v-if="!isAnon"><router-link to="/sign-up">Sign Up</router-link></li>
      <li v-if="!isAnon"><router-link to="/log-in">Log In</router-link></li>
      <li v-if="isAnon"><router-link to="/sign-out">Sign Out</router-link></li>
      <li><router-link to="/product">Products</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
    name: 'NavBar',
    computed: {
    isAnon() {
      return this.$store.state.isAuthenticated
    }
  }
}
</script>
<style lang="sass">
.navbar
  padding-left: 1em
  display: flex
  justify-content: space-between
  align-items: center
  margin-top: 1em
  margin-right: 10em
  background-color: #383E65
  border-radius: 0 1em 1em 0
  box-shadow: 1px 1px 10px grey
  ul 
    display: flex
    justify-content: end
    list-style-type: none
  li
    padding: .5em 1em
  a 
    max-height: 100%
    text-decoration: none
    color: white
    font-size: 1.2
  li:hover
    background-color: #9F2DE3
    cursor: pointer
  li:last-child:hover
    border-radius: 0 1em 1em 0
  span
    font-weight: bold
    font-size: 1.5em
    color:  white
    -webkit-text-stroke: .25px black
</style>
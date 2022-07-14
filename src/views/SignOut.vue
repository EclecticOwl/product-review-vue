<template>
    <div class="form-container">
        <form @submit.prevent="submitForm" class="form-main">
            <div>
                <h1>Sign Out</h1>
            </div>
            <div>
                <p>Are you sure you wish to sign out?</p>
            </div>
            <div class="form-controls">
                <button @click.prevent="goBack">Go Back</button>
                <button type="submit">Sign Out</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SignOut',
    methods: {
        submitForm() {
            const token = localStorage.getItem('token')
        axios
          .post('/auth/token/logout/', token)
          .then( () => {
              this.$store.commit('removeToken')
              this.$store.commit('removeUsername')
              localStorage.removeItem('token')
              this.$router.push('/')
              this.$forceUpdate
            })
            .catch(err => {
              console.log(err)
            })
        },
        goBack() {
            this.$router.push('/')
        }
    }
}

</script>

<style lang="sass">
.form-controls
    button:hover
        cursor: pointer
</style>
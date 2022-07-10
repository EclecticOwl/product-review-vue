<template>
    <div class="form-container">
        <form @submit.prevent="submitForm" class="form-main">
            <div>
                <h1>Log In</h1>
            </div>
            <div class="form-input">
                <label for="username">Username:</label>
                <input class="input-color" type="email" name="username" v-model="username">
            </div>
            <div class="form-input">
                <label for="password">Password:</label>
                <input class="input-color" type="password" name="password" v-model="password">
            </div>
            <div class="form-controls">
                <button @click.prevent="goBack">Go Back</button>
                <button type="submit">Sign In</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "LogIn",
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        submitForm() {
            const formData = {
                username:  this.username,
                password: this.password,
            }

            axios
                .post('/auth/token/login/', formData)
                .then( response => {
                    const token = response.data.auth_token
                    this.$store.commit('setToken', token)
                    axios.defaults.headers.common['Authorization'] = 'Token ' + token
                    localStorage.setItem('token', token)
                    this.$router.push('/')
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
</style>
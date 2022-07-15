<template>
    <div class="notification-container" v-if="isNotification"><p>{{ notification }}</p></div>
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
            notification: '',
            isNotification: false,
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
                    this.$store.commit('setUsername', this.username)
                    this.$router.push('/')
                })
                .catch(err => {
                    if (err.response.status == 400) {
                        this.notifier("Your username or password is invalid. Please try again.")
                    }
                })
        },
        goBack() {
            this.$router.push('/')
        },
        notifier(text) {
            this.notification = text
            this.isNotification = true
            this.username = ''
            this.password = ''

            setTimeout(() => this.notification = null, 5000)
            setTimeout(() => this.isNotification = false, 5000)
        }
    }
}
</script>

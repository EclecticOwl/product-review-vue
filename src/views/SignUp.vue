<template>
    <div class="form-container">
        <form @submit.prevent="submitForm" class="form-main">
            <div>
                <h1>Sign up</h1>
            </div>
            <div class='notification'>
                <p>{{ notification }}</p>
            </div>
            <div class="form-input">
                <label for="username">Username:</label>
                <input type="email" name="username" v-model="username" placeholder="ex: 123@test.com">
            </div>
            <div class="form-input">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password" pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$">
            </div>
            <div class="form-input">
                <label for="password2">Password:</label>
                <input type="password" name="password2" v-model="password2" pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$">
            </div>
            <div class="password-info">
                <p>Your password must contain at least 8 characters.</p>
                <p>Your password can’t be a commonly used password.</p>
                <p>Your password can’t be entirely numeric.</p>
            </div>
            <div class="form-controls">
                <button @click.prevent="goBack">Go Back</button>
                <button type="submit">Sign Up</button>
            </div>

        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "SignUp",
    data() {
        return {
            username: '',
            password: '',
            password2: '',
            notification: null,
            isNotification: false,
        }
    },
    methods: {
        submitForm() {
        if (this.password === this.password2) {
            const formData = {
                username: this.username,
                password: this.password,
            }

            axios
                .post('/auth/users/', formData)
                .then(response => {
                    console.log(response)
                    this.$router.push('/log-in')
                })
                .catch(error => {
                    console.log(error)
                })
        }else{
            this.notifier('It seems like your passwords did not match. Please re-enter and try again.')
        }
            
        },
        goBack() {
            this.$router.push('/')
        },
        notifier(text) {
            this.notification = text
            this.isNotification = true
            setTimeout(() => this.notification = '', 5000)
            setTimeout(() => this.isNotification = '', 5000)

        }
    }
}
</script>
<style lang="sass">
.notification
    display: flex
    background-color: firebrick
    border-radius: 1em
.password-info
    margin-left: .5em
</style>
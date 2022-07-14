<template>
    <div class="notification-container" v-if="isNotification"><p>{{ notification }}</p></div>
  <div class="main-container" v-if="product">
    <div class="product-sidebar">
        <div class="product-sidebar-header">
            <div class="product-description">
                <div>
                    <p class="product-title">{{ product.title }}</p>
                </div>
                <div>
                    <p class="product-owner">By: {{ product.owner }}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="feedback-container" v-if="feedback">
        <div class="feedback-header">
            <p v-if="feedback_length">{{feedback_length}}</p>
            <button @click="showFeedbackForm">Add Comment +</button>
        </div>
        <div v-if="showForm">
            <form class="feedback-form" @submit.prevent="submitFeedback">
                <div>
                    <div class="feedback-input">
                        <label for="title">Title:</label>
                        <input v-model="title" type="text" name="title">
                    </div>
                    <div class="feedback-input">
                        <label for="description" name="description">Content:</label>
                        <textarea v-model="content" name="description" cols="16" rows="2"></textarea>
                    </div>
                    <div class="product-category">
                        <label for="category">Category:</label>
                        <select name="category" v-model="category">
                            <option value="enhancement">Enhancement</option>
                            <option value="feature">Feature</option>
                            <option value="ui">UI</option>
                            <option value="ux">UX</option>
                            <option value="bug">Bug</option>
                        </select>
                    </div>
                </div>
                <div class="feedback-controls">
                    <button type="submit">Submit comment</button>
                </div>
            </form>
        </div>
        <div class="feedback-item" v-for="(item, index) in feedback" :key="index">
            <div class="feedback-upvotes">
                <div :id="item.id" @click="upvoter">
                    <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 6l4-4 4 4" stroke="#4661E6" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
                {{item.upvotes}}
                </div>
            </div>
            <div class="feedback-content">
                <p class="feedback-title">{{item.title}}</p>
                <p class="feedback-description">{{item.description}}</p>
                <p class="feedback-category">{{item.category}}</p>
            </div>
        </div>
    </div>
    <div v-else class="feedback-container">
        <div v-if="showForm">
            <form class="feedback-form" @submit.prevent="submitFeedback">
                <div>
                    <div class="feedback-input">
                        <label for="title">Title:</label>
                        <input v-model="title" type="text" name="title">
                    </div>
                    <div class="feedback-input">
                        <label for="description" name="description">Content:</label>
                        <textarea v-model="content" name="description" cols="16" rows="2"></textarea>
                    </div>
                    <div class="product-category">
                        <label for="category">Category:</label>
                        <select name="category" v-model="category">
                            <option value="enhancement">Enhancement</option>
                            <option value="feature">Feature</option>
                            <option value="ui">UI</option>
                            <option value="ux">UX</option>
                            <option value="bug">Bug</option>
                        </select>
                    </div>
                </div>
                <div class="feedback-controls">
                    <button type="submit">Submit comment</button>
                </div>
            </form>
        </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ProductDetail',
    data() {
        return {
            product: null,
            title: null,
            content: null,
            category: null,
            feedback_length: null,
            showForm: false,
            feedback: null,
            notification: null,
            isNotification: false,
        }
    },
    created() {
            this.getData()
    },
    methods: {
        showFeedbackForm() {
            this.showForm = !this.showForm
        },
        submitFeedback() {
            if (!this.isUser) {
                this.notifier('You need be a registered user to submit a comment!')
            } else {
                const formData = {
                title:  this.title,
                description: this.content,
                category: this.category,
                product:  parseInt(this.$route.params.id)
                }
                console.log(formData)
                const token = localStorage.getItem('token')
                axios
                    .post('/api/feedback/', formData , 'Authorization:  Token ' , token)
                    .then(
                        this.notifier('You have successfully submitted your comment!')
                    )
                    .catch(err => {
                        console.log(err)
                    })
                this.title = ''
                this.content = ''
                this.description = null
                this.showFeedbackForm()
                this.getData()
            }
        }, 
        getData() {
            axios
                .get('/api/products/' + this.$route.params.id )
                .then(response =>  {
                    this.product = response.data
                    this.feedback = this.product.feedback
                    const len = response.data.feedback.length
                    if (len > 1) {
                        this.feedback_length = len + ' Comments'
                    }else {
                        this.feedback_length = len + ' Comment'
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        upvoter(e) {
            if (!this.isUser) {
                this.notifier('You need to be a user to upvote!')
            } else {
                const token = localStorage.getItem('token')
                let number = parseInt(e.target.innerText) + 1
            
                const formData = {
                    upvotes: number
                }
                axios
                    .put('/api/upvotes/' + e.target.id + '/' , formData , ' Authorization: Token ' , token)
                    .then(
                        this.getData(),
                        this.notifier('You have successfully upvoted!')

                    )
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        notifier(text) {
            this.notification = text
            this.isNotification = true

            setTimeout(() => this.notification = null, 5000)
            setTimeout(() => this.isNotification = false, 5000)
        }
        
     },
     computed: {
        isUser() {
      return this.$store.state.isAuthenticated
    }
     }
}
</script>

<style lang="sass">
.notification-container
  margin-top: 1em
  display: flex
  justify-content: center
  align-items: center

  p
    padding: .5em 1em
    background-color: #383E65
    font-size: .8em
    text-align: center
    border-radius: 1em
    color: white
.feedback-container
    display: flex
    flex-direction: column
    .feedback-header
        background-color: #383E65
        color: white
        margin-bottom: 1.5em
        border-radius: .5em
        display: flex
        align-items: center
        justify-content: space-between
        padding: 1em 2em
        box-shadow: 1px 1px 4px grey
    
    button
        background-color: #9F2DE3
        border: none
        padding: .5em 1em
        border-radius: 1em
        color: white
    button:hover
        cursor: pointer
    
    .feedback-input
        display: flex
        justify-content: space-between
        gap: 1em
        align-items: center
        margin-bottom: .25em
    
    input, textarea
        border-radius: 1em
        border: 1px solid #383E65
        box-shadow: 1px 1px 4px grey
        padding: .4em
    .product-category
        display: flex
        justify-content: space-between
        align-items: center
    .feedback-controls
        display: flex
        justify-content: center
        align-items: center
        button
            height: 40px
    select
        margin-top: .5em
        padding: .5em
        border-radius: .5em 
.feedback-form
        background-color: white
        padding: 1em
        display: flex
        justify-content: space-between
        box-shadow: 1px 1px 4px grey
        margin-bottom: 1em
        border-radius: .5em
@media (max-width: 700px)
    .feedback-form
        flex-direction: column
        gap: 1em
.feedback-item
    padding: 1em 3em
    background-color: white
    height: fit-content
    display: grid
    gap: 4em
    grid-template-columns: 1fr 8fr
    border-radius: 1em
    box-shadow: 1px 1px 4px grey
    margin-bottom: 1em
    
    .feedback-content
        display: flex
        flex-direction: column
        gap: .5em
    .feedback-category
        font-weight: 900
        border-radius: 1em
        padding: 0 .5em
        font-size: .6em
        width: fit-content
        background-color: #F3F4FE
        color: #8A8EE7
    .feedback-title
        font-weight: bold

    .feedback-upvotes
        display: flex
        justify-content: center
        align-items: center
        cursor: pointer
        div
            display: flex
            gap: .25em
            flex-direction: column
            background-color: #F3F4FE
            padding: .75em
            border-radius: .5em
.product-description
    display: flex
    flex-direction: column
    width: 100%
    justify-content: flex-end
    padding-left: 1em
    .product-owner
        font-size: .5em

@media (max-width: 450px)
    .main-container
        margin-left: 1em
        margin-right: 1em
</style>
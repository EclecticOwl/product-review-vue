<template>
   <div class="main-container">
    <div class="product-sidebar">
        <div class="product-sidebar-header">
            <p>Product List</p>
        </div>
    </div>
    <div class="product-list-container">
        <div class="product-container" v-for="item in array" :key="item.id">
            <p class="product-title" @click="this.$router.push({path: '/product/' + item.id})">{{ item.title }}</p>
            <p class="product-owner">created by:{{ item.owner }}</p>
        </div>
    </div>
   </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ProductList',
    data() {
        return {
            array: null
        }
    },
    created() {
            axios
                .get('/api/products/')
                .then(response =>  {
                    this.array = response.data
                })
                .catch(err => {
                    console.log(err)
                })
    },
    method: {
    }
}
</script>
<style lang="sass">
.main-container
    margin: 0 5em
    margin-top: 5em
    display: grid
    align-items: start
    gap: 3em
    grid-template-columns: 3fr 8fr
.product-sidebar
    letter-spacing: .1em
    .product-sidebar-header
        height: 100px
        background: linear-gradient(13deg, rgba(150,28,231,1) 0%, #383E65, rgba(140,69,252,1) 100%)
        display: flex
        justify-content: center
        align-items: center
        color: white
        font-size: 1.3em
        border-radius: .5em
        flex-direction: column
        box-shadow: 1px 1px 4px grey
.product-list-container
    display: flex
    flex-direction: column
    gap: 2em
.product-container
    border-radius: .5em
    padding-left: 4em
    height: 100px
    background-color: white
    display: flex
    flex-direction: column
    justify-content: center
    box-shadow: 1px 1px 5px gray

    .product-title
        font-size: 1.2em
    .product-owner
        color: gray
        font-size: .9em
    .product-title:hover
        text-decoration: underline
        cursor: pointer

@media (max-width: 700px)
    .main-container
        grid-template-columns: 1fr
    .product-sidebar
        display: flex
        justify-content: center
        align-items: center
    .product-sidebar-header
        width: 100%
        display: flex
        justify-content: center
        align-items: center
    .product-description
        display: flex
        justify-content: center
        align-items: center

</style>
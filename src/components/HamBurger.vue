<template>
    <header>
		<nav>
			<div class="menu" :class="{ showMenu: isActive}">
				<ul>
					<li><router-link to="/" @click="isActive = !isActive">Home</router-link></li>
					<li v-if="!isUser"><router-link to="/sign-up" @click="isActive = !isActive">Register</router-link></li>
					<li v-if="!isUser"><router-link to="/log-in" @click="isActive = !isActive">Log In</router-link></li>
					<li v-if="isUser"><router-link to="/sign-out" @click="isActive = !isActive">Log Out</router-link></li>
					<li><router-link to="/product" @click="isActive = !isActive">Product List</router-link></li>
				</ul>
			</div>
			<div class="hamburger-box" :class="{ isActive: isActive}">
				<button class="hamburger" :class="{ isActive: isActive }" @click="isActive = !isActive">
					<div class="bar"></div>
				</button>
			</div>
		</nav>
    </header>
</template>

<script>
export default {
    name: 'HamBurger',
	data() {
		return {
			isActive: false
		}
	},
    computed: {
    isUser() {
      return this.$store.state.isAuthenticated
    }
  },
}
</script>
<style scoped lang="sass">
.hamburger-box
	position: fixed
	z-index: 100
	top: 1rem
	right: 1rem
	padding: 4px
	border: purple solid 2px
	background: white
	cursor: pointer
	width:  45px
	transition: 0.2s

.hamburger 
	display: block
	width: 35px
	cursor: pointer
	appearance: none
	background: none
	outline: none
	border: none

.hamburger .bar, .hamburger:after, .hamburger:before 
	content: ''
	display: block
	width: 100%
	height: 3px
	background-color: black
	margin: 6px 0px
	transition: transform 0.4s

.hamburger.isActive:before
	background-color: purple
	transform: rotate(-45deg) translate(-7px, 5px)
.hamburger.isActive:after
	background-color: purple
	transform: rotate(45deg) translate(-7px, -7px)
.hamburger.isActive .bar 
	opacity: 0
.hamburger-box.isActive
	background-color: black
	border: white solid 2px

.menu 
	position: fixed
	transform: translateY(-100%)
	transition: transform 0.4s
	top: 0
	left: 0
	right: 0
	bottom: 0
	z-index: 99
	background: #9F2DE3
	color: white
	list-style: none
	padding-top: 4rem

	ul
		height: 100%
		display: flex
		align-items: center
		justify-content: center
		flex-direction: column
		gap: 2em
		list-style-type: none

		a
			color: white
			text-decoration: none
			font-size: 1.5em
		
		a:hover
			color: hsl(291,35,15)
			background-color: white
			padding: .5em 2em
			border-radius: 1em

.showMenu 
	transform: translateY(0)

</style>
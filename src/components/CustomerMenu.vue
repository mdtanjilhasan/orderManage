<template>
    <div class="navigation" v-if="isLoggedIn">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <router-link to="/home" class="nav-link">Home</router-link>
                    </li>
                </ul>
                <div class="dropdown">
                    <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ userName }}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button class="dropdown-item" type="button" @click.prevent="handleLogOut">Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: "CustomerMenu",
    data(){
        return {
            isLoggedIn: ''
        }
    },
    computed: {
        userName() {
            return this.$store.getters['authentication/getUserName']
        }
    },
    created() {
        this.isLoggedIn = this.$store.getters['authentication/isLoggedIn']
    },
    methods: {
        handleLogOut(){
            this.$store.dispatch('authentication/logout')
                .then(() => {
                    this.$router.push('/')
                })
                .catch(() => {
                    this.$router.push('/')
                })
        }
    }
}
</script>
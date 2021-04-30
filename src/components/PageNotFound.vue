<template>
    <div>
        <div class="container">
            <div class="row align-items-center" style="height: 100vh;">
                <div class="col-md-2"></div>
                <div class="col-md-6 display-4 text-danger">
                    404 Page Not Found
                </div>
                <div class="col-md-2">
                    <router-link class="btn btn-sm btn-dark text-uppercase" :to="redirect">back to home</router-link>
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PageNotFound",
    data() {
        return {
            redirect: '/home'
        }
    },
    created() {
        if (this.$store.getters['authentication/isAdmin']) {
            this.redirect = '/dashboard'
        }
    }
}
</script>
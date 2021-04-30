<template>
    <div>
        <div class="container">
            <div class="row align-items-center" style="height: 100vh;">
                <div class="col-md-2"></div>
                <div class="col-md-6 display-4 text-warning">
                    403 Access Denied
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
    name: "AccessDenied",
    data() {
        return {
            redirect:'/home'
        }
    },
    created() {
        if (this.$store.getters['authentication/isAdmin']) {
            this.redirect = '/dashboard'
        }
    }
}
</script>
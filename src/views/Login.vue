<template>
    <div>
        <div class="container">
            <div class="row align-items-center vh-100">
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                    <div v-if="message" class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Hi There!</strong> {{ message }}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="form-style">
                        <form @submit.prevent="onSubmit">
                            <div class="form-group">
                                <label for="login_email">Email address</label>
                                <input type="email" v-model.trim="email" class="form-control" :class="{'is-invalid': validationErrors.email}" id="login_email"
                                       aria-describedby="emailHelp" placeholder="Enter email">
                                <div v-if="validationErrors.email" class="text-danger">
                                    {{ validationErrors.email }}
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="login_password">Password</label>
                                <input type="password" v-model.trim="password" class="form-control" :class="{'is-invalid': validationErrors.password}"
                                       id="login_password" placeholder="Password">
                                <div v-if="validationErrors.password" class="text-danger">
                                    {{ validationErrors.password }}
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
                <div class="col-sm-4"></div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.form-style {
    background: #e9ecef;
    padding: 20px 30px;
}

.vh-100 {
    height: 100vh
}
</style>

<script>

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            message: '',
            validationErrors: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        onSubmit() {
            let params = {
                email: this.email,
                password: this.password
            };

            this.$store.dispatch('authentication/login', params)
                .then(() => {
                    if (this.$store.getters['authentication/isAdmin']) {
                        this.$router.push('/dashboard')
                    }
                    this.$router.push('/home')
                })
                .catch(error => {
                    if(error.status === 422){
                        this.validationErrors = error.data.messages; // direct access is woring but error veriable console is not showing anything
                    } else {
                        this.message = error.data.message
                    }
                })
        }
    }
}
</script>
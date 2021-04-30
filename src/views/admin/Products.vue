<template>
    <div class="products">
        <AdminMenu/>
        <div class="container">
            <div class="row">
                <div v-if="notificationMessage" class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Congratulations!</strong> {{ notificationMessage }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <h1 class="w-100">Product List</h1>
                <router-link to="/product/create" class="btn btn-success mb-3">Create</router-link>
                <div class="table-responsive">
                    <table class="table table-hover table-striped">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>SKU</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="product in productsArray" :key="product.id">
                            <td>{{ product.name }}</td>
                            <td>{{ product.sku }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.category_id }}</td>
                            <td>{{ product.description }}</td>
                            <td>
                                <router-link :to="{name: 'ProductDetails', params: { id: product.id }}"
                                             class="btn btn-sm btn-primary text-uppercase">show
                                </router-link>
                                <router-link :to="{name: 'ProductEdit', params: { id: product.id }}"
                                             class="btn btn-sm btn-warning text-uppercase ml-1 mr-1">
                                    edit
                                </router-link>
                                <button type="button" class="btn btn-sm btn-danger text-uppercase"
                                        @click.prevent="deleteProduct(product.id)">delete
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AdminMenu from "@/components/AdminMenu";

export default {
    name: "Products",
    components: {
        AdminMenu
    },
    data() {
        return {
            productsArray: [],
            notificationMessage: ''
        }
    },
    created() {
        this.allProducts();
        if (this.$route.params.message) {
            this.notify(this.$route.params.message)
        }
    },
    methods: {
        allProducts() {
            this.$store.dispatch('products/all')
                .then(response => {
                    const productArray = [];
                    for (const key in response.data) {
                        productArray.push({
                            ...response.data[key]
                        });
                    }
                    this.productsArray = productArray
                })
                .catch(error => {
                    console.log(error)
                })
        },
        deleteProduct(id) {
            if (confirm('Are you sure to delete this?')) {
                this.$store.dispatch('products/delete', id)
                    .then(response => {
                        this.notify(response.message)
                        this.$router.go()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        notify(message) {
            this.notificationMessage = message
        }
    }
}
</script>

<style scoped>

</style>
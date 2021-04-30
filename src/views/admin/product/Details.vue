<template>
    <div class="product">
        <AdminMenu/>
        <div class="container">
            <div class="row">
                <h1 class="w-100 text-center">Product Details</h1>
                <div class="col-sm-2"></div>
                <div class="col-sm-8">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <tbody>
                            <tr v-for="(item, index) in product" :key="index">
                                <th scope="row" class="text-uppercase"> {{ index.replace('_',' ') }}</th>
                                <th scope="row"> {{ item }}</th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-sm-2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import AdminMenu from "@/components/AdminMenu";

export default {
    name: "ProductDetails",
    components: {
        AdminMenu
    },
    data() {
        return {
            product: []
        }
    },
    created() {
        this.findProduct(this.$route.params.id)
    },
    methods: {
        findProduct(id) {
            this.$store.dispatch('products/fetchProduct',id)
                .then(response => {
                    this.product = {...response.data}
                })
                .catch(error =>{
                    console.log(error)
                })
        }
    }
}
</script>
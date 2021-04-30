<template>
    <div class="product">
        <AdminMenu/>
        <div class="container">
            <div class="row">
                <div class="col-sm-2"></div>
                <div class="col-sm-8">
                    Product Details
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
            product: {
                name: '',
                category_id: '',
                price: '',
                description: '',
                image: ''
            },
            title: 'Product Create'
        }
    },
    created() {
        if(this.$route.params.id){
            this.title = 'Product Update'
        }
    },
    methods: {
        onSubmit(params) {
            this.$store.dispatch('products/store', params)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log('product vue',error)
                })
        }
    }
}
</script>

<style scoped>

</style>
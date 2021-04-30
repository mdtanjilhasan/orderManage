<template>
    <div class="product">
        <AdminMenu/>
        <div class="container">
            <div class="row">
                <div class="col-sm-2"></div>
                <div class="col-sm-8">
                    <ProductForm ref="ProductForm" :title="title" :buttonTitle="btnTitle" :product="product" @onSubmit="onSubmit"/>
                </div>
                <div class="col-sm-2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import AdminMenu from "@/components/AdminMenu";
import ProductForm from "@/components/ProductForm";

export default {
    name: "ProductUpdate",
    components: {
        AdminMenu,
        ProductForm
    },
    data() {
        return {
            product: [],
            title: 'Product Update',
            btnTitle: 'Update'
        }
    },
    created() {
        this.findProduct(this.$route.params.id)
    },
    methods: {
        onSubmit(params) {
            this.$store.dispatch('products/update', params)
                .then(response => {
                    this.$router.push({name: 'Products', params: {message: response.message}})
                })
                .catch(error => {
                    this.$refs.ProductForm.validationErrorMessage(error.data.messages)
                })
        },
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
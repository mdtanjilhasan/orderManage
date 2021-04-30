<template>
    <div class="product">
        <AdminMenu/>
        <div class="container">
            <div class="row">
                <div class="col-sm-2"></div>
                <div class="col-sm-8">
                    <ProductForm ref="ProductForm" :title="title" :buttonTitle="btnTitle" @onSubmit="onSubmit"/>
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
    name: "ProductCreate",
    components: {
        AdminMenu,
        ProductForm
    },
    data() {
        return {
            title: 'Product Create',
            btnTitle: 'Store'
        }
    },
    methods: {
        onSubmit(params) {
            this.$store.dispatch('products/store', params)
                .then(response => {
                    this.$router.push({name: 'Products', params: {message: response.message}})
                })
                .catch(error => {
                    console.log(error)
                    this.$refs.ProductForm.validationErrorMessage(error.data.messages)
                })
        }
    }
}
</script>

<style scoped>

</style>
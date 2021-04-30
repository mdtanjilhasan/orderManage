<template>
    <div class="product">
        <AdminMenu/>
        <div class="container">
            <div class="row">
                <div class="col-sm-2"></div>
                <div class="col-sm-8">
                    <ProductForm :title="title" :buttonTitle="btnTitle" :product="product" @onSubmit="onSubmit"/>
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
            product: {
                name: '',
                category_id: '',
                price: '',
                description: '',
                image: ''
            },
            title: 'Product Update',
            btnTitle: 'Update'
        }
    },
    created() {
        // console.log(this.$route.params.id)
        this.findProduct(this.$route.params.id)
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
        },
        findProduct(id) {
            console.log(id)
        }
    }
}
</script>
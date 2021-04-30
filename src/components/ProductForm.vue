<template>
    <div>
        <h1 class="text-center">{{ title }}</h1>
        <form @submit.prevent="onSave" enctype="multipart/form-data">
            <div class="form-group">
                <label for="product_name">Name</label>
                <input type="text" v-model="data.name" class="form-control" required
                       :class="{'is-invalid': validationErrors.name}" id="product_name"
                       placeholder="Enter product name">
                <div v-if="validationErrors.name" class="text-danger">
                    {{ validationErrors.name }}
                </div>
            </div>

            <div class="form-group">
                <label for="product_category">Category</label>
                <select class="form-control" v-model="data.category_id" required
                        :class="{'is-invalid': validationErrors.category_id}" id="product_category">
                    <option value="1">category 1</option>
                    <option value="2">category 2</option>
                </select>
                <div v-if="validationErrors.category_id" class="text-danger">
                    {{ validationErrors.category_id }}
                </div>
            </div>

            <div class="form-group">
                <label for="product_price">Price</label>
                <input type="text" class="form-control" required v-model="data.price"
                       :class="{'is-invalid': validationErrors.price}" id="product_price"
                       placeholder="Enter price">
                <div v-if="validationErrors.price" class="text-danger">
                    {{ validationErrors.price }}
                </div>
            </div>

            <div class="form-group">
                <label for="product_image">Image</label>
                <input type="file" accept="image/*" :class="{'is-invalid': validationErrors.image}"
                       @change="imageUpload($event)" class="form-control-file"
                       id="product_image">
                <div v-if="validationErrors.image" class="text-danger">
                    {{ validationErrors.image }}
                </div>
                <div id="preview" class="mt-3 mb-3">
                    <img v-if="imageUrl" :src="imageUrl" class="img-fluid" alt="preview image">
                </div>
            </div>

            <div class="form-group">
                <label for="product_description">Description</label>
                <textarea class="form-control" :class="{'is-invalid': validationErrors.description}"
                          v-model="data.description" id="product_description" rows="3"
                          placeholder="Enter Description"></textarea>
                <div v-if="validationErrors.description" class="text-danger">
                    {{ validationErrors.description }}
                </div>
            </div>

            <button type="submit" class="btn btn-success">{{ buttonTitle }}</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'ProductForm',
    props: {
        title: String,
        buttonTitle: String,
        product: {
            type: Object,
            required: false
        }
    },
    data() {
        return {
            data: {
                name: '',
                category_id: '',
                price: '',
                description: '',
                image: ''
            },
            imageUrl: '',
            image: '',
            validationErrors: {
                name: '',
                category_id: '',
                price: '',
                description: '',
                image: ''
            }
        }
    },
    beforeUpdate() {
        if (this.product) {
            this.data = {...this.product}
        }
    },
    methods: {
        onSave() {
            let params = new FormData();
            params.append('name', this.data.name);
            params.append('price', this.data.price);
            params.append('description', this.data.description);
            params.append('category_id', this.data.category_id);
            if (this.product) {
                params.append('image', this.image);
            } else {
                params.append('image', this.data.image);
            }

            if (this.product) {
                params.append('_method', 'PUT');
                params.append('id', this.data.id);
            }

            this.$emit('onSubmit', params);
        },
        imageUpload(event) {
            const file = event.target.files[0]
            if (this.product) {
                this.image = file
            } else {
                this.data.image = file
            }
            this.imageUrl = URL.createObjectURL(file)
        },
        validationErrorMessage(messages) {
            this.validationErrors = messages;
        }
    }
}
</script>
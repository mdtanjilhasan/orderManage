import axios from 'axios'

const product = {
    namespaced: true,
    state: {
        productData: {},
    },
    mutations: {
        setProductData(state, products) {
            state.productData = products
        }
    },
    actions: {
        all() {
            return new Promise((resolve, reject) => {
                axios.get('/api/admin/products/read.php')
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error.response)
                    });
            })
        },
        store(context,params) {
            return new Promise((resolve, reject) => {
                axios.post('/api/admin/products/create.php', params)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error.response)
                });
            })
        },
        fetchProduct(context,id) {
            return new Promise((resolve, reject) => {
                axios.get('/api/admin/products/read.php?id='+id)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error.response)
                    })
            })
        },
        update(context,params) {
            return new Promise((resolve, reject) => {
                axios.post('/api/admin/products/update.php',params)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error.response)
                    })
            })
        },
        delete(context,id) {
            return new Promise((resolve, reject) =>{
                axios.get('/api/admin/products/delete.php?id='+id)
                    .then(response =>{
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error.response)
                    })
            })
        }
    },
    getters: {}
}
export default product
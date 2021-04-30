import {createStore} from 'vuex'
import auth from './auth.js'
import product from './product.js'

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        authentication: auth,
        products: product
    }
})

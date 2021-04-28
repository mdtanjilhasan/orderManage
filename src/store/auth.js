import axios from 'axios'

const auth = {
    namespaced: true,
    state: {
        userdata: {
            name:'',
            email:'',
            is_admin:'',
        },
        token: null,
        expiresAt: null
    },
    mutations: {
        authDetail(state, user,token,expire) {
            state.userdata = user
            state.token = token
            state.expiresAt = expire
        },
        revokeAuthData(state) {
            state.userdata = {
                name:'',
                email:'',
                is_admin:'',
            }
            state.token = null
            state.expiresAt = null
        }
    },
    actions: {
        login({commit}, params) {
            return new Promise((resolve, reject) => {
                axios.post('/api/login.php', params)
                    .then(response => {
                        commit('authDetail', response.data.user,response.data.token,response.data.expire_at)
                        localStorage.setItem('token', response.data.token)
                        localStorage.setItem('user', JSON.stringify(response.data.user))
                        resolve(response.data)
                    })
                    .catch(error => {
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                        reject(error.response)
                    });
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                axios.post('/api/logout.php')
                    .then(response => {
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                        commit('revokeAuthData')
                        resolve(response.data)
                    })
                    .catch(error => {
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                        commit('revokeAuthData')
                        reject(error.response)
                    });
            })
        }
    },
    getters: {
        isLoggedIn: state => {
            // localStorage.removeItem('token')
            // localStorage.removeItem('user')
            if (state.token) {
                return true;
            }
            return !!localStorage.getItem('token');
        },
        getUserName: state => {
            if (state.userdata.name) {
                return state.userdata.name
            }
            let json = JSON.parse(localStorage.getItem('user'))
            return json ? json.name ? json.name : '' : ''
        },
        getToken: state => {
            if (state.token) {
                return state.token
            }
            return localStorage.getItem('token');
        }
    }
}
export default auth
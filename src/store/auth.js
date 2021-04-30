import axios from 'axios'

const auth = {
    namespaced: true,
    state: {
        userdata: {
            name: '',
            email: '',
            is_admin: '',
        },
        token: null,
        expiresAt: null
    },
    mutations: {
        authDetail(state, user, token, expire) {
            state.userdata = user
            state.token = token
            state.expiresAt = expire
        },
        revokeAuthData(state) {
            state.userdata = {
                name: '',
                email: '',
                is_admin: '',
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
                        commit('authDetail', response.data.user, response.data.token, response.data.expire_at)
                        sessionStorage.setItem('token', response.data.token)
                        sessionStorage.setItem('user', JSON.stringify(response.data.user))
                        resolve(response.data)
                    })
                    .catch(error => {
                        sessionStorage.removeItem('token')
                        sessionStorage.removeItem('user')
                        reject(error.response)
                    });
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                axios.post('/api/logout.php')
                    .then(response => {
                        sessionStorage.removeItem('token')
                        sessionStorage.removeItem('user')
                        commit('revokeAuthData')
                        resolve(response.data)
                    })
                    .catch(error => {
                        sessionStorage.removeItem('token')
                        sessionStorage.removeItem('user')
                        commit('revokeAuthData')
                        reject(error.response)
                    });
            })
        }
    },
    getters: {
        isLoggedIn: state => {
            if (state.token) {
                return true;
            }
            return !!sessionStorage.getItem('token');
        },
        getUserName: state => {
            if (state.userdata.name) {
                return state.userdata.name
            }
            let json = JSON.parse(sessionStorage.getItem('user'))
            return json ? json.name ? json.name : '' : ''
        },
        getToken: state => {
            if (state.token) {
                return state.token
            }
            return sessionStorage.getItem('token');
        },
        isAdmin: state => {
            if (state.userdata.is_admin) {
                return true;
            }
            let json = JSON.parse(sessionStorage.getItem('user'))
            return json ? !!json.is_admin : false
        }
    }
}
export default auth
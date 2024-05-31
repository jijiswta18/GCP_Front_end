import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    user: null,
  }
}

export default new Vuex.Store({

  plugins: [new VuexPersistence().plugin],
  state: getDefaultState(),

  getters: {
    user (state) {
      // console.log('state', state);
      return state.user
    },
  },
  mutations: {
    authUser (state, data) {
      state.user = data
    },
    
    clearAuthUser (state){

      state.user = null
      localStorage.removeItem('expirationDate')

    }
  },
  actions: {

  
    async login ( {commit}, authData){
  
      // let ldapPath = `/ldap/RestfulWS/username/${authData.username}/password/${authData.password}`
              
      // let response = await axios.get(ldapPath);

      let adPath = `/active_directory/login`
              
      let response = await axios.post(adPath, authData);

      // commit('authUser', response.data.result)


      if(response.data.code === "200"){

        let fd = response.data.result

        let checkEmployeePath = `/api_gcp/ManageEmployee/updateEmployee`

        let responseCheck = await axios.post(`${checkEmployeePath}`, fd);

        const expirationTime = await 1000 * 60 * 60; // 1 hour

        const now = await Date.now();
  
        commit('authUser', responseCheck.data.result)

        // commit('setSessionTimeout',  now + expirationTime)
 
        localStorage.setItem("expirationDate", now + expirationTime);

      }

    },

    async logout({commit}){

      commit('clearAuthUser')
    },

    checkLogin({ commit }){

      const expiration = localStorage.getItem('expirationDate');

      if(expiration < Date.now()){
        console.log('expire','now')
        commit('clearAuthUser')
        return
      }

    },

  },

})

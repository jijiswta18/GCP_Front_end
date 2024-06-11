import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const getDefaultState = () => {

  
  return {
    user: null,
    checkUser: null,
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
    checkUser (state) {
      // console.log('state', state);
      return state.checkUser
    },

  },
  mutations: {
    authUser (state, data) {
      state.user = data
    },
    checkUser (state, data) {
      state.checkUser = data
    },
    
    clearAuthUser (state){

      state.user = null
      state.checkUser = null
      localStorage.removeItem('expirationDate')

    }
  },
  actions: {

  
    async login ( {commit}, authData){
  
      commit('checkUser', null);
    
      let adPath = `/active_directory/login`
              
      let response = await axios.post(adPath, authData);


      console.log(response.data.result);
   
      // commit('authUser', response.data.result)
      if(response.data.code === "200"){

        

        // const responseEmployee =  axios.get(`/api_phonebook/phonebook/employee_info/901836`);

        // console.log(responseEmployee);

        let fd = response.data.result

        let checkEmployeePath = `/api_gcp/ManageEmployee/updateEmployee`

        let responseCheck = await axios.post(`${checkEmployeePath}`, fd);
        
        console.log(responseCheck);

        const expirationTime = await 1000 * 60 * 60; // 1 hour

        const now = await Date.now();
  
        commit('authUser', responseCheck.data.result)

        // commit('setSessionTimeout',  now + expirationTime)
 
        localStorage.setItem("expirationDate", now + expirationTime);

      }
      else if(response.data.code === "204"){
        commit('checkUser', "204");
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

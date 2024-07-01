import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const getDefaultState = () => {

  
  return {
    user: null,
    checkUser: null,
    isLoggedIn: !!localStorage.getItem('isLoggedIn')
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
    isLoggedIn(state){
      return state.isLoggedIn
    }

  },
  mutations: {
    authUser (state, data) {
      state.user = data
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', true); // Set isLoggedIn in localStorage
    },
    checkUser (state, data) {
      state.checkUser = data
    },
    
    clearAuthUser (state){

      state.user = null
      state.checkUser = null
      localStorage.removeItem('expirationDate')
      state.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn'); // Clear isLoggedIn from localStorage

    }
  },
  actions: {

  
    async login ( {commit}, authData){
  
      commit('checkUser', null);
    
      let adPath = `/active_directory/login`
              
      let response = await axios.post(adPath, authData);

   
      // commit('authUser', response.data.result)
      if(response.data.code === "200"){

        

        // const responseEmployee =  axios.get(`/api_phonebook/phonebook/employee_info/901836`);

        // console.log(responseEmployee);

        let fd = response.data.result

        let checkEmployeePath = `/api_gcp/ManageEmployee/updateEmployee`

        let responseCheck = await axios.post(`${checkEmployeePath}`, fd);
        

        const expirationTime = await 1000 * 60 * 60; // 1 hour

        const now = await Date.now();
        commit('checkUser', "200");
        commit('authUser', responseCheck.data.result)

        // commit('setSessionTimeout',  now + expirationTime)
 
        localStorage.setItem("expirationDate", now + expirationTime);

      }
      else if(response.data.code === "204"){
        commit('checkUser', "204");
        commit('authUser', null)
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

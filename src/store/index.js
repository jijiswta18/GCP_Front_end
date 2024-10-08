import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const getDefaultState = () => {

  
  return {
    user: null,
    checkUser: null,
    isLoggedIn: !!localStorage.getItem('isLoggedIn'),
    expiryDate: null
    
  }
}

const store = new Vuex.Store({

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
    },
    expiryDate(state){
      return state.expiryDate
    },
    // isAdmin: state => state.user === null && state.user.roles.includes('user'),

  },
  mutations: {
    setUser (state, data) {
      state.user = data
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', true); // Set isLoggedIn in localStorage
    },
    checkUser (state, data) {
      state.checkUser = data
    },
    checkExpiryDate (state, expiryDate) {
      state.expiryDate = expiryDate;
    },
    clearUser (state){

      state.user = null;
      state.checkUser = null;
      state.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn'); // Clear isLoggedIn from localStorage
      state.expiryDate = null
    }
  },
  actions: {

  
    async login ( {commit}, authData){
  
      // commit('checkUser', null);
    
      let adPath = `/active_directory/login`
              
      let response = await axios.post(adPath, authData);

      if(response.data.code === "200"){

        const fd = response.data.result

        const checkEmployeePath = `/api_gcp/ManageEmployee/updateEmployee`

        const responseCheck = await axios.post(`${checkEmployeePath}`, fd);



        
        const user = responseCheck.data.result

        console.log(user);
        

        

        console.log(user);
        
        commit('checkUser', "200");
        commit('setUser', user)

       

        // commit('setSessionTimeout',  now + expirationTime)
 
        const expiryDate = new Date().getTime() + (60 * 60 * 1000); // 5 minutes from now
        commit('checkExpiryDate', expiryDate);
        localStorage.setItem('loginExpiryDate', expiryDate); // Save expiry date in local storage

      }
      else if(response.data.code === "204"){
        commit('checkUser', "204");
        commit('setUser', null)
      }
    },

    async logout({commit}){

      commit('clearUser')
    },

    checkLogin({ commit }) {

      const expiryDate = localStorage.getItem('loginExpiryDate');

      if (expiryDate && parseInt(expiryDate) > new Date().getTime()) {
        commit('checkExpiryDate', expiryDate);
      } else {

        commit('clearUser');
        localStorage.removeItem('loginExpiryDate');
      }
    },

  },

});

export default store;


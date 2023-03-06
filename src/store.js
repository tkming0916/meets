import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: "",
    allSubject:[]
  },


  mutations: {
    getuid (state, UID) {
        state.uid = UID
    },
    setAllSubject(state,Subjects){
      state.allSubject = Subjects
    },
  },

  plugins: [
    createPersistedState({
        storage: window.sessionStorage,
    })
  ]
})

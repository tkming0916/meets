import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: propcess.env.VUE_APP_APIKEY,
  authDomain: propcess.env.VUE_APP_AUTH_DOMAIN,
  projectId: propcess.env.VUE_APP_PROJECT_ID,
  storageBucket: propcess.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: propcess.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: propcess.env.VUE_APP_APP_ID
};
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})

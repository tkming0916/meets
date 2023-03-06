import Vue from 'vue'
import Router from "vue-router"
import Top from "./components/Top.vue"
import TimeTable from "./components/TimeTable.vue"
import Signin from "./components/Signin.vue"
import Signup from "./components/Signup.vue"
import Setting from "./components/Setting.vue"
import TalkRoom from "./components/TalkRoom.vue"
import UserPage from "./components/UserPage.vue"
import FirstSetting_User from "./components/FirstSetting_User.vue"
import Setting_User from "./components/Setting_User.vue"



Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Top
    },
    {
      path: "/TimeTable",
      component: TimeTable,
      name: "TimeTable",
      props: true
    },
    {
      path: "/signin",
      component: Signin,
      name: "Signin"
    },
    {
      path: "/signup",
      component: Signup,
      name: "Signup"
    },
    {
      path: "/Setting",
      component: Setting,
      name: "Setting",
      props: true
    },
    {
      path: "/TalkRoom/:Subject",
      name: "TalkRoom",
      component: TalkRoom,
      props: true
    },
    {
      path: "/UserPage/:OtherUser_id",
      name: "UserPage",
      component: UserPage,
      props: true
    },
    {
      path: "/FirstSetting_User",
      name: "FirstSetting_User",
      component: FirstSetting_User,
      props: true
    },
    {
      path: "/Setting_User",
      name: "Setting_User",
      component: Setting_User,
      props: true
    },
  ],

});

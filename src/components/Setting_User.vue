<template>
  <div class="Setting_User">
    <header id="header">
      <div class="back_btn">
        <a href="#" onClick="history.back(); return false;" class="btn-circle-border-simple">←</a>
      </div>
      <div class="wrapper">
        <h3>ユーザー設定</h3>
      </div>


      <div class="hamburger-menu">
        <input type="checkbox" id="menu-btn-check" />
        <label for="menu-btn-check" class="menu-btn"><span></span></label>
        <div class="menu-content">
          <ul>
            <li>
              <router-link :to="{ name: 'TimeTable' }">
                時間割へ戻る
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Setting' }">
                時間割の設定
              </router-link>
            </li>
            <li>
              <a href="#" @click="signout">ログアウト</a>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <div class="setting_user">
      <br />
      ユーザ情報<br />
      <br />
      ニックネーム
      <br />
      <div>
        <input type="text" v-model="myname" />
      </div>
      <br />
      学部
      <br />
      <div>
        <select v-model="department">
          <option value="教育学部">教育学部</option>
          <option value="経済学部">経済学部</option>
          <option value="システム工学部">システム工学部</option>
          <option value="観光学部">観光学部</option>
        </select>
      </div>
      <br />
      学年
      <br />
      <div>
        <select v-model="grade">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <br />
      <div>
        アイコン設定
        <div  class="Setting_User_icon">
          <input type="radio" v-model="user_icon" id="blue_men" name="SelectIcon" value="blue_men">
          <label for="blue_men">
              <img src = "../assets/icon/blue_men.png" width="75px"/>
            </label>
            <input type="radio" v-model="user_icon" id="blue_women" name="SelectIcon" value="blue_women">
            <label for="blue_women">
              <img src = "../assets/icon/blue_women.png" width="75px"/>
            </label>
            <input type="radio" v-model="user_icon" id="green_men" name="SelectIcon" value="green_men">
            <label for="green_men">
              <img src = "../assets/icon/green_men.png" width="75px"/>
            </label>
            <input type="radio" v-model="user_icon" id="green_women" name="SelectIcon" value="green_women">
            <label for="green_women">
              <img src = "../assets/icon/green_women.png" width="75px"/>
            </label>
            <br>
            <input type="radio" v-model="user_icon" id="red_men" name="SelectIcon" value="red_men">
            <label for="red_men">
              <img src = "../assets/icon/red_men.png" width="75px"/>
            </label>
            <input type="radio" v-model="user_icon" id="red_women" name="SelectIcon" value="red_women">
            <label for="red_women">
              <img src = "../assets/icon/red_women.png" width="75px"/>
            </label>
            <input type="radio" v-model="user_icon" id="yellow_men" name="SelectIcon" value="yellow_men">
            <label for="yellow_men">
              <img src = "../assets/icon/yellow_men.png" width="75px"/>
            </label>
            <input type="radio" v-model="user_icon" id="yellow_women" name="SelectIcon" value="yellow_women">
            <label for="yellow_women">
              <img src = "../assets/icon/yellow_women.png" width="75px"/>
            </label>
        </div>
      </div>
      <br />
      ひとこと
      <br />
      <div>
        <textarea v-model="self_introduction"> </textarea>
      </div>
      <br />
      <button @click="Decision" class = "button">OK</button>
      <br />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      uid: this.$store.state.uid,
      myname: "",
      department: "",
      grade: "",
      color: "",
      icon:"",
      user_icon:"",
      self_introduction: "",
    };
  },

  created() {
    this.JudgeLogin();
    this.getName();
    this.scrollToTop();
  },

  methods: {
    scrollToTop() {
      scrollTo(0, 0);
    },

    getName() {
      firebase
        .firestore()
        .collection("profile")
        .doc(this.uid)
        .get()
        .then((doc) => {
          this.myname = doc.data().myname;
          this.department = doc.data().department;
          this.grade = doc.data().grade;
          this.icon = doc.data().icon;
          this.self_introduction = doc.data().self_introduction;

          var theicon = document.getElementById(this.icon)
          theicon.checked = true;
          this.user_icon = this.icon
        });
    },

    Decision() {
      firebase.firestore().collection("profile").doc(this.uid).update(
        {
          myname: this.myname,
          department: this.department,
          grade: this.grade,
          icon : this.user_icon,
          self_introduction: this.self_introduction,
        }
      );
      alert("登録しました");
      this.$router.push({ name: "TimeTable" });
    },
    JudgeLogin() {
      if (!this.uid) {
        alert("ログインが解除されました。再度ログインしてください");
        this.$router.push({ name: "Signin" });
      }
    },
    signout() {
      this.$store.commit("getuid", "");
      this.$router.push("/signin");
    },
  },
};
</script>

<style scoped>
  @import "/css/header_hamburger.css";
  @import "css/Setting_User.css";
  @import "/css/for_ios.css/";
</style>

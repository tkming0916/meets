<template>
  <div class="signup">
    <header id="header">
      <div class="wrapper">
        <h3>オンライン講義を受ける全ての学生のためのコミュニティー</h3>
      </div>
    </header>

    <div class = "top_img">
      <img src="../assets/top/logo1.png"  width="405px" height="121px"/>
    </div>


    <div class="Signup">
      <br />
      新規登録<br>
      <br />
      <input type="text" placeholder="Mail address" v-model="user_mail" />
      <br />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        v-on:keydown.enter="SignIn"
      />
      <br />
      <button @click="signUp" class = "button">新規登録</button>
      <br />
      <p>
        <router-link to="/signin" class="text">ログインはこちらから</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Signup",
  data() {
    return {
      user_mail: "",
      password: "",
      myname: "",
    };
  },

  methods: {
    signUp: function () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.user_mail, this.password)
        .then((user) => {

          const currentUser = firebase.auth().currentUser;
          this.uid = currentUser.uid;

          const db = firebase.firestore();
          const userRef = db.collection("profile");

          userRef.doc(this.uid).set({
            myname: "",
            Mon: ["", "", "", "", ""],
            Tue: ["", "", "", "", ""],
            Wed: ["", "", "", "", ""],
            Thu: ["", "", "", "", ""],
            Fri: ["", "", "", "", ""],
            department: "",
            grade: "",
            icon: "",
            self_introduction: "",
          });

          this.$store.commit("getuid", this.uid);
          this.$router.push("/FirstSetting_User");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>

<style scoped>
  @import "/css/header_hamburger.css";
  @import "/css/Signup.css/";
  @import "/css/for_ios.css/";
</style>

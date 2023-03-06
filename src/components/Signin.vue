<template>
  <div class="signin">
    <header id="header">
      <div class="wrapper">
        <h3>オンライン講義を受ける全ての学生のためのコミュニティー</h3>
      </div>
    </header>

    <div class = "top_img">
      <img src="../assets/top/logo1.png"  width="405px" height="121px"/>
    </div>

    <div class="SignIn">
      <br />
      ログイン<br>
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
      <button @click="SignIn" class = "button">ログイン</button>
      <br />
      <p>
        <router-link to="/signup" class="text">新規登録はこちらから</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Signin",
  data: function () {
    return {
      user_mail: "",
      password: "",
      uid: "",
    };
  },

  methods: {
    SignIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user_mail, this.password)
        .then((user) => {
          this.uid = firebase.auth().currentUser.uid;
          this.$store.commit("getuid", this.uid);

          this.$router.push({
            name: "TimeTable",
            params: {
              uid: this.uid,
            },
          });
        })
        .catch((error) => {
          alert("もう一度入力してください");
        });
    },
  },
};
</script>

<style scoped>
  @import "/css/header_hamburger.css";
  @import "/css/Signin.css";
  @import "/css/for_ios.css/";
</style>

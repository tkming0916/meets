<template>
  <div class="top">
    <header id="header">
      <div class="wrapper">
        <h3>オンライン講義を受ける全ての学生のためのコミュニティー</h3>
      </div>
    </header>

  <main>
    <div class = "top_img">
      <img src="../assets/top/logo2.png"/>
    </div>

    <div class = "top_img2">
      <img src="../assets/top/background_pic.png"/>
    </div>


    <div class = "introduction">
      <h3>時間割表からトークルームへ</h3>
      <h3>すぐ繋がる  すぐ話せる</h3>


      <div class = "signin_button">
        <router-link :to="{ name: 'Signin' }" tag="button" class = "button" id="btn-border">
          ログイン
        </router-link>
      </div>
      <br>
      <div class="signup_button">
        <router-link :to="{ name: 'Signup' }" tag="button" class = "button">新規登録</router-link>
      </div>
    </div>
  </main>
  </div>
</template>

<script>
export default {
  name: "Top",
};
</script>

<style scoped>
  @import "/css/header_hamburger.css";
  @import "/css/Top.css";
  @import "/css/for_ios.css/";
</style>

<template>
  <div class="FirstSetting_User">
    <header id="header">
      <div class="wrapper">
        <h3>オンライン講義を受ける全ての学生のためのコミュニティー</h3>
      </div>
    </header>

    <div class="top_img">
      <img src="../assets/top/logo1.png" width="405px" height="121px" />
    </div>

    <div class="first_setting">
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
      user_icon:"",
      self_introduction: "",
    };
  },

  methods: {
    Decision() {
      if((this.myname === "")||(this.department === "")||(this.grade === "")||(this.user_icon === "")||(this.self_introduction === "")){
        alert("入力されていない項目があります")
        return
      }
			firebase.firestore().collection("profile").doc(this.uid).update({
				myname: this.myname,
				department: this.department,
				grade: this.grade,
				icon: this.user_icon,
				self_introduction: this.self_introduction,
			},
      { marge: true })
			this.$router.push({ name: 'TimeTable'})
		}
  
  },
};
</script>

<style scoped>
@import "/css/header_hamburger.css";
@import "css/FirstSetting.css";
@import "/css/for_ios.css/";
.button {
  background-color: #ffffff;
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  color: #000;
  border: double 4px #B4C7E7;
  border-radius: 3px;
  transition: .4s;
}
.button:hover {
  background: #FFC000;
}
</style>

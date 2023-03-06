<template>
  <div class="UserPage">
    <header id = "header">
      <div class="back_btn">
        <a href="#" onClick="history.back(); return false;" class="btn-circle-border-simple">←</a>
      </div>
      <div class = "wrapper">
        <h3>プロフィール</h3>
      </div>
      <div class="hamburger-menu">
        <input type="checkbox" id="menu-btn-check" />
        <label for="menu-btn-check" class="menu-btn"><span></span></label>
        <div class="menu-content">
          <ul>
            <li>
              <router-link :to="{ name: 'TimeTable' }"> 時間割へ戻る </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Setting' }"> 時間割の設定 </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Setting_User' }"> ユーザー設定 </router-link>
            </li>
            <li>
              <a href="#" @click="signout">ログアウト</a>
            </li>
            <br>
          </ul>
        </div>
      </div>
    </header>

    <div class = "profile">
      <div class="profile_icon_circle_1">
          <div class="profile_icon">
            <div v-if="this.OtherUser_icon === 'red_men'">
              <img src="../assets/icon/red_men.png" width="75px"/>
            </div>
            <div v-else-if="this.OtherUser_icon === 'red_women'">
              <img src="../assets/icon/red_women.png" width="75px"/>
            </div>
            <div v-else-if="this.OtherUser_icon === 'yellow_men'">
              <img src="../assets/icon/yellow_men.png" width="75px"/>
            </div>
            <div v-else-if="this.OtherUser_icon === 'yellow_women'">
              <img src="../assets/icon/yellow_women.png" width="75px"/>
            </div>
            <div v-else-if="this.OtherUser_icon === 'blue_men'">
              <img src="../assets/icon/blue_men.png" width="75px"/>
            </div>
            <div v-else-if="this.OtherUser_icon === 'blue_women'">
              <img src="../assets/icon/blue_women.png" width="75px"/>
            </div>
            <div v-else-if="this.OtherUser_icon === 'green_men'">
              <img src="../assets/icon/green_men.png" width="75px"/>
            </div>
            <div v-else-if="this.OtherUser_icon === 'green_women'">
              <img src="../assets/icon/green_women.png" width="75px"/>
            </div>
          </div>
      </div>

      <div class="profile_user">
      <br>
      <a>{{ this.OtherUser_name }}</a>
      <br>
      <br>
      <a>{{ this.OtherUser_department }}</a>
      <a>{{ this.OtherUser_grade }}年生</a>
      <br />
      <br />
      <div class="OtherUser_self_introduction">
      <a>{{ this.OtherUser_self_introduction }}</a>
      </div>
      <br />

      </div>

    </div>

    <main>
      <div class="TimeTable">
        <table>
          <tr>
            <th></th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
          </tr>
          <tr v-for="index in 5" v-bind:key="index">
            <td class="TimeTableindex">{{TimeTable_Index[index-1]}}</td>
            <td v-for="(thesubjectName, index) in OtherTimeTable_SubjectName[index - 1]" v-bind:key="index" :class="[thesubjectName == '' ? 'No_Subject_Cell':'Exist_Subject_Cell']">
              {{thesubjectName}}
            </td>
          </tr>
        </table>
      </div>
    </main>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      uid: this.$store.state.uid,
      OtherUser_id: this.$route.params.OtherUser_id,
      OtherUser_name: "",
      OtherUser_department: "",
      OtherUser_grade: "",
      OtherUser_icon:"",
      OtherUser_self_introduction: "",
      TimeTable_Index:["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ",],

      OtherTimeTable_SID: [[], [], [], [], []],
      OtherTimeTable_SubjectName: [[], [], [], [], []],
    };
  },
  created() {
    this.JudgeLogin();
    this.getOtherUsers();
    this.getTimetable();
    this.scrollToTop();
  },
  methods: {
    scrollToTop() {
      scrollTo(0, 0);
    },

    getOtherUsers() {
      firebase
        .firestore()
        .collection("profile")
        .doc(this.OtherUser_id)
        .get()
        .then((doc) => {
          this.OtherUser_name = doc.data().myname;
          this.OtherUser_department = doc.data().department;
          this.OtherUser_grade = doc.data().grade;
          this.OtherUser_icon = doc.data().icon;
          this.OtherUser_self_introduction = doc.data().self_introduction;
        });
    },

    getTimetable() {
      firebase
        .firestore()
        .collection("profile")
        .doc(this.OtherUser_id)
        .get()
        .then((doc) => {
          var allSubject = this.$store.state.allSubject;

          this.OtherTimeTable_SID[0] = doc.data().Mon.concat();
          this.OtherTimeTable_SID[1] = doc.data().Tue.concat();
          this.OtherTimeTable_SID[2] = doc.data().Wed.concat();
          this.OtherTimeTable_SID[3] = doc.data().Thu.concat();
          this.OtherTimeTable_SID[4] = doc.data().Fri.concat();

          for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
              let theSID = this.OtherTimeTable_SID[j][i];
              if (theSID === "") {
                theSID = "none";
              }
              const result = allSubject.filter(theSubject => theSubject.SID == theSID);
              this.OtherTimeTable_SubjectName[i].push(result[0].Name);
            }
          }
        });
    },

    signout() {
      this.$store.commit("getuid", "");
      this.$router.push("/signin");
    },
    JudgeLogin() {
      if (!this.uid) {
        alert("ログインが解除されました。再度ログインしてください");
        this.$router.push({ name: "Signin" });
      }
    },
  },
};
</script>

<style scoped>
  @import "/css/header_hamburger.css";
  @import "/css/TimeTable_template.css";
  @import "/css/UserPage.css";
  @import "/css/for_ios.css/";
  .No_Subject_Cell{
  background-color: #DDD;
  }
</style>

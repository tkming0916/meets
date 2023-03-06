<template>
  <div class="home">
    <header id="header">
      <div class="back_btn">
        <a href="#" onClick="history.back(); return false;" class="btn-circle-border-simple">←</a>
      </div>
      <div class="wrapper">
        <h3>時間割</h3>
      </div>
      <div class="hamburger-menu">
        <input type="checkbox" id="menu-btn-check" />
        <label for="menu-btn-check" class="menu-btn"><span></span></label>
        <div class="menu-content">
          <ul>
            <li>
              <router-link :to="{ name: 'Setting' }">
                時間割の設定
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Setting_User' }">
                ユーザー設定
              </router-link>
            </li>
            <li>
              <a href="#" @click="signout">ログアウト</a>
            </li>

          </ul>
        </div>
      </div>
    </header>

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
            <td v-for="(thesubject, index) in MyTimeTable[index - 1]" v-bind:key="index" :class="[thesubject.Name == '' ? 'No_Subject_Cell':'Exist_Subject_Cell']">
              <router-link :to="{ name: 'TalkRoom', params: {Subject: thesubject.SID}}" class="theSubjectCell">
                  {{ thesubject.Name }}
              </router-link>
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

      TimeTable_Index:["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ",],

      MyTimeTable: [[], [], [], [], []],
      MyTimeTable_SID: [[], [], [], [], []],

      SID: "",

    };
  },

  computed: {
    AllSubject () {
      return this.$store.state.allSubject;
    },
  },

  created() {
    this.uid = this.$store.state.uid;
    this.setAllSubject();
    this.getTimetable();
    this.scrollToTop();
  },

  methods: {
    scrollToTop() {
      scrollTo(0, 0);
    },

    // Subjectをすべて取得してStateに保存
    setAllSubject() {
      firebase
        .firestore()
        .collection("Subject")
        .get()
        .then((query) => {
          var allSubject = [];
          query.forEach((doc) => {
            var data = doc.data();
            allSubject.push({
              SID: doc.id,
              Name: data.SubjectName,
              teacher: data.teacher,
              date: data.date,
              time: data.time,
            });
          });
          this.$store.commit("setAllSubject", allSubject);
        });
    },

    //自分のDBから時間割を取得
    getTimetable() {
      firebase
        .firestore()
        .collection("profile")
        .doc(this.uid)
        .get()
        .then((doc) => {
          var allSubject = this.$store.state.allSubject;

          this.MyTimeTable_SID[0] = doc.data().Mon.concat();
          this.MyTimeTable_SID[1] = doc.data().Tue.concat();
          this.MyTimeTable_SID[2] = doc.data().Wed.concat();
          this.MyTimeTable_SID[3] = doc.data().Thu.concat();
          this.MyTimeTable_SID[4] = doc.data().Fri.concat();

          for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
              let theSID = this.MyTimeTable_SID[i][j]
              if(theSID === ""){
                theSID = "none"
              }
              const result = allSubject.filter(theSubject => theSubject.SID == theSID)
              this.MyTimeTable[j].push({SID: result[0].SID, Name: result[0].Name})
            }
          }
        });
    },

    signout() {
      this.$store.commit("getuid", "");
      this.$router.push("/Signin");
    },

    // ログイン状態の確認
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
  @import "/css/TimeTable.css/";
  @import "/css/for_ios.css/";
</style>

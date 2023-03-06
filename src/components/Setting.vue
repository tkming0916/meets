<template>
  <div class="Setting">
    <header id="header">
      <div class="back_btn">
        <a href="#" onClick="history.back(); return false;" class="btn-circle-border-simple">←</a>
      </div>
      <div class="wrapper">
        <h3>時間割の設定</h3>
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
          <tr v-for="i in 5" v-bind:key="i">
            <td class="TimeTableindex">{{TimeTable_Index[i-1]}}</td>
            <td class="TimeTable_data" :class="[MyTimeTable.Mon[i-1] == '' ? 'No_Subject_Cell':'Exist_Subject_Cell']">
              {{MyTimeTable.Mon[i-1]}}
              <button @click="SearchSubject(0,i-1)" v-if="MyTimeTable.Mon[i-1] == ''" class="Setting_Btn AddSubject_Btn">科目追加</button>
              <button v-on:click="DeleteMySubject(0,i-1)" v-else class="Setting_Btn RemoveSubject_Btn">科目削除</button>
            </td>
            <td class="TimeTable_data" :class="[MyTimeTable.Tue[i-1] == '' ? 'No_Subject_Cell':'Exist_Subject_Cell']">
              {{MyTimeTable.Tue[i-1]}}
              <button @click="SearchSubject(1,i-1)" v-if="MyTimeTable.Tue[i-1] == ''" class="Setting_Btn AddSubject_Btn">科目追加</button>
              <button v-on:click="DeleteMySubject(1,i-1)" v-else class="Setting_Btn RemoveSubject_Btn">科目削除</button>
            </td>
            <td class="TimeTable_data" :class="[MyTimeTable.Wed[i-1] == '' ? 'No_Subject_Cell':'Exist_Subject_Cell']">
              {{MyTimeTable.Wed[i-1]}}
              <button @click="SearchSubject(2,i-1)" v-if="MyTimeTable.Wed[i-1] == ''" class="Setting_Btn AddSubject_Btn">科目追加</button>
              <button v-on:click="DeleteMySubject(2,i-1)" v-else class="Setting_Btn RemoveSubject_Btn">科目削除</button>
            </td>
            <td class="TimeTable_data" :class="[MyTimeTable.Thu[i-1] == '' ? 'No_Subject_Cell':'Exist_Subject_Cell']">
              {{MyTimeTable.Thu[i-1]}}
              <button @click="SearchSubject(3,i-1)" v-if="MyTimeTable.Thu[i-1] == ''" class="Setting_Btn AddSubject_Btn">科目追加</button>
              <button v-on:click="DeleteMySubject(3,i-1)" v-else class="Setting_Btn RemoveSubject_Btn">科目削除</button>
            </td>
            <td class="TimeTable_data" :class="[MyTimeTable.Fri[i-1] == '' ? 'No_Subject_Cell':'Exist_Subject_Cell']">
              {{MyTimeTable.Fri[i-1]}}
              <button @click="SearchSubject(4,i-1)" v-if="MyTimeTable.Fri[i-1] == ''" class="Setting_Btn AddSubject_Btn">科目追加</button>
              <button v-on:click="DeleteMySubject(4,i-1)" v-else class="Setting_Btn RemoveSubject_Btn">科目削除</button>
            </td>
          </tr>
        </table>
      </div>

      <!-- 科目選択画面 -->
      <div id="SelectSubjectWindow" class="NoDisplay">
        <button id="Delete_SelectSubjectWindow_btn" class="Delete_Window_btn" v-on:click="Delete_SelectSubjectWindow"><span class="dli-close"></span></button>
        <h2>{{Selected_Date}}曜日 {{Selected_Time}}限</h2>
        <ul class="SelectSubjectWindow_SubjectLists" v-if="TheSubjects.length > 0">
          <li v-for="thesubject in TheSubjects" :key="thesubject.subject_name" class="radio">
            <input type="radio" v-model="selectedSID" :id="thesubject.SID" name="SelectSubject" @click="SelectSubject" v-bind:value="thesubject.SID">
            <label :for="thesubject.SID" class="radio-label"></label>

            <label :for="thesubject.SID" class="radio-label-text">
              <p class="TheSubjectName_In_TheSubjects">
                {{ thesubject.subject_name }}
              </p>
              <p class="TheSubjectTeacher_In_TheSubjects">
                教員 {{thesubject.teacher}}
              </p>
            </label>
            
          </li>
        </ul>
        <div v-else class="NoTheSubjects_message">
          <p>授業は登録されていません<br>新規科目登録から登録してください</p>
        </div>
        <button class="btn SubjectRegistration_btn" :disabled="JudgeChecked_SelectSubject" @click="SubjectRegistration">登録</button>
        <button class="btn NewSubjectRegistration_btn" @click="Show_NewSubjectRegistration_Window">新規科目追加</button>
      </div>


      <!-- 新規科目登録画面 -->
      <div id="NewSubjectRegistration_Window" class="NoDisplay">
        <button class="Delete_Window_btn" @click="Delete_NewSubjectRegistration_Window"><span class="dli-close"></span></button>
        <h2>新規科目登録</h2>
        <div class="NewSubjectRegistration_form">
          <div v-for="(i, index) in 5" v-bind:key="index">
            <div v-if="index <= AddNewSubjectRegistration_count">
                <select v-model="NewSubject_Date[i-1]" id="NewSubjectRegistration_form_select">
                  <option v-for="(theDate, index) in NewSubjectRegistration_form_date_option" v-bind:value="theDate.value" v-bind:key="index">{{ theDate.text }}</option>
                </select>
                <label for="date1"> 曜日</label>
                <select v-model="NewSubject_Time[i-1]">
                  <option v-for="(j, index) in 5" v-bind:value="j" v-bind:key="index">{{ j }}</option>
                </select>
                <label for="time1"> 時間目</label>
            </div>
          </div>

          <button @click="Add_NewSubjectRegistration_form" v-if="AddNewSubjectRegistration_count !== 4" class="Add_NewSubjectRegistration_Data_btn"><span class="plus icon"></span></button>
          <button @click="Remove_NewSubjectRegistration_form" v-if="AddNewSubjectRegistration_count !== 0"  class="Remove_NewSubjectRegistration_Data_btn"><span class="minus icon"></span></button>
          <div id="NewSubjectRegistration_form_date_time"></div>

          授業名
          <input type="text" v-model="NewSubject_name" id="NewSubjectRegistration_form_SubjectName">
          <br>
          教員名
          <input type="text" v-model="NewSubject_teacher" id="NewSubjectRegistration_form_teacher">
          <br>
        </div>
        <button class="btn NewSubjectRegistration_btn" @click="NewSubjectRegistration">新規科目登録</button>
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
      myname: "",
      department: "",
      grade: "",
      color: "",
      self_introduction: "",
      SID: "",
      selectedSID: "",

      TimeTable_Index: ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ"],

      NewSubjectRegistration_form_date_option: [
        { text: "月", value: "Mon" },
        { text: "火", value: "Tue" },
        { text: "水", value: "Wed" },
        { text: "木", value: "Thu" },
        { text: "金", value: "Fri" },
      ],

      Subject_Date: "",
      Subject_Time: "",
      TheSubjects: [],

      MyTimeTable: {
        Mon:{"1": "","2": "","3": "","4": "","5": ""},
        Tue:{"1": "","2": "","3": "","4": "","5": ""},
        Wed:{"1": "","2": "","3": "","4": "","5": ""},
        Thu:{"1": "","2": "","3": "","4": "","5": ""},
        Fri:{"1": "","2": "","3": "","4": "","5": ""},
      },
      MyTimeTable_SID: [[], [], [], [], []],

      date: ["Mon", "Tue", "Wed", "Thu", "Fri"],

      date_japanese: ['月', '火', '水', '木', '金'],
      Selected_Time: "",
      Selected_Date: "",

      NewSubject_Date: [],
      NewSubject_Time: [],
      NewSubject_name: "",
      NewSubject_teacher: "",

      AddNewSubjectRegistration_count: 0,

      DeleteSubject_Date: "",
      DeleteSubject_Time: "",

      JudgeChecked_SelectSubject: true,

      gettimetable_flag: 0

    };
  },

  created() {
    this.JudgeLogin();
    this.setAllSubject();
    this.getTimetable();
    this.scrollToTop();
  },

  methods: {
    scrollToTop() {
      scrollTo(0, 0);
    },
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

   
    getTimetable() {
        firebase.firestore().collection("profile").doc(this.uid)
        .get()
        .then((doc) => {
          this.MyTimeTable = {
            Mon:{"1": "","2": "","3": "","4": "","5": ""},
            Tue:{"1": "","2": "","3": "","4": "","5": ""},
            Wed:{"1": "","2": "","3": "","4": "","5": ""},
            Thu:{"1": "","2": "","3": "","4": "","5": ""},
            Fri:{"1": "","2": "","3": "","4": "","5": ""},
          }
          var allSubject = this.$store.state.allSubject;

          this.MyTimeTable_SID[0] = doc.data().Mon.concat();
          this.MyTimeTable_SID[1] = doc.data().Tue.concat();
          this.MyTimeTable_SID[2] = doc.data().Wed.concat();
          this.MyTimeTable_SID[3] = doc.data().Thu.concat();
          this.MyTimeTable_SID[4] = doc.data().Fri.concat();

          for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
              let theSID = this.MyTimeTable_SID[i][j]
              if(theSID === ""){
                theSID = "none"
              }
              const result = allSubject.filter(theSubject => theSubject.SID == theSID)
              switch (i){
                case 0:
                  this.MyTimeTable.Mon[j]= result[0].Name;
                  break;
                case 1:
                  this.MyTimeTable.Tue[j]= result[0].Name;
                  break;
                case 2:
                  this.MyTimeTable.Wed[j]= result[0].Name;
                  break;
                case 3:
                  this.MyTimeTable.Thu[j]= result[0].Name;
                  break;
                case 4:
                  this.MyTimeTable.Fri[j]= result[0].Name;
                  break;

              }

            }
          }
        });
      },

    SearchSubject(thedate, thetime) {
      this.Selected_Date = this.date_japanese[thedate];
      this.Selected_Time = thetime + 1;

      this.setAllSubject();
      var allSubject = this.$store.state.allSubject;
      this.TheSubjects.splice(0, this.TheSubjects.length);
      var result = [];

      allSubject.forEach(theSubject => {
          for(var i = 0;i < theSubject.date.length; i++){
            if((theSubject.date[i] == this.date[thedate])&&(theSubject.time[i] == thetime + 1)){
              result.push({
                SID: theSubject.SID,
                subject_name: theSubject.Name,
                teacher: theSubject.teacher,
                date: theSubject.date,
                time: theSubject.time
              })
            }
          }
        });
      this.TheSubjects = result;

      // 選択画面表示
      var SelectWindow = document.getElementById("SelectSubjectWindow");
      SelectWindow.classList.remove("NoDisplay");
    },

    // 科目登録
    SubjectRegistration() {
      firebase
        .firestore()
        .collection("profile")
        .doc(this.uid)
        .get()
        .then((doc) => {
          this.Delete_SelectSubjectWindow();
          this.JudgeChecked_SelectSubject = true;
          this.TheSubjects.splice(0, this.TheSubjects.length);

          this.MyTimeTable_SID[0] = doc.data().Mon.concat();
          this.MyTimeTable_SID[1] = doc.data().Tue.concat();
          this.MyTimeTable_SID[2] = doc.data().Wed.concat();
          this.MyTimeTable_SID[3] = doc.data().Thu.concat();
          this.MyTimeTable_SID[4] = doc.data().Fri.concat();

          const SID = this.selectedSID;
          var allSubject = this.$store.state.allSubject;
          const result = allSubject.filter(
            (theSubject) => theSubject.SID == SID
          );

          for (var i = 0; i < result[0].date.length; i++) {
            const thedate = result[0].date[i];
            const index = result[0].time[i] - 1;
            var thedatenum;
            for (let i = 0; i < 5; i++) {
              if (thedate === this.date[i]) {
                thedatenum = i;
              }
            }
            this.AutoDeleteMyTimeTable(thedatenum, index, "Register");
            this.$set(this.MyTimeTable_SID[thedatenum],index,SID )
            this.getTimetable();
          }

          // 変更した時間割を登録
          firebase.firestore().collection("profile").doc(doc.id).update({
              Mon: this.MyTimeTable_SID[0],
              Tue: this.MyTimeTable_SID[1],
              Wed: this.MyTimeTable_SID[2],
              Thu: this.MyTimeTable_SID[3],
              Fri: this.MyTimeTable_SID[4],
            },
              { marge: true })
            .then(()=>{
              this.getTimetable()
            })
        });
    },

    // 新規科目登録
    NewSubjectRegistration() {
      this.AddNewSubjectRegistration_count = 0;

      // 重複科目登録防止
      var allSubject = this.$store.state.allSubject;
      const result = allSubject.filter((theSubject) => {
        if (
          theSubject.Name == this.NewSubject_name &&
          theSubject.teacher == this.NewSubject_teacher
        ) {
          return true;
        }
      });
      if (result.length > 0) {
        alert("この授業はすでに登録されています");
        return;
      }

      firebase.firestore().collection("Subject").add({
        SubjectName: this.NewSubject_name,
        date: this.NewSubject_Date,
        time: this.NewSubject_Time,
        teacher: this.NewSubject_teacher,
      });

      alert(
        "新規授業が登録されました。科目登録から自分の授業に登録してください"
      );

      this.setAllSubject();
    },

    DeleteMySubject(thedate, thetime) {
      this.TheSubjects.splice(0, this.TheSubjects.length);

      firebase
        .firestore()
        .collection("profile")
        .doc(this.uid)
        .get()
        .then((doc) => {
          this.MyTimeTable_SID[0] = doc.data().Mon.concat();
          this.MyTimeTable_SID[1] = doc.data().Tue.concat();
          this.MyTimeTable_SID[2] = doc.data().Wed.concat();
          this.MyTimeTable_SID[3] = doc.data().Thu.concat();
          this.MyTimeTable_SID[4] = doc.data().Fri.concat();

          this.AutoDeleteMyTimeTable(thedate, thetime, "Delete");

          firebase.firestore().collection("profile").doc(doc.id).update({
              Mon: this.MyTimeTable_SID[0],
              Tue: this.MyTimeTable_SID[1],
              Wed: this.MyTimeTable_SID[2],
              Thu: this.MyTimeTable_SID[3],
              Fri: this.MyTimeTable_SID[4],
            },
            { marge: true })
            .then(()=>{
              this.getTimetable()
            })
        });
    },

    AutoDeleteMyTimeTable(thedate, thetime, flag) {
      const selected_DeleteSubject_SID = this.MyTimeTable_SID[thedate][thetime];
      var allSubject = this.$store.state.allSubject;
      const result = allSubject.filter((theSubject) => {
        if (theSubject.SID == selected_DeleteSubject_SID) {
          return true;
        }
      });
      if (result.length === 0) {
        if (flag === "Delete") {
          alert("登録されていません");
        }
        return;
      }

      if (flag === "Delete") {
        var confirm_result = confirm(
          "「" + result[0].Name + "」を削除しますか？"
        );
        if (!confirm_result) {
          return;
        }
      }

      var selected_DeleteSubject_date = result[0].date;
      var selected_DeleteSubject_time = result[0].time;
      selected_DeleteSubject_time;

      // 指定された授業を削除
      for (var i = 0; i < selected_DeleteSubject_date.length; i++) {
        var thedatenum_delete;
        var theTime = selected_DeleteSubject_time[i] - 1;
        for (let j = 0; j < 5; j++) {
          if (selected_DeleteSubject_date[i] === this.date[j]) {
            thedatenum_delete = j;
          }
        }

        this.MyTimeTable_SID[thedatenum_delete].splice(theTime, 1, "");
      }
    },

    Add_NewSubjectRegistration_form() {
      this.AddNewSubjectRegistration_count++;
    },

    Remove_NewSubjectRegistration_form() {
      this.AddNewSubjectRegistration_count--;
    },

    Delete_SelectSubjectWindow() {
      var SelectWindow = document.getElementById("SelectSubjectWindow");
      SelectWindow.classList.add("NoDisplay");
    },

    SelectSubject() {
      this.JudgeChecked_SelectSubject = false;
    },

    Show_NewSubjectRegistration_Window(){
      this.Delete_SelectSubjectWindow()
      var NewSubjectRegistration_Window = document.getElementById("NewSubjectRegistration_Window");
      NewSubjectRegistration_Window.classList.remove("NoDisplay")
    },
    Delete_NewSubjectRegistration_Window(){
      var NewSubjectRegistration_Window = document.getElementById("NewSubjectRegistration_Window");
      NewSubjectRegistration_Window.classList.add("NoDisplay")
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
  @import "/css/Setting.css";
  @import "/css/for_ios.css/";
</style>

<template>
  <div class="talkroom">
    <header id="header">
      <div class="back_btn">
        <a
          href="#"
          onClick="history.back(); return false;"
          class="btn-circle-border-simple"
          >←</a
        >
      </div>
      <div class="wrapper">
        <h3>{{ this.subject }}</h3>
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
      <!-- 参加者表示 -->
      <button id="Show_participant_btn" @click="Show_participant">
        <label for="Show_participant_btn" class="profile-solid icon"></label>
      </button>
      <div id="Participant_Window" class="NoDisplay">
        <button
          id="Remove_participant_btn"
          @click="Remove_participant"
          class="NoDisplay"
        >
          <label
            for="Remove_participant_btn"
            class="profile-solid icon"
          ></label>
        </button>
        <ul class="Participant_Window_List">
          <li v-for="(others, otheruid) in otheruser" v-bind:key="otheruid">
            <router-link
              :to="{
                name: 'UserPage',
                params: { OtherUser_id: others.otheruid },
              }"
            >
              {{ others.otherusername }}
            </router-link>
          </li>
        </ul>
      </div>

      <div id="AllPost">
        <div
          v-for="(chat, index) in chats"
          v-bind:key="index"
          :class="JudgePost(chat.uid)"
          class="thepost"
        >
          <div class="thepost_main">
            <div class="thepost_main_user">
              <!-- アイコン -->
              <div v-if="chat.otheruser_icon === 'red_men'">
                <img src="../assets/icon/red_men.png" width="75px" />
              </div>
              <div v-else-if="chat.otheruser_icon === 'red_women'">
                <img src="../assets/icon/red_women.png" width="75px" />
              </div>
              <div v-else-if="chat.otheruser_icon === 'yellow_men'">
                <img src="../assets/icon/yellow_men.png" width="75px" />
              </div>
              <div v-else-if="chat.otheruser_icon === 'yellow_women'">
                <img src="../assets/icon/yellow_women.png" width="75px" />
              </div>
              <div v-else-if="chat.otheruser_icon === 'blue_men'">
                <img src="../assets/icon/blue_men.png" width="75px" />
              </div>
              <div v-else-if="chat.otheruser_icon === 'blue_women'">
                <img src="../assets/icon/blue_women.png" width="75px" />
              </div>
              <div v-else-if="chat.otheruser_icon === 'green_men'">
                <img src="../assets/icon/green_men.png" width="75px" />
              </div>
              <div v-else-if="chat.otheruser_icon === 'green_women'">
                <img src="../assets/icon/green_women.png" width="75px" />
              </div>
              <div v-else-if="chat.otheruser_icon === 'Anonymous'">
                <img src="../assets/icon/Anonymous.png" width="75px" />
              </div>

              <!-- ユーザー名 -->
              <p>{{ chat.myname }}</p>
            </div>
            <div class="thepost_text">
              <div
                v-if="chat.comment.match(/stamp/)"
                class="thepost_stamp thepost_comment"
              >
                <img
                  v-if="chat.comment === 'stamp/nice.jpg'"
                  src="../assets/stamp/nice.jpg"
                  width="75px"
                />
                <img
                  v-else-if="chat.comment === 'stamp/morikawa.jpg'"
                  src="../assets/stamp/morikawa.jpg"
                  width="75px"
                />
                <img
                  v-else-if="chat.comment === 'stamp/exclamation.jpg'"
                  src="../assets/stamp/exclamation.jpg"
                  width="75px"
                />
                <img
                  v-else-if="chat.comment === 'stamp/question.jpg'"
                  src="../assets/stamp/question.jpg"
                  width="75px"
                />
                <img
                  v-else-if="chat.comment === 'stamp/heart.jpg'"
                  src="../assets/stamp/heart.jpg"
                  width="75px"
                />
                <img
                  v-else-if="chat.comment === 'stamp/inspiration.jpg'"
                  src="../assets/stamp/inspiration.jpg"
                  width="75px"
                />
              </div>

              <!-- コメント -->
              <div v-else class="thepost_comment">
                <p>{{ chat.comment }}</p>
              </div>
              <!-- 日時 -->
              <p class="thepost_time">{{ chat.day }}</p>
            </div>
          </div>
        </div>
        <!-- 最後の行合わせ -->
        <div class="lastdiv"></div>
      </div>

      <!-- 入力フォーム -->
      <form id="from">
        <div id="form_input">
          <div class="Form_Anonymous_Select model-7">
            <div class="checkbox">
              <input
                type="checkbox"
                class="NoDisplay"
                id="Anonymous_Select"
                v-model="value"
                true-value="Anonymous"
                false-value="Realname"
                @change="ChangeAnonymous(value)"
              />
              <label for="Anonymous_Select" class="Anonymous_Select_label"
                >匿名</label
              >
            </div>
          </div>
          <div id="Form_SubmitStamp">
            <div id="showshow_StampSelect_btn">
              <button
                type="button"
                id="Show_StampSelect_btn"
                @click="Show_StampSelect"
              >
                <p></p>
              </button>
            </div>
            <div id="hide_StampSelect_btn" class="NoDisplay">
              <button
                type="button"
                id="Remove_StampSelect_btn"
                @click="Remove_StampSelect"
                class="NoDisplay"
              >
                ✖
              </button>
            </div>
            <div id="SelectWindow_Stamp" class="NoDisplay">
              <input
                type="radio"
                v-model="theStampDate"
                id="TheStamp_nice"
                @click="ClickStamp(nice)"
                name="SelectStamp"
                value="stamp/nice.jpg"
                class="stamp/nice.jpg"
              />
              <label for="TheStamp_nice">
                <img src="../assets/stamp/nice.jpg" width="75px" />
              </label>

              <input
                type="radio"
                v-model="theStampDate"
                id="TheStamp_morikawa"
                @click="ClickStamp(morikawa)"
                name="SelectStamp"
                value="stamp/morikawa.jpg"
                class="stamp/morikawa.jpg"
              />
              <label for="TheStamp_morikawa">
                <img src="../assets/stamp/morikawa.jpg" width="75px" />
              </label>

              <input
                type="radio"
                v-model="theStampDate"
                id="TheStamp_exclamation"
                @click="ClickStamp(exclamation)"
                name="SelectStamp"
                value="stamp/exclamation.jpg"
                class="stamp/exclamation.jpg"
              />
              <label for="TheStamp_exclamation">
                <img src="../assets/stamp/exclamation.jpg" width="75px" />
              </label>

              <input
                type="radio"
                v-model="theStampDate"
                id="TheStamp_question"
                @click="ClickStamp(question)"
                name="SelectStamp"
                value="stamp/question.jpg"
                class="stamp/question.jpg"
              />
              <label for="TheStamp_question">
                <img src="../assets/stamp/question.jpg" width="75px" />
              </label>

              <input
                type="radio"
                v-model="theStampDate"
                id="TheStamp_heart"
                @click="ClickStamp(heart)"
                name="SelectStamp"
                value="stamp/heart.jpg"
                class="stamp/heart.jpg"
              />
              <label for="TheStamp_heart">
                <img src="../assets/stamp/heart.jpg" width="75px" />
              </label>

              <input
                type="radio"
                v-model="theStampDate"
                id="TheStamp_inspiration"
                @click="ClickStamp(inspiration)"
                name="SelectStamp"
                value="stamp/inspiration.jpg"
                class="stamp/inspiration.jpg"
              />
              <label for="TheStamp_inspiration">
                <img src="../assets/stamp/inspiration.jpg" width="75px" />
              </label>
            </div>
          </div>
          <div id="From_comennt">
            <textarea
              id="textarea"
              v-model="comment"
              v-on:keydown.enter.exact="keyDownEnter"
              v-on:keyup.enter.exact="keyUpEnter"
              v-on:keydoen.enter.shift="keyEnterShift"
              placeholder="入力してください"
            >
            </textarea>
          </div>
        </div>
        <button
          type="button"
          class="navigate-solid icon"
          id="From_SubmitBtn"
          @click="submitPosts"
        >
          <img
            src="../assets/btn/Submit_Btn.png"
            alt="送信ボタン"
            id="SubmitBtn_img"
          />
        </button>
      </form>
    </main>
  </div>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      uid: this.$store.state.uid,

      chats: [], //ここにチャットの情報がすべて入る
      myname: "",
      value: "",
      theStampDate: "",
      comment: "",
      SID: "",
      SubjectName: "",

      day: "",
      myturn: 0, //自分が送信側のとき1にする

      Stamp_Date: "",
      path: "",

      date: "",
      time: "",

      // 他ユーザーの情報
      otherusername: "",
      otheruser: [],
      subject: "",
      OtherUser_id: "", //ユーザー画面へ送る相手のid
      otheruser_color: "", //他ユーザーの色
      color: "", //自分の色

      getpost_count: 0,
      lastDate: "",
    };
  },

  created() {
    this.SID = this.$route.params.Subject;
    this.JudgeLogin();
    this.getSubject_info();
    this.getName();
    this.getOtherUsers();
    // this.getPosts();
    this.listenPosts();
  },

  beforeUpdate() {
    console.log("beforeupdate");
    this.scroll_To_End();
  },

  methods: {
    scroll_To_End() {
      console.log("BUTTOM");
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    },

    keyDownEnter(e) {
      e.preventDefault(); //改行を無効化
    },
    keyUpEnter(e) {
      e.preventDefault(); // 改行を無効化
      this.submitPosts(); //送信
    },
    keyEnterShift(e) {
    },

    getOtherUsers() {
      var otheruser = [];
      var sid;
      firebase
        .firestore()
        .collection("profile")
        .get()
        .then((query) => {
          query.forEach((doc) => {
            var getUid = doc.id;
            var thedate = this.date[0];
            var thetime = this.time[0];

            if (thedate == "Mon") {
              sid = doc.data().Mon[thetime - 1];
            } else if (thedate == "Tue") {
              sid = doc.data().Tue[thetime - 1];
            } else if (thedate == "Wed") {
              sid = doc.data().Wed[thetime - 1];
            } else if (thedate == "Thu") {
              sid = doc.data().Thu[thetime - 1];
            } else if (thedate == "Fri") {
              sid = doc.data().Fri[thetime - 1];
            }

            if (sid == this.SID) {
              if (getUid != this.uid) {
                otheruser.push({
                  otheruid: doc.id,
                  otherusername: doc.data().myname,
                });
              }
            }
          });
          this.otheruser = otheruser;
        });
    },

    getSubject_info() {
      firebase
        .firestore()
        .collection("Subject")
        .doc(this.SID)
        .get()
        .then((doc) => {
          this.subject = doc.data().SubjectName;
          this.date = doc.data().date;
          this.time = doc.data().time;
        });
    },

    getName() {
      firebase
        .firestore()
        .collection("profile")
        .doc(this.uid)
        .get()
        .then((doc) => {
          this.myname = doc.data().myname;
          this.myicon = doc.data().icon;
        });
    },

    JudgePost(post_uid) {
      if (post_uid == this.uid) {
        return "my_post";
      } else {
        return "other_post";
      }
    },

    ChangeAnonymous(value) {
      if (value == "Anonymous") {
        this.myname = "匿名";
        this.myicon = "Anonymous";
      } else {
        this.getName();
      }
    },

    ClickStamp(theStamp_name) {
      var TheStamp_btn = document.getElementsByClassName(
        "TheStamp_" + theStamp_name
      );
      TheStamp_btn.prop("checked", false);
    },

    submitPosts() {
      this.myturn = 1; //自分は送信側
      var message;
      if (this.comment === "" && this.theStampDate === "") {
        return;
      }
      if (this.comment === "") {
        message = this.theStampDate;
      } else {
        message = this.comment;
      }
      if (this.myname == "匿名") {
        this.mycolor = "匿名";
      }

      this.Remove_StampSelect();

      firebase
        .firestore()
        .collection(this.SID)
        .add({
          myname: this.myname,
          comment: message,
          uid: this.uid,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          icon: this.myicon,
        })
        .then(() => {
          this.ResetFrom();
        });

      this.comment = "";
    },

    //送信後にformの初期化
    ResetFrom() {
      this.message = "";
      // textareaの初期化
      var textareaForm = document.getElementById("textarea");
      textareaForm.value = "";
      this.comment = "";
      // スタンプの初期化
      var theicon = document.getElementsByClassName(this.theStampDate);
      theicon.checked = false;
      this.theStampDate = "";
    },

    getPosts() {
      firebase
        .firestore()
        .collection(this.SID)
        .orderBy("created", "asc")
        .get()
        .then((querry) => {
          let chats = [];
          querry.forEach((doc) => {
            const date = new Date(doc.data().created * 1000);
            let timestampToTime =
              date.getMonth() +
              1 +
              "/" +
              date.getDate() +
              " " +
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds();
            chats.push({
              myname: doc.data().myname,
              comment: doc.data().comment,
              uid: doc.data().uid,
              day: timestampToTime,
              otheruser_icon: doc.data().icon,
            });
            //最後に取得したチャットの時間
            this.lastDate = doc.data().created;
          });
          this.chats = chats;
        });
    },

    getNewPosts() {
      console.log("getNewPosts");
      firebase
        .firestore()
        .collection(this.SID)
        .orderBy("created", "asc")
        .startAfter(this.lastDate)
        // .limit(1)
        .get()
        .then((querry) => {
          querry.forEach((doc) => {
            const date = new Date(doc.data().created * 1000);
            let timestampToTime =
              date.getMonth() +
              1 +
              "/" +
              date.getDate() +
              " " +
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds();
            this.chats.push({
              myname: doc.data().myname,
              comment: doc.data().comment,
              uid: doc.data().uid,
              day: timestampToTime,
              otheruser_icon: doc.data().icon,
            });
            this.lastDate = doc.data().created;
          });
        });
    },

    listenPosts() {
      console.log("listenPosts");
      const db = firebase.firestore();
      let flag = 0;
      db.collection(this.SID).onSnapshot((snapshot) => {
        for (let change of snapshot.docChanges()) {
          if (change.type === "added") {
            if (this.myturn === 0) {
              //自分は受信側
              flag = 1;
            }
          } else if (change.type === "modified") {
            if (this.myturn === 1) {
              //自分は送信側
              flag = 1;
            }
          }
        }
        if (flag == 1) {
          if (this.getpost_count == 0) {
            this.getPosts();
            this.getpost_count = 1;
          } else if (this.getpost_count == 1) {
            this.getNewPosts();
          }
          flag = 0;
          this.myturn = 0;
        }
      });
      this.scroll_To_End();
    },

    Show_StampSelect() {
      var SelectWindow = document.getElementById("SelectWindow_Stamp");
      SelectWindow.classList.remove("NoDisplay");
      var Show_StampSelect_btn = document.getElementById(
        "showshow_StampSelect_btn"
      );
      Show_StampSelect_btn.classList.add("NoDisplay");
      var Remove_StampSelect_btn = document.getElementById(
        "Remove_StampSelect_btn"
      );
      Remove_StampSelect_btn.classList.remove("NoDisplay");

      var hide_StampSelect_btn = document.getElementById(
        "hide_StampSelect_btn"
      );
      hide_StampSelect_btn.classList.remove("NoDisplay");
    },

    Remove_StampSelect() {
      var SelectWindow = document.getElementById("SelectWindow_Stamp");
      SelectWindow.classList.add("NoDisplay");
      var Remove_StampSelect_btn = document.getElementById(
        "Remove_StampSelect_btn"
      );
      Remove_StampSelect_btn.classList.add("NoDisplay");

      var Show_StampSelect_btn = document.getElementById(
        "showshow_StampSelect_btn"
      );
      Show_StampSelect_btn.classList.remove("NoDisplay");
    },

    Show_participant() {
      var Participant_Window = document.getElementById("Participant_Window");
      Participant_Window.classList.remove("NoDisplay");
      var Show_participant_btn = document.getElementById(
        "Show_participant_btn"
      );
      Show_participant_btn.classList.add("NoDisplay");
      var Remove_participant_btn = document.getElementById(
        "Remove_participant_btn"
      );
      Remove_participant_btn.classList.remove("NoDisplay");
    },

    Remove_participant() {
      var Participant_Window = document.getElementById("Participant_Window");
      Participant_Window.classList.add("NoDisplay");
      var Show_participant_btn = document.getElementById(
        "Show_participant_btn"
      );
      Show_participant_btn.classList.remove("NoDisplay");
      var Remove_participant_btn = document.getElementById(
        "Remove_participant_btn"
      );
      Remove_participant_btn.classList.add("NoDisplay");
    },

    signout() {
      this.$store.commit("getuid", "");
      this.$router.push("/signin");
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
@import "/css/TalkRoom.css/";
@import "/css/for_ios.css/";
</style>

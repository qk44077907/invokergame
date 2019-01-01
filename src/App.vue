<template>
  <div id="app">
    <div class="home">
      <!--<div id="mask">
        <div id="finalScore">
          <span class='close rounded black'></span>
          <div id="scoreBox"></div>
          <div id="shareBox">分享到：<span class="Weibo"></span>
            <span class="QQ"></span>
          </div>
        </div>
      </div>-->
      <div class="header">
        <div class="banner"></div>
        <!--<div id="nav">
          <ul>
            <li><a href="index.html">首页</a></li>
            <li><a href="hero.html">英雄资料</a></li>
            <li><a href="rank.html">荣誉榜</a></li>
            <li><a href="about.html">关于</a></li>
          </ul>
        </div>-->

      </div>
      <div class="background">
        <div class="content">
          <hotkey></hotkey>
          <div id="mainContainer">
            <h1 id="title">{{language === 'zh-CN' ? '极速卡尔':'Invoker Game'}}</h1>
            <router-view/>
          </div>
          <instruction></instruction>
        </div>

      </div>
      <div id="footer" style="display: none">
        <audio id="countSound" class="sound" hidden="true">
          <source src="./assets/music/ui_findmatch_join_01.wav">
        </audio>
        <audio id="modelhoverSound" class="sound" hidden="true">
          <source src="./assets/music/click_alt.wav">
        </audio>
        <audio id="modelclickSound" class="sound"
               hidden="true">
          <source src="./assets/music/pick_select.wav">
        </audio>

        <audio id="cancelSound" class="sound" hidden="true">
          <source src="./assets/music/click_back.wav">
        </audio>
        <audio id="invokeSound" class="sound" hidden="true">
          <source src="./assets/music/invoke.wav">
        </audio>
        <audio id="jslq" class="jslq sound skill" hidden="true">
          <source src="./assets/music/cold_snap.wav">
        </audio>
        <audio id="ylmb" class="ylmb sound skill" hidden="true">
          <source src="./assets/music/ghost_walk.wav">
        </audio>
        <audio id="hbzq" class="hbzq sound skill" hidden="true">
          <source src="./assets/music/ice_wall_slow01.wav">
        </audio>

        <audio id="dcmc" class="dcmc sound skill" hidden="true">
          <source src="./assets/music/emp_charge.wav">
        </audio>

        <audio id="qxjf" class="qxjf sound skill" hidden="true">
          <source src="./assets/music/tornado_cast.wav">
        </audio>
        <audio id="ldxj" class="ldxj sound skill" hidden="true">
          <source src="./assets/music/alacrity.wav">
        </audio>

        <audio id="yycj" class="yycj sound skill" hidden="true">
          <source src="./assets/music/sunstrike_charge.wav">
        </audio>

        <audio id="hdys" class="hdys sound skill" hidden="true">
          <source src="./assets/music/meteor.wav">
        </audio>
        <audio id="czsb" class="czsb sound skill" hidden="true">
          <source src="./assets/music/deafening_blast.wav">
        </audio>
        <audio id="lvlup" class="sound" hidden="true">
          <source src="./assets/music/power_up_06.wav">
        </audio>
        <audio id="keyBindOpen" class="sound" hidden="true">
          <source src="./assets/music/keybind_open.wav">
        </audio>
        <audio id="keyBindSet" class="sound" hidden="true">
          <source src="./assets/music/keybind_set.wav">
        </audio>
        <audio id="finish" class="music" hidden="true">
          <source src="./assets/music/unloginScore.wav">
        </audio>
        <audio id="playing" class="music" hidden="true">
          <source src="./assets/music/playing.mp3">
        </audio>
      </div>
    </div>

  </div>
</template>
<script>
  import {playAudio, stopAudio} from "./utils/audioHandler";
  import Instruction from "@/components/Instruction";
  import Hotkey from "@/components/Hotkey";
  import {mapState, mapMutations} from "vuex"

  export default {
    name: "app",
    components: {
      Instruction,
      Hotkey
    },
    computed: {
      ...mapState(['language', 'isMusicActive', 'isSoundActive', 'gameStatus'])
    },
    watch: {
      gameStatus(val, oldVal) {
        stopAudio('#playing')
        stopAudio('#finish')
        switch (val) {
          case 1:
            playAudio('#playing',2);
            break;
          case 2:
            playAudio('#finish',2);
            break;
        }
      },
      isSoundActive(val) {
        document.querySelectorAll('.sound').forEach((dom) => {
          dom.muted = !val
        })
      },
      isMusicActive(val) {
        document.querySelectorAll('.music').forEach((dom) => {
          dom.muted = !val
        })
      }
    },
    methods: {
      ...mapMutations(['keyBoardHandler'])
    },
    created() {
      document.addEventListener('keydown', this.keyBoardHandler)
    },

  };
</script>
<style lang="less" scoped>

  .content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 1000px;
    min-height: 1500px;
    margin: 0 auto;
    background-image: url("./assets/images/wall.jpg");
    #title {
      font-size: 50px;
      font-weight: bold;
      text-align: center;
      color: aliceblue;
      margin-bottom: 20px;
      letter-spacing: 2px;
    }
  }

  #mainContainer {
    display: inline-block;
    flex: none;
    width: 610px;
    box-sizing: border-box;
    min-height: 500px;
    border: 4px solid #808080;
    border-radius: 5px;
    background-color: black;

  }

  .header {
    width: 100%;
    margin: 0;
    overflow: hidden;
  }

  .banner {
    width: 1000px;
    height: 200px;
    margin: 0 auto;
    overflow: hidden;
    background-size: 100% auto;
    background-image: url(./assets/images/banner3.png);
  }

  #nav ul {
    width: 1000px;
    height: 60px;
    margin: 0 auto;
    display: block;
    list-style: none;
    text-align: center;
  }

  #nav ul li {
    float: left;
    width: 25%;
    height: 60px;
  }

  #nav ul li a {
    height: 60px;
    line-height: 60px;
    vertical-align: middle;
    background: #2B2B2B;
    color: #dbdbdb;
    margin: 0px 1px 0px 1px;
    display: block;
    text-decoration: none;
    border: solid 1px black;
    -webkit-border-radius: 5px;
    font-size: 25px;
    letter-spacing: 8px;
    background: url(./assets/images/menu.jpg) repeat-x;
    background-size: auto 100%;
  }

  #nav ul li a:hover {
    color: #e36500;
  }

  #nav ul li:first-child a {
    margin-left: 0px;
  }

  #nav ul li:last-child a {
    margin-right: 0px;
  }
</style>
<style>
  body html p h1 h2 h3 h4 h5 a span {
    margin: 0;
    padding: 0;
    font-family: "Microsoft Yahei";
  }

  body {
    margin: 0px;
    padding: 0px;
    background-color: #000000;
    color: #ffffff;
    font-family: Arial, "Microsoft Yahei";

  }

  html {
    font-size: 125%; /*10 �� 16 �� 100% = 62.5%*/
  }

  input, button, select, textarea {
    outline: none;
  }

  body {

    font-size: 0.7rem; /*1.4 �� 10px = 14px */
  }

  html, body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td, img {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  h1 {
    font-size: 1.2rem; /*2.4 �� 10px = 24px*/
    font-weight: bold;
  }

</style>

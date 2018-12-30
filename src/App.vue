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
        <div class="banner"><img src="http://7xqs6j.com1.z0.glb.clouddn.com/banner.jpg"/></div>
        <div id="nav">
          <ul>
            <li><a href="index.html">首页</a></li>
            <li><a href="hero.html">英雄资料</a></li>
            <li><a href="rank.html">荣誉榜</a></li>
            <li><a href="about.html">关于</a></li>
          </ul>
        </div>

      </div>
      <div class="background">
        <div class="content">
          <hotkey></hotkey>
          <div id="mainContainer">
            <h1 id="title">极速卡尔</h1>
            <router-view/>
          </div>
          <instruction></instruction>
        </div>

      </div>
      <!--<div id="footer" style="display: none">
          <audio id="countSound" class="sound"
                 src="music/ui_findmatch_join_01.wav" hidden="true">
          </audio>
          <audio id="modelhoverSound" class="sound"
                 src="music/click_alt.wav" hidden="true">
          </audio>
          <audio id="modelclickSound" class="sound"
                 src="music/pick_select.wav" hidden="true">
          </audio>

          <audio id="cancelSound" class="sound"
                 src="music/click_back.wav" hidden="true">
          </audio>
          <audio id="invokeSound" class="sound"
                 src="music/invoke.wav" hidden="true">
          </audio>
          <audio id="coldSnap" class="jslq sound skill"
                 src="music/cold_snap.wav" hidden="true">
          </audio>
          <audio id="ghostWalk" class="ylmb sound skill"
                 src="music/ghost_walk.wav" hidden="true">
          </audio>
          <audio id="iceWall" class="hbzq sound skill"
                 src="music/ice_wall_slow01.wav" hidden="true">
          </audio>

          <audio id="empCharge" class="dcmc sound skill"
                 src="music/emp_charge.wav" hidden="true">
          </audio>

          <audio id="tornado" class="qxjf sound skill"
                 src="music/tornado_cast.wav" hidden="true">
          </audio>
          <audio id="alacrity" class="ldxj sound skill"
                 src="music/alacrity.wav" hidden="true">
          </audio>

          <audio id="sunstrikeCharge" class="yycj sound skill"
                 src="music/sunstrike_charge.wav" hidden="true">
          </audio>

          <audio id="meteor" class="hdys sound skill"
                 src="music/meteor.wav" hidden="true">
          </audio>
          <audio id="deafeningBlast" class="czsb sound skill"
                 src="music/deafening_blast.wav" hidden="true">
          </audio>
          <audio id="lvlup" class="sound"
                 src="music/power_up_06.wav" hidden="true">
          </audio>
          <audio id="gameMusic" class="music" src="http://m2.music.126.net/AOChMFXWryJzWO2vR5iwIw==/7797736464973704.mp3"
                 hidden="true" loop="true">
          </audio>
          <audio id="keyBindOpen" class="sound"
                 src="music/keybind_open.wav" hidden="true">
          </audio>
          <audio id="keyBindSet" class="sound"
                 src="music/keybind_set.wav" hidden="true">
          </audio>
          <audio id="victory" class="sound"
                 src="http://7xqs6j.com1.z0.glb.clouddn.com/dota2_music_victory_radiant_comp.mp3" hidden="true">
          </audio>
          <audio id="victorySpeak1" class="victorySpeak sound"
                 src="http://7xqs6j.com1.z0.glb.clouddn.com/invo_win_02.mp3" hidden="true">
          </audio>
          <audio id="victorySpeak2" class="victorySpeak sound"
                 src="http://7xqs6j.com1.z0.glb.clouddn.com/invo_win_03.mp3" hidden="true">
          </audio>
          <audio id="unloginScore" class="sound"
                 src="http://7xqs6j.com1.z0.glb.clouddn.com/unloginScore.wav" hidden="true">
          </audio>
      </div>-->
    </div>

  </div>
</template>
<script>
  import Instruction from "@/components/Instruction";
  import Hotkey from "@/components/Hotkey";
  import {mapMutations} from "vuex"
  export default {
    name: "app",
    components: {
      Instruction,
      Hotkey
    },
    methods: {
      ...mapMutations(['keyBoardHandler'])
    },
    created() {
      document.addEventListener('keydown',this.keyBoardHandler)
    }
  };
</script>
<style lang="less" scoped>
  .content{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
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
</style>
<style>
  body html p h1 h2 h3 h4 h5 a span{
    margin: 0;
    padding: 0;
    font-family: "Microsoft Yahei";
  }

</style>

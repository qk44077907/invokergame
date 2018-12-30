<template>
  <div id="gameInterface">
    <div class="playZone">
      <div class="instruction">说明</div>
      <div class="instructionDetail">
        <input type="button" value="开始游戏（点击）" class="buttonStart">
        <span id="tipsWord">剩余技能：</span>
        <span id="tipsNum">20</span>

      </div>
      <div class="readyCountNum"></div>
      <div class="stopWatch">00:00</div>
      <div class="btnAfterGame">
        <input class="restart" type="button" value="再来一次"/><input class="cancel" type="button"
                                                                  value="返回"/>
      </div>
      <div id="modelBox">
        <div id="jsms_box">
          <div id="jsms_spellShow">
            <div class="picture"></div>
            <span class="name"></span>
          </div>
        </div>
        <div id="szms_box">
          <div id="szms_spellShow1">
            <div class="picture"></div>
            <span class="name"></span>
          </div>
          <div id="szms_spellShow2">
            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>
          </div>
          <div id="szms_spellShow3">
            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>
          </div>
          <div id="szms_spellShow4">
            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>
          </div>
          <div id="szms_spellShow6">
            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>
            <br/>

            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>
          </div>
          <div id="szms_spellShow10">
            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>
            <br/>

            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>

            <div class="picture"></div>
            <span class="name"></span>
          </div>
        </div>
      </div>
      <div id="rankList" style="display: none"></div>
      <div id="loading"><img src="../assets/images/loading_scoreboard.gif"></div>
      <div class="orbContainer">
        <div id="orb3">
        </div>
        <div id="orb2">
        </div>
        <div id="orb1">
        </div>
      </div>
      <br>
    </div>
    <div class="panel">
      <div id="quash">
        <div class="quashkey hotkey">Q</div>
      </div>
      <div id="wex">
        <div class="wexkey hotkey">W</div>
      </div>
      <div id="exort">
        <div class="exortkey hotkey">E</div>
      </div>
      <div id="skill1">
        <div class="skill1key hotkey">D</div>
      </div>
      <div id="skill2">
        <div class="skill2key hotkey">F</div>
      </div>
      <div id="invoke">
        <div class="invokekey hotkey">R</div>
      </div>
      <input class="cancel" type="button" value="返回"/>
      <input class="restart" type="button" value="重新开始"/>


    </div>
  </div>
</template>

<script>
  export default {
    name: "Play"
  }
</script>

<style lang="less" scoped>
  @import "../assets/play.css";
  .instruction {
    width: 180px;
    height: 30px;
    margin: auto;
    margin-bottom: -2px;
    margin-top: 20px;
    background-color: #6b6b6b;
    color: White;
    font-size: 20px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    padding-top: 2px;
  }

</style>
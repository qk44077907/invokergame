<template>
  <div id="gameInterface">
    <div class="playZone">
      <div class="instruction">说明</div>
      <div class="instructionDetail">
        <input type="button" value="开始游戏（点击）" class="buttonStart" @click="startGame" v-show="gameStatus === 0">
        <span id="tipsWord" v-show="gameStatus === 1">剩余技能：</span>
        <span id="tipsNum" v-show="gameStatus === 1">{{questionsRemaining}}</span>
        <span id="finish-tip" v-show="gameStatus === 2">游戏完成</span>

      </div>
      <div class="stopWatch" :class="{finished:gameStatus === 2}">{{timeElapsed}}</div>
      <transition name="fade">
        <div class="readyCountNum" v-if="isCountShowed">{{countDownNum}}</div>
      </transition>
      <div class="btnAfterGame" v-if="gameStatus === 2">
        <input @click="resetGame" class="restart" type="button" value="再来一次"/><input @click="backToHome" class="cancel" type="button"
                                                                  value="返回"/>
      </div>
      <div id="modelBox">
        <div id="jsms_box" v-if="model === 'jsms'">
          <div id="jsms_spellShow" :class="model1Question">
            <div class="picture"></div>
            <span class="name" :class="model1Question">{{model1QuestionName}}</span>
          </div>
        </div>
        <div id="szms_box" v-if="model === 'szms'">
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

      <div class="orbContainer" v-if="gameStatus !== 2">
        <div id="orb3" :class="[orbs[0]]">
        </div>
        <div id="orb2" :class="[orbs[1]]">
        </div>
        <div id="orb1" :class="[orbs[2]]">
        </div>
      </div>
      <br>
    </div>
    <div class="panel" v-if="gameStatus !== 2">
      <div id="quash">
        <div class="quashkey hotkey">{{hotkeyMap.quash.key}}</div>
      </div>
      <div id="wex">
        <div class="wexkey hotkey">{{hotkeyMap.wex.key}}</div>
      </div>
      <div id="exort">
        <div class="exortkey hotkey">{{hotkeyMap.exort.key}}</div>
      </div>
      <div id="skill1" :class="[skills[0]]">
        <div class="skill1key hotkey">{{skill1Key}}</div>
      </div>
      <div id="skill2" :class="[skills[1]]">
        <div class="skill2key hotkey">{{skill2Key}}</div>
      </div>
      <div id="invoke">
        <div class="invokekey hotkey">{{hotkeyMap.invoke.key}}</div>
      </div>
      <input class="cancel" type="button" value="返回" @click="backToHome"/>
      <input class="restart" type="button" value="重新开始"  @click="resetGame"/>


    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations,mapGetters} from "vuex"
  export default {
    name: "Play",
    props:['model'],
    data() {
      return {
        watchTimer:null,
        startTime:0,
        countDownNum: 3,
        isCountShowed:false,
        skills:[],
        orbs:[],
        model1Question:'',
        questionsRemaining:10,

        timeElapsed:'00:00'
      }

    },
    computed:{
      ...mapState(['gameStatus','hotkeyMap','isTraditional']),
      ...mapGetters(['answersMap']),
      skillList() {
        let skillList = []
        for (let prop in this.answersMap){
          skillList.push(this.answersMap[prop])
        }
        return skillList
      },
      skill1Key() {
        if(this.isTraditional){
          if(this.skills[0]){
            return this.hotkeyMap[this.skills[0]].key
          }else {
            return ''
          }

        }else {
          return this.hotkeyMap.skill1.key
        }

      },
      skill2Key() {
        if(this.isTraditional){
          if(this.skills[1]){
            return this.hotkeyMap[this.skills[1]].key
          }else {
            return ''
          }
        }else {
          return this.hotkeyMap.skill2.key
        }
      },
      model1QuestionName() {
        if(this.model1Question){
          return this.hotkeyMap[this.model1Question].text.zh
        }else {
          return ''
        }

      }
    },
    watch:{
      gameStatus(val,oldVal) {
        if(val === 0){

        }
      }
    },
    methods:{
      ...mapMutations(['changeGameStatus']),
      backToHome() {
        this.resetGame()
        this.$router.push({
          name:'home'
        })
      },
      keyBoardHandler(e) {
        /*if(this.gameStatus !== 1){
          return
        }*/
        let key = e.key.toUpperCase();
        console.log(key);
        switch (key) {
          case this.hotkeyMap.quash.key:
            this.orbs.unshift('quash');
            break;
          case this.hotkeyMap.wex.key:
            this.orbs.unshift('wex');
            break;
          case this.hotkeyMap.exort.key:
            this.orbs.unshift('exort');
            break;
          case this.hotkeyMap.invoke.key:
            let skillInvoked = this.invoke();
            if(this.model === 'jsms' && skillInvoked){
              this.checkModel1Answer(skillInvoked)
            }
            break;
        }
        while (this.orbs.length >3){
          this.orbs.pop()
        }
      },
      invoke() {
        let quash = 0,wex = 0, exort = 0;
        this.orbs.forEach((orb)=>{
          switch (orb) {
            case 'quash':
              quash++;
              break;
            case 'wex':
              wex++;
              break;
            case 'exort':
              exort++;
              break;
          }
        })
        console.log(`s${quash}${wex}${exort}`);
        let skillToBeInvoked = this.answersMap[`s${quash}${wex}${exort}`]
        if(skillToBeInvoked){
          if(this.skills.indexOf(skillToBeInvoked) === -1){
            this.skills.unshift(skillToBeInvoked)
          }else if(this.skills.length === 2){
            let skill2 = this.skills.pop()
            this.skills.unshift(skill2)
          }
        }
        while (this.skills.length >2){
          this.skills.pop()
        }
        return skillToBeInvoked
      },
      checkModel1Answer(skill) {
        if(skill === this.model1Question){ //技能召唤正确
          this.questionsRemaining--
          if(this.questionsRemaining === 0){
            this.finishGame()
          }
          this.updateModel1Question()
        }
      },
      updateModel1Question() {
        let question
        do{
          question = this.skillList[Math.floor(Math.random()*this.skillList.length)];
        }while (question === this.model1Question)
        this.model1Question = question
      },
      startWatch() {
        this.startTime = +new Date()
        this.watchTimer = setInterval(()=>{
          let timeElapsed = String(((+new Date() - this.startTime)/1000).toFixed(2))
          let seconds = timeElapsed.split('.')[0]
          let milSeconds = timeElapsed.split('.')[1]
          if(seconds.length === 1){
            seconds = '0' + seconds
          }
          this.timeElapsed = `${seconds}:${milSeconds}`
        },10)
      },
      pauseWatch() {
        clearInterval(this.watchTimer)
      },
      async startGame() {
        this.countDownNum =3
        this.isCountShowed = true
        let timer
        await new Promise((resolve, reject)=>{
          timer = setInterval(()=>{
            this.isCountShowed = false
            if(this.countDownNum === 1){
              clearInterval(timer)
              resolve()
            }else {
              this.$nextTick(()=>{
                this.countDownNum --
                this.isCountShowed = true
              })
            }

          },1000)
        })
        this.startWatch()
        this.updateModel1Question()
        this.changeGameStatus(1)
      },
      finishGame() {
        this.pauseWatch()
        this.changeGameStatus(2)
      },
      resetGame() {
        this.pauseWatch()
        this.timeElapsed = '00:00'
        this.changeGameStatus(0)
      },
    },

    mounted() {
      document.addEventListener('keydown', this.keyBoardHandler)
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.keyBoardHandler);
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/play.css";
  @keyframes shake-horizontal {
    10% {
      transform: translate(-10px, 0); }
    20% {
      transform: translate(0px, 0); }
    30% {
      transform: translate(8px, 0);}
    40% {
      transform: translate(0px, 0);}
    50% {
      transform: translate(-6px, 0);}
    60% {
      transform: translate(0px, 0);}
    70% {
      transform: translate(4px, 0);}
    80% {
      transform: translate(0px, 0); }
    90% {
      transform: translate(-2px, 0);}
    0%, 100% {
      transform: translate(0, 0) rotate(0deg); }
  }
  @keyframes neon2 {
    from {
      text-shadow: 0 0 8px #fff,
      0 0 16px  #fff,
      0 0 32px  #228DFF,
      0 0 35px  #228DFF,
      0 0 40px #228DFF;
    }
    to {
      text-shadow: 0 0 4px #fff,
      0 0 12px #fff,
      0 0 16px #228DFF,
      0 0 20px #228DFF,
      0 0 24px #228DFF;
    }
  }
  #gameInterface{
    .playZone{
      text-align: center;
      position: relative;
    }

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
      padding-top: 2px;
    }
    .instructionDetail {
      display: inline-block;
      height: 50px;
      line-height: 50px;
      min-width: 250px;
      border-radius: 30px;
      background-image: url('../assets/images/buttonbg.jpg');
      border: 4px solid #6b6b6b;
      padding:0 20px;
    }

    #tipsWord{
      font-size: 20px;
      vertical-align: middle;
    }
    #tipsNum{
      font-size: 30px;
      vertical-align: middle;
    }
    #finish-tip{
      font-size: 20px;
      vertical-align: middle;
    }

    .buttonStart {
      margin: 0 auto;
      width: 100%;
      height: 50px;
      font-size: 20px;
      border: 0px;
      background-color: transparent;
      color: White;
      font-weight: bold;
      cursor: pointer;
      padding-left: 10px;
      text-shadow: 3px 3px 4px #000000;
    }
    #jsms_box,#szms_box{
      height: 200px;
      line-height: 200px;
      overflow:hidden;

    }
    .stopWatch{
      font-size: 40px;
      font-weight: bold;
      margin-top: 20px;
      text-shadow: 0px 0px 10px #9FE6E2;
      transform-origin: center center;
      &.finished{
        animation: neon2 1s ease-in-out infinite alternate,shake-horizontal 200ms ease-in-out 3;
      }
    }

    .btnAfterGame{
      margin-top: 15px;

    }
    .btnAfterGame .cancel{
      height: 40px;
      width: 100px;
      font-weight: bold;
      font-family: "SimHei";
      border: 3px solid #6B6B6B;
      border-radius: 10px;
      cursor: pointer;
      font-size: 18px;
    }
    .btnAfterGame .restart{
      height: 40px;
      width: 170px;
      font-weight: bold;
      font-family: "SimHei";
      border: 3px solid #6B6B6B;
      border-radius: 10px;
      cursor: pointer;
      font-size:18px;
    }
    .btnAfterGame .restart:hover,.btnAfterGame .cancel:hover{
      background-color: #0b93d5;
    }
    .readyCountNum{
      display: inline-block;
      font-size: 60px;
      top: 150px;
      margin: auto;
      position: absolute;
      left: 50%;
      opacity: 1;
      transform: scale(1) translateX(-50%);
      transform-origin: center;
      &.fade-enter-active{
        transition: all 1s;
      }
      &.fade-enter{
        transform: scale(8);
        transform-origin: center;
        opacity: 0;
      }
    }
    #jsms_spellShow{
      text-align: center;
      margin-top: 60px;
      width: 100%;
      height: 80px;
      line-height: 80px;
      background-size: 100% 100%;
      .picture{
        background-size: 100% 100%;
      }
      &.jslq{
        box-shadow: 0px 0px 50px #68B4FB;
        .picture{
          box-shadow: 0px 0px 10px #CEEBFF;
          background-image: url("../assets/images/spells/jslq.png");
        }
      }
      &.hbzq{
        box-shadow: 0px 0px 50px #68B4FB;
        .picture{
          box-shadow: 0px 0px 10px #CEEBFF;
          background-image: url("../assets/images/spells/hbzq.png");
        }
      }
      &.ylmb{
        box-shadow: 0px 0px 50px #72C3FC;
        .picture{
          box-shadow: 0 0 10px #68B4FB;
          background-image: url("../assets/images/spells/ylmb.png");
        }
      }
      &.dcmc{
        box-shadow: 0px 0px 50px #F793F5;
        .picture{
          box-shadow: 0px 0px 10px #F793F5;
          background-image: url("../assets/images/spells/dcmc.png");
        }
      }
      &.qxjf{
        box-shadow: 0px 0px 50px #F487F1;
        .picture{
          box-shadow: 0px 0px 10px #9A53BB;
          background-image: url("../assets/images/spells/qxjf.png");
        }
      }
      &.yycj{
        box-shadow: 0px 0px 50px #D19005;
        .picture{
          box-shadow: 0px 0px 10px #FFC562;
          background-image: url("../assets/images/spells/yycj.png");
        }
      }
      &.rljl{
        box-shadow: 0px 0px 50px #D19005;
        .picture{
          box-shadow: 0px 0px 10px #FFC562;
          background-image: url("../assets/images/spells/rljl.png");
        }
      }
      &.hdys{
        box-shadow: 0px 0px 50px #D19005;
        .picture{
          box-shadow: 0px 0px 10px #FFC562;
          background-image: url("../assets/images/spells/hdys.png");
        }
      }
      &.czsb{
        box-shadow: 0px 0px 50px #F5B9E7;
        .picture{
          box-shadow: 0px 0px 10px #F5B9E7;
          background-image: url("../assets/images/spells/czsb.png");
        }
      }
      &.ldxj{
        box-shadow: 0px 0px 50px #F48DF2;
        .picture{
          box-shadow: 0px 0px 10px #F48DF2;
          background-image: url("../assets/images/spells/ldxj.png");
        }
      }
      [class='name jslq']{
        color:#4785CB ;
        text-shadow: 0px 0px 100px #68B4FB;
      }
      [class='name hbzq']{
        color:#4785CB ;
        text-shadow: 0px 0px 100px #CEEBFF;
      }
      [class='name ylmb']{
        color: #72C3FC;
        text-shadow: 0px 0px 100px #72C3FC;
      }
      [class='name dcmc']{
        color: #F487F1;
        text-shadow: 0px 0px 100px #F793F5;
      }
      [class='name qxjf']{
        color: #F487F1;
        text-shadow: 0px 0px 100px #F487F1;
      }
      [class='name yycj']{
        color: #FCCA72;
        text-shadow: 0px 0px 100px red;
      }
      [class='name rljl']{
        color: #FCCA72;
        text-shadow: 0px 0px 100px red;
      }
      [class='name hdys']{
        color: #FCCA72;
        text-shadow: 0px 0px 100px red;
      }
      [class='name czsb']{
        color: #F4ADD1;
        text-shadow: 0px 0px 100px #F5B9E7;
      }
      [class='name ldxj']{
        color: #F487F1;
        text-shadow: 0px 0px 100px #F48DF2;
      }
    }


    #jsms_spellShow>div{
      width: 60px;
      height: 60px;
      display: inline-block;
      vertical-align: middle;
    }


    #jsms_spellShow>span{
      font-size: 30px;
      padding-left: 0.5em;
      vertical-align: middle;
    }

    [id*=szms_spellShow]{
      text-align: center;
      margin-top: 60px;
      width: 100%;
      height: 80px;
      line-height: 80px;
      background-size: 100% 100%;
      background-image: url("../assets/images/buttonbg.jpg");
    }

    #szms_spellShow6{
      text-align: center;
      margin-top: 40px;
      width: 100%;
      height: 160px;
      line-height: 80px;
      background-size: 100% 50%;
      background-image: url("../assets/images/buttonbg.jpg");
    }

    #szms_spellShow10{
      text-align: center;
      margin-top: 40px;
      width: 100%;
      height: 160px;
      line-height: 80px;
      background-size: 100% 50%;
      background-image: url("../assets/images/buttonbg.jpg");
    }
    #szms_spellShow1>div{
      width: 60px;
      height: 60px;
      display: inline-block;
      margin-right: 0.8rem;
      margin-left: 0.8rem;
      vertical-align: middle;
    }
    #szms_spellShow1>span{
      font-size: 30px;
      vertical-align: middle;
    }
    #szms_spellShow2>div{
      width: 60px;
      height: 60px;
      display: inline-block;
      margin-right: 1.2rem;
      margin-left: 1.2rem;
      vertical-align: middle;
    }
    #szms_spellShow2>span{
      font-size: 26px;
      vertical-align: middle;
    }
    #szms_spellShow3>div{
      width: 55px;
      height: 55px;
      display: inline-block;
      margin-right: 0.6rem;
      margin-left: 1rem;
      vertical-align: middle;
    }
    #szms_spellShow3>span{
      font-size: 24px;
      vertical-align: middle;
    }
    #szms_spellShow4>div{
      width: 50px;
      height: 50px;
      display: inline-block;
      margin-right: 0.2rem;
      margin-left: 0.3rem;
      vertical-align: middle;
    }
    #szms_spellShow4>span{
      font-size: 20px;
      vertical-align: middle;
    }

    #szms_spellShow6>div{
      width: 55px;
      height: 55px;
      display: inline-block;
      margin-right: 0.6rem;
      margin-left: 1rem;
      vertical-align: middle;
    }
    #szms_spellShow6>span{
      font-size: 24px;
      vertical-align: middle;
    }
    #szms_spellShow10>div{
      width: 45px;
      height: 45px;
      display: inline-block;
      margin-right: 0.1rem;
      margin-left: 0.1rem;
      vertical-align: middle;
    }
    #szms_spellShow10>span{
      font-size: 16px;
      vertical-align: middle;
    }
    #loading{
      display: none;
    }
    .orbContainer {
      width: 326px;
      margin: auto;
      padding: 0px;
      margin-top: 50px;
      overflow: hidden;
    }

    #orb1, #orb2, #orb3 {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      -moz-border-radius: 50px;
      -webkit-border-radius: 50px;
      border: 1px solid #6e6e6e;
      float: left;
      margin-left: 5px;
    }

    .orbContainer .quash{
      background-image: url("../assets/images/spells/quash.png");
      background-size: 100% 100%;
    }

    .orbContainer .wex{
      background-image: url("../assets/images/spells/wex.png");
      background-size: 100% 100%;
    }
    .orbContainer .exort{
      background-image: url("../assets/images/spells/exort.png");
      background-size: 100% 100%;
    }

    .panel{
      position: relative;
      width: 100%;
      height: 161px;
      background-image: url("../assets/images/panel-bg.jpg");
      background-size: 100% 100%;
    }
    .panel>div{
      height: 72px;
      width: 72px;
      border-radius: 3px;
      -moz-border-radius: 3px;
      -webkit-border-radius: 3px;
      cursor: pointer;
      border-color: transparent;
    }
    .panel .jslq{
      background-image: url("../assets/images/spells/jslq.png");
      background-size: 100% 100%;
    }
    .panel .hbzq{
      background-image: url("../assets/images/spells/hbzq.png");
      background-size: 100% 100%;
    }
    .panel .ylmb{
      background-image: url("../assets/images/spells/ylmb.png");
      background-size: 100% 100%;
    }
    .panel .dcmc{
      background-image: url("../assets/images/spells/dcmc.png");
      background-size: 100% 100%;
    }
    .panel .qxjf{
      background-image: url("../assets/images/spells/qxjf.png");
      background-size: 100% 100%;
    }
    .panel .yycj{
      background-image: url("../assets/images/spells/yycj.png");
      background-size: 100% 100%;
    }
    .panel .rljl{
      background-image: url("../assets/images/spells/rljl.png");
      background-size: 100% 100%;
    }
    .panel .hdys{
      background-image: url("../assets/images/spells/hdys.png");
      background-size: 100% 100%;
    }
    .panel .czsb{
      background-image: url("../assets/images/spells/czsb.png");
      background-size: 100% 100%;
    }
    .panel .ldxj{
      background-image: url("../assets/images/spells/ldxj.png");
      background-size: 100% 100%;
    }

    .panel .hotkey{
      position: absolute;
      height: 23px;
      width: 22px;
      top: -13px;
      left: -10px;
      padding-right: 3px;
      padding-top: 3px;
      color: #bbb2ad;
      font-weight: bold;
      cursor: pointer;
      background-image: url("../assets/images/hotkey-bg.png");
      background-size:  100% 100%;
      text-align: center;
      text-indent: 0;
    }
    #quash{
      position: absolute;
      left: 22px;
      top: 29px;
      background-image: url("../assets/images/spells/quash.png");
      background-size: 100% 100%;
    }

    #wex{
      position: absolute;
      left: 120px;
      top: 29px;
      background-image: url("../assets/images/spells/wex.png");
      background-size: 100% 100%;
    }
    #exort{
      position: absolute;
      left: 219px;
      top: 29px;
      background-image: url("../assets/images/spells/exort.png");
      background-size: 100% 100%;
    }
    #skill1{
      position: absolute;
      left: 318px;
      top: 29px;
    }
    #skill2{
      position: absolute;
      left: 417px;
      top: 29px;
    }
    #invoke{
      position: absolute;
      left: 515px;
      top: 29px;
      background-image: url("../assets/images/spells/invoke.png");
      background-size: 100% 100%;
    }
    .panel .cancel{
      position: absolute;
      right: 20px;
      bottom: 20px;
      font-size: 15px;
      font-weight: bold;
      font-family: "SimHei";
      width: 50px;
      height: 25px;
      border: 3px solid black;
      border-radius: 5px;
      cursor: pointer;
    }
    .panel .restart{
      position: absolute;
      right: 68px;
      bottom: 20px;
      font-size: 15px;
      font-weight: bold;
      font-family: "SimHei";
      width: 80px;
      height: 25px;
      border: 3px solid black;
      border-radius: 5px;
      cursor: pointer;
    }
    #mask{
      display: none;
      width: 100%;
      height: 100%;
      z-index: 100;
      position: fixed;
      background-color: rgba(0, 0, 0, 0.8);
      text-align: center;
    }
    #finalScore{
      /*display: inline-block;*/
      font-size: 30px;
      position: absolute;
      width: 600px;
      height: 300px;
      text-align: center;
      top: 50%;
      left: 50%;
      margin-left: -300px;
      margin-top: -220px;
      padding-top: 10px;
      opacity: 0;
      -webkit-transform:scale(3) ;
      -moz-transform: scale(3);
      -ms-transform: scale(3);
      -o-transform:scale(3) ;
      -webkit-transition: transform 0.8s ease-in,opacity 0.8s ease-in;
      -moz-transition: transform 0.8s ease-in,opacity 0.8s ease-in;
      -ms-transition: transform 0.8s ease-in,opacity 0.8s ease-in;
      -o-transition: transform 0.8s ease-in,opacity 0.8s ease-in;
      transition: transform 0.8s ease-in,opacity 0.8s ease-in;
      background-image: url("../assets/images/dota2bg.jpg");
      background-size: 100% 110%;
      background-position: 50% -5px;
      background-color: rgba(0, 0, 0, 0.8);
      background-blend-mode: color;
      border: solid #777777 3px;
      border-radius: 15px;
    }
    #finalScore .close {
      position: absolute;
      display: inline-block;
      width: 40px;
      height: 40px;
      overflow: hidden;
      right: -20px;
      top: -20px;
      background-color: #666666;
      border: 1px solid transparent;
      border-radius: 20px;
      cursor: pointer;
    }
    #finalScore .close:hover{
      background: #0b93d5;
    }
    #finalScore .close::before,#finalScore .close::after{
      content: '';
      position: absolute;
      height: 8px;
      width: 100%;
      top: 50%;
      left: 0;
      margin-top: -4px;
      background: #000;
      border-radius: 5px;

    }
    #finalScore .close::before{
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    #finalScore .close::after{
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }
    #finalScore .scoreText,#finalScore .scoreRate{
      font-size: 60px;
      vertical-align: middle;
    }
    #shareBox{
      font-size: 20px;
      margin-top:30px;

    }
    .Weibo,.QQ{
      color: rgba(255, 255, 255,.30);
      text-decoration: none;
      display: inline-block;
      font: normal normal normal 30px/1 FontAwesome;
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing: grayscale;
      margin-left: 20px;
      margin-right:10px;
    }
    .Weibo:after{
      content: "\f18a";
    }
    .QQ:after{
      content: "\f1d6";
    }
    .scoreBoard{
      display: none;
      margin-top: 50px;
    }
    .scoreBoard table{
      border-collapse: collapse;
      margin: auto;
      width: 100%;
      border: none;
      font-size: 25px;
    }
    #caption{
      font-size: 25px;
    }
    .scoreBoard td{
      text-align: left;
      line-height: 25px;
      font-size: 13px;
      height: 34px;
      padding: 2px;
      border: none;
      margin:0px;
    }
    .scoreBoard td:first-child{
      width: 20px;
      padding-left: 5px;
    }
    .scoreBoard td:nth-child(2){
      width: 50px;
    }
    .scoreBoard td:nth-child(3){
      width: 400px;
    }
    .scoreBoard td.scoreCol{
      text-align: right;
      padding-right: 20px;
    }
    .scoreBoard tr{
      border: 1px solid transparent;
      border-radius: 5px;
      padding-right: 10px;
    }
    .odd{
      background-color: #333333;
    }
    .even{
      background-color: #121212;
    }
    .scoreBoard table td:first-child {
      -moz-border-radius-bottomleft:5px;
      -webkit-border-bottom-left-radius:5px;
      border-bottom-left-radius:5px;
      -moz-border-radius-topleft:5px;
      -webkit-border-top-left-radius:5px;
      border-top-left-radius:5px
    }
    .scoreBoard table td:last-child {
      -moz-border-radius-topright:5px;
      -webkit-border-top-right-radius:5px;
      border-top-right-radius:5px;
      -moz-border-radius-bottomright:5px;
      -webkit-border-bottom-right-radius:5px;
      border-bottom-right-radius:5px
    }
  }
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
<template>
  <div id="gameInterface">
    <div class="playZone">
      <div class="instruction">{{language === 'zh-CN'?'说明':'Hint'}}</div>
      <div class="instructionDetail">
        <input type="button" :value="language === 'zh-CN'?'开始游戏（点击）':'Start Game(click)'" class="buttonStart" @click="startGame" v-show="gameStatus === 0">
        <span id="tipsWord" v-show="gameStatus === 1">{{language === 'zh-CN' ? '剩余技能：':'Remaining:'}}</span>
        <span id="tipsNum" v-show="gameStatus === 1">{{questionsRemaining}}</span>
        <span id="finish-tip" v-show="gameStatus === 2">{{language === 'zh-CN' ? '游戏完成：':'Challenge Finished'}}</span>

      </div>
      <div class="stopWatch" :class="{finished:gameStatus === 2}">{{timeElapsed}}</div>
      <transition name="fade">
        <div class="readyCountNum" v-if="isCountShowed">{{countDownNum}}</div>
      </transition>
      <div class="btnAfterGame" v-if="gameStatus === 2">
        <input @click="resetGame" class="restart" type="button" :value="language === 'zh-CN'?'再来一次':'Play again'"/><input @click="backToHome" class="cancel" type="button"
                                                                  :value="language === 'zh-CN'?'返回':'Back'"/>
      </div>
      <div id="modelBox" v-if="gameStatus !== 2">
        <div id="jsms_box" v-if="model === 'jsms'">
          <div id="jsms_spellShow" :class="model1Question">
            <div class="picture"></div>

            <span class="name" :class="model1Question">{{model1QuestionName}}</span>
          </div>
        </div>
        <div id="szms_box" v-if="model === 'szms'">
          <div id="szms_spellShow10">
            <div class="line1 line">
              <div
                  v-for="(question,index) in line1Questions"
                  :key="index"
                  :class="[question.name,{hide:question.isAnswered}]"
                  class="question-wrapper"
              >
                <div class="picture" :class="[question.name]"></div>
                <span class="name" :class="[question.name]">{{question.text}}</span>
              </div>
            </div>
            <div class="line2 line">
              <div
                  v-for="(question,index) in line2Questions"
                  :key="index"
                  :class="[question.name,{hide:question.isAnswered}]"
                  class="question-wrapper"
              >
                <div class="picture" :class="[question.name]"></div>
                <span class="name" :class="[question.name]">{{question.text}}</span>
              </div>
            </div>
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
      <div id="quash" @click="keyBoardHandler({key:hotkeyMap.quash.key})">
        <div class="quashkey hotkey">{{hotkeyMap.quash.key}}</div>
      </div>
      <div id="wex" @click="keyBoardHandler({key:hotkeyMap.wex.key})">
        <div class="wexkey hotkey">{{hotkeyMap.wex.key}}</div>
      </div>
      <div id="exort" @click="keyBoardHandler({key:hotkeyMap.exort.key})">
        <div class="exortkey hotkey">{{hotkeyMap.exort.key}}</div>
      </div>
      <div id="skill1" :class="[skills[0]]" @click="keyBoardHandler({key:skillSlotKeys[0] || null})">
        <div class="skill1key hotkey">{{skillSlotKeys[0]}}</div>
      </div>
      <div id="skill2" :class="[skills[1]]" @click="keyBoardHandler({key:skillSlotKeys[1] || null})">
        <div class="skill2key hotkey">{{skillSlotKeys[1]}}</div>
      </div>
      <div id="invoke" @click="keyBoardHandler({key:hotkeyMap.invoke.key})">
        <div class="invokekey hotkey">{{hotkeyMap.invoke.key}}</div>
      </div>
      <input class="cancel" type="button" :value="language === 'zh-CN'?'返回':'Back'" @click="backToHome"/>
      <input class="restart" type="button" :value="language === 'zh-CN'?'重新开始':'Restart'" @click="resetGame"/>


    </div>
  </div>
</template>

<script>
  function shuffle(arr){
    let n = arr.length, random;
    while(0!=n){
      random =  (Math.random() * n--) >>> 0; // 无符号右移位运算符向下取整
      [arr[n], arr[random]] = [arr[random], arr[n]] // ES6的结构赋值实现变量互换
    }
    return arr;
  }
  import {playAudio, stopAudio} from "../utils/audioHandler";
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
        model2Questions:[],
        questionsRemaining:10,
        timeElapsed:'00:00'
      }

    },
    computed:{
      ...mapState(['gameStatus','hotkeyMap','isTraditional','language']),
      ...mapGetters(['answersMap']),
      line1Questions() {
        let mid = this.model2Questions.length /2
        return this.model2Questions.filter((question, index)=>index < mid)
      },
      line2Questions() {
        let mid = this.model2Questions.length/2
        return this.model2Questions.filter((question, index)=>index >= mid)
      },
      skillList() {
        let skillList = []
        for (let prop in this.answersMap){
          skillList.push(this.answersMap[prop])
        }
        return skillList
      },
      skillSlotKeys() {
        let keys = []

        if(this.isTraditional){
          if(this.skills[0]){
            keys[0] = this.hotkeyMap[this.skills[0]].key
          }else {
            keys[0] = ''
          }
        }else {
          keys[0] = this.hotkeyMap.skill1.key
        }
        if(this.isTraditional){
          if(this.skills[1]){
            keys[1] = this.hotkeyMap[this.skills[1]].key
          }else {
            keys[1] = ''
          }
        }else {
          keys[1] = this.hotkeyMap.skill2.key
        }
        return keys

      },
      model1QuestionName() {
        if(this.model1Question){
          return this.language === 'zh-CN' ? this.hotkeyMap[this.model1Question].text.zh :this.hotkeyMap[this.model1Question].text.en
        }else {
          return ''
        }
      },
    },

    methods:{
      ...mapMutations(['changeGameStatus']),
      backToHome() {
        playAudio('#cancelSound');
        this.resetGame()
        this.$router.push({
          name:'home'
        })
      },
      keyBoardHandler(e) {
        if(this.gameStatus !== 1){
          return
        }
        let key = e.key.toUpperCase();
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
        if(this.model === 'szms'){
          let skillTriggered
          let index = this.skillSlotKeys.indexOf(key)
          if(index !== -1 && this.skills[index]){
            skillTriggered = this.skills[index]
            this.checkModel2Answer(skillTriggered)
          }
        }
        while (this.orbs.length >3){
          this.orbs.pop()
        }
      },
      invoke() {
        playAudio('#invokeSound',0.7)
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
        let skillToBeInvoked = this.answersMap[`s${quash}${wex}${exort}`]
        if(skillToBeInvoked){
          let index = this.skills.indexOf(skillToBeInvoked)
          if(index === -1){
            this.skills.unshift(skillToBeInvoked)
          }else if(this.skills.length === 2 && index === 1){
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
            return
          }
          playAudio(`#${skill}`,0.5)
          this.updateModel1Question()
        }
      },
      checkModel2Answer(skillTriggered) {
        let questionHit = this.model2Questions.find(question => question.name === skillTriggered && !question.isAnswered)
        if(questionHit){
          this.questionsRemaining--
          questionHit.isAnswered = true
          if(this.questionsRemaining === 0){
            this.finishGame()
            return
          }
          playAudio(`#${skill}`)
          if(this.model2Questions.filter(question => !question.isAnswered).length === 0){
            this.updateModel2Question()
          }
        }
      },
      updateModel1Question() {
        let question
        do{
          question = this.skillList[Math.floor(Math.random()*this.skillList.length)];
        }while (question === this.model1Question)
        this.model1Question = question
      },
      updateModel2Question() {
        let copy = this.skillList.slice()
        this.model2Questions = shuffle(copy).slice(0,5).map(question =>{
          return {
            name:question,
            text:this.language === 'zh-CN'?this.hotkeyMap[question].text.zh : this.hotkeyMap[question].text.en,
            isAnswered:false
          }
        })
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
      resetParams() {
        let defaultParams = {
          watchTimer:null,
          startTime:0,
          countDownNum: 3,
          isCountShowed:false,
          skills:[],
          orbs:[],
          model1Question:'',
          model2Questions:[],
          questionsRemaining:10,

          timeElapsed:'00:00'
        }
        for(let key in defaultParams){
          this[key] = defaultParams[key]
        }
      },
      async startGame() {
        stopAudio('#finish')
        this.isCountShowed = true
        playAudio('#countSound')
        let timer
        await new Promise((resolve, reject)=>{
          timer = setInterval(()=>{
            this.isCountShowed = false
            if(this.countDownNum === 1){
              clearInterval(timer)
              resolve()
            }else {
              this.$nextTick(()=>{
                playAudio('#countSound')
                this.countDownNum --
                this.isCountShowed = true
              })
            }

          },1000)
        })
        this.startWatch()
        switch (this.model) {
          case 'jsms':
            this.updateModel1Question();
            break;
          case 'szms':
            this.updateModel2Question();
            break;
        }
        this.changeGameStatus(1)
      },
      finishGame() {
        this.pauseWatch()
        this.changeGameStatus(2)
      },
      resetGame() {
        this.pauseWatch()
        this.resetParams()
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
    user-select: none;
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


      &>div{
        width: 60px;
        height: 60px;
        display: inline-block;
        vertical-align: middle;
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
    .picture{
      background-size: 100% 100%;
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

    #szms_spellShow10{
      margin-top: 40px;
      width: 100%;
      height: 160px;
      line-height: 80px;
      background-size: 100% 50%;
      background-image: url("../assets/images/buttonbg.jpg");
      .line{
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 80px;
        height: 80px;
        .question-wrapper{
          margin-right: 10px;
          &:last-child{
            margin-right: 0;
          }
        }
      }
      .question-wrapper{
        display: inline-block;
        opacity: 1;
        transition: opacity 0.5s;
        &.hide{
          opacity: 0;
        }
        &.jslq{
          .picture{
            box-shadow: 0px 0px 10px #CEEBFF;
            background-image: url("../assets/images/spells/jslq.png");
          }
        }
        &.hbzq{

          .picture{
            box-shadow: 0px 0px 10px #CEEBFF;
            background-image: url("../assets/images/spells/hbzq.png");
          }
        }
        &.ylmb{

          .picture{
            box-shadow: 0 0 10px #68B4FB;
            background-image: url("../assets/images/spells/ylmb.png");
          }
        }
        &.dcmc{

          .picture{
            box-shadow: 0px 0px 10px #F793F5;
            background-image: url("../assets/images/spells/dcmc.png");
          }
        }
        &.qxjf{

          .picture{
            box-shadow: 0px 0px 10px #9A53BB;
            background-image: url("../assets/images/spells/qxjf.png");
          }
        }
        &.yycj{
          .picture{
            box-shadow: 0px 0px 10px #FFC562;
            background-image: url("../assets/images/spells/yycj.png");
          }
        }
        &.rljl{
          .picture{
            box-shadow: 0px 0px 10px #FFC562;
            background-image: url("../assets/images/spells/rljl.png");
          }
        }
        &.hdys{
          .picture{
            box-shadow: 0px 0px 10px #FFC562;
            background-image: url("../assets/images/spells/hdys.png");
          }
        }
        &.czsb{
          .picture{
            box-shadow: 0px 0px 10px #F5B9E7;
            background-image: url("../assets/images/spells/czsb.png");
          }
        }
        &.ldxj{
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
      .picture{
        width: 45px;
        height: 45px;
        display: inline-block;
        margin-right: 0.1rem;
        margin-left: 0.1rem;
        vertical-align: middle;
      }
      .name{
        font-size: 16px;
        vertical-align: middle;
      }



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
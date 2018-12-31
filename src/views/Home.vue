<template>
  <div id="menu">
    <ul id="modelList">
      <li id="jsms" @mouseenter="changeModel('jsms')" @click="play"><a href="javascript:void(0)" class="button button-black" :class="[language]">{{language === 'zh-CN' ? '召唤模式':'Invoke Model'}}</a>
      </li>
      <li id="szms" @mouseenter="changeModel('szms')" @click="play"><a href="javascript:void(0)" class="button button-black" :class="[language]">{{language === 'zh-CN' ? '连招模式':'Combo Model'}}</a>
      </li>
    </ul>

    <div id="intro" :class="[model]">
      <h2>{{modelTitle}}</h2>
      <p>{{modelText}}</p>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import {playAudio} from "../utils/audioHandler";
  import {mapState} from "vuex"
  export default {
    name: "home",
    data() {
      return {
        model:'jsms'
      }
    },
    computed:{
      ...mapState(['language']),
      modelTitle() {
        let text = ''
        switch (this.model) {
          case 'jsms':
            text = this.language === 'zh-CN' ? '召唤模式':'Invoke Model'
            break;
          case 'szms':
            text = this.language === 'zh-CN' ? '连招模式':'Combo Model'
            break;
        }
        return text
      },
      modelText() {
        let text = ''
        switch (this.model) {
          case 'jsms':
            text = this.language === 'zh-CN' ? '每次随机给出一个技能，玩家只需召唤该技能，无需施放，总共10个技能。快来挑战你的极限手速吧！':`A random skill will be showed each time, and you just need to INVOKE it rather than trigger it. 10 skills in sum. Come on and challenge yourself the invoke speed!`
            break;
          case 'szms':
            text = this.language === 'zh-CN' ? '\'每次随机给出一组技能，每组5个技能，总共2组，玩家需召唤并释放这些技能。快来挑战你的Combo速度吧！':`A group of 5 random skills will be showed each time and you need to INVOKE and TRIGGER it. 2 groups in sum. Come on and challenge yourself the combo speed!`
            break;
        }
        return text
      }
    },
    methods:{
      changeModel(model) {
        playAudio('#modelhoverSound',0.5);
        this.model = model
      },
      play() {
        playAudio('#modelclickSound',0.5);
        this.$router.push({
          name:'play',
          params:{
            model:this.model
          }
        })


      }
    },
    components: {}
  };
</script>
<style lang="less" scoped>
  #menu{
    .button:active {
      /* When pressed, move it down 1px */
      position: relative;
      top: 1px;
    }
    .button{
      border-radius: 0.5rem;
      border-top: 1px solid #fff;
      border-top: 1px solid rgba(255, 255, 255, 0.5);
      display: block;
      font-size: 20px;
      &.zh-CN{
        font-size: 24px;
        letter-spacing: 6px;
      }
      text-align: center;
      margin-bottom: 100px;
      text-decoration: none;

      color: #fff;

    }
    ul{
      width: 207px;
      display: block;
      float: left;
      list-style: none;
      line-height: 60px;
      padding: 0px 0 0 0px;
      font-size: 1rem;
      text-align: center;
      margin-left: 10px;
      margin-top: 30px;
    }
    .button-black {
      background: #141414;
      background: linear-gradient(#656565, #141414);
      &:hover {
        background: #656565;
        background: linear-gradient(#141414, #656565);
        color: #e36500;
      }

    }
    #intro {
      position: relative;
      margin-left: 230px;
      height: 320px;
      background-color: #582722;
      &.szms:after{
        top: 210px;
      }
      &:after {
        content: '';
        position: absolute;
        left: -30px;
        top: 48px;
        border: solid 15px #582722;
        border-left-color: transparent;
        border-top-color: transparent;
        border-bottom-color: transparent;
      }
      h2 {
        text-align: center;
        margin-bottom: 10px;
        font-size: 1.2rem;
      }
      p {
        text-indent: 2em;
        font-size: 0.9rem;
        margin-left: 3px;
        line-height: 30px;
      }
    }
  }


</style>

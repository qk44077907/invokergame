<template>
  <div id="menu">
    <ul id="modelList">
      <li id="jsms" @mouseenter="changeModel('jsms')" @click="play"><a href="javascript:void(0)" class="button button-black">极速模式</a>
      </li>
      <li id="szms" @mouseenter="changeModel('szms')"><a href="javascript:void(0)" class="button button-black"> 实战模式</a>
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
  export default {
    name: "home",
    data() {
      return {
        model:'jsms'
      }
    },
    computed:{
      modelTitle() {
        let text = ''
        switch (this.model) {
          case 'jsms':
            text = '极速模式'
            break;
          case 'szms':
            text = '实战模式'
            break;
        }
        return text
      },
      modelText() {
        let text = ''
        switch (this.model) {
          case 'jsms':
            text = '每次随机给出一个技能，玩家只需召唤该技能，无需施放，总共20个技能。快来挑战你的极限手速吧！'
            break;
          case 'szms':
            text = '每次随机给出一组技能，总共15组，每组技能数量逐渐增多，玩家需要按顺序完成Combo！想成为卡尔大神？先来挑战你的反应能力吧！注意每个技能需要施放才算完成此技能。'
            break;
        }
        return text
      }
    },
    methods:{
      changeModel(model) {
        this.model = model

        /*var sound = $('#modelhoverSound')[0];
        sound.pause();
        sound.currentTime = 0.0;
        sound.volume = 0.6;
        sound.play();*/
      },
      play() {
        this.$router.push({
          name:'play',
          params:{
            model:this.model
          }
        })
        /*var sound = $('#modelclickSound')[0];
        sound.pause();
        sound.currentTime = 0.0;
        sound.volume = 0.3;
        sound.play();*/
      }
    },
    components: {}
  };
</script>
<style lang="less">
  @import "../assets/home.css";
  @import "../assets/public.css";
  @import "../assets/hero.css";
  #menu{
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

<template>
  <div id="skillBox" class="instruction">
    <h2>{{language === 'zh-CN' ? '技能表' :'Skills Map'}}</h2>
    <table id="spellTable">
      <tbody>
      <tr class="cell" v-for="(skill, skillKey) in skillsMap" :key="skillKey">
        <td><span :class="[skillKey]" class="icon"></span></td>
        <td><span class="spellName" :class="{en:language !== 'zh-CN'}">{{language === 'zh-CN' ? skill.text.zh :skill.text.en}}-</span></td>
        <td v-for="(orb ,index) in skill.orbs" :key="index" :class="[orb]">
          <span class="hotkey hotkey1">{{hotkeyMap[orb].key}}</span>
        </td>
      </tr>
      </tbody>

    <!--  <div class="cell">
        <img src="../assets/images/spells/ghost_walk.png">
        <span class="spellName">幽灵漫步 - </span>
        <span class="hotkey hotkey1">Q</span>
        <span class="hotkey hotkey1">Q</span>
        <span class="hotkey hotkey2">W</span>
      </div>
      <div class="cell">
        <img src="../assets/images/spells/ice_wall.png">
        <span class="spellName">寒冰之墙 - </span>
        <span class="hotkey hotkey1">Q</span>
        <span class="hotkey hotkey1">Q</span>
        <span class="hotkey hotkey3">E</span>
      </div>

      <div class="cell">
        <img src="../assets/images/spells/emp.png">
        <span class="spellName">电磁脉冲 - </span>
        <span class="hotkey hotkey2">W</span>
        <span class="hotkey hotkey2">W</span>
        <span class="hotkey hotkey2">W</span>
      </div>

      <div class="cell">
        <img src="../assets/images/spells/tornado.png">
        <span class="spellName">强袭飓风 - </span>
        <span class="hotkey hotkey2">W</span>
        <span class="hotkey hotkey2">W</span>
        <span class="hotkey hotkey1">Q</span>
      </div>

      <div class="cell">
        <img src="../assets/images/spells/alacrity.png">
        <span class="spellName">灵动迅捷 - </span>
        <span class="hotkey hotkey2">W</span>
        <span class="hotkey hotkey2">W</span>
        <span class="hotkey hotkey3">E</span>
      </div>

      <div class="cell">
        <img src="../assets/images/spells/sun_strike.png">
        <span class="spellName">阳炎冲击 - </span>
        <span class="hotkey hotkey3">E</span>
        <span class="hotkey hotkey3">E</span>
        <span class="hotkey hotkey3">E</span>
      </div>

      <div class="cell">
        <img src="../assets/images/spells/forge_spirit.png">
        <span class="spellName">熔炉精灵 - </span>
        <span class="hotkey hotkey3">E</span>
        <span class="hotkey hotkey3">E</span>
        <span class="hotkey hotkey1">Q</span>
      </div>
      <div class="cell">
        <img src="../assets/images/spells/chaos_meteor.png">
        <span class="spellName">混沌陨石 - </span>
        <span class="hotkey hotkey3">E</span>
        <span class="hotkey hotkey3">E</span>
        <span class="hotkey hotkey2">W</span>
      </div>
      <div class="cell">
        <img src="../assets/images/spells/deafening_blast.png">
        <span class="spellName">超震声波 - </span>
        <span class="hotkey hotkey1">Q</span>
        <span class="hotkey hotkey2">W</span>
        <span class="hotkey hotkey3">E</span>
      </div>-->
    </table>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: "Instruction",
    computed:{
      ...mapState(['skillsMap','hotkeyMap','language'])
    }
  };
</script>

<style lang="less" scoped>
  .instruction {
    flex: none;
    display: inline-block;
    height: 600px;
    width: 195px;
    border: 4px solid #808080;
    border-radius: 5px;
    line-height: 35px;
    background-color: black;
    user-select: none;
    font-size: 16px;
    h2{
      text-indent: 3px;
      margin-bottom: 5px;
      font-size: 21px;
    }
    .cell {
      /*display: flex;
      align-items: center;*/
      display: flex;
      height: 35px;
      align-items: center;
      .hotkey{
        letter-spacing: 5px;
      }
      span {
        font-family: "Consolas";
        &.en{
          font-size: 14px;
          letter-spacing: 0
        }

      }
      td{
        display: flex;
        align-items: center;
        height: 100%;
        letter-spacing: 1px;

        &:first-child{
          margin-right: 4px;
        }
        .icon{
          display: inline-block;
          width: 20px;
          height: 20px;
          background-size: 100% 100%;
          background-position: center center;
        }
        .jslq{
          background-image: url(../assets/images/spells/jslq.png);
        }
        .ylmb{
          background-image: url(../assets/images/spells/ylmb.png);
        }
        .hbzq{
          background-image: url(../assets/images/spells/hbzq.png);
        }
        .dcmc{
          background-image: url(../assets/images/spells/dcmc.png);
        }
        .qxjf{
          background-image: url(../assets/images/spells/qxjf.png);
        }
        .ldxj{
          background-image: url(../assets/images/spells/ldxj.png);
        }
        .yycj{
          background-image: url(../assets/images/spells/yycj.png);
        }
        .rljl{
          background-image: url(../assets/images/spells/rljl.png);
        }
        .hdys{
          background-image: url(../assets/images/spells/hdys.png);
        }
        .czsb{
          background-image: url(../assets/images/spells/czsb.png);
        }
      }
      .quash {
        color: #72C3FC;
      }
      .wex {
        color: #CE72FC;
      }
      .exort {
        color: #E92121;
      }
    }
  }
</style>

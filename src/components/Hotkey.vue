<template>
  <div class="hotkey-box" @keydown="keydownHandler($event)">
    <h2>控制面板</h2>
    <h3>技能键位</h3>
    <table >
      <tbody>
      <tr
          :class="{active:hotkeyToBeChanged === key}"
          v-for="(value, key) in hotkeyMap"
          @click="activateHotkeyChange(key)"
          :key="value.key"
          v-if="(isTraditional && modernKeys.indexOf(key) === -1) || (!isTraditional && traditionalKeys.indexOf(key) === -1)"
      >
        <td class="controlbox-hotkey">{{value.key}}</td>
        <td>-</td>
        <td>{{value.text.zh}}</td>
      </tr>
      </tbody>
    </table>
    <input type="checkbox" id="legacyCheckbox" :value="isTraditional" @input="switchIsTraditional">
    <label for="legacyCheckbox">使用传统键位</label><br/>
    <button type="button" id="reset" @click="resetHotkeys">恢复默认</button>
    <br/>
    <input type="checkbox" id="musicCheckbox" checked="checked">
    <label for="musicCheckbox">音乐</label>
    <input type="checkbox" id="soundCheckbox" checked="checked">
    <label for="soundCheckbox">音效</label><br/>
  </div>
</template>

<script>
  import {mapState,mapMutations} from "vuex"
  export default {
    name: "Hotkey",
    data() {
      return {
        traditionalKeys:['jslq','ylmb','hbzq','dcmc','qxjf','ldxj','yycj','rljl','hdys','czsb'],
        modernKeys:['skill1','skill2'],

      }
    },
    computed:{
      ...mapState(['hotkeyMap','isTraditional','hotkeyToBeChanged','isHotkeyWaitingChange']),

    },
    methods:{
      ...mapMutations(['switchIsTraditional','activateHotkeyChange','resetHotkeys']),
    },
    created() {

    }
  }
</script>

<style lang="less" scoped>
  @keyframes flash {
    0%{
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
  .hotkey-box{
    flex: none;
    display: inline-block;
    width: 165px;
    border: 4px solid #808080;
    border-radius: 5px;
    line-height: 30px;
    background-color: black;
    h2{
      text-indent: 3px;
      border-bottom: solid 3px #808080;
    }
    h3{
      text-indent: 5px;
    }
    table{
      user-select: none;
      width: 100%;
      box-sizing: border-box;
      font-size: 16px;
      padding-left: 10px;
      margin-top: 0px;
      margin-bottom: 10px;
      line-height: 30px;
      border-collapse: collapse;
      tr{
        cursor: pointer;
        &:hover{
          background-color: rgba(255,255,255,0.2);
        }
        td:first-child{
          text-align: center;
          color: #F8E89A;
          min-width: 15px;
        }
        &.active{
          .controlbox-hotkey{
            animation: flash 0.2s linear infinite alternate;
          }
        }
      }
    }
    label{
      cursor: pointer;
    }
    #legacyCheckbox {
      margin-left: 5px;
    }
    #reset {
      margin-left: 5px;
      margin-bottom: 10px;
    }
    #musicCheckbox, #soundCheckbox {
      margin-left: 10px;
      vertical-align: middle;
    }
  }


</style>
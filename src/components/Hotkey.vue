<template>
  <div class="hotkey-box" @keydown="keydownHandler($event)">
    <h2>{{language === 'zh-CN'?'控制面板':'Control Panel'}}</h2>
    <h3>{{language === 'zh-CN'?'技能键位(点击修改)':'HotKeys(Click to change)'}}</h3>
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
        <td>{{language === 'zh-CN'?value.text.zh:value.text.en}}</td>
      </tr>
      </tbody>
    </table>
    <input type="checkbox" id="legacyCheckbox" :checked="isTraditional" @input="switchIsTraditional">
    <label for="legacyCheckbox">{{language === 'zh-CN'?'使用传统键位':'Use classic hotkeys'}}</label><br/>
    <button type="button" id="reset" @click="resetHotkeys">{{language === 'zh-CN'?'恢复默认':'Restore default'}}</button>
    <br/>
    <input type="checkbox" id="musicCheckbox" :checked="isMusicActive" @input="switchIsMusicActive">
    <label for="musicCheckbox">{{language === 'zh-CN'?'音乐':'Music'}}</label>
    <input type="checkbox" id="soundCheckbox" :checked="isSoundActive" @input="switchIsSoundActive">
    <label for="soundCheckbox">{{language === 'zh-CN'?'音效':'Sound'}}</label><br/>
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
      ...mapState(['hotkeyMap','isTraditional','hotkeyToBeChanged','isHotkeyWaitingChange','language','isMusicActive','isSoundActive']),

    },
    methods:{
      ...mapMutations(['switchIsTraditional','activateHotkeyChange','resetHotkeys','switchIsMusicActive','switchIsSoundActive']),
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
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameStatus:0, //0-未开始 1-正在进行 2-已结束
    isHotkeyWaitingChange:false,
    hotkeyToBeChanged:'',
    isTraditional:false,
    defaultHotkeyMap:{      //热键表
      "quash": {
        key:"Q",
        text:{
          zh:'冰',
          en:'quash'
        },
      },
      "wex": {
        key:"W",
        text:{
          zh:'雷',
          en:'Wex'
        },
      },
      "exort": {
        key:"E",
        text:{
          zh:'火',
          en:'Exort'
        },
      },
      "invoke": {
        key:"R",
        text:{
          zh:'元素祈唤',
          en:'Invoke'
        },
      },
      "skill1": {
        key:"D",
        text:{
          zh:'技能1',
          en:'Skill-1'
        },
      },
      "skill2": {
        key:"F",
        text:{
          zh:'技能2',
          en:'Skill-2'
        },
      },
      "jslq": {
        key:"Y",
        text:{
          zh:'急速冷却',
          en:'Cold-Snap'
        },
      },
      "ylmb": {
        key:"V",
        text:{
          zh:'幽灵漫步',
          en:'Ghost-Walk'
        },
      },
      "hbzq": {
        key:"G",
        text:{
          zh:'寒冰之墙',
          en:'Ice-Wall'
        },
      },
      "dcmc": {
        key:"C",
        text:{
          zh:'电磁脉冲',
          en:'EMP'
        },
      },
      "qxjf": {
        key:"X",
        text:{
          zh:'强袭飓风',
          en:'Tornado'
        },
      },
      "ldxj": {
        key:"Z",
        text:{
          zh:'灵动迅捷',
          en:'Alacrity'
        },
      },
      "yycj": {
        key:"T",
        text:{
          zh:'阳炎冲击',
          en:'Sun-Strike'
        },
      },
      "rljl": {
        key:"F",
        text:{
          zh:'熔炉精灵',
          en:'Forge-Spirit'
        },
      },
      "hdys": {
        key:"D",
        text:{
          zh:'混沌陨石',
          en:'Chaos-Meteor'
        },
      },
      "czsb": {
        key:"B",
        text:{
          zh:'超震声波',
          en:'Deafening-Blast'
        },
      },
    },
    hotkeyMap:{      //热键表
      "quash": {
        key:"Q",
        text:{
          zh:'冰',
          en:'quash'
        },
      },
      "wex": {
        key:"W",
        text:{
          zh:'雷',
          en:'Wex'
        },
      },
      "exort": {
        key:"E",
        text:{
          zh:'火',
          en:'Exort'
        },
      },
      "invoke": {
        key:"R",
        text:{
          zh:'元素祈唤',
          en:'Invoke'
        },
      },
      "skill1": {
        key:"D",
        text:{
          zh:'技能1',
          en:'Skill-1'
        },
      },
      "skill2": {
        key:"F",
        text:{
          zh:'技能2',
          en:'Skill-2'
        },
      },
      "jslq": {
        key:"Y",
        text:{
          zh:'急速冷却',
          en:'Cold-Snap'
        },
      },
      "ylmb": {
        key:"V",
        text:{
          zh:'幽灵漫步',
          en:'Ghost-Walk'
        },
      },
      "hbzq": {
        key:"G",
        text:{
          zh:'寒冰之墙',
          en:'Ice-Wall'
        },
      },
      "dcmc": {
        key:"C",
        text:{
          zh:'电磁脉冲',
          en:'EMP'
        },
      },
      "qxjf": {
        key:"X",
        text:{
          zh:'强袭飓风',
          en:'Tornado'
        },
      },
      "ldxj": {
        key:"Z",
        text:{
          zh:'灵动迅捷',
          en:'Alacrity'
        },
      },
      "yycj": {
        key:"T",
        text:{
          zh:'阳炎冲击',
          en:'Sun-Strike'
        },
      },
      "rljl": {
        key:"F",
        text:{
          zh:'熔炉精灵',
          en:'Forge-Spirit'
        },
      },
      "hdys": {
        key:"D",
        text:{
          zh:'混沌陨石',
          en:'Chaos-Meteor'
        },
      },
      "czsb": {
        key:"B",
        text:{
          zh:'超震声波',
          en:'Deafening-Blast'
        },
      },
    },
    skillsMap:{
      "jslq": {
        orbs:['quash','quash','quash'],
        text:{
          zh:'急速冷却',
          en:'Cold-Snap'
        },
      },
      "ylmb": {
        orbs:['quash','quash','wex'],
        text:{
          zh:'幽灵漫步',
          en:'Ghost-Walk'
        },
      },
      "hbzq": {
        orbs:['quash','quash','exort'],
        text:{
          zh:'寒冰之墙',
          en:'Ice-Wall'
        },
      },
      "dcmc": {
        orbs:['wex','wex','wex'],
        text:{
          zh:'电磁脉冲',
          en:'EMP'
        },
      },
      "qxjf": {
        orbs:['wex','wex','quash'],
        text:{
          zh:'强袭飓风',
          en:'Tornado'
        },
      },
      "ldxj": {
        orbs:['wex','wex','exort'],
        text:{
          zh:'灵动迅捷',
          en:'Alacrity'
        },
      },
      "yycj": {
        orbs:['exort','exort','exort'],
        text:{
          zh:'阳炎冲击',
          en:'Sun-Strike'
        },
      },
      "rljl": {
        orbs:['exort','exort','quash'],
        text:{
          zh:'熔炉精灵',
          en:'Forge-Spirit'
        },
      },
      "hdys": {
        orbs:['exort','exort','wex'],
        text:{
          zh:'混沌陨石',
          en:'Chaos-Meteor'
        },
      },
      "czsb": {
        orbs:['quash','wex','exort'],
        text:{
          zh:'超震声波',
          en:'Deafening-Blast'
        },
      },
    },
  },
  getters:{
    answersMap:(state)=> {
      let result = {}
      Object.keys(state.skillsMap).forEach((skillKey)=>{
        let quash = 0 ,wex = 0,exort = 0
        state.skillsMap[skillKey].orbs.forEach(orb =>{
          switch (orb) {
            case 'quash':quash++;
            break;
            case 'wex':wex++;
              break;
            case 'exort':exort++;
              break;
          }
        })
        result[`s${quash}${wex}${exort}`] = skillKey

      })
      return result
    },
  },
  mutations: {
    keyBoardHandler(state,event) {
      if(state.isHotkeyWaitingChange){
        let hotkeyToBeChanged = state.hotkeyToBeChanged
        let temp = state.hotkeyMap[hotkeyToBeChanged].key
        let keyPressed = event.key.toUpperCase()
        state.hotkeyMap[hotkeyToBeChanged].key = keyPressed
        //改的键有冲突则交换两个快捷键
        Object.keys(state.hotkeyMap).forEach(hotkey =>{
          if(state.hotkeyMap[hotkey].key === keyPressed && hotkey !== hotkeyToBeChanged){
            state.hotkeyMap[hotkey].key = temp
          }
        })
        state.isHotkeyWaitingChange = false
        state.hotkeyToBeChanged = ''
      }

    },
    changeGameStatus(state, status) {
      state.gameStatus = status
    },
    activateHotkeyChange(state,key) {
      if(state.hotkeyToBeChanged === key){
        state.isHotkeyWaitingChange = false
        state.hotkeyToBeChanged = ''
      }else {
        state.isHotkeyWaitingChange = true
        state.hotkeyToBeChanged = key
      }
    },
    closeHotkeyChange(state) {

    },
    switchIsTraditional(state) {
      state.isTraditional = !state.isTraditional
    },
    resetHotkeys(state) {
      state.hotkeyMap = state.defaultHotkeyMap
    }
  },
  actions: {},

});

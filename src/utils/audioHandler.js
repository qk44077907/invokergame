function playAudio(selector, volume) {
  let sound = document.querySelector(selector);
  if(!sound){
    return
  }
  sound.pause();
  sound.currentTime = 0.0;
  sound.volume = 0.1*(volume || 1);
  sound.play()
}
function stopAudio(selector) {
  let sound = document.querySelector(selector);
  if(!sound){
    return
  }
  sound.pause();
  sound.currentTime = 0.0;
}
export {playAudio, stopAudio}
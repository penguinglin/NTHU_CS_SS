var mySwitch;
var myBulb;
window.onload = function () {
  mySwitch = document.getElementById('switch');
  myBulb = document.getElementById('bulb');
};
function switchLight() {
  if (mySwitch.checked)
    myBulb.src = 'src/img/bulb_on.png';
  else
    myBulb.src = 'src/img/bulb_off.png';
}
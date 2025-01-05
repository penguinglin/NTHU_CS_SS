var mySwitch;
var myBulb;

// an event listener for the switch
window.onload = function () {
  // get the HTML ID: switch and the bulb
  mySwitch = document.getElementById('switch');
  myBulb = document.getElementById('bulb');
};

// function to switch the light on and off
function switchLight() {
  // check if the switch is on or off
  if (mySwitch.checked)
    myBulb.src = 'src/img/bulb_on.png';
  else
    myBulb.src = 'src/img/bulb_off.png';
}
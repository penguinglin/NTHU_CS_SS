import Menu from "./Menu";
declare const firebase: any;
import GlobalData from "./GlobalData"

const { ccclass, property } = cc._decorator;

// In-memory user data storage (for demonstration purposes)
const userData = {
  email: null,
  password: null
};



@ccclass
export default class Sign extends cc.Component {
  @property({ type: cc.AudioClip })
  click: cc.AudioClip = null;

  // private effect_value: number = Menu.EffectVolume * 10;

  start() {
    // Get the ESC_BT button and add the click event listener
    const escButton = cc.find("ESC_BT", this.node);
    if (escButton) {
      escButton.on('click', this.onEscButtonClick, this);
    }

    const submitButton = cc.find("Submit", this.node);
    if (submitButton) {
      submitButton.on('click', this.onSubmitButtonClick, this);
    }
  }

  onEscButtonClick() {
    // Remove this node from its parent, effectively closing the prefab
    let effect_value = Menu.EffectVolume * 10;
    cc.audioEngine.play(this.click, false, effect_value);
    this.scheduleOnce(() => {
      cc.tween(this.node)
        .to(0.2, { scale: 0 }, { easing: 'backIn' })
        .call(() => {
          // Destroy the node after animation
          this.node.destroy();
        })
        .start();
    }, 0.2);

  }

  onSubmitButtonClick() {

    // Determine if this is a sign-up or sign-in based on the presence of certain input fields
    const emailInput = cc.find("Email_input", this.node).getComponent(cc.EditBox).string.trim();
    const passwordInput = cc.find("Password_input", this.node).getComponent(cc.EditBox).string.trim();

    console.log(emailInput, passwordInput);

    if (emailInput === "" || passwordInput === "") {
      cc.log("Please enter both email and password!");
      alert("Please enter both email and password!");
      return;
    }

    const confirmPasswordInputNode = cc.find("Password_check", this.node);
    if (confirmPasswordInputNode) {
      // This is a sign-up process
      const confirmPasswordInput = confirmPasswordInputNode.getComponent(cc.EditBox).string.trim();
      this.handleSignUp(emailInput, passwordInput, confirmPasswordInput);
    } else {
      // This is a sign-in process
      this.handleSignIn(emailInput, passwordInput);
    }
  }

  handleSignUp(email: string, password: string, confirmPassword: string) {
    var Auth = firebase.auth;
    if (email === "" || password === "" || confirmPassword === "") {
      cc.log("Please enter email, password, and confirm your password!");
      alert("Please enter email, password, and confirm your password!");
      return;
    }
    if (!email.includes('@')) {
      cc.log("Invalid email format! Email must contain '@'.");
      alert("Invalid email format! Email must contain '@'.");
      return;
    }
    if (password !== confirmPassword) {
      // Show password mismatch warning
      cc.log("Passwords do not match!");
      alert("Passwords do not match!");
    } 
    else { 
      Auth().createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
          // Sign up successful
          const user = userCredential.user;
          console.log("Sign up successful:");
          // Save user email as username to Realtime Database
          const userId = user.uid;
          firebase.database().ref('users/' + userId+"/username/").set({
            username: email,
          }).then(() => {
            cc.log("User signed up successfully!");
            alert("User signed up successfully!");
            console.log("User email saved to database as username.");
            // Optionally, you can navigate to a different scene
            let effect_value = Menu.EffectVolume * 10;
            cc.audioEngine.play(this.click, false, effect_value);
            this.scheduleOnce(() => {
              GlobalData.sigin = true;
              cc.audioEngine.stopAll();
              cc.director.loadScene("Menu");
            }, 0.2);
          }).catch(error => {
              console.error("Failed to save email to database:", error);
          });
          firebase.database().ref('users/' + userId+"/time/").set({
              time: 0,
          }).then(() => {
              console.log("User email saved to database as username.");
              cc.log("User signed up successfully!");
              //alert("User signed up successfully!");
              // Optionally, you can navigate to a different scene
              let effect_value = Menu.EffectVolume * 10;
              cc.audioEngine.play(this.click, false, effect_value);
              this.scheduleOnce(() => {
                cc.audioEngine.stopAll();
                cc.director.loadScene("Menu");
              }, 0.2);
          }).catch(error => {
              console.error("Failed to save email to database:", error);
          });
      })
      .catch((error) => {
          alert("email address has been used");
          console.error("Sign up failed:", error);
      });
    }
  }

  handleSignIn(email: string, password: string) {
    var Auth = firebase.auth;
    Auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        cc.log("Login successful!");
        alert("Login successful!");
        console.log("Login successful:");
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.click, false, effect_value);
        this.scheduleOnce(() => {
          GlobalData.sigin = true;
          cc.audioEngine.stopAll();
          cc.director.loadScene("Menu");
        }, 0.2);
      })
      .catch((error) => {
        alert("Invalid email or password!");
        console.error("Login failed:", error);
    });
  }
}
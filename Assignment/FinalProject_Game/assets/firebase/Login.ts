declare const firebase: any;


const { ccclass, property } = cc._decorator;

@ccclass
export default class Login extends cc.Component {
    @property(cc.EditBox)
    emailInput: cc.EditBox = null;

    @property(cc.EditBox)
    passwordInput: cc.EditBox = null;

    // @property(cc.Label)
    // messageLabel: cc.Label = null;

    start() {
        
        // const signInButton = this.node.getChildByName("SignInButton").getComponent(cc.Button);
        // const signUpButton = this.node.getChildByName("SignUpButton").getComponent(cc.Button);

        let signInHandler = new cc.Component.EventHandler();
        signInHandler.target = this.node;
        signInHandler.component = "Login";
        signInHandler.handler = "onSignInButtonClicked";

        // signInButton.clickEvents.push(signInHandler);

        let signUpHandler = new cc.Component.EventHandler();
        signUpHandler.target = this.node;
        signUpHandler.component = "Login";
        signUpHandler.handler = "onSignUpButtonClicked";

        try{
            cc.find("Canvas/bg/SignInButton").getComponent(cc.Button).clickEvents.push(signInHandler);
            cc.find("Canvas/bg/SignUpButton").getComponent(cc.Button).clickEvents.push(signUpHandler);
        }
        catch{
            console.log("error")
        }

        // signUpButton.clickEvents.push(signUpHandler);
    }

    onSignInButtonClicked() {
        // cc.director.loadScene("stage");
        var email = this.emailInput.string;
        var password = this.passwordInput.string;

        var Auth = firebase.auth;

        Auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            
            console.log("Login successful:");

            cc.director.loadScene("stage");
        })
        .catch((error) => {
            
            console.error("Login failed:", error);
        });
    }

    onSignUpButtonClicked() {
        // cc.director.loadScene("stage");
        var email = this.emailInput.string;
        var password = this.passwordInput.string;

        var Auth = firebase.auth;

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
                console.log("User email saved to database as username.");
                cc.director.loadScene("stage");
            }).catch(error => {
                console.error("Failed to save email to database:", error);
            });
            firebase.database().ref('users/' + userId+"/score/").set({
                score: 0
            }).then(() => {
                console.log("User email saved to database as username.");
                cc.director.loadScene("stage");
            }).catch(error => {
                console.error("Failed to save email to database:", error);
            });
        })
        .catch((error) => {
            
            console.error("Sign up failed:", error);
        });
    }
}
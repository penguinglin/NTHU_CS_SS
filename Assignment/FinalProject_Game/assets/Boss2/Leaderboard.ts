const { ccclass, property } = cc._decorator;

@ccclass
export default class Leaderboard extends cc.Component {
    @property(cc.Label)
    leaderboardLabel: cc.Label = null;

    start() {
        this.displayTopThree();
    }

    displayTopThree() {
        firebase.database().ref('leaderboard').orderByKey().limitToLast(3).once('value')
            .then(snapshot => {
                const leaderboard = [];
                snapshot.forEach(childSnapshot => {
                    const score = parseInt(childSnapshot.key);
                    const email = childSnapshot.val().email;
                    leaderboard.push({ score, email });
                });

                // Sort leaderboard by score in descending order
                leaderboard.sort((a, b) => a.score - b.score);

                // Display the top three scores
                this.leaderboardLabel.string = "\n";
                leaderboard.forEach((entry, index) => {
                    this.leaderboardLabel.string += `${index + 1}. ${entry.email}: ${entry.score}\n\n\n`;
                });
            })
            .catch(error => {
                console.error("Failed to fetch leaderboard data:", error);
            });
    }
}

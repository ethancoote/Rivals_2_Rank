module.exports = {
    runEloEngine: function (resultsArray) {
        let i = 0;
        let j = 0;
        let len = resultsArray.length;
        let exists1 = false;
        let exists2 = false;
        let p2 = {};
        let eloArray = [];
        for(i=0; i<len; i++) {
            
            for(j=0; j<resultsArray[i].length; j++) {
                var p1Id = resultsArray[i][j].win;
                var p2Id = resultsArray[i][j].lose;

                // set player 1
                p1 = eloArray.find(player => player.id === p1Id);
                if (p1 == undefined) {
                    p1 = {id: p1Id, elo: 1000, name: resultsArray[i][j].winName};
                    exists1 = false;
                } else {
                    p1.name = resultsArray[i][j].winName
                    exists1 = true;
                }
                    
                // set player 2
                p2 = eloArray.find(player => player.id === p2Id);
                if (p2 == undefined) {
                    p2 = {id: p2Id, elo: 1000, name: resultsArray[i][j].loseName};
                    exists2 = false;
                } else {
                    p2.name = resultsArray[i][j].loseName;
                    exists2 = true;
                }

                // update elo
                p1Prob = 1/(1+10**((p2.elo-p1.elo)/400));
                p2Prob = 1/(1+10**((p1.elo-p2.elo)/400));

                p1NewElo = p1.elo + (32*(1-p1Prob));
                p2NewElo = p2.elo + (32*(0-p2Prob));

                p1.elo = Math.round(p1NewElo);
                p2.elo = Math.round(p2NewElo);

                // setting player one updates
                if (exists1) {
                    var index = eloArray.findIndex(player => player.id === p1.id);
                    eloArray[index].name = p1.name;
                    eloArray[index].elo = p1.elo;
                } else {
                    eloArray.push(p1);
                }

                // setting player 2 updates
                if (exists2) {
                    var index = eloArray.findIndex(player => player.id === p2.id);
                    eloArray[index].name = p2.name;
                    eloArray[index].elo = p2.elo;
                } else {
                    eloArray.push(p2);
                }
            }
            
            // eloArray.push(`hello ${i}`);
        }
        eloArray.sort(compare);
        return (eloArray);
    } 
}

const compare = (a, b) => {
    if (a.elo > b.elo) {
        return -1;
    }
    if (a.elo < b.elo) {
        return 1;
    }
    return 0;
} 
const EventId = require('./getEventId');
const CompletedMatches = require('./getCompletedMatches');
const TotalSets = require('./getTotalSets');
const CompletedTournaments = require('./getCompletedTournaments');
const EventIdFromTourn = require('./getEventFromTournament');
const EloEngine = require('./eloEngine');
const fs = require('fs');
const sleep = require('./sleep');

/*EventId.getEventId("guelph-rivals-ii-online-week-2", "rivals-of-aether-ii-singles").then(idValue => {
    console.log(idValue);
    TotalSets.getTotalSets(idValue).then(totalSets => {
        console.log(totalSets);
        CompletedMatches.getCompletedMatches(idValue, totalSets).then(results => {
            console.log(results);
        });

    });
});*/
/*
CompletedTournaments.getCompletedTournaments().then(slugArray => {
    //let len = slugArray.length;
    let len = 100;
    let i = 0;
    let resultsArray = [];
    const promises1 = [];
    let tempJSON = {slugArray};
    var temp = JSON.stringify(tempJSON);
    console.log("1");
    fs.writeFile('slugArray.json', temp, 'utf8', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("success0");
        }
    });
    for (i=0; i<len; i++) {
        promises1.push(new Promise(resolve => {
            console.log(slugArray[i]);
            EventIdFromTourn.getEventFromTournament(slugArray[i]).then(eventId => {
                if (eventId != -1) {
                    TotalSets.getTotalSets(eventId).then(totalSets => {
                        CompletedMatches.getCompletedMatches(eventId, totalSets).then(results => {
                            let j = 0;
                            let resLen = results.length;
                            for (j=0; j<resLen; j++) {
                                resultsArray.push(results[i].push);
                                resolve(results);
                            }
                            
                        });
                    });
                }
            });
        }));
    }
    console.log("2");
    Promise.all(promises1).then(resultsArray => {
        console.log("3");
        var data = JSON.parse(fs.readFileSync("slugArray.json", "utf8"))
        resultsArray = [];
        let i = 0;
        let len = 100;
        let count = 1;
        const promises = [];
        for (i=0; i<len; i++) {
            
            promises.push(new Promise(resolve => {
                
                EventIdFromTourn.getEventFromTournament(data.slugArray[i]).then (eventId => {
                    if (eventId != -1) {
                        TotalSets.getTotalSets(eventId).then(totalSets => {
                            CompletedMatches.getCompletedMatches(eventId, totalSets).then(results => {
                                let j = 0;
                                let resLen = results.length;
                                console.log(`${count} of ${len}`);
                                count++;
                                for (j=0; j<resLen; j++) {
                                    
                                    resultsArray.push(results[i].push);
                                    resolve(results);
                                }
                                
                                
                            });
                        });
                    }
                });
            }));
            
        }
        console.log("4");

        Promise.all(promises).then(resultsArray => {
            console.log("5");
            //console.log("--Results Array--")
            //console.log(resultsArray);
            let eloArray = EloEngine.runEloEngine(resultsArray);
            var eloRankJSON = { eloArray };
            var json = JSON.stringify(eloRankJSON);
            fs.writeFile('rank.json', json, 'utf8', (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("success");
                }
            });
            console.log(eloArray);
        });
    });
})*/
    
    

/*
.then(resultsArray => {
    var resultsJSON = {resultsArray};
    var json = JSON.stringify(resultsJSON);
    fs.writeFile('results.json', json, 'utf8', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("success");
        }
    });
    return 0;
*/


//CompletedMatches.getCompletedMatches(1256052);

EventIdFromTourn.getEventFromTournament("tge-friday-s-29").then (eventId => {
    console.log(eventId);
});



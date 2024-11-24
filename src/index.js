const EventId = require('./getEventId');
const CompletedMatches = require('./getCompletedMatches');
const TotalSets = require('./getTotalSets');
const CompletedTournaments = require('./getCompletedTournaments');
const EventIdFromTourn = require('./getEventFromTournament');
const fs = require('fs');

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
    let len = 3;
    let i = 0;
    let resultsArray = [];

    let tempJSON = {slugArray};
    var temp = JSON.stringify(tempJSON);
    var fsTemp = require('fs');
    fsTemp.writeFile('slugArray.json', temp, 'utf8', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("success0");
        }
    });
    for (i=0; i<len; i++) {
        TotalSets.getTotalSets(slugArray[i]).then(totalSets => {
            CompletedMatches.getCompletedMatches(slugArray[i], totalSets).then(results => {
                let j = 0;
                let resLen = results.length;
                for (j=0; j<resLen; j++) {
                    resultsArray.push(results[i].push);
                }
                
            })
        })
    }
    return resultsArray;
}).then(resultsArray => {
    var resultsJSON = {resultsArray};
    var json = JSON.stringify(resultsJSON);
    var fs = require('fs');
    fs.writeFile('results.json', json, 'utf8', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("success");
        }
    });
});*/


var data = JSON.parse(fs.readFileSync("slugArray.json", "utf8"))
let resultsArray = [];
let i = 0;
let len = 3;
const promises = [];
for (i=0; i<len; i++) {
    promises.push(new Promise(resolve => {
        EventIdFromTourn.getEventFromTournament(data.slugArray[i]).then (eventId => {
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

Promise.all(promises).then(resultsArray => {
    console.log("--Results Array--")
    console.log(resultsArray);
});


//CompletedMatches.getCompletedMatches(1256052);



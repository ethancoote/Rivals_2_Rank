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






/*
console.log("3");
var data = JSON.parse(fs.readFileSync("slugArray.json", "utf8"));
resultsArray = [];
let i = 0;
let len = 100;
let count = 0;
const promises = [];
for (i=0; i<len; i++) {
    sleep.sleep(2000);
    promises.push(new Promise(resolve => {
        EventIdFromTourn.getEventFromTournament(data.slugArray[i]).then (eventId => {
            let obj = new Object();
            obj.slug = data.slugArray[count];
            obj.event = eventId;
            //resultsArray.push(obj);
            count++;
            resolve(obj);
        }); 
    }));
}

Promise.all(promises).then(resultsArray => {
    var resultsJSON = { resultsArray };
    var json = JSON.stringify(resultsJSON);
    fs.writeFile('events.json', json, 'utf8', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("success");
        }
    });
});*/

/*
console.log("3");
var data = JSON.parse(fs.readFileSync("events.json", "utf8"));
//resultsArray = [];
let i = 0;
let len = data.resultsArray.length;
let count = 0;
const promises = [];
for (i=0; i<len; i++) {
    if (data.resultsArray[i].event != -1) {
        sleep.sleep(2000);
        promises.push(new Promise(resolve => {
            TotalSets.getTotalSets(data.resultsArray[i].event).then (totalSets => {
                let obj = new Object();
                obj.slug = data.resultsArray[count].slug;
                obj.event = data.resultsArray[count].event;
                obj.total = totalSets;
                count++;
                //resultsArray.push(obj);
                resolve(obj);
            }); 
        }));
    }
    
}

Promise.all(promises).then(resultsArray => {
    var resultsJSON = { resultsArray };
    var json = JSON.stringify(resultsJSON);
    fs.writeFile('total.json', json, 'utf8', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("success");
        }
    });
});*/


var data = JSON.parse(fs.readFileSync("total.json", "utf8"));
//resultsArray = [];
let i = 0;
//let len = data.resultsArray.length;
let len = 1;
let count = 0;
const promises = [];
for (i=0; i<len; i++) {
    //sleep.sleep(1000);
    promises.push(new Promise(resolve => {
        CompletedMatches.getCompletedMatches(data.resultsArray[i].event, data.resultsArray[i].total).then (completedMatches => {
            //resultsArray.push(obj);
            console.log(completedMatches);
            resolve(completedMatches);
        }); 
    }));
    
    
}

Promise.all(promises).then(resultsArray => {
    var resultsJSON = { resultsArray };
    var json = JSON.stringify(resultsJSON);
    fs.writeFile('results.json', json, 'utf8', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("success");
        }
    });
});







/*
for (i=0; i<len; i++) {
    
    promises.push(new Promise(resolve => {
        
        EventIdFromTourn.getEventFromTournament(data.slugArray[i]).then (eventId => {
            if (eventId != -1) {
                console.log(`gotEventFromTourn: ${eventId}`);
                sleep.sleep(1000);
                TotalSets.getTotalSets(eventId).then(totalSets => {
                    //console.log(totalSets);
                    console.log(`gotTotalSets: ${totalSets}`);
                    sleep.sleep(1000);
                    if (totalSets > 0) {
                        CompletedMatches.getCompletedMatches(eventId, totalSets).then(results => {
                            let j = 0;
                            let resLen = results.length;
                            console.log(`${count} of ${len}`);
                            count++;
                            for (j=0; j<resLen; j++) {
                                
                                resultsArray.push(results[j].push);
                                resolve(results);
                            }
                        });
                    } else {
                        console.log("no, here");
                        resolve(totalSets);
                    }
                    
                });
            } else {
                console.log("here");
                resolve(eventId);
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
});*/
/*EventIdFromTourn.getEventFromTournament("tge-friday-s-29").then (eventId => {
    console.log(eventId);
});*/

/*
var data = JSON.parse(fs.readFileSync("results.json", "utf8"));
let eloArray = EloEngine.runEloEngine(data.resultsArray);
var eloRankJSON = { eloArray };
var json = JSON.stringify(eloRankJSON);
fs.writeFile('rank.json', json, 'utf8', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("success");
    }
});
console.log(eloArray);*/


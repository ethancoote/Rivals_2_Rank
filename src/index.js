const EventId = require('./getEventId');
const CompletedMatches = require('./getCompletedMatches');
const TotalSets = require('./getTotalSets');
const CompletedTournaments = require('./getCompletedTournaments');

/*EventId.getEventId("don-t-park-on-the-grass-2024", "rivals-of-aether-ii-singles").then(idValue => {
    console.log(idValue);
    TotalSets.getTotalSets(idValue).then(totalSets => {
        console.log(totalSets);
        CompletedMatches.getCompletedMatches(idValue, totalSets).then(results => {
            console.log(results);
        });

    });
});*/

CompletedTournaments.getCompletedTournaments();
//CompletedMatches.getCompletedMatches(1256052);



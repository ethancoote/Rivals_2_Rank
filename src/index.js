const EventId = require('./getEventId');
const CompletedMatches = require('./getCompletedMatches');
const TotalSets = require('./getTotalSets');

EventId.getEventId("guelph-rivals-ii-online-week-2", "rivals-of-aether-ii-singles").then(idValue => {
    console.log(idValue);
    TotalSets.getTotalSets(idValue).then(totalSets => {
        console.log(totalSets);
        CompletedMatches.getCompletedMatches(idValue, totalSets);

    });
});
//CompletedMatches.getCompletedMatches(1256052);



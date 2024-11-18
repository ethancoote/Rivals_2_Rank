const EventId = require('./getEventId');
const CompletedMatches = require('./getCompletedMatches');
const TotalSets = require('./getTotalSets');

EventId.getEventId("don-t-park-on-the-grass-2024", "rivals-of-aether-ii-singles").then(idValue => {
    console.log(idValue);
    TotalSets.getTotalSets(idValue);
});
//CompletedMatches.getCompletedMatches(1256052);



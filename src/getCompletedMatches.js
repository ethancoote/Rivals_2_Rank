require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const startggURL = "https://api.start.gg/gql/alpha";
const startggToken = process.env.STARTGG_TOKEN;
const sleep = require('./sleep');

// get completed matches from the event Id
module.exports = {
    getCompletedMatches: async function (eventId, totalSets) {
        let setsFound = 0;
        let pageNum = 1;
        let perPageNum = 50;
        while (setsFound < totalSets) {
            if ((totalSets - setsFound) < 50) {
                perPageNum = totalSets - setsFound;
            } else {
                perPageNum = 50;
            }
            await fetch(startggURL, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: 'Bearer ' + startggToken
                },
                body: JSON.stringify({
                    query: `query EventSets($eventId: ID!, $page: Int!, $perPage: Int!) 
                            { event(id: $eventId) {sets(page: $page perPage: $perPage sortType: STANDARD) 
                            {pageInfo {total} nodes {id slots { entrant { id name } standing { placement stats { score { value }}}}}}}}`,
                    variables: {
                        eventId: eventId,
                        page: pageNum,
                        perPage: perPageNum
                    },
                })
            }).then(r => r.json())
            .then(data => {
                //console.log(data.data);
                //console.log(data.data.event.sets.nodes);
                try {
                    console.log(data.data.event.sets.nodes[setsFound].slots[0].entrant);
                    console.log(data.data.event.sets.nodes[setsFound].slots[0].standing.stats.score.value);
                    console.log(data.data.event.sets.nodes[setsFound].slots[1].entrant);
                    console.log(data.data.event.sets.nodes[setsFound].slots[1].standing.stats.score.value);
                    setsFound += 1;
                } catch (err) {
                    console.log(`Error set # ${setsFound}`);
                    console.log(err);
                    setsFound += 1;
                }
                
                sleep.sleep(1000);
                //console.log(data.data.event.sets.nodes[1].slots);
            })
        }       
        
    }
}
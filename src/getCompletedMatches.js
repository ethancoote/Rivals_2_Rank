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
        let resultObjArray = []; 
        while (setsFound < totalSets ) {
            if ((totalSets - setsFound) < 50) {
                perPageNum = totalSets - setsFound + 1;
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
                let i = 1;
                while (i < perPageNum) {
                    try {
                        const match = new Object();

                        // check who wins and loses the match
                        if (data.data.event.sets.nodes[i-1].slots[0].standing.stats.score.value == -1 || data.data.event.sets.nodes[i-1].slots[1].standing.stats.score.value == -1) {
                            //console.log("DQ");
                        } else if (data.data.event.sets.nodes[i-1].slots[0].standing.stats.score.value > data.data.event.sets.nodes[i-1].slots[1].standing.stats.score.value) {
                            match.win = data.data.event.sets.nodes[i-1].slots[0].entrant.id;
                            match.winName = data.data.event.sets.nodes[i-1].slots[0].entrant.name;
                            match.lose = data.data.event.sets.nodes[i-1].slots[1].entrant.id;
                            match.loseName = data.data.event.sets.nodes[i-1].slots[1].entrant.name;
                            resultObjArray.push(match);
                        } else {
                            match.win = data.data.event.sets.nodes[i-1].slots[1].entrant.id;
                            match.winName = data.data.event.sets.nodes[i-1].slots[1].entrant.name;
                            match.lose = data.data.event.sets.nodes[i-1].slots[0].entrant.id;
                            match.loseName = data.data.event.sets.nodes[i-1].slots[0].entrant.name;
                            resultObjArray.push(match);
                        }
                          
                        setsFound += 1;
                    } catch (err) {
                        console.log(`Error set # ${setsFound}`);
                        console.log(data);
                        console.log(err);
                        setsFound += 1;
                    }
                    i++;
                }
                sleep.sleep(1000);
            })
            pageNum++;
        }       
        return resultObjArray;
    }
}
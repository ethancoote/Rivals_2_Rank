require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const startggURL = "https://api.start.gg/gql/alpha";
const startggToken = process.env.STARTGG_TOKEN;

// get completed matches from the event Id
module.exports = {
    getCompletedMatches: function (eventId) {
        fetch(startggURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + startggToken
            },
            body: JSON.stringify({
                query: "query EventSets($eventId: ID!, $page: Int!, $perPage: Int!) { event(id: $eventId) {sets(page: $page perPage: $perPage sortType: STANDARD) {pageInfo {total} nodes {id slots {entrant {name}}}}}}",
                variables: {
                    eventId: eventId,
                    page: 1,
                    perPage: 5
                },
            })
        }).then(r => r.json())
        .then(data => {
            console.log(data.data);
            console.log(data.data.event.sets.nodes[0]);
        })
    }
}
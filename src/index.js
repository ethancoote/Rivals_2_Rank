require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const startggURL = "https://api.start.gg/gql/alpha";
const startggToken = process.env.STARTGG_TOKEN;

// get the id from the event slug
const getEventId = (tournamentName, eventName) => {
    const eventSlug = `tournament/${tournamentName}/event/${eventName}`;
    let eventId;
    fetch(startggURL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            Authorization: 'Bearer ' + startggToken
        },
        body: JSON.stringify({
            query: "query EventQuery($slug:String) {event(slug: $slug) {id name}}",
            variables: {
                slug: eventSlug
            },
        })
    }).then(r => r.json())
    .then(data => {
        console.log(data.data);
        eventId = data.data.event.id;
    })
    return eventId;
}

// get completed matches from the event Id
const getCompletedMatches = (eventId) => {
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
getEventId("the-throne-2", "rivals-of-aether-ii-singles");
getCompletedMatches(1256052);
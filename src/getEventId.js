require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const startggURL = "https://api.start.gg/gql/alpha";
const startggToken = process.env.STARTGG_TOKEN;

// get the id from the event slug
module.exports = {
    getEventId: async function (tournamentName, eventName) {
        const eventSlug = `tournament/${tournamentName}/event/${eventName}`;
        let eventId;
        await fetch(startggURL, {
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
            
            eventId = data.data.event.id;
            
        })
        return eventId;
    }
}
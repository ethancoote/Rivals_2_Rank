require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const startggURL = "https://api.start.gg/gql/alpha";
const startggToken = process.env.STARTGG_TOKEN;
const sleep = require('./sleep');

// get completed matches from the event Id
module.exports = {
    getTotalSets: async function (eventId) {
        let totalSets;
        await fetch(startggURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + startggToken
            },
            body: JSON.stringify({
                query: `query EventSets($eventId: ID!, $page: Int!, $perPage: Int!) {
                            event(id: $eventId) {
                                id
                                name
                                sets (
                                    page: $page
                                    perPage: $perPage
                                    sortType: STANDARD
                                ) {
                                    pageInfo {
                                        total
                                    }    
                                }
                            }
                        }
                        `,
                variables: {
                    eventId: eventId,
                    page: 1,
                    perPage: 1
                },
            })
        }).then(r => r.json())
        .then(data => {
            
            try {
                totalSets = data.data.event.sets.pageInfo.total;
            } catch (err) {
                console.log(`getTotalSets ERROR: ${eventId}`);
                console.log(err);
            }
            
        })
        return totalSets
    }
}
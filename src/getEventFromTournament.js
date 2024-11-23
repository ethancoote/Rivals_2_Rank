require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const startggURL = "https://api.start.gg/gql/alpha";
const startggToken = process.env.STARTGG_TOKEN;
//const sleep = require('./sleep');

// get completed matches from the event Id
module.exports = {
    getTotalSets: async function (tournamentSlug) {
        let eventId;
        await fetch(startggURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + startggToken
            },
            body: JSON.stringify({
                query: `query TournamentEvents($tourneySlug: String, $videogameId: [ID]!) {
                            tournament(slug: $tournamentSlug) {
                                events(filter:{videogameId: $videogameId}) {
                                    id
                                    state
                                }
                            }
                        }
                        `,
                variables: {
                    tournamentSlug: tournamentSlug,
                    videogameId: [53945]
                },
            })
        }).then(r => r.json())
        .then(data => {
            try {
                if (data.data.tournament.event[0].state == 3) {
                    eventId = data.data.tournament.event[0].id;
                } else {
                    eventId = -1;
                }
            } catch {
                eventId = -1;
            }
            
            
            //totalSets = data.data.event.sets.pageInfo.total;
        })
        return eventId;
    }
}
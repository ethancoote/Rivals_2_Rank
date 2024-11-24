require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const startggURL = "https://api.start.gg/gql/alpha";
const startggToken = process.env.STARTGG_TOKEN;
//const sleep = require('./sleep');

// get completed matches from the event Id
module.exports = {
    getEventFromTournament: async function (tournamentSlug) {
        let eventId;
        await fetch(startggURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + startggToken
            },
            body: JSON.stringify({
                query: `query TournamentEvents($tournamentSlug: String, $videogameId: [ID]!) {
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
                if (data.data.tournament.events[0].state == 'COMPLETED') {
                    eventId = data.data.tournament.events[0].id;
                } else {
                    eventId = -1;
                    console.log("event not found in tournament");
                }
            } catch (err) {
                console.log(err);
                eventId = -1;
            }
            
            
            //totalSets = data.data.event.sets.pageInfo.total;
        })
        return eventId;
    }
}
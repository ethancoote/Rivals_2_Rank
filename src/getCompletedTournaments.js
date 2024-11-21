require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const startggURL = "https://api.start.gg/gql/alpha";
const startggToken = process.env.STARTGG_TOKEN;

// get the id from the event slug
module.exports = {
    getCompletedTournaments: async function () {
        await fetch(startggURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + startggToken
            },
            body: JSON.stringify({
                query: `query TournamentsByVideogame($perPage: Int!, $videogameId: ID!) {
                            tournaments(query: {
                                perPage: $perPage
                                page: 1
                                sortBy: "startAt asc"
                                filter: {
                                    past: false
                                    videogameIds: [
                                        $videogameId
                                    ]
                                }
                            }) {
                                nodes {
                                    id
                                    name
                                    slug
                                    state
                                }
                            }
                        }
                        `,
                variables: {
                    perPage: 50,
                    videogameId: 53945
                },
            })
        }).then(r => r.json())
        .then(data => {
            console.log(data.data.tournaments.nodes);
            
        })
    }
}
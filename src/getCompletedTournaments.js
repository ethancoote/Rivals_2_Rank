require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const startggURL = "https://api.start.gg/gql/alpha";
const startggToken = process.env.STARTGG_TOKEN;

// get the id from the event slug
module.exports = {
    getCompletedTournaments: async function () {
        let eventId;
        await fetch(startggURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + startggToken
            },
            body: JSON.stringify({
                query: `query VideogameQuery {
                            videogames (query: {filter: {name: "Rivals of Aether II"}, perPage: 5}) {
                                nodes {
                                    id
                                    name
                                    displayName
                                }
                            }
                        }`,
                variables: {
                    
                },
            })
        }).then(r => r.json())
        .then(data => {
            console.log(data.data);
            eventId = data.data;
            
        })
        return eventId;
    }
}
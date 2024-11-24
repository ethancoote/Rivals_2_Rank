require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const startggURL = "https://api.start.gg/gql/alpha";
const startggToken = process.env.STARTGG_TOKEN;
const sleep = require('./sleep');

// get the id from the event slug
module.exports = {
    getCompletedTournaments: async function () {
        let upToDate = false;
        let pageNum = 1;
        let notCompleteCount = 0;
        let tournamentSlugs = [];
        while (!upToDate) {
            await fetch(startggURL, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: 'Bearer ' + startggToken
                },
                body: JSON.stringify({
                    query: `query TournamentsByVideogame($page: Int!, $perPage: Int!, $videogameId: ID!) {
                                tournaments(query: {
                                    page: $page
                                    perPage: $perPage
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
                        page: pageNum,
                        perPage: 50,
                        videogameId: 53945
                    },
                })
            }).then(r => r.json())
            .then(data => {
                let i = 0;
                for(i=0; i<50; i++) {
                    if (data.data.tournaments.nodes[i].state != 3) {
                        console.log("not complete");
                        notCompleteCount++;
                    } else {
                        //console.log(data.data.tournaments.nodes[i]);
                        var slug = data.data.tournaments.nodes[i].slug;
                        tournamentSlugs.push(slug.slice(11));
                        notCompleteCount = 0;
                    }
                    if (notCompleteCount >= 20) { // number is arbitary, as a way to find out when completed tournaments end
                        upToDate = true;
                        break;
                    }
                    
                }
            })
            pageNum++;
            sleep.sleep(1000);
        }
        return tournamentSlugs;
    }
}
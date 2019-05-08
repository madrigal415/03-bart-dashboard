const APIkey = "QKBL-P2TX-9BBT-DWE9";

const timeEstEB = document.querySelector("#time-estimate-eb");
const timeEstSF = document.querySelector("#time-estimate-sf");

fetch('https://api.bart.gov/api/etd.aspx?cmd=etd&orig=24th&key=MW9S-E7SL-26DU-VV8V&json=y')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        const etds = myJson.root.station[0].etd;
        console.table(etds);

        let timesEB = '<h2>Next train departing 24th Street to EAST BAY: </h2><ul class="destinations">';

        let timesSF = '<h2>Next train departing 24th Street to SF: </h2><ul class="destinations">';

        function isEastBay(val) {
            const ebStations = ['ANTC', 'DUBL', 'RICH', 'WARM'];
            return ebStations.includes(val);
        }

        function isSF(val) {
            const sfStations = ['DALY', 'MLBR', 'SFIA'];
            return sfStations.includes(val);
        }

        // filter for only East Bay bound trains 
        let etdsEB = etds.filter(x => isEastBay(x.abbreviation));


        // adding the destinations and times to the page for EB direction
        etdsEB.forEach(element => {
            timesEB += `<li>${element.abbreviation}</li><ul class="times">`;
            element.estimate.forEach(x => {
                timesEB += `<li>${x.minutes}, &nbsp</li>`;
            });
            timesEB += '</ul>';
        });

        timesEB += "</ul>";
        console.log(timesEB);
        timeEstEB.innerHTML = timesEB;

        // filter for only SF bound trains 
        let etdsSF = etds.filter(x => isSF(x.abbreviation));

        // adding the destinations and times to the page for SF direction
        etdsSF.forEach(element => {
            timesSF += `<li>${element.abbreviation}</li><ul class="times">`;
            element.estimate.forEach(x => {
                timesSF += `<li>${x.minutes}, &nbsp</li>`;
            });
            timesSF += '</ul>';
        });

        timesSF += "</ul>";


        timeEstSF.innerHTML = timesSF;

    });
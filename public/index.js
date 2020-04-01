window.addEventListener("load", function(){
        // DOM ELEMENTS
        const firstSectionElem = document.querySelector(".firstSection");
        const secondSectionElem = document.querySelector(".secondSection");
        const worldTotalContainerElem = document.querySelector(".worldTotalContainer");
        const ul_dataTableElem = document.querySelector(".ul_dataTable");
        const statisticsButtonElem = document.querySelector(".wt_toStatisticsButton");
        const statisticsTableElem = document.querySelector(".tableContainer");
        const loaderElement = document.querySelector(".loader");
        /*API URL LISTS */
        const latestByCountryNameURI = "/latestStatByCountryName/:countryName";
        const casesByCountryURI = "/casesByCountry";
        const affectedCountryURI = "/affectedCountry";
        const worldTotalURI = "/worldTotalStat"
        // EventListners attachement
        statisticsButtonElem.addEventListener("click", function(e){
            e.preventDefault();
            statisticsTableElem.scrollIntoView({
                behavior: "smooth"
            })
        })
        // nextFileUsageVariables
        let casesByCountryData;
        let jsonCountriesData;
        let loaded;
        // helperVariables
        // init
        (function init(){
            /*Parallel Functions */
            section_WorldTotal()
            // ul_dataTable Section
            ul_dataTable(jsonStore);
        })();
        /* 
        -----------------
        Helper Functions
        */
     

        function section_WorldTotal(){
            getDataFromAPI(worldTotalURI, function(data){
                console.log(data)
                const layout = `
                            <div class = "worldTotalDiv">
                                <p class = "worldTotalFirstP">${data.total_cases}</p>
                                <p class = "worldTotalSecondP">Total cases</p>
                            </div>
                            <div class = "worldTotalDiv">
                                <p class = "worldTotalFirstP">${data.total_deaths}</p>
                                <p class = "worldTotalSecondP">Total deaths</p>
                            </div>
                            <div class = "worldTotalDiv">
                                <p class = "worldTotalFirstP">${data.total_recovered}</p>
                                <p class = "worldTotalSecondP">Total recovered</p>
                            </div>
                            <div class = "worldTotalDiv">
                                <p class = "worldTotalFirstP">${data.new_cases}</p>
                                <p class = "worldTotalSecondP">New Cases</p>
                            </div>
                            <div class = "worldTotalDiv">
                                <p class = "worldTotalFirstP">${data.new_deaths}</p>
                                <p class = "worldTotalSecondP">New deaths</p>
                            </div>
                    `
                    worldTotalContainerElem.innerHTML += layout;
                })
        }
        // appending li to UL_dataTable
        function ul_dataTable(cb){
            getDataFromAPI(casesByCountryURI, function(data){
                const countriesArray = data.countries_stat;
                // setting datafor file2

                for(let i = 0; i < countriesArray.length; i ++){
                    const liElem = document.createElement("li");
                    liElem.setAttribute("class", "ul_dataTableList");
                    const customElement = `<h3 class = "ul_DT_country">${countriesArray[i].country_name}</h3>
                                            <h3 class = "ul_DT_cases">${countriesArray[i].cases}</h3>
                                            <h3 class = "ul_DT_deaths">${countriesArray[i].deaths}</h3>
                                            <h3 class = "ul_DT_recovered">${countriesArray[i].total_recovered}</h3>
                                            <h3 class = "ul_DT_nDeaths">${countriesArray[i].new_deaths}</h3>
                                            <h3 class = "ul_DT_serious">${countriesArray[i].serious_critical}</h3>
                                            <h3 class = "ul_DT_active">${countriesArray[i].active_cases}</h3>`

                    liElem.innerHTML = customElement;                        
                    ul_dataTableElem.appendChild(liElem);
                }
                cb(countriesArray)
            })
        }

        // getting data
        async function getDataFromAPI(URI, cb){
            try{
                const dataResponse = await fetch("http://localhost:5000" + URI, {
                    method: "GET"
                });
                if(dataResponse.status !== 200){
                    throw new Error("something went wrong");
                }
                const data = await dataResponse.json();
                cb(data)
            }catch(error){
                console.log("getDtaFromAOICatch", error)
            }
        }
})

// DOM ELEMENTS







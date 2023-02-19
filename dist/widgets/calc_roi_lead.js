if( neodigmWired4Sound ) neodigmWired4Sound.setVolume( .04 )
let jWS = `[
{"code":"001", "title":"Advocacy",             "ctr_src":"4.41%", "ctr_gdn":"0.59%", "cpc_src":"$1.43", "cpc_gdn":"$0.62", "cvr_src":"1.96%", "cvr_gdn":"1.00%", "cpa_src":"$96.55",  "cpa_gdn":"$70.69"},
{"code":"002", "title":"Auto",                 "ctr_src":"4.00%", "ctr_gdn":"0.60%", "cpc_src":"$2.46", "cpc_gdn":"$0.58", "cvr_src":"6.03%", "cvr_gdn":"1.19%", "cpa_src":"$33.52",  "cpa_gdn":"$23.68"},
{"code":"003", "title":"B2B",                  "ctr_src":"2.41%", "ctr_gdn":"0.46%", "cpc_src":"$3.33", "cpc_gdn":"$0.79", "cvr_src":"3.04%", "cvr_gdn":"0.80%", "cpa_src":"$116.13", "cpa_gdn":"$130.36"},
{"code":"004", "title":"Consumer Services",    "ctr_src":"2.41%", "ctr_gdn":"0.51%", "cpc_src":"$6.40", "cpc_gdn":"$0.81", "cvr_src":"6.64%", "cvr_gdn":"0.98%", "cpa_src":"$90.70",  "cpa_gdn":"$60.48"},
{"code":"005", "title":"Dating & Personals",   "ctr_src":"6.05%", "ctr_gdn":"0.72%", "cpc_src":"$2.78", "cpc_gdn":"$1.49", "cvr_src":"9.64%", "cvr_gdn":"3.34%", "cpa_src":"$76.76",  "cpa_gdn":"$60.23"},
{"code":"006", "title":"E=Commerce",           "ctr_src":"2.69%", "ctr_gdn":"0.51%", "cpc_src":"$1.16", "cpc_gdn":"$0.45", "cvr_src":"2.81%", "cvr_gdn":"0.59%", "cpa_src":"$45.27",  "cpa_gdn":"$65.80"},
{"code":"007", "title":"Education",            "ctr_src":"3.78%", "ctr_gdn":"0.53%", "cpc_src":"$2.40", "cpc_gdn":"$0.47", "cvr_src":"3.39%", "cvr_gdn":"0.50%", "cpa_src":"$72.70",  "cpa_gdn":"$143.36"},
{"code":"008", "title":"Employment Services",  "ctr_src":"2.42%", "ctr_gdn":"0.59%", "cpc_src":"$2.04", "cpc_gdn":"$0.78", "cvr_src":"5.13%", "cvr_gdn":"1.57%", "cpa_src":"$48.04",  "cpa_gdn":"$59.47"},
{"code":"009", "title":"Finance & Insurance",  "ctr_src":"2.91%", "ctr_gdn":"0.52%", "cpc_src":"$3.44", "cpc_gdn":"$0.86", "cvr_src":"5.10%", "cvr_gdn":"1.19%", "cpa_src":"$81.93",  "cpa_gdn":"$56.76"},
{"code":"010", "title":"Health & Medical",     "ctr_src":"3.27%", "ctr_gdn":"0.59%", "cpc_src":"$2.62", "cpc_gdn":"$0.63", "cvr_src":"3.36%", "cvr_gdn":"0.82%", "cpa_src":"$78.09",  "cpa_gdn":"$72.58"},
{"code":"011", "title":"Home Goods",           "ctr_src":"2.44%", "ctr_gdn":"0.49%", "cpc_src":"$2.94", "cpc_gdn":"$0.60", "cvr_src":"2.70%", "cvr_gdn":"0.43%", "cpa_src":"$87.13",  "cpa_gdn":"$116.17"},
{"code":"012", "title":"Industrial Services",  "ctr_src":"2.61%", "ctr_gdn":"0.50%", "cpc_src":"$2.56", "cpc_gdn":"$0.54", "cvr_src":"3.37%", "cvr_gdn":"0.94%", "cpa_src":"$79.28",  "cpa_gdn":"$51.58"},
{"code":"013", "title":"Legal",                "ctr_src":"2.93%", "ctr_gdn":"0.59%", "cpc_src":"$6.75", "cpc_gdn":"$0.72", "cvr_src":"6.98%", "cvr_gdn":"1.84%", "cpa_src":"$86.02",  "cpa_gdn":"$39.52"},
{"code":"014", "title":"Real Estate",          "ctr_src":"3.71%", "ctr_gdn":"1.08%", "cpc_src":"$2.37", "cpc_gdn":"$0.75", "cvr_src":"2.47%", "cvr_gdn":"0.80%", "cpa_src":"$116.61", "cpa_gdn":"$74.79"},
{"code":"015", "title":"Technology",           "ctr_src":"2.09%", "ctr_gdn":"0.39%", "cpc_src":"$3.80", "cpc_gdn":"$0.51", "cvr_src":"2.92%", "cvr_gdn":"0.86%", "cpa_src":"$133.52", "cpa_gdn":"$103.60"},
{"code":"016", "title":"Travel & Hospitality", "ctr_src":"4.68%", "ctr_gdn":"0.47%", "cpc_src":"$1.53", "cpc_gdn":"$0.44", "cvr_src":"3.55%", "cvr_gdn":"0.51%", "cpa_src":"$44.73",  "cpa_gdn":"$99.13"}
]`
setTimeout(function(){// Populate list box from json
    let elLB = document.querySelector(".l-listbox")
    let sMU = `<div><p class="hd5">##title##</p></div>`
    if( elLB && jWS ){
        let aNAICS = JSON.parse( jWS ).sort(function(a, b){
            return ( a.title < b.title ) ? -1 : 1
        })
        aNAICS.forEach( ( oIndu ) => {
            if( oIndu.code.length == 3 ){
                let elDiv = document.createElement("div")
                elLB.appendChild( elDiv )
                elDiv.innerHTML = sMU.replace("##title##", oIndu.title )
            }
        })            
    }
    [ ... document.querySelectorAll( ".l-listbox > div") ].forEach( ( elLB ) => {// bind events single select
        elLB.addEventListener("click", function( ev ){
        [ ... document.querySelectorAll( ".l-listbox > div") ].forEach( ( elLBunsel ) => { elLBunsel.dataset.selected = "false" })
        ev.currentTarget.dataset.selected = "true"
        ev.currentTarget.parentNode.dataset.selectedTitle = ev.currentTarget.querySelector(".hd5").textContent
    }, true)
    })
}, 800)
let fResetCar = function(){ // Reset right panel carousels
    neodigmCarousel.nav({"id": "js-caro-roic", "nav": 1});
    neodigmCarousel.nav({"id": "js-caro-roic-1", "nav": 1});
    neodigmCarousel.nav({"id": "js-caro-roic-2", "nav": 1});
    neodigmCarousel.nav({"id": "js-caro-roic-3", "nav": 1});
}
function ROIFormVal( nPage, aIds ){
    let isVal = true;
    let valMsg = null;
    if( nPage && aIds ){
        e = document.querySelector("#js-caro-roic")
        switch( nPage ){
            case 1:
                elEmail = document.querySelector( aIds[0] )
                elIndustry = document.querySelector( aIds[1] )
                if( elEmail && elIndustry ){
                    if( (elEmail.value.indexOf("@") === -1) || (elEmail.value.indexOf(".") === -1) ){
                        isVal = false; valMsg = "Email Address is|Invalid";
                    }
                    if( !elEmail.value ){
                        isVal = false; valMsg = "Email Address is|Required";
                    }
                    if( !elIndustry.dataset.selectedTitle ){
                        isVal = false; valMsg = "Please Select an|Industry";
                    }
                }
            break;
            case 2:
                debugger
                elAdBudget = document.querySelector( aIds[0] )
                elLeadsPerMonth = document.querySelector( aIds[1] )
                if( elAdBudget && elLeadsPerMonth ){
                    if( Number.isNaN( elAdBudget ) ){
                        isVal = false; valMsg = "Ad Budget is|Invalid";
                    }
                    if( !elAdBudget.value ){
                        isVal = false; valMsg = "Ad Budget is|Required";
                    }
                    if( !elLeadsPerMonth.value ){
                        isVal = false; valMsg = "Leads Per Month is|Required";
                    }
                }
            break;
            
            default:
                console.warn( "Page " + nPage, " does not exist.");
        }
        if( isVal ) {
            // next
            neodigmCarousel.nav({"id": "js-caro-roic", "nav": nPage + 1 })
            if( nPage == 2 ) neodigmSodaPop.autoOpen("js-roic-asses-id")
        }else{
            // error audio
            if( neodigmToast ){ neodigmToast.q( valMsg, "danger" ); }
        }
    }
}
if( neodigmCarousel && neodigmOpt.neodigmCarousel ) neodigmCarousel.init()
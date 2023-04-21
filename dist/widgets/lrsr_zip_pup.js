let oZipup = (function( _d, _q ){  //  Author: Scott C. Krause
    let elZInp = _d.querySelector("#service_location")
    let elZbtn = _d.querySelector("#get_services")
    let sZip = ""
    let jExcp = [ ["60010", "IL-Others", "/business/"], ["60119", "IL-Others", "/business/"] ]
    return {
        "init": function(){
            if( elZInp && elZbtn ){
                setInterval( oZipup.tick, 800 )
                elZbtn.addEventListener( "click", oZipup.click )
            }
        },
        "click": function( ev ){
            oZipup.sZip = elZInp.value
        },
        "tick": function(){
            if( oZipup.sZip ){
                let elPup = _d.querySelector(".lrs-modal-opt")
                if( elPup && !elPup.dataset.injected ){
                    let aExcp = jExcp.filter( function( z ){
                        return ( z[0] == oZipup.sZip );
                    } )[0];
                    if( aExcp?.length ){
                        let elX = document.querySelector("#lrs-myModal > div > span")
                        let sInj = `<div class="city_radio" data-zipup="true"><input type="radio" name="redirect_city" onclick="window.location.href='##URI##'" id="redirect_city_32"><label for="redirect_city_32">##CITY##</label><br></div>`
                        let elDiv = _d.createElement("div");
                        if( elX ) elX.addEventListener( "click", oZipup.close )
                        setTimeout( function(){
                            elPup.appendChild( elDiv );
                            setTimeout( function(){
                                elDiv.outerHTML = sInj.replace("##CITY##", aExcp[1] ).replace("##URI##", document.location.href + aExcp[2] );
                            }, 1 )
                            setTimeout( function(){ 
                                if( _d.querySelector("[data-zipup]") ){
                                    elPup.dataset.injected = "true"
                                }else{
                                    oZipup.close()
                                }
                            }, 80 )
                        }, 1 )
                    }
                }else{
                    if( elPup && !_d.querySelector("[data-zipup]") ) oZipup.close()
                }
            }
        },
        "close": function(){
            let elPup = _d.querySelector(".lrs-modal-opt")
            if( elPup ) delete elPup.dataset.injected
        }
    };
})( document, ["", "", "", ""])
oZipup.init()
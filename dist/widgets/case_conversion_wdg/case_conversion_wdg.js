let doAction = function( sAct ){
    let eTermFrom = document.querySelector( "#l-term-from" )
    let eTermTo = document.querySelector( "#l-term-to" )
    let capFirst = (s) => (s && s[0].toUpperCase() + s.slice(1))
    if( eTermFrom && eTermTo ){
        if( sAct == "caseTitle" ){
            if( eTermFrom.value ){
                let aTxt = eTermFrom.value.split(" ")
                if( aTxt.length ){
                    aTxt = aTxt.map( sW => {
                        const sDoNotCap = ["a", "an", "and", "as", "at", "but", "by", "for", "if", "in", "nor", "of", "off", "on", "or", "per", "so", "than", "the", "to", "up", "via", "with", "yet"]
                        let sRet = sW
                        if( sDoNotCap.indexOf(  sW.toLowerCase() ) == -1 ) sRet = capFirst( sW )
                        return sRet
                    });
                }
                eTermTo.value = aTxt.join(" ")
                neodigmToast.q("Case Convert|Title " + eTermFrom.value.length + " characters", "primary")
            }else{
                neodigmToast.q("There is no text to convert.", "danger")
            }
        }
        if( sAct == "caseSentence" ){ //  TODO
            if( eTermFrom.value ){
                let aTxt = eTermFrom.value.split(" ")
                if( aTxt.length ){
                    aTxt = aTxt.map( sW => {
                        let sRet = sW
                        return sRet
                    });
                }
                eTermTo.value = aTxt.join(" ")
                neodigmToast.q("Case Convert|Sentence " + eTermFrom.value.length + " characters", "primary")
            }else{
                neodigmToast.q("There is no text to convert.", "danger")
            }
        }
        if( sAct == "caseLower" ){
            if( eTermFrom.value ){
                let aTxt = eTermFrom.value.split(" ")
                if( aTxt.length ){
                    aTxt = aTxt.map( sW => {
                        return sW.toLowerCase()
                    });
                }
                eTermTo.value = aTxt.join(" ")
                neodigmToast.q("Case Convert|Lowercase " + eTermFrom.value.length + " characters", "primary")
            }else{
                neodigmToast.q("There is no text to convert.", "danger")
            }
        }
        if( sAct == "caseUpper" ){
            if( eTermFrom.value ){
                let aTxt = eTermFrom.value.split(" ")
                if( aTxt.length ){
                    aTxt = aTxt.map( sW => {
                        return sW.toUpperCase()
                    });
                }
                eTermTo.value = aTxt.join(" ")
                neodigmToast.q("Case Convert|Uppercase " + eTermFrom.value.length + " characters", "primary")
            }else{
                neodigmToast.q("There is no text to convert.", "danger")
            }
        }
        if( sAct == "caseReverse" ){
            if( eTermFrom.value ){
                eTermTo.value = eTermFrom.value.split("").reverse().join("")
                neodigmToast.q("Text Convert|Reverse " + eTermFrom.value.length + " characters", "primary")
            }else{
                neodigmToast.q("There is no text to convert.", "danger")
            }
        }
        if( sAct == "caseTinyType" ){
            if( eTermFrom.value ){
                eTermTo.value = getTinyType( eTermFrom.value )
                neodigmToast.q("Text Convert|Tiny Type " + eTermFrom.value.length + " characters", "primary")
            }else{
                neodigmToast.q("There is no text to convert.", "danger")
            }
        }
        
        if( sAct == "share" ){
            try {
                navigator.clipboard.writeText( document.location.href );
                neodigmToast.q("Page Address (URL)|Copied to Clipboard", "brand" )
            } catch (err) {
                console.warn('Failed to copy', err)
            }
        }
        if( sAct == "fromCopy" ){
            if( eTermFrom.value ){
                try{
                    navigator.clipboard.writeText( eTermFrom.value )
                    neodigmToast.q("Copied to|Clipboard", "primary")
                }catch( er ){
                    neodigmToast.q("Unexpected Error| " + er , "danger")
                }
            }else{
                neodigmToast.q("There is no text to copy.", "danger")
                neodigmUtils.robinTheme("danger");
            }
        }
        if( sAct == "fromPaste" ){
            try{
                navigator.clipboard
                .readText()
                .then((clipText) => ( eTermFrom.value = clipText ));
                neodigmToast.q("Pasted from Clipboard", "primary")
            }catch( er ){
                neodigmToast.q("Unexpected Error|" + er , "danger")
            }
        }
        if( sAct == "fromClear" ){ eTermFrom.value = ""; neodigmUtils.robinTheme("danger"); }

        if( sAct == "toCopy" ){
            if( eTermTo.value ){
                try{
                    navigator.clipboard.writeText( eTermTo.value )
                    neodigmToast.q("Copied to|Clipboard", "primary")
                }catch( er ){
                    neodigmToast.q("Unexpected Error| " + er , "danger")
                }
            }else{
                neodigmToast.q("There is no text to copy.", "danger")
                neodigmUtils.robinTheme("danger");
            }
        }
        if( sAct == "toPaste" ){
            try{
                navigator.clipboard
                .readText()
                .then((clipText) => ( eTermTo.value = clipText ));
                neodigmToast.q("Pasted from Clipboard", "primary")
            }catch( er ){
                neodigmToast.q("Unexpected Error|" + er , "danger")
            }
        }
        if( sAct == "toClear" ){ eTermTo.value = ""; neodigmUtils.robinTheme("danger"); }
    }
    return false;
}
neodigmMarquee.init();
neodigmEnchantedCTA.init();

let getTinyType = ( sIn ) =>{
    let oTiny = {"a":"ᵃ","b":"ᵇ","c":"ᶜ","d":"ᵈ","e":"ᵉ","f":"ᶠ","g":"ᵍ","h":"ʰ","i":"ᶦ","j":"ʲ","k":"ᵏ","l":"ᶫ","m":"ᵐ","n":"ᶰ","o":"ᵒ","p":"ᵖ","q":"ᑫ","r":"ʳ","s":"ˢ","t":"ᵗ","u":"ᵘ","v":"ᵛ","w":"ʷ","x":"ˣ","y":"ʸ","z":"ᶻ","A":"ᴬ","B":"ᴮ","C":"ᶜ","D":"ᴰ","E":"ᴱ","F":"ᶠ","G":"ᴳ","H":"ᴴ","I":"ᴵ","J":"ᴶ","K":"ᴷ","L":"ᴸ","M":"ᴹ","N":"ᴺ","O":"ᴼ","P":"ᴾ","Q":"ᑫ","R":"ᴿ","S":"ˢ","T":"ᵀ","U":"ᵁ","V":"ⱽ","W":"ᵂ","X":"ˣ","Y":"ʸ","Z":"ᶻ","`":"`","~":"~","!":"﹗","@":"@","#":"#","$":"﹩","%":"﹪","^":"^","&":"﹠","*":"﹡","(":"⁽",")":"⁾","_":"⁻","-":"⁻","=":"⁼","+":"+","{":"{","[":"[","}":"}","]":"]",":":"﹕",";":"﹔","?":"﹖"};
    let sOut = "";
    Array.from( sIn ).filter(( sChr )=>{
        if( oTiny[ sChr ] ){
            sOut += oTiny[ sChr ]
        }else{
            sOut += sChr 
        }
    });
    return sOut;
}
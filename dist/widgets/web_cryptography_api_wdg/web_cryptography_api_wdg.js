const buff_to_base64 = (buff) => btoa(
    new Uint8Array(buff).reduce(
      (data, byte) => data + String.fromCharCode(byte), ''
    )
  );
  
  const base64_to_buf = (b64) =>
    Uint8Array.from(atob(b64), (c) => c.charCodeAt(null));
  
  const enc = new TextEncoder();
  const dec = new TextDecoder();
  
  const getPasswordKey = (password) =>
    window.crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
      "deriveKey",
    ]);
  
  const deriveKey = (passwordKey, salt, keyUsage) =>
    window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 250000,
        hash: "SHA-256",
      },
      passwordKey,
      { name: "AES-GCM", length: 256 },
      false,
      keyUsage
    );
  
  async function encryptData(secretData, password) {
    try {
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const passwordKey = await getPasswordKey(password);
      const aesKey = await deriveKey(passwordKey, salt, ["encrypt"]);
      const encryptedContent = await window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: iv,
        },
        aesKey,
        enc.encode(secretData)
      );
  
      const encryptedContentArr = new Uint8Array(encryptedContent);
      let buff = new Uint8Array(
        salt.byteLength + iv.byteLength + encryptedContentArr.byteLength
      );
      buff.set(salt, 0);
      buff.set(iv, salt.byteLength);
      buff.set(encryptedContentArr, salt.byteLength + iv.byteLength);
      const base64Buff = buff_to_base64(buff);
      return base64Buff;
    } catch (e) {
      console.log(`Error - ${e}`);
      return "";
    }
  }
  
  async function decryptData(encryptedData, password) {
    try {
      const encryptedDataBuff = base64_to_buf(encryptedData);
      const salt = encryptedDataBuff.slice(0, 16);
      const iv = encryptedDataBuff.slice(16, 16 + 12);
      const data = encryptedDataBuff.slice(16 + 12);
      const passwordKey = await getPasswordKey(password);
      const aesKey = await deriveKey(passwordKey, salt, ["decrypt"]);
      const decryptedContent = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: iv,
        },
        aesKey,
        data
      );
      return dec.decode(decryptedContent);
    } catch (e) {
      console.log(`Error - ${e}`);
      return "";
    }
  }
  
  let doAction = async function( sAct ){
      let eTermKey = document.querySelector( "#l-term-key" )
      let eTermFrom = document.querySelector( "#l-term-from" )
      let eTermTo = document.querySelector( "#l-term-to" )
      let capFirst = (s) => (s && s[0].toUpperCase() + s.slice(1))
      if( eTermKey && eTermFrom && eTermTo ){
          if( sAct == "crypt-encrypt" ){
              if( eTermKey.value && eTermFrom.value ){
                  eTermTo.value = await encryptData( eTermFrom.value, eTermKey.value );
                  neodigmToast.q("Encrypted " + eTermFrom.value.length + " characters", "primary")
              }else{
                  neodigmToast.q("There is no key / text|to encrypt.", "danger")
              }
          }
  
          if( sAct == "crypt-decrypt" ){
              if( eTermKey.value && eTermFrom.value ){
                  const decryptedData = await decryptData( eTermFrom.value, eTermKey.value );
                  eTermTo.value = decryptedData || "decryption failed!";
                  neodigmToast.q("Decrypted " + eTermFrom.value.length + " characters", "primary")
              }else{
                  neodigmToast.q("There is no key / text|to encrypt.", "danger")
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
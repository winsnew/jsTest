function encrypt() {
  // Ambil nilai plaintext dan kunci dari form
  let plainText = document.getElementById("plaintext").value;
  let key = document.getElementById("key").value;
  let numRails = document.getElementById("rail").value;
  // Enkripsi plaintext menggunakan Vigenere Cipher
  let cipherText = vigenereCipher(plainText, key);
  let superEnkripsi = railFenceTransposition(cipherText, numRails);
  // Tampilkan hasil enkripsi pada halaman
 
  document.getElementById("superEnkripsi").innerHTML = superEnkripsi; 
  
}



function vigenereCipher(plainText, key) {
  
  plainText = plainText.toLowerCase();
  key = key.toLowerCase();

  let cipherText = "";
  let keyIndex = 0;

  
  for (let i = 0; i < plainText.length; i++) {
    let plainCharCode = plainText.charCodeAt(i);

    
    if (plainCharCode < 97 || plainCharCode > 122) {
      cipherText += plainText.charAt(i);
      continue;
    }

    let keyCharCode = key.charCodeAt(keyIndex % key.length);

    
    let cipherCharCode = ((plainCharCode - 97 + (keyCharCode - 97)) % 26) + 97;

    
    cipherText += String.fromCharCode(cipherCharCode);

    
    keyIndex++;
  }

  return cipherText;
}

function railFenceTransposition(cipherText, numRails) {
  
  cipherText = cipherText.replace(/ /g, "");

  let fence = [];

  
  for (let i = 0; i < numRails; i++) {
    fence[i] = [];
    for (let j = 0; j < cipherText.length; j++) {
      fence[i][j] = "";
    }
  }

  let rail = 0;
  let dir = -1;
  
  for (let i = 0; i < cipherText.length; i++) {
    fence[rail][i] = cipherText.charAt(i);

    
    if (rail == 0 || rail == numRails - 1) {
      dir = dir * -1;
    }
    rail += dir;
  }

  let plainText = "";

  
  for (let i = 0; i < numRails; i++) {
    for (let j = 0; j < cipherText.length; j++) {
      if (fence[i][j] !== "") {
        plainText += fence[i][j];
      }
    }
  }

  return plainText;
}

// decrypt text 



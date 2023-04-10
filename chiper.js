function encrypt() {
  // Ambil nilai plaintext dan kunci dari form
  let plainText = document.getElementById("plaintext").value;
  let key = document.getElementById("key").value;
  let numRails = document.getElementById("rail").value;
  // Enkripsi plaintext menggunakan Vigenere Cipher
  let cipherText = vigenereCipher(plainText, key);
  let superEnkripsi = railFenceTransposition(cipherText, numRails);
  // Tampilkan hasil enkripsi pada halaman
  document.getElementById("ciphertext").innerHTML = cipherText;
  document.getElementById("superEnkripsi").innerHTML = superEnkripsi; 
  
}

function decrypt() {
  // Ambil nilai ciphertext, kunci, dan jumlah rail dari form
  let cipherText = document.getElementById("ciphertext").innerHTML;
  let key = document.getElementById("key").value;
  let numRails = document.getElementById("rail").value;
  
  // Lakukan proses dekripsi menggunakan transposisi Rail Fence
  let decryptedText = railFenceTransposition(cipherText, numRails);
  
  // Lakukan proses dekripsi menggunakan Vigenere Cipher
  let plainText = "";
  let keyIndex = 0;
  
  for (let i = 0; i < decryptedText.length; i++) {
    let decryptedCharCode = decryptedText.charCodeAt(i);
    
    if (decryptedCharCode < 97 || decryptedCharCode > 122) {
      plainText += decryptedText.charAt(i);
      continue;
    }
    
    let keyCharCode = key.charCodeAt(keyIndex % key.length);
    
  let plainCharCode = ((decryptedCharCode - 97 - (keyCharCode - 97) + 26) % 26) + 97;
    
    plainText += String.fromCharCode(plainCharCode);
    
    keyIndex++;
  }
  
  // Tampilkan hasil dekripsi pada halaman
  document.getElementById("decryptedtext").innerHTML = plainText;
}



function vigenereCipher(plainText, key) {
  // Mengubah teks biasa dan kunci menjadi huruf kecil
  plainText = plainText.toLowerCase();
  key = key.toLowerCase();

  let cipherText = "";
  let keyIndex = 0;

  // Melakukan iterasi pada setiap karakter dari plainText
  for (let i = 0; i < plainText.length; i++) {
    let plainCharCode = plainText.charCodeAt(i);

    // Jika karakter tidak termasuk dalam huruf alfabet, maka langsung tambahkan pada ciphertext
    if (plainCharCode < 97 || plainCharCode > 122) {
      cipherText += plainText.charAt(i);
      continue;
    }

    let keyCharCode = key.charCodeAt(keyIndex % key.length);

    // Melakukan operasi enkripsi menggunakan Vigenere Cipher
    let cipherCharCode = ((plainCharCode - 97 + (keyCharCode - 97)) % 26) + 97;

    // Menambahkan karakter cipher ke dalam hasil akhir
    cipherText += String.fromCharCode(cipherCharCode);

    // Menambahkan index kunci
    keyIndex++;
  }

  return cipherText;
}

function railFenceTransposition(cipherText, numRails) {
  // Menghapus spasi pada ciphertext
  cipherText = cipherText.replace(/ /g, "");

  let fence = [];

  // Menginisialisasi rail fence dengan spasi kosong
  for (let i = 0; i < numRails; i++) {
    fence[i] = [];
    for (let j = 0; j < cipherText.length; j++) {
      fence[i][j] = "";
    }
  }

  let rail = 0;
  let dir = -1;

  if (numRails <= 1) {
    alert("error");
  }
  // Melakukan iterasi pada setiap karakter dari cipherText
  for (let i = 0; i < cipherText.length; i++) {
    fence[rail][i] = cipherText.charAt(i);

    // Mengubah arah pergerakan rail jika mencapai ujung atas atau bawah
    if (rail == 0 || rail == numRails - 1) {
      dir = dir * -1;
    }
    rail += dir;
  }

  let plainText = "";

  // Mengambil karakter pada setiap rail secara berurutan
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



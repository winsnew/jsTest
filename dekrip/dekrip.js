function decrypt() {
  // Ambil nilai ciphertext dan kunci dari form
  let cipherText = document.getElementById("ciphertext").value;
  let key = document.getElementById("key").value;
  let numRails = document.getElementById("rail").value;
  // Dekripsi ciphertext menggunakan transposisi Rail Fence
  let railFenceDecrypted = railFenceTranspositionDecrypt(cipherText, numRails);
  // Dekripsi hasil Rail Fence dengan Vigenere Cipher
  let decryptedText = vigenereCipherDecrypt(railFenceDecrypted, key);
  // Tampilkan hasil dekripsi pada halaman
  document.getElementById("decryptedtext").innerHTML = decryptedText;
}

function railFenceTranspositionDecrypt(cipherText, numRails) {
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
    fence[rail][i] = "*";

    // Mengubah arah pergerakan rail jika mencapai ujung atas atau bawah
    if (rail == 0 || rail == numRails - 1) {
      dir = dir * -1;
    }
    rail += dir;
  }

  let index = 0;
  let decryptedText = "";

  // Mengambil karakter pada setiap rail secara berurutan
  for (let i = 0; i < numRails; i++) {
    for (let j = 0; j < cipherText.length; j++) {
      if (fence[i][j] === "*" && index < cipherText.length) {
        fence[i][j] = cipherText.charAt(index);
        index++;
      }
    }
  }

  rail = 0;
  dir = -1;

  // Mengambil karakter pada setiap rail secara berurutan
  for (let i = 0; i < cipherText.length; i++) {
    decryptedText += fence[rail][i];

    // Mengubah arah pergerakan rail jika mencapai ujung atas atau bawah
    if (rail == 0 || rail == numRails - 1) {
      dir = dir * -1;
    }
    rail += dir;
  }

  return decryptedText;
}

function vigenereCipherDecrypt(cipherText, key) {
  // Mengubah teks cipher dan kunci menjadi huruf kecil
  cipherText = cipherText.toLowerCase();
  key = key.toLowerCase();

  let decryptedText = "";
  let keyIndex = 0;

  // Melakukan iterasi pada setiap karakter dari cipherText
  for (let i = 0; i < cipherText.length; i++) {
    let cipherCharCode = cipherText.charCodeAt(i);

    // Jika karakter tidak termasuk dalam huruf alfabet, maka langsung tambahkan pada decryptedText
    if (cipherCharCode < 97 || cipherCharCode > 122) {
      decryptedText += cipherText.charAt(i);
      continue;
    }
    let keyCharCode = key.charCodeAt(keyIndex % key.length);

    // Melakukan operasi dekripsi menggunakan Vigenere Cipher
    let plainCharCode = ((cipherCharCode - keyCharCode + 26) % 26) + 97;

    // Menambahkan karakter plainteks ke dalam hasil akhir
    decryptedText += String.fromCharCode(plainCharCode);

    // Menambahkan index kunci
    keyIndex++;
  }
  return decryptedText;
}

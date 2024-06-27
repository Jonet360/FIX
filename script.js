document.addEventListener("DOMContentLoaded", function() {
    // Isi field jam dengan waktu saat ini
    var jamField = document.getElementById("jam");
    var now = new Date();
    var formattedDate = now.getFullYear() + "-" + (now.getMonth() + 1).toString().padStart(2, '0') + "-" + now.getDate().toString().padStart(2, '0') + " " + now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0') + ":" + now.getSeconds().toString().padStart(2, '0');
    jamField.value = formattedDate;
  
    // Isi field lokasi dengan koordinat lokasi pengguna
    var lokasiField = document.getElementById("lokasi");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            lokasiField.value = lat + ", " + long;
        });
    } else {
        lokasiField.value = "Geolocation tidak didukung oleh browser ini.";
    }
  
    // Handle form submission
    var form = document.getElementById("absensiForm");
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent default form submission
  
      var nama = document.getElementById("nama").value;
      var skerja = document.getElementById("skerja").value;
      var jam = document.getElementById("jam").value;
      var statusAbsensi = document.getElementById("statusabsensi").value;
      var lokasi = document.getElementById("lokasi").value;
  
      // URL of the Google Apps Script Web App
      var scriptURL = 'https://script.google.com/macros/s/AKfycbxDyVt59w3adimwMwME0mKLy1gYe7MnCx5BU9jqzTXCoeh3xqtR69rXYw3Wdlk3-vqg/exec';
  
      // Construct the POST request
      fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'nama': nama,
          'skerja':skerja,
          'jam': jam,
          'statusAbsensi': statusAbsensi,
          'lokasi': lokasi
        })
      })
      .then(response => response.text())
      .then(data => {
        console.log('Success:', data);
        alert("Data berhasil dikirim!");
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Terjadi kesalahan saat mengirim data.");
      });
    });
  });
  
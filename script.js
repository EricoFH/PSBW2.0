// Matkul

const mataKuliah = [
  {
    no: 1,
    nama: "Teknologi dan Aplikasi Bisnis Berkembang",
    nilai: "AB"
  },
  {
    no: 2,
    nama: "Pemrograman Berorientasi Objek",
    nilai: "A"
  },
  {
    no: 3,
    nama: "Arsitektur dan Organisasi Komputer",
    nilai: "AB"
  },
  {
    no: 4,
    nama: "Sistem Basis Data",
    nilai: "B"
  },
  {
    no: 5,
    nama: "Statistika dan Probabilitas",
    nilai: "B"
  },
  {
    no: 6,
    nama: "Algoritma dan Struktur Data",
    nilai: "AB"
  },
  {
    no: 7,
    nama: "Interaksi Manusia Komputer",
    nilai: "AB"
  }
];

const tabelBody = document.getElementById("tabelBody");
const inputCari = document.getElementById("cari");
const btnToggle = document.getElementById("btnToggle");
const form = document.getElementById("formMatkul");
const inputNama = document.getElementById("inputNama");
const inputNilai = document.getElementById("inputNilai");
const pesanError = document.getElementById("pesanError");

// true = hanya tampilkan nilai A
let hanyaA = false;

// Fungsi

// Untuk menghitung jumlah mata kuliah dengan nilai tertentu
function hitungNilai(data, nilaiDicari) {
  let jumlah = 0;

  for (let matkul of data) {
    if (matkul.nilai === nilaiDicari) {
      jumlah++;
    }
  }

  return jumlah;
}

// Menampilkan array of object ke tabel dengan createElement
function render(data) {
  tabelBody.innerHTML = "";

  // Menampilkan pemberitahuan jika ada yang tidak cocok
  if (data.length === 0) {
    const trKosong = document.createElement("tr");
    const tdKosong = document.createElement("td");

    tdKosong.colSpan = 3;
    tdKosong.textContent = "Mata kuliah tidak ditemukan.";
    tdKosong.classList.add("text-center");

    trKosong.appendChild(tdKosong);
    tabelBody.appendChild(trKosong);
  }

  data.forEach(function(matkul) {
    const tr = document.createElement("tr");

    [matkul.no, matkul.nama, matkul.nilai].forEach(function(isi) {
      const td = document.createElement("td");

      td.textContent = isi;

      tr.appendChild(td);
    });

    tabelBody.appendChild(tr);
  });

  $("#jumlahMatkul").text(
    "Menampilkan " + data.length + " dari " + mataKuliah.length +
    " mata kuliah (nilai A: " + hitungNilai(mataKuliah, "A") + ")"
  );
}

// Menggabungkan filter pencarian dan toggle nilai A
function terapkanFilter() {
  const kataKunci = inputCari.value.toLowerCase();

  let hasil = mataKuliah.filter(function(matkul) {
    return matkul.nama.toLowerCase().includes(kataKunci);
  });

  if (hanyaA) {
    hasil = hasil.filter(function(matkul) {
      return matkul.nilai === "A";
    });
  }

  render(hasil);
}

// Event listener

// Interaksi 1: pencarian saat mengetik
inputCari.addEventListener("input", terapkanFilter);

// Interaksi 2: toggle tampilan nilai A
btnToggle.addEventListener("click", function() {
  hanyaA = !hanyaA;

  btnToggle.classList.toggle("btn-aktif", hanyaA);

  btnToggle.textContent = hanyaA
    ? "Tampilkan semua nilai"
    : "Tampilkan hanya nilai A";

  terapkanFilter();
});

// Interaksi 3: submit form dengan validasi
form.addEventListener("submit", function(e) {

  e.preventDefault();

  const nama = inputNama.value.trim();
  const nilai = inputNilai.value;

  let error = "";
  let fieldError = null;

  if (nama === "") {
    error = "Nama mata kuliah tidak boleh kosong.";
    fieldError = inputNama;

  } else if (nama.length < 3) {
    error = "Nama mata kuliah minimal 3 karakter.";
    fieldError = inputNama;

  } else if (mataKuliah.some(function(matkul) {
    return matkul.nama.toLowerCase() === nama.toLowerCase();
  })) {
    error = "Mata kuliah ini sudah ada.";
    fieldError = inputNama;

  } else if (nilai === "") {
    error = "Pilih nilai terlebih dahulu.";
    fieldError = inputNilai;
  }

  // Bersihkan penanda error sebelumnya
  inputNama.classList.remove("invalid");
  inputNilai.classList.remove("invalid");

  if (error !== "") {
    pesanError.textContent = error;
    pesanError.classList.remove("hidden");
    fieldError.classList.add("invalid");

    return;
  }

  // Jika data valid tambah ke array dan tampilkan ulang
  mataKuliah.push({
    no: mataKuliah.length + 1,
    nama: nama,
    nilai: nilai
  });

  pesanError.classList.add("hidden");
  form.reset();
  terapkanFilter();
});

// jQuery

// Klik baris tabel untuk menandai/melepas tanda.
// Memakai delegasi event karena baris dibuat ulang oleh render()
$("#tabelBody").on("click", "tr", function() {
  $(this).toggleClass("baris-dipilih");
});

// Jalankan saat halaman dibuka
terapkanFilter();

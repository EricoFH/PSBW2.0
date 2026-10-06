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

function hitungNilai(data, nilaiDicari) {
    let jumlah = 0;

    for (let matkul of data) {
        if (matkul.nilai === nilaiDicari) {
            jumlah++;
        }
    }

    return jumlah;
}

function cariMatkul(data, nilaiDicari) {
    return data.filter(function(matkul) {
        return matkul.nilai === nilaiDicari;
    });
}

console.log("DAFTAR MATA KULIAH");

mataKuliah.forEach(function(matkul) {
    console.log(
        matkul.no + ". " +
        matkul.nama +
        " - Nilai: " +
        matkul.nilai
    );
});


console.log("")


console.log("STATUS NILAI");

mataKuliah.forEach(function(matkul) {

    if (matkul.nilai === "A" || matkul.nilai === "AB") {
        console.log(matkul.nama + " : Nilai bagus");
    }

    if (matkul.nilai === "B" && matkul.no > 3) {
        console.log(matkul.nama + " : Nilai B dan nomor mata kuliah > 3");
    }
});


console.log("")


console.log("HASIL DATA");

console.log("Jumlah nilai A:", hitungNilai(mataKuliah, "A"));
console.log("Jumlah nilai AB:", hitungNilai(mataKuliah, "AB"));
console.log("Jumlah nilai B:", hitungNilai(mataKuliah, "B"));

console.log("Mata kuliah dengan nilai A:");
console.log(cariMatkul(mataKuliah, "A"));

console.log("Mata kuliah dengan nilai AB:");
console.log(cariMatkul(mataKuliah, "AB"));

console.log("Mata kuliah dengan nilai B:");
console.log(cariMatkul(mataKuliah, "B"));


const tabelBody  = document.getElementById("tabelBody");
const inputCari  = document.getElementById("cari");
const btnToggle  = document.getElementById("btnToggle");
const form       = document.getElementById("formMatkul");
const inputNama  = document.getElementById("inputNama");
const inputNilai = document.getElementById("inputNilai");
const pesanError = document.getElementById("pesanError");

let hanyaA = false;

// 1. array of object
function render(data) {
  tabelBody.innerHTML = "";
  data.forEach(function (matkul) {
    const tr = document.createElement("tr");
    [matkul.no, matkul.nama, matkul.nilai].forEach(function (isi) {
      const td = document.createElement("td");
      td.textContent = isi;
      tr.appendChild(td);
    });
    tabelBody.appendChild(tr);
  });
}

// Gabungan filter pencarian + toggle nilai A
function terapkanFilter() {
  const kata = inputCari.value.toLowerCase();
  let hasil = mataKuliah.filter(function (m) {
    return m.nama.toLowerCase().includes(kata);
  });
  if (hanyaA) {
    hasil = hasil.filter(function (m) {
      return m.nilai === "A";
    });
  }
  render(hasil);
}

//2. Interaksi addEventListener
// Interaksi 1: cari
inputCari.addEventListener("input", terapkanFilter);

// Interaksi 2: toggle nilai A
btnToggle.addEventListener("click", function () {
  hanyaA = !hanyaA;
  btnToggle.classList.toggle("btn-aktif", hanyaA);
  btnToggle.textContent = hanyaA
    ? "Tampilkan semua nilai"
    : "Tampilkan hanya nilai A";
  terapkanFilter();
});

//3. Form, validasi, preventDefault
form.addEventListener("submit", function (e) {
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
  } else if (
    mataKuliah.some(function (m) {
      return m.nama.toLowerCase() === nama.toLowerCase();
    })
  ) {
    error = "Mata kuliah ini sudah ada.";
    fieldError = inputNama;
  } else if (nilai === "") {
    error = "Pilih nilai terlebih dahulu.";
    fieldError = inputNilai;
  }

  inputNama.classList.remove("invalid");
  inputNilai.classList.remove("invalid");

  if (error !== "") {
    pesanError.textContent = error;
    pesanError.classList.remove("hidden");
    fieldError.classList.add("invalid");
    return; // berhenti, data tidak ditambahkan
  }

  mataKuliah.push({ no: mataKuliah.length + 1, nama: nama, nilai: nilai });
  pesanError.classList.add("hidden");
  form.reset();
  terapkanFilter();
});

// menampilkan data saat halaman pertama dibuka
terapkanFilter();
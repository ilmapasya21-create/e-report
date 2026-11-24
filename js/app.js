// Menentukan nama tempat data disimpan di localStorage
const KUNCI_STORAGE = 'E_REPORT_DATA';

let daftarLaporan = [];

// fungsi muat data itu di eksekusi ketika halaman html selesai dimuat
document.addEventListener('DOMContentLoaded', muatData());

function muatData() {
    daftarLaporan = typeof dataAwalLaporan !== 'undefined' ? [...dataAwalLaporan] : [];
    console.log(daftarLaporan);
    tampilkanDataTabel();
}

function tampilkanDataTabel() {
    const tabelBody = document.getElementById('reports-table-body');
    tabelBody.innerHTML = '';

    //  menampilkan baris data
    daftarLaporan.forEach((laporan) => {
        tabelBody.appendChild(buatBarisLaporan(laporan));
    });

}

function buatBarisLaporan(laporan) {
    const baris = document.createElement('tr');

    baris.innerHTML = `
          <td>
            <strong class="cell-main">${laporan.pelapor}</strong>
          </td>
          <td>
            <span class="tag tag-blue">${laporan.kategori}</span>
          </td>
          <td>
            <span class="cell-main">${laporan.deskripsi}</span>
          </td>
          <td>
            <span class="badge badge-waiting">${laporan.status}</span>
          </td>
         `
    return baris;
}

// 3. Create => menambahkan data laporan baru dari form
function simpanData() {
  localStorage.setItem("daftarLaporan", JSON.stringify(daftarLaporan));
}

function handelFormSubmit(event) {

    event.preventDefault(); // mencegah halaman refresh

    // mengambil isi form
    const form = event.target
    const nama = form.reporter.value.trim();
    const kategori = form.category.value;
    const deskripsi = form.description.value.trim();

    //  pengecekan value (validasi) => mengecek apakah semua input terisi
    if(!nama || !kategori || !deskripsi) {
        return console.log("Mohon lengkapi semua data!");
    }

    // membuat objek laporan baru
    const laporanBaru = {
       id : `rep-${Date.now()}`,  //id unik berdasarkan waktu saat ini
       pelapor: nama,
       kategori: kategori,
       deskripsi: deskripsi,
       status: 'Menunggu'
    };

    // Menambahkan laporan baru ke data lama
    daftarLaporan.unshift(laporanBaru);
    // menyimpan ke dalam local storage
    simpanData();
    tampilkanDataTabel();

    // mengosongkan form
    form.reset();

    //  sweet alert
    Swal.fire("Berhasil tambah data!");
}


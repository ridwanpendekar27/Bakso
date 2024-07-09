// Function to get the current queue number from localStorage
function getQueueNumber() {
    let currentQueueNumber = parseInt(localStorage.getItem('currentQueueNumber')) || 0;
    return currentQueueNumber;
}

// Function to set the next queue number to localStorage
function setQueueNumber(number) {
    localStorage.setItem('currentQueueNumber', number);
}

document.addEventListener('DOMContentLoaded', function() {
    // Update input nomor antrian pada halaman load pertama kali
    const currentQueueNumber = getQueueNumber();
    document.getElementById('queueInput').placeholder = `No. Antrian: ${currentQueueNumber + 1}`;

    // Function to update price based on selected menu
    function updatePrice() {
        const jenisMenu = document.getElementById('jenis_menu').value;
        const satuan = parseFloat(document.getElementById('satuan').value) || 1; // Ambil nilai satuan sebagai float atau 1 jika kosong

        // Ambil harga berdasarkan pilihan jenisMenu
        let harga = 0;
        switch (jenisMenu) {
            case 'Bakso':
                harga = 10000; // Harga untuk Bakso
                break;
            case 'Telur':
                harga = 3000; // Harga untuk Telur
                break;
            case 'Lontong':
                harga = 1000; // Harga untuk Lontong
                break;
            case 'Kerupuk':
                harga = 5000; // Harga untuk Kerupuk
                break;
            case 'Kacang':
                harga = 1000; // Harga untuk Kacang
                break;
            default:
                harga = 0; // Default jika tidak ada pilihan
                break;
        }

        // Hitung total harga berdasarkan satuan
        const totalHarga = harga * satuan;

        // Set nilai harga di input readonly
        document.getElementById('harga').value = totalHarga;
    }

    // Event listener untuk memilih menu
    document.getElementById('jenis_menu').addEventListener('change', updatePrice);

    // Event listener untuk mengisi satuan
    document.getElementById('satuan').addEventListener('input', updatePrice);

    // Tambahkan event listener untuk form submit
    document.getElementById('queueForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah submit form default

        let queueCounter = getQueueNumber() + 1; // Tambahkan nomor antrian

        const queueInput = document.getElementById('queueInput'); // Ambil elemen input nomor antrian

        // Ambil nilai dari form
        const bungkus = document.getElementById('bungkus').value;
        const jenisMenu = document.getElementById('jenis_menu').value;
        const satuan = parseFloat(document.getElementById('satuan').value); // Ambil nilai satuan sebagai float
        const harga = parseFloat(document.getElementById('harga').value); // Ambil nilai harga sebagai float

        // Buat objek order
        const order = {
            noAntrian: queueCounter,
            bungkus,
            jenisMenu,
            satuan,
            harga // Simpan total harga
        };

        // Simpan ke localStorage
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Simpan nomor antrian terbaru ke localStorage
        setQueueNumber(queueCounter); // Panggil function yang benar

        // Tampilkan nomor antrian di input placeholder
        queueInput.placeholder = `No. Antrian: ${queueCounter}`;

        // Tampilkan alert dengan nomor antrian
        alert(`Terima kasih! Nomor antrian Anda adalah ${queueCounter}.`);

        // Reset form setelah submit
        document.getElementById('queueForm').reset();
        document.getElementById('harga').value = ''; // Kosongkan harga
    });
});

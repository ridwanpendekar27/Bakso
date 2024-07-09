// Fungsi untuk mengambil dan menampilkan data dari localStorage
function loadOrders() {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  const orderTable = document.getElementById("orderTable");

  // Bersihkan tabel sebelum menambahkan data baru
  orderTable.innerHTML = "";

  if (orders.length === 0) {
    // Jika tidak ada pesanan, tampilkan pesan "Tidak ada pesanan"
    const noOrderMessage = document.createElement("tr");
    noOrderMessage.innerHTML =
      '<td colspan="6" style="text-align: center;">Tidak ada pesanan</td>';
    orderTable.appendChild(noOrderMessage);
  } else {
    orders.forEach((order, index) => {
      const row = document.createElement("tr");

      const bungkusCell = document.createElement("td");
      bungkusCell.textContent = order.bungkus;
      row.appendChild(bungkusCell);

      const antrianCell = document.createElement("td");
      antrianCell.textContent = order.noAntrian;
      row.appendChild(antrianCell);

      const menuCell = document.createElement("td");
      menuCell.textContent = order.jenisMenu;
      row.appendChild(menuCell);

      const satuanCell = document.createElement("td");
      satuanCell.textContent = order.satuan;
      row.appendChild(satuanCell);

      const hargaCell = document.createElement("td");
      hargaCell.textContent = order.harga;
      row.appendChild(hargaCell);

      const deleteCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Hapus";
      deleteButton.classList.add("delete-btn");
      deleteButton.addEventListener("click", () => {
        deleteOrder(index);
      });
      deleteCell.appendChild(deleteButton);
      row.appendChild(deleteCell);
      orderTable.appendChild(row);
    });
  }
}

// Fungsi untuk menghapus data pesanan
function deleteOrder(index) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.splice(index, 1); // Hapus item dari array
  localStorage.setItem("orders", JSON.stringify(orders)); // Simpan array yang sudah diperbarui ke localStorage
  loadOrders(); // Muat ulang tabel pesanan
}

resetantrian.addEventListener("click", () => {
  localStorage.removeItem("currentQueueNumber");
  currentQueueNumber = 1;
  queueInput.value = `A${currentQueueNumber.toString().padStart(3, "0")}`;
});
// Muat data pesanan ketika halaman dimuat
window.addEventListener("DOMContentLoaded", loadOrders);

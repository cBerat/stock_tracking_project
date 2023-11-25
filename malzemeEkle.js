const table = document.querySelector("#mytable");
const kaydetBtn = document.querySelector("#kaydetBtn");
displayTable();
function displayTable() {
  var urlGet = "http://localhost:4000/getMaterialTable";
  $.ajax({
    url: urlGet,
    method: "get",
    dataType: "json",
    contentType: "Application/json",
    success: function (data) {
      for (datas of data) {
        let li = `
        <tr>
            <td>${datas.barcodeNumber}</td>
            <td>${datas.materialName}</td>
            <td>${datas.measurementUnit}</td>
         </tr>
        `;
        table.insertAdjacentHTML("beforeend", li);
      }
    },
  });
}
function updateTable() {
  var barkodNo = document.querySelector("#barkodNo").value;
  var malzemeAdi = document.querySelector("#malzemeAdi").value;
  var olcu = document.querySelector("#olcu").value;
  console.log(barkodNo + " " + malzemeAdi + " " + olcu);
  var urlPost =
    "http://localhost:4000/postMaterialTable?barkodNo=" +
    barkodNo +
    "&malzemeAdi=" +
    malzemeAdi +
    "&olcu=" +
    olcu;
  $.ajax({
    url: urlPost,
    method: "post",
    dataType: "json",
    contentType: "Application/json",
    success: function (data) {
      console.log(data);
      document.location.reload(true);
    },
  });
}
kaydetBtn.addEventListener("click", function () {
  if (
    document.querySelector("#barkodNo").value == "" ||
    document.querySelector("#malzemeAdi").value == ""
  ) {
    alert("Gerekli alanlari doldurunuz");
  } else {
    updateTable();
  }
});

const table = document.querySelector("#tbody");
const kaydetBtn = document.querySelector("#kaydetBtn");
displayTable();
kaydetBtn.addEventListener("click", function () {
  let barcodeNumber = document.querySelector("#barkodNoText").value; //
  let purchaseDate = document.querySelector("#alisTarihi").value; //
  let materialName = document.querySelector("#malzemeAdiText").value; //
  let temp = document.querySelector("#olcu");
  let measurementUnit = temp.options[temp.selectedIndex].textContent; //
  temp = document.querySelector("#paraBirimi");
  let currencyUnit = temp.options[temp.selectedIndex].textContent; //
  let quantity = document.querySelector("#miktar").value; //
  let unitPrice = document.querySelector("#birimFiyat").value; //
  let acquiredCompany = document.querySelector("#alinanFirmaText").value; //
  var url =
    "http://localhost:4000/postBuyingData?barcodeNumber=" +
    barcodeNumber +
    "&materialName=" +
    materialName +
    "&acquiredCompany=" +
    acquiredCompany +
    "&purchaseDate=" +
    purchaseDate +
    "&quantity=" +
    quantity +
    "&measurementUnit=" +
    measurementUnit +
    "&unitPrice=" +
    unitPrice +
    "&currencyUnit=" +
    currencyUnit;
  if (barcodeNumber === "") {
    alert("fill the empty fields");
    return;
  }
  if (materialName === "") {
    alert("fill the empty fields");

    return;
  }
  if (acquiredCompany === "") {
    alert("fill the empty fields");
    return;
  }
  if (barcodeNumber === "") {
    alert("fill the empty fields");
    return;
  }
  if (quantity === "") {
    alert("fill the empty fields");
    return;
  }
  if (measurementUnit === "") {
    alert("fill the empty fields");
    return;
  }
  if (unitPrice === "") {
    alert("fill the empty fields");
    return;
  }
  $.ajax({
    url: url,
    method: "post",
    datatype: "json",
    contentType: "Application/json",
    success: function (data) {
      console.log(data);
    },
  });
  document.location.reload(true);
});

function displayTable() {
  var url = "http://localhost:4000/getBuyingData";
  $.ajax({
    url: url,
    method: "get",
    datatype: "json",
    contentType: "Application/json",
    success: function (data) {
      for (datas of data) {
        let li = `
                    <tr>
                      <td>${datas.barcodeNumber}</td>
                      <td>${datas.materialName}</td>
                      <td>${datas.acquiredCompany}</td>
                      <td>${datas.purchaseDate}</td>
                      <td>${datas.quantity}</td>
                      <td>${datas.measurementUnit}</td>
                      <td>${datas.unitPrice}</td>
                      <td>${datas.currencyUnit}</td>
                    </tr>
                `;
        table.insertAdjacentHTML("beforeend", li);
      }
    },
  });
}

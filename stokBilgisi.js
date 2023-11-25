const table = document.querySelector("#tbody");
// displayTable(); bunu kullanacagın zaman server tarafından yorum satırlarını degistirmeyi unutma
function displayTable() {
  var url = "http://localhost:4000/getStock";
  var quantitySell;
  var quantityDiff;
  var quantityBuy;
  $.ajax({
    // şöyle bir şey yapabiliriz. şimdi ben malzemealışa istek yollasam barcode numaralarıyla beraber yazdırsam sonra malzeme satısa istek yollasam. dönen isteklerden barcode numaraları aynı olanların quantity degerini güncellesem.
    url: url,
    method: "get",
    datatype: "json",
    contentType: "Application/json",
    success: function (data) {
      // buy tablosundaki veriler
      for (datas of data) {
        console.log(datas.barcodeNumber + "1. data barkod no ");
        var urlQuantityInfo =
          "http://localhost:4000/getQuantityForStock?barcodeNo=" +
          datas.barcodeNumber;
        quantityBuy = datas.quantity;
        $.ajax({
          url: urlQuantityInfo,
          method: "get",
          datatype: "json",
          contentType: "Application/json",
          success: function (data) {
            // sell tablosundaki veriler.
            if (data == "") return;
            console.log(data[0].quantity);
            quantitySell = data[0].quantity;
            console.log(quantityBuy);
            quantityDiff = quantitySell - quantityBuy;
            console.log(quantityDiff);
            console.log(datas.barcodeNumber + "1. data barkod no ");
          },
        });
        let li = `
            <tr>
                <td>${datas.barcodeNumber}</td>
                <td>${datas.materialName}</td>
                <td>${quantityDiff}</td>
                <td>${datas.measurementUnit}</td>
            </tr>
            `;
        table.insertAdjacentHTML("beforeend", li);
        var urlpostInfo =
          "http://localhost:4000/postStockInfo?barcodeNumber=" +
          datas.barcodeNumber +
          "&materialName=" +
          datas.materialName +
          "&quantity=" +
          quantityDiff +
          "&measurementUnit=" +
          datas.measurementUnit;
        $.ajax({
          url: urlpostInfo,
          method: "post",
          datatype: "json",
          contentType: "Application/json",
          success: function (data) {},
        });
      }
    },
  });
}
displayTable2();

function displayTable2() {
  var url1 = "http://localhost:4000/getStock";
  $.ajax({
    url: url1,
    method: "get",
    dataType: "json",
    dataContent: "Application/java",
    success: function (data) {
      for (datas of data) {
        let li = `
        <tr>
            <td>${datas.barcodeNumber}</td>
            <td>${datas.materialName}</td>
            <td></td>
            <td>${datas.measurementUnit}</td>
        </tr>
        `;
        table.insertAdjacentHTML("beforeend", li);
      }
    },
  });
}
setQuantity();
function setQuantity() {
  var url2 = "http://localhost:4000/getQuantity2";
  $.ajax({
    url: url2,
    method: "get",
    dataType: "json",
    dataContent: "Application/json",
    success: function (data) {
      console.log(data);
    },
  });
}

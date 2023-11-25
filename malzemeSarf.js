const materialName = document.querySelector("#malzemeAdi");
const satisBtn = document.querySelector("#satisBtn");
const table = document.querySelector("#tbody");
loadMaterialNames();
displayTable();
function loadMaterialNames() {
  // barkodları veritabanından cekerek dropboxa yükler
  var url = "http://localhost:4000/getNames";
  $.ajax({
    url: url,
    method: "get",
    dataType: "json",
    contentType: "Application/json",
    success: function (data) {
      for (datas of data) {
        let li = `
                <option>${datas.materialName}</option>
                `;
        materialName.insertAdjacentHTML("beforeend", li);
      }
    },
  });
}

function onSelectChange() {
  // malzeme adi degisikligine gidildiginde calisacak olan fonksiyon
  var malzemeAdi = document.querySelector("#malzemeAdi").value;
  if (malzemeAdi === "Seçim Yapınız") {
    document.querySelector("#barkodNoText").value = "";
    return;
  }
  var url = "http://localhost:4000/getBarcode?malzemeAdi=" + malzemeAdi;
  $.ajax({
    url: url,
    method: "get",
    dataType: "json",
    contentType: "Application/json",
    success: function (data) {
      var barcode = document.querySelector("#barkodNoText");
      barcode.value = data[0].barcodeNumber;
    },
  });
}
// BU BİR NOT malzeme ekleme yaparken barkod numarası aynı olanları direkt birbirine ekle
satisBtn.addEventListener("click", function () {
  // stokta olan miktarla satılacak olan miktarın karsılastırma işlemi VE BİRİME GÖRE DE BAKACAK
  if (
    document.querySelector("#barkodNoText").value == "" ||
    document.querySelector("#malzemeAdi").value == "" ||
    document.querySelector("#satisTarihi").value == "" ||
    document.querySelector("#miktar").value == "" ||
    document.querySelector("#birimFiyat").value == "" ||
    document.querySelector("#paraBirimi").value == ""
  ) {
    alert("boş alanları doldurunuz");
  } else {
    var barcodeNo = document.querySelector("#barkodNoText").value;
    var url = "http://localhost:4000/getQuantity?barcodeNo=" + barcodeNo;
    $.ajax({
      url: url,
      method: "get",
      dataType: "json",
      contentType: "Application/json",
      success: function (data) {
        var quantityInventory = data[0].quantity; // burada stokta kac tane var onun bilgisine ulastık. ona göre satış işlemleri yapılacak eger elimizde az varsa satamayacagız. satabiliyorsak db güncellemesi yapacagız.
        var measurementUnit = document.querySelector("#olcu").value;
        var measurementUnitInventory = data[0].measurementUnit;
        console.log(measurementUnit + " = " + measurementUnitInventory);
        console.log(quantityInventory);
        var quantity = document.querySelector("#miktar").value; // input olarak girilen miktar
        var difference = quantity - quantityInventory;
        if (
          quantity > quantityInventory ||
          measurementUnit != measurementUnitInventory
        ) {
          alert(
            "Stokta yeteri kadar ürün yok veya ölçü birimleri uyuşmuyor! Lütfen kontrol ediniz"
          );
        } else {
          // burada yapacagımız işlem stokta yeteri kadar ürün varsa ve ölcü birimlerinde uyusmazlık yoksa ilk basta html sayfamızdaki tabloya ekliyoruz.
          var productName = document.querySelector("#malzemeAdi").value;
          console.log(productName);
          var barcodeNo = document.querySelector("#barkodNoText").value;
          console.log(barcodeNo);
          var sellingDate = document.querySelector("#satisTarihi").value;
          console.log(sellingDate);
          var quantityNew = document.querySelector("#miktar").value;
          console.log(quantityNew);
          var measurementUnit = document.querySelector("#olcu").value;
          console.log(measurementUnit);
          var unitPrice = document.querySelector("#birimFiyat").value;
          console.log(unitPrice);
          var currencyUnit = document.querySelector("#paraBirimi").value;
          console.log(currencyUnit);
          var urlPost =
            "http://localhost:4000/postSellingData?productName=" +
            productName +
            "&barcodeNo=" +
            barcodeNo +
            "&sellingDate=" +
            sellingDate +
            "&quantityNew=" +
            quantityNew +
            "&measurementUnit=" +
            measurementUnit +
            "&unitPrice=" +
            unitPrice +
            "&currencyUnit=" +
            currencyUnit;

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
      },
    });
  }
});

function displayTable() {
  var url2 = "http://localhost:4000/getSellingData";
  $.ajax({
    url: url2,
    method: "get",
    datatype: "json",
    contentType: "Application/json",
    success: function (data) {
      console.log(data);
      for (datas of data) {
        let li = `
                      <tr>
                        <td>${datas.barcodeNumber}</td>
                        <td>${datas.materialName}</td>
                        <td>${datas.sellingDate}</td>
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

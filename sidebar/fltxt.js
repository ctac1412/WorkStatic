function Sheet1(){
  var _text = ""
  var _doc = {}
  var _data = []

  return {
    text:_text,
    doc:_doc,
    data:_data
  }
}
function sharestring(){
  var _text = ""
  var _doc = {}
  return {
    text:_text,
    doc:_doc,
  }
}



function ParseToDoc(text) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(text, "application/xml");
  return doc
}

function starting() {
  Sheet1.doc = ParseToDoc(Sheet1.text)
  sharestring.doc = ParseToDoc(sharestring.text)


  ReadSheetData(Sheet1.doc.querySelectorAll('worksheet sheetData row c'), Sheet1,sharestring).then(()=>{
  console.log(Sheet1.data);
  console.log(findValue("B3"));

  var fullObj = {}

  var  Applicant = {
  _location: _locationDetected(findValue("B3")),
  Title:findValue("B4"),
  LegalFormID :findValue("B5"),
  ogrn: findValue("B6"),
  DirectorName:findValue("B7"),
  DirectorPost: findValue("B8"),
  DirectorNameGenitive:findValue("B8"),
  Phone:findValue("B9"),
  Email:findValue("B10"),
  CountryID :findValue("B12"),
  RegionID :findValue("B13"),
  Address:findValue("B14"),
  PhisicalAddressTheSame: WordToBoolen(findValue("B16")),
  SecondCountryID :findValue("B17"),
  SecondRegionID :findValue("B18"),
  PhisicalAddress:findValue("B19"),
  Fax:""
}

var  Manufacturer = {
  _location : "Foreign",
  Title:"Моя первая иностарнная компания2",
  Address : "а какой у нее адрес?",
  PhisicalAddress : "",
  CountryID:""

  _location: _locationDetected(findValue("B24")),
  Title:findValue("B22"),
  // LegalFormID :findValue("B5"),
  // ogrn: findValue("B6"),
  // DirectorName:findValue("B7"),
  // DirectorPost: findValue("B8"),
  // DirectorNameGenitive:findValue("B8"),
  // Phone:findValue("B9"),
  // Email:findValue("B10"),
  CountryID :findValue("B24"),
  RegionID :findValue("B25"),
  Address:findValue("B26"),
  PhisicalAddressTheSame: WordToBoolen(findValue("B28")),
  SecondCountryID :findValue("B29"),
  SecondRegionID :findValue("B30"),
  PhisicalAddress:findValue("B31"),
}

fullObj.Applicant = Applicant
fullObj.Manufacturer = Manufacturer
console.log(fullObj);
  });

  // console.log(Sheet1.doc);
  // console.log(Sheet1.doc.querySelectorAll('worksheet').length);
  // console.log(sharestring.doc.querySelectorAll('sst si').length);
  }

  function _locationDetected(str) {
    switch (str.toLowerCase()) {
      case "российская федерация":
      case "казахстан":
      case "республика беларусь":
      case "армения":
      case "киргизия":
          return "Foreign"
      break;
          return "Local"
      default:

    }

  }

  function findValue(cell) {
    var i = Sheet1.data.filter(item=>{
      if (item.cell == cell) {
        return item
      }
    })
      if (i.length > 0) {
        return i[0].value
      } else {
        console.log("Не нашли:", cell);
        return ""
      }
  }

  function WordToBoolen(str) {
    switch (str.toLowerCase()) {
      case "да":
        return true
      break;
      case "нет":
        return true
      break;
      default:

    }
  }

  function ReadSheetData(c,file,valueFile) {
    return Promise.resolve().then(()=>{
    file.data = []
      for (var i = 0; i < c.length; i++) {
        var r = c[i].getAttribute("r")
        var v = ""
        var value = ""
          if(c[i].querySelector("v")){
            if (c[i].hasAttribute("t") && c[i].getAttribute("t") == "s") {
              v = c[i].querySelector("v").innerHTML
              value = valueFile.doc.querySelectorAll('si')[v].textContent
            } else {
              value = c[i].querySelector("v").innerHTML
            }
            file.data.push({
              cell : r,
              index : v,
              value : value
            })
          }
      }
    });
  }

// <row r="3" spans="1:2" x14ac:dyDescent="0.25">
//   <c r="A3" s="11" t="s">
//     <v>25</v>
//   </c>
//   <c r="B3" s="14" t="s">
//     <v>28</v>
//   </c>
// </row>

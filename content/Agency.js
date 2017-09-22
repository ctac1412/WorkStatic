// browser.runtime.onMessage.addListener(request => {
//
//
// });

browser.runtime.onMessage.addListener(listener)

function listener(request) {
  console.log(request);
  return Promise.resolve().then(() => {
    return PostForm()
  });
}




function PostForm() {

  var form = document.querySelector('#document_form');
  var frmd = new FormData(form);
  var _filetext = "Тест файл текста"

  return SetApplicant(frmd)
    .then(() => {
      return SetManufacturer(frmd)
    }).then(() => {
      return SetOther(frmd)
    }).then(() => {
      return fetch(form.action, {
        method: 'POST',
        credentials: 'include',
        body: frmd
      })
    })
    .then((response) => {
      console.log("response.status", response.status);
      // window.location.reload(true);
    })




  function SetManufacturer(data) {
    var obj = {
      _location: "Foreign",
      Title: "Моя первая иностарнная компания2",
      Address: "а какой у нее адрес?",
      PhisicalAddress: "",
      CountryID: ""
    }

    return CountriID("Армения").then((id) => {
      obj.CountryID = id
    }).then(() => {
      return SetContractor(obj)
    }).then((ret) => {
      data.set("ManufacturerTitle", ret.Title)
      data.set("ManufacturerInfo", ret.Info)
      data.set("ManufacturerID", ret.id)
      data.set("CountryId", ret.CountryId)
    })
  }

  function SetApplicant(data) {
    var obj = {
      _location: "Local",
      Address: "Address",
      Phone: '799999999',
      Email: '111@111.ru',
      Fax: "",
      Title: 'Общество с ограниченной ответственностью "Тестовый заявитель" 2',
      ogrn: "1111111111113",
      DirectorNameGenitive: "Фио+руководителя+в+родительном+падеже",
      DirectorName: "Фио+руководителя",
      DirectorPost: "должность+в+родительном+падеже",
      PhisicalAddressTheSame: false,
      PhisicalAddress: "Индеккс+и+адрес+местанахождения",
      LegalFormID: "",
      CountryID: "",
      RegionID: "",
      SecondCountryID: "",
      SecondRegionID: ""
    }

    return LegalFormID("общество с ограниченной ответственностью").then((id) => {
      obj.LegalFormID = id
    }).then(() => {
      return CountriID("Российская Федерация").then((id) => {
        obj.CountryID = id
      })
    }).then(() => {
      return RegionID("Москва").then((id) => {
        obj.RegionID = id
      })
    }).then(() => {
      return CountriID("").then((id) => {
        obj.SecondCountryID = id
      })
    }).then(() => {
      return RegionID("").then((id) => {
        obj.SecondRegionID = id
      })
    }).then(() => {
      return SetContractor(obj)
    }).then((ret) => {
      data.set("ApplicantInitials", [ret.Initials])
      data.set("ApplicantTitle", ret.Title)
      data.set("ApplicantInfo", ret.Info)
      data.set("ApplicantAuthorizedPerson", ret.DirectorPost + " " + ret.DirectorName)
      data.set("ApplicantID", ret.id)
    });
  }

  function ProductType(str) {
    var result = ""
    switch (str) {
      case "expression":
        result = "Part"
        break;
      case "Серийный выпуск":
        result = "Serial"
        break;
      case "Единичное изделие":
        result = "Single"
        break;
      default:
        result = ""
    }
    return result
  }

  function ReglamentIdsContainer(str) {
    if (!window.regscont || window.regscont.length == 0) {
      window.regscont = []
      document.querySelectorAll('#ReglamentIdsContainer option ').forEach(item => {
        window.regscont.push({
          id: item.value,
          text: item.innerHTML.toLowerCase().replace(/(^г\.*)|([\s\.\,\-])/gi, ''),
          fulltext: item.innerHTML
        })
      })
    }
    var i = window.regscont.filter(item => {
      if (item.text.includes(str)) {
        return item
      }
    })
    if (i) {
      return i[0]
    } else {
      return ""
    }
  }

  function schemaid(str) {
    str = str.match(/(^[0-9]{1})/gi)[0]
    if (!window.schemaid || window.schemaid.length == 0) {
      window.schemaid = []
      document.querySelectorAll('#SchemaID option').forEach(item => {
        window.schemaid.push({
          id: item.value,
          text: item.innerHTML.replace(/([^0-9]{1})/gi, ''),
        })
      })
    }
    console.log(window.schemaid)
    var i = window.schemaid.filter(item => {
      if (item.text.includes(str)) {
        return item
      }
    })
    if (i) {
      return i[0]
    } else {
      return ""
    }
  }

  function SetOther(data) {
    console.log("SetOther", _filetext);

    // var   obj = {
    //       "ProductType" : ProductType(""),
    //       "ProductInfo" : "", Наименование+продукци
    //       "ProductIdentification" : "", Сведения+о+продукции,+обеспечивающие+ее+идентификацию+(тип,+марка
    //       "ShippingDocumentation	" : "", Реквизиты+товаросопроводительной+документации+(обязательно
    //       "Part" : "", Партия+(размер+партии+или+заводской+номер+изделия,+
    //       "Invoice	" : "", Инвойс+№
    //       "DeliveryContract	" : "", Номер+и+дата+договора
    //       "ProductIdentificationOther	" : "", Иная+информация,+идентифицирующая
    //       "TNVED	" : "",
    //       "Accordingly	" : "", Стандарт,+стандарт+организации,+технические+условия+или+иной+док
    //
    //       "SchemaID" : "", 49
    //       "SchemaOther" : "",
    //       "SchemaNotPublish" : false,
    //       "ApplicantAgrees" : "", -+выполнять+правила+декларирования;+-+обеспечивать+соответствие+продукции+требованиям+нормативных+документов,+на+соответствие+которым+она+была+задекларирована;+-+маркировать+единым+знаком+обращения+только+ту+продукцию,+которая+соответствует+требованиям+технического+регламента+Евразийского+экономического+союза+«*reglaments*»,+и+на+которую+распространяется+действие+декларации+о+соответствии;-+при+установлении+несоответствия+продукции+требованиям+технического+регламента+Евразийского+экономического+союза+«*reglaments*»+принимать+меры+по+недопущению+реализации+этой+продукции;-+оплатить+все+расходы+по+проведению+регистрации+декларации+о+соответствии;-+при+установлении+несоответствия+продукции+требованиям+нормативно+правовым+актам+принимать+меры+по+недопущению+реализации+этой+продукции.
    //       "AcceptanceReason" : "",
    //       "AcceptanceReasonOther" : "",
    //       "DocumentValidity" : "", 5+лет
    //       "AdditionalInfo" : "",Дополнительные+сведения:
    //       "Note" : ""
    // }

    // "ReglamentsInfo	" : "", [44,52]
    // console.log(ReglamentIdsContainer("004").id)
    // "ReglamentsText	" : "",ТР+ТС+004/2011+"О+безопасности+низковольтного+оборудования",+утвержден+Решением+Комиссии+Таможенного+союза+от+16+августа+2011+года+№+768,+ТР+ТС+007/2011+"О+безопасности+продукции,+предназначенной+для+детей+и+подростков",+утвержден+Решением+Комиссии+Таможенного+союза+от+23+сентября+2011+года+№+797
    // console.log(ReglamentIdsContainer("004").fulltext)

    return
  }

  function SetContractor(obj) {
    var _id
    if (!obj) {
      console.log("Передаете пустой объект");
      throw new crateFormException("Передаете пустой объект")
    }

    return GetContractor(obj).then((id) => {
      _id = id
      return fetch("https://stage-2-docs.advance-docs.ru/Contractor/GetDescription?id=" + id + "&ogrnAtStart=false&splitReg=false&fullInitials=true&version=EA&manufacturer=false", {
        method: 'GET',
        credentials: 'include'
      }).then((response, id) => {
        return response.json()
      });
    }).then((ret) => {
      ret.id = _id
      return ret
    }).catch(error => {
      console.log(error.message);
    });
  }

  function RegionID(str) {
    if (str == "") {
      return Promise.resolve("")
    }
    // console.log("https://stage-2-docs.advance-docs.ru/Region/Search?q=" + str + "&CountryID=1");
    return fetch("https://stage-2-docs.advance-docs.ru/Region/Search?q=" + str + "&CountryID=1", {
      method: 'GET',
      credentials: 'include'
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if (data.length == 0) {
        console.log("RegionID ничего не нашел по запросу:", str);
        return ""
      } else {
        return data[0].id
      }

    });
  }



  function CountriID(str) {
    if (str == "") {
      return Promise.resolve("")
    }
    return fetch("https://stage-2-docs.advance-docs.ru/Contractor/CountriesList?location=Foreign", {
      method: 'GET',
      credentials: 'include'
    }).then((response) => {
      return response.json()
    }).then((data) => {
      var i = data.filter(item => {
        if (item.text.toLowerCase() == str.toLowerCase()) {
          return item
        }
      })
      if (i.length == 0) {
        console.log("CountriID ничего не нашел по запросу:", str);
        return ""
      } else {
        return i[0].id
      }

      // return data[0].id
    });
  }


  function AddContractor(obj) {
    return Promise.resolve().then(() => {
      var d = new FormData();
      switch (obj._location) {
        case "Foreign":
          d.append("Active", true);
          d.append("Id", 0);
          d.append('CreatedAt', '01.01.0001+0:00:00')
          d.append('SubjectType', 'LegalEntity')
          d.append('Location', 'Foreign')
          d.append('CopyParentIdContainer', 0)

          d.append('Title', obj.Title)
          d.append('CountryID', obj.CountryID)
          d.append('Address', obj.Address)
          d.append('PhisicalAddress', obj.PhisicalAddress)
          break;
        case "Local":
          d.append("Active", true);
          d.append("Id", 0);
          d.append('CreatedAt', '01.01.0001+0:00:00')
          d.append('SubjectType', 'LegalEntity')
          d.append('Location', 'Local')
          d.append('CopyParentIdContainer', 0)

          d.append('Title', obj.Title)
          d.append('LegalFormID', obj.LegalFormID)
          d.append('Address', obj.Address)
          d.append('CountryID', obj.CountryID)
          d.append('RegionID', obj.RegionID)
          d.append('Phone', obj.Phone)
          d.append('Email', obj.Email)
          d.append('Fax', obj.Fax)
          d.append('OGRN', obj.ogrn)

          d.append('PhisicalAddressTheSame', obj.PhisicalAddressTheSame)
          d.append('PhisicalAddress', obj.PhisicalAddress)
          d.append('SecondCountryID', obj.SecondCountryID)
          d.append('SecondRegionID', obj.SecondRegionID)

          d.append('DirectorNameGenitive', obj.DirectorNameGenitive)
          d.append('DirectorName', obj.DirectorName)
          d.append('DirectorNameDative', '')
          d.append('DirectorPost', obj.DirectorPost)
          d.append('DirectorReglament', "")

          d.append('RegistrationInfo', '')
          d.append('AccreditationRecNumber', '')
          d.append('RegistrationIssuer', '')
          d.append('RegistrationIssuedDateContainer', '')
          d.append('INN', '')
          d.append('OKPO', '')
          break;
        default:

      }

      return fetch("https://stage-2-docs.advance-docs.ru/Contractor/Update", {
        method: 'POST',
        credentials: 'include',
        body: d
      }).then((response) => {
        return response.text()
      }).then(text => {
        parser = new DOMParser();
        doc = parser.parseFromString(text, "text/html");
        return doc.querySelector('#Id').value
      });
    });

  }

  function GetContractor(obj) {
    var url = ""
    var str = ""
    console.log(obj);
    switch (obj._location) {
      case "Local":
        str = obj.ogrn
        break;
      case "Foreign":
        str = obj.Title
        break;
      default:
    }
    if (!str) {
      throw new crateFormException("Нет данных по компании")
    }
    url = "https://stage-2-docs.advance-docs.ru/Contractor/Search?q=" + str;
    console.log(url);
    return fetch(url, {
      method: 'GET',
      credentials: 'include'
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if (data.length > 0) {
        console.log("return", data[0].id);
        return data[0].id;
      } else {
        return AddContractor(obj).then((id) => {
          console.log("return", id);
          return id
        });
      }
    })
  }
}

function crateFormException(message, value) {
  this.value = value;
  this.message = message;
  this.toString = function() {
    return this.message + " : " + this.value;
  };
};

function LegalFormID(str) {
  if (!window.legarray) {
    window.legarray = []
    window.legarray.push({
      name: "Общество с ограниченной ответственностью",
      id: "1"
    })
    window.legarray.push({
      name: "Общество с дополнительной ответственностью",
      id: "2"
    })
    window.legarray.push({
      name: "Открытое акционерное общество",
      id: "3"
    })
    window.legarray.push({
      name: "Закрытое акционерное общество",
      id: "4"
    })
    window.legarray.push({
      name: "Акционерное общество",
      id: "5"
    })
    window.legarray.push({
      name: "Учреждение",
      id: "6"
    })
    window.legarray.push({
      name: "Государственная корпорация",
      id: "7"
    })
    window.legarray.push({
      name: "Государственная компания",
      id: "8"
    })
    window.legarray.push({
      name: "Прочая некоммерческая организация",
      id: "9"
    })
    window.legarray.push({
      name: "Объединение юридических лиц (ассоциация или союз)",
      id: "10"
    })
    window.legarray.push({
      name: "Некоммерческое партнерство",
      id: "11"
    })
    window.legarray.push({
      name: "Автономная некоммерческая организация",
      id: "12"
    })
    window.legarray.push({
      name: "Представительство или филиал",
      id: "13"
    })
    window.legarray.push({
      name: "Индивидуальный предприниматель",
      id: "14"
    })
    window.legarray.push({
      name: "Автономное учреждение",
      id: "15"
    })
    window.legarray.push({
      name: "Бюджетное учреждение",
      id: "16"
    })
    window.legarray.push({
      name: "Унитарное предприятие",
      id: "17"
    })
    window.legarray.push({
      name: "Производственный кооператив",
      id: "18"
    })
    window.legarray.push({
      name: "Унитарное предприятие, основанное на праве оперативного управления",
      id: "19"
    })
    window.legarray.push({
      name: "Унитарное предприятие, основанное на праве хозяйственного ведения",
      id: "20"
    })
    window.legarray.push({
      name: "Хозяйственное товарищество или общество",
      id: "21"
    })
    window.legarray.push({
      name: "Полное товарищество",
      id: "22"
    })
    window.legarray.push({
      name: "Крестьянское (фермерское) хозяйство",
      id: "23"
    })
    window.legarray.push({
      name: "Товарищество на вере",
      id: "24"
    })
    window.legarray.push({
      name: "Частное учреждение",
      id: "25"
    })
    window.legarray.push({
      name: "Садоводческое, огородническое или дачное некоммерческое товарищество",
      id: "26"
    })
    window.legarray.push({
      name: "Объединение крестьянских (фермерских) хозяйств",
      id: "27"
    })
    window.legarray.push({
      name: "Орган общественной самодеятельности",
      id: "28"
    })
    window.legarray.push({
      name: "Территориальное общественное самоуправление",
      id: "29"
    })
    window.legarray.push({
      name: "Общественная или религиозная организация (объединение)",
      id: "30"
    })
    window.legarray.push({
      name: "Общественное движение",
      id: "31"
    })
    window.legarray.push({
      name: "Потребительский кооператив",
      id: "32"
    })
    window.legarray.push({
      name: "Простое товарищество",
      id: "33"
    })
    window.legarray.push({
      name: "Фонд",
      id: "34"
    })
    window.legarray.push({
      name: "Паевой инвестиционный фонд",
      id: "35"
    })
    window.legarray.push({
      name: "Товарищество собственников жилья",
      id: "36"
    })
    window.legarray.push({
      name: "Иное неюридическое лицо",
      id: "38"
    })
  }
  var i = window.legarray.filter(item => {
    if (item.name.toLowerCase() == str.toLowerCase()) {
      return item
    }
  })
  return Promise.resolve(i[0].id)
}

// // выбираем целевой элемент
// var target = document.body;
//
// // создаём экземпляр MutationObserver
// var observer = new MutationObserver(function(mutations) {
//   mutations.forEach(function(mutation) {
//
//     if (mutation.target.className == "modal-open") {
//
//     console.log(mutation);
//           var a = document.createElement('a');
//           a.href  = "javascript:void(0);"
//           a.clasName = "text-link add-table-row add-link"
//           a.innerHTML = '<span class="item-text">Сгенирировать код API</span>'
//           a.onclick  = generate
//           a.style.marginleft = "1px"
//           if (document.querySelector('#Keyword')) {
//               document.querySelector('#Keyword').parentElement.appendChild(a)
//           }
//     }
//   });
// });
//
// // конфигурация нашего observer:
// var config = { attributes: true };
// // передаём в качестве аргументов целевой элемент и его конфигурацию
// observer.observe(target, config);
//
// // позже можно остановить наблюдение
//
// function generate()
// {
//     var len = 10
//     var ints =[0,1,2,3,4,5,6,7,8,9];
//     var chars=['a','b','c','d','e','f','g','h','j','k','l','m','n','o','p','r','s','t','u','v','w','x','y','z'];
//     var out='';
//
//       for(var i=0;i<len;i++){
//           var ch=Math.random(1,2);
//           if(ch<0.5){
//              var ch2=Math.ceil(Math.random(1,ints.length)*10);
//              out+=ints[ch2];
//           }else{
//              var ch2=Math.ceil(Math.random(1,chars.length)*10);
//              out+=chars[ch2];
//           }
//       }
//       document.querySelector('#Keyword').value = out
// }

var temdoc = {}

function Reglaments(str) {
  var str = str.match(/[\d\/]{8}/gi)
  if (!window.Reglaments || window.Reglaments.length == 0) {
    window.Reglaments = []
    document.querySelectorAll('#ReglamentIdsContainer option').forEach(item => {
      window.Reglaments.push({
        id: item.value,
        text: item.innerHTML
      })
    })
  }

  var i = window.Reglaments.filter(item => {
    var res = item.text.match(/[\d\/]{8}/gi)

    if (res && res[0].includes(str)) {
      return item
    }
  })

  if (i.length >= 1) {
    return i
  } else {

    return ""
  }
}




function testget() {
  function ApplicantCountryIdContainer(str) {
    var str = str
    if (!window.ApplicantCountryIdContainer || window.ApplicantCountryIdContainer.length == 0) {
      window.ApplicantCountryIdContainer = []
      document.querySelectorAll('#ApplicantCountryIdContainer option').forEach(item => {
        if (item.innerHTML.match(/[A-Z]{2}/gi) !== null) {
          window.ApplicantCountryIdContainer.push({
            id: item.value,
            text: item.innerHTML.match(/[A-Z]{2}/gi)[0]
          })
        }
      })
    }

    var i = window.ApplicantCountryIdContainer.filter(item => {
      if (item.text.includes(str)) {
        return item
      }
    })

    if (i.length >= 1) {
      return i[0].id
    } else {
      return ""
    }
  }

  function getRegionID(text) {
    var url = "https://getnumber.me/Region/Search?q=" + text + "&CountryID=170&_=1506677995045"
    console.log(url);
    return fetch(url, {
      method: 'GET',
      credentials: 'include'
    }).then((response) => {
      return response.json()
    }).then((text) => {
      return text[0].id
    });
  }


  browser.storage.local.get("tempDoc").then((obj) => {
    temdoc = obj.tempDoc
  }).then(() => {
    var form = document.querySelector('#form0');
    return FormtoObject(form)
  }).then((obj) => {
    obj.ApplicantOGRN = temdoc.Applicant["OGRN"]
    obj.ApplicantTitle = temdoc.Applicant.Title
    obj.ApplicantPhone = temdoc.Applicant.Phone
    obj.ApplicantEmail = temdoc.Applicant.Email
    obj.ApplicantAddress = temdoc.Applicant.Address
    obj.ApplicantCountryIdContainer = ApplicantCountryIdContainer(temdoc.Applicant.CountryInfo)
    obj.ManufacturerAddress = temdoc.Manufacturer.Address
    obj.ManufacturerTitle = temdoc.Manufacturer.Title
    obj.ProductIdentification = temdoc.ProductIdentification
    obj.ProductInfo = temdoc.ProductInfo
    obj.ManufacturerCountryIdContainer = ApplicantCountryIdContainer(temdoc.Manufacturer.CountryInfo)
    obj.RequestLab = true
    obj.RequestLabIndicators = "по определяющим показателям"
    return getRegionID(temdoc.Applicant.RegionIDInfo).then((id) => {
      obj.ApplicantRegionIdContainer = id
    }).then(() => {
      return (obj);
    })
  }).then((obj) => {
    var form = document.querySelector('#form0');
    d = new FormData(form);
    for (var key in obj) {
      console.log(key, obj[key]);
      d.set(key, obj[key]);
    }


    // fetch("obj", {
    //   method: 'POST',
    //   credentials: 'include',
    //   body: d
    // }).then((response) => {
    //   console.log("response.status", response.status);
    // });
  });
}
browser.runtime.onMessage.addListener(listener)

function listener(request) {
  switch (request.action) {
    case "testget":
      testget()
      break;
    default:
  }
}

function FormtoObject(formelement) {
  var frmd = new FormData(formelement);
  var eArr = frmd.entries();
  var resarr = {}
  frmd.forEach(() => {
    var item = eArr.next().value
    resarr[item[0]] = item[1]
  })
  return resarr
}

function getFormData(url, formselector) {
  console.log(url);
  return fetch(url, {
    method: 'GET',
    credentials: 'include'
  }).then((response) => {
    return response.text()
  }).then((text) => {
    var parser = new DOMParser()
    var doc = parser.parseFromString(text, "text/html");
    var ApplicantID = {}
    var form = doc.querySelector('#' + formselector);
    return FormtoObject(form)
  })
}

function Sheet1() {
  var _text = ""
  var _doc = {}
  var _data = []

  return {
    text: _text,
    doc: _doc,
    data: _data
  }
}

function sharestring() {
  var _text = ""
  var _doc = {}
  return {
    text: _text,
    doc: _doc,
  }
}

function workbook() {
  var _text = ""
  var _doc = {}
  return {
    text: _text,
    doc: _doc,
    data: _data
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
  workbook.doc = ParseToDoc(workbook.text)
  workbook.data = Array.prototype.slice.call(workbook.doc.querySelectorAll("definedName"))


  ReadSheetData(Sheet1.doc.querySelectorAll('worksheet sheetData row c'), Sheet1, sharestring).then(() => {

    var fullObj = {}
    // _locationDetected(),
    // PhisicalAddressTheSame: WordToBoolen(""),

    workbook.data = workbook.data.filter(item => {
      if (item.textContent.includes("Лист1")) {
        return item
      }
    }).map(item => {
      var n, v = "",
        i = []
      n = item.getAttribute("name")

      switch (n) {
        case "Reglaments":
          i = item.textContent.match(/\$[A-z]{1,3}\$[0-9]*/ig)
          i.forEach((el, index, arr) => {
            arr[index] = el.replace(/\$/ig, "")
          })
          i = mkRange(i[0] + ":" + i[1])[0]
          v = []
          i.forEach((el, index) => {
            v.push(findValue(el))
          })
          break;
        default:
          i = item.textContent.match(/\$[A-z]{1,3}\$[0-9]*/ig)[0].replace(/\$/ig, "")
          v = findValue(i)
      }
      var element = {
        name: n,
        index: i,
        value: v
      }
      return element

    })

    fullObj.Applicant = {}
    for (var key in workbook.data) {
      var res = workbook.data[key].name.split('.');
      if (res.length == 1) {
        fullObj[workbook.data[key].name] = workbook.data[key].value
      } else if (res.length == 2) {
        if (!fullObj[res[0]]) {
          fullObj[res[0]] = {}
        };
        fullObj[res[0]][res[1]] = workbook.data[key].value
      }

    }
    return fullObj
  }).then((fullObj) => {
    return browser.tabs.query({
      currentWindow: true,
      active: true
    }).then((tabs) => {
      return browser.tabs.sendMessage(
        tabs[0].id,
        Object.assign({
          fullObj: fullObj
        }, {
          action: "STARTPOST"
        })
      )

    }).then(allmsg => {
      if (allmsg) {
        AddMessage(allmsg)
      }

    }).catch((err) => {
      console.log(err.message);
    })
  })
}



function findValue(cell) {
  var i = Sheet1.data.filter(item => {
    if (item.cell == cell) {
      return item
    }
  })
  if (i.length > 0) {
    return i[0].value
  } else {
    return ""
  }
}

function mkRange(str) {
  var x, y, ret = [];
  var res = /(\D+)(\d+):(\D+)(\d+)/.exec(str);
  if (!res) {
    res = /(\D+)(\d+)/.exec(str);
    return [
      [res[0]]
    ];
  }
  var x1 = ((res[1] <= res[3]) ? res[1] : res[3]).charCodeAt(0);
  var x2 = ((res[1] <= res[3]) ? res[3] : res[1]).charCodeAt(0);
  var y1 = (res[2] <= res[4]) ? res[2] : res[4];
  var y2 = (res[2] <= res[4]) ? res[4] : res[2];

  for (x = x1; x <= x2; x++) {
    var arr = [];
    for (y = y1; y <= y2; y++) {
      arr.push(String.fromCharCode(x) + y.toString());
    };
    ret.push(arr);
  }
  return ret;
}


function ReadSheetData(c, file, valueFile) {
  return Promise.resolve().then(() => {
    file.data = []
    for (var i = 0; i < c.length; i++) {
      var r = c[i].getAttribute("r")
      var v = ""
      var value = ""
      if (c[i].querySelector("v")) {
        if (c[i].hasAttribute("t") && c[i].getAttribute("t") == "s") {
          v = c[i].querySelector("v").innerHTML
          value = valueFile.doc.querySelectorAll('si')[v].textContent
        } else {
          value = c[i].querySelector("v").innerHTML
        }
        file.data.push({
          cell: r,
          index: v,
          value: value
        })
      }
    }
  });
}

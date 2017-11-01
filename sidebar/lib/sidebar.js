var $ = require('jquery');
class Organ {
  constructor(base, code, key, info, data = {}) {
    this.base = base;
    this.code = code;
    this.key = key;
    this.info = info;
  }


}
refresh()

function refresh() {
document.querySelector('#time').innerHTML= "...";


  let _state = {}
  let Organs = []
  let allPromise = []
  browser.storage.sync.get('organs').then((res) => {
    if (res.organs) {
      res.organs.forEach(item => {
        Organs.push(new Organ(item.base, item.code, item.key, item.info))
      })
    }
  }).then(()=>{

    Organs.forEach((item, index, arr) => {
      allPromise.push(Refresh(item, index, arr))
    })
    Promise.all(allPromise).then((obj) => {
      let body =
        `<table class="table OwnSize">
        <thead>
        <tr>
              <th></th>
                    <th>ДС</th>
                    <th>СС</th>
                    <th>Г.р.</th>
                    <th>&Sigma;</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr class="NameRow" >
                  <td  colspan="5" align="center">Репликации</td>
                  <td ></td>
                  </tr>
                    ${AddRowRep(Organs)}
              <tr>
              <td colspan="5" align="center">Заявления</td>
              <td ></td>
              </tr>

            ${AddRowZaj(Organs)}
            </tbody>
            </table>        `
      document.querySelector('#Info').innerHTML= body
      document.querySelector('#time').innerHTML=  new Date();
      document.querySelector('#Refresh').addEventListener("click", function() {
         refresh()
      })
    });
  });



}

function AddRowCount(item) {
  let body = `
  <tr>
  <td colspan="6" align="center" >${str}</td>
  </tr>`
  return body
}

function AddRowZaj(str) {
  let body = ``
  let summDS = 0
  let summSS = 0
  let summGhostR = 0
  str.forEach((item, index, arr) => {
    body += `<tr>
             <td class = "test">${item.info}</td>
             <td class = "test">${item.DTREA.statements}</td>
             <td class = "test" >${item.STREA.statements}</td>
             <td class = "test" >${item.DGSTR.statements}</td>
             <td class = "test" >${item.DTREA.statements + item.STREA.statements +item.DGSTR.statements}</td>
             <td class = "test" ></td>
            </tr>`
    summDS += parseInt(item.DTREA.statements)
    summSS += parseInt(item.STREA.statements)
    summGhostR += parseInt(item.DGSTR.statements)
  })
  body += `<tr>
           <td>&Sigma;</td>
           <td>${summDS}</td>
           <td>${summSS}</td>
           <td>${summGhostR}</td>
           <td>${summDS + summSS +summGhostR}</td>
           <td></td>
  </tr>`
  return body
}

function AddRowRep(str) {
  let body = ``
  let summDS = 0
  let summSS = 0
  let summGhostR = 0
  str.forEach((item, index, arr) => {
    body += `<tr>
             <td>${item.info}</td>
             <td>${item.DTREA.replication}</td>
             <td>${item.STREA.replication}</td>
             <td>${item.DGSTR.replication}</td>
             <td>${item.DTREA.replication + item.STREA.replication +item.DGSTR.replication}</td>
             <td class = "test" ></td>
            </tr>`
    summDS += parseInt(item.DTREA.replication)
    summSS += parseInt(item.STREA.replication)
    summGhostR += parseInt(item.DGSTR.replication)
  })
  body += `<tr>
           <td>&Sigma;</td>
           <td>${summDS}</td>
           <td>${summSS}</td>
           <td>${summGhostR}</td>
           <td>${summDS + summSS +summGhostR}</td>
           <td></td>
  </tr>`

  return body
}

function Refresh(item, index, arr) {
  var url = 'https://' + item.base + '.advance-docs.ru/api/v1//rsa_status/index?' +
    'agency_code=' + encodeURIComponent(item.code) +
    '&agency_keyword=' + encodeURIComponent(item.key)
  return fetch(url, {
    method: 'GET',
    credentials: 'include'
  }).then((response) => {
    return response.json().then(obj => {
      if (obj.status == "success") {
        arr[index].DTREA = obj.data.DTREA
        arr[index].DGSTR = obj.data.DGSTR
        arr[index].DGSTR.statements = 0
        arr[index].STREA = obj.data.STREA
      } else {
        arr[index].DTREA = {
          statements: "Ошибка соединения",
          replication: "Ошибка соединения"
        }
        arr[index].STREA = {
          statements: "Ошибка соединения",
          replication: "Ошибка соединения"
        }
        arr[index].DGSTR = {
          statements: "Ошибка соединения",
          replication: "Ошибка соединения"
        }
      }
    })
  });
}

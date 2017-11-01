class Organ {
  constructor(base, code, key, info) {
    this.base = base;
    this.code = code;
    this.key = key;
    this.info = info;
  }
}

function saveOptions(e) {

  let Organs=[]
  let i = document.querySelectorAll('.OrganItem');
  let res= ""
  i.forEach(item =>{
  let base=item.querySelector('#base').value
  let code=item.querySelector('#code').value
  let key=item.querySelector('#key').value
  let info=item.querySelector('#info').value

  if (base && code && key && info){
    Organs.push(new Organ(base, code, key, info))
  };

})

browser.storage.sync.set({
  organs: Organs
});

}

function restoreOptions() {
  browser.storage.sync.get('organs').then((res) => {
    if (res.organs) {
      res.organs.forEach(item => {
        document.querySelector('form').appendChild(OrganHtml({
          base: item.base,
          code: item.code,
          key: item.key,
          info: item.info
        }));
      })
    }
  });
}

function OrganHtml({base = "", code = "", key = "", info = ""}) {
  let i = document.createElement("div")
  i.className = "OrganItem"
  i.style.border = "1px solid black"
  i.style.display = "inline-block"
  i.style.margin = "3px"
  i.innerHTML = `<div style="text-align:center" >Данные органа</div>
                  <div><label style="width:70px;display:inline-block;text-align:center;">База: </label><input style="margin-right:3px;" type="text" id = "base" value="${base}"></input></div>
                  <div><label style="width:70px;display:inline-block;text-align:center;">Код Органа: </label><input style="margin-right:3px;" type="text" id = "code" value="${code}" ></input></div>
                  <div><label style="width:70px;display:inline-block;text-align:center;">Ключ Апи: </label><input style="margin-right:3px;" type="text" id = "key" value="${key}" ></input></div>
                  <div><label style="width:70px;display:inline-block;text-align:center;">Инфо: </label><input style="margin-right:3px;" type="text" id = "info" value="${info}" ></input></div>`
  return i
}

function AddOrgan() {
  document.querySelector('form').appendChild(OrganHtml({}));
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#AddOrgan").addEventListener("click", AddOrgan);

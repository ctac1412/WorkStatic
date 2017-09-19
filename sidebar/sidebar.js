browser.tabs.onActivated.addListener(updateContent);
function updateContent() {
  console.log("загрузились");

  // browser.tabs.query({windowId: ActiveTab(), active: true})
  //    .then((tabs) => {
  //      console.log(tabs[0].url);
  //      return
  // })
}

document.querySelector('#s_save').addEventListener('click', function(e) {
  browser.tabs.query({windowId: ActiveTab(), active: true})
     .then((tabs) => {
      //  browser.tabs.reload();

      //  d = new FormData();
      //  d.append('Key',"Value");
      //
      //  fetch(tabs[0].url,{
      //    method : 'GET',
      //    credentials : 'include',
      //    body : d
      //  }).then((response)=>{
      //    console.log("response.status", response.status);
      //  });
      //  console.log();

      browser.tabs.sendMessage(
            tabs[0].id,{
            message : "Hello"}
          ).then((response)=>{
            // response.querySelector('#ProductInfo').value;
          // console.log(response);
          });

  })
});


// btn2.onclick = function(event){
//    if (document.querySelector("#btnSave") == null) {
//      alert("Ни одна кнопка 'Сохранить' не найдена.")
//    } else {
//      document.querySelector("#btnSave").click()
//      change_status = false
//
//    };
//  };



function ActiveTab() {
  browser.windows.getCurrent({populate: true}).then((windowInfo) => {
    return  windowInfo.id;
  });
}

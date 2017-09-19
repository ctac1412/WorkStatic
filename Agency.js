// browser.runtime.onMessage.addListener(request => {
//
//
// });

browser.runtime.onMessage.addListener(listener)

function listener(request) {

  PostForm()
  console.log(request);
  return Promise.resolve();
}

function PostForm(){

// var frmd = new FormData();
// frmd.append('Id',"1")
// // frmd.append('ClaimId',document.querySelector("#ClaimId").value)
// // frmd.append('DocumentId',document.querySelector("#DocumentId").value)
// // frmd.append('DocumentTemplateId',document.querySelector("#DocumentTemplateId").value)
// // frmd.append('ParentLinkId',document.querySelector("#ParentLinkId").value)
// // frmd.append('StatementView',document.querySelector("#StatementView").value)
//
// console.log(frmd);
// // Display the keys
// for (var key of frmd.keys()) {
//    console.log(key);
// }


var frmd = new FormData();
frmd.append('Id',document.querySelector("#Id").value)
console.log(document.querySelector("#Id").value);
// frmd.append('ClaimId',document.querySelector("#ClaimId").value)
// frmd.append('DocumentId',document.querySelector("#DocumentId").value)
// frmd.append('DocumentTemplateId',document.querySelector("#DocumentTemplateId").value)
// frmd.append('ParentLinkId',document.querySelector("#ParentLinkId").value)
// frmd.append('StatementView',document.querySelector("#StatementView").value)

console.log(frmd);
// Display the keys
for (var key of frmd.keys()) {
   console.log(key);
}


GetConttractor(frmd).then((obj)=>{
console.log(frmd);
console.log(obj);
}).then((obj)=>{
  return  fetch(document.location,{
    method : 'POST',
    credentials : 'include',
    body : frmd
  })
})
.then((response)=>{
  console.log("response.status", response.status);
}).then(()=>{
// window.location.reload(true);
});

}


function GetConttractor(data) {
  console.log(data);
return  FindContractor ("2223434342214").then((obj)=>{
    if (obj.length > 0) {
      return obj[0].id;
    } else {
      return AddContractor()
    }
  }).then((id)=>{
    return fetch("https://stage-2-docs.advance-docs.ru/Contractor/GetDescription?id=" + id + "&ogrnAtStart=false&splitReg=false&fullInitials=true&version=EA&manufacturer=false",{
       method : 'GET',
       credentials: 'include'
     }).then((response)=>{
       return response.json()
     });
  }).then((ret)=>{
    console.log(ret);
    data.append("ApplicantInitials", ret.Initials)
    data.append("ApplicantTitle", ret.Title )
    data.append("ApplicantInfo", ret.Info )
    data.append("ApplicantAuthorizedPerson", ret.DirectorPost + " " + ret.DirectorName  )
    data.append("ApplicantInitials", ret.DirectorName)
    data.append("ApplicantInitials", ret.DirectorName)
    return data
  });
}

 function AddContractor() {
   var id = 0
   return id
 }

function FindContractor (ogrn) {

  return fetch("https://stage-2-docs.advance-docs.ru/Contractor/Search?q=" + ogrn,{
    method : 'GET',
    credentials: 'include'
  }).then((response)=>{
      return response.json()
    });
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

document.body.style.border = "5px solid red";

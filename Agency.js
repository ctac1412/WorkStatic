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


var form=document.querySelector('#document_form');

var frmd = new FormData(form);

// frmd.append('Id',document.querySelector("#Id").value)
// frmd.append('ClaimId',document.querySelector("#ClaimId").value)
// frmd.append('DocumentId',document.querySelector("#DocumentId").value)
// frmd.append('DocumentTemplateId',document.querySelector("#DocumentTemplateId").value)
// frmd.append('ParentLinkId',document.querySelector("#ParentLinkId").value)
// frmd.append('StatementView',document.querySelector("#StatementView").value)


SetContractor(frmd).then(()=>{

  })
  .then(()=>{
    return  fetch(form.action,{
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


function SetManufacturer() {
  // ManufacturerTitle	test+1
  // ManufacturerID	11
  // ManufacturerInfo	Место+нахождения+и+адрес+места…rk,+Соединенные
  // ManufacturerAffiliates
  // CountryId	1
}

function SetApplicant() {

  SetContractor(data,"1111111111113")
  data.set("ApplicantID", id)
}



function SetContractor(data,ogrn,name) {
  return  GetContractor({ogrn:ogrn, name:name}).then((id)=>{
    

    return fetch("https://stage-2-docs.advance-docs.ru/Contractor/GetDescription?id=" + id + "&ogrnAtStart=false&splitReg=false&fullInitials=true&version=EA&manufacturer=false",{
       method : 'GET',
       credentials: 'include'
     }).then((response,id)=>{
       return response.json()
     });
  }).then((ret)=>{
    console.log(ret);
    console.log("ApplicantInitials", [ret.Initials])
    console.log("ApplicantInfo", ret.Info )
    console.log("ApplicantTitle", ret.Title )
    console.log("ApplicantAuthorizedPerson", ret.DirectorPost + " " + ret.DirectorName  )
    data.set("ApplicantInitials", [ret.Initials])
    data.set("ApplicantTitle", ret.Title )
    data.set("ApplicantInfo", ret.Info )
    data.set("ApplicantAuthorizedPerson", ret.DirectorPost + " " + ret.DirectorName  )
    return
  }).catch(error => {

									console.log(error.message);
								});
}


 function AddContractor() {
   var id = 0
   return id
 }

 function crateFormException(message, value) {
   this.value = value;
   this.message = message;
   this.toString = function() {
     return this.message + " : " + this.value;
   };
 };

function GetContractor (obj) {
  var url = ""
  console.log(obj);

  if (!obj) { throw new crateFormException("Нет данных по компании") }

  if (obj.name) url = "https://stage-2-docs.advance-docs.ru/Contractor/Search?q=" + obj.name;
  if (obj.ogrn) url = "https://stage-2-docs.advance-docs.ru/Contractor/Search?q=" + obj.ogrn;

  console.log(url);
    return fetch(url,{
      method : 'GET',
      credentials: 'include'
      }).then((response)=>{
        return response.json()
      }).then((obj))=>{
        if (obj.length > 0) {
          return obj[0].id;
        } else {
          return AddContractor()
        }
      })
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

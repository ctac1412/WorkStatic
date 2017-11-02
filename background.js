// browser.browserAction.onClicked.addListener(()=>{
//   pluginLogic.onClick();
// });
//
// browser.runtime.onMessage.addListener((request, sender, sendResponse)=>{
//   pluginLogic.doAction(request.action,request.data);
//   sendResponse({done:true});
// });
// web-ext --keep-profile-changes -p="C:\Users\Dep\AppData\Roaming\Mozilla\Firefox\Profiles\hg9ksw2o.dev" run
// SetStorage()
// function SetStorage() {

function GetStorage(str) {
  return browser.storage.local.get(str).then((data)=>{
return data
 })
}
function SetStorage(str) {
  return browser.storage.local.set(str)
}

function MyMode() {
  if (browser.storage.sync) {
    return 1
  }else {
    return 0
  }
}

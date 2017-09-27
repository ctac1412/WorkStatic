function AddMessage(object) {
  // success,info,warning,danger
  document.querySelector('#message-container').innerHTML = "<h4>Отчет о загрузке:</h4>"
  object.forEach(item => {
    var nmsg = document.createElement("div")
    nmsg.className = 'alert alert-' + item.class + ' alert-dismissable'
    nmsg.innerHTML = '<a href="#" class="close" data-dismiss= "alert" aria-label="close">×</a>' + item.message
    document.querySelector('#message-container').appendChild(nmsg)
  })
}

browser.runtime.onMessage.addListener(notify);

browser.tabs.onActivated.addListener(updateContent);
browser.tabs.onUpdated.addListener(updateContent);

function updateContent() {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then((tabs) => {
    return browser.tabs.sendMessage(
      tabs[0].id,
      Object.assign({}, {
        action: "CheckBtn"
      })
    )
  })
}

function notify(e) {
  if (e.sidebar) {
    switch (e.action) {
      case "SaveOn":
        var i = document.querySelector("#Save")
        if (i.hasAttribute("disabled")) {
          i.removeAttribute("disabled")
        }
        break;
      case "SaveOff":
        document.querySelector("#Save").setAttribute("disabled", "disabled")
        break;
      default:

    }
  }
}

function getFileParam() {
  try {
    var file = document.getElementById('file-input').files[0];

    if (file) {
      var fileSize = 0;

      if (file.size > 1024 * 1024) {
        fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
      } else {
        fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
      }

      document.getElementById('file-name1').innerHTML = 'Имя: ' + file.name;
      document.getElementById('file-size1').innerHTML = 'Размер: ' + fileSize;

      if (/\.(jpe?g|bmp|gif|png)$/i.test(file.name)) {
        var elPreview = document.getElementById('preview1');
        elPreview.innerHTML = '';
        var newImg = document.createElement('img');
        newImg.className = "preview-img";

        if (typeof file.getAsDataURL == 'function') {
          if (file.getAsDataURL().substr(0, 11) == 'data:image/') {
            newImg.onload = function() {
              document.getElementById('file-name1').innerHTML += ' (' + newImg.naturalWidth + 'x' + newImg.naturalHeight + ' px)';
            }
            newImg.setAttribute('src', file.getAsDataURL());
            elPreview.appendChild(newImg);
          }
        } else {
          var reader = new FileReader();
          reader.onloadend = function(evt) {
            if (evt.target.readyState == FileReader.DONE) {
              newImg.onload = function() {
                document.getElementById('file-name1').innerHTML += ' (' + newImg.naturalWidth + 'x' + newImg.naturalHeight + ' px)';
              }

              newImg.setAttribute('src', evt.target.result);
              elPreview.appendChild(newImg);
            }
          };

          var blob;
          if (file.slice) {
            blob = file.slice(0, file.size);
          } else if (file.webkitSlice) {
            blob = file.webkitSlice(0, file.size);
          } else if (file.mozSlice) {
            blob = file.mozSlice(0, file.size);
          }
          reader.readAsDataURL(blob);
        }
      }
    }
  } catch (e) {
    var file = document.getElementById('file-input').value;
    file = file.replace(/\\/g, "/").split('/').pop();
    document.getElementById('file-name1').innerHTML = 'Имя: ' + file;
  }
}

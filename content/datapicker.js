var div = document.createElement("div");
div.innerHTML = '<label for="SelectedStartDate">По дате выдачи  с -</label>'
div.className = "input-field"

var input = document.createElement("input");
input.className = "form-control datepicker hasDatepicker"
input.id = "SelectedStartDate"
input.name = "SelectedStartDate"
input.value = ""
input.type = "text"


div.appendChild(input)
document.querySelector('.wrapper').appendChild(div)


console.log("Тута");

input.addEventListener("keydown", function(t) {

  console.log(t.type);
  if (typeof i !== undefined && i.event.triggered !== t.type) return i.event.dispatch.apply(n, arguments)
})
input.addEventListener("focus", function(t) {

  console.log($(this.event.triggered));
  console.log(t.type);
  if (typeof i !== undefined && i.event.triggered !== t.type) return i.event.dispatch.apply(n, arguments)
})
input.addEventListener("keypress", function(t) {

  console.log(t.type);
  if (typeof i !== undefined && i.event.triggered !== t.type) return i.event.dispatch.apply(n, arguments)
})
input.addEventListener("keyup", function(t) {

  console.log(t.type);
  if (typeof i !== undefined && this.event.triggered !== t.type) return i.event.dispatch.apply(n, arguments)
})

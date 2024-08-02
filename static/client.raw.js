/* eslint-disable no-var, vars-on-top, eqeqeq */

var dates = document.querySelectorAll('td.date')
for (var i = 0; i < dates.length; i++) {
  var date = dates[i]
  if (date.innerHTML != '\u2014') {
    var utcDate = new Date(date.innerHTML)

    var year = utcDate.getFullYear()
    var month = String(utcDate.getMonth() + 1).padStart(2, '0')
    var day = String(utcDate.getDate()).padStart(2, '0')
    var hours = String(utcDate.getHours()).padStart(2, '0')
    var minutes = String(utcDate.getMinutes()).padStart(2, '0')
    var seconds = String(utcDate.getSeconds()).padStart(2, '0')

    date.innerHTML = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
}

(function () {
  function append (message) {
    if (document.body) {
      document.body.append(message)
    }
    else {
      setTimeout(append, 100, message)
    }
  }


  function message (text, color, $message) {
    $message = document.createElement('p')
    $message.style.color = color || '#000000'
    $message.innerText = text
    return $message
  }

  function log (color) {
    return function (elementToLog) {
      var cast = typeof elementToLog === 'function'
        ? message(elementToLog.toString(), color)
        : message(JSON.stringify(elementToLog), color)

      append(cast)
    }
  }

  window.console.log = log('#13770a')
  window.console.error = log('#ff0000')
  window.onerror = function (msg, url, lineNo, columnNo, error) {
    var string = msg.toLowerCase()
    var substring = 'script error'

    if (string.indexOf(substring) > -1){
      append('Script Error: See Browser Console for Detail')
    } else {
      var message = [
        'Message: ' + msg,
        'URL: ' + url,
        'Line: ' + lineNo,
        'Column: ' + columnNo,
        'Error object: ' + JSON.stringify(error)
      ].join(' - ')

      append(message)
    }

    return false
  }
}) ()

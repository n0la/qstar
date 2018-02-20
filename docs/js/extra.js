'use strict'

;(function () {
  if (window.location.href.indexOf('/settings/stalker/equipment/') > -1) {
    var hashUpdated = function hashUpdated () {
      var hash = window.location.hash

      var span = document.getElementById(hash.substr(1))
      if (previousTr) {
        previousTr.classList.remove('targetted')
      }
      if (!span) return

      var tr = span.parentNode.parentNode
      if (tr.tagName !== 'TR') return
      tr.classList.add('targetted')
      previousTr = tr
      cartridges.scrollIntoView(true)
      window.scrollBy(0, -60) // offset for topnav
    }

    var previousTr = void 0
    var cartridges = document.querySelector('h3#cartridges')

    hashUpdated()
    window.onhashchange = hashUpdated
  }

  var starts = document.querySelectorAll('.col-layout-start')
  var ends = document.querySelectorAll('.col-layout-end')

  if (starts.length !== ends.length) {
    console.warn('col-layout not properly started/terminated.')
    return
  }

  var _loop = function _loop (i, len) {
    var start = starts[i]
    var end = ends[i]

    var wrapper = document.createElement('div')
    wrapper.classList.add('cols-wrapper')
    if (i % 2) {
      wrapper.classList.add('cols-wrapper-right')
    }

    var element = start
    var nodes = []
    while ((element = element.nextElementSibling) !== end) {
      nodes.push(element)
    }

    var divs = []
    var div = void 0
    nodes.forEach(function (node) {
      if (node.nodeName.search(/H\d/i) > -1) {
        div = document.createElement('div')
        divs.push(div)
        div.appendChild(node)
      }
      if (div) div.appendChild(node); else wrapper.appendChild(node)
    })
    console.log(divs)

    divs.forEach(function (div) {
      wrapper.appendChild(div)
    })

    var parent = element.parentNode
    parent.insertBefore(wrapper, element)
  }

  for (var i = 0, len = starts.length; i < len; i++) {
    _loop(i, len)
  }
})()

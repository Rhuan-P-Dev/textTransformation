const loc    = window.document.location
const socket = io.connect(loc.origin)

var runChain = true
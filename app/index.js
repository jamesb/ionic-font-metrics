import document from "document"
import { display } from "display"
import * as fm from "../common/font_metrics"

const CHAR_SET = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'

/////////////////////////////////////////////////////////////////////////////
// Returns a random string of cycleCharacters of the specified length
/////////////////////////////////////////////////////////////////////////////
function randStr(len) {
  var text = "";

  for (var idx = 0; idx < len; idx++)
    text += CHAR_SET.charAt(Math.floor(Math.random() * CHAR_SET.length));

  return text;
}


/////////////////////////////////////////////////////////////////////////////
function incrChar(str, val) {
  let ch = str.charAt(0)
  let curIdx = CHAR_SET.indexOf(ch)
  let idx = curIdx + val
  if (idx < 0) idx = CHAR_SET.length-1
  if (idx >= CHAR_SET.length) idx=0
  return CHAR_SET.charAt(idx)
}


/////////////////////////////////////////////////////////////////////////////
var DEBUG = false;
// Keep the screen on
if (DEBUG) { display.autoOff = false;  display.on = true }

var lblSubject = document.getElementById("lblSubject")
var imgRuler = document.getElementById("imgRuler")
var lblWidth = document.getElementById("lblWidth")

var cycleChar = '!';
lblSubject.innerText = ":)"

let px = 0
try { px = fm.px_width(lblSubject) }
catch (exc) { console.error(exc) }
lblWidth.innerText = px

document.onkeypress = function(evt) {
  if (evt.key == "up") {
    cycleChar = incrChar(cycleChar, -1)
    lblSubject.innerText = cycleChar;
  }
  if (evt.key == "down") {
    cycleChar = incrChar(cycleChar, 1)
    lblSubject.innerText = cycleChar;
  }
  let px = 0
  try { px = fm.px_width(lblSubject) }
  catch (exc) { console.error(exc) }
  lblWidth.innerText = px
}

imgRuler.onclick = function(e) {
  lblSubject.innerText = randStr(2)
  let px = 0
  try { px = fm.px_width(lblSubject) }
  catch (exc) { console.error(exc) }
  lblWidth.innerText = px
}

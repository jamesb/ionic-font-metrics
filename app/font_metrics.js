import { loadRsc } from "./rt_loader"


export function describeFont(fontFamily, fontSize, fontWeight) {
  return `${fontFamily}-${fontSize}-${fontWeight}`
}


var metrics = loadRsc("font_metrics", ["colfax-regular.json"], "json")[0]

// Approximates the pixel width of a string. Not perfect, but it gets in the ballpark.
export function pxWidth(textElement) {
  let tx = textElement.text
  let ff = textElement.style.fontFamily
  let fs = textElement.style.fontSize
  let fw = textElement.style.fontWeight
  let fsScale = 1

  ff = ff.toLowerCase()
  if ( !(ff in metrics) ) {
    throw Error(describeFont(ff, fs, fw) + ": Unexpected font family")
  }

  if ( !(fs in metrics[ff]) ) {
    // What is the largest font size we have measured?
    let largest = 0
    for(var key in metrics[ff]) {
      if ((key == parseInt(key, 10)) && (key > largest)) largest = key
    }
    // Use a linear scale to calculate widths based on this known size.
    fsScale = (fs/largest)
    fs = largest
  }

  // This is the only font weight that seems to be recognized (at least, for the Colfax font families)
  if ( !(fw in metrics[ff][fs]) ) {
    fw = "regular"
  }
  if ( !(fw in metrics[ff][fs]) ) {
    throw Error(describeFont(ff, fs, fw) + ": Unexpected font weight")
  }

  let txtWidth = 0
  let defaultKern = metrics[ff][fs][fw]["defaultKern"]
  for (var idx=0; idx<tx.length; idx++) {
    let ch = tx[idx]
    let chWidth = 0

    if ( !(ch in metrics[ff][fs][fw]) ) {
      // let widthSum = 0
      // for(var key in metrics[ff][fs][fw]) {
      //   if (key.length == 1) widthSum += metrics[ff][fs][fw][key]
      // }
      // chWidth = Math.round(widthSum / Object.keys(metrics[ff][fs][fw]).length)
      chWidth = metrics[ff][fs][fw]["avgWidth"]
    } else {
      chWidth = metrics[ff][fs][fw][ch]
    }
    txtWidth += (chWidth + defaultKern) * fsScale
  }
  if (txtWidth > (defaultKern * fsScale)) txtWidth -= (defaultKern * fsScale)
  return txtWidth
}

export function describe_font(font_family, font_size, font_weight) {
  return `${font_family}-${font_size}-${font_weight}`
}


// Approximates the pixel width of a string. Not perfect, but it gets in the ballpark.
export function px_width(text_element) {
  let metrics = {
    "colfax-regular": {
      40: {
        'regular': {
          'default_kern':4,
          ' ':10, '!':6,  '"':14, '#':24, '$':21, '%':31, '&':26, '\'':15, '(':10, ')':9,  '*':14, '+':21, ',':6,  '-':13, '.':6,  '/':14, 
          '0':22, '1':10, '2':20, '3':21, '4':21, '5':22, '6':21, '7':19, '8':21, '9':21,
          ':':6,  ';':6,  '<':19, '=':21, '>':21, '?':17, '@':35,
          'A':25, 'B':24, 'C':25, 'D':24, 'E':21, 'F':21, 'G':25, 'H':24, 'I':7,  'J':19, 'K':23, 'L':21, 'M':27,
          'N':24, 'O':26, 'P':23, 'Q':26, 'R':24, 'S':24, 'T':21, 'U':24, 'V':23, 'W':35, 'X':23, 'Y':23, 'Z':22, 
          '[':12, '\\':15,']':10, '^':17, '_':19, '`':10,
          'a':19, 'b':21, 'c':19, 'd':19, 'e':19, 'f':13, 'g':19, 'h':19, 'i':6,  'j':6,  'k':18, 'l':6,  'm':34,
          'n':20, 'o':20, 'p':21, 'q':20, 'r':12, 's':18, 't':12, 'u':19, 'v':18, 'w':28, 'x':18, 'y':18, 'z':17,
          '{':15, '|':7,  '}':15, '~':21
        }
      }
    }
  }

  let tx = text_element.innerText
  let ff = text_element.style.fontFamily
  let fs = text_element.style.fontSize
  let fw = text_element.style.fontWeight
  let fs_scale = 1
  
  ff = ff.toLowerCase()
  if ( !(ff in metrics) ) {
    throw Error(describe_font(ff, fs, fw) + ": Unexpected font family")
  }

  if ( !(fs in metrics[ff]) ) {
    // What is the largest font size we have measured?
    let largest = 0
    for(var key in metrics[ff]) {
      if ((key == parseInt(key, 10)) && (key > largest)) largest = key
    }
    // Use a linear scale to calculate widths based on this known size.
    fs_scale = (fs/largest)
    fs = largest
  }
    
  // This is the only font weight that seems to be recognized (at least, for the Colfax font families)
  if ( !(fw in metrics[ff][fs]) ) {
    fw = "regular"
  }
  if ( !(fw in metrics[ff][fs]) ) {
    throw Error(describe_font(ff, fs, fw) + ": Unexpected font weight")
  }

  let txtWidth = 0
  let default_kern = metrics[ff][fs][fw]['default_kern']
  for (var idx=0; idx<tx.length; idx++) {
    let ch = tx[idx]
    let chWidth = 0

    if ( !(ch in metrics[ff][fs][fw]) ) {
      let widthSum = 0
      for(var key in metrics[ff][fs][fw]) {
        if (key.length == 1) widthSum += metrics[ff][fs][fw][key]
      }
      chWidth = Math.round(widthSum / Object.keys(metrics[ff][fs][fw]).length)
    } else {
      chWidth = metrics[ff][fs][fw][ch]
    }
    txtWidth += (chWidth + default_kern) * fs_scale
  }
  if (txtWidth > default_kern) txtWidth -= (default_kern * fs_scale)
  return txtWidth
}

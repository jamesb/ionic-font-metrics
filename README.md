# ionic-font-metrics
Ionic app to measure text elements

![Screenshot](docs/images/ionic-font-metrics-ss01.jpg?raw=true "Screenshot")

Contains measurements for the Colfax-Regular system font on the
Ionic. Useful for determining the approximate pixel width of an on-screen text
element. Currently used in the [Stripeways](https://gam.fitbit.com/gallery/clock/b3a62185-6d9b-4980-82ca-5afc0559631d)
clock face.

To use this module, copy the app/font-metrics.js file into your project. Then:
```javascript
import { px_width } from "./font_metrics"

let words = get_some_text_whose_size_is_unknown() 
let lblWords = document.getElementById("lblWords")
lblWords.text = words

try {
  let width = px_width(lblWords)
} 
catch (exc) {
  console.error(exc)
}
```

If you'd like to contribute measurements for another font into this module, 
the other files here will build into an app that will help you eyeball those 
measurements. (A magnifying glass is recommended!)

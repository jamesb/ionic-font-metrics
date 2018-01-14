import { readFileSync } from "fs"

// Load an array of filenames from a subdir of the resources directory
export function loadRsc(dir, flnms, encode) {
  let rscAry = [ ]
  flnms.forEach(function(flnm) {
    rscAry.push( readFileSync(`/mnt/assets/resources/${dir}/${flnm}`, encode) )
  })
  return rscAry
}

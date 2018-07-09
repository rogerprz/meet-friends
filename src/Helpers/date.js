export function currentDate(){
  const d = new Date()
  let month = addZero(d.getMonth()+1)
  let day = addZero(d.getDate())
  let cDate = (`${d.getFullYear()}-${month}-${day}`)
  return cDate
}

function addZero( num ) {
    if( num.toString().length < 2 ) // Integer of less than two digits
        return "0" + num; // Prepend a zero!
    return num.toString(); // return string for consistency
}

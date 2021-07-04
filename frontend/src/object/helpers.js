
// export addListener()

// export class Listener extends IdDom{
//     constructor(eventType,callBack) {
//         super();
//         this.eventType = eventType
//         this.callBack = callBack
//     }
//     addListener(){
//         this.dom.addEventListener(this.eventType,this.callBack)
//     }
// }
export class IdDom {
  constructor (arg) {
    const type = Object.prototype.toString.call(arg)
    console.log(type)
    if (type === '[object string]') {
      this.dom = document.getElementById(arg)
    } else if (type === '[object HTMLDivElement]') {
      this.dom = arg
    } else {
      throw new TypeError('wrong type')
    }
  }

  addListener ({ eventType, callBack, capture = false }) {
    this.dom.addEventListener(eventType, callBack, capture)
  }

  clearListener (event, callBack) {
    this.dom.removeEventListener(event, callBack)
  }
}

export const getValueById = (id) => {
  console.log(id)
  console.log(document.getElementById(id))
  return document.getElementById(id).value
}

var messages=[
  {
    name:"shipan",
    position:1
  },
  {
    name:"aka",
    position:2
  }
]
let message=messages.find((message)=>message.position>0)
console.log(message)
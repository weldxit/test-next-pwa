const installEvent = () =>{
  self.addEventListener('install', ()=>{
    console.log('service worker installed', self)
  })
}

installEvent()

const activateEvent = () =>{
  self.addEventListener('activate',()=>{
    console.log('activated service worker')
  })
}

activateEvent()
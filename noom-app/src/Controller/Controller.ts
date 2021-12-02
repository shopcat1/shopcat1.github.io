export class Controller {
    static createRequest(arg) {
        fetch("https://api.particle.io/v1/devices/e00fce68873438d598031f19/led?access_token=1cf158060ec1b7c46ad748774002ef19ae1db657", 
        {
            method:"POST",   
          body:JSON.stringify(arg)})
          .then(r => console.log("Updated", r) )
          .catch(e => { console.warn("Error Updating", e);
          })
        }
}
export class Controller {
    static createRequest(arg) {
      let obj = {"arg":arg}
      var formBody:any = [];
      for (var property in obj) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(obj[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");


      fetch("https://api.particle.io/v1/devices/e00fce68873438d598031f19/led?access_token=1cf158060ec1b7c46ad748774002ef19ae1db657", 
        {
            method:"POST",   
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }, body:formBody})
          .then(r => console.log("Updated", r) )
          .catch(e => { console.warn("Error Updating", e);
          })
        }
}
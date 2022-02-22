export class Controller {
    static whiteBrightness = 128;

    static createRequest(arg) {
      let obj = {"arg":arg}
      var formBody:any = [];
      for (var property in obj) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(obj[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      // console.log("About to send", formBody,obj);
      // return; 

      fetch("https://api.particle.io/v1/devices/e00fce68873438d598031f19/led?access_token=837a518263b45941c837a9e45f82835107cc5948", 
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
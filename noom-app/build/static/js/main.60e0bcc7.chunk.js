(this["webpackJsonpnoom-app"]=this["webpackJsonpnoom-app"]||[]).push([[0],[,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),r=n(5),a=n.n(r),o=(n(12),n(2)),i=(n(13),n(3)),u=n(6),l=n(7),d=function(){function e(){Object(u.a)(this,e)}return Object(l.a)(e,null,[{key:"createRequest",value:function(e){fetch("https://api.particle.io/v1/devices/e00fce68873438d598031f19/led?access_token=1cf158060ec1b7c46ad748774002ef19ae1db657",{method:"POST",body:JSON.stringify(e)}).then((function(e){return console.log("Updated",e)})).catch((function(e){console.warn("Error Updating",e)}))}}]),e}(),f=(n(14),n(0)),h=0,j=function(e,t){return e/t},b=200,m=function(e){var t=e.i,n=e.circleProps,c=e.radius,s=e.halfSize,r=e.segment,a=e.thickness,o=e.circumference,u=e.getStrokeDashOffset,l=e.textProps,h=e.selectedButton,j=e.setSelectedButton;return Object(f.jsxs)("g",{className:"segmentGroup",onClick:function(){j(r.label),d.createRequest(r.arg)},children:[Object(f.jsx)("circle",Object(i.a)(Object(i.a)({},n),{},{className:"segmentCircle",r:c,cx:s,cy:s,transform:r.rotate,stroke:r.color,strokeWidth:h&&r.label===h?a+10:a,strokeDasharray:o,strokeDashoffset:u(r.value,o)})),Object(f.jsx)("text",Object(i.a)(Object(i.a)({},l),{},{x:r.textCoords.x,y:r.textCoords.y,dy:"3px",textAnchor:"middle",children:r.label}))]},t)},O=function(e){var t=(e.segments,360),n=function(t,n){var c=e.radius,s=(e.segments,function(e){return e*(Math.PI/180)}(360*j(t,360)/2+n));return{x:c*Math.cos(s)+100,y:c*Math.sin(s)+100}},c=function(e,n){return n-j(e,t)*n},r=s.a.useState([]),a=Object(o.a)(r,2),i=a[0],u=a[1];s.a.useEffect((function(){var c=function(){var t=[],c=[],s=e.startAngle,r=e.segments;return h=s,r.forEach((function(e){var r=e.value,a=h,o=j(r,360),i=n(r,h),u=i.x,l=i.y;t.push(a),c.push({x:u,y:l});var d=t[t.length-1]||s;h=360*o+d})),{rotations:t,textCoords:c}}(),s=c.rotations,r=c.textCoords;u(e.segments.map((function(e,n){var c=e.value,a=e.color,o=e.label,i=e.arg;return{value:c,color:a,percent:j(c,t),rotate:"rotate(".concat(s[n],", ").concat(100,", ").concat(100,")"),textCoords:r[n],label:o,arg:i}})))}),[]);var l=e.width,d=e.radius,O=e.thickness,p=e.className,v=e.circleProps,x=e.textProps,g=e.selectedButton,w=e.setSelectedButton,S=function(e){return 2*Math.PI*e}(d);return Object(f.jsx)("div",{className:"donut-complex".concat(" donut-complex--loaded ").concat(p),children:Object(f.jsxs)("svg",{scale:l/b,height:l,width:l,viewBox:"-6 -6  ".concat(212," ").concat(212),children:[i.map((function(e,t){return Object(f.jsx)(m,{i:t,circleProps:v,radius:d,halfSize:100,segment:e,thickness:O,circumference:S,getStrokeDashOffset:c,textProps:x,selectedButton:g,setSelectedButton:w},t)})),Object(f.jsx)("g",{children:Object(f.jsx)("circle",{className:"centerCircle",r:d-O/2,cx:100,cy:100,fill:"#00000",z:1e3})},"Center")]})})};O.defaultProps={radius:60,segments:[],thickness:30,startAngle:-90,className:"",circleProps:{},textProps:{}};var p,v=O,x=(n(16),function(e){var t=s.a.useState({r:0,g:0,b:0,w:0}),n=Object(o.a)(t,2),c=n[0],r=n[1],a=e.selectedButton,u=e.setSelectedButton,l=e.width,h=a&&"CUSTOM"===a?"CustomValue selected":"CustomValue",j=l<970?{transform:"scale("+l/970+")"}:{},b=function(e){var t=e.target,n=t.value,s=t.name;if(n>=0&&n<=255){var a=Object(i.a)({},c);a[s]=n,r(a),u("--")}};return Object(f.jsxs)("div",{className:h,style:j,children:[Object(f.jsx)("h3",{children:"CUSTOM"}),Object(f.jsxs)("div",{className:"fields",children:[Object(f.jsx)("input",{type:"number",name:"r",value:c.r,onChange:b}),Object(f.jsx)("input",{type:"number",name:"g",value:c.g,onChange:b}),Object(f.jsx)("input",{type:"number",name:"b",value:c.b,onChange:b}),Object(f.jsx)("input",{type:"number",name:"w",value:c.w,onChange:b})]}),Object(f.jsx)("div",{onClick:function(){u("CUSTOM"),d.createRequest("".concat(c.r,", ").concat(c.g,", ").concat(c.b,", ").concat(c.w))},className:"setButton",children:"SET"})]})}),g=(n(17),function(e){var t=e.selectedButton,n=e.setSelectedButton,c=e.width,s=t&&"OFF"===t?"OffButton selected":"OffButton",r=c<970?{transform:"scale("+c/970+")"}:{};return Object(f.jsx)("div",{className:s,style:r,onClick:function(){n("OFF"),d.createRequest("0,0,0,0")},children:Object(f.jsx)("div",{className:"innerCircle",children:"OFF"})})});function w(){var e=window;return{width:e.innerWidth,height:e.innerHeight}}!function(e){e.Loading="loading",e.Error="error",e.Loaded="loaded"}(p||(p={}));var S=function(){var e=s.a.useState(void 0),t=Object(o.a)(e,2),n=t[0],c=t[1],r=s.a.useState(void 0),a=Object(o.a)(r,2),i=a[0],u=a[1],l=s.a.useState(p.Loading),d=Object(o.a)(l,2),h=d[0],j=d[1];s.a.useEffect((function(){fetch("./buttons.json").then((function(e){return e.json()})).then((function(e){u(e),j(p.Loaded)})).catch((function(e){console.warn("Error Loading",e),j(p.Error)}))}),[]);var b=function(){var e=s.a.useState(w()),t=Object(o.a)(e,2),n=t[0],c=t[1];return s.a.useEffect((function(){function e(){c(w())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),n}().width;return h===p.Loading?Object(f.jsx)("div",{className:"App"}):h===p.Error?Object(f.jsx)("div",{className:"App",children:"There was an error loading the buttons."}):Object(f.jsx)("div",{className:"App",children:Object(f.jsxs)("div",{className:"appWrapper",children:[Object(f.jsx)("div",{className:"offButtonWrapper",children:Object(f.jsx)(g,{width:b,selectedButton:n,setSelectedButton:c})}),Object(f.jsx)(v,{width:b>680?700:b-40,radius:80,segments:i,thickness:40,startAngle:-135,selectedButton:n,setSelectedButton:c}),Object(f.jsx)("div",{className:"customRow",children:Object(f.jsx)(x,{width:b,selectedButton:n,setSelectedButton:c})})]})})},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),c(e),s(e),r(e),a(e)}))};a.a.render(Object(f.jsx)(s.a.StrictMode,{children:Object(f.jsx)(S,{})}),document.getElementById("root")),C()}],[[18,1,2]]]);
//# sourceMappingURL=main.60e0bcc7.chunk.js.map
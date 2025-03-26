/*! For license information please see main.js.LICENSE.txt */
(()=>{var t={276:t=>{t.exports=function(t,e,o){return e<o?t<e?e:t>o?o:t:t<o?o:t>e?e:t}},659:(t,e,o)=>{const i=o(156),r={};for(const t of Object.keys(i))r[i[t]]=t;const n={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};t.exports=n;for(const t of Object.keys(n)){if(!("channels"in n[t]))throw new Error("missing channels property: "+t);if(!("labels"in n[t]))throw new Error("missing channel labels property: "+t);if(n[t].labels.length!==n[t].channels)throw new Error("channel and label counts mismatch: "+t);const{channels:e,labels:o}=n[t];delete n[t].channels,delete n[t].labels,Object.defineProperty(n[t],"channels",{value:e}),Object.defineProperty(n[t],"labels",{value:o})}n.rgb.hsl=function(t){const e=t[0]/255,o=t[1]/255,i=t[2]/255,r=Math.min(e,o,i),n=Math.max(e,o,i),s=n-r;let a,l;n===r?a=0:e===n?a=(o-i)/s:o===n?a=2+(i-e)/s:i===n&&(a=4+(e-o)/s),a=Math.min(60*a,360),a<0&&(a+=360);const c=(r+n)/2;return l=n===r?0:c<=.5?s/(n+r):s/(2-n-r),[a,100*l,100*c]},n.rgb.hsv=function(t){let e,o,i,r,n;const s=t[0]/255,a=t[1]/255,l=t[2]/255,c=Math.max(s,a,l),h=c-Math.min(s,a,l),d=function(t){return(c-t)/6/h+.5};return 0===h?(r=0,n=0):(n=h/c,e=d(s),o=d(a),i=d(l),s===c?r=i-o:a===c?r=1/3+e-i:l===c&&(r=2/3+o-e),r<0?r+=1:r>1&&(r-=1)),[360*r,100*n,100*c]},n.rgb.hwb=function(t){const e=t[0],o=t[1];let i=t[2];const r=n.rgb.hsl(t)[0],s=1/255*Math.min(e,Math.min(o,i));return i=1-1/255*Math.max(e,Math.max(o,i)),[r,100*s,100*i]},n.rgb.cmyk=function(t){const e=t[0]/255,o=t[1]/255,i=t[2]/255,r=Math.min(1-e,1-o,1-i);return[100*((1-e-r)/(1-r)||0),100*((1-o-r)/(1-r)||0),100*((1-i-r)/(1-r)||0),100*r]},n.rgb.keyword=function(t){const e=r[t];if(e)return e;let o,n=1/0;for(const e of Object.keys(i)){const r=(a=i[e],((s=t)[0]-a[0])**2+(s[1]-a[1])**2+(s[2]-a[2])**2);r<n&&(n=r,o=e)}var s,a;return o},n.keyword.rgb=function(t){return i[t]},n.rgb.xyz=function(t){let e=t[0]/255,o=t[1]/255,i=t[2]/255;return e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,o=o>.04045?((o+.055)/1.055)**2.4:o/12.92,i=i>.04045?((i+.055)/1.055)**2.4:i/12.92,[100*(.4124*e+.3576*o+.1805*i),100*(.2126*e+.7152*o+.0722*i),100*(.0193*e+.1192*o+.9505*i)]},n.rgb.lab=function(t){const e=n.rgb.xyz(t);let o=e[0],i=e[1],r=e[2];return o/=95.047,i/=100,r/=108.883,o=o>.008856?o**(1/3):7.787*o+16/116,i=i>.008856?i**(1/3):7.787*i+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,[116*i-16,500*(o-i),200*(i-r)]},n.hsl.rgb=function(t){const e=t[0]/360,o=t[1]/100,i=t[2]/100;let r,n,s;if(0===o)return s=255*i,[s,s,s];r=i<.5?i*(1+o):i+o-i*o;const a=2*i-r,l=[0,0,0];for(let t=0;t<3;t++)n=e+1/3*-(t-1),n<0&&n++,n>1&&n--,s=6*n<1?a+6*(r-a)*n:2*n<1?r:3*n<2?a+(r-a)*(2/3-n)*6:a,l[t]=255*s;return l},n.hsl.hsv=function(t){const e=t[0];let o=t[1]/100,i=t[2]/100,r=o;const n=Math.max(i,.01);return i*=2,o*=i<=1?i:2-i,r*=n<=1?n:2-n,[e,100*(0===i?2*r/(n+r):2*o/(i+o)),(i+o)/2*100]},n.hsv.rgb=function(t){const e=t[0]/60,o=t[1]/100;let i=t[2]/100;const r=Math.floor(e)%6,n=e-Math.floor(e),s=255*i*(1-o),a=255*i*(1-o*n),l=255*i*(1-o*(1-n));switch(i*=255,r){case 0:return[i,l,s];case 1:return[a,i,s];case 2:return[s,i,l];case 3:return[s,a,i];case 4:return[l,s,i];case 5:return[i,s,a]}},n.hsv.hsl=function(t){const e=t[0],o=t[1]/100,i=t[2]/100,r=Math.max(i,.01);let n,s;s=(2-o)*i;const a=(2-o)*r;return n=o*r,n/=a<=1?a:2-a,n=n||0,s/=2,[e,100*n,100*s]},n.hwb.rgb=function(t){const e=t[0]/360;let o=t[1]/100,i=t[2]/100;const r=o+i;let n;r>1&&(o/=r,i/=r);const s=Math.floor(6*e),a=1-i;n=6*e-s,1&s&&(n=1-n);const l=o+n*(a-o);let c,h,d;switch(s){default:case 6:case 0:c=a,h=l,d=o;break;case 1:c=l,h=a,d=o;break;case 2:c=o,h=a,d=l;break;case 3:c=o,h=l,d=a;break;case 4:c=l,h=o,d=a;break;case 5:c=a,h=o,d=l}return[255*c,255*h,255*d]},n.cmyk.rgb=function(t){const e=t[0]/100,o=t[1]/100,i=t[2]/100,r=t[3]/100;return[255*(1-Math.min(1,e*(1-r)+r)),255*(1-Math.min(1,o*(1-r)+r)),255*(1-Math.min(1,i*(1-r)+r))]},n.xyz.rgb=function(t){const e=t[0]/100,o=t[1]/100,i=t[2]/100;let r,n,s;return r=3.2406*e+-1.5372*o+-.4986*i,n=-.9689*e+1.8758*o+.0415*i,s=.0557*e+-.204*o+1.057*i,r=r>.0031308?1.055*r**(1/2.4)-.055:12.92*r,n=n>.0031308?1.055*n**(1/2.4)-.055:12.92*n,s=s>.0031308?1.055*s**(1/2.4)-.055:12.92*s,r=Math.min(Math.max(0,r),1),n=Math.min(Math.max(0,n),1),s=Math.min(Math.max(0,s),1),[255*r,255*n,255*s]},n.xyz.lab=function(t){let e=t[0],o=t[1],i=t[2];return e/=95.047,o/=100,i/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,o=o>.008856?o**(1/3):7.787*o+16/116,i=i>.008856?i**(1/3):7.787*i+16/116,[116*o-16,500*(e-o),200*(o-i)]},n.lab.xyz=function(t){let e,o,i;o=(t[0]+16)/116,e=t[1]/500+o,i=o-t[2]/200;const r=o**3,n=e**3,s=i**3;return o=r>.008856?r:(o-16/116)/7.787,e=n>.008856?n:(e-16/116)/7.787,i=s>.008856?s:(i-16/116)/7.787,e*=95.047,o*=100,i*=108.883,[e,o,i]},n.lab.lch=function(t){const e=t[0],o=t[1],i=t[2];let r;return r=360*Math.atan2(i,o)/2/Math.PI,r<0&&(r+=360),[e,Math.sqrt(o*o+i*i),r]},n.lch.lab=function(t){const e=t[0],o=t[1],i=t[2]/360*2*Math.PI;return[e,o*Math.cos(i),o*Math.sin(i)]},n.rgb.ansi16=function(t,e=null){const[o,i,r]=t;let s=null===e?n.rgb.hsv(t)[2]:e;if(s=Math.round(s/50),0===s)return 30;let a=30+(Math.round(r/255)<<2|Math.round(i/255)<<1|Math.round(o/255));return 2===s&&(a+=60),a},n.hsv.ansi16=function(t){return n.rgb.ansi16(n.hsv.rgb(t),t[2])},n.rgb.ansi256=function(t){const e=t[0],o=t[1],i=t[2];return e===o&&o===i?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(o/255*5)+Math.round(i/255*5)},n.ansi16.rgb=function(t){let e=t%10;if(0===e||7===e)return t>50&&(e+=3.5),e=e/10.5*255,[e,e,e];const o=.5*(1+~~(t>50));return[(1&e)*o*255,(e>>1&1)*o*255,(e>>2&1)*o*255]},n.ansi256.rgb=function(t){if(t>=232){const e=10*(t-232)+8;return[e,e,e]}let e;return t-=16,[Math.floor(t/36)/5*255,Math.floor((e=t%36)/6)/5*255,e%6/5*255]},n.rgb.hex=function(t){const e=(((255&Math.round(t[0]))<<16)+((255&Math.round(t[1]))<<8)+(255&Math.round(t[2]))).toString(16).toUpperCase();return"000000".substring(e.length)+e},n.hex.rgb=function(t){const e=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let o=e[0];3===e[0].length&&(o=o.split("").map((t=>t+t)).join(""));const i=parseInt(o,16);return[i>>16&255,i>>8&255,255&i]},n.rgb.hcg=function(t){const e=t[0]/255,o=t[1]/255,i=t[2]/255,r=Math.max(Math.max(e,o),i),n=Math.min(Math.min(e,o),i),s=r-n;let a,l;return a=s<1?n/(1-s):0,l=s<=0?0:r===e?(o-i)/s%6:r===o?2+(i-e)/s:4+(e-o)/s,l/=6,l%=1,[360*l,100*s,100*a]},n.hsl.hcg=function(t){const e=t[1]/100,o=t[2]/100,i=o<.5?2*e*o:2*e*(1-o);let r=0;return i<1&&(r=(o-.5*i)/(1-i)),[t[0],100*i,100*r]},n.hsv.hcg=function(t){const e=t[1]/100,o=t[2]/100,i=e*o;let r=0;return i<1&&(r=(o-i)/(1-i)),[t[0],100*i,100*r]},n.hcg.rgb=function(t){const e=t[0]/360,o=t[1]/100,i=t[2]/100;if(0===o)return[255*i,255*i,255*i];const r=[0,0,0],n=e%1*6,s=n%1,a=1-s;let l=0;switch(Math.floor(n)){case 0:r[0]=1,r[1]=s,r[2]=0;break;case 1:r[0]=a,r[1]=1,r[2]=0;break;case 2:r[0]=0,r[1]=1,r[2]=s;break;case 3:r[0]=0,r[1]=a,r[2]=1;break;case 4:r[0]=s,r[1]=0,r[2]=1;break;default:r[0]=1,r[1]=0,r[2]=a}return l=(1-o)*i,[255*(o*r[0]+l),255*(o*r[1]+l),255*(o*r[2]+l)]},n.hcg.hsv=function(t){const e=t[1]/100,o=e+t[2]/100*(1-e);let i=0;return o>0&&(i=e/o),[t[0],100*i,100*o]},n.hcg.hsl=function(t){const e=t[1]/100,o=t[2]/100*(1-e)+.5*e;let i=0;return o>0&&o<.5?i=e/(2*o):o>=.5&&o<1&&(i=e/(2*(1-o))),[t[0],100*i,100*o]},n.hcg.hwb=function(t){const e=t[1]/100,o=e+t[2]/100*(1-e);return[t[0],100*(o-e),100*(1-o)]},n.hwb.hcg=function(t){const e=t[1]/100,o=1-t[2]/100,i=o-e;let r=0;return i<1&&(r=(o-i)/(1-i)),[t[0],100*i,100*r]},n.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]},n.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]},n.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]},n.gray.hsl=function(t){return[0,0,t[0]]},n.gray.hsv=n.gray.hsl,n.gray.hwb=function(t){return[0,100,t[0]]},n.gray.cmyk=function(t){return[0,0,0,t[0]]},n.gray.lab=function(t){return[t[0],0,0]},n.gray.hex=function(t){const e=255&Math.round(t[0]/100*255),o=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(o.length)+o},n.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]}},734:(t,e,o)=>{const i=o(659),r=o(507),n={};Object.keys(i).forEach((t=>{n[t]={},Object.defineProperty(n[t],"channels",{value:i[t].channels}),Object.defineProperty(n[t],"labels",{value:i[t].labels});const e=r(t);Object.keys(e).forEach((o=>{const i=e[o];n[t][o]=function(t){const e=function(...e){const o=e[0];if(null==o)return o;o.length>1&&(e=o);const i=t(e);if("object"==typeof i)for(let t=i.length,e=0;e<t;e++)i[e]=Math.round(i[e]);return i};return"conversion"in t&&(e.conversion=t.conversion),e}(i),n[t][o].raw=function(t){const e=function(...e){const o=e[0];return null==o?o:(o.length>1&&(e=o),t(e))};return"conversion"in t&&(e.conversion=t.conversion),e}(i)}))})),t.exports=n},507:(t,e,o)=>{const i=o(659);function r(t,e){return function(o){return e(t(o))}}function n(t,e){const o=[e[t].parent,t];let n=i[e[t].parent][t],s=e[t].parent;for(;e[s].parent;)o.unshift(e[s].parent),n=r(i[e[s].parent][s],n),s=e[s].parent;return n.conversion=o,n}t.exports=function(t){const e=function(t){const e=function(){const t={},e=Object.keys(i);for(let o=e.length,i=0;i<o;i++)t[e[i]]={distance:-1,parent:null};return t}(),o=[t];for(e[t].distance=0;o.length;){const t=o.pop(),r=Object.keys(i[t]);for(let i=r.length,n=0;n<i;n++){const i=r[n],s=e[i];-1===s.distance&&(s.distance=e[t].distance+1,s.parent=t,o.unshift(i))}}return e}(t),o={},r=Object.keys(e);for(let t=r.length,i=0;i<t;i++){const t=r[i];null!==e[t].parent&&(o[t]=n(t,e))}return o}},156:t=>{"use strict";t.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}}},e={};function o(i){var r=e[i];if(void 0!==r)return r.exports;var n=e[i]={exports:{}};return t[i](n,n.exports,o),n.exports}o.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},o.d=(t,e)=>{for(var i in e)o.o(e,i)&&!o.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const o=this.t;if(e&&void 0===t){const e=void 0!==o&&1===o.length;e&&(t=r.get(o)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&r.set(o,t))}return t}toString(){return this.cssText}}const s=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1]),t[0]);return new n(o,t,i)},a=(o,i)=>{if(e)o.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,o.appendChild(i)}},l=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:f}=Object,g=globalThis,m=g.trustedTypes,y=m?m.emptyScript:"",v=g.reactiveElementPolyfillSupport,b=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},$=(t,e)=>!c(t,e),x={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;class C extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return i?.call(this)},set(e){const n=i?.call(this);r.call(this,e),this.requestUpdate(t,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...p(t),...u(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return a(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EC(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){const r=(void 0!==o.converter?.toAttribute?o.converter:w).toAttribute(e,o.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=o.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=i,this[i]=r.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,o){if(void 0!==t){if(o??=this.constructor.getPropertyOptions(t),!(o.hasChanged??$)(this[t],e))return;this.P(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,o){this._$AL.has(t)||this._$AL.set(t,e),!0===o.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t)!0!==o.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[b("elementProperties")]=new Map,C[b("finalized")]=new Map,v?.({ReactiveElement:C}),(g.reactiveElementVersions??=[]).push("2.0.4");const _=globalThis,A=_.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+E,R=`<${M}>`,P=document,L=()=>P.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,B=t=>H(t)||"function"==typeof t?.[Symbol.iterator],T="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,N=/>/g,I=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),G=/'/g,D=/"/g,U=/^(?:script|style|textarea|title)$/i,F=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),V=F(1),W=(F(2),F(3),Symbol.for("lit-noChange")),q=Symbol.for("lit-nothing"),X=new WeakMap,Y=P.createTreeWalker(P,129);function K(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const o=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",s=z;for(let e=0;e<o;e++){const o=t[e];let a,l,c=-1,h=0;for(;h<o.length&&(s.lastIndex=h,l=s.exec(o),null!==l);)h=s.lastIndex,s===z?"!--"===l[1]?s=j:void 0!==l[1]?s=N:void 0!==l[2]?(U.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=I):void 0!==l[3]&&(s=I):s===I?">"===l[0]?(s=r??z,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?I:'"'===l[3]?D:G):s===D||s===G?s=I:s===j||s===N?s=z:(s=I,r=void 0);const d=s===I&&t[e+1].startsWith("/>")?" ":"";n+=s===z?o+R:c>=0?(i.push(a),o.slice(0,c)+k+o.slice(c)+E+d):o+E+(-2===c?e:d)}return[K(t,n+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class J{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let r=0,n=0;const s=t.length-1,a=this.parts,[l,c]=Z(t,e);if(this.el=J.createElement(l,o),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=Y.nextNode())&&a.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(k)){const e=c[n++],o=i.getAttribute(t).split(E),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:s[2],strings:o,ctor:"."===s[1]?it:"?"===s[1]?rt:"@"===s[1]?nt:ot}),i.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(U.test(i.tagName)){const t=i.textContent.split(E),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],L()),Y.nextNode(),a.push({type:2,index:++r});i.append(t[e],L())}}}else if(8===i.nodeType)if(i.data===M)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(E,t+1));)a.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,e){const o=P.createElement("template");return o.innerHTML=t,o}}function Q(t,e,o=t,i){if(e===W)return e;let r=void 0!==i?o._$Co?.[i]:o._$Cl;const n=O(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,o,i)),void 0!==i?(o._$Co??=[])[i]=r:o._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,i)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??P).importNode(e,!0);Y.currentNode=i;let r=Y.nextNode(),n=0,s=0,a=o[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new et(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new st(r,this,t)),this._$AV.push(e),a=o[++s]}n!==a?.index&&(r=Y.nextNode(),n++)}return Y.currentNode=P,i}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),O(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):B(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=J.createElement(K(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new tt(i,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new J(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const r of t)i===e.length?e.push(o=new et(this.O(L()),this.O(L()),this,this.options)):o=e[i],o._$AI(r),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class ot{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=q}_$AI(t,e=this,o,i){const r=this.strings;let n=!1;if(void 0===r)t=Q(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const i=t;let s,a;for(t=r[0],s=0;s<r.length-1;s++)a=Q(this,i[o+s],e,s),a===W&&(a=this._$AH[s]),n||=!O(a)||a!==this._$AH[s],a===q?t=q:t!==q&&(t+=(a??"")+r[s+1]),this._$AH[s]=a}n&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends ot{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class rt extends ot{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class nt extends ot{constructor(t,e,o,i,r){super(t,e,o,i,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??q)===W)return;const o=this._$AH,i=t===q&&o!==q||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,r=t!==q&&(o===q||i);i&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at={M:k,P:E,A:M,C:1,L:Z,R:tt,D:B,V:Q,I:et,H:ot,N:rt,U:nt,B:it,F:st},lt=_.litHtmlPolyfillSupport;lt?.(J,et),(_.litHtmlVersions??=[]).push("3.2.1");class ct extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const i=o?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=o?.renderBefore??null;i._$litPart$=r=new et(e.insertBefore(L(),t),t,void 0,o??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ct._$litElement$=!0,ct.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:ct});const ht=globalThis.litElementPolyfillSupport;ht?.({LitElement:ct}),(globalThis.litElementVersions??=[]).push("4.1.1");const dt=t=>(e,o)=>{void 0!==o?o.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)},pt={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:$},ut=(t=pt,e,o)=>{const{kind:i,metadata:r}=o;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),n.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const r=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,r,t)},init(e){return void 0!==e&&this.P(i,void 0,t),e}}}if("setter"===i){const{name:i}=o;return function(o){const r=this[i];e.call(this,o),this.requestUpdate(i,r,t)}}throw Error("Unsupported decorator location: "+i)};function ft(t){return(e,o)=>"object"==typeof o?ut(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,i?{...t,wrapped:!0}:t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function gt(t){return ft({...t,state:!0,attribute:!1})}const mt=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,o),o);function yt(t,e){return(o,i,r)=>{const n=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:e}="object"==typeof i?o:r??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return mt(o,i,{get(){let o=t.call(this);return void 0===o&&(o=n(this),(null!==o||this.hasUpdated)&&e.call(this,o)),o}})}return mt(o,i,{get(){return n(this)}})}}var vt=o(276),bt=o.n(vt),wt=o(734),$t=o.n(wt);const xt=/^#?([0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)$/,Ct=/^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/,_t=/^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/,At=/^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;var St,kt,Et,Mt,Rt=function(t,e,o,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,o):r?r.value=o:e.set(t,o),o},Pt=function(t,e,o,i){if("a"===o&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===o?i:"a"===o?i.call(t):i?i.value:e.get(t)};function Lt(t,e,o){return t+(e-t)*o}!function(t){t.RGB255="rgb255",t.RGB01="rgb01",t.HEX="hex",t.HSV="hsv",t.HSL="hsl",t.LCH="lch"}(Et||(Et={})),function(t){t.RGB="rgb",t.HSV="hsv",t.HSL="hsl",t.HSL_FLIP="hsl_flip",t.LCH="lch"}(Mt||(Mt={}));class Ot{constructor(t={}){this.a=1,St.set(this,void 0),kt.set(this,void 0),t.type==Et.RGB255?(Rt(this,St,[bt()(t.r||0,0,255),bt()(t.g||0,0,255),bt()(t.b||0,0,255)],"f"),Rt(this,kt,$t().rgb,"f")):t.type==Et.RGB01?(Rt(this,St,[bt()(Math.round(255*(t.r||0)),0,255),bt()(Math.round(255*(t.g||0)),0,255),bt()(Math.round(255*(t.b||0)),0,255)],"f"),Rt(this,kt,$t().rgb,"f")):t.type==Et.HEX?(Rt(this,St,t.hex||"#000000","f"),Rt(this,kt,$t().hex,"f")):t.type==Et.HSV?(Rt(this,St,[t.h||0,t.s||0,t.v||0],"f"),Rt(this,kt,$t().hsv,"f")):t.type==Et.HSL?(Rt(this,St,[t.h||0,t.s||0,t.l||0],"f"),Rt(this,kt,$t().hsl,"f")):t.type==Et.LCH?(Rt(this,St,[t.l||0,t.c||0,t.h||0],"f"),Rt(this,kt,$t().lch,"f")):(t={type:Et.RGB255,...t},Rt(this,St,[0,0,0],"f"),Rt(this,kt,$t().rgb,"f")),this.input=t,Object.freeze(this)}getRGB255(){return this.input.type===Et.RGB255?[this.input.r||0,this.input.g||0,this.input.b||0]:this.input.type===Et.RGB01?[Math.round(255*(this.input.r||0)),Math.round(255*(this.input.g||0)),Math.round(255*(this.input.b||0))]:Pt(this,kt,"f").rgb(Pt(this,St,"f"))}getRGB01(){return this.input.type===Et.RGB255?[(this.input.r||0)/255,(this.input.g||0)/255,(this.input.b||0)/255]:this.input.type===Et.RGB01?[this.input.r||0,this.input.g||0,this.input.b||0]:this.getRGB255().map((t=>t/255))}getHex(){return this.input.type===Et.HEX?this.input.hex||"":Pt(this,kt,"f").hex(Pt(this,St,"f"))}getHSV(t=!0){if(this.input.type===Et.HSV){const e=[this.input.h||0,this.input.s||0,this.input.v||0];return t?e:e.map((t=>Math.round(t)))}return t?Pt(this,kt,"f").hsv.raw(Pt(this,St,"f")):Pt(this,kt,"f").hsv(Pt(this,St,"f"))}getHSL(t=!0){if(this.input.type===Et.HSL){const e=[this.input.h||0,this.input.s||0,this.input.l||0];return t?e:e.map((t=>Math.round(t)))}return t?Pt(this,kt,"f").hsl.raw(Pt(this,St,"f")):Pt(this,kt,"f").hsl(Pt(this,St,"f"))}getLCH(t=!0){if(this.input.type===Et.LCH){const e=[this.input.l||0,this.input.c||0,this.input.h||0];return t?e:e.map((t=>Math.round(t)))}return t?Pt(this,kt,"f").lch.raw(Pt(this,St,"f")):Pt(this,kt,"f").lch(Pt(this,St,"f"))}toCSS(){return`rgba(${this.getRGB255().join(", ")})`}static fromRGB255Array(t){return new Ot({type:Et.RGB255,r:t[0],g:t[1],b:t[2]})}static lerp(t,e,o,i=Mt.RGB){if(i===Mt.HSV){let i=t.getHSV(),r=e.getHSV();return new Ot({type:Et.HSV,h:Lt(i[0],r[0],o),s:Lt(i[1],r[1],o),v:Lt(i[2],r[2],o)})}if(i===Mt.HSL){const i=t.getHSL(),r=e.getHSL(),n=Math.abs(i[0]-r[0])>180,s=Lt(i[0]+360*Number(n&&i[0]<r[0]),r[0]+360*Number(n&&r[0]<i[0]),o);return new Ot({type:Et.HSL,h:s,s:Lt(i[1],r[1],o),l:Lt(i[2],r[2],o)})}if(i===Mt.HSL_FLIP){const i=t.getHSL(),r=e.getHSL(),n=Math.abs(i[0]-r[0])>180,s=Lt(i[0]+360*Number(!n&&i[0]<r[0]),r[0]+360*Number(!n&&r[0]<i[0]),o);return new Ot({type:Et.HSL,h:s,s:Lt(i[1],r[1],o),l:Lt(i[2],r[2],o)})}if(i==Mt.LCH){let i=t.getLCH(),r=e.getLCH();return new Ot({type:Et.LCH,l:Lt(i[0],r[0],o),c:Lt(i[1],r[1],o),h:Lt(i[2],r[2],o)})}const[r,n,s]=t.getRGB01(),[a,l,c]=e.getRGB01();return new Ot({type:Et.RGB01,r:Lt(r,a,o),g:Lt(n,l,o),b:Lt(s,c,o)})}}St=new WeakMap,kt=new WeakMap,Ot.parseHex=function(t){const e=xt.exec(t);return e&&2==e.length?new Ot({type:Et.HEX,hex:e[1]}):null},Ot.parseRGB255=function(t){const e=Ct.exec(t);return e&&4==e.length?new Ot({type:Et.RGB255,r:parseInt(e[1]),g:parseInt(e[2]),b:parseInt(e[3])}):null},Ot.parseRGB01=function(t){const e=_t.exec(t);return e&&4==e.length?new Ot({type:Et.RGB01,r:parseFloat(e[1]),g:parseFloat(e[2]),b:parseFloat(e[3])}):null},Ot.parseHSV=function(t){const e=At.exec(t);if(e&&4==e.length){const t=parseFloat(e[1]),o=parseFloat(e[2]),i=parseFloat(e[3]);if(0<=t&&t<=360&&0<=o&&o<=100&&0<=i&&i<=100)return new Ot({type:Et.HSV,h:parseFloat(e[1]),s:parseFloat(e[2]),v:parseFloat(e[3])})}return null};class Ht{constructor(t=new Ot({type:Et.RGB01,r:1,g:0,b:0}),e=new Ot({type:Et.RGB01,r:1,g:1,b:1})){this.colors=[],this.positions=[],this.addColorStop(0,t),this.addColorStop(1,e)}setColorStop(t,e){let o=this.positions.indexOf(t);-1==o?this.addColorStop(t,e):this.colors[o]=e}addColorStop(t,e){this.colors.push(e),this.positions.push(t)}getColorAt(t,e){if(0===this.colors.length)return new Ot({});if(1===this.colors.length)return this.colors[0];let o=0;for(;o<this.positions.length&&t>this.positions[o];)o++;if(0===o)return this.colors[0];if(o===this.positions.length)return this.colors[this.colors.length-1];const i=this.positions[o-1],r=this.positions[o],n=this.colors[o-1],s=this.colors[o],a=(t-i)/(r-i);return Ot.lerp(n,s,a,e)}getBackgroundImageStyle(t=Mt.RGB){let e="linear-gradient(to right";for(let o=0;o<=100;o++)e+=", "+this.getColorAt(o/100,t).toCSS()+" "+o+"%";return e+=")",e}}const Bt=s`.color-selection {
  width: 2rem;
  height: 2rem;
  background-color: red;
  border-radius: 10%;
  margin: 0 auto;
}

.color-selection.rightColor {
  background-color: white;
}

.color-selection.active {
  border: black dashed 0.2rem;
}

.gradient {
  width: 100%;
  height: 2rem;
  background-image: linear-gradient(to right, red, white);
}

.table th {
  width: 1rem;
}

table > * {
  --bs-table-bg: transparent;
}
`,Tt=V`<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  crossorigin="anonymous"
/> `;class zt extends Event{constructor(t){super(zt.eventName,{bubbles:!0,composed:!0}),this.color=t}}zt.eventName="set-color";class jt extends Event{constructor(t){super(jt.eventName,{bubbles:!0,composed:!0}),this.active=t}}jt.eventName="set-interpolation-active";var Nt,It=function(t,e,o,i){var r,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(n<3?r(s):n>3?r(e,o,s):r(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s};!function(t){t.LEFT="left",t.RIGHT="right",t.NONE="none"}(Nt||(Nt={}));let Gt=class extends ct{constructor(){super(...arguments),this.activeColor=Nt.NONE,this.leftColor=new Ot({}),this.rightColor=new Ot({}),this.colorGradient=new Ht}setColor(t){this.dispatchEvent(new zt(t))}setActiveColor(t){this.dispatchEvent(new jt(t))}setActiveColorLeft(){this.setActiveColor(this.activeColor==Nt.LEFT?Nt.NONE:Nt.LEFT)}setActiveColorRight(){this.setActiveColor(this.activeColor==Nt.RIGHT?Nt.NONE:Nt.RIGHT)}onMouseMoveGradient(t){if(1==t.buttons){const e=t.currentTarget.getAttribute("data-mode")||"",o=t.currentTarget.getBoundingClientRect(),i=(t.clientX-o.left)/o.width,r=this.colorGradient.getColorAt(i,Mt[e.toUpperCase()]);this.setActiveColor(Nt.NONE),this.setColor(r)}}render(){return this.colorGradient=new Ht(this.leftColor,this.rightColor),V`
      ${Tt}
      <h5>Color Interpolation</h5>
      <table class="table mb-0">
        <tbody>
          <tr>
            <td>
              <div
                class="color-selection ${this.activeColor===Nt.LEFT?"active":""}"
                @click=${this.setActiveColorLeft}
                style="background: #${this.leftColor.getHex()}"
              ></div>
            </td>
            <td>
              <div
                class="color-selection ${this.activeColor===Nt.RIGHT?"active":""}"
                @click=${this.setActiveColorRight}
                style="background: #${this.rightColor.getHex()}"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table mb-0">
        <tbody>
          <tr>
            <th>RGB</th>
            <td>
              <div
                class="gradient"
                style="background: ${this.colorGradient.getBackgroundImageStyle(Mt.RGB)}"
                data-mode=${Mt.RGB}
                @mousedown=${this.onMouseMoveGradient}
                @mousemove=${this.onMouseMoveGradient}
              ></div>
            </td>
          </tr>
          <tr>
            <th>HSL</th>
            <td>
              <div
                class="gradient"
                style="background: ${this.colorGradient.getBackgroundImageStyle(Mt.HSL)}"
                data-mode=${Mt.HSL}
                @mousedown=${this.onMouseMoveGradient}
                @mousemove=${this.onMouseMoveGradient}
              ></div>
            </td>
          </tr>
          <tr>
            <th>HSL*</th>
            <td>
              <div
                class="gradient"
                style="background: ${this.colorGradient.getBackgroundImageStyle(Mt.HSL_FLIP)}"
                data-mode=${Mt.HSL_FLIP}
                @mousedown=${this.onMouseMoveGradient}
                @mousemove=${this.onMouseMoveGradient}
              ></div>
            </td>
          </tr>
          <tr>
            <th>LCH</th>
            <td>
              <div
                class="gradient"
                style="background: ${this.colorGradient.getBackgroundImageStyle(Mt.LCH)}"
                data-mode=${Mt.LCH}
                @mousedown=${this.onMouseMoveGradient}
                @mousemove=${this.onMouseMoveGradient}
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    `}};Gt.styles=[Bt],It([ft()],Gt.prototype,"activeColor",void 0),It([ft({attribute:!1})],Gt.prototype,"leftColor",void 0),It([ft({attribute:!1})],Gt.prototype,"rightColor",void 0),Gt=It([dt("color-interpolation")],Gt);const Dt=s`:host {
  display: block;
  width: 100%;
  height: 100%;
}

.main-container {
  --gap: 1rem;
  gap: var(--gap);
  padding: var(--gap);
}

::slotted(*) {
  border-radius: 1rem;
  background: #eee;
  padding: 1rem;
  text-align: center;
  flex: 1 1 30%;
  display: flex;
  flex-direction: column;
}`;class Ut extends Event{constructor(t){super(Ut.eventName,{bubbles:!0,composed:!0}),this.coordinates=t}}Ut.eventName="set-coordinates";const Ft=s`.color-grad-container {
  width: 100%;
  position: relative;
  min-height: 10rem;
  min-width: 10rem;
  flex-grow: 1;
}

.color-grad {
  position: absolute;
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}

.color-grad-1 {
  z-index: 0;
  background: linear-gradient(to right, #ffffff 0%, #f00 100%);
}

.color-grad-2 {
  z-index: 1;
  background: linear-gradient(to bottom, #ffffff00 0%, #000 100%);
}

.color-grad-circle {
  z-index: 2;
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-radius: 99rem;
  border-style: solid;
  border-color: black;
  border-width: 0.1rem;
  pointer-events: none;
}

.color-bar {
  width: 100%;
  height: 1.5rem;
  margin-top: 0.5rem;
  border-radius: 0.25rem;
  background: linear-gradient(to right,
      #f00 0%,
      #ff0 17%,
      #0f0 33%,
      #0ff 50%,
      #00f 66%,
      #f0f 83%,
      #f00 100%);
}`,Vt=s`.color-bar-pointer {
    height: 0;
    width: 0;
    border-left: 0.4em solid transparent;
    border-right: 0.4em solid transparent;
    border-bottom: 0.5em solid black;
    position: relative;
    transform: translateX(-50%);
    top: 60%;
}

.color-bar-pointer-2 {
    height: 0;
    width: 0;
    border-left: 0.4em solid black;
    border-right: 0.4em solid black;
    border-bottom: 0.4em solid black;
    position: absolute;
    transform: translateX(-50%);
    top: 0.5em;
}

.color-bar-pointer-3 {
    height: 0;
    width: 0;
    border-left: 0.3em solid transparent;
    border-right: 0.3em solid transparent;
    border-bottom: 0.375em solid;
    border-bottom-color: white;
    position: absolute;
    transform: translateX(-50%);
    top: 0.125em;
}

.color-bar-pointer-4 {
    height: 0;
    width: 0;
    border-left: 0.3em solid white;
    border-right: 0.3em solid white;
    border-bottom: 0.3em solid white;
    position: absolute;
    transform: translateX(-50%);
    top: 0.5em;
}`;var Wt=function(t,e,o,i){var r,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(n<3?r(s):n>3?r(e,o,s):r(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s};let qt=class extends ct{constructor(){super(...arguments),this.hue=0}render(){const t="#"+new Ot({type:Et.HSV,h:this.hue,s:100,v:100}).getHex(),e=this.hue/360*100+"%";return V`
      <div class="color-bar-pointer" style="left: ${e};">
        <div class="color-bar-pointer-2"></div>
        <div
          class="color-bar-pointer-3"
          style="border-bottom-color: ${t};"
        ></div>
        <div
          class="color-bar-pointer-4"
          style="border-color: ${t};"
        ></div>
      </div>
    `}};qt.styles=[Vt],Wt([ft({type:Number})],qt.prototype,"hue",void 0),qt=Wt([dt("color-selection-bar-pointer")],qt);var Xt=function(t,e,o,i){var r,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(n<3?r(s):n>3?r(e,o,s):r(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s};let Yt=class extends ct{constructor(){super(...arguments),this.color=new Ot}setColor(t){this.dispatchEvent(new zt(t))}onMouseMoveColorGrad(t){const[e]=this.color.getHSV();if(1==t.buttons){const o=t.currentTarget.getBoundingClientRect(),i=100*bt()((t.clientX-o.left)/o.width,0,1),r=100*(1-bt()((t.clientY-o.top)/o.height,0,1));this.setColor(new Ot({type:Et.HSV,h:e,s:i,v:r}))}}onMouseMoveColorBar(t){const[,e,o]=this.color.getHSV();if(1==t.buttons){const i=t.currentTarget.getBoundingClientRect(),r=360*bt()((t.clientX-i.left)/i.width,0,1);this.setColor(new Ot({type:Et.HSV,h:r,s:e,v:o}))}}render(){const[t,e,o]=this.color.getHSV(),i=`linear-gradient(to right, #FFF 0%, ${"#"+new Ot({type:Et.HSV,h:t,s:100,v:100}).getHex()} 100%)`,r=`\n      top: calc(${100*(1-o/100)}% - 0.5rem);\n      left: calc(${e/100*100}% - 0.5rem);\n      background-color: #${this.color.getHex()};\n      border-color: ${o<50?"white":"black"};\n    `;return V`
      ${Tt}
      <h5>Color Selection</h5>
      <div class="color-grad-container">
        <div
          class="color-grad color-grad-1"
          style="background: ${i};"
        ></div>
        <div
          class="color-grad color-grad-2"
          @mousemove=${this.onMouseMoveColorGrad}
          @mousedown=${this.onMouseMoveColorGrad}
        ></div>
        <div class="color-grad-circle" style=${r}></div>
      </div>
      <div
        class="color-bar"
        @mousemove=${this.onMouseMoveColorBar}
        @mousedown=${this.onMouseMoveColorBar}
      >
        <color-selection-bar-pointer
          hue=${t}
        ></color-selection-bar-pointer>
      </div>
    `}};Yt.styles=[Ft],Xt([ft({attribute:!1})],Yt.prototype,"color",void 0),Yt=Xt([dt("color-selection")],Yt);const Kt=s`.inputs-container {
  gap: 0.25rem;
}

table > * {
  --bs-table-bg: transparent;
}
`;var Zt=s`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,Jt=s`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;const Qt=new Set,te=new Map;let ee,oe="ltr",ie="en";const re="undefined"!=typeof MutationObserver&&"undefined"!=typeof document&&void 0!==document.documentElement;if(re){const t=new MutationObserver(se);oe=document.documentElement.dir||"ltr",ie=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function ne(...t){t.map((t=>{const e=t.$code.toLowerCase();te.has(e)?te.set(e,Object.assign(Object.assign({},te.get(e)),t)):te.set(e,t),ee||(ee=t)})),se()}function se(){re&&(oe=document.documentElement.dir||"ltr",ie=document.documentElement.lang||navigator.language),[...Qt.keys()].map((t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()}))}class ae{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){Qt.add(this.host)}hostDisconnected(){Qt.delete(this.host)}dir(){return`${this.host.dir||oe}`.toLowerCase()}lang(){return`${this.host.lang||ie}`.toLowerCase()}getTranslationData(t){var e,o;const i=new Intl.Locale(t.replace(/_/g,"-")),r=null==i?void 0:i.language.toLowerCase(),n=null!==(o=null===(e=null==i?void 0:i.region)||void 0===e?void 0:e.toLowerCase())&&void 0!==o?o:"";return{locale:i,language:r,region:n,primary:te.get(`${r}-${n}`),secondary:te.get(r)}}exists(t,e){var o;const{primary:i,secondary:r}=this.getTranslationData(null!==(o=e.lang)&&void 0!==o?o:this.lang());return e=Object.assign({includeFallback:!1},e),!!(i&&i[t]||r&&r[t]||e.includeFallback&&ee&&ee[t])}term(t,...e){const{primary:o,secondary:i}=this.getTranslationData(this.lang());let r;if(o&&o[t])r=o[t];else if(i&&i[t])r=i[t];else{if(!ee||!ee[t])return console.error(`No translation found for: ${String(t)}`),String(t);r=ee[t]}return"function"==typeof r?r(...e):r}date(t,e){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),e).format(t)}number(t,e){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),e).format(t)}relativeTime(t,e,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(t,e)}}var le={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};ne(le);var ce=le,he=class extends ae{};ne(ce);var de,pe=s`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,ue=Object.defineProperty,fe=Object.defineProperties,ge=Object.getOwnPropertyDescriptor,me=Object.getOwnPropertyDescriptors,ye=Object.getOwnPropertySymbols,ve=Object.prototype.hasOwnProperty,be=Object.prototype.propertyIsEnumerable,we=t=>{throw TypeError(t)},$e=(t,e,o)=>e in t?ue(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,xe=(t,e)=>{for(var o in e||(e={}))ve.call(e,o)&&$e(t,o,e[o]);if(ye)for(var o of ye(e))be.call(e,o)&&$e(t,o,e[o]);return t},Ce=(t,e)=>fe(t,me(e)),_e=(t,e,o,i)=>{for(var r,n=i>1?void 0:i?ge(e,o):e,s=t.length-1;s>=0;s--)(r=t[s])&&(n=(i?r(e,o,n):r(n))||n);return i&&n&&ue(e,o,n),n},Ae=(t,e,o)=>e.has(t)||we("Cannot "+o),Se=class extends ct{constructor(){var t,e;super(),t=this,(e=de).has(t)?we("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,false),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach((([t,e])=>{this.constructor.define(t,e)}))}emit(t,e){const o=new CustomEvent(t,xe({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(o),o}static define(t,e=this,o={}){const i=customElements.get(t);if(!i){try{customElements.define(t,e,o)}catch(i){customElements.define(t,class extends e{},o)}return}let r=" (unknown version)",n=r;"version"in e&&e.version&&(r=" v"+e.version),"version"in i&&i.version&&(n=" v"+i.version),r&&n&&r===n||console.warn(`Attempted to register <${t}>${r}, but <${t}>${n} has already been registered.`)}attributeChangedCallback(t,e,o){var i;Ae(this,i=de,"read from private field"),i.get(this)||(this.constructor.elementProperties.forEach(((t,e)=>{t.reflect&&null!=this[e]&&this.initialReflectedProperties.set(e,this[e])})),((t,e,o)=>{Ae(t,e,"write to private field"),e.set(t,o)})(this,de,!0)),super.attributeChangedCallback(t,e,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach(((e,o)=>{t.has(o)&&null==this[o]&&(this[o]=e)}))}};de=new WeakMap,Se.version="2.19.1",Se.dependencies={},_e([ft()],Se.prototype,"dir",2),_e([ft()],Se.prototype,"lang",2);const ke=Math.min,Ee=Math.max,Me=Math.round,Re=Math.floor,Pe=t=>({x:t,y:t}),Le={left:"right",right:"left",bottom:"top",top:"bottom"},Oe={start:"end",end:"start"};function He(t,e,o){return Ee(t,ke(e,o))}function Be(t,e){return"function"==typeof t?t(e):t}function Te(t){return t.split("-")[0]}function ze(t){return t.split("-")[1]}function je(t){return"x"===t?"y":"x"}function Ne(t){return"y"===t?"height":"width"}function Ie(t){return["top","bottom"].includes(Te(t))?"y":"x"}function Ge(t){return je(Ie(t))}function De(t){return t.replace(/start|end/g,(t=>Oe[t]))}function Ue(t){return t.replace(/left|right|bottom|top/g,(t=>Le[t]))}function Fe(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function Ve(t){const{x:e,y:o,width:i,height:r}=t;return{width:i,height:r,top:o,left:e,right:e+i,bottom:o+r,x:e,y:o}}function We(t,e,o){let{reference:i,floating:r}=t;const n=Ie(e),s=Ge(e),a=Ne(s),l=Te(e),c="y"===n,h=i.x+i.width/2-r.width/2,d=i.y+i.height/2-r.height/2,p=i[a]/2-r[a]/2;let u;switch(l){case"top":u={x:h,y:i.y-r.height};break;case"bottom":u={x:h,y:i.y+i.height};break;case"right":u={x:i.x+i.width,y:d};break;case"left":u={x:i.x-r.width,y:d};break;default:u={x:i.x,y:i.y}}switch(ze(e)){case"start":u[s]-=p*(o&&c?-1:1);break;case"end":u[s]+=p*(o&&c?-1:1)}return u}async function qe(t,e){var o;void 0===e&&(e={});const{x:i,y:r,platform:n,rects:s,elements:a,strategy:l}=t,{boundary:c="clippingAncestors",rootBoundary:h="viewport",elementContext:d="floating",altBoundary:p=!1,padding:u=0}=Be(e,t),f=Fe(u),g=a[p?"floating"===d?"reference":"floating":d],m=Ve(await n.getClippingRect({element:null==(o=await(null==n.isElement?void 0:n.isElement(g)))||o?g:g.contextElement||await(null==n.getDocumentElement?void 0:n.getDocumentElement(a.floating)),boundary:c,rootBoundary:h,strategy:l})),y="floating"===d?{x:i,y:r,width:s.floating.width,height:s.floating.height}:s.reference,v=await(null==n.getOffsetParent?void 0:n.getOffsetParent(a.floating)),b=await(null==n.isElement?void 0:n.isElement(v))&&await(null==n.getScale?void 0:n.getScale(v))||{x:1,y:1},w=Ve(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:y,offsetParent:v,strategy:l}):y);return{top:(m.top-w.top+f.top)/b.y,bottom:(w.bottom-m.bottom+f.bottom)/b.y,left:(m.left-w.left+f.left)/b.x,right:(w.right-m.right+f.right)/b.x}}function Xe(){return"undefined"!=typeof window}function Ye(t){return Je(t)?(t.nodeName||"").toLowerCase():"#document"}function Ke(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function Ze(t){var e;return null==(e=(Je(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function Je(t){return!!Xe()&&(t instanceof Node||t instanceof Ke(t).Node)}function Qe(t){return!!Xe()&&(t instanceof Element||t instanceof Ke(t).Element)}function to(t){return!!Xe()&&(t instanceof HTMLElement||t instanceof Ke(t).HTMLElement)}function eo(t){return!(!Xe()||"undefined"==typeof ShadowRoot)&&(t instanceof ShadowRoot||t instanceof Ke(t).ShadowRoot)}function oo(t){const{overflow:e,overflowX:o,overflowY:i,display:r}=lo(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+o)&&!["inline","contents"].includes(r)}function io(t){return["table","td","th"].includes(Ye(t))}function ro(t){return[":popover-open",":modal"].some((e=>{try{return t.matches(e)}catch(t){return!1}}))}function no(t){const e=so(),o=Qe(t)?lo(t):t;return["transform","translate","scale","rotate","perspective"].some((t=>!!o[t]&&"none"!==o[t]))||!!o.containerType&&"normal"!==o.containerType||!e&&!!o.backdropFilter&&"none"!==o.backdropFilter||!e&&!!o.filter&&"none"!==o.filter||["transform","translate","scale","rotate","perspective","filter"].some((t=>(o.willChange||"").includes(t)))||["paint","layout","strict","content"].some((t=>(o.contain||"").includes(t)))}function so(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function ao(t){return["html","body","#document"].includes(Ye(t))}function lo(t){return Ke(t).getComputedStyle(t)}function co(t){return Qe(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function ho(t){if("html"===Ye(t))return t;const e=t.assignedSlot||t.parentNode||eo(t)&&t.host||Ze(t);return eo(e)?e.host:e}function po(t){const e=ho(t);return ao(e)?t.ownerDocument?t.ownerDocument.body:t.body:to(e)&&oo(e)?e:po(e)}function uo(t,e,o){var i;void 0===e&&(e=[]),void 0===o&&(o=!0);const r=po(t),n=r===(null==(i=t.ownerDocument)?void 0:i.body),s=Ke(r);if(n){const t=fo(s);return e.concat(s,s.visualViewport||[],oo(r)?r:[],t&&o?uo(t):[])}return e.concat(r,uo(r,[],o))}function fo(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function go(t){const e=lo(t);let o=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const r=to(t),n=r?t.offsetWidth:o,s=r?t.offsetHeight:i,a=Me(o)!==n||Me(i)!==s;return a&&(o=n,i=s),{width:o,height:i,$:a}}function mo(t){return Qe(t)?t:t.contextElement}function yo(t){const e=mo(t);if(!to(e))return Pe(1);const o=e.getBoundingClientRect(),{width:i,height:r,$:n}=go(e);let s=(n?Me(o.width):o.width)/i,a=(n?Me(o.height):o.height)/r;return s&&Number.isFinite(s)||(s=1),a&&Number.isFinite(a)||(a=1),{x:s,y:a}}const vo=Pe(0);function bo(t){const e=Ke(t);return so()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:vo}function wo(t,e,o,i){void 0===e&&(e=!1),void 0===o&&(o=!1);const r=t.getBoundingClientRect(),n=mo(t);let s=Pe(1);e&&(i?Qe(i)&&(s=yo(i)):s=yo(t));const a=function(t,e,o){return void 0===e&&(e=!1),!(!o||e&&o!==Ke(t))&&e}(n,o,i)?bo(n):Pe(0);let l=(r.left+a.x)/s.x,c=(r.top+a.y)/s.y,h=r.width/s.x,d=r.height/s.y;if(n){const t=Ke(n),e=i&&Qe(i)?Ke(i):i;let o=t,r=fo(o);for(;r&&i&&e!==o;){const t=yo(r),e=r.getBoundingClientRect(),i=lo(r),n=e.left+(r.clientLeft+parseFloat(i.paddingLeft))*t.x,s=e.top+(r.clientTop+parseFloat(i.paddingTop))*t.y;l*=t.x,c*=t.y,h*=t.x,d*=t.y,l+=n,c+=s,o=Ke(r),r=fo(o)}}return Ve({width:h,height:d,x:l,y:c})}function $o(t,e){const o=co(t).scrollLeft;return e?e.left+o:wo(Ze(t)).left+o}function xo(t,e,o){void 0===o&&(o=!1);const i=t.getBoundingClientRect();return{x:i.left+e.scrollLeft-(o?0:$o(t,i)),y:i.top+e.scrollTop}}function Co(t,e,o){let i;if("viewport"===e)i=function(t,e){const o=Ke(t),i=Ze(t),r=o.visualViewport;let n=i.clientWidth,s=i.clientHeight,a=0,l=0;if(r){n=r.width,s=r.height;const t=so();(!t||t&&"fixed"===e)&&(a=r.offsetLeft,l=r.offsetTop)}return{width:n,height:s,x:a,y:l}}(t,o);else if("document"===e)i=function(t){const e=Ze(t),o=co(t),i=t.ownerDocument.body,r=Ee(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),n=Ee(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let s=-o.scrollLeft+$o(t);const a=-o.scrollTop;return"rtl"===lo(i).direction&&(s+=Ee(e.clientWidth,i.clientWidth)-r),{width:r,height:n,x:s,y:a}}(Ze(t));else if(Qe(e))i=function(t,e){const o=wo(t,!0,"fixed"===e),i=o.top+t.clientTop,r=o.left+t.clientLeft,n=to(t)?yo(t):Pe(1);return{width:t.clientWidth*n.x,height:t.clientHeight*n.y,x:r*n.x,y:i*n.y}}(e,o);else{const o=bo(t);i={x:e.x-o.x,y:e.y-o.y,width:e.width,height:e.height}}return Ve(i)}function _o(t,e){const o=ho(t);return!(o===e||!Qe(o)||ao(o))&&("fixed"===lo(o).position||_o(o,e))}function Ao(t,e,o){const i=to(e),r=Ze(e),n="fixed"===o,s=wo(t,!0,n,e);let a={scrollLeft:0,scrollTop:0};const l=Pe(0);if(i||!i&&!n)if(("body"!==Ye(e)||oo(r))&&(a=co(e)),i){const t=wo(e,!0,n,e);l.x=t.x+e.clientLeft,l.y=t.y+e.clientTop}else r&&(l.x=$o(r));const c=!r||i||n?Pe(0):xo(r,a);return{x:s.left+a.scrollLeft-l.x-c.x,y:s.top+a.scrollTop-l.y-c.y,width:s.width,height:s.height}}function So(t){return"static"===lo(t).position}function ko(t,e){if(!to(t)||"fixed"===lo(t).position)return null;if(e)return e(t);let o=t.offsetParent;return Ze(t)===o&&(o=o.ownerDocument.body),o}function Eo(t,e){const o=Ke(t);if(ro(t))return o;if(!to(t)){let e=ho(t);for(;e&&!ao(e);){if(Qe(e)&&!So(e))return e;e=ho(e)}return o}let i=ko(t,e);for(;i&&io(i)&&So(i);)i=ko(i,e);return i&&ao(i)&&So(i)&&!no(i)?o:i||function(t){let e=ho(t);for(;to(e)&&!ao(e);){if(no(e))return e;if(ro(e))return null;e=ho(e)}return null}(t)||o}const Mo={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:e,rect:o,offsetParent:i,strategy:r}=t;const n="fixed"===r,s=Ze(i),a=!!e&&ro(e.floating);if(i===s||a&&n)return o;let l={scrollLeft:0,scrollTop:0},c=Pe(1);const h=Pe(0),d=to(i);if((d||!d&&!n)&&(("body"!==Ye(i)||oo(s))&&(l=co(i)),to(i))){const t=wo(i);c=yo(i),h.x=t.x+i.clientLeft,h.y=t.y+i.clientTop}const p=!s||d||n?Pe(0):xo(s,l,!0);return{width:o.width*c.x,height:o.height*c.y,x:o.x*c.x-l.scrollLeft*c.x+h.x+p.x,y:o.y*c.y-l.scrollTop*c.y+h.y+p.y}},getDocumentElement:Ze,getClippingRect:function(t){let{element:e,boundary:o,rootBoundary:i,strategy:r}=t;const n=[..."clippingAncestors"===o?ro(e)?[]:function(t,e){const o=e.get(t);if(o)return o;let i=uo(t,[],!1).filter((t=>Qe(t)&&"body"!==Ye(t))),r=null;const n="fixed"===lo(t).position;let s=n?ho(t):t;for(;Qe(s)&&!ao(s);){const e=lo(s),o=no(s);o||"fixed"!==e.position||(r=null),(n?!o&&!r:!o&&"static"===e.position&&r&&["absolute","fixed"].includes(r.position)||oo(s)&&!o&&_o(t,s))?i=i.filter((t=>t!==s)):r=e,s=ho(s)}return e.set(t,i),i}(e,this._c):[].concat(o),i],s=n[0],a=n.reduce(((t,o)=>{const i=Co(e,o,r);return t.top=Ee(i.top,t.top),t.right=ke(i.right,t.right),t.bottom=ke(i.bottom,t.bottom),t.left=Ee(i.left,t.left),t}),Co(e,s,r));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}},getOffsetParent:Eo,getElementRects:async function(t){const e=this.getOffsetParent||Eo,o=this.getDimensions,i=await o(t.floating);return{reference:Ao(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}},getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){const{width:e,height:o}=go(t);return{width:e,height:o}},getScale:yo,isElement:Qe,isRTL:function(t){return"rtl"===lo(t).direction}};function Ro(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}const Po=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(e){var o,i;const{placement:r,rects:n,platform:s,elements:a}=e,{apply:l=()=>{},...c}=Be(t,e),h=await qe(e,c),d=Te(r),p=ze(r),u="y"===Ie(r),{width:f,height:g}=n.floating;let m,y;"top"===d||"bottom"===d?(m=d,y=p===(await(null==s.isRTL?void 0:s.isRTL(a.floating))?"start":"end")?"left":"right"):(y=d,m="end"===p?"top":"bottom");const v=g-h.top-h.bottom,b=f-h.left-h.right,w=ke(g-h[m],v),$=ke(f-h[y],b),x=!e.middlewareData.shift;let C=w,_=$;if(null!=(o=e.middlewareData.shift)&&o.enabled.x&&(_=b),null!=(i=e.middlewareData.shift)&&i.enabled.y&&(C=v),x&&!p){const t=Ee(h.left,0),e=Ee(h.right,0),o=Ee(h.top,0),i=Ee(h.bottom,0);u?_=f-2*(0!==t||0!==e?t+e:Ee(h.left,h.right)):C=g-2*(0!==o||0!==i?o+i:Ee(h.top,h.bottom))}await l({...e,availableWidth:_,availableHeight:C});const A=await s.getDimensions(a.floating);return f!==A.width||g!==A.height?{reset:{rects:!0}}:{}}}},Lo=t=>(...e)=>({_$litDirective$:t,values:e});class Oo{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const Ho=Lo(class extends Oo{constructor(t){if(super(t),1!==t.type||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const o=t.element.classList;for(const t of this.st)t in e||(o.remove(t),this.st.delete(t));for(const t in e){const i=!!e[t];i===this.st.has(t)||this.nt?.has(t)||(i?(o.add(t),this.st.add(t)):(o.remove(t),this.st.delete(t)))}return W}});function Bo(t){return function(t){for(let e=t;e;e=To(e))if(e instanceof Element&&"none"===getComputedStyle(e).display)return null;for(let e=To(t);e;e=To(e)){if(!(e instanceof Element))continue;const t=getComputedStyle(e);if("contents"!==t.display){if("static"!==t.position||no(t))return e;if("BODY"===e.tagName)return e}}return null}(t)}function To(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}var zo=class extends Se{constructor(){super(...arguments),this.localize=new he(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect();let o=0,i=0,r=0,n=0,s=0,a=0,l=0,c=0;this.placement.includes("top")||this.placement.includes("bottom")?t.top<e.top?(o=t.left,i=t.bottom,r=t.right,n=t.bottom,s=e.left,a=e.top,l=e.right,c=e.top):(o=e.left,i=e.bottom,r=e.right,n=e.bottom,s=t.left,a=t.top,l=t.right,c=t.top):t.left<e.left?(o=t.right,i=t.top,r=e.left,n=e.top,s=t.right,a=t.bottom,l=e.left,c=e.bottom):(o=e.right,i=e.top,r=t.left,n=t.top,s=e.right,a=e.bottom,l=t.left,c=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${r}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${c}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||function(t){return null!==t&&"object"==typeof t&&"getBoundingClientRect"in t&&(!("contextElement"in t)||t instanceof Element)}(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){this.anchorEl&&this.active&&(this.cleanup=function(t,e,o,i){void 0===i&&(i={});const{ancestorScroll:r=!0,ancestorResize:n=!0,elementResize:s="function"==typeof ResizeObserver,layoutShift:a="function"==typeof IntersectionObserver,animationFrame:l=!1}=i,c=mo(t),h=r||n?[...c?uo(c):[],...uo(e)]:[];h.forEach((t=>{r&&t.addEventListener("scroll",o,{passive:!0}),n&&t.addEventListener("resize",o)}));const d=c&&a?function(t,e){let o,i=null;const r=Ze(t);function n(){var t;clearTimeout(o),null==(t=i)||t.disconnect(),i=null}return function s(a,l){void 0===a&&(a=!1),void 0===l&&(l=1),n();const c=t.getBoundingClientRect(),{left:h,top:d,width:p,height:u}=c;if(a||e(),!p||!u)return;const f={rootMargin:-Re(d)+"px "+-Re(r.clientWidth-(h+p))+"px "+-Re(r.clientHeight-(d+u))+"px "+-Re(h)+"px",threshold:Ee(0,ke(1,l))||1};let g=!0;function m(e){const i=e[0].intersectionRatio;if(i!==l){if(!g)return s();i?s(!1,i):o=setTimeout((()=>{s(!1,1e-7)}),1e3)}1!==i||Ro(c,t.getBoundingClientRect())||s(),g=!1}try{i=new IntersectionObserver(m,{...f,root:r.ownerDocument})}catch(t){i=new IntersectionObserver(m,f)}i.observe(t)}(!0),n}(c,o):null;let p,u=-1,f=null;s&&(f=new ResizeObserver((t=>{let[i]=t;i&&i.target===c&&f&&(f.unobserve(e),cancelAnimationFrame(u),u=requestAnimationFrame((()=>{var t;null==(t=f)||t.observe(e)}))),o()})),c&&!l&&f.observe(c),f.observe(e));let g=l?wo(t):null;return l&&function e(){const i=wo(t);g&&!Ro(g,i)&&o(),g=i,p=requestAnimationFrame(e)}(),o(),()=>{var t;h.forEach((t=>{r&&t.removeEventListener("scroll",o),n&&t.removeEventListener("resize",o)})),null==d||d(),null==(t=f)||t.disconnect(),f=null,l&&cancelAnimationFrame(p)}}(this.anchorEl,this.popup,(()=>{this.reposition()})))}async stop(){return new Promise((t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame((()=>t()))):t()}))}reposition(){if(!this.active||!this.anchorEl)return;const t=[(e={mainAxis:this.distance,crossAxis:this.skidding},void 0===e&&(e=0),{name:"offset",options:e,async fn(t){var o,i;const{x:r,y:n,placement:s,middlewareData:a}=t,l=await async function(t,e){const{placement:o,platform:i,elements:r}=t,n=await(null==i.isRTL?void 0:i.isRTL(r.floating)),s=Te(o),a=ze(o),l="y"===Ie(o),c=["left","top"].includes(s)?-1:1,h=n&&l?-1:1,d=Be(e,t);let{mainAxis:p,crossAxis:u,alignmentAxis:f}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return a&&"number"==typeof f&&(u="end"===a?-1*f:f),l?{x:u*h,y:p*c}:{x:p*c,y:u*h}}(t,e);return s===(null==(o=a.offset)?void 0:o.placement)&&null!=(i=a.arrow)&&i.alignmentOffset?{}:{x:r+l.x,y:n+l.y,data:{...l,placement:s}}}})];var e;this.sync?t.push(Po({apply:({rects:t})=>{const e="width"===this.sync||"both"===this.sync,o="height"===this.sync||"both"===this.sync;this.popup.style.width=e?`${t.reference.width}px`:"",this.popup.style.height=o?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var o,i;const{placement:r,middlewareData:n,rects:s,initialPlacement:a,platform:l,elements:c}=e,{mainAxis:h=!0,crossAxis:d=!0,fallbackPlacements:p,fallbackStrategy:u="bestFit",fallbackAxisSideDirection:f="none",flipAlignment:g=!0,...m}=Be(t,e);if(null!=(o=n.arrow)&&o.alignmentOffset)return{};const y=Te(r),v=Ie(a),b=Te(a)===a,w=await(null==l.isRTL?void 0:l.isRTL(c.floating)),$=p||(b||!g?[Ue(a)]:function(t){const e=Ue(t);return[De(t),e,De(e)]}(a)),x="none"!==f;!p&&x&&$.push(...function(t,e,o,i){const r=ze(t);let n=function(t,e,o){const i=["left","right"],r=["right","left"],n=["top","bottom"],s=["bottom","top"];switch(t){case"top":case"bottom":return o?e?r:i:e?i:r;case"left":case"right":return e?n:s;default:return[]}}(Te(t),"start"===o,i);return r&&(n=n.map((t=>t+"-"+r)),e&&(n=n.concat(n.map(De)))),n}(a,g,f,w));const C=[a,...$],_=await qe(e,m),A=[];let S=(null==(i=n.flip)?void 0:i.overflows)||[];if(h&&A.push(_[y]),d){const t=function(t,e,o){void 0===o&&(o=!1);const i=ze(t),r=Ge(t),n=Ne(r);let s="x"===r?i===(o?"end":"start")?"right":"left":"start"===i?"bottom":"top";return e.reference[n]>e.floating[n]&&(s=Ue(s)),[s,Ue(s)]}(r,s,w);A.push(_[t[0]],_[t[1]])}if(S=[...S,{placement:r,overflows:A}],!A.every((t=>t<=0))){var k,E;const t=((null==(k=n.flip)?void 0:k.index)||0)+1,e=C[t];if(e)return{data:{index:t,overflows:S},reset:{placement:e}};let o=null==(E=S.filter((t=>t.overflows[0]<=0)).sort(((t,e)=>t.overflows[1]-e.overflows[1]))[0])?void 0:E.placement;if(!o)switch(u){case"bestFit":{var M;const t=null==(M=S.filter((t=>{if(x){const e=Ie(t.placement);return e===v||"y"===e}return!0})).map((t=>[t.placement,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:M[0];t&&(o=t);break}case"initialPlacement":o=a}if(r!==o)return{reset:{placement:o}}}return{}}}}({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:i,placement:r}=e,{mainAxis:n=!0,crossAxis:s=!1,limiter:a={fn:t=>{let{x:e,y:o}=t;return{x:e,y:o}}},...l}=Be(t,e),c={x:o,y:i},h=await qe(e,l),d=Ie(Te(r)),p=je(d);let u=c[p],f=c[d];if(n){const t="y"===p?"bottom":"right";u=He(u+h["y"===p?"top":"left"],u,u-h[t])}if(s){const t="y"===d?"bottom":"right";f=He(f+h["y"===d?"top":"left"],f,f-h[t])}const g=a.fn({...e,[p]:u,[d]:f});return{...g,data:{x:g.x-o,y:g.y-i,enabled:{[p]:n,[d]:s}}}}}}({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(Po({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:e})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${e}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push((t=>({name:"arrow",options:t,async fn(e){const{x:o,y:i,placement:r,rects:n,platform:s,elements:a,middlewareData:l}=e,{element:c,padding:h=0}=Be(t,e)||{};if(null==c)return{};const d=Fe(h),p={x:o,y:i},u=Ge(r),f=Ne(u),g=await s.getDimensions(c),m="y"===u,y=m?"top":"left",v=m?"bottom":"right",b=m?"clientHeight":"clientWidth",w=n.reference[f]+n.reference[u]-p[u]-n.floating[f],$=p[u]-n.reference[u],x=await(null==s.getOffsetParent?void 0:s.getOffsetParent(c));let C=x?x[b]:0;C&&await(null==s.isElement?void 0:s.isElement(x))||(C=a.floating[b]||n.floating[f]);const _=w/2-$/2,A=C/2-g[f]/2-1,S=ke(d[y],A),k=ke(d[v],A),E=S,M=C-g[f]-k,R=C/2-g[f]/2+_,P=He(E,R,M),L=!l.arrow&&null!=ze(r)&&R!==P&&n.reference[f]/2-(R<E?S:k)-g[f]/2<0,O=L?R<E?R-E:R-M:0;return{[u]:p[u]+O,data:{[u]:P,centerOffset:R-P-O,...L&&{alignmentOffset:O}},reset:L}}}))({element:this.arrowEl,padding:this.arrowPadding}));const o="absolute"===this.strategy?t=>Mo.getOffsetParent(t,Bo):Mo.getOffsetParent;((t,e,o)=>{const i=new Map,r={platform:Mo,...o},n={...r.platform,_c:i};return(async(t,e,o)=>{const{placement:i="bottom",strategy:r="absolute",middleware:n=[],platform:s}=o,a=n.filter(Boolean),l=await(null==s.isRTL?void 0:s.isRTL(e));let c=await s.getElementRects({reference:t,floating:e,strategy:r}),{x:h,y:d}=We(c,i,l),p=i,u={},f=0;for(let o=0;o<a.length;o++){const{name:n,fn:g}=a[o],{x:m,y,data:v,reset:b}=await g({x:h,y:d,initialPlacement:i,placement:p,strategy:r,middlewareData:u,rects:c,platform:s,elements:{reference:t,floating:e}});h=null!=m?m:h,d=null!=y?y:d,u={...u,[n]:{...u[n],...v}},b&&f<=50&&(f++,"object"==typeof b&&(b.placement&&(p=b.placement),b.rects&&(c=!0===b.rects?await s.getElementRects({reference:t,floating:e,strategy:r}):b.rects),({x:h,y:d}=We(c,p,l))),o=-1)}return{x:h,y:d,placement:p,strategy:r,middlewareData:u}})(t,e,{...r,platform:n})})(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:Ce(xe({},Mo),{getOffsetParent:o})}).then((({x:t,y:e,middlewareData:o,placement:i})=>{const r="rtl"===this.localize.dir(),n={top:"bottom",right:"left",bottom:"top",left:"right"}[i.split("-")[0]];if(this.setAttribute("data-current-placement",i),Object.assign(this.popup.style,{left:`${t}px`,top:`${e}px`}),this.arrow){const t=o.arrow.x,e=o.arrow.y;let i="",s="",a="",l="";if("start"===this.arrowPlacement){const o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",s=r?o:"",l=r?"":o}else if("end"===this.arrowPlacement){const o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";s=r?"":o,l=r?o:"",a="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(l="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",i="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":""):(l="number"==typeof t?`${t}px`:"",i="number"==typeof e?`${e}px`:"");Object.assign(this.arrowEl.style,{top:i,right:s,bottom:a,left:l,[n]:"calc(var(--arrow-size-diagonal) * -1)"})}})),requestAnimationFrame((()=>this.updateHoverBridge())),this.emit("sl-reposition")}render(){return V`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${Ho({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${Ho({popup:!0,"popup--active":this.active,"popup--fixed":"fixed"===this.strategy,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?V`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};zo.styles=[pe,Jt],_e([yt(".popup")],zo.prototype,"popup",2),_e([yt(".popup__arrow")],zo.prototype,"arrowEl",2),_e([ft()],zo.prototype,"anchor",2),_e([ft({type:Boolean,reflect:!0})],zo.prototype,"active",2),_e([ft({reflect:!0})],zo.prototype,"placement",2),_e([ft({reflect:!0})],zo.prototype,"strategy",2),_e([ft({type:Number})],zo.prototype,"distance",2),_e([ft({type:Number})],zo.prototype,"skidding",2),_e([ft({type:Boolean})],zo.prototype,"arrow",2),_e([ft({attribute:"arrow-placement"})],zo.prototype,"arrowPlacement",2),_e([ft({attribute:"arrow-padding",type:Number})],zo.prototype,"arrowPadding",2),_e([ft({type:Boolean})],zo.prototype,"flip",2),_e([ft({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map((t=>t.trim())).filter((t=>""!==t)),toAttribute:t=>t.join(" ")}})],zo.prototype,"flipFallbackPlacements",2),_e([ft({attribute:"flip-fallback-strategy"})],zo.prototype,"flipFallbackStrategy",2),_e([ft({type:Object})],zo.prototype,"flipBoundary",2),_e([ft({attribute:"flip-padding",type:Number})],zo.prototype,"flipPadding",2),_e([ft({type:Boolean})],zo.prototype,"shift",2),_e([ft({type:Object})],zo.prototype,"shiftBoundary",2),_e([ft({attribute:"shift-padding",type:Number})],zo.prototype,"shiftPadding",2),_e([ft({attribute:"auto-size"})],zo.prototype,"autoSize",2),_e([ft()],zo.prototype,"sync",2),_e([ft({type:Object})],zo.prototype,"autoSizeBoundary",2),_e([ft({attribute:"auto-size-padding",type:Number})],zo.prototype,"autoSizePadding",2),_e([ft({attribute:"hover-bridge",type:Boolean})],zo.prototype,"hoverBridge",2);var jo=new Map,No=new WeakMap;function Io(t,e){return"rtl"===e.toLowerCase()?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function Go(t,e){jo.set(t,function(t){return null!=t?t:{keyframes:[],options:{duration:0}}}(e))}function Do(t,e,o){const i=No.get(t);if(null==i?void 0:i[e])return Io(i[e],o.dir);const r=jo.get(e);return r?Io(r,o.dir):{keyframes:[],options:{duration:0}}}function Uo(t,e){return new Promise((o=>{t.addEventListener(e,(function i(r){r.target===t&&(t.removeEventListener(e,i),o())}))}))}function Fo(t,e,o){return new Promise((i=>{if((null==o?void 0:o.duration)===1/0)throw new Error("Promise-based animations must be finite.");const r=t.animate(e,Ce(xe({},o),{duration:window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:o.duration}));r.addEventListener("cancel",i,{once:!0}),r.addEventListener("finish",i,{once:!0})}))}function Vo(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?1e3*parseFloat(t):parseFloat(t)}function Wo(t){return Promise.all(t.getAnimations().map((t=>new Promise((e=>{t.cancel(),requestAnimationFrame(e)})))))}function qo(t,e){const o=xe({waitUntilFirstUpdate:!1},e);return(e,i)=>{const{update:r}=e,n=Array.isArray(t)?t:[t];e.update=function(t){n.forEach((e=>{const r=e;if(t.has(r)){const e=t.get(r),n=this[r];e!==n&&(o.waitUntilFirstUpdate&&!this.hasUpdated||this[i](e,n))}})),r.call(this,t)}}}var Xo=class extends Se{constructor(){super(),this.localize=new he(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const t=Vo(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>this.show()),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const t=Vo(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>this.hide()),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await Wo(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:e,options:o}=Do(this,"tooltip.show",{dir:this.localize.dir()});await Fo(this.popup.popup,e,o),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),null==(e=this.closeWatcher)||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await Wo(this.body);const{keyframes:t,options:o}=Do(this,"tooltip.hide",{dir:this.localize.dir()});await Fo(this.popup.popup,t,o),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Uo(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Uo(this,"sl-after-hide")}render(){return V`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${Ho({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};Xo.styles=[pe,Zt],Xo.dependencies={"sl-popup":zo},_e([yt("slot:not([name])")],Xo.prototype,"defaultSlot",2),_e([yt(".tooltip__body")],Xo.prototype,"body",2),_e([yt("sl-popup")],Xo.prototype,"popup",2),_e([ft()],Xo.prototype,"content",2),_e([ft()],Xo.prototype,"placement",2),_e([ft({type:Boolean,reflect:!0})],Xo.prototype,"disabled",2),_e([ft({type:Number})],Xo.prototype,"distance",2),_e([ft({type:Boolean,reflect:!0})],Xo.prototype,"open",2),_e([ft({type:Number})],Xo.prototype,"skidding",2),_e([ft()],Xo.prototype,"trigger",2),_e([ft({type:Boolean})],Xo.prototype,"hoist",2),_e([qo("open",{waitUntilFirstUpdate:!0})],Xo.prototype,"handleOpenChange",1),_e([qo(["content","distance","hoist","placement","skidding"])],Xo.prototype,"handleOptionsChange",1),_e([qo("disabled")],Xo.prototype,"handleDisabledChange",1),Go("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}}),Go("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});var Yo=s`
  :host {
    --error-color: var(--sl-color-danger-600);
    --success-color: var(--sl-color-success-600);

    display: inline-block;
  }

  .copy-button__button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
  }

  .copy-button--success .copy-button__button {
    color: var(--success-color);
  }

  .copy-button--error .copy-button__button {
    color: var(--error-color);
  }

  .copy-button__button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .copy-button__button[disabled] {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  slot {
    display: inline-flex;
  }
`,Ko=s`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`,Zo="";function Jo(t){Zo=t}var Qo={name:"default",resolver:t=>function(t=""){if(!Zo){const t=[...document.getElementsByTagName("script")],e=t.find((t=>t.hasAttribute("data-shoelace")));if(e)Jo(e.getAttribute("data-shoelace"));else{const e=t.find((t=>/shoelace(\.min)?\.js($|\?)/.test(t.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(t.src)));let o="";e&&(o=e.getAttribute("src")),Jo(o.split("/").slice(0,-1).join("/"))}}return Zo.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}(`assets/icons/${t}.svg`)},ti={caret:'\n    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n      <polyline points="6 9 12 15 18 9"></polyline>\n    </svg>\n  ',check:'\n    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor">\n          <g transform="translate(3.428571, 3.428571)">\n            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>\n            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"chevron-down":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',"chevron-left":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>\n    </svg>\n  ',"chevron-right":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',copy:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>\n    </svg>\n  ',eye:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n    </svg>\n  ',"eye-slash":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">\n      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>\n      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>\n      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>\n    </svg>\n  ',eyedropper:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">\n      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>\n    </svg>\n  ',"grip-vertical":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">\n      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>\n    </svg>\n  ',indeterminate:'\n    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor" stroke-width="2">\n          <g transform="translate(2.285714, 6.857143)">\n            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"person-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">\n      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>\n    </svg>\n  ',"play-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">\n      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>\n    </svg>\n  ',"pause-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">\n      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>\n    </svg>\n  ',radio:'\n    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g fill="currentColor">\n          <circle cx="8" cy="8" r="3.42857143"></circle>\n        </g>\n      </g>\n    </svg>\n  ',"star-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">\n      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n    </svg>\n  ',"x-lg":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">\n      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>\n    </svg>\n  ',"x-circle-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">\n      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>\n    </svg>\n  '},ei=[Qo,{name:"system",resolver:t=>t in ti?`data:image/svg+xml,${encodeURIComponent(ti[t])}`:""}],oi=[];function ii(t){return ei.find((e=>e.name===t))}const{I:ri}=at;var ni,si=Symbol(),ai=Symbol(),li=new Map,ci=class extends Se{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var o;let i;if(null==e?void 0:e.spriteSheet)return this.svg=V`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(i=await fetch(t,{mode:"cors"}),!i.ok)return 410===i.status?si:ai}catch(t){return ai}try{const t=document.createElement("div");t.innerHTML=await i.text();const e=t.firstElementChild;if("svg"!==(null==(o=null==e?void 0:e.tagName)?void 0:o.toLowerCase()))return si;ni||(ni=new DOMParser);const r=ni.parseFromString(e.outerHTML,"text/html").body.querySelector("svg");return r?(r.part.add("svg"),document.adoptNode(r)):si}catch(t){return si}}connectedCallback(){super.connectedCallback(),oi.push(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){var t;super.disconnectedCallback(),t=this,oi=oi.filter((e=>e!==t))}getIconSource(){const t=ii(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const{url:e,fromLibrary:o}=this.getIconSource(),i=o?ii(this.library):void 0;if(!e)return void(this.svg=null);let r=li.get(e);if(r||(r=this.resolveIcon(e,i),li.set(e,r)),!this.initialRender)return;const n=await r;if(n===ai&&li.delete(e),e===this.getIconSource().url)if((t=>void 0!==t?._$litType$)(n)){if(this.svg=n,i){await this.updateComplete;const t=this.shadowRoot.querySelector("[part='svg']");"function"==typeof i.mutator&&t&&i.mutator(t)}}else switch(n){case ai:case si:this.svg=null,this.emit("sl-error");break;default:this.svg=n.cloneNode(!0),null==(t=null==i?void 0:i.mutator)||t.call(i,this.svg),this.emit("sl-load")}}render(){return this.svg}};ci.styles=[pe,Ko],_e([gt()],ci.prototype,"svg",2),_e([ft({reflect:!0})],ci.prototype,"name",2),_e([ft()],ci.prototype,"src",2),_e([ft()],ci.prototype,"label",2),_e([ft({reflect:!0})],ci.prototype,"library",2),_e([qo("label")],ci.prototype,"handleLabelChange",1),_e([qo(["name","src","library"])],ci.prototype,"setIcon",1);var hi=class extends Se{constructor(){super(...arguments),this.localize=new he(this),this.isCopying=!1,this.status="rest",this.value="",this.from="",this.disabled=!1,this.copyLabel="",this.successLabel="",this.errorLabel="",this.feedbackDuration=1e3,this.tooltipPlacement="top",this.hoist=!1}async handleCopy(){if(this.disabled||this.isCopying)return;this.isCopying=!0;let t=this.value;if(this.from){const e=this.getRootNode(),o=this.from.includes("."),i=this.from.includes("[")&&this.from.includes("]");let r=this.from,n="";o?[r,n]=this.from.trim().split("."):i&&([r,n]=this.from.trim().replace(/\]$/,"").split("["));const s="getElementById"in e?e.getElementById(r):null;s?t=i?s.getAttribute(n)||"":o?s[n]||"":s.textContent||"":(this.showStatus("error"),this.emit("sl-error"))}if(t)try{await navigator.clipboard.writeText(t),this.showStatus("success"),this.emit("sl-copy",{detail:{value:t}})}catch(t){this.showStatus("error"),this.emit("sl-error")}else this.showStatus("error"),this.emit("sl-error")}async showStatus(t){const e=this.copyLabel||this.localize.term("copy"),o=this.successLabel||this.localize.term("copied"),i=this.errorLabel||this.localize.term("error"),r="success"===t?this.successIcon:this.errorIcon,n=Do(this,"copy.in",{dir:"ltr"}),s=Do(this,"copy.out",{dir:"ltr"});this.tooltip.content="success"===t?o:i,await this.copyIcon.animate(s.keyframes,s.options).finished,this.copyIcon.hidden=!0,this.status=t,r.hidden=!1,await r.animate(n.keyframes,n.options).finished,setTimeout((async()=>{await r.animate(s.keyframes,s.options).finished,r.hidden=!0,this.status="rest",this.copyIcon.hidden=!1,await this.copyIcon.animate(n.keyframes,n.options).finished,this.tooltip.content=e,this.isCopying=!1}),this.feedbackDuration)}render(){const t=this.copyLabel||this.localize.term("copy");return V`
      <sl-tooltip
        class=${Ho({"copy-button":!0,"copy-button--success":"success"===this.status,"copy-button--error":"error"===this.status})}
        content=${t}
        placement=${this.tooltipPlacement}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        exportparts="
          base:tooltip__base,
          base__popup:tooltip__base__popup,
          base__arrow:tooltip__base__arrow,
          body:tooltip__body
        "
      >
        <button
          class="copy-button__button"
          part="button"
          type="button"
          ?disabled=${this.disabled}
          @click=${this.handleCopy}
        >
          <slot part="copy-icon" name="copy-icon">
            <sl-icon library="system" name="copy"></sl-icon>
          </slot>
          <slot part="success-icon" name="success-icon" hidden>
            <sl-icon library="system" name="check"></sl-icon>
          </slot>
          <slot part="error-icon" name="error-icon" hidden>
            <sl-icon library="system" name="x-lg"></sl-icon>
          </slot>
        </button>
      </sl-tooltip>
    `}};hi.styles=[pe,Yo],hi.dependencies={"sl-icon":ci,"sl-tooltip":Xo},_e([yt('slot[name="copy-icon"]')],hi.prototype,"copyIcon",2),_e([yt('slot[name="success-icon"]')],hi.prototype,"successIcon",2),_e([yt('slot[name="error-icon"]')],hi.prototype,"errorIcon",2),_e([yt("sl-tooltip")],hi.prototype,"tooltip",2),_e([gt()],hi.prototype,"isCopying",2),_e([gt()],hi.prototype,"status",2),_e([ft()],hi.prototype,"value",2),_e([ft()],hi.prototype,"from",2),_e([ft({type:Boolean,reflect:!0})],hi.prototype,"disabled",2),_e([ft({attribute:"copy-label"})],hi.prototype,"copyLabel",2),_e([ft({attribute:"success-label"})],hi.prototype,"successLabel",2),_e([ft({attribute:"error-label"})],hi.prototype,"errorLabel",2),_e([ft({attribute:"feedback-duration",type:Number})],hi.prototype,"feedbackDuration",2),_e([ft({attribute:"tooltip-placement"})],hi.prototype,"tooltipPlacement",2),_e([ft({type:Boolean})],hi.prototype,"hoist",2),Go("copy.in",{keyframes:[{scale:".25",opacity:".25"},{scale:"1",opacity:"1"}],options:{duration:100}}),Go("copy.out",{keyframes:[{scale:"1",opacity:"1"},{scale:".25",opacity:"0"}],options:{duration:100}}),hi.define("sl-copy-button");class di extends Event{constructor(t,e){super(di.type,{bubbles:!0,composed:!0}),this.inputType=t,this.value=e}}di.type="color-converter-input";var pi,ui=function(t,e,o,i){var r,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(n<3?r(s):n>3?r(e,o,s):r(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s};!function(t){t.HEX="HEX",t.RGB255="RGB255",t.RGB01="RGB01",t.HSV="HSV"}(pi||(pi={}));const fi={[pi.HEX]:"Hex",[pi.RGB255]:"RGB (0-255)",[pi.RGB01]:"RGB (0-1)",[pi.HSV]:"HSV"},gi={[pi.HEX]:"hexValue",[pi.RGB255]:"rgb255Value",[pi.RGB01]:"rgb01Value",[pi.HSV]:"hsvValue"},mi={[pi.HEX]:t=>"#"+t.getHex(),[pi.RGB255]:t=>t.getRGB255().splice(0,3).toString(),[pi.RGB01]:t=>t.getRGB01().splice(0,3).map((t=>t.toFixed(3))).toString(),[pi.HSV]:t=>t.getHSV(!1).splice(0,3).toString()};let yi=class extends ct{constructor(){super(...arguments),this.type=pi.HEX,this.inputValues={},this.color=new Ot}onValueChange(t){this.dispatchEvent(new di(this.type,t.target.value))}render(){const t=this.inputValues[gi[this.type]]??mi[this.type](this.color);return V`
      ${Tt}
      <div class="input-group">
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            .value=${t}
            @input=${this.onValueChange}
          />
          <label>${fi[this.type]}</label>
        </div>
        <span class="input-group-text">
          <sl-copy-button value=${t}></sl-copy-button>
        </span>
      </div>
    `}};ui([ft()],yi.prototype,"type",void 0),ui([ft({attribute:!1})],yi.prototype,"inputValues",void 0),ui([ft({attribute:!1})],yi.prototype,"color",void 0),yi=ui([dt("color-converter-input")],yi);var vi=function(t,e,o,i){var r,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(n<3?r(s):n>3?r(e,o,s):r(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s};const bi={[pi.HEX]:Ot.parseHex,[pi.RGB255]:Ot.parseRGB255,[pi.RGB01]:Ot.parseRGB01,[pi.HSV]:Ot.parseHSV};let wi=class extends ct{constructor(){super(),this.color=new Ot,this.coordinates={x:0,y:0,width:0,height:0},this.inputValues={},this.addEventListener(di.type,(t=>{if(t instanceof di){const{inputType:e,value:o}=t,i=bi[e](o);null!=i&&(this.setColor(i),this.inputValues={...this.inputValues,[gi[e]]:o})}}))}setColor(t){this.dispatchEvent(new zt(t))}get _slottedChildren(){return this.shadowRoot?.querySelector("slot")?.assignedElements({flatten:!0})??[]}updateChildren(){this._slottedChildren.forEach((t=>{t instanceof yi&&(t.inputValues=this.inputValues,t.color=this.color)}))}render(){const t={x:this.coordinates.x/this.coordinates.width,y:this.coordinates.y/this.coordinates.height},e=[t.x.toFixed(3),t.y.toFixed(3)],o=[Math.round(this.coordinates.x),Math.round(this.coordinates.y)];return this.updateChildren(),V`
      ${Tt}
      <h5>Color Converter</h5>
      <table class="table mb-0 table-borderless">
        <tbody>
          <tr>
            <th scope="row">Coordinates</th>
            <td>
              <p id="coordinates-container" class="mb-0">
                (${e[0]}, ${e[1]})
                <br />
                (${o[0]}, ${o[1]})
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <slot
        class="d-flex flex-column inputs-container"
        @slotchange=${this.updateChildren}
      >
      </slot>
    `}};wi.styles=[Kt],vi([ft({attribute:!1})],wi.prototype,"color",void 0),vi([ft({attribute:!1})],wi.prototype,"coordinates",void 0),vi([gt()],wi.prototype,"inputValues",void 0),wi=vi([dt("color-converter")],wi);const $i=(t,e)=>{const o=t._$AN;if(void 0===o)return!1;for(const t of o)t._$AO?.(e,!1),$i(t,e);return!0},xi=t=>{let e,o;do{if(void 0===(e=t._$AM))break;o=e._$AN,o.delete(t),t=e}while(0===o?.size)},Ci=t=>{for(let e;e=t._$AM;t=e){let o=e._$AN;if(void 0===o)e._$AN=o=new Set;else if(o.has(t))break;o.add(t),Si(e)}};function _i(t){void 0!==this._$AN?(xi(this),this._$AM=t,Ci(this)):this._$AM=t}function Ai(t,e=!1,o=0){const i=this._$AH,r=this._$AN;if(void 0!==r&&0!==r.size)if(e)if(Array.isArray(i))for(let t=o;t<i.length;t++)$i(i[t],!1),xi(i[t]);else null!=i&&($i(i,!1),xi(i));else $i(this,t)}const Si=t=>{2==t.type&&(t._$AP??=Ai,t._$AQ??=_i)};class ki extends Oo{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,o){super._$AT(t,e,o),Ci(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&($i(this,t),xi(this))}setValue(t){if((()=>void 0===this._$Ct.strings)())this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}class Ei{}const Mi=new WeakMap,Ri=Lo(class extends ki{render(t){return q}update(t,[e]){const o=e!==this.Y;return o&&void 0!==this.Y&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.Y=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),q}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.Y){const e=this.ht??globalThis;let o=Mi.get(e);void 0===o&&(o=new WeakMap,Mi.set(e,o)),void 0!==o.get(this.Y)&&this.Y.call(this.ht,void 0),o.set(this.Y,t),void 0!==t&&this.Y.call(this.ht,t)}else this.Y.value=t}get lt(){return"function"==typeof this.Y?Mi.get(this.ht??globalThis)?.get(this.Y):this.Y?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Pi=s`:host {
  gap: 0.25rem;
}

.image-preview-canvas-wrapper {
  position: relative;
  width: fit-content;
  height: fit-content;
}

.image-preview-canvas {
  max-width: 100%;
  max-height: 100%;
}

.image-preview-overlay {
  --circle-diameter: 1.5rem;
  z-index: 2;
  position: absolute;
  width: var(--circle-diameter);
  height: var(--circle-diameter);
  border-radius: 99rem;
  border-style: solid;
  border-color: black;
  border-width: 0.1rem;
  pointer-events: none;
}
`;var Li,Oi,Hi=function(t,e,o,i){var r,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(n<3?r(s):n>3?r(e,o,s):r(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s};!function(t){t.Transparent="transparent",t.Black="black",t.White="white"}(Li||(Li={})),function(t){t.Small="small",t.Medium="medium",t.Large="large"}(Oi||(Oi={}));const Bi={[Oi.Small]:"1rem",[Oi.Medium]:"1.5rem",[Oi.Large]:"3rem"};let Ti=class extends ct{constructor(){super(),this.coordinates={x:0,y:0,width:0,height:0},this.initialOverlayColor=Li.Black,this.overlayColor=Li.Black,this.overlaySize=Oi.Medium,this.loadedImage=!1,this.canvasRef=new Ei,this.overlayColor=this.initialOverlayColor}setColor(t){this.dispatchEvent(new zt(t))}setCoordinates(t){this.dispatchEvent(new Ut(t))}loadImage(t){const e=t.currentTarget.files?.item(0);if(e){const t=new FileReader;t.onload=t=>{const e=new Image;e.onload=()=>{const t=this.canvasRef.value,o=t.getContext("2d");o&&(t.width=e.width,t.height=e.height,o.drawImage(e,0,0)),this.loadedImage=!0},e.src=t.target?.result},t.readAsDataURL(e)}}sampleImage(t){if(t instanceof MouseEvent&&1==t.buttons){const e=this.canvasRef.value,o=e.getContext("2d");if(o){const i=e.getBoundingClientRect(),r=(t.clientX-i.left)/i.width*e.width,n=(t.clientY-i.top)/i.height*e.height,s=o.getImageData(r,n,1,1);this.setColor(new Ot({type:Et.RGB255,r:s.data[0],g:s.data[1],b:s.data[2]})),this.setCoordinates({x:r,y:n,width:e.width,height:e.height})}}}selectOverlayColor(t){this.overlayColor=t.currentTarget.value}selectOverlaySize(t){this.overlaySize=t.currentTarget.value}render(){const t=this.coordinates.x/this.coordinates.width*100,e=this.coordinates.y/this.coordinates.height*100,o=`\n      border-color: ${this.overlayColor};\n      top: calc(${e}% - var(--circle-diameter) / 2);\n      left: calc(${t}% - var(--circle-diameter) / 2);\n      --circle-diameter: ${Bi[this.overlaySize]};\n    `;return V`
      ${Tt}
      <h5>Image Sampling</h5>
      <div>
        <input class="form-control" type="file" @change=${this.loadImage} />
      </div>
      <div class="d-flex flex-row">
        <div class="form-floating flex-grow-1">
          <select
            class="form-select"
            aria-label="Select Overlay Color"
            @change=${this.selectOverlayColor}
          >
            <option
              value=${Li.Transparent}
              .selected=${this.overlayColor==Li.Transparent}
            >
              None
            </option>
            <option
              value=${Li.Black}
              .selected=${this.overlayColor==Li.Black}
            >
              Black
            </option>
            <option
              value=${Li.White}
              .selected=${this.overlayColor==Li.White}
            >
              White
            </option>
          </select>
          <label>Overlay Color</label>
        </div>
        <div class="form-floating flex-grow-1">
          <select
            class="form-select"
            aria-label="Select Overlay Size"
            @change=${this.selectOverlaySize}
          >
            <option
              value=${Oi.Small}
              .selected=${this.overlaySize==Oi.Small}
            >
              Small
            </option>
            <option
              value=${Oi.Medium}
              .selected=${this.overlaySize==Oi.Medium}
            >
              Medium
            </option>
            <option
              value=${Oi.Large}
              .selected=${this.overlaySize==Oi.Large}
            >
              Large
            </option>
          </select>
          <label>Overlay Size</label>
        </div>
      </div>
      <div class="mt-1 image-preview-canvas-wrapper">
        <canvas
          class="image-preview-canvas"
          width="0"
          height="0"
          ${Ri(this.canvasRef)}
          @mousedown=${this.sampleImage}
          @mousemove=${this.sampleImage}
        ></canvas>
        <div
          class="image-preview-overlay"
          ?hidden=${!this.loadedImage}
          style=${o}
        ></div>
      </div>
    `}};Ti.styles=[Pi],Hi([ft({attribute:!1})],Ti.prototype,"coordinates",void 0),Hi([ft({attribute:!1})],Ti.prototype,"initialOverlayColor",void 0),Hi([gt()],Ti.prototype,"overlayColor",void 0),Hi([gt()],Ti.prototype,"overlaySize",void 0),Hi([gt()],Ti.prototype,"loadedImage",void 0),Ti=Hi([dt("image-sampling")],Ti);const zi=[[.18995,.07176,.23217],[.19483,.08339,.26149],[.19956,.09498,.29024],[.20415,.10652,.31844],[.2086,.11802,.34607],[.21291,.12947,.37314],[.21708,.14087,.39964],[.22111,.15223,.42558],[.225,.16354,.45096],[.22875,.17481,.47578],[.23236,.18603,.50004],[.23582,.1972,.52373],[.23915,.20833,.54686],[.24234,.21941,.56942],[.24539,.23044,.59142],[.2483,.24143,.61286],[.25107,.25237,.63374],[.25369,.26327,.65406],[.25618,.27412,.67381],[.25853,.28492,.693],[.26074,.29568,.71162],[.2628,.30639,.72968],[.26473,.31706,.74718],[.26652,.32768,.76412],[.26816,.33825,.7805],[.26967,.34878,.79631],[.27103,.35926,.81156],[.27226,.3697,.82624],[.27334,.38008,.84037],[.27429,.39043,.85393],[.27509,.40072,.86692],[.27576,.41097,.87936],[.27628,.42118,.89123],[.27667,.43134,.90254],[.27691,.44145,.91328],[.27701,.45152,.92347],[.27698,.46153,.93309],[.2768,.47151,.94214],[.27648,.48144,.95064],[.27603,.49132,.95857],[.27543,.50115,.96594],[.27469,.51094,.97275],[.27381,.52069,.97899],[.27273,.5304,.98461],[.27106,.54015,.9893],[.26878,.54995,.99303],[.26592,.55979,.99583],[.26252,.56967,.99773],[.25862,.57958,.99876],[.25425,.5895,.99896],[.24946,.59943,.99835],[.24427,.60937,.99697],[.23874,.61931,.99485],[.23288,.62923,.99202],[.22676,.63913,.98851],[.22039,.64901,.98436],[.21382,.65886,.97959],[.20708,.66866,.97423],[.20021,.67842,.96833],[.19326,.68812,.9619],[.18625,.69775,.95498],[.17923,.70732,.94761],[.17223,.7168,.93981],[.16529,.7262,.93161],[.15844,.73551,.92305],[.15173,.74472,.91416],[.14519,.75381,.90496],[.13886,.76279,.8955],[.13278,.77165,.8858],[.12698,.78037,.8759],[.12151,.78896,.86581],[.11639,.7974,.85559],[.11167,.80569,.84525],[.10738,.81381,.83484],[.10357,.82177,.82437],[.10026,.82955,.81389],[.0975,.83714,.80342],[.09532,.84455,.79299],[.09377,.85175,.78264],[.09287,.85875,.7724],[.09267,.86554,.7623],[.0932,.87211,.75237],[.09451,.87844,.74265],[.09662,.88454,.73316],[.09958,.8904,.72393],[.10342,.896,.715],[.10815,.90142,.70599],[.11374,.90673,.69651],[.12014,.91193,.6866],[.12733,.91701,.67627],[.13526,.92197,.66556],[.14391,.9268,.65448],[.15323,.93151,.64308],[.16319,.93609,.63137],[.17377,.94053,.61938],[.18491,.94484,.60713],[.19659,.94901,.59466],[.20877,.95304,.58199],[.22142,.95692,.56914],[.23449,.96065,.55614],[.24797,.96423,.54303],[.2618,.96765,.52981],[.27597,.97092,.51653],[.29042,.97403,.50321],[.30513,.97697,.48987],[.32006,.97974,.47654],[.33517,.98234,.46325],[.35043,.98477,.45002],[.36581,.98702,.43688],[.38127,.98909,.42386],[.39678,.99098,.41098],[.41229,.99268,.39826],[.42778,.99419,.38575],[.44321,.99551,.37345],[.45854,.99663,.3614],[.47375,.99755,.34963],[.48879,.99828,.33816],[.50362,.99879,.32701],[.51822,.9991,.31622],[.53255,.99919,.30581],[.54658,.99907,.29581],[.56026,.99873,.28623],[.57357,.99817,.27712],[.58646,.99739,.26849],[.59891,.99638,.26038],[.61088,.99514,.2528],[.62233,.99366,.24579],[.63323,.99195,.23937],[.64362,.98999,.23356],[.65394,.98775,.22835],[.66428,.98524,.2237],[.67462,.98246,.2196],[.68494,.97941,.21602],[.69525,.9761,.21294],[.70553,.97255,.21032],[.71577,.96875,.20815],[.72596,.9647,.2064],[.7361,.96043,.20504],[.74617,.95593,.20406],[.75617,.95121,.20343],[.76608,.94627,.20311],[.77591,.94113,.2031],[.78563,.93579,.20336],[.79524,.93025,.20386],[.80473,.92452,.20459],[.8141,.91861,.20552],[.82333,.91253,.20663],[.83241,.90627,.20788],[.84133,.89986,.20926],[.8501,.89328,.21074],[.85868,.88655,.2123],[.86709,.87968,.21391],[.8753,.87267,.21555],[.88331,.86553,.21719],[.89112,.85826,.2188],[.8987,.85087,.22038],[.90605,.84337,.22188],[.91317,.83576,.22328],[.92004,.82806,.22456],[.92666,.82025,.2257],[.93301,.81236,.22667],[.93909,.80439,.22744],[.94489,.79634,.228],[.95039,.78823,.22831],[.9556,.78005,.22836],[.96049,.77181,.22811],[.96507,.76352,.22754],[.96931,.75519,.22663],[.97323,.74682,.22536],[.97679,.73842,.22369],[.98,.73,.22161],[.98289,.7214,.21918],[.98549,.7125,.2165],[.98781,.7033,.21358],[.98986,.69382,.21043],[.99163,.68408,.20706],[.99314,.67408,.20348],[.99438,.66386,.19971],[.99535,.65341,.19577],[.99607,.64277,.19165],[.99654,.63193,.18738],[.99675,.62093,.18297],[.99672,.60977,.17842],[.99644,.59846,.17376],[.99593,.58703,.16899],[.99517,.57549,.16412],[.99419,.56386,.15918],[.99297,.55214,.15417],[.99153,.54036,.1491],[.98987,.52854,.14398],[.98799,.51667,.13883],[.9859,.50479,.13367],[.9836,.49291,.12849],[.98108,.48104,.12332],[.97837,.4692,.11817],[.97545,.4574,.11305],[.97234,.44565,.10797],[.96904,.43399,.10294],[.96555,.42241,.09798],[.96187,.41093,.0931],[.95801,.39958,.08831],[.95398,.38836,.08362],[.94977,.37729,.07905],[.94538,.36638,.07461],[.94084,.35566,.07031],[.93612,.34513,.06616],[.93125,.33482,.06218],[.92623,.32473,.05837],[.92105,.31489,.05475],[.91572,.3053,.05134],[.91024,.29599,.04814],[.90463,.28696,.04516],[.89888,.27824,.04243],[.89298,.26981,.03993],[.88691,.26152,.03753],[.88066,.25334,.03521],[.87422,.24526,.03297],[.8676,.2373,.03082],[.86079,.22945,.02875],[.8538,.2217,.02677],[.84662,.21407,.02487],[.83926,.20654,.02305],[.83172,.19912,.02131],[.82399,.19182,.01966],[.81608,.18462,.01809],[.80799,.17753,.0166],[.79971,.17055,.0152],[.79125,.16368,.01387],[.7826,.15693,.01264],[.77377,.15028,.01148],[.76476,.14374,.01041],[.75556,.13731,.00942],[.74617,.13098,.00851],[.73661,.12477,.00769],[.72686,.11867,.00695],[.71692,.11268,.00629],[.7068,.1068,.00571],[.6965,.10102,.00522],[.68602,.09536,.00481],[.67535,.0898,.00449],[.66449,.08436,.00424],[.65345,.07902,.00408],[.64223,.0738,.00401],[.63082,.06868,.00401],[.61923,.06367,.0041],[.60746,.05878,.00427],[.5955,.05399,.00453],[.58336,.04931,.00486],[.57103,.04474,.00529],[.55852,.04028,.00579],[.54583,.03593,.00638],[.53295,.03169,.00705],[.51989,.02756,.0078],[.50664,.02354,.00863],[.49321,.01963,.00955],[.4796,.01583,.01055]];let ji=class extends ct{toCss(){const t=[];for(let e=0;e<256;e++)t.push(`rgba(${Math.round(255*zi[e][0])}, ${Math.round(255*zi[e][1])}, ${Math.round(255*zi[e][2])}, 255) ${100*e/255}%`);return`linear-gradient(to right, ${t.join(", ")})`}render(){return V` <div>
      <th>Turbo</th>
      <td><div style="background: ${this.toCss()}" class="gradient"></div></td>
    </div>`}};ji.styles=[s`
      tr {
        display: flex;
        width: 100%;
      }

      td {
        flex: 1;
      }

      .gradient {
        width: 100%;
        height: 30px;
      }
    `],ji=function(t,e,o,i){var r,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(n<3?r(s):n>3?r(e,o,s):r(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s}([dt("turbo-colormap")],ji);let Ni=class extends ct{render(){return V`
      ${Tt}
      <h5>Color Maps</h5>
      <div class="table mb-0">
        <turbo-colormap></turbo-colormap>
      </div>
    `}};Ni.styles=[s`
      ul {
        padding: 0;
      }
    `],Ni=function(t,e,o,i){var r,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(n<3?r(s):n>3?r(e,o,s):r(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s}([dt("color-maps")],Ni);const Ii=JSON.parse('{"Coolors.co":"https://coolors.co/app","Colorbrewer2.org":"http://colorbrewer2.org/","Material Color Tool":"https://m2.material.io/resources/color/","Refractoring GUI: Building Your Color Palette":"https://refactoringui.com/previews/building-your-color-palette/"}');let Gi=class extends ct{render(){return V` ${Tt}
      <h5>Other Tools</h5>
      <ul>
        ${Object.entries(Ii).map((([t,e])=>V`<li key=${t}>
              <a href=${e} target="_blank">${t}</a>
            </li>`))}
      </ul>`}};Gi=function(t,e,o,i){var r,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(n<3?r(s):n>3?r(e,o,s):r(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s}([dt("other-tools")],Gi);var Di=function(t,e,o,i){var r,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(n<3?r(s):n>3?r(e,o,s):r(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s};let Ui=class extends ct{constructor(){super(),this.color=new Ot({type:Et.RGB255,r:255,g:255,b:255}),this.coordinates={x:0,y:0,width:1,height:1},this.interpolationLeft=new Ot({type:Et.RGB255,r:255,g:0,b:0}),this.interpolationRight=new Ot({type:Et.RGB255,r:255,g:255,b:255}),this.interpolationActive=Nt.NONE,this.addEventListener(zt.eventName,(t=>{t instanceof zt&&this.setColor(t.color)})),this.addEventListener(Ut.eventName,(t=>{t instanceof Ut&&this.setCoordinates(t.coordinates)})),this.addEventListener(jt.eventName,(t=>{t instanceof jt&&this.setInterpolationActive(t.active)}))}setColor(t){this.color=t,this.interpolationActive===Nt.LEFT?this.interpolationLeft=t:this.interpolationActive==Nt.RIGHT&&(this.interpolationRight=t)}setCoordinates(t){this.coordinates=t}setInterpolationActive(t){this.interpolationActive=t}get _slottedChildren(){return this.shadowRoot?.querySelector("slot")?.assignedElements({flatten:!0})??[]}updateChildren(){this._slottedChildren.forEach((t=>{t instanceof Yt?t.color=this.color:t instanceof wi?(t.color=this.color,t.coordinates=this.coordinates):t instanceof Ti?t.coordinates=this.coordinates:t instanceof Gt&&(t.leftColor=this.interpolationLeft,t.rightColor=this.interpolationRight,t.activeColor=this.interpolationActive)}))}render(){return this.style.background="#"+this.color.getHex(),this.updateChildren(),V` ${Tt}
      <slot
        class="d-flex flex-row flex-wrap main-container"
        @slotchange=${this.updateChildren}
      >
      </slot>`}};Ui.styles=[Dt],Di([gt()],Ui.prototype,"color",void 0),Di([gt()],Ui.prototype,"coordinates",void 0),Di([gt()],Ui.prototype,"interpolationLeft",void 0),Di([gt()],Ui.prototype,"interpolationRight",void 0),Di([gt()],Ui.prototype,"interpolationActive",void 0),Ui=Di([dt("color-picker")],Ui)})()})();
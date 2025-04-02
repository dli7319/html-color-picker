/*! For license information please see main.js.LICENSE.txt */
(()=>{var t={659:(t,e,o)=>{const n=o(156),i={};for(const t of Object.keys(n))i[n[t]]=t;const r={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};t.exports=r;for(const t of Object.keys(r)){if(!("channels"in r[t]))throw new Error("missing channels property: "+t);if(!("labels"in r[t]))throw new Error("missing channel labels property: "+t);if(r[t].labels.length!==r[t].channels)throw new Error("channel and label counts mismatch: "+t);const{channels:e,labels:o}=r[t];delete r[t].channels,delete r[t].labels,Object.defineProperty(r[t],"channels",{value:e}),Object.defineProperty(r[t],"labels",{value:o})}r.rgb.hsl=function(t){const e=t[0]/255,o=t[1]/255,n=t[2]/255,i=Math.min(e,o,n),r=Math.max(e,o,n),s=r-i;let a,l;r===i?a=0:e===r?a=(o-n)/s:o===r?a=2+(n-e)/s:n===r&&(a=4+(e-o)/s),a=Math.min(60*a,360),a<0&&(a+=360);const c=(i+r)/2;return l=r===i?0:c<=.5?s/(r+i):s/(2-r-i),[a,100*l,100*c]},r.rgb.hsv=function(t){let e,o,n,i,r;const s=t[0]/255,a=t[1]/255,l=t[2]/255,c=Math.max(s,a,l),h=c-Math.min(s,a,l),d=function(t){return(c-t)/6/h+.5};return 0===h?(i=0,r=0):(r=h/c,e=d(s),o=d(a),n=d(l),s===c?i=n-o:a===c?i=1/3+e-n:l===c&&(i=2/3+o-e),i<0?i+=1:i>1&&(i-=1)),[360*i,100*r,100*c]},r.rgb.hwb=function(t){const e=t[0],o=t[1];let n=t[2];const i=r.rgb.hsl(t)[0],s=1/255*Math.min(e,Math.min(o,n));return n=1-1/255*Math.max(e,Math.max(o,n)),[i,100*s,100*n]},r.rgb.cmyk=function(t){const e=t[0]/255,o=t[1]/255,n=t[2]/255,i=Math.min(1-e,1-o,1-n);return[100*((1-e-i)/(1-i)||0),100*((1-o-i)/(1-i)||0),100*((1-n-i)/(1-i)||0),100*i]},r.rgb.keyword=function(t){const e=i[t];if(e)return e;let o,r=1/0;for(const e of Object.keys(n)){const i=(a=n[e],((s=t)[0]-a[0])**2+(s[1]-a[1])**2+(s[2]-a[2])**2);i<r&&(r=i,o=e)}var s,a;return o},r.keyword.rgb=function(t){return n[t]},r.rgb.xyz=function(t){let e=t[0]/255,o=t[1]/255,n=t[2]/255;return e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,o=o>.04045?((o+.055)/1.055)**2.4:o/12.92,n=n>.04045?((n+.055)/1.055)**2.4:n/12.92,[100*(.4124*e+.3576*o+.1805*n),100*(.2126*e+.7152*o+.0722*n),100*(.0193*e+.1192*o+.9505*n)]},r.rgb.lab=function(t){const e=r.rgb.xyz(t);let o=e[0],n=e[1],i=e[2];return o/=95.047,n/=100,i/=108.883,o=o>.008856?o**(1/3):7.787*o+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,i=i>.008856?i**(1/3):7.787*i+16/116,[116*n-16,500*(o-n),200*(n-i)]},r.hsl.rgb=function(t){const e=t[0]/360,o=t[1]/100,n=t[2]/100;let i,r,s;if(0===o)return s=255*n,[s,s,s];i=n<.5?n*(1+o):n+o-n*o;const a=2*n-i,l=[0,0,0];for(let t=0;t<3;t++)r=e+1/3*-(t-1),r<0&&r++,r>1&&r--,s=6*r<1?a+6*(i-a)*r:2*r<1?i:3*r<2?a+(i-a)*(2/3-r)*6:a,l[t]=255*s;return l},r.hsl.hsv=function(t){const e=t[0];let o=t[1]/100,n=t[2]/100,i=o;const r=Math.max(n,.01);return n*=2,o*=n<=1?n:2-n,i*=r<=1?r:2-r,[e,100*(0===n?2*i/(r+i):2*o/(n+o)),(n+o)/2*100]},r.hsv.rgb=function(t){const e=t[0]/60,o=t[1]/100;let n=t[2]/100;const i=Math.floor(e)%6,r=e-Math.floor(e),s=255*n*(1-o),a=255*n*(1-o*r),l=255*n*(1-o*(1-r));switch(n*=255,i){case 0:return[n,l,s];case 1:return[a,n,s];case 2:return[s,n,l];case 3:return[s,a,n];case 4:return[l,s,n];case 5:return[n,s,a]}},r.hsv.hsl=function(t){const e=t[0],o=t[1]/100,n=t[2]/100,i=Math.max(n,.01);let r,s;s=(2-o)*n;const a=(2-o)*i;return r=o*i,r/=a<=1?a:2-a,r=r||0,s/=2,[e,100*r,100*s]},r.hwb.rgb=function(t){const e=t[0]/360;let o=t[1]/100,n=t[2]/100;const i=o+n;let r;i>1&&(o/=i,n/=i);const s=Math.floor(6*e),a=1-n;r=6*e-s,1&s&&(r=1-r);const l=o+r*(a-o);let c,h,d;switch(s){default:case 6:case 0:c=a,h=l,d=o;break;case 1:c=l,h=a,d=o;break;case 2:c=o,h=a,d=l;break;case 3:c=o,h=l,d=a;break;case 4:c=l,h=o,d=a;break;case 5:c=a,h=o,d=l}return[255*c,255*h,255*d]},r.cmyk.rgb=function(t){const e=t[0]/100,o=t[1]/100,n=t[2]/100,i=t[3]/100;return[255*(1-Math.min(1,e*(1-i)+i)),255*(1-Math.min(1,o*(1-i)+i)),255*(1-Math.min(1,n*(1-i)+i))]},r.xyz.rgb=function(t){const e=t[0]/100,o=t[1]/100,n=t[2]/100;let i,r,s;return i=3.2406*e+-1.5372*o+-.4986*n,r=-.9689*e+1.8758*o+.0415*n,s=.0557*e+-.204*o+1.057*n,i=i>.0031308?1.055*i**(1/2.4)-.055:12.92*i,r=r>.0031308?1.055*r**(1/2.4)-.055:12.92*r,s=s>.0031308?1.055*s**(1/2.4)-.055:12.92*s,i=Math.min(Math.max(0,i),1),r=Math.min(Math.max(0,r),1),s=Math.min(Math.max(0,s),1),[255*i,255*r,255*s]},r.xyz.lab=function(t){let e=t[0],o=t[1],n=t[2];return e/=95.047,o/=100,n/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,o=o>.008856?o**(1/3):7.787*o+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,[116*o-16,500*(e-o),200*(o-n)]},r.lab.xyz=function(t){let e,o,n;o=(t[0]+16)/116,e=t[1]/500+o,n=o-t[2]/200;const i=o**3,r=e**3,s=n**3;return o=i>.008856?i:(o-16/116)/7.787,e=r>.008856?r:(e-16/116)/7.787,n=s>.008856?s:(n-16/116)/7.787,e*=95.047,o*=100,n*=108.883,[e,o,n]},r.lab.lch=function(t){const e=t[0],o=t[1],n=t[2];let i;return i=360*Math.atan2(n,o)/2/Math.PI,i<0&&(i+=360),[e,Math.sqrt(o*o+n*n),i]},r.lch.lab=function(t){const e=t[0],o=t[1],n=t[2]/360*2*Math.PI;return[e,o*Math.cos(n),o*Math.sin(n)]},r.rgb.ansi16=function(t,e=null){const[o,n,i]=t;let s=null===e?r.rgb.hsv(t)[2]:e;if(s=Math.round(s/50),0===s)return 30;let a=30+(Math.round(i/255)<<2|Math.round(n/255)<<1|Math.round(o/255));return 2===s&&(a+=60),a},r.hsv.ansi16=function(t){return r.rgb.ansi16(r.hsv.rgb(t),t[2])},r.rgb.ansi256=function(t){const e=t[0],o=t[1],n=t[2];return e===o&&o===n?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(o/255*5)+Math.round(n/255*5)},r.ansi16.rgb=function(t){let e=t%10;if(0===e||7===e)return t>50&&(e+=3.5),e=e/10.5*255,[e,e,e];const o=.5*(1+~~(t>50));return[(1&e)*o*255,(e>>1&1)*o*255,(e>>2&1)*o*255]},r.ansi256.rgb=function(t){if(t>=232){const e=10*(t-232)+8;return[e,e,e]}let e;return t-=16,[Math.floor(t/36)/5*255,Math.floor((e=t%36)/6)/5*255,e%6/5*255]},r.rgb.hex=function(t){const e=(((255&Math.round(t[0]))<<16)+((255&Math.round(t[1]))<<8)+(255&Math.round(t[2]))).toString(16).toUpperCase();return"000000".substring(e.length)+e},r.hex.rgb=function(t){const e=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let o=e[0];3===e[0].length&&(o=o.split("").map((t=>t+t)).join(""));const n=parseInt(o,16);return[n>>16&255,n>>8&255,255&n]},r.rgb.hcg=function(t){const e=t[0]/255,o=t[1]/255,n=t[2]/255,i=Math.max(Math.max(e,o),n),r=Math.min(Math.min(e,o),n),s=i-r;let a,l;return a=s<1?r/(1-s):0,l=s<=0?0:i===e?(o-n)/s%6:i===o?2+(n-e)/s:4+(e-o)/s,l/=6,l%=1,[360*l,100*s,100*a]},r.hsl.hcg=function(t){const e=t[1]/100,o=t[2]/100,n=o<.5?2*e*o:2*e*(1-o);let i=0;return n<1&&(i=(o-.5*n)/(1-n)),[t[0],100*n,100*i]},r.hsv.hcg=function(t){const e=t[1]/100,o=t[2]/100,n=e*o;let i=0;return n<1&&(i=(o-n)/(1-n)),[t[0],100*n,100*i]},r.hcg.rgb=function(t){const e=t[0]/360,o=t[1]/100,n=t[2]/100;if(0===o)return[255*n,255*n,255*n];const i=[0,0,0],r=e%1*6,s=r%1,a=1-s;let l=0;switch(Math.floor(r)){case 0:i[0]=1,i[1]=s,i[2]=0;break;case 1:i[0]=a,i[1]=1,i[2]=0;break;case 2:i[0]=0,i[1]=1,i[2]=s;break;case 3:i[0]=0,i[1]=a,i[2]=1;break;case 4:i[0]=s,i[1]=0,i[2]=1;break;default:i[0]=1,i[1]=0,i[2]=a}return l=(1-o)*n,[255*(o*i[0]+l),255*(o*i[1]+l),255*(o*i[2]+l)]},r.hcg.hsv=function(t){const e=t[1]/100,o=e+t[2]/100*(1-e);let n=0;return o>0&&(n=e/o),[t[0],100*n,100*o]},r.hcg.hsl=function(t){const e=t[1]/100,o=t[2]/100*(1-e)+.5*e;let n=0;return o>0&&o<.5?n=e/(2*o):o>=.5&&o<1&&(n=e/(2*(1-o))),[t[0],100*n,100*o]},r.hcg.hwb=function(t){const e=t[1]/100,o=e+t[2]/100*(1-e);return[t[0],100*(o-e),100*(1-o)]},r.hwb.hcg=function(t){const e=t[1]/100,o=1-t[2]/100,n=o-e;let i=0;return n<1&&(i=(o-n)/(1-n)),[t[0],100*n,100*i]},r.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]},r.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]},r.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]},r.gray.hsl=function(t){return[0,0,t[0]]},r.gray.hsv=r.gray.hsl,r.gray.hwb=function(t){return[0,100,t[0]]},r.gray.cmyk=function(t){return[0,0,0,t[0]]},r.gray.lab=function(t){return[t[0],0,0]},r.gray.hex=function(t){const e=255&Math.round(t[0]/100*255),o=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(o.length)+o},r.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]}},734:(t,e,o)=>{const n=o(659),i=o(507),r={};Object.keys(n).forEach((t=>{r[t]={},Object.defineProperty(r[t],"channels",{value:n[t].channels}),Object.defineProperty(r[t],"labels",{value:n[t].labels});const e=i(t);Object.keys(e).forEach((o=>{const n=e[o];r[t][o]=function(t){const e=function(...e){const o=e[0];if(null==o)return o;o.length>1&&(e=o);const n=t(e);if("object"==typeof n)for(let t=n.length,e=0;e<t;e++)n[e]=Math.round(n[e]);return n};return"conversion"in t&&(e.conversion=t.conversion),e}(n),r[t][o].raw=function(t){const e=function(...e){const o=e[0];return null==o?o:(o.length>1&&(e=o),t(e))};return"conversion"in t&&(e.conversion=t.conversion),e}(n)}))})),t.exports=r},507:(t,e,o)=>{const n=o(659);function i(t,e){return function(o){return e(t(o))}}function r(t,e){const o=[e[t].parent,t];let r=n[e[t].parent][t],s=e[t].parent;for(;e[s].parent;)o.unshift(e[s].parent),r=i(n[e[s].parent][s],r),s=e[s].parent;return r.conversion=o,r}t.exports=function(t){const e=function(t){const e=function(){const t={},e=Object.keys(n);for(let o=e.length,n=0;n<o;n++)t[e[n]]={distance:-1,parent:null};return t}(),o=[t];for(e[t].distance=0;o.length;){const t=o.pop(),i=Object.keys(n[t]);for(let n=i.length,r=0;r<n;r++){const n=i[r],s=e[n];-1===s.distance&&(s.distance=e[t].distance+1,s.parent=t,o.unshift(n))}}return e}(t),o={},i=Object.keys(e);for(let t=i.length,n=0;n<t;n++){const t=i[n];null!==e[t].parent&&(o[t]=r(t,e))}return o}},156:t=>{"use strict";t.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}}},e={};function o(n){var i=e[n];if(void 0!==i)return i.exports;var r=e[n]={exports:{}};return t[n](r,r.exports,o),r.exports}o.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},o.d=(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),i=new WeakMap;class r{constructor(t,e,o){if(this._$cssResult$=!0,o!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const o=this.t;if(e&&void 0===t){const e=void 0!==o&&1===o.length;e&&(t=i.get(o)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(o,t))}return t}toString(){return this.cssText}}const s=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,o,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[n+1]),t[0]);return new r(o,t,n)},a=(o,n)=>{if(e)o.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of n){const n=document.createElement("style"),i=t.litNonce;void 0!==i&&n.setAttribute("nonce",i),n.textContent=e.cssText,o.appendChild(n)}},l=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,n))(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:f}=Object,g=globalThis,m=g.trustedTypes,y=m?m.emptyScript:"",v=g.reactiveElementPolyfillSupport,b=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},x=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;class C extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),n=this.getPropertyDescriptor(t,o,e);void 0!==n&&h(this.prototype,t,n)}}static getPropertyDescriptor(t,e,o){const{get:n,set:i}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return n?.call(this)},set(e){const r=n?.call(this);i.call(this,e),this.requestUpdate(t,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...p(t),...u(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return a(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EC(t,e){const o=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,o);if(void 0!==n&&!0===o.reflect){const i=(void 0!==o.converter?.toAttribute?o.converter:w).toAttribute(e,o.type);this._$Em=t,null==i?this.removeAttribute(n):this.setAttribute(n,i),this._$Em=null}}_$AK(t,e){const o=this.constructor,n=o._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=o.getPropertyOptions(n),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=n,this[n]=i.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,o){if(void 0!==t){if(o??=this.constructor.getPropertyOptions(t),!(o.hasChanged??x)(this[t],e))return;this.P(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,o){this._$AL.has(t)||this._$AL.set(t,e),!0===o.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t)!0!==o.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[b("elementProperties")]=new Map,C[b("finalized")]=new Map,v?.({ReactiveElement:C}),(g.reactiveElementVersions??=[]).push("2.0.4");const M=globalThis,_=M.trustedTypes,A=_?_.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+S,R=`<${k}>`,P=document,O=()=>P.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,B=Array.isArray,H=t=>B(t)||"function"==typeof t?.[Symbol.iterator],z="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,D=/>/g,N=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,I=/"/g,F=/^(?:script|style|textarea|title)$/i,G=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),V=G(1),W=(G(2),G(3),Symbol.for("lit-noChange")),q=Symbol.for("lit-nothing"),X=new WeakMap,Y=P.createTreeWalker(P,129);function K(t,e){if(!B(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const Z=(t,e)=>{const o=t.length-1,n=[];let i,r=2===e?"<svg>":3===e?"<math>":"",s=T;for(let e=0;e<o;e++){const o=t[e];let a,l,c=-1,h=0;for(;h<o.length&&(s.lastIndex=h,l=s.exec(o),null!==l);)h=s.lastIndex,s===T?"!--"===l[1]?s=j:void 0!==l[1]?s=D:void 0!==l[2]?(F.test(l[2])&&(i=RegExp("</"+l[2],"g")),s=N):void 0!==l[3]&&(s=N):s===N?">"===l[0]?(s=i??T,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?N:'"'===l[3]?I:U):s===I||s===U?s=N:s===j||s===D?s=T:(s=N,i=void 0);const d=s===N&&t[e+1].startsWith("/>")?" ":"";r+=s===T?o+R:c>=0?(n.push(a),o.slice(0,c)+E+o.slice(c)+S+d):o+S+(-2===c?e:d)}return[K(t,r+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class J{constructor({strings:t,_$litType$:e},o){let n;this.parts=[];let i=0,r=0;const s=t.length-1,a=this.parts,[l,c]=Z(t,e);if(this.el=J.createElement(l,o),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=Y.nextNode())&&a.length<s;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(E)){const e=c[r++],o=n.getAttribute(t).split(S),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:i,name:s[2],strings:o,ctor:"."===s[1]?nt:"?"===s[1]?it:"@"===s[1]?rt:ot}),n.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:i}),n.removeAttribute(t));if(F.test(n.tagName)){const t=n.textContent.split(S),e=t.length-1;if(e>0){n.textContent=_?_.emptyScript:"";for(let o=0;o<e;o++)n.append(t[o],O()),Y.nextNode(),a.push({type:2,index:++i});n.append(t[e],O())}}}else if(8===n.nodeType)if(n.data===k)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=n.data.indexOf(S,t+1));)a.push({type:7,index:i}),t+=S.length-1}i++}}static createElement(t,e){const o=P.createElement("template");return o.innerHTML=t,o}}function Q(t,e,o=t,n){if(e===W)return e;let i=void 0!==n?o._$Co?.[n]:o._$Cl;const r=L(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),void 0===r?i=void 0:(i=new r(t),i._$AT(t,o,n)),void 0!==n?(o._$Co??=[])[n]=i:o._$Cl=i),void 0!==i&&(e=Q(t,i._$AS(t,e.values),i,n)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,n=(t?.creationScope??P).importNode(e,!0);Y.currentNode=n;let i=Y.nextNode(),r=0,s=0,a=o[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new et(i,i.nextSibling,this,t):1===a.type?e=new a.ctor(i,a.name,a.strings,this,t):6===a.type&&(e=new st(i,this,t)),this._$AV.push(e),a=o[++s]}r!==a?.index&&(i=Y.nextNode(),r++)}return Y.currentNode=P,n}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,n){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),L(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):H(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,n="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=J.createElement(K(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new tt(n,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new J(t)),e}k(t){B(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,n=0;for(const i of t)n===e.length?e.push(o=new et(this.O(O()),this.O(O()),this,this.options)):o=e[n],o._$AI(i),n++;n<e.length&&(this._$AR(o&&o._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class ot{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,n,i){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=i,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=q}_$AI(t,e=this,o,n){const i=this.strings;let r=!1;if(void 0===i)t=Q(this,t,e,0),r=!L(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const n=t;let s,a;for(t=i[0],s=0;s<i.length-1;s++)a=Q(this,n[o+s],e,s),a===W&&(a=this._$AH[s]),r||=!L(a)||a!==this._$AH[s],a===q?t=q:t!==q&&(t+=(a??"")+i[s+1]),this._$AH[s]=a}r&&!n&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class nt extends ot{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends ot{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class rt extends ot{constructor(t,e,o,n,i){super(t,e,o,n,i),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??q)===W)return;const o=this._$AH,n=t===q&&o!==q||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,i=t!==q&&(o===q||n);n&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at={M:E,P:S,A:k,C:1,L:Z,R:tt,D:H,V:Q,I:et,H:ot,N:it,U:rt,B:nt,F:st},lt=M.litHtmlPolyfillSupport;lt?.(J,et),(M.litHtmlVersions??=[]).push("3.2.1");class ct extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const n=o?.renderBefore??e;let i=n._$litPart$;if(void 0===i){const t=o?.renderBefore??null;n._$litPart$=i=new et(e.insertBefore(O(),t),t,void 0,o??{})}return i._$AI(t),i})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ct._$litElement$=!0,ct.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:ct});const ht=globalThis.litElementPolyfillSupport;ht?.({LitElement:ct}),(globalThis.litElementVersions??=[]).push("4.1.1");const dt=t=>(e,o)=>{void 0!==o?o.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)},pt={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:x},ut=(t=pt,e,o)=>{const{kind:n,metadata:i}=o;let r=globalThis.litPropertyMetadata.get(i);if(void 0===r&&globalThis.litPropertyMetadata.set(i,r=new Map),r.set(o.name,t),"accessor"===n){const{name:n}=o;return{set(o){const i=e.get.call(this);e.set.call(this,o),this.requestUpdate(n,i,t)},init(e){return void 0!==e&&this.P(n,void 0,t),e}}}if("setter"===n){const{name:n}=o;return function(o){const i=this[n];e.call(this,o),this.requestUpdate(n,i,t)}}throw Error("Unsupported decorator location: "+n)};function ft(t){return(e,o)=>"object"==typeof o?ut(t,e,o):((t,e,o)=>{const n=e.hasOwnProperty(o);return e.constructor.createProperty(o,n?{...t,wrapped:!0}:t),n?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function gt(t){return ft({...t,state:!0,attribute:!1})}const mt=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,o),o);function yt(t,e){return(o,n,i)=>{const r=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:e}="object"==typeof n?o:i??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return mt(o,n,{get(){let o=t.call(this);return void 0===o&&(o=r(this),(null!==o||this.hasUpdated)&&e.call(this,o)),o}})}return mt(o,n,{get(){return r(this)}})}}var vt=o(734),bt=o.n(vt);const wt=/^#?([0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)$/,xt=/^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/,$t=/^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/,Ct=/^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;function Mt(t,e,o){return t+(e-t)*o}function _t(t,e,o){return Math.max(e,Math.min(o,t))}var At;!function(t){t.RGB="rgb",t.HSV="hsv",t.HSL="hsl",t.HSL_FLIP="hsl_flip",t.LCH="lch"}(At||(At={}));const Et={[At.RGB]:function(t,e,o){const[n,i,r]=t.getRGB01(),[s,a,l]=e.getRGB01();return new kt({type:St.RGB01,r:Mt(n,s,o),g:Mt(i,a,o),b:Mt(r,l,o)})},[At.HSV]:function(t,e,o){let n=t.getHSV(),i=e.getHSV();return new kt({type:St.HSV,h:Mt(n[0],i[0],o),s:Mt(n[1],i[1],o),v:Mt(n[2],i[2],o)})},[At.HSL]:function(t,e,o){const n=t.getHSL(),i=e.getHSL(),r=Math.abs(n[0]-i[0])>180,s=Mt(n[0]+360*Number(r&&n[0]<i[0]),i[0]+360*Number(r&&i[0]<n[0]),o);return new kt({type:St.HSL,h:s,s:Mt(n[1],i[1],o),l:Mt(n[2],i[2],o)})},[At.HSL_FLIP]:function(t,e,o){const n=t.getHSL(),i=e.getHSL(),r=Math.abs(n[0]-i[0])>180,s=Mt(n[0]+360*Number(!r&&n[0]<i[0]),i[0]+360*Number(!r&&i[0]<n[0]),o);return new kt({type:St.HSL,h:s,s:Mt(n[1],i[1],o),l:Mt(n[2],i[2],o)})},[At.LCH]:function(t,e,o){let n=t.getLCH(),i=e.getLCH();return new kt({type:St.LCH,l:Mt(n[0],i[0],o),c:Mt(n[1],i[1],o),h:Mt(n[2],i[2],o)})}};var St;!function(t){t.RGB255="rgb255",t.RGB01="rgb01",t.HEX="hex",t.HSV="hsv",t.HSL="hsl",t.LCH="lch"}(St||(St={}));class kt{constructor(t={}){this.a=1,t.type==St.RGB255?(this.conversionInput=[_t(t.r||0,0,255),_t(t.g||0,0,255),_t(t.b||0,0,255)],this.colorConvertFunction=bt().rgb):t.type==St.RGB01?(this.conversionInput=[_t(Math.round(255*(t.r||0)),0,255),_t(Math.round(255*(t.g||0)),0,255),_t(Math.round(255*(t.b||0)),0,255)],this.colorConvertFunction=bt().rgb):t.type==St.HEX?(this.conversionInput=t.hex||"#000000",this.colorConvertFunction=bt().hex):t.type==St.HSV?(this.conversionInput=[t.h||0,t.s||0,t.v||0],this.colorConvertFunction=bt().hsv):t.type==St.HSL?(this.conversionInput=[t.h||0,t.s||0,t.l||0],this.colorConvertFunction=bt().hsl):t.type==St.LCH?(this.conversionInput=[t.l||0,t.c||0,t.h||0],this.colorConvertFunction=bt().lch):(t={type:St.RGB255,...t},this.conversionInput=[0,0,0],this.colorConvertFunction=bt().rgb),this.input=t,Object.freeze(this)}getRGB255(){return this.input.type===St.RGB255?[this.input.r||0,this.input.g||0,this.input.b||0]:this.input.type===St.RGB01?[Math.round(255*(this.input.r||0)),Math.round(255*(this.input.g||0)),Math.round(255*(this.input.b||0))]:this.colorConvertFunction.rgb(this.conversionInput)}getRGB01(){return this.input.type===St.RGB255?[(this.input.r||0)/255,(this.input.g||0)/255,(this.input.b||0)/255]:this.input.type===St.RGB01?[this.input.r||0,this.input.g||0,this.input.b||0]:this.getRGB255().map((t=>t/255))}getHex(){return this.input.type===St.HEX?this.input.hex||"":this.colorConvertFunction.hex(this.conversionInput)}getHSV(t=!0){if(this.input.type===St.HSV){const e=[this.input.h||0,this.input.s||0,this.input.v||0];return t?e:e.map((t=>Math.round(t)))}return t?this.colorConvertFunction.hsv.raw(this.conversionInput):this.colorConvertFunction.hsv(this.conversionInput)}getHSL(t=!0){if(this.input.type===St.HSL){const e=[this.input.h||0,this.input.s||0,this.input.l||0];return t?e:e.map((t=>Math.round(t)))}return t?this.colorConvertFunction.hsl.raw(this.conversionInput):this.colorConvertFunction.hsl(this.conversionInput)}getLCH(t=!0){if(this.input.type===St.LCH){const e=[this.input.l||0,this.input.c||0,this.input.h||0];return t?e:e.map((t=>Math.round(t)))}return t?this.colorConvertFunction.lch.raw(this.conversionInput):this.colorConvertFunction.lch(this.conversionInput)}toCSS(){return`rgba(${this.getRGB255().join(", ")})`}static fromRGB255Array(t){return new kt({type:St.RGB255,r:t[0],g:t[1],b:t[2]})}}kt.lerp=function(t,e,o,n=At.RGB){return Et[n](t,e,o)},kt.parseHex=function(t){const e=wt.exec(t);return e&&2==e.length?new kt({type:St.HEX,hex:e[1]}):null},kt.parseRGB255=function(t){const e=xt.exec(t);return e&&4==e.length?new kt({type:St.RGB255,r:parseInt(e[1]),g:parseInt(e[2]),b:parseInt(e[3])}):null},kt.parseRGB01=function(t){const e=$t.exec(t);return e&&4==e.length?new kt({type:St.RGB01,r:parseFloat(e[1]),g:parseFloat(e[2]),b:parseFloat(e[3])}):null},kt.parseHSV=function(t){const e=Ct.exec(t);if(e&&4==e.length){const t=parseFloat(e[1]),o=parseFloat(e[2]),n=parseFloat(e[3]);if(0<=t&&t<=360&&0<=o&&o<=100&&0<=n&&n<=100)return new kt({type:St.HSV,h:parseFloat(e[1]),s:parseFloat(e[2]),v:parseFloat(e[3])})}return null};class Rt{constructor(t=new kt({type:St.RGB01,r:1,g:0,b:0}),e=new kt({type:St.RGB01,r:1,g:1,b:1})){this.colors=[],this.positions=[],this.addColorStop(0,t),this.addColorStop(1,e)}setColorStop(t,e){let o=this.positions.indexOf(t);-1==o?this.addColorStop(t,e):this.colors[o]=e}addColorStop(t,e){this.colors.push(e),this.positions.push(t)}getColorAt(t,e){if(0===this.colors.length)return new kt({});if(1===this.colors.length)return this.colors[0];let o=0;for(;o<this.positions.length&&t>this.positions[o];)o++;if(0===o)return this.colors[0];if(o===this.positions.length)return this.colors[this.colors.length-1];const n=this.positions[o-1],i=this.positions[o],r=this.colors[o-1],s=this.colors[o],a=(t-n)/(i-n);return kt.lerp(r,s,a,e)}getBackgroundImageStyle(t=At.RGB){let e="linear-gradient(to right";for(let o=0;o<=100;o++)e+=", "+this.getColorAt(o/100,t).toCSS()+" "+o+"%";return e+=")",e}}const Pt=s`.color-selection {
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
`,Ot=V`<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  crossorigin="anonymous"
/> `;class Lt extends Event{constructor(t){super(Lt.eventName,{bubbles:!0,composed:!0}),this.color=t}}Lt.eventName="set-color";class Bt extends Event{constructor(t){super(Bt.eventName,{bubbles:!0,composed:!0}),this.active=t}}Bt.eventName="set-interpolation-active";var Ht=function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s};let zt=class extends ct{constructor(){super(...arguments),this.typeName="",this.type="RGB"}};Ht([ft()],zt.prototype,"typeName",void 0),Ht([ft()],zt.prototype,"type",void 0),zt=Ht([dt("color-interpolation-gradient")],zt);var Tt,jt=function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s};!function(t){t.LEFT="left",t.RIGHT="right",t.NONE="none"}(Tt||(Tt={}));let Dt=class extends ct{constructor(){super(...arguments),this.activeColor=Tt.NONE,this.leftColor=new kt({}),this.rightColor=new kt({}),this.colorGradient=new Rt,this.onMouseMoveBound=this.onMouseMove.bind(this),this.onMouseUpBound=this.onMouseUp.bind(this),this.selectedGolorGradientDiv=null}setColor(t){this.dispatchEvent(new Lt(t))}setActiveColor(t){this.dispatchEvent(new Bt(t))}setActiveColorLeft(){this.setActiveColor(this.activeColor==Tt.LEFT?Tt.NONE:Tt.LEFT)}setActiveColorRight(){this.setActiveColor(this.activeColor==Tt.RIGHT?Tt.NONE:Tt.RIGHT)}onMouseMove(t){if(this.selectedGolorGradientDiv instanceof HTMLDivElement){const e=this.selectedGolorGradientDiv.getAttribute("data-mode")||"",o=this.selectedGolorGradientDiv.getBoundingClientRect(),n=(t.clientX-o.left)/o.width,i=this.colorGradient.getColorAt(n,At[e.toUpperCase()]);this.setActiveColor(Tt.NONE),this.setColor(i)}}onMouseDown(t){this.selectedGolorGradientDiv=t.currentTarget,document.addEventListener("mousemove",this.onMouseMoveBound),document.addEventListener("mouseup",this.onMouseUpBound)}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMoveBound),document.removeEventListener("mouseup",this.onMouseUpBound),this.selectedGolorGradientDiv=null}render(){return this.colorGradient=new Rt(this.leftColor,this.rightColor),V`
      ${Ot}
      <h5>Color Interpolation</h5>
      <table class="table mb-0">
        <tbody>
          <tr>
            <td>
              <div
                class="color-selection ${this.activeColor===Tt.LEFT?"active":""}"
                @click=${this.setActiveColorLeft}
                style="background: #${this.leftColor.getHex()}"
              ></div>
            </td>
            <td>
              <div
                class="color-selection ${this.activeColor===Tt.RIGHT?"active":""}"
                @click=${this.setActiveColorRight}
                style="background: #${this.rightColor.getHex()}"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table mb-0">
        <tbody>
          ${Array.prototype.map.call(this.children,(t=>{if(t instanceof zt){const e=At[t.type];return V` <tr>
                <th>${t.typeName||t.type}</th>
                <td>
                  <div
                    class="gradient"
                    style="background: ${this.colorGradient.getBackgroundImageStyle(e)}"
                    data-mode=${e}
                    @mousedown=${this.onMouseDown.bind(this)}
                  ></div>
                </td>
              </tr>`}}))}
        </tbody>
      </table>
    `}};Dt.styles=[Pt],jt([ft()],Dt.prototype,"activeColor",void 0),jt([ft({attribute:!1})],Dt.prototype,"leftColor",void 0),jt([ft({attribute:!1})],Dt.prototype,"rightColor",void 0),Dt=jt([dt("color-interpolation")],Dt);const Nt=s`:host {
  display: block;
  width: 100%;
  flex: 1;
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
}`;class Ut extends Event{constructor(t){super(Ut.eventName,{bubbles:!0,composed:!0}),this.coordinates=t}}Ut.eventName="set-coordinates";const It=s`:host {
  display: flex;
  flex-direction: column;
}

.color-grad-container {
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
}`,Ft=s`.color-bar-pointer {
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
}`;var Gt=function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s};let Vt=class extends ct{constructor(){super(...arguments),this.hue=0}render(){const t="#"+new kt({type:St.HSV,h:this.hue,s:100,v:100}).getHex(),e=this.hue/360*100+"%";return V`
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
    `}};Vt.styles=[Ft],Gt([ft({type:Number})],Vt.prototype,"hue",void 0),Vt=Gt([dt("color-selection-type-a-bar-pointer")],Vt);var Wt=function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s};let qt=class extends ct{constructor(){super(...arguments),this.color=new kt,this.onMouseMoveBound=this.onMouseMove.bind(this),this.onMouseUpBound=this.onMouseUp.bind(this)}setColor(t){this.dispatchEvent(new Lt(t))}onMouseMove(t){const[,e,o]=this.color.getHSV();if(1==t.buttons){const n=this.colorBar.getBoundingClientRect(),i=360*_t((t.clientX-n.left)/n.width,0,1);this.setColor(new kt({type:St.HSV,h:i,s:e,v:o}))}}onMouseDown(){document.addEventListener("mousemove",this.onMouseMoveBound),document.addEventListener("mouseup",this.onMouseUpBound)}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMoveBound),document.removeEventListener("mouseup",this.onMouseUpBound)}render(){const[t]=this.color.getHSV();return V`
      ${Ot}
      <div class="color-bar" @mousedown=${this.onMouseDown} id="color-bar">
        <color-selection-type-a-bar-pointer
          hue=${t}
        ></color-selection-type-a-bar-pointer>
      </div>
    `}};qt.styles=[It],Wt([ft({attribute:!1})],qt.prototype,"color",void 0),Wt([yt("#color-bar")],qt.prototype,"colorBar",void 0),qt=Wt([dt("color-selection-type-a-bar")],qt);var Xt=function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s};let Yt=class extends ct{constructor(){super(...arguments),this.color=new kt,this.onMouseMoveBound=this.onMouseMove.bind(this),this.onMouseUpBound=this.onMouseUp.bind(this)}setColor(t){this.dispatchEvent(new Lt(t))}onMouseMove(t){const[e]=this.color.getHSV();if(1==t.buttons){const o=this.colorGradContainer.getBoundingClientRect(),n=100*_t((t.clientX-o.left)/o.width,0,1),i=100*(1-_t((t.clientY-o.top)/o.height,0,1));this.setColor(new kt({type:St.HSV,h:e,s:n,v:i}))}}onMouseDown(){document.addEventListener("mousemove",this.onMouseMoveBound),document.addEventListener("mouseup",this.onMouseUpBound)}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMoveBound),document.removeEventListener("mouseup",this.onMouseUpBound)}render(){const[t,e,o]=this.color.getHSV(),n=`linear-gradient(to right, #FFF 0%, ${"#"+new kt({type:St.HSV,h:t,s:100,v:100}).getHex()} 100%)`,i=`\n      top: calc(${100*(1-o/100)}% - 0.5rem);\n      left: calc(${e/100*100}% - 0.5rem);\n      background-color: #${this.color.getHex()};\n      border-color: ${o<50?"white":"black"};\n    `;return V`
      ${Ot}
      <div class="color-grad-container" id="color-grad-container">
        <div
          class="color-grad color-grad-1"
          style="background: ${n};"
        ></div>
        <div
          class="color-grad color-grad-2"
          @mousedown=${this.onMouseDown.bind(this)}
        ></div>
        <div class="color-grad-circle" style=${i}></div>
      </div>
    `}};Yt.styles=[It,s`
      :host {
        flex: 1;
      }
    `],Xt([ft({attribute:!1})],Yt.prototype,"color",void 0),Xt([yt("#color-grad-container")],Yt.prototype,"colorGradContainer",void 0),Yt=Xt([dt("color-selection-type-a-grad")],Yt);var Kt=function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s};let Zt=class extends ct{constructor(){super(...arguments),this.color=new kt}render(){return V`
      ${Ot}
      <color-selection-type-a-grad
        .color=${this.color}
      ></color-selection-type-a-grad>
      <color-selection-type-a-bar
        .color=${this.color}
      ></color-selection-type-a-bar>
    `}};Zt.styles=[It],Kt([ft({attribute:!1})],Zt.prototype,"color",void 0),Zt=Kt([dt("color-selection-type-a")],Zt);var Jt=function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s};let Qt=class extends ct{constructor(){super(...arguments),this.color=new kt,this.onMouseMoveBound=this.onMouseMove.bind(this),this.onMouseUpBound=this.onMouseUp.bind(this)}setColor(t){this.dispatchEvent(new Lt(t))}onMouseMove(t){const e=this.colorGrad.getBoundingClientRect(),o=t.clientX-e.left-e.width/2,n=t.clientY-e.top-e.height/2,i=Math.sqrt(o*o+n*n)/(e.width/2),r=Math.min(i,1),s=Math.atan2(n,o)*(180/Math.PI)+90;console.log("angle",s),console.log("clampedRadius",r),this.setColor(new kt({type:St.HSL,h:s,s:100*r,l:50}))}onMouseDown(){document.addEventListener("mousemove",this.onMouseMoveBound),document.addEventListener("mouseup",this.onMouseUpBound)}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMoveBound),document.removeEventListener("mouseup",this.onMouseUpBound)}render(){const[,,t]=this.color.getHSL();return V`
      ${Ot}
      <div
        class="color-grad"
        id="color-grad"
        style=${`\n            background-image: radial-gradient(\n            circle at center,\n            hsl(0, 0%, ${t}%, 1) 0%,\n            hsl(0, 100%, 0%, 0) 70%\n          ),\n          conic-gradient(\n            hsl(0, 100%, 50%),\n            /* Red */ hsl(60, 100%, 50%),\n            /* Yellow */ hsl(120, 100%, 50%),\n            /* Lime */ hsl(180, 100%, 50%),\n            /* Cyan */ hsl(240, 100%, 50%),\n            /* Blue */ hsl(300, 100%, 50%),\n            /* Magenta */ hsl(360, 100%, 50%) /* Red (completes circle) */\n          );`}
        @mousedown=${this.onMouseDown}
      ></div>
    `}};Qt.styles=[s`
      :host {
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 100%;
      }

      .color-grad {
        flex: 1;
        width: 100%;
        border-radius: 100%;
      }
    `],Jt([ft({attribute:!1})],Qt.prototype,"color",void 0),Jt([yt("#color-grad")],Qt.prototype,"colorGrad",void 0),Qt=Jt([dt("color-selection-type-b-wheel")],Qt);var te=function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s};let ee=class extends ct{constructor(){super(...arguments),this.color=new kt}render(){return V`
      ${Ot}
      <color-selection-type-b-wheel
        .color=${this.color}
      ></color-selection-type-b-wheel>
    `}};ee.styles=[s`
      :host {
        display: flex;
        flex-direction: column;
      }
    `],te([ft({attribute:!1})],ee.prototype,"color",void 0),ee=te([dt("color-selection-type-b")],ee);var oe=function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s};let ne=class extends ct{constructor(){super(...arguments),this.color=new kt}render(){return V`
      ${Ot}
      <h5>Color Selection</h5>
      <color-selection-type-a .color=${this.color}></color-selection-type-a>
      <!-- <color-selection-type-b .color=${this.color}></color-selection-type-b> -->
    `}};ne.styles=s`
    :host {
      display: flex;
    }

    :host > h5 {
      flex: 0;
    }

    :host > * {
      flex: 1;
    }
  `,oe([ft({attribute:!1})],ne.prototype,"color",void 0),ne=oe([dt("color-selection")],ne);const ie=s`.inputs-container {
  gap: 0.25rem;
}

table > * {
  --bs-table-bg: transparent;
}
`;var re=s`
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
`,se=s`
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
`;const ae=new Set,le=new Map;let ce,he="ltr",de="en";const pe="undefined"!=typeof MutationObserver&&"undefined"!=typeof document&&void 0!==document.documentElement;if(pe){const t=new MutationObserver(fe);he=document.documentElement.dir||"ltr",de=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function ue(...t){t.map((t=>{const e=t.$code.toLowerCase();le.has(e)?le.set(e,Object.assign(Object.assign({},le.get(e)),t)):le.set(e,t),ce||(ce=t)})),fe()}function fe(){pe&&(he=document.documentElement.dir||"ltr",de=document.documentElement.lang||navigator.language),[...ae.keys()].map((t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()}))}class ge{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){ae.add(this.host)}hostDisconnected(){ae.delete(this.host)}dir(){return`${this.host.dir||he}`.toLowerCase()}lang(){return`${this.host.lang||de}`.toLowerCase()}getTranslationData(t){var e,o;const n=new Intl.Locale(t.replace(/_/g,"-")),i=null==n?void 0:n.language.toLowerCase(),r=null!==(o=null===(e=null==n?void 0:n.region)||void 0===e?void 0:e.toLowerCase())&&void 0!==o?o:"";return{locale:n,language:i,region:r,primary:le.get(`${i}-${r}`),secondary:le.get(i)}}exists(t,e){var o;const{primary:n,secondary:i}=this.getTranslationData(null!==(o=e.lang)&&void 0!==o?o:this.lang());return e=Object.assign({includeFallback:!1},e),!!(n&&n[t]||i&&i[t]||e.includeFallback&&ce&&ce[t])}term(t,...e){const{primary:o,secondary:n}=this.getTranslationData(this.lang());let i;if(o&&o[t])i=o[t];else if(n&&n[t])i=n[t];else{if(!ce||!ce[t])return console.error(`No translation found for: ${String(t)}`),String(t);i=ce[t]}return"function"==typeof i?i(...e):i}date(t,e){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),e).format(t)}number(t,e){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),e).format(t)}relativeTime(t,e,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(t,e)}}var me={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};ue(me);var ye=me,ve=class extends ge{};ue(ye);var be,we=s`
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
`,xe=Object.defineProperty,$e=Object.defineProperties,Ce=Object.getOwnPropertyDescriptor,Me=Object.getOwnPropertyDescriptors,_e=Object.getOwnPropertySymbols,Ae=Object.prototype.hasOwnProperty,Ee=Object.prototype.propertyIsEnumerable,Se=t=>{throw TypeError(t)},ke=(t,e,o)=>e in t?xe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,Re=(t,e)=>{for(var o in e||(e={}))Ae.call(e,o)&&ke(t,o,e[o]);if(_e)for(var o of _e(e))Ee.call(e,o)&&ke(t,o,e[o]);return t},Pe=(t,e)=>$e(t,Me(e)),Oe=(t,e,o,n)=>{for(var i,r=n>1?void 0:n?Ce(e,o):e,s=t.length-1;s>=0;s--)(i=t[s])&&(r=(n?i(e,o,r):i(r))||r);return n&&r&&xe(e,o,r),r},Le=(t,e,o)=>e.has(t)||Se("Cannot "+o),Be=class extends ct{constructor(){var t,e;super(),t=this,(e=be).has(t)?Se("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,false),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach((([t,e])=>{this.constructor.define(t,e)}))}emit(t,e){const o=new CustomEvent(t,Re({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(o),o}static define(t,e=this,o={}){const n=customElements.get(t);if(!n){try{customElements.define(t,e,o)}catch(n){customElements.define(t,class extends e{},o)}return}let i=" (unknown version)",r=i;"version"in e&&e.version&&(i=" v"+e.version),"version"in n&&n.version&&(r=" v"+n.version),i&&r&&i===r||console.warn(`Attempted to register <${t}>${i}, but <${t}>${r} has already been registered.`)}attributeChangedCallback(t,e,o){var n;Le(this,n=be,"read from private field"),n.get(this)||(this.constructor.elementProperties.forEach(((t,e)=>{t.reflect&&null!=this[e]&&this.initialReflectedProperties.set(e,this[e])})),((t,e,o)=>{Le(t,e,"write to private field"),e.set(t,o)})(this,be,!0)),super.attributeChangedCallback(t,e,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach(((e,o)=>{t.has(o)&&null==this[o]&&(this[o]=e)}))}};be=new WeakMap,Be.version="2.19.1",Be.dependencies={},Oe([ft()],Be.prototype,"dir",2),Oe([ft()],Be.prototype,"lang",2);const He=Math.min,ze=Math.max,Te=Math.round,je=Math.floor,De=t=>({x:t,y:t}),Ne={left:"right",right:"left",bottom:"top",top:"bottom"},Ue={start:"end",end:"start"};function Ie(t,e,o){return ze(t,He(e,o))}function Fe(t,e){return"function"==typeof t?t(e):t}function Ge(t){return t.split("-")[0]}function Ve(t){return t.split("-")[1]}function We(t){return"x"===t?"y":"x"}function qe(t){return"y"===t?"height":"width"}function Xe(t){return["top","bottom"].includes(Ge(t))?"y":"x"}function Ye(t){return We(Xe(t))}function Ke(t){return t.replace(/start|end/g,(t=>Ue[t]))}function Ze(t){return t.replace(/left|right|bottom|top/g,(t=>Ne[t]))}function Je(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function Qe(t){const{x:e,y:o,width:n,height:i}=t;return{width:n,height:i,top:o,left:e,right:e+n,bottom:o+i,x:e,y:o}}function to(t,e,o){let{reference:n,floating:i}=t;const r=Xe(e),s=Ye(e),a=qe(s),l=Ge(e),c="y"===r,h=n.x+n.width/2-i.width/2,d=n.y+n.height/2-i.height/2,p=n[a]/2-i[a]/2;let u;switch(l){case"top":u={x:h,y:n.y-i.height};break;case"bottom":u={x:h,y:n.y+n.height};break;case"right":u={x:n.x+n.width,y:d};break;case"left":u={x:n.x-i.width,y:d};break;default:u={x:n.x,y:n.y}}switch(Ve(e)){case"start":u[s]-=p*(o&&c?-1:1);break;case"end":u[s]+=p*(o&&c?-1:1)}return u}async function eo(t,e){var o;void 0===e&&(e={});const{x:n,y:i,platform:r,rects:s,elements:a,strategy:l}=t,{boundary:c="clippingAncestors",rootBoundary:h="viewport",elementContext:d="floating",altBoundary:p=!1,padding:u=0}=Fe(e,t),f=Je(u),g=a[p?"floating"===d?"reference":"floating":d],m=Qe(await r.getClippingRect({element:null==(o=await(null==r.isElement?void 0:r.isElement(g)))||o?g:g.contextElement||await(null==r.getDocumentElement?void 0:r.getDocumentElement(a.floating)),boundary:c,rootBoundary:h,strategy:l})),y="floating"===d?{x:n,y:i,width:s.floating.width,height:s.floating.height}:s.reference,v=await(null==r.getOffsetParent?void 0:r.getOffsetParent(a.floating)),b=await(null==r.isElement?void 0:r.isElement(v))&&await(null==r.getScale?void 0:r.getScale(v))||{x:1,y:1},w=Qe(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:y,offsetParent:v,strategy:l}):y);return{top:(m.top-w.top+f.top)/b.y,bottom:(w.bottom-m.bottom+f.bottom)/b.y,left:(m.left-w.left+f.left)/b.x,right:(w.right-m.right+f.right)/b.x}}function oo(){return"undefined"!=typeof window}function no(t){return so(t)?(t.nodeName||"").toLowerCase():"#document"}function io(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function ro(t){var e;return null==(e=(so(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function so(t){return!!oo()&&(t instanceof Node||t instanceof io(t).Node)}function ao(t){return!!oo()&&(t instanceof Element||t instanceof io(t).Element)}function lo(t){return!!oo()&&(t instanceof HTMLElement||t instanceof io(t).HTMLElement)}function co(t){return!(!oo()||"undefined"==typeof ShadowRoot)&&(t instanceof ShadowRoot||t instanceof io(t).ShadowRoot)}function ho(t){const{overflow:e,overflowX:o,overflowY:n,display:i}=yo(t);return/auto|scroll|overlay|hidden|clip/.test(e+n+o)&&!["inline","contents"].includes(i)}function po(t){return["table","td","th"].includes(no(t))}function uo(t){return[":popover-open",":modal"].some((e=>{try{return t.matches(e)}catch(t){return!1}}))}function fo(t){const e=go(),o=ao(t)?yo(t):t;return["transform","translate","scale","rotate","perspective"].some((t=>!!o[t]&&"none"!==o[t]))||!!o.containerType&&"normal"!==o.containerType||!e&&!!o.backdropFilter&&"none"!==o.backdropFilter||!e&&!!o.filter&&"none"!==o.filter||["transform","translate","scale","rotate","perspective","filter"].some((t=>(o.willChange||"").includes(t)))||["paint","layout","strict","content"].some((t=>(o.contain||"").includes(t)))}function go(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function mo(t){return["html","body","#document"].includes(no(t))}function yo(t){return io(t).getComputedStyle(t)}function vo(t){return ao(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function bo(t){if("html"===no(t))return t;const e=t.assignedSlot||t.parentNode||co(t)&&t.host||ro(t);return co(e)?e.host:e}function wo(t){const e=bo(t);return mo(e)?t.ownerDocument?t.ownerDocument.body:t.body:lo(e)&&ho(e)?e:wo(e)}function xo(t,e,o){var n;void 0===e&&(e=[]),void 0===o&&(o=!0);const i=wo(t),r=i===(null==(n=t.ownerDocument)?void 0:n.body),s=io(i);if(r){const t=$o(s);return e.concat(s,s.visualViewport||[],ho(i)?i:[],t&&o?xo(t):[])}return e.concat(i,xo(i,[],o))}function $o(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Co(t){const e=yo(t);let o=parseFloat(e.width)||0,n=parseFloat(e.height)||0;const i=lo(t),r=i?t.offsetWidth:o,s=i?t.offsetHeight:n,a=Te(o)!==r||Te(n)!==s;return a&&(o=r,n=s),{width:o,height:n,$:a}}function Mo(t){return ao(t)?t:t.contextElement}function _o(t){const e=Mo(t);if(!lo(e))return De(1);const o=e.getBoundingClientRect(),{width:n,height:i,$:r}=Co(e);let s=(r?Te(o.width):o.width)/n,a=(r?Te(o.height):o.height)/i;return s&&Number.isFinite(s)||(s=1),a&&Number.isFinite(a)||(a=1),{x:s,y:a}}const Ao=De(0);function Eo(t){const e=io(t);return go()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:Ao}function So(t,e,o,n){void 0===e&&(e=!1),void 0===o&&(o=!1);const i=t.getBoundingClientRect(),r=Mo(t);let s=De(1);e&&(n?ao(n)&&(s=_o(n)):s=_o(t));const a=function(t,e,o){return void 0===e&&(e=!1),!(!o||e&&o!==io(t))&&e}(r,o,n)?Eo(r):De(0);let l=(i.left+a.x)/s.x,c=(i.top+a.y)/s.y,h=i.width/s.x,d=i.height/s.y;if(r){const t=io(r),e=n&&ao(n)?io(n):n;let o=t,i=$o(o);for(;i&&n&&e!==o;){const t=_o(i),e=i.getBoundingClientRect(),n=yo(i),r=e.left+(i.clientLeft+parseFloat(n.paddingLeft))*t.x,s=e.top+(i.clientTop+parseFloat(n.paddingTop))*t.y;l*=t.x,c*=t.y,h*=t.x,d*=t.y,l+=r,c+=s,o=io(i),i=$o(o)}}return Qe({width:h,height:d,x:l,y:c})}function ko(t,e){const o=vo(t).scrollLeft;return e?e.left+o:So(ro(t)).left+o}function Ro(t,e,o){void 0===o&&(o=!1);const n=t.getBoundingClientRect();return{x:n.left+e.scrollLeft-(o?0:ko(t,n)),y:n.top+e.scrollTop}}function Po(t,e,o){let n;if("viewport"===e)n=function(t,e){const o=io(t),n=ro(t),i=o.visualViewport;let r=n.clientWidth,s=n.clientHeight,a=0,l=0;if(i){r=i.width,s=i.height;const t=go();(!t||t&&"fixed"===e)&&(a=i.offsetLeft,l=i.offsetTop)}return{width:r,height:s,x:a,y:l}}(t,o);else if("document"===e)n=function(t){const e=ro(t),o=vo(t),n=t.ownerDocument.body,i=ze(e.scrollWidth,e.clientWidth,n.scrollWidth,n.clientWidth),r=ze(e.scrollHeight,e.clientHeight,n.scrollHeight,n.clientHeight);let s=-o.scrollLeft+ko(t);const a=-o.scrollTop;return"rtl"===yo(n).direction&&(s+=ze(e.clientWidth,n.clientWidth)-i),{width:i,height:r,x:s,y:a}}(ro(t));else if(ao(e))n=function(t,e){const o=So(t,!0,"fixed"===e),n=o.top+t.clientTop,i=o.left+t.clientLeft,r=lo(t)?_o(t):De(1);return{width:t.clientWidth*r.x,height:t.clientHeight*r.y,x:i*r.x,y:n*r.y}}(e,o);else{const o=Eo(t);n={x:e.x-o.x,y:e.y-o.y,width:e.width,height:e.height}}return Qe(n)}function Oo(t,e){const o=bo(t);return!(o===e||!ao(o)||mo(o))&&("fixed"===yo(o).position||Oo(o,e))}function Lo(t,e,o){const n=lo(e),i=ro(e),r="fixed"===o,s=So(t,!0,r,e);let a={scrollLeft:0,scrollTop:0};const l=De(0);if(n||!n&&!r)if(("body"!==no(e)||ho(i))&&(a=vo(e)),n){const t=So(e,!0,r,e);l.x=t.x+e.clientLeft,l.y=t.y+e.clientTop}else i&&(l.x=ko(i));const c=!i||n||r?De(0):Ro(i,a);return{x:s.left+a.scrollLeft-l.x-c.x,y:s.top+a.scrollTop-l.y-c.y,width:s.width,height:s.height}}function Bo(t){return"static"===yo(t).position}function Ho(t,e){if(!lo(t)||"fixed"===yo(t).position)return null;if(e)return e(t);let o=t.offsetParent;return ro(t)===o&&(o=o.ownerDocument.body),o}function zo(t,e){const o=io(t);if(uo(t))return o;if(!lo(t)){let e=bo(t);for(;e&&!mo(e);){if(ao(e)&&!Bo(e))return e;e=bo(e)}return o}let n=Ho(t,e);for(;n&&po(n)&&Bo(n);)n=Ho(n,e);return n&&mo(n)&&Bo(n)&&!fo(n)?o:n||function(t){let e=bo(t);for(;lo(e)&&!mo(e);){if(fo(e))return e;if(uo(e))return null;e=bo(e)}return null}(t)||o}const To={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:e,rect:o,offsetParent:n,strategy:i}=t;const r="fixed"===i,s=ro(n),a=!!e&&uo(e.floating);if(n===s||a&&r)return o;let l={scrollLeft:0,scrollTop:0},c=De(1);const h=De(0),d=lo(n);if((d||!d&&!r)&&(("body"!==no(n)||ho(s))&&(l=vo(n)),lo(n))){const t=So(n);c=_o(n),h.x=t.x+n.clientLeft,h.y=t.y+n.clientTop}const p=!s||d||r?De(0):Ro(s,l,!0);return{width:o.width*c.x,height:o.height*c.y,x:o.x*c.x-l.scrollLeft*c.x+h.x+p.x,y:o.y*c.y-l.scrollTop*c.y+h.y+p.y}},getDocumentElement:ro,getClippingRect:function(t){let{element:e,boundary:o,rootBoundary:n,strategy:i}=t;const r=[..."clippingAncestors"===o?uo(e)?[]:function(t,e){const o=e.get(t);if(o)return o;let n=xo(t,[],!1).filter((t=>ao(t)&&"body"!==no(t))),i=null;const r="fixed"===yo(t).position;let s=r?bo(t):t;for(;ao(s)&&!mo(s);){const e=yo(s),o=fo(s);o||"fixed"!==e.position||(i=null),(r?!o&&!i:!o&&"static"===e.position&&i&&["absolute","fixed"].includes(i.position)||ho(s)&&!o&&Oo(t,s))?n=n.filter((t=>t!==s)):i=e,s=bo(s)}return e.set(t,n),n}(e,this._c):[].concat(o),n],s=r[0],a=r.reduce(((t,o)=>{const n=Po(e,o,i);return t.top=ze(n.top,t.top),t.right=He(n.right,t.right),t.bottom=He(n.bottom,t.bottom),t.left=ze(n.left,t.left),t}),Po(e,s,i));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}},getOffsetParent:zo,getElementRects:async function(t){const e=this.getOffsetParent||zo,o=this.getDimensions,n=await o(t.floating);return{reference:Lo(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:n.width,height:n.height}}},getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){const{width:e,height:o}=Co(t);return{width:e,height:o}},getScale:_o,isElement:ao,isRTL:function(t){return"rtl"===yo(t).direction}};function jo(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}const Do=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(e){var o,n;const{placement:i,rects:r,platform:s,elements:a}=e,{apply:l=()=>{},...c}=Fe(t,e),h=await eo(e,c),d=Ge(i),p=Ve(i),u="y"===Xe(i),{width:f,height:g}=r.floating;let m,y;"top"===d||"bottom"===d?(m=d,y=p===(await(null==s.isRTL?void 0:s.isRTL(a.floating))?"start":"end")?"left":"right"):(y=d,m="end"===p?"top":"bottom");const v=g-h.top-h.bottom,b=f-h.left-h.right,w=He(g-h[m],v),x=He(f-h[y],b),$=!e.middlewareData.shift;let C=w,M=x;if(null!=(o=e.middlewareData.shift)&&o.enabled.x&&(M=b),null!=(n=e.middlewareData.shift)&&n.enabled.y&&(C=v),$&&!p){const t=ze(h.left,0),e=ze(h.right,0),o=ze(h.top,0),n=ze(h.bottom,0);u?M=f-2*(0!==t||0!==e?t+e:ze(h.left,h.right)):C=g-2*(0!==o||0!==n?o+n:ze(h.top,h.bottom))}await l({...e,availableWidth:M,availableHeight:C});const _=await s.getDimensions(a.floating);return f!==_.width||g!==_.height?{reset:{rects:!0}}:{}}}},No=t=>(...e)=>({_$litDirective$:t,values:e});class Uo{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const Io=No(class extends Uo{constructor(t){if(super(t),1!==t.type||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const o=t.element.classList;for(const t of this.st)t in e||(o.remove(t),this.st.delete(t));for(const t in e){const n=!!e[t];n===this.st.has(t)||this.nt?.has(t)||(n?(o.add(t),this.st.add(t)):(o.remove(t),this.st.delete(t)))}return W}});function Fo(t){return function(t){for(let e=t;e;e=Go(e))if(e instanceof Element&&"none"===getComputedStyle(e).display)return null;for(let e=Go(t);e;e=Go(e)){if(!(e instanceof Element))continue;const t=getComputedStyle(e);if("contents"!==t.display){if("static"!==t.position||fo(t))return e;if("BODY"===e.tagName)return e}}return null}(t)}function Go(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}var Vo=class extends Be{constructor(){super(...arguments),this.localize=new ve(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect();let o=0,n=0,i=0,r=0,s=0,a=0,l=0,c=0;this.placement.includes("top")||this.placement.includes("bottom")?t.top<e.top?(o=t.left,n=t.bottom,i=t.right,r=t.bottom,s=e.left,a=e.top,l=e.right,c=e.top):(o=e.left,n=e.bottom,i=e.right,r=e.bottom,s=t.left,a=t.top,l=t.right,c=t.top):t.left<e.left?(o=t.right,n=t.top,i=e.left,r=e.top,s=t.right,a=t.bottom,l=e.left,c=e.bottom):(o=e.right,n=e.top,i=t.left,r=t.top,s=e.right,a=e.bottom,l=t.left,c=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${n}px`),this.style.setProperty("--hover-bridge-top-right-x",`${i}px`),this.style.setProperty("--hover-bridge-top-right-y",`${r}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${c}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||function(t){return null!==t&&"object"==typeof t&&"getBoundingClientRect"in t&&(!("contextElement"in t)||t instanceof Element)}(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){this.anchorEl&&this.active&&(this.cleanup=function(t,e,o,n){void 0===n&&(n={});const{ancestorScroll:i=!0,ancestorResize:r=!0,elementResize:s="function"==typeof ResizeObserver,layoutShift:a="function"==typeof IntersectionObserver,animationFrame:l=!1}=n,c=Mo(t),h=i||r?[...c?xo(c):[],...xo(e)]:[];h.forEach((t=>{i&&t.addEventListener("scroll",o,{passive:!0}),r&&t.addEventListener("resize",o)}));const d=c&&a?function(t,e){let o,n=null;const i=ro(t);function r(){var t;clearTimeout(o),null==(t=n)||t.disconnect(),n=null}return function s(a,l){void 0===a&&(a=!1),void 0===l&&(l=1),r();const c=t.getBoundingClientRect(),{left:h,top:d,width:p,height:u}=c;if(a||e(),!p||!u)return;const f={rootMargin:-je(d)+"px "+-je(i.clientWidth-(h+p))+"px "+-je(i.clientHeight-(d+u))+"px "+-je(h)+"px",threshold:ze(0,He(1,l))||1};let g=!0;function m(e){const n=e[0].intersectionRatio;if(n!==l){if(!g)return s();n?s(!1,n):o=setTimeout((()=>{s(!1,1e-7)}),1e3)}1!==n||jo(c,t.getBoundingClientRect())||s(),g=!1}try{n=new IntersectionObserver(m,{...f,root:i.ownerDocument})}catch(t){n=new IntersectionObserver(m,f)}n.observe(t)}(!0),r}(c,o):null;let p,u=-1,f=null;s&&(f=new ResizeObserver((t=>{let[n]=t;n&&n.target===c&&f&&(f.unobserve(e),cancelAnimationFrame(u),u=requestAnimationFrame((()=>{var t;null==(t=f)||t.observe(e)}))),o()})),c&&!l&&f.observe(c),f.observe(e));let g=l?So(t):null;return l&&function e(){const n=So(t);g&&!jo(g,n)&&o(),g=n,p=requestAnimationFrame(e)}(),o(),()=>{var t;h.forEach((t=>{i&&t.removeEventListener("scroll",o),r&&t.removeEventListener("resize",o)})),null==d||d(),null==(t=f)||t.disconnect(),f=null,l&&cancelAnimationFrame(p)}}(this.anchorEl,this.popup,(()=>{this.reposition()})))}async stop(){return new Promise((t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame((()=>t()))):t()}))}reposition(){if(!this.active||!this.anchorEl)return;const t=[(e={mainAxis:this.distance,crossAxis:this.skidding},void 0===e&&(e=0),{name:"offset",options:e,async fn(t){var o,n;const{x:i,y:r,placement:s,middlewareData:a}=t,l=await async function(t,e){const{placement:o,platform:n,elements:i}=t,r=await(null==n.isRTL?void 0:n.isRTL(i.floating)),s=Ge(o),a=Ve(o),l="y"===Xe(o),c=["left","top"].includes(s)?-1:1,h=r&&l?-1:1,d=Fe(e,t);let{mainAxis:p,crossAxis:u,alignmentAxis:f}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return a&&"number"==typeof f&&(u="end"===a?-1*f:f),l?{x:u*h,y:p*c}:{x:p*c,y:u*h}}(t,e);return s===(null==(o=a.offset)?void 0:o.placement)&&null!=(n=a.arrow)&&n.alignmentOffset?{}:{x:i+l.x,y:r+l.y,data:{...l,placement:s}}}})];var e;this.sync?t.push(Do({apply:({rects:t})=>{const e="width"===this.sync||"both"===this.sync,o="height"===this.sync||"both"===this.sync;this.popup.style.width=e?`${t.reference.width}px`:"",this.popup.style.height=o?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var o,n;const{placement:i,middlewareData:r,rects:s,initialPlacement:a,platform:l,elements:c}=e,{mainAxis:h=!0,crossAxis:d=!0,fallbackPlacements:p,fallbackStrategy:u="bestFit",fallbackAxisSideDirection:f="none",flipAlignment:g=!0,...m}=Fe(t,e);if(null!=(o=r.arrow)&&o.alignmentOffset)return{};const y=Ge(i),v=Xe(a),b=Ge(a)===a,w=await(null==l.isRTL?void 0:l.isRTL(c.floating)),x=p||(b||!g?[Ze(a)]:function(t){const e=Ze(t);return[Ke(t),e,Ke(e)]}(a)),$="none"!==f;!p&&$&&x.push(...function(t,e,o,n){const i=Ve(t);let r=function(t,e,o){const n=["left","right"],i=["right","left"],r=["top","bottom"],s=["bottom","top"];switch(t){case"top":case"bottom":return o?e?i:n:e?n:i;case"left":case"right":return e?r:s;default:return[]}}(Ge(t),"start"===o,n);return i&&(r=r.map((t=>t+"-"+i)),e&&(r=r.concat(r.map(Ke)))),r}(a,g,f,w));const C=[a,...x],M=await eo(e,m),_=[];let A=(null==(n=r.flip)?void 0:n.overflows)||[];if(h&&_.push(M[y]),d){const t=function(t,e,o){void 0===o&&(o=!1);const n=Ve(t),i=Ye(t),r=qe(i);let s="x"===i?n===(o?"end":"start")?"right":"left":"start"===n?"bottom":"top";return e.reference[r]>e.floating[r]&&(s=Ze(s)),[s,Ze(s)]}(i,s,w);_.push(M[t[0]],M[t[1]])}if(A=[...A,{placement:i,overflows:_}],!_.every((t=>t<=0))){var E,S;const t=((null==(E=r.flip)?void 0:E.index)||0)+1,e=C[t];if(e)return{data:{index:t,overflows:A},reset:{placement:e}};let o=null==(S=A.filter((t=>t.overflows[0]<=0)).sort(((t,e)=>t.overflows[1]-e.overflows[1]))[0])?void 0:S.placement;if(!o)switch(u){case"bestFit":{var k;const t=null==(k=A.filter((t=>{if($){const e=Xe(t.placement);return e===v||"y"===e}return!0})).map((t=>[t.placement,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:k[0];t&&(o=t);break}case"initialPlacement":o=a}if(i!==o)return{reset:{placement:o}}}return{}}}}({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:n,placement:i}=e,{mainAxis:r=!0,crossAxis:s=!1,limiter:a={fn:t=>{let{x:e,y:o}=t;return{x:e,y:o}}},...l}=Fe(t,e),c={x:o,y:n},h=await eo(e,l),d=Xe(Ge(i)),p=We(d);let u=c[p],f=c[d];if(r){const t="y"===p?"bottom":"right";u=Ie(u+h["y"===p?"top":"left"],u,u-h[t])}if(s){const t="y"===d?"bottom":"right";f=Ie(f+h["y"===d?"top":"left"],f,f-h[t])}const g=a.fn({...e,[p]:u,[d]:f});return{...g,data:{x:g.x-o,y:g.y-n,enabled:{[p]:r,[d]:s}}}}}}({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(Do({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:e})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${e}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push((t=>({name:"arrow",options:t,async fn(e){const{x:o,y:n,placement:i,rects:r,platform:s,elements:a,middlewareData:l}=e,{element:c,padding:h=0}=Fe(t,e)||{};if(null==c)return{};const d=Je(h),p={x:o,y:n},u=Ye(i),f=qe(u),g=await s.getDimensions(c),m="y"===u,y=m?"top":"left",v=m?"bottom":"right",b=m?"clientHeight":"clientWidth",w=r.reference[f]+r.reference[u]-p[u]-r.floating[f],x=p[u]-r.reference[u],$=await(null==s.getOffsetParent?void 0:s.getOffsetParent(c));let C=$?$[b]:0;C&&await(null==s.isElement?void 0:s.isElement($))||(C=a.floating[b]||r.floating[f]);const M=w/2-x/2,_=C/2-g[f]/2-1,A=He(d[y],_),E=He(d[v],_),S=A,k=C-g[f]-E,R=C/2-g[f]/2+M,P=Ie(S,R,k),O=!l.arrow&&null!=Ve(i)&&R!==P&&r.reference[f]/2-(R<S?A:E)-g[f]/2<0,L=O?R<S?R-S:R-k:0;return{[u]:p[u]+L,data:{[u]:P,centerOffset:R-P-L,...O&&{alignmentOffset:L}},reset:O}}}))({element:this.arrowEl,padding:this.arrowPadding}));const o="absolute"===this.strategy?t=>To.getOffsetParent(t,Fo):To.getOffsetParent;((t,e,o)=>{const n=new Map,i={platform:To,...o},r={...i.platform,_c:n};return(async(t,e,o)=>{const{placement:n="bottom",strategy:i="absolute",middleware:r=[],platform:s}=o,a=r.filter(Boolean),l=await(null==s.isRTL?void 0:s.isRTL(e));let c=await s.getElementRects({reference:t,floating:e,strategy:i}),{x:h,y:d}=to(c,n,l),p=n,u={},f=0;for(let o=0;o<a.length;o++){const{name:r,fn:g}=a[o],{x:m,y,data:v,reset:b}=await g({x:h,y:d,initialPlacement:n,placement:p,strategy:i,middlewareData:u,rects:c,platform:s,elements:{reference:t,floating:e}});h=null!=m?m:h,d=null!=y?y:d,u={...u,[r]:{...u[r],...v}},b&&f<=50&&(f++,"object"==typeof b&&(b.placement&&(p=b.placement),b.rects&&(c=!0===b.rects?await s.getElementRects({reference:t,floating:e,strategy:i}):b.rects),({x:h,y:d}=to(c,p,l))),o=-1)}return{x:h,y:d,placement:p,strategy:i,middlewareData:u}})(t,e,{...i,platform:r})})(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:Pe(Re({},To),{getOffsetParent:o})}).then((({x:t,y:e,middlewareData:o,placement:n})=>{const i="rtl"===this.localize.dir(),r={top:"bottom",right:"left",bottom:"top",left:"right"}[n.split("-")[0]];if(this.setAttribute("data-current-placement",n),Object.assign(this.popup.style,{left:`${t}px`,top:`${e}px`}),this.arrow){const t=o.arrow.x,e=o.arrow.y;let n="",s="",a="",l="";if("start"===this.arrowPlacement){const o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";n="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",s=i?o:"",l=i?"":o}else if("end"===this.arrowPlacement){const o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";s=i?"":o,l=i?o:"",a="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(l="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",n="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":""):(l="number"==typeof t?`${t}px`:"",n="number"==typeof e?`${e}px`:"");Object.assign(this.arrowEl.style,{top:n,right:s,bottom:a,left:l,[r]:"calc(var(--arrow-size-diagonal) * -1)"})}})),requestAnimationFrame((()=>this.updateHoverBridge())),this.emit("sl-reposition")}render(){return V`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${Io({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${Io({popup:!0,"popup--active":this.active,"popup--fixed":"fixed"===this.strategy,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?V`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};Vo.styles=[we,se],Oe([yt(".popup")],Vo.prototype,"popup",2),Oe([yt(".popup__arrow")],Vo.prototype,"arrowEl",2),Oe([ft()],Vo.prototype,"anchor",2),Oe([ft({type:Boolean,reflect:!0})],Vo.prototype,"active",2),Oe([ft({reflect:!0})],Vo.prototype,"placement",2),Oe([ft({reflect:!0})],Vo.prototype,"strategy",2),Oe([ft({type:Number})],Vo.prototype,"distance",2),Oe([ft({type:Number})],Vo.prototype,"skidding",2),Oe([ft({type:Boolean})],Vo.prototype,"arrow",2),Oe([ft({attribute:"arrow-placement"})],Vo.prototype,"arrowPlacement",2),Oe([ft({attribute:"arrow-padding",type:Number})],Vo.prototype,"arrowPadding",2),Oe([ft({type:Boolean})],Vo.prototype,"flip",2),Oe([ft({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map((t=>t.trim())).filter((t=>""!==t)),toAttribute:t=>t.join(" ")}})],Vo.prototype,"flipFallbackPlacements",2),Oe([ft({attribute:"flip-fallback-strategy"})],Vo.prototype,"flipFallbackStrategy",2),Oe([ft({type:Object})],Vo.prototype,"flipBoundary",2),Oe([ft({attribute:"flip-padding",type:Number})],Vo.prototype,"flipPadding",2),Oe([ft({type:Boolean})],Vo.prototype,"shift",2),Oe([ft({type:Object})],Vo.prototype,"shiftBoundary",2),Oe([ft({attribute:"shift-padding",type:Number})],Vo.prototype,"shiftPadding",2),Oe([ft({attribute:"auto-size"})],Vo.prototype,"autoSize",2),Oe([ft()],Vo.prototype,"sync",2),Oe([ft({type:Object})],Vo.prototype,"autoSizeBoundary",2),Oe([ft({attribute:"auto-size-padding",type:Number})],Vo.prototype,"autoSizePadding",2),Oe([ft({attribute:"hover-bridge",type:Boolean})],Vo.prototype,"hoverBridge",2);var Wo=new Map,qo=new WeakMap;function Xo(t,e){return"rtl"===e.toLowerCase()?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function Yo(t,e){Wo.set(t,function(t){return null!=t?t:{keyframes:[],options:{duration:0}}}(e))}function Ko(t,e,o){const n=qo.get(t);if(null==n?void 0:n[e])return Xo(n[e],o.dir);const i=Wo.get(e);return i?Xo(i,o.dir):{keyframes:[],options:{duration:0}}}function Zo(t,e){return new Promise((o=>{t.addEventListener(e,(function n(i){i.target===t&&(t.removeEventListener(e,n),o())}))}))}function Jo(t,e,o){return new Promise((n=>{if((null==o?void 0:o.duration)===1/0)throw new Error("Promise-based animations must be finite.");const i=t.animate(e,Pe(Re({},o),{duration:window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:o.duration}));i.addEventListener("cancel",n,{once:!0}),i.addEventListener("finish",n,{once:!0})}))}function Qo(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?1e3*parseFloat(t):parseFloat(t)}function tn(t){return Promise.all(t.getAnimations().map((t=>new Promise((e=>{t.cancel(),requestAnimationFrame(e)})))))}function en(t,e){const o=Re({waitUntilFirstUpdate:!1},e);return(e,n)=>{const{update:i}=e,r=Array.isArray(t)?t:[t];e.update=function(t){r.forEach((e=>{const i=e;if(t.has(i)){const e=t.get(i),r=this[i];e!==r&&(o.waitUntilFirstUpdate&&!this.hasUpdated||this[n](e,r))}})),i.call(this,t)}}}var on=class extends Be{constructor(){super(),this.localize=new ve(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const t=Qo(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>this.show()),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const t=Qo(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>this.hide()),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await tn(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:e,options:o}=Ko(this,"tooltip.show",{dir:this.localize.dir()});await Jo(this.popup.popup,e,o),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),null==(e=this.closeWatcher)||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await tn(this.body);const{keyframes:t,options:o}=Ko(this,"tooltip.hide",{dir:this.localize.dir()});await Jo(this.popup.popup,t,o),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Zo(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Zo(this,"sl-after-hide")}render(){return V`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${Io({tooltip:!0,"tooltip--open":this.open})}
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
    `}};on.styles=[we,re],on.dependencies={"sl-popup":Vo},Oe([yt("slot:not([name])")],on.prototype,"defaultSlot",2),Oe([yt(".tooltip__body")],on.prototype,"body",2),Oe([yt("sl-popup")],on.prototype,"popup",2),Oe([ft()],on.prototype,"content",2),Oe([ft()],on.prototype,"placement",2),Oe([ft({type:Boolean,reflect:!0})],on.prototype,"disabled",2),Oe([ft({type:Number})],on.prototype,"distance",2),Oe([ft({type:Boolean,reflect:!0})],on.prototype,"open",2),Oe([ft({type:Number})],on.prototype,"skidding",2),Oe([ft()],on.prototype,"trigger",2),Oe([ft({type:Boolean})],on.prototype,"hoist",2),Oe([en("open",{waitUntilFirstUpdate:!0})],on.prototype,"handleOpenChange",1),Oe([en(["content","distance","hoist","placement","skidding"])],on.prototype,"handleOptionsChange",1),Oe([en("disabled")],on.prototype,"handleDisabledChange",1),Yo("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}}),Yo("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});var nn=s`
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
`,rn=s`
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
`,sn="";function an(t){sn=t}var ln={name:"default",resolver:t=>function(t=""){if(!sn){const t=[...document.getElementsByTagName("script")],e=t.find((t=>t.hasAttribute("data-shoelace")));if(e)an(e.getAttribute("data-shoelace"));else{const e=t.find((t=>/shoelace(\.min)?\.js($|\?)/.test(t.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(t.src)));let o="";e&&(o=e.getAttribute("src")),an(o.split("/").slice(0,-1).join("/"))}}return sn.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}(`assets/icons/${t}.svg`)},cn={caret:'\n    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n      <polyline points="6 9 12 15 18 9"></polyline>\n    </svg>\n  ',check:'\n    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor">\n          <g transform="translate(3.428571, 3.428571)">\n            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>\n            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"chevron-down":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',"chevron-left":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>\n    </svg>\n  ',"chevron-right":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',copy:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>\n    </svg>\n  ',eye:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n    </svg>\n  ',"eye-slash":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">\n      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>\n      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>\n      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>\n    </svg>\n  ',eyedropper:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">\n      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>\n    </svg>\n  ',"grip-vertical":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">\n      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>\n    </svg>\n  ',indeterminate:'\n    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor" stroke-width="2">\n          <g transform="translate(2.285714, 6.857143)">\n            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"person-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">\n      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>\n    </svg>\n  ',"play-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">\n      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>\n    </svg>\n  ',"pause-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">\n      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>\n    </svg>\n  ',radio:'\n    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g fill="currentColor">\n          <circle cx="8" cy="8" r="3.42857143"></circle>\n        </g>\n      </g>\n    </svg>\n  ',"star-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">\n      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n    </svg>\n  ',"x-lg":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">\n      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>\n    </svg>\n  ',"x-circle-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">\n      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>\n    </svg>\n  '},hn=[ln,{name:"system",resolver:t=>t in cn?`data:image/svg+xml,${encodeURIComponent(cn[t])}`:""}],dn=[];function pn(t){return hn.find((e=>e.name===t))}const{I:un}=at;var fn,gn=Symbol(),mn=Symbol(),yn=new Map,vn=class extends Be{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var o;let n;if(null==e?void 0:e.spriteSheet)return this.svg=V`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(n=await fetch(t,{mode:"cors"}),!n.ok)return 410===n.status?gn:mn}catch(t){return mn}try{const t=document.createElement("div");t.innerHTML=await n.text();const e=t.firstElementChild;if("svg"!==(null==(o=null==e?void 0:e.tagName)?void 0:o.toLowerCase()))return gn;fn||(fn=new DOMParser);const i=fn.parseFromString(e.outerHTML,"text/html").body.querySelector("svg");return i?(i.part.add("svg"),document.adoptNode(i)):gn}catch(t){return gn}}connectedCallback(){super.connectedCallback(),dn.push(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){var t;super.disconnectedCallback(),t=this,dn=dn.filter((e=>e!==t))}getIconSource(){const t=pn(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const{url:e,fromLibrary:o}=this.getIconSource(),n=o?pn(this.library):void 0;if(!e)return void(this.svg=null);let i=yn.get(e);if(i||(i=this.resolveIcon(e,n),yn.set(e,i)),!this.initialRender)return;const r=await i;if(r===mn&&yn.delete(e),e===this.getIconSource().url)if((t=>void 0!==t?._$litType$)(r)){if(this.svg=r,n){await this.updateComplete;const t=this.shadowRoot.querySelector("[part='svg']");"function"==typeof n.mutator&&t&&n.mutator(t)}}else switch(r){case mn:case gn:this.svg=null,this.emit("sl-error");break;default:this.svg=r.cloneNode(!0),null==(t=null==n?void 0:n.mutator)||t.call(n,this.svg),this.emit("sl-load")}}render(){return this.svg}};vn.styles=[we,rn],Oe([gt()],vn.prototype,"svg",2),Oe([ft({reflect:!0})],vn.prototype,"name",2),Oe([ft()],vn.prototype,"src",2),Oe([ft()],vn.prototype,"label",2),Oe([ft({reflect:!0})],vn.prototype,"library",2),Oe([en("label")],vn.prototype,"handleLabelChange",1),Oe([en(["name","src","library"])],vn.prototype,"setIcon",1);var bn=class extends Be{constructor(){super(...arguments),this.localize=new ve(this),this.isCopying=!1,this.status="rest",this.value="",this.from="",this.disabled=!1,this.copyLabel="",this.successLabel="",this.errorLabel="",this.feedbackDuration=1e3,this.tooltipPlacement="top",this.hoist=!1}async handleCopy(){if(this.disabled||this.isCopying)return;this.isCopying=!0;let t=this.value;if(this.from){const e=this.getRootNode(),o=this.from.includes("."),n=this.from.includes("[")&&this.from.includes("]");let i=this.from,r="";o?[i,r]=this.from.trim().split("."):n&&([i,r]=this.from.trim().replace(/\]$/,"").split("["));const s="getElementById"in e?e.getElementById(i):null;s?t=n?s.getAttribute(r)||"":o?s[r]||"":s.textContent||"":(this.showStatus("error"),this.emit("sl-error"))}if(t)try{await navigator.clipboard.writeText(t),this.showStatus("success"),this.emit("sl-copy",{detail:{value:t}})}catch(t){this.showStatus("error"),this.emit("sl-error")}else this.showStatus("error"),this.emit("sl-error")}async showStatus(t){const e=this.copyLabel||this.localize.term("copy"),o=this.successLabel||this.localize.term("copied"),n=this.errorLabel||this.localize.term("error"),i="success"===t?this.successIcon:this.errorIcon,r=Ko(this,"copy.in",{dir:"ltr"}),s=Ko(this,"copy.out",{dir:"ltr"});this.tooltip.content="success"===t?o:n,await this.copyIcon.animate(s.keyframes,s.options).finished,this.copyIcon.hidden=!0,this.status=t,i.hidden=!1,await i.animate(r.keyframes,r.options).finished,setTimeout((async()=>{await i.animate(s.keyframes,s.options).finished,i.hidden=!0,this.status="rest",this.copyIcon.hidden=!1,await this.copyIcon.animate(r.keyframes,r.options).finished,this.tooltip.content=e,this.isCopying=!1}),this.feedbackDuration)}render(){const t=this.copyLabel||this.localize.term("copy");return V`
      <sl-tooltip
        class=${Io({"copy-button":!0,"copy-button--success":"success"===this.status,"copy-button--error":"error"===this.status})}
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
    `}};bn.styles=[we,nn],bn.dependencies={"sl-icon":vn,"sl-tooltip":on},Oe([yt('slot[name="copy-icon"]')],bn.prototype,"copyIcon",2),Oe([yt('slot[name="success-icon"]')],bn.prototype,"successIcon",2),Oe([yt('slot[name="error-icon"]')],bn.prototype,"errorIcon",2),Oe([yt("sl-tooltip")],bn.prototype,"tooltip",2),Oe([gt()],bn.prototype,"isCopying",2),Oe([gt()],bn.prototype,"status",2),Oe([ft()],bn.prototype,"value",2),Oe([ft()],bn.prototype,"from",2),Oe([ft({type:Boolean,reflect:!0})],bn.prototype,"disabled",2),Oe([ft({attribute:"copy-label"})],bn.prototype,"copyLabel",2),Oe([ft({attribute:"success-label"})],bn.prototype,"successLabel",2),Oe([ft({attribute:"error-label"})],bn.prototype,"errorLabel",2),Oe([ft({attribute:"feedback-duration",type:Number})],bn.prototype,"feedbackDuration",2),Oe([ft({attribute:"tooltip-placement"})],bn.prototype,"tooltipPlacement",2),Oe([ft({type:Boolean})],bn.prototype,"hoist",2),Yo("copy.in",{keyframes:[{scale:".25",opacity:".25"},{scale:"1",opacity:"1"}],options:{duration:100}}),Yo("copy.out",{keyframes:[{scale:"1",opacity:"1"},{scale:".25",opacity:"0"}],options:{duration:100}}),bn.define("sl-copy-button");class wn extends Event{constructor(t,e){super(wn.type,{bubbles:!0,composed:!0}),this.inputType=t,this.value=e}}wn.type="color-converter-input";var xn,$n=function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s};!function(t){t.HEX="HEX",t.RGB255="RGB255",t.RGB01="RGB01",t.HSV="HSV"}(xn||(xn={}));const Cn={[xn.HEX]:"Hex",[xn.RGB255]:"RGB (0-255)",[xn.RGB01]:"RGB (0-1)",[xn.HSV]:"HSV"},Mn={[xn.HEX]:"hexValue",[xn.RGB255]:"rgb255Value",[xn.RGB01]:"rgb01Value",[xn.HSV]:"hsvValue"},_n={[xn.HEX]:t=>"#"+t.getHex(),[xn.RGB255]:t=>t.getRGB255().splice(0,3).toString(),[xn.RGB01]:t=>t.getRGB01().splice(0,3).map((t=>t.toFixed(3))).toString(),[xn.HSV]:t=>t.getHSV(!1).splice(0,3).toString()};let An=class extends ct{constructor(){super(...arguments),this.type=xn.HEX,this.inputValues={},this.color=new kt}onValueChange(t){this.dispatchEvent(new wn(this.type,t.target.value))}render(){const t=this.inputValues[Mn[this.type]]??_n[this.type](this.color);return V`
      ${Ot}
      <div class="input-group">
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            .value=${t}
            @input=${this.onValueChange}
          />
          <label>${Cn[this.type]}</label>
        </div>
        <span class="input-group-text">
          <sl-copy-button value=${t}></sl-copy-button>
        </span>
      </div>
    `}};$n([ft()],An.prototype,"type",void 0),$n([ft({attribute:!1})],An.prototype,"inputValues",void 0),$n([ft({attribute:!1})],An.prototype,"color",void 0),An=$n([dt("color-converter-input")],An);var En=function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s};const Sn={[xn.HEX]:kt.parseHex,[xn.RGB255]:kt.parseRGB255,[xn.RGB01]:kt.parseRGB01,[xn.HSV]:kt.parseHSV};let kn=class extends ct{constructor(){super(),this.color=new kt,this.coordinates={x:0,y:0,width:0,height:0},this.inputValues={},this.addEventListener(wn.type,(t=>{if(t instanceof wn){const{inputType:e,value:o}=t,n=Sn[e](o);null!=n&&(this.setColor(n),this.inputValues={...this.inputValues,[Mn[e]]:o})}}))}setColor(t){this.dispatchEvent(new Lt(t))}updateChildren(){Array.prototype.forEach.call(this.children,(t=>{t instanceof An&&(t.inputValues=this.inputValues,t.color=this.color)}))}render(){const t={x:this.coordinates.x/this.coordinates.width,y:this.coordinates.y/this.coordinates.height},e=[t.x.toFixed(3),t.y.toFixed(3)],o=[Math.round(this.coordinates.x),Math.round(this.coordinates.y)];return this.updateChildren(),V`
      ${Ot}
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
      <slot class="d-flex flex-column inputs-container"></slot>
    `}};kn.styles=[ie],En([ft({attribute:!1})],kn.prototype,"color",void 0),En([ft({attribute:!1})],kn.prototype,"coordinates",void 0),En([gt()],kn.prototype,"inputValues",void 0),kn=En([dt("color-converter")],kn);const Rn=(t,e)=>{const o=t._$AN;if(void 0===o)return!1;for(const t of o)t._$AO?.(e,!1),Rn(t,e);return!0},Pn=t=>{let e,o;do{if(void 0===(e=t._$AM))break;o=e._$AN,o.delete(t),t=e}while(0===o?.size)},On=t=>{for(let e;e=t._$AM;t=e){let o=e._$AN;if(void 0===o)e._$AN=o=new Set;else if(o.has(t))break;o.add(t),Hn(e)}};function Ln(t){void 0!==this._$AN?(Pn(this),this._$AM=t,On(this)):this._$AM=t}function Bn(t,e=!1,o=0){const n=this._$AH,i=this._$AN;if(void 0!==i&&0!==i.size)if(e)if(Array.isArray(n))for(let t=o;t<n.length;t++)Rn(n[t],!1),Pn(n[t]);else null!=n&&(Rn(n,!1),Pn(n));else Rn(this,t)}const Hn=t=>{2==t.type&&(t._$AP??=Bn,t._$AQ??=Ln)};class zn extends Uo{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,o){super._$AT(t,e,o),On(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(Rn(this,t),Pn(this))}setValue(t){if((()=>void 0===this._$Ct.strings)())this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}class Tn{}const jn=new WeakMap,Dn=No(class extends zn{render(t){return q}update(t,[e]){const o=e!==this.Y;return o&&void 0!==this.Y&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.Y=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),q}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.Y){const e=this.ht??globalThis;let o=jn.get(e);void 0===o&&(o=new WeakMap,jn.set(e,o)),void 0!==o.get(this.Y)&&this.Y.call(this.ht,void 0),o.set(this.Y,t),void 0!==t&&this.Y.call(this.ht,t)}else this.Y.value=t}get lt(){return"function"==typeof this.Y?jn.get(this.ht??globalThis)?.get(this.Y):this.Y?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Nn=s`:host {
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
`;var Un,In,Fn=function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s};!function(t){t.Transparent="transparent",t.Black="black",t.White="white"}(Un||(Un={})),function(t){t.Small="small",t.Medium="medium",t.Large="large"}(In||(In={}));const Gn={[In.Small]:"1rem",[In.Medium]:"1.5rem",[In.Large]:"3rem"};let Vn=class extends ct{constructor(){super(),this.coordinates={x:0,y:0,width:0,height:0},this.initialOverlayColor=Un.Black,this.overlayColor=Un.Black,this.overlaySize=In.Medium,this.loadedImage=!1,this.canvasRef=new Tn,this.overlayColor=this.initialOverlayColor}setColor(t){this.dispatchEvent(new Lt(t))}setCoordinates(t){this.dispatchEvent(new Ut(t))}loadImage(t){const e=t.currentTarget.files?.item(0);if(e){const t=new FileReader;t.onload=t=>{const e=new Image;e.onload=()=>{const t=this.canvasRef.value,o=t.getContext("2d");o&&(t.width=e.width,t.height=e.height,o.drawImage(e,0,0)),this.loadedImage=!0},e.src=t.target?.result},t.readAsDataURL(e)}}sampleImage(t){if(t instanceof MouseEvent&&1==t.buttons){const e=this.canvasRef.value,o=e.getContext("2d");if(o){const n=e.getBoundingClientRect(),i=(t.clientX-n.left)/n.width*e.width,r=(t.clientY-n.top)/n.height*e.height,s=o.getImageData(i,r,1,1);this.setColor(new kt({type:St.RGB255,r:s.data[0],g:s.data[1],b:s.data[2]})),this.setCoordinates({x:i,y:r,width:e.width,height:e.height})}}}selectOverlayColor(t){this.overlayColor=t.currentTarget.value}selectOverlaySize(t){this.overlaySize=t.currentTarget.value}render(){const t=this.coordinates.x/this.coordinates.width*100,e=this.coordinates.y/this.coordinates.height*100,o=`\n      border-color: ${this.overlayColor};\n      top: calc(${e}% - var(--circle-diameter) / 2);\n      left: calc(${t}% - var(--circle-diameter) / 2);\n      --circle-diameter: ${Gn[this.overlaySize]};\n    `;return V`
      ${Ot}
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
              value=${Un.Transparent}
              .selected=${this.overlayColor==Un.Transparent}
            >
              None
            </option>
            <option
              value=${Un.Black}
              .selected=${this.overlayColor==Un.Black}
            >
              Black
            </option>
            <option
              value=${Un.White}
              .selected=${this.overlayColor==Un.White}
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
              value=${In.Small}
              .selected=${this.overlaySize==In.Small}
            >
              Small
            </option>
            <option
              value=${In.Medium}
              .selected=${this.overlaySize==In.Medium}
            >
              Medium
            </option>
            <option
              value=${In.Large}
              .selected=${this.overlaySize==In.Large}
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
          ${Dn(this.canvasRef)}
          @mousedown=${this.sampleImage}
          @mousemove=${this.sampleImage}
        ></canvas>
        <div
          class="image-preview-overlay"
          ?hidden=${!this.loadedImage}
          style=${o}
        ></div>
      </div>
    `}};Vn.styles=[Nn],Fn([ft({attribute:!1})],Vn.prototype,"coordinates",void 0),Fn([ft({attribute:!1})],Vn.prototype,"initialOverlayColor",void 0),Fn([gt()],Vn.prototype,"overlayColor",void 0),Fn([gt()],Vn.prototype,"overlaySize",void 0),Fn([gt()],Vn.prototype,"loadedImage",void 0),Vn=Fn([dt("image-sampling")],Vn);class Wn extends ct{constructor(){super(...arguments),this.onMouseMoveBound=this.onMouseMove.bind(this),this.onMouseUpBound=this.onMouseUp.bind(this)}getColorMapData(){return[[0,0,0]]}getColorMapName(){return"Color Map"}setColor(t){this.dispatchEvent(new Lt(t))}toCss(){const t=this.getColorMapData(),e=[];for(let o=0;o<256;o++)e.push(`rgba(${Math.round(255*t[o][0])}, ${Math.round(255*t[o][1])}, ${Math.round(255*t[o][2])}, 255) ${100*o/255}%`);return`linear-gradient(to right, ${e.join(", ")})`}getColorAt(t){const e=this.getColorMapData(),o=Math.floor(_t(t*e.length,0,e.length-1)),n=Math.ceil(_t(t*e.length,0,e.length-1)),i=t*e.length-o,r=new kt({type:St.RGB01,r:e[o][0],g:e[o][1],b:e[o][2]}),s=new kt({type:St.RGB01,r:e[n][0],g:e[n][1],b:e[n][2]});return kt.lerp(r,s,i)}onMouseMove(t){if(1==t.buttons){const e=this.colorMapDiv.getBoundingClientRect(),o=(t.clientX-e.left)/e.width,n=this.getColorAt(o);this.setColor(n)}}onMouseDown(){document.addEventListener("mousemove",this.onMouseMoveBound),document.addEventListener("mouseup",this.onMouseUpBound)}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMoveBound),document.removeEventListener("mouseup",this.onMouseUpBound)}render(){return V` <div>
      <th>${this.getColorMapName()}</th>
      <td>
        <div
          style="background: ${this.toCss()}"
          class="gradient"
          @mousedown=${this.onMouseDown.bind(this)}
          id="colormap-div"
        ></div>
      </td>
    </div>`}}Wn.styles=[s`
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
    `],function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);r>3&&s&&Object.defineProperty(e,o,s)}([yt("#colormap-div")],Wn.prototype,"colorMapDiv",void 0);const qn=[[.18995,.07176,.23217],[.19483,.08339,.26149],[.19956,.09498,.29024],[.20415,.10652,.31844],[.2086,.11802,.34607],[.21291,.12947,.37314],[.21708,.14087,.39964],[.22111,.15223,.42558],[.225,.16354,.45096],[.22875,.17481,.47578],[.23236,.18603,.50004],[.23582,.1972,.52373],[.23915,.20833,.54686],[.24234,.21941,.56942],[.24539,.23044,.59142],[.2483,.24143,.61286],[.25107,.25237,.63374],[.25369,.26327,.65406],[.25618,.27412,.67381],[.25853,.28492,.693],[.26074,.29568,.71162],[.2628,.30639,.72968],[.26473,.31706,.74718],[.26652,.32768,.76412],[.26816,.33825,.7805],[.26967,.34878,.79631],[.27103,.35926,.81156],[.27226,.3697,.82624],[.27334,.38008,.84037],[.27429,.39043,.85393],[.27509,.40072,.86692],[.27576,.41097,.87936],[.27628,.42118,.89123],[.27667,.43134,.90254],[.27691,.44145,.91328],[.27701,.45152,.92347],[.27698,.46153,.93309],[.2768,.47151,.94214],[.27648,.48144,.95064],[.27603,.49132,.95857],[.27543,.50115,.96594],[.27469,.51094,.97275],[.27381,.52069,.97899],[.27273,.5304,.98461],[.27106,.54015,.9893],[.26878,.54995,.99303],[.26592,.55979,.99583],[.26252,.56967,.99773],[.25862,.57958,.99876],[.25425,.5895,.99896],[.24946,.59943,.99835],[.24427,.60937,.99697],[.23874,.61931,.99485],[.23288,.62923,.99202],[.22676,.63913,.98851],[.22039,.64901,.98436],[.21382,.65886,.97959],[.20708,.66866,.97423],[.20021,.67842,.96833],[.19326,.68812,.9619],[.18625,.69775,.95498],[.17923,.70732,.94761],[.17223,.7168,.93981],[.16529,.7262,.93161],[.15844,.73551,.92305],[.15173,.74472,.91416],[.14519,.75381,.90496],[.13886,.76279,.8955],[.13278,.77165,.8858],[.12698,.78037,.8759],[.12151,.78896,.86581],[.11639,.7974,.85559],[.11167,.80569,.84525],[.10738,.81381,.83484],[.10357,.82177,.82437],[.10026,.82955,.81389],[.0975,.83714,.80342],[.09532,.84455,.79299],[.09377,.85175,.78264],[.09287,.85875,.7724],[.09267,.86554,.7623],[.0932,.87211,.75237],[.09451,.87844,.74265],[.09662,.88454,.73316],[.09958,.8904,.72393],[.10342,.896,.715],[.10815,.90142,.70599],[.11374,.90673,.69651],[.12014,.91193,.6866],[.12733,.91701,.67627],[.13526,.92197,.66556],[.14391,.9268,.65448],[.15323,.93151,.64308],[.16319,.93609,.63137],[.17377,.94053,.61938],[.18491,.94484,.60713],[.19659,.94901,.59466],[.20877,.95304,.58199],[.22142,.95692,.56914],[.23449,.96065,.55614],[.24797,.96423,.54303],[.2618,.96765,.52981],[.27597,.97092,.51653],[.29042,.97403,.50321],[.30513,.97697,.48987],[.32006,.97974,.47654],[.33517,.98234,.46325],[.35043,.98477,.45002],[.36581,.98702,.43688],[.38127,.98909,.42386],[.39678,.99098,.41098],[.41229,.99268,.39826],[.42778,.99419,.38575],[.44321,.99551,.37345],[.45854,.99663,.3614],[.47375,.99755,.34963],[.48879,.99828,.33816],[.50362,.99879,.32701],[.51822,.9991,.31622],[.53255,.99919,.30581],[.54658,.99907,.29581],[.56026,.99873,.28623],[.57357,.99817,.27712],[.58646,.99739,.26849],[.59891,.99638,.26038],[.61088,.99514,.2528],[.62233,.99366,.24579],[.63323,.99195,.23937],[.64362,.98999,.23356],[.65394,.98775,.22835],[.66428,.98524,.2237],[.67462,.98246,.2196],[.68494,.97941,.21602],[.69525,.9761,.21294],[.70553,.97255,.21032],[.71577,.96875,.20815],[.72596,.9647,.2064],[.7361,.96043,.20504],[.74617,.95593,.20406],[.75617,.95121,.20343],[.76608,.94627,.20311],[.77591,.94113,.2031],[.78563,.93579,.20336],[.79524,.93025,.20386],[.80473,.92452,.20459],[.8141,.91861,.20552],[.82333,.91253,.20663],[.83241,.90627,.20788],[.84133,.89986,.20926],[.8501,.89328,.21074],[.85868,.88655,.2123],[.86709,.87968,.21391],[.8753,.87267,.21555],[.88331,.86553,.21719],[.89112,.85826,.2188],[.8987,.85087,.22038],[.90605,.84337,.22188],[.91317,.83576,.22328],[.92004,.82806,.22456],[.92666,.82025,.2257],[.93301,.81236,.22667],[.93909,.80439,.22744],[.94489,.79634,.228],[.95039,.78823,.22831],[.9556,.78005,.22836],[.96049,.77181,.22811],[.96507,.76352,.22754],[.96931,.75519,.22663],[.97323,.74682,.22536],[.97679,.73842,.22369],[.98,.73,.22161],[.98289,.7214,.21918],[.98549,.7125,.2165],[.98781,.7033,.21358],[.98986,.69382,.21043],[.99163,.68408,.20706],[.99314,.67408,.20348],[.99438,.66386,.19971],[.99535,.65341,.19577],[.99607,.64277,.19165],[.99654,.63193,.18738],[.99675,.62093,.18297],[.99672,.60977,.17842],[.99644,.59846,.17376],[.99593,.58703,.16899],[.99517,.57549,.16412],[.99419,.56386,.15918],[.99297,.55214,.15417],[.99153,.54036,.1491],[.98987,.52854,.14398],[.98799,.51667,.13883],[.9859,.50479,.13367],[.9836,.49291,.12849],[.98108,.48104,.12332],[.97837,.4692,.11817],[.97545,.4574,.11305],[.97234,.44565,.10797],[.96904,.43399,.10294],[.96555,.42241,.09798],[.96187,.41093,.0931],[.95801,.39958,.08831],[.95398,.38836,.08362],[.94977,.37729,.07905],[.94538,.36638,.07461],[.94084,.35566,.07031],[.93612,.34513,.06616],[.93125,.33482,.06218],[.92623,.32473,.05837],[.92105,.31489,.05475],[.91572,.3053,.05134],[.91024,.29599,.04814],[.90463,.28696,.04516],[.89888,.27824,.04243],[.89298,.26981,.03993],[.88691,.26152,.03753],[.88066,.25334,.03521],[.87422,.24526,.03297],[.8676,.2373,.03082],[.86079,.22945,.02875],[.8538,.2217,.02677],[.84662,.21407,.02487],[.83926,.20654,.02305],[.83172,.19912,.02131],[.82399,.19182,.01966],[.81608,.18462,.01809],[.80799,.17753,.0166],[.79971,.17055,.0152],[.79125,.16368,.01387],[.7826,.15693,.01264],[.77377,.15028,.01148],[.76476,.14374,.01041],[.75556,.13731,.00942],[.74617,.13098,.00851],[.73661,.12477,.00769],[.72686,.11867,.00695],[.71692,.11268,.00629],[.7068,.1068,.00571],[.6965,.10102,.00522],[.68602,.09536,.00481],[.67535,.0898,.00449],[.66449,.08436,.00424],[.65345,.07902,.00408],[.64223,.0738,.00401],[.63082,.06868,.00401],[.61923,.06367,.0041],[.60746,.05878,.00427],[.5955,.05399,.00453],[.58336,.04931,.00486],[.57103,.04474,.00529],[.55852,.04028,.00579],[.54583,.03593,.00638],[.53295,.03169,.00705],[.51989,.02756,.0078],[.50664,.02354,.00863],[.49321,.01963,.00955],[.4796,.01583,.01055]];let Xn=class extends Wn{getColorMapData(){return qn}getColorMapName(){return"Turbo"}};Xn=function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s}([dt("turbo-colormap")],Xn);let Yn=class extends ct{render(){return V`
      ${Ot}
      <h5>Color Maps</h5>
      <div class="table mb-0">
        <slot></slot>
      </div>
    `}};Yn.styles=[s`
      ul {
        padding: 0;
      }
    `],Yn=function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s}([dt("color-maps")],Yn);var Kn=function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s};let Zn=class extends ct{constructor(){super(...arguments),this.name="",this.href=""}};Kn([ft()],Zn.prototype,"name",void 0),Kn([ft()],Zn.prototype,"href",void 0),Zn=Kn([dt("other-tools-entry")],Zn);let Jn=class extends ct{render(){return V` ${Ot}
      <h5>Other Tools</h5>
      <ul>
        ${Array.prototype.map.call(this.children,(t=>{if(t instanceof Zn)return V`<li>
              <a href="${t.href}" target="_blank">${t.name}</a>
            </li>`}))}
      </ul>`}};Jn=function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s}([dt("other-tools")],Jn);var Qn=function(t,e,o,n){var i,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,o,s):i(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s};let ti=class extends ct{constructor(){super(),this.color=new kt({type:St.RGB255,r:255,g:255,b:255}),this.coordinates={x:0,y:0,width:1,height:1},this.interpolationLeft=new kt({type:St.RGB255,r:255,g:0,b:0}),this.interpolationRight=new kt({type:St.RGB255,r:255,g:255,b:255}),this.interpolationActive=Tt.NONE,this.addEventListener(Lt.eventName,(t=>{t instanceof Lt&&this.setColor(t.color)})),this.addEventListener(Ut.eventName,(t=>{t instanceof Ut&&this.setCoordinates(t.coordinates)})),this.addEventListener(Bt.eventName,(t=>{t instanceof Bt&&this.setInterpolationActive(t.active)}))}setColor(t){this.color=t,this.interpolationActive===Tt.LEFT?this.interpolationLeft=t:this.interpolationActive==Tt.RIGHT&&(this.interpolationRight=t)}setCoordinates(t){this.coordinates=t}setInterpolationActive(t){this.interpolationActive=t}updateChildren(){Array.prototype.forEach.call(this.children,(t=>{t instanceof ne?t.color=this.color:t instanceof kn?(t.color=this.color,t.coordinates=this.coordinates):t instanceof Vn?t.coordinates=this.coordinates:t instanceof Dt&&(t.leftColor=this.interpolationLeft,t.rightColor=this.interpolationRight,t.activeColor=this.interpolationActive)}))}render(){return this.style.background="#"+this.color.getHex(),this.updateChildren(),V` ${Ot}
      <slot class="d-flex flex-row flex-wrap main-container"></slot>`}};ti.styles=[Nt],Qn([gt()],ti.prototype,"color",void 0),Qn([gt()],ti.prototype,"coordinates",void 0),Qn([gt()],ti.prototype,"interpolationLeft",void 0),Qn([gt()],ti.prototype,"interpolationRight",void 0),Qn([gt()],ti.prototype,"interpolationActive",void 0),ti=Qn([dt("color-picker")],ti)})()})();
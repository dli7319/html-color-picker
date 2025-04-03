/*! For license information please see main.js.LICENSE.txt */
(()=>{var t={659:(t,e,o)=>{const r=o(156),n={};for(const t of Object.keys(r))n[r[t]]=t;const i={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};t.exports=i;for(const t of Object.keys(i)){if(!("channels"in i[t]))throw new Error("missing channels property: "+t);if(!("labels"in i[t]))throw new Error("missing channel labels property: "+t);if(i[t].labels.length!==i[t].channels)throw new Error("channel and label counts mismatch: "+t);const{channels:e,labels:o}=i[t];delete i[t].channels,delete i[t].labels,Object.defineProperty(i[t],"channels",{value:e}),Object.defineProperty(i[t],"labels",{value:o})}i.rgb.hsl=function(t){const e=t[0]/255,o=t[1]/255,r=t[2]/255,n=Math.min(e,o,r),i=Math.max(e,o,r),s=i-n;let l,a;i===n?l=0:e===i?l=(o-r)/s:o===i?l=2+(r-e)/s:r===i&&(l=4+(e-o)/s),l=Math.min(60*l,360),l<0&&(l+=360);const c=(n+i)/2;return a=i===n?0:c<=.5?s/(i+n):s/(2-i-n),[l,100*a,100*c]},i.rgb.hsv=function(t){let e,o,r,n,i;const s=t[0]/255,l=t[1]/255,a=t[2]/255,c=Math.max(s,l,a),h=c-Math.min(s,l,a),d=function(t){return(c-t)/6/h+.5};return 0===h?(n=0,i=0):(i=h/c,e=d(s),o=d(l),r=d(a),s===c?n=r-o:l===c?n=1/3+e-r:a===c&&(n=2/3+o-e),n<0?n+=1:n>1&&(n-=1)),[360*n,100*i,100*c]},i.rgb.hwb=function(t){const e=t[0],o=t[1];let r=t[2];const n=i.rgb.hsl(t)[0],s=1/255*Math.min(e,Math.min(o,r));return r=1-1/255*Math.max(e,Math.max(o,r)),[n,100*s,100*r]},i.rgb.cmyk=function(t){const e=t[0]/255,o=t[1]/255,r=t[2]/255,n=Math.min(1-e,1-o,1-r);return[100*((1-e-n)/(1-n)||0),100*((1-o-n)/(1-n)||0),100*((1-r-n)/(1-n)||0),100*n]},i.rgb.keyword=function(t){const e=n[t];if(e)return e;let o,i=1/0;for(const e of Object.keys(r)){const n=(l=r[e],((s=t)[0]-l[0])**2+(s[1]-l[1])**2+(s[2]-l[2])**2);n<i&&(i=n,o=e)}var s,l;return o},i.keyword.rgb=function(t){return r[t]},i.rgb.xyz=function(t){let e=t[0]/255,o=t[1]/255,r=t[2]/255;return e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,o=o>.04045?((o+.055)/1.055)**2.4:o/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92,[100*(.4124*e+.3576*o+.1805*r),100*(.2126*e+.7152*o+.0722*r),100*(.0193*e+.1192*o+.9505*r)]},i.rgb.lab=function(t){const e=i.rgb.xyz(t);let o=e[0],r=e[1],n=e[2];return o/=95.047,r/=100,n/=108.883,o=o>.008856?o**(1/3):7.787*o+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,[116*r-16,500*(o-r),200*(r-n)]},i.hsl.rgb=function(t){const e=t[0]/360,o=t[1]/100,r=t[2]/100;let n,i,s;if(0===o)return s=255*r,[s,s,s];n=r<.5?r*(1+o):r+o-r*o;const l=2*r-n,a=[0,0,0];for(let t=0;t<3;t++)i=e+1/3*-(t-1),i<0&&i++,i>1&&i--,s=6*i<1?l+6*(n-l)*i:2*i<1?n:3*i<2?l+(n-l)*(2/3-i)*6:l,a[t]=255*s;return a},i.hsl.hsv=function(t){const e=t[0];let o=t[1]/100,r=t[2]/100,n=o;const i=Math.max(r,.01);return r*=2,o*=r<=1?r:2-r,n*=i<=1?i:2-i,[e,100*(0===r?2*n/(i+n):2*o/(r+o)),(r+o)/2*100]},i.hsv.rgb=function(t){const e=t[0]/60,o=t[1]/100;let r=t[2]/100;const n=Math.floor(e)%6,i=e-Math.floor(e),s=255*r*(1-o),l=255*r*(1-o*i),a=255*r*(1-o*(1-i));switch(r*=255,n){case 0:return[r,a,s];case 1:return[l,r,s];case 2:return[s,r,a];case 3:return[s,l,r];case 4:return[a,s,r];case 5:return[r,s,l]}},i.hsv.hsl=function(t){const e=t[0],o=t[1]/100,r=t[2]/100,n=Math.max(r,.01);let i,s;s=(2-o)*r;const l=(2-o)*n;return i=o*n,i/=l<=1?l:2-l,i=i||0,s/=2,[e,100*i,100*s]},i.hwb.rgb=function(t){const e=t[0]/360;let o=t[1]/100,r=t[2]/100;const n=o+r;let i;n>1&&(o/=n,r/=n);const s=Math.floor(6*e),l=1-r;i=6*e-s,1&s&&(i=1-i);const a=o+i*(l-o);let c,h,d;switch(s){default:case 6:case 0:c=l,h=a,d=o;break;case 1:c=a,h=l,d=o;break;case 2:c=o,h=l,d=a;break;case 3:c=o,h=a,d=l;break;case 4:c=a,h=o,d=l;break;case 5:c=l,h=o,d=a}return[255*c,255*h,255*d]},i.cmyk.rgb=function(t){const e=t[0]/100,o=t[1]/100,r=t[2]/100,n=t[3]/100;return[255*(1-Math.min(1,e*(1-n)+n)),255*(1-Math.min(1,o*(1-n)+n)),255*(1-Math.min(1,r*(1-n)+n))]},i.xyz.rgb=function(t){const e=t[0]/100,o=t[1]/100,r=t[2]/100;let n,i,s;return n=3.2406*e+-1.5372*o+-.4986*r,i=-.9689*e+1.8758*o+.0415*r,s=.0557*e+-.204*o+1.057*r,n=n>.0031308?1.055*n**(1/2.4)-.055:12.92*n,i=i>.0031308?1.055*i**(1/2.4)-.055:12.92*i,s=s>.0031308?1.055*s**(1/2.4)-.055:12.92*s,n=Math.min(Math.max(0,n),1),i=Math.min(Math.max(0,i),1),s=Math.min(Math.max(0,s),1),[255*n,255*i,255*s]},i.xyz.lab=function(t){let e=t[0],o=t[1],r=t[2];return e/=95.047,o/=100,r/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,o=o>.008856?o**(1/3):7.787*o+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,[116*o-16,500*(e-o),200*(o-r)]},i.lab.xyz=function(t){let e,o,r;o=(t[0]+16)/116,e=t[1]/500+o,r=o-t[2]/200;const n=o**3,i=e**3,s=r**3;return o=n>.008856?n:(o-16/116)/7.787,e=i>.008856?i:(e-16/116)/7.787,r=s>.008856?s:(r-16/116)/7.787,e*=95.047,o*=100,r*=108.883,[e,o,r]},i.lab.lch=function(t){const e=t[0],o=t[1],r=t[2];let n;return n=360*Math.atan2(r,o)/2/Math.PI,n<0&&(n+=360),[e,Math.sqrt(o*o+r*r),n]},i.lch.lab=function(t){const e=t[0],o=t[1],r=t[2]/360*2*Math.PI;return[e,o*Math.cos(r),o*Math.sin(r)]},i.rgb.ansi16=function(t,e=null){const[o,r,n]=t;let s=null===e?i.rgb.hsv(t)[2]:e;if(s=Math.round(s/50),0===s)return 30;let l=30+(Math.round(n/255)<<2|Math.round(r/255)<<1|Math.round(o/255));return 2===s&&(l+=60),l},i.hsv.ansi16=function(t){return i.rgb.ansi16(i.hsv.rgb(t),t[2])},i.rgb.ansi256=function(t){const e=t[0],o=t[1],r=t[2];return e===o&&o===r?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(o/255*5)+Math.round(r/255*5)},i.ansi16.rgb=function(t){let e=t%10;if(0===e||7===e)return t>50&&(e+=3.5),e=e/10.5*255,[e,e,e];const o=.5*(1+~~(t>50));return[(1&e)*o*255,(e>>1&1)*o*255,(e>>2&1)*o*255]},i.ansi256.rgb=function(t){if(t>=232){const e=10*(t-232)+8;return[e,e,e]}let e;return t-=16,[Math.floor(t/36)/5*255,Math.floor((e=t%36)/6)/5*255,e%6/5*255]},i.rgb.hex=function(t){const e=(((255&Math.round(t[0]))<<16)+((255&Math.round(t[1]))<<8)+(255&Math.round(t[2]))).toString(16).toUpperCase();return"000000".substring(e.length)+e},i.hex.rgb=function(t){const e=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let o=e[0];3===e[0].length&&(o=o.split("").map((t=>t+t)).join(""));const r=parseInt(o,16);return[r>>16&255,r>>8&255,255&r]},i.rgb.hcg=function(t){const e=t[0]/255,o=t[1]/255,r=t[2]/255,n=Math.max(Math.max(e,o),r),i=Math.min(Math.min(e,o),r),s=n-i;let l,a;return l=s<1?i/(1-s):0,a=s<=0?0:n===e?(o-r)/s%6:n===o?2+(r-e)/s:4+(e-o)/s,a/=6,a%=1,[360*a,100*s,100*l]},i.hsl.hcg=function(t){const e=t[1]/100,o=t[2]/100,r=o<.5?2*e*o:2*e*(1-o);let n=0;return r<1&&(n=(o-.5*r)/(1-r)),[t[0],100*r,100*n]},i.hsv.hcg=function(t){const e=t[1]/100,o=t[2]/100,r=e*o;let n=0;return r<1&&(n=(o-r)/(1-r)),[t[0],100*r,100*n]},i.hcg.rgb=function(t){const e=t[0]/360,o=t[1]/100,r=t[2]/100;if(0===o)return[255*r,255*r,255*r];const n=[0,0,0],i=e%1*6,s=i%1,l=1-s;let a=0;switch(Math.floor(i)){case 0:n[0]=1,n[1]=s,n[2]=0;break;case 1:n[0]=l,n[1]=1,n[2]=0;break;case 2:n[0]=0,n[1]=1,n[2]=s;break;case 3:n[0]=0,n[1]=l,n[2]=1;break;case 4:n[0]=s,n[1]=0,n[2]=1;break;default:n[0]=1,n[1]=0,n[2]=l}return a=(1-o)*r,[255*(o*n[0]+a),255*(o*n[1]+a),255*(o*n[2]+a)]},i.hcg.hsv=function(t){const e=t[1]/100,o=e+t[2]/100*(1-e);let r=0;return o>0&&(r=e/o),[t[0],100*r,100*o]},i.hcg.hsl=function(t){const e=t[1]/100,o=t[2]/100*(1-e)+.5*e;let r=0;return o>0&&o<.5?r=e/(2*o):o>=.5&&o<1&&(r=e/(2*(1-o))),[t[0],100*r,100*o]},i.hcg.hwb=function(t){const e=t[1]/100,o=e+t[2]/100*(1-e);return[t[0],100*(o-e),100*(1-o)]},i.hwb.hcg=function(t){const e=t[1]/100,o=1-t[2]/100,r=o-e;let n=0;return r<1&&(n=(o-r)/(1-r)),[t[0],100*r,100*n]},i.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]},i.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]},i.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]},i.gray.hsl=function(t){return[0,0,t[0]]},i.gray.hsv=i.gray.hsl,i.gray.hwb=function(t){return[0,100,t[0]]},i.gray.cmyk=function(t){return[0,0,0,t[0]]},i.gray.lab=function(t){return[t[0],0,0]},i.gray.hex=function(t){const e=255&Math.round(t[0]/100*255),o=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(o.length)+o},i.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]}},734:(t,e,o)=>{const r=o(659),n=o(507),i={};Object.keys(r).forEach((t=>{i[t]={},Object.defineProperty(i[t],"channels",{value:r[t].channels}),Object.defineProperty(i[t],"labels",{value:r[t].labels});const e=n(t);Object.keys(e).forEach((o=>{const r=e[o];i[t][o]=function(t){const e=function(...e){const o=e[0];if(null==o)return o;o.length>1&&(e=o);const r=t(e);if("object"==typeof r)for(let t=r.length,e=0;e<t;e++)r[e]=Math.round(r[e]);return r};return"conversion"in t&&(e.conversion=t.conversion),e}(r),i[t][o].raw=function(t){const e=function(...e){const o=e[0];return null==o?o:(o.length>1&&(e=o),t(e))};return"conversion"in t&&(e.conversion=t.conversion),e}(r)}))})),t.exports=i},507:(t,e,o)=>{const r=o(659);function n(t,e){return function(o){return e(t(o))}}function i(t,e){const o=[e[t].parent,t];let i=r[e[t].parent][t],s=e[t].parent;for(;e[s].parent;)o.unshift(e[s].parent),i=n(r[e[s].parent][s],i),s=e[s].parent;return i.conversion=o,i}t.exports=function(t){const e=function(t){const e=function(){const t={},e=Object.keys(r);for(let o=e.length,r=0;r<o;r++)t[e[r]]={distance:-1,parent:null};return t}(),o=[t];for(e[t].distance=0;o.length;){const t=o.pop(),n=Object.keys(r[t]);for(let r=n.length,i=0;i<r;i++){const r=n[i],s=e[r];-1===s.distance&&(s.distance=e[t].distance+1,s.parent=t,o.unshift(r))}}return e}(t),o={},n=Object.keys(e);for(let t=n.length,r=0;r<t;r++){const t=n[r];null!==e[t].parent&&(o[t]=i(t,e))}return o}},156:t=>{"use strict";t.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}}},e={};function o(r){var n=e[r];if(void 0!==n)return n.exports;var i=e[r]={exports:{}};return t[r](i,i.exports,o),i.exports}o.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},o.d=(t,e)=>{for(var r in e)o.o(e,r)&&!o.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),n=new WeakMap;class i{constructor(t,e,o){if(this._$cssResult$=!0,o!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const o=this.t;if(e&&void 0===t){const e=void 0!==o&&1===o.length;e&&(t=n.get(o)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(o,t))}return t}toString(){return this.cssText}}const s=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,o,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[r+1]),t[0]);return new i(o,t,r)},l=(o,r)=>{if(e)o.adoptedStyleSheets=r.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of r){const r=document.createElement("style"),n=t.litNonce;void 0!==n&&r.setAttribute("nonce",n),r.textContent=e.cssText,o.appendChild(r)}},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new i("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:f}=Object,g=globalThis,m=g.trustedTypes,y=m?m.emptyScript:"",v=g.reactiveElementPolyfillSupport,b=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},x=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;class C extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(t,o,e);void 0!==r&&h(this.prototype,t,r)}}static getPropertyDescriptor(t,e,o){const{get:r,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return r?.call(this)},set(e){const i=r?.call(this);n.call(this,e),this.requestUpdate(t,i,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...p(t),...u(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return l(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EC(t,e){const o=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,o);if(void 0!==r&&!0===o.reflect){const n=(void 0!==o.converter?.toAttribute?o.converter:w).toAttribute(e,o.type);this._$Em=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,e){const o=this.constructor,r=o._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=o.getPropertyOptions(r),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=r,this[r]=n.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,o){if(void 0!==t){if(o??=this.constructor.getPropertyOptions(t),!(o.hasChanged??x)(this[t],e))return;this.P(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,o){this._$AL.has(t)||this._$AL.set(t,e),!0===o.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t)!0!==o.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[b("elementProperties")]=new Map,C[b("finalized")]=new Map,v?.({ReactiveElement:C}),(g.reactiveElementVersions??=[]).push("2.0.4");const M=globalThis,_=M.trustedTypes,E=_?_.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+A,R=`<${k}>`,P=document,L=()=>P.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,B=Array.isArray,H=t=>B(t)||"function"==typeof t?.[Symbol.iterator],z="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,D=/>/g,N=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,I=/"/g,F=/^(?:script|style|textarea|title)$/i,G=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),V=G(1),W=(G(2),G(3),Symbol.for("lit-noChange")),q=Symbol.for("lit-nothing"),X=new WeakMap,Y=P.createTreeWalker(P,129);function K(t,e){if(!B(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Z=(t,e)=>{const o=t.length-1,r=[];let n,i=2===e?"<svg>":3===e?"<math>":"",s=T;for(let e=0;e<o;e++){const o=t[e];let l,a,c=-1,h=0;for(;h<o.length&&(s.lastIndex=h,a=s.exec(o),null!==a);)h=s.lastIndex,s===T?"!--"===a[1]?s=j:void 0!==a[1]?s=D:void 0!==a[2]?(F.test(a[2])&&(n=RegExp("</"+a[2],"g")),s=N):void 0!==a[3]&&(s=N):s===N?">"===a[0]?(s=n??T,c=-1):void 0===a[1]?c=-2:(c=s.lastIndex-a[2].length,l=a[1],s=void 0===a[3]?N:'"'===a[3]?I:U):s===I||s===U?s=N:s===j||s===D?s=T:(s=N,n=void 0);const d=s===N&&t[e+1].startsWith("/>")?" ":"";i+=s===T?o+R:c>=0?(r.push(l),o.slice(0,c)+S+o.slice(c)+A+d):o+A+(-2===c?e:d)}return[K(t,i+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class J{constructor({strings:t,_$litType$:e},o){let r;this.parts=[];let n=0,i=0;const s=t.length-1,l=this.parts,[a,c]=Z(t,e);if(this.el=J.createElement(a,o),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=Y.nextNode())&&l.length<s;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(S)){const e=c[i++],o=r.getAttribute(t).split(A),s=/([.?@])?(.*)/.exec(e);l.push({type:1,index:n,name:s[2],strings:o,ctor:"."===s[1]?rt:"?"===s[1]?nt:"@"===s[1]?it:ot}),r.removeAttribute(t)}else t.startsWith(A)&&(l.push({type:6,index:n}),r.removeAttribute(t));if(F.test(r.tagName)){const t=r.textContent.split(A),e=t.length-1;if(e>0){r.textContent=_?_.emptyScript:"";for(let o=0;o<e;o++)r.append(t[o],L()),Y.nextNode(),l.push({type:2,index:++n});r.append(t[e],L())}}}else if(8===r.nodeType)if(r.data===k)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=r.data.indexOf(A,t+1));)l.push({type:7,index:n}),t+=A.length-1}n++}}static createElement(t,e){const o=P.createElement("template");return o.innerHTML=t,o}}function Q(t,e,o=t,r){if(e===W)return e;let n=void 0!==r?o._$Co?.[r]:o._$Cl;const i=O(e)?void 0:e._$litDirective$;return n?.constructor!==i&&(n?._$AO?.(!1),void 0===i?n=void 0:(n=new i(t),n._$AT(t,o,r)),void 0!==r?(o._$Co??=[])[r]=n:o._$Cl=n),void 0!==n&&(e=Q(t,n._$AS(t,e.values),n,r)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,r=(t?.creationScope??P).importNode(e,!0);Y.currentNode=r;let n=Y.nextNode(),i=0,s=0,l=o[0];for(;void 0!==l;){if(i===l.index){let e;2===l.type?e=new et(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new st(n,this,t)),this._$AV.push(e),l=o[++s]}i!==l?.index&&(n=Y.nextNode(),i++)}return Y.currentNode=P,r}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,r){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),O(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):H(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,r="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=J.createElement(K(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new tt(r,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new J(t)),e}k(t){B(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,r=0;for(const n of t)r===e.length?e.push(o=new et(this.O(L()),this.O(L()),this,this.options)):o=e[r],o._$AI(n),r++;r<e.length&&(this._$AR(o&&o._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class ot{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,r,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=q}_$AI(t,e=this,o,r){const n=this.strings;let i=!1;if(void 0===n)t=Q(this,t,e,0),i=!O(t)||t!==this._$AH&&t!==W,i&&(this._$AH=t);else{const r=t;let s,l;for(t=n[0],s=0;s<n.length-1;s++)l=Q(this,r[o+s],e,s),l===W&&(l=this._$AH[s]),i||=!O(l)||l!==this._$AH[s],l===q?t=q:t!==q&&(t+=(l??"")+n[s+1]),this._$AH[s]=l}i&&!r&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends ot{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class nt extends ot{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends ot{constructor(t,e,o,r,n){super(t,e,o,r,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??q)===W)return;const o=this._$AH,r=t===q&&o!==q||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==q&&(o===q||r);r&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const lt={M:S,P:A,A:k,C:1,L:Z,R:tt,D:H,V:Q,I:et,H:ot,N:nt,U:it,B:rt,F:st},at=M.litHtmlPolyfillSupport;at?.(J,et),(M.litHtmlVersions??=[]).push("3.2.1");class ct extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const r=o?.renderBefore??e;let n=r._$litPart$;if(void 0===n){const t=o?.renderBefore??null;r._$litPart$=n=new et(e.insertBefore(L(),t),t,void 0,o??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ct._$litElement$=!0,ct.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:ct});const ht=globalThis.litElementPolyfillSupport;ht?.({LitElement:ct}),(globalThis.litElementVersions??=[]).push("4.1.1");const dt=t=>(e,o)=>{void 0!==o?o.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)},pt={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:x},ut=(t=pt,e,o)=>{const{kind:r,metadata:n}=o;let i=globalThis.litPropertyMetadata.get(n);if(void 0===i&&globalThis.litPropertyMetadata.set(n,i=new Map),i.set(o.name,t),"accessor"===r){const{name:r}=o;return{set(o){const n=e.get.call(this);e.set.call(this,o),this.requestUpdate(r,n,t)},init(e){return void 0!==e&&this.P(r,void 0,t),e}}}if("setter"===r){const{name:r}=o;return function(o){const n=this[r];e.call(this,o),this.requestUpdate(r,n,t)}}throw Error("Unsupported decorator location: "+r)};function ft(t){return(e,o)=>"object"==typeof o?ut(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,r?{...t,wrapped:!0}:t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function gt(t){return ft({...t,state:!0,attribute:!1})}const mt=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,o),o);function yt(t,e){return(o,r,n)=>{const i=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:e}="object"==typeof r?o:n??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return mt(o,r,{get(){let o=t.call(this);return void 0===o&&(o=i(this),(null!==o||this.hasUpdated)&&e.call(this,o)),o}})}return mt(o,r,{get(){return i(this)}})}}var vt=o(734),bt=o.n(vt);const wt=/^#?([0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)$/,xt=/^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/,$t=/^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/,Ct=/^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;function Mt(t,e,o){return t+(e-t)*o}function _t(t,e,o){return Math.max(e,Math.min(o,t))}var Et;!function(t){t.RGB="rgb",t.HSV="hsv",t.HSL="hsl",t.HSL_FLIP="hsl_flip",t.LCH="lch"}(Et||(Et={}));const St={[Et.RGB]:function(t,e,o){const[r,n,i]=t.getRGB01(),[s,l,a]=e.getRGB01();return new kt({type:At.RGB01,r:Mt(r,s,o),g:Mt(n,l,o),b:Mt(i,a,o)})},[Et.HSV]:function(t,e,o){let r=t.getHSV(),n=e.getHSV();return new kt({type:At.HSV,h:Mt(r[0],n[0],o),s:Mt(r[1],n[1],o),v:Mt(r[2],n[2],o)})},[Et.HSL]:function(t,e,o){const r=t.getHSL(),n=e.getHSL(),i=Math.abs(r[0]-n[0])>180,s=Mt(r[0]+360*Number(i&&r[0]<n[0]),n[0]+360*Number(i&&n[0]<r[0]),o);return new kt({type:At.HSL,h:s,s:Mt(r[1],n[1],o),l:Mt(r[2],n[2],o)})},[Et.HSL_FLIP]:function(t,e,o){const r=t.getHSL(),n=e.getHSL(),i=Math.abs(r[0]-n[0])>180,s=Mt(r[0]+360*Number(!i&&r[0]<n[0]),n[0]+360*Number(!i&&n[0]<r[0]),o);return new kt({type:At.HSL,h:s,s:Mt(r[1],n[1],o),l:Mt(r[2],n[2],o)})},[Et.LCH]:function(t,e,o){let r=t.getLCH(),n=e.getLCH();return new kt({type:At.LCH,l:Mt(r[0],n[0],o),c:Mt(r[1],n[1],o),h:Mt(r[2],n[2],o)})}};var At;!function(t){t.RGB255="rgb255",t.RGB01="rgb01",t.HEX="hex",t.HSV="hsv",t.HSL="hsl",t.LCH="lch"}(At||(At={}));class kt{constructor(t={}){this.a=1,t.type==At.RGB255?(this.conversionInput=[_t(t.r||0,0,255),_t(t.g||0,0,255),_t(t.b||0,0,255)],this.colorConvertFunction=bt().rgb):t.type==At.RGB01?(this.conversionInput=[_t(Math.round(255*(t.r||0)),0,255),_t(Math.round(255*(t.g||0)),0,255),_t(Math.round(255*(t.b||0)),0,255)],this.colorConvertFunction=bt().rgb):t.type==At.HEX?(this.conversionInput=t.hex||"#000000",this.colorConvertFunction=bt().hex):t.type==At.HSV?(this.conversionInput=[t.h||0,t.s||0,t.v||0],this.colorConvertFunction=bt().hsv):t.type==At.HSL?(this.conversionInput=[t.h||0,t.s||0,t.l||0],this.colorConvertFunction=bt().hsl):t.type==At.LCH?(this.conversionInput=[t.l||0,t.c||0,t.h||0],this.colorConvertFunction=bt().lch):(t={type:At.RGB255,...t},this.conversionInput=[0,0,0],this.colorConvertFunction=bt().rgb),this.input=t,Object.freeze(this)}getRGB255(){return this.input.type===At.RGB255?[this.input.r||0,this.input.g||0,this.input.b||0]:this.input.type===At.RGB01?[Math.round(255*(this.input.r||0)),Math.round(255*(this.input.g||0)),Math.round(255*(this.input.b||0))]:this.colorConvertFunction.rgb(this.conversionInput)}getRGB01(){return this.input.type===At.RGB255?[(this.input.r||0)/255,(this.input.g||0)/255,(this.input.b||0)/255]:this.input.type===At.RGB01?[this.input.r||0,this.input.g||0,this.input.b||0]:this.getRGB255().map((t=>t/255))}getHex(){return this.input.type===At.HEX?this.input.hex||"":this.colorConvertFunction.hex(this.conversionInput)}getHSV(t=!0){if(this.input.type===At.HSV){const e=[this.input.h||0,this.input.s||0,this.input.v||0];return t?e:e.map((t=>Math.round(t)))}return t?this.colorConvertFunction.hsv.raw(this.conversionInput):this.colorConvertFunction.hsv(this.conversionInput)}getHSL(t=!0){if(this.input.type===At.HSL){const e=[this.input.h||0,this.input.s||0,this.input.l||0];return t?e:e.map((t=>Math.round(t)))}return t?this.colorConvertFunction.hsl.raw(this.conversionInput):this.colorConvertFunction.hsl(this.conversionInput)}getLCH(t=!0){if(this.input.type===At.LCH){const e=[this.input.l||0,this.input.c||0,this.input.h||0];return t?e:e.map((t=>Math.round(t)))}return t?this.colorConvertFunction.lch.raw(this.conversionInput):this.colorConvertFunction.lch(this.conversionInput)}toCSS(){return`rgba(${this.getRGB255().join(", ")})`}static fromRGB255Array(t){return new kt({type:At.RGB255,r:t[0],g:t[1],b:t[2]})}}kt.lerp=function(t,e,o,r=Et.RGB){return St[r](t,e,o)},kt.parseHex=function(t){const e=wt.exec(t);return e&&2==e.length?new kt({type:At.HEX,hex:e[1]}):null},kt.parseRGB255=function(t){const e=xt.exec(t);return e&&4==e.length?new kt({type:At.RGB255,r:parseInt(e[1]),g:parseInt(e[2]),b:parseInt(e[3])}):null},kt.parseRGB01=function(t){const e=$t.exec(t);return e&&4==e.length?new kt({type:At.RGB01,r:parseFloat(e[1]),g:parseFloat(e[2]),b:parseFloat(e[3])}):null},kt.parseHSV=function(t){const e=Ct.exec(t);if(e&&4==e.length){const t=parseFloat(e[1]),o=parseFloat(e[2]),r=parseFloat(e[3]);if(0<=t&&t<=360&&0<=o&&o<=100&&0<=r&&r<=100)return new kt({type:At.HSV,h:parseFloat(e[1]),s:parseFloat(e[2]),v:parseFloat(e[3])})}return null};class Rt{constructor(t=new kt({type:At.RGB01,r:1,g:0,b:0}),e=new kt({type:At.RGB01,r:1,g:1,b:1})){this.colors=[],this.positions=[],this.addColorStop(0,t),this.addColorStop(1,e)}setColorStop(t,e){let o=this.positions.indexOf(t);-1==o?this.addColorStop(t,e):this.colors[o]=e}addColorStop(t,e){this.colors.push(e),this.positions.push(t)}getColorAt(t,e){if(0===this.colors.length)return new kt({});if(1===this.colors.length)return this.colors[0];let o=0;for(;o<this.positions.length&&t>this.positions[o];)o++;if(0===o)return this.colors[0];if(o===this.positions.length)return this.colors[this.colors.length-1];const r=this.positions[o-1],n=this.positions[o],i=this.colors[o-1],s=this.colors[o],l=(t-r)/(n-r);return kt.lerp(i,s,l,e)}getBackgroundImageStyle(t=Et.RGB){let e="linear-gradient(to right";for(let o=0;o<=100;o++)e+=", "+this.getColorAt(o/100,t).toCSS()+" "+o+"%";return e+=")",e}}const Pt=s`.color-selection {
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
`,Lt=V`<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  crossorigin="anonymous"
/> `;class Ot extends Event{constructor(t){super(Ot.eventName,{bubbles:!0,composed:!0}),this.color=t}}Ot.eventName="set-color";class Bt extends Event{constructor(t){super(Bt.eventName,{bubbles:!0,composed:!0}),this.active=t}}Bt.eventName="set-interpolation-active";var Ht=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s};let zt=class extends ct{constructor(){super(...arguments),this.typeName="",this.type="RGB"}};Ht([ft()],zt.prototype,"typeName",void 0),Ht([ft()],zt.prototype,"type",void 0),zt=Ht([dt("color-interpolation-gradient")],zt);var Tt,jt=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s};!function(t){t.LEFT="left",t.RIGHT="right",t.NONE="none"}(Tt||(Tt={}));let Dt=class extends ct{constructor(){super(...arguments),this.activeColor=Tt.NONE,this.leftColor=new kt({}),this.rightColor=new kt({}),this.colorGradient=new Rt,this.onMouseMoveBound=this.onMouseMove.bind(this),this.onMouseUpBound=this.onMouseUp.bind(this),this.selectedGolorGradientDiv=null}setColor(t){this.dispatchEvent(new Ot(t))}setActiveColor(t){this.dispatchEvent(new Bt(t))}setActiveColorLeft(){this.setActiveColor(this.activeColor==Tt.LEFT?Tt.NONE:Tt.LEFT)}setActiveColorRight(){this.setActiveColor(this.activeColor==Tt.RIGHT?Tt.NONE:Tt.RIGHT)}onMouseMove(t){if(this.selectedGolorGradientDiv instanceof HTMLDivElement){const e=this.selectedGolorGradientDiv.getAttribute("data-mode")||"",o=this.selectedGolorGradientDiv.getBoundingClientRect(),r=(t.clientX-o.left)/o.width,n=this.colorGradient.getColorAt(r,Et[e.toUpperCase()]);this.setActiveColor(Tt.NONE),this.setColor(n)}}onMouseDown(t){this.selectedGolorGradientDiv=t.currentTarget,document.addEventListener("mousemove",this.onMouseMoveBound),document.addEventListener("mouseup",this.onMouseUpBound)}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMoveBound),document.removeEventListener("mouseup",this.onMouseUpBound),this.selectedGolorGradientDiv=null}render(){return this.colorGradient=new Rt(this.leftColor,this.rightColor),V`
      ${Lt}
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
          ${Array.prototype.map.call(this.children,(t=>{if(t instanceof zt){const e=Et[t.type];return V` <tr>
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
  aspect-ratio: 16 / 9;
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
}`;var Gt=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s};let Vt=class extends ct{constructor(){super(...arguments),this.hue=0}render(){const t="#"+new kt({type:At.HSV,h:this.hue,s:100,v:100}).getHex(),e=this.hue/360*100+"%";return V`
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
    `}};Vt.styles=[Ft],Gt([ft({type:Number})],Vt.prototype,"hue",void 0),Vt=Gt([dt("color-selection-type-a-bar-pointer")],Vt);var Wt=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s};let qt=class extends ct{constructor(){super(...arguments),this.color=new kt,this.onMouseMoveBound=this.onMouseMove.bind(this),this.onMouseUpBound=this.onMouseUp.bind(this)}setColor(t){this.dispatchEvent(new Ot(t))}onMouseMove(t){const[,e,o]=this.color.getHSV();if(1==t.buttons){const r=this.colorBar.getBoundingClientRect(),n=360*_t((t.clientX-r.left)/r.width,0,1);this.setColor(new kt({type:At.HSV,h:n,s:e,v:o}))}}onMouseDown(){document.addEventListener("mousemove",this.onMouseMoveBound),document.addEventListener("mouseup",this.onMouseUpBound)}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMoveBound),document.removeEventListener("mouseup",this.onMouseUpBound)}render(){const[t]=this.color.getHSV();return V`
      ${Lt}
      <div class="color-bar" @mousedown=${this.onMouseDown} id="color-bar">
        <color-selection-type-a-bar-pointer
          hue=${t}
        ></color-selection-type-a-bar-pointer>
      </div>
    `}};qt.styles=[It],Wt([ft({attribute:!1})],qt.prototype,"color",void 0),Wt([yt("#color-bar")],qt.prototype,"colorBar",void 0),qt=Wt([dt("color-selection-type-a-bar")],qt);var Xt=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s};let Yt=class extends ct{constructor(){super(...arguments),this.color=new kt,this.onMouseMoveBound=this.onMouseMove.bind(this),this.onMouseUpBound=this.onMouseUp.bind(this)}setColor(t){this.dispatchEvent(new Ot(t))}onMouseMove(t){const[e]=this.color.getHSV();if(1==t.buttons){const o=this.colorGradContainer.getBoundingClientRect(),r=100*_t((t.clientX-o.left)/o.width,0,1),n=100*(1-_t((t.clientY-o.top)/o.height,0,1));this.setColor(new kt({type:At.HSV,h:e,s:r,v:n}))}}onMouseDown(){document.addEventListener("mousemove",this.onMouseMoveBound),document.addEventListener("mouseup",this.onMouseUpBound)}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMoveBound),document.removeEventListener("mouseup",this.onMouseUpBound)}render(){const[t,e,o]=this.color.getHSV(),r=`linear-gradient(to right, #FFF 0%, ${"#"+new kt({type:At.HSV,h:t,s:100,v:100}).getHex()} 100%)`,n=`\n      top: calc(${100*(1-o/100)}% - 0.5rem);\n      left: calc(${e/100*100}% - 0.5rem);\n      background-color: #${this.color.getHex()};\n      border-color: ${o<50?"white":"black"};\n    `;return V`
      ${Lt}
      <div class="color-grad-container" id="color-grad-container">
        <div
          class="color-grad color-grad-1"
          style="background: ${r};"
        ></div>
        <div
          class="color-grad color-grad-2"
          @mousedown=${this.onMouseDown.bind(this)}
        ></div>
        <div class="color-grad-circle" style=${n}></div>
      </div>
    `}};Yt.styles=[It,s`
      :host {
        flex: 1;
      }
    `],Xt([ft({attribute:!1})],Yt.prototype,"color",void 0),Xt([yt("#color-grad-container")],Yt.prototype,"colorGradContainer",void 0),Yt=Xt([dt("color-selection-type-a-grad")],Yt);var Kt=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s};let Zt=class extends ct{constructor(){super(...arguments),this.color=new kt}render(){return V`
      ${Lt}
      <color-selection-type-a-grad
        .color=${this.color}
      ></color-selection-type-a-grad>
      <color-selection-type-a-bar
        .color=${this.color}
      ></color-selection-type-a-bar>
    `}};Zt.styles=[It],Kt([ft({attribute:!1})],Zt.prototype,"color",void 0),Zt=Kt([dt("color-selection-type-a")],Zt);var Jt=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s};let Qt=class extends ct{constructor(){super(...arguments),this.color=new kt,this.onMouseMoveBound=this.onMouseMove.bind(this),this.onMouseUpBound=this.onMouseUp.bind(this)}setColor(t){this.dispatchEvent(new Ot(t))}onMouseMove(t){const e=this.colorGrad.getBoundingClientRect(),o=t.clientX-e.left-e.width/2,r=t.clientY-e.top-e.height/2,n=Math.sqrt(o*o+r*r)/(e.width/2),i=Math.min(n,1),s=(Math.atan2(r,o)*(180/Math.PI)+90+360)%360;this.setColor(new kt({type:At.HSL,h:s,s:100*i,l:50}))}onMouseDown(){document.addEventListener("mousemove",this.onMouseMoveBound),document.addEventListener("mouseup",this.onMouseUpBound)}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMoveBound),document.removeEventListener("mouseup",this.onMouseUpBound)}render(){const[t,e]=this.color.getHSL(),o=.5*e/100,r=3*Math.PI/2+t*(Math.PI/180),n=Math.cos(r)*o,i=`\n            top: ${50+Math.sin(r)*o*100}%;\n            left: ${50+100*n}%;\n            background-color: #${this.color.getHex()};\n        `;return V`
      ${Lt}
      <div
        class="color-grad"
        id="color-grad"
        style=${"\n            background-image: radial-gradient(\n            circle at center,\n            hsl(0, 0%, 50%, 1) 0%,\n            hsl(0, 100%, 0%, 0) 70%\n          ),\n          conic-gradient(\n            hsl(0, 100%, 50%),\n            /* Red */ hsl(60, 100%, 50%),\n            /* Yellow */ hsl(120, 100%, 50%),\n            /* Lime */ hsl(180, 100%, 50%),\n            /* Cyan */ hsl(240, 100%, 50%),\n            /* Blue */ hsl(300, 100%, 50%),\n            /* Magenta */ hsl(360, 100%, 50%) /* Red (completes circle) */\n          );"}
        @mousedown=${this.onMouseDown}
      >
        <div class="color-grad-circle" style=${i}></div>
      </div>
    `}};Qt.styles=[s`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        aspect-ratio: 1;
      }

      .color-grad {
        aspect-ratio: 1;
        flex: 1;
        max-width: 100%;
        border-radius: 100%;
        position: relative;
      }

      .color-grad-circle {
        position: absolute;
        border-width: 0.1rem;
        border-style: solid;
        border-radius: 50%;
        width: 1rem;
        height: 1rem;
        transform: translate(-50%, -50%);
        pointer-events: none;
        border-color: white;
      }
    `],Jt([ft({attribute:!1})],Qt.prototype,"color",void 0),Jt([yt("#color-grad")],Qt.prototype,"colorGrad",void 0),Qt=Jt([dt("color-selection-type-b-wheel")],Qt);var te=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s};let ee=class extends ct{constructor(){super(...arguments),this.color=new kt}render(){const[,,t]=this.color.getHSL(),e="#"+this.color.getHex();return V`
      <div class="color-bar-pointer" style="left: ${`${t}%`};">
        <div class="color-bar-pointer-2"></div>
        <div
          class="color-bar-pointer-3"
          style="border-bottom-color: ${e};"
        ></div>
        <div
          class="color-bar-pointer-4"
          style="border-color: ${e};"
        ></div>
      </div>
    `}};ee.styles=[Ft],te([ft({attribute:!1})],ee.prototype,"color",void 0),ee=te([dt("color-selection-type-b-bar-pointer")],ee);var oe=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s};let re=class extends ct{constructor(){super(...arguments),this.color=new kt,this.onMouseMoveBound=this.onMouseMove.bind(this),this.onMouseUpBound=this.onMouseUp.bind(this)}setColor(t){this.dispatchEvent(new Ot(t))}onMouseMove(t){const[e,o]=this.color.getHSL(),r=this.colorBar.getBoundingClientRect(),n=100*_t((t.clientX-r.left)/r.width,0,1);this.setColor(new kt({type:At.HSL,h:e,s:o,l:n}))}onMouseDown(){document.addEventListener("mousemove",this.onMouseMoveBound),document.addEventListener("mouseup",this.onMouseUpBound)}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMoveBound),document.removeEventListener("mouseup",this.onMouseUpBound)}render(){const[t,e]=this.color.getHSL(),o=["background: linear-gradient(","to right,"];for(let r=0;r<=100;r++){const n=r;o.push(`hsl(${t}deg, ${e}%, ${n}%) ${r}%`+(r<100?",":""))}o.push(");");const r=o.join("\n");return V`
      ${Lt}
      <div
        class="color-bar"
        @mousedown=${this.onMouseDown}
        id="color-bar"
        style=${r}
      >
        <color-selection-type-b-bar-pointer
          .color=${this.color}
        ></color-selection-type-b-bar-pointer>
      </div>
    `}};re.styles=s`
    .color-bar {
      width: 100%;
      height: 1.5rem;
      margin-top: 0.5rem;
      border-radius: 0.25rem;
    }
  `,oe([ft({attribute:!1})],re.prototype,"color",void 0),oe([yt("#color-bar")],re.prototype,"colorBar",void 0),re=oe([dt("color-selection-type-b-bar")],re);var ne=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s};let ie=class extends ct{constructor(){super(...arguments),this.color=new kt}render(){return V`
      ${Lt}
      <color-selection-type-b-wheel
        .color=${this.color}
      ></color-selection-type-b-wheel>
      <color-selection-type-b-bar
        .color=${this.color}
      ></color-selection-type-b-bar>
    `}};ie.styles=[s`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 20rem;
        margin: 0 auto;
      }
    `],ne([ft({attribute:!1})],ie.prototype,"color",void 0),ie=ne([dt("color-selection-type-b")],ie);var se,le=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s};!function(t){t.HSV="HSV",t.HSL_WHEEL="HSL_WHEEL"}(se||(se={}));let ae=class extends ct{constructor(){super(...arguments),this.color=new kt,this.colorSelectionType=se.HSV}getColorSelectionHtml(){return this.colorSelectionType===se.HSV?V`<color-selection-type-a .color=${this.color}></color-selection-type-a>`:V`<color-selection-type-b .color=${this.color}></color-selection-type-b>`}render(){return V`
      ${Lt}
      <h5>Color Selection</h5>
      <div class="btn-group color-selection-picker" role="group" aria-label="Color Selection">
        <input
          type="radio"
          class="btn-check"
          name="options"
          id="option1"
          autocomplete="off"
        />
        <label class="btn btn-secondary" for="option1" @click=${()=>{this.colorSelectionType=se.HSV}}>HSV</label>
        <input
          type="radio"
          class="btn-check"
          name="options"
          id="option2"
          autocomplete="off"
        />
        <label class="btn btn-secondary" for="option2" @click=${()=>{this.colorSelectionType=se.HSL_WHEEL}}>HSL Wheel</label>
      </div>
      ${this.getColorSelectionHtml()}
    `}};ae.styles=s`
    :host {
      display: flex;
      justify-content: center;
    }

    :host > h5 {
      flex: 0;
    }

    :host > .color-selection-picker {
      flex: 0;
      margin: 0.5rem 0rem;
    }

    :host > * {
      flex: 1;
    }
  `,le([ft({attribute:!1})],ae.prototype,"color",void 0),le([ft({attribute:!1})],ae.prototype,"colorSelectionType",void 0),ae=le([dt("color-selection")],ae);const ce=s`.inputs-container {
  gap: 0.25rem;
}

table > * {
  --bs-table-bg: transparent;
}
`;var he=s`
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
`,de=s`
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
`;const pe=new Set,ue=new Map;let fe,ge="ltr",me="en";const ye="undefined"!=typeof MutationObserver&&"undefined"!=typeof document&&void 0!==document.documentElement;if(ye){const t=new MutationObserver(be);ge=document.documentElement.dir||"ltr",me=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function ve(...t){t.map((t=>{const e=t.$code.toLowerCase();ue.has(e)?ue.set(e,Object.assign(Object.assign({},ue.get(e)),t)):ue.set(e,t),fe||(fe=t)})),be()}function be(){ye&&(ge=document.documentElement.dir||"ltr",me=document.documentElement.lang||navigator.language),[...pe.keys()].map((t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()}))}class we{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){pe.add(this.host)}hostDisconnected(){pe.delete(this.host)}dir(){return`${this.host.dir||ge}`.toLowerCase()}lang(){return`${this.host.lang||me}`.toLowerCase()}getTranslationData(t){var e,o;const r=new Intl.Locale(t.replace(/_/g,"-")),n=null==r?void 0:r.language.toLowerCase(),i=null!==(o=null===(e=null==r?void 0:r.region)||void 0===e?void 0:e.toLowerCase())&&void 0!==o?o:"";return{locale:r,language:n,region:i,primary:ue.get(`${n}-${i}`),secondary:ue.get(n)}}exists(t,e){var o;const{primary:r,secondary:n}=this.getTranslationData(null!==(o=e.lang)&&void 0!==o?o:this.lang());return e=Object.assign({includeFallback:!1},e),!!(r&&r[t]||n&&n[t]||e.includeFallback&&fe&&fe[t])}term(t,...e){const{primary:o,secondary:r}=this.getTranslationData(this.lang());let n;if(o&&o[t])n=o[t];else if(r&&r[t])n=r[t];else{if(!fe||!fe[t])return console.error(`No translation found for: ${String(t)}`),String(t);n=fe[t]}return"function"==typeof n?n(...e):n}date(t,e){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),e).format(t)}number(t,e){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),e).format(t)}relativeTime(t,e,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(t,e)}}var xe={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};ve(xe);var $e=xe,Ce=class extends we{};ve($e);var Me,_e=s`
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
`,Ee=Object.defineProperty,Se=Object.defineProperties,Ae=Object.getOwnPropertyDescriptor,ke=Object.getOwnPropertyDescriptors,Re=Object.getOwnPropertySymbols,Pe=Object.prototype.hasOwnProperty,Le=Object.prototype.propertyIsEnumerable,Oe=t=>{throw TypeError(t)},Be=(t,e,o)=>e in t?Ee(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,He=(t,e)=>{for(var o in e||(e={}))Pe.call(e,o)&&Be(t,o,e[o]);if(Re)for(var o of Re(e))Le.call(e,o)&&Be(t,o,e[o]);return t},ze=(t,e)=>Se(t,ke(e)),Te=(t,e,o,r)=>{for(var n,i=r>1?void 0:r?Ae(e,o):e,s=t.length-1;s>=0;s--)(n=t[s])&&(i=(r?n(e,o,i):n(i))||i);return r&&i&&Ee(e,o,i),i},je=(t,e,o)=>e.has(t)||Oe("Cannot "+o),De=class extends ct{constructor(){var t,e;super(),t=this,(e=Me).has(t)?Oe("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,false),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach((([t,e])=>{this.constructor.define(t,e)}))}emit(t,e){const o=new CustomEvent(t,He({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(o),o}static define(t,e=this,o={}){const r=customElements.get(t);if(!r){try{customElements.define(t,e,o)}catch(r){customElements.define(t,class extends e{},o)}return}let n=" (unknown version)",i=n;"version"in e&&e.version&&(n=" v"+e.version),"version"in r&&r.version&&(i=" v"+r.version),n&&i&&n===i||console.warn(`Attempted to register <${t}>${n}, but <${t}>${i} has already been registered.`)}attributeChangedCallback(t,e,o){var r;je(this,r=Me,"read from private field"),r.get(this)||(this.constructor.elementProperties.forEach(((t,e)=>{t.reflect&&null!=this[e]&&this.initialReflectedProperties.set(e,this[e])})),((t,e,o)=>{je(t,e,"write to private field"),e.set(t,o)})(this,Me,!0)),super.attributeChangedCallback(t,e,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach(((e,o)=>{t.has(o)&&null==this[o]&&(this[o]=e)}))}};Me=new WeakMap,De.version="2.19.1",De.dependencies={},Te([ft()],De.prototype,"dir",2),Te([ft()],De.prototype,"lang",2);const Ne=Math.min,Ue=Math.max,Ie=Math.round,Fe=Math.floor,Ge=t=>({x:t,y:t}),Ve={left:"right",right:"left",bottom:"top",top:"bottom"},We={start:"end",end:"start"};function qe(t,e,o){return Ue(t,Ne(e,o))}function Xe(t,e){return"function"==typeof t?t(e):t}function Ye(t){return t.split("-")[0]}function Ke(t){return t.split("-")[1]}function Ze(t){return"x"===t?"y":"x"}function Je(t){return"y"===t?"height":"width"}function Qe(t){return["top","bottom"].includes(Ye(t))?"y":"x"}function to(t){return Ze(Qe(t))}function eo(t){return t.replace(/start|end/g,(t=>We[t]))}function oo(t){return t.replace(/left|right|bottom|top/g,(t=>Ve[t]))}function ro(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function no(t){const{x:e,y:o,width:r,height:n}=t;return{width:r,height:n,top:o,left:e,right:e+r,bottom:o+n,x:e,y:o}}function io(t,e,o){let{reference:r,floating:n}=t;const i=Qe(e),s=to(e),l=Je(s),a=Ye(e),c="y"===i,h=r.x+r.width/2-n.width/2,d=r.y+r.height/2-n.height/2,p=r[l]/2-n[l]/2;let u;switch(a){case"top":u={x:h,y:r.y-n.height};break;case"bottom":u={x:h,y:r.y+r.height};break;case"right":u={x:r.x+r.width,y:d};break;case"left":u={x:r.x-n.width,y:d};break;default:u={x:r.x,y:r.y}}switch(Ke(e)){case"start":u[s]-=p*(o&&c?-1:1);break;case"end":u[s]+=p*(o&&c?-1:1)}return u}async function so(t,e){var o;void 0===e&&(e={});const{x:r,y:n,platform:i,rects:s,elements:l,strategy:a}=t,{boundary:c="clippingAncestors",rootBoundary:h="viewport",elementContext:d="floating",altBoundary:p=!1,padding:u=0}=Xe(e,t),f=ro(u),g=l[p?"floating"===d?"reference":"floating":d],m=no(await i.getClippingRect({element:null==(o=await(null==i.isElement?void 0:i.isElement(g)))||o?g:g.contextElement||await(null==i.getDocumentElement?void 0:i.getDocumentElement(l.floating)),boundary:c,rootBoundary:h,strategy:a})),y="floating"===d?{x:r,y:n,width:s.floating.width,height:s.floating.height}:s.reference,v=await(null==i.getOffsetParent?void 0:i.getOffsetParent(l.floating)),b=await(null==i.isElement?void 0:i.isElement(v))&&await(null==i.getScale?void 0:i.getScale(v))||{x:1,y:1},w=no(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:y,offsetParent:v,strategy:a}):y);return{top:(m.top-w.top+f.top)/b.y,bottom:(w.bottom-m.bottom+f.bottom)/b.y,left:(m.left-w.left+f.left)/b.x,right:(w.right-m.right+f.right)/b.x}}function lo(){return"undefined"!=typeof window}function ao(t){return po(t)?(t.nodeName||"").toLowerCase():"#document"}function co(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function ho(t){var e;return null==(e=(po(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function po(t){return!!lo()&&(t instanceof Node||t instanceof co(t).Node)}function uo(t){return!!lo()&&(t instanceof Element||t instanceof co(t).Element)}function fo(t){return!!lo()&&(t instanceof HTMLElement||t instanceof co(t).HTMLElement)}function go(t){return!(!lo()||"undefined"==typeof ShadowRoot)&&(t instanceof ShadowRoot||t instanceof co(t).ShadowRoot)}function mo(t){const{overflow:e,overflowX:o,overflowY:r,display:n}=$o(t);return/auto|scroll|overlay|hidden|clip/.test(e+r+o)&&!["inline","contents"].includes(n)}function yo(t){return["table","td","th"].includes(ao(t))}function vo(t){return[":popover-open",":modal"].some((e=>{try{return t.matches(e)}catch(t){return!1}}))}function bo(t){const e=wo(),o=uo(t)?$o(t):t;return["transform","translate","scale","rotate","perspective"].some((t=>!!o[t]&&"none"!==o[t]))||!!o.containerType&&"normal"!==o.containerType||!e&&!!o.backdropFilter&&"none"!==o.backdropFilter||!e&&!!o.filter&&"none"!==o.filter||["transform","translate","scale","rotate","perspective","filter"].some((t=>(o.willChange||"").includes(t)))||["paint","layout","strict","content"].some((t=>(o.contain||"").includes(t)))}function wo(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function xo(t){return["html","body","#document"].includes(ao(t))}function $o(t){return co(t).getComputedStyle(t)}function Co(t){return uo(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function Mo(t){if("html"===ao(t))return t;const e=t.assignedSlot||t.parentNode||go(t)&&t.host||ho(t);return go(e)?e.host:e}function _o(t){const e=Mo(t);return xo(e)?t.ownerDocument?t.ownerDocument.body:t.body:fo(e)&&mo(e)?e:_o(e)}function Eo(t,e,o){var r;void 0===e&&(e=[]),void 0===o&&(o=!0);const n=_o(t),i=n===(null==(r=t.ownerDocument)?void 0:r.body),s=co(n);if(i){const t=So(s);return e.concat(s,s.visualViewport||[],mo(n)?n:[],t&&o?Eo(t):[])}return e.concat(n,Eo(n,[],o))}function So(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Ao(t){const e=$o(t);let o=parseFloat(e.width)||0,r=parseFloat(e.height)||0;const n=fo(t),i=n?t.offsetWidth:o,s=n?t.offsetHeight:r,l=Ie(o)!==i||Ie(r)!==s;return l&&(o=i,r=s),{width:o,height:r,$:l}}function ko(t){return uo(t)?t:t.contextElement}function Ro(t){const e=ko(t);if(!fo(e))return Ge(1);const o=e.getBoundingClientRect(),{width:r,height:n,$:i}=Ao(e);let s=(i?Ie(o.width):o.width)/r,l=(i?Ie(o.height):o.height)/n;return s&&Number.isFinite(s)||(s=1),l&&Number.isFinite(l)||(l=1),{x:s,y:l}}const Po=Ge(0);function Lo(t){const e=co(t);return wo()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:Po}function Oo(t,e,o,r){void 0===e&&(e=!1),void 0===o&&(o=!1);const n=t.getBoundingClientRect(),i=ko(t);let s=Ge(1);e&&(r?uo(r)&&(s=Ro(r)):s=Ro(t));const l=function(t,e,o){return void 0===e&&(e=!1),!(!o||e&&o!==co(t))&&e}(i,o,r)?Lo(i):Ge(0);let a=(n.left+l.x)/s.x,c=(n.top+l.y)/s.y,h=n.width/s.x,d=n.height/s.y;if(i){const t=co(i),e=r&&uo(r)?co(r):r;let o=t,n=So(o);for(;n&&r&&e!==o;){const t=Ro(n),e=n.getBoundingClientRect(),r=$o(n),i=e.left+(n.clientLeft+parseFloat(r.paddingLeft))*t.x,s=e.top+(n.clientTop+parseFloat(r.paddingTop))*t.y;a*=t.x,c*=t.y,h*=t.x,d*=t.y,a+=i,c+=s,o=co(n),n=So(o)}}return no({width:h,height:d,x:a,y:c})}function Bo(t,e){const o=Co(t).scrollLeft;return e?e.left+o:Oo(ho(t)).left+o}function Ho(t,e,o){void 0===o&&(o=!1);const r=t.getBoundingClientRect();return{x:r.left+e.scrollLeft-(o?0:Bo(t,r)),y:r.top+e.scrollTop}}function zo(t,e,o){let r;if("viewport"===e)r=function(t,e){const o=co(t),r=ho(t),n=o.visualViewport;let i=r.clientWidth,s=r.clientHeight,l=0,a=0;if(n){i=n.width,s=n.height;const t=wo();(!t||t&&"fixed"===e)&&(l=n.offsetLeft,a=n.offsetTop)}return{width:i,height:s,x:l,y:a}}(t,o);else if("document"===e)r=function(t){const e=ho(t),o=Co(t),r=t.ownerDocument.body,n=Ue(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),i=Ue(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight);let s=-o.scrollLeft+Bo(t);const l=-o.scrollTop;return"rtl"===$o(r).direction&&(s+=Ue(e.clientWidth,r.clientWidth)-n),{width:n,height:i,x:s,y:l}}(ho(t));else if(uo(e))r=function(t,e){const o=Oo(t,!0,"fixed"===e),r=o.top+t.clientTop,n=o.left+t.clientLeft,i=fo(t)?Ro(t):Ge(1);return{width:t.clientWidth*i.x,height:t.clientHeight*i.y,x:n*i.x,y:r*i.y}}(e,o);else{const o=Lo(t);r={x:e.x-o.x,y:e.y-o.y,width:e.width,height:e.height}}return no(r)}function To(t,e){const o=Mo(t);return!(o===e||!uo(o)||xo(o))&&("fixed"===$o(o).position||To(o,e))}function jo(t,e,o){const r=fo(e),n=ho(e),i="fixed"===o,s=Oo(t,!0,i,e);let l={scrollLeft:0,scrollTop:0};const a=Ge(0);if(r||!r&&!i)if(("body"!==ao(e)||mo(n))&&(l=Co(e)),r){const t=Oo(e,!0,i,e);a.x=t.x+e.clientLeft,a.y=t.y+e.clientTop}else n&&(a.x=Bo(n));const c=!n||r||i?Ge(0):Ho(n,l);return{x:s.left+l.scrollLeft-a.x-c.x,y:s.top+l.scrollTop-a.y-c.y,width:s.width,height:s.height}}function Do(t){return"static"===$o(t).position}function No(t,e){if(!fo(t)||"fixed"===$o(t).position)return null;if(e)return e(t);let o=t.offsetParent;return ho(t)===o&&(o=o.ownerDocument.body),o}function Uo(t,e){const o=co(t);if(vo(t))return o;if(!fo(t)){let e=Mo(t);for(;e&&!xo(e);){if(uo(e)&&!Do(e))return e;e=Mo(e)}return o}let r=No(t,e);for(;r&&yo(r)&&Do(r);)r=No(r,e);return r&&xo(r)&&Do(r)&&!bo(r)?o:r||function(t){let e=Mo(t);for(;fo(e)&&!xo(e);){if(bo(e))return e;if(vo(e))return null;e=Mo(e)}return null}(t)||o}const Io={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:e,rect:o,offsetParent:r,strategy:n}=t;const i="fixed"===n,s=ho(r),l=!!e&&vo(e.floating);if(r===s||l&&i)return o;let a={scrollLeft:0,scrollTop:0},c=Ge(1);const h=Ge(0),d=fo(r);if((d||!d&&!i)&&(("body"!==ao(r)||mo(s))&&(a=Co(r)),fo(r))){const t=Oo(r);c=Ro(r),h.x=t.x+r.clientLeft,h.y=t.y+r.clientTop}const p=!s||d||i?Ge(0):Ho(s,a,!0);return{width:o.width*c.x,height:o.height*c.y,x:o.x*c.x-a.scrollLeft*c.x+h.x+p.x,y:o.y*c.y-a.scrollTop*c.y+h.y+p.y}},getDocumentElement:ho,getClippingRect:function(t){let{element:e,boundary:o,rootBoundary:r,strategy:n}=t;const i=[..."clippingAncestors"===o?vo(e)?[]:function(t,e){const o=e.get(t);if(o)return o;let r=Eo(t,[],!1).filter((t=>uo(t)&&"body"!==ao(t))),n=null;const i="fixed"===$o(t).position;let s=i?Mo(t):t;for(;uo(s)&&!xo(s);){const e=$o(s),o=bo(s);o||"fixed"!==e.position||(n=null),(i?!o&&!n:!o&&"static"===e.position&&n&&["absolute","fixed"].includes(n.position)||mo(s)&&!o&&To(t,s))?r=r.filter((t=>t!==s)):n=e,s=Mo(s)}return e.set(t,r),r}(e,this._c):[].concat(o),r],s=i[0],l=i.reduce(((t,o)=>{const r=zo(e,o,n);return t.top=Ue(r.top,t.top),t.right=Ne(r.right,t.right),t.bottom=Ne(r.bottom,t.bottom),t.left=Ue(r.left,t.left),t}),zo(e,s,n));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}},getOffsetParent:Uo,getElementRects:async function(t){const e=this.getOffsetParent||Uo,o=this.getDimensions,r=await o(t.floating);return{reference:jo(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}},getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){const{width:e,height:o}=Ao(t);return{width:e,height:o}},getScale:Ro,isElement:uo,isRTL:function(t){return"rtl"===$o(t).direction}};function Fo(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}const Go=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(e){var o,r;const{placement:n,rects:i,platform:s,elements:l}=e,{apply:a=()=>{},...c}=Xe(t,e),h=await so(e,c),d=Ye(n),p=Ke(n),u="y"===Qe(n),{width:f,height:g}=i.floating;let m,y;"top"===d||"bottom"===d?(m=d,y=p===(await(null==s.isRTL?void 0:s.isRTL(l.floating))?"start":"end")?"left":"right"):(y=d,m="end"===p?"top":"bottom");const v=g-h.top-h.bottom,b=f-h.left-h.right,w=Ne(g-h[m],v),x=Ne(f-h[y],b),$=!e.middlewareData.shift;let C=w,M=x;if(null!=(o=e.middlewareData.shift)&&o.enabled.x&&(M=b),null!=(r=e.middlewareData.shift)&&r.enabled.y&&(C=v),$&&!p){const t=Ue(h.left,0),e=Ue(h.right,0),o=Ue(h.top,0),r=Ue(h.bottom,0);u?M=f-2*(0!==t||0!==e?t+e:Ue(h.left,h.right)):C=g-2*(0!==o||0!==r?o+r:Ue(h.top,h.bottom))}await a({...e,availableWidth:M,availableHeight:C});const _=await s.getDimensions(l.floating);return f!==_.width||g!==_.height?{reset:{rects:!0}}:{}}}},Vo=t=>(...e)=>({_$litDirective$:t,values:e});class Wo{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const qo=Vo(class extends Wo{constructor(t){if(super(t),1!==t.type||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const o=t.element.classList;for(const t of this.st)t in e||(o.remove(t),this.st.delete(t));for(const t in e){const r=!!e[t];r===this.st.has(t)||this.nt?.has(t)||(r?(o.add(t),this.st.add(t)):(o.remove(t),this.st.delete(t)))}return W}});function Xo(t){return function(t){for(let e=t;e;e=Yo(e))if(e instanceof Element&&"none"===getComputedStyle(e).display)return null;for(let e=Yo(t);e;e=Yo(e)){if(!(e instanceof Element))continue;const t=getComputedStyle(e);if("contents"!==t.display){if("static"!==t.position||bo(t))return e;if("BODY"===e.tagName)return e}}return null}(t)}function Yo(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}var Ko=class extends De{constructor(){super(...arguments),this.localize=new Ce(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect();let o=0,r=0,n=0,i=0,s=0,l=0,a=0,c=0;this.placement.includes("top")||this.placement.includes("bottom")?t.top<e.top?(o=t.left,r=t.bottom,n=t.right,i=t.bottom,s=e.left,l=e.top,a=e.right,c=e.top):(o=e.left,r=e.bottom,n=e.right,i=e.bottom,s=t.left,l=t.top,a=t.right,c=t.top):t.left<e.left?(o=t.right,r=t.top,n=e.left,i=e.top,s=t.right,l=t.bottom,a=e.left,c=e.bottom):(o=e.right,r=e.top,n=t.left,i=t.top,s=e.right,l=e.bottom,a=t.left,c=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${r}px`),this.style.setProperty("--hover-bridge-top-right-x",`${n}px`),this.style.setProperty("--hover-bridge-top-right-y",`${i}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${c}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||function(t){return null!==t&&"object"==typeof t&&"getBoundingClientRect"in t&&(!("contextElement"in t)||t instanceof Element)}(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){this.anchorEl&&this.active&&(this.cleanup=function(t,e,o,r){void 0===r&&(r={});const{ancestorScroll:n=!0,ancestorResize:i=!0,elementResize:s="function"==typeof ResizeObserver,layoutShift:l="function"==typeof IntersectionObserver,animationFrame:a=!1}=r,c=ko(t),h=n||i?[...c?Eo(c):[],...Eo(e)]:[];h.forEach((t=>{n&&t.addEventListener("scroll",o,{passive:!0}),i&&t.addEventListener("resize",o)}));const d=c&&l?function(t,e){let o,r=null;const n=ho(t);function i(){var t;clearTimeout(o),null==(t=r)||t.disconnect(),r=null}return function s(l,a){void 0===l&&(l=!1),void 0===a&&(a=1),i();const c=t.getBoundingClientRect(),{left:h,top:d,width:p,height:u}=c;if(l||e(),!p||!u)return;const f={rootMargin:-Fe(d)+"px "+-Fe(n.clientWidth-(h+p))+"px "+-Fe(n.clientHeight-(d+u))+"px "+-Fe(h)+"px",threshold:Ue(0,Ne(1,a))||1};let g=!0;function m(e){const r=e[0].intersectionRatio;if(r!==a){if(!g)return s();r?s(!1,r):o=setTimeout((()=>{s(!1,1e-7)}),1e3)}1!==r||Fo(c,t.getBoundingClientRect())||s(),g=!1}try{r=new IntersectionObserver(m,{...f,root:n.ownerDocument})}catch(t){r=new IntersectionObserver(m,f)}r.observe(t)}(!0),i}(c,o):null;let p,u=-1,f=null;s&&(f=new ResizeObserver((t=>{let[r]=t;r&&r.target===c&&f&&(f.unobserve(e),cancelAnimationFrame(u),u=requestAnimationFrame((()=>{var t;null==(t=f)||t.observe(e)}))),o()})),c&&!a&&f.observe(c),f.observe(e));let g=a?Oo(t):null;return a&&function e(){const r=Oo(t);g&&!Fo(g,r)&&o(),g=r,p=requestAnimationFrame(e)}(),o(),()=>{var t;h.forEach((t=>{n&&t.removeEventListener("scroll",o),i&&t.removeEventListener("resize",o)})),null==d||d(),null==(t=f)||t.disconnect(),f=null,a&&cancelAnimationFrame(p)}}(this.anchorEl,this.popup,(()=>{this.reposition()})))}async stop(){return new Promise((t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame((()=>t()))):t()}))}reposition(){if(!this.active||!this.anchorEl)return;const t=[(e={mainAxis:this.distance,crossAxis:this.skidding},void 0===e&&(e=0),{name:"offset",options:e,async fn(t){var o,r;const{x:n,y:i,placement:s,middlewareData:l}=t,a=await async function(t,e){const{placement:o,platform:r,elements:n}=t,i=await(null==r.isRTL?void 0:r.isRTL(n.floating)),s=Ye(o),l=Ke(o),a="y"===Qe(o),c=["left","top"].includes(s)?-1:1,h=i&&a?-1:1,d=Xe(e,t);let{mainAxis:p,crossAxis:u,alignmentAxis:f}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return l&&"number"==typeof f&&(u="end"===l?-1*f:f),a?{x:u*h,y:p*c}:{x:p*c,y:u*h}}(t,e);return s===(null==(o=l.offset)?void 0:o.placement)&&null!=(r=l.arrow)&&r.alignmentOffset?{}:{x:n+a.x,y:i+a.y,data:{...a,placement:s}}}})];var e;this.sync?t.push(Go({apply:({rects:t})=>{const e="width"===this.sync||"both"===this.sync,o="height"===this.sync||"both"===this.sync;this.popup.style.width=e?`${t.reference.width}px`:"",this.popup.style.height=o?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var o,r;const{placement:n,middlewareData:i,rects:s,initialPlacement:l,platform:a,elements:c}=e,{mainAxis:h=!0,crossAxis:d=!0,fallbackPlacements:p,fallbackStrategy:u="bestFit",fallbackAxisSideDirection:f="none",flipAlignment:g=!0,...m}=Xe(t,e);if(null!=(o=i.arrow)&&o.alignmentOffset)return{};const y=Ye(n),v=Qe(l),b=Ye(l)===l,w=await(null==a.isRTL?void 0:a.isRTL(c.floating)),x=p||(b||!g?[oo(l)]:function(t){const e=oo(t);return[eo(t),e,eo(e)]}(l)),$="none"!==f;!p&&$&&x.push(...function(t,e,o,r){const n=Ke(t);let i=function(t,e,o){const r=["left","right"],n=["right","left"],i=["top","bottom"],s=["bottom","top"];switch(t){case"top":case"bottom":return o?e?n:r:e?r:n;case"left":case"right":return e?i:s;default:return[]}}(Ye(t),"start"===o,r);return n&&(i=i.map((t=>t+"-"+n)),e&&(i=i.concat(i.map(eo)))),i}(l,g,f,w));const C=[l,...x],M=await so(e,m),_=[];let E=(null==(r=i.flip)?void 0:r.overflows)||[];if(h&&_.push(M[y]),d){const t=function(t,e,o){void 0===o&&(o=!1);const r=Ke(t),n=to(t),i=Je(n);let s="x"===n?r===(o?"end":"start")?"right":"left":"start"===r?"bottom":"top";return e.reference[i]>e.floating[i]&&(s=oo(s)),[s,oo(s)]}(n,s,w);_.push(M[t[0]],M[t[1]])}if(E=[...E,{placement:n,overflows:_}],!_.every((t=>t<=0))){var S,A;const t=((null==(S=i.flip)?void 0:S.index)||0)+1,e=C[t];if(e)return{data:{index:t,overflows:E},reset:{placement:e}};let o=null==(A=E.filter((t=>t.overflows[0]<=0)).sort(((t,e)=>t.overflows[1]-e.overflows[1]))[0])?void 0:A.placement;if(!o)switch(u){case"bestFit":{var k;const t=null==(k=E.filter((t=>{if($){const e=Qe(t.placement);return e===v||"y"===e}return!0})).map((t=>[t.placement,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:k[0];t&&(o=t);break}case"initialPlacement":o=l}if(n!==o)return{reset:{placement:o}}}return{}}}}({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:r,placement:n}=e,{mainAxis:i=!0,crossAxis:s=!1,limiter:l={fn:t=>{let{x:e,y:o}=t;return{x:e,y:o}}},...a}=Xe(t,e),c={x:o,y:r},h=await so(e,a),d=Qe(Ye(n)),p=Ze(d);let u=c[p],f=c[d];if(i){const t="y"===p?"bottom":"right";u=qe(u+h["y"===p?"top":"left"],u,u-h[t])}if(s){const t="y"===d?"bottom":"right";f=qe(f+h["y"===d?"top":"left"],f,f-h[t])}const g=l.fn({...e,[p]:u,[d]:f});return{...g,data:{x:g.x-o,y:g.y-r,enabled:{[p]:i,[d]:s}}}}}}({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(Go({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:e})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${e}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push((t=>({name:"arrow",options:t,async fn(e){const{x:o,y:r,placement:n,rects:i,platform:s,elements:l,middlewareData:a}=e,{element:c,padding:h=0}=Xe(t,e)||{};if(null==c)return{};const d=ro(h),p={x:o,y:r},u=to(n),f=Je(u),g=await s.getDimensions(c),m="y"===u,y=m?"top":"left",v=m?"bottom":"right",b=m?"clientHeight":"clientWidth",w=i.reference[f]+i.reference[u]-p[u]-i.floating[f],x=p[u]-i.reference[u],$=await(null==s.getOffsetParent?void 0:s.getOffsetParent(c));let C=$?$[b]:0;C&&await(null==s.isElement?void 0:s.isElement($))||(C=l.floating[b]||i.floating[f]);const M=w/2-x/2,_=C/2-g[f]/2-1,E=Ne(d[y],_),S=Ne(d[v],_),A=E,k=C-g[f]-S,R=C/2-g[f]/2+M,P=qe(A,R,k),L=!a.arrow&&null!=Ke(n)&&R!==P&&i.reference[f]/2-(R<A?E:S)-g[f]/2<0,O=L?R<A?R-A:R-k:0;return{[u]:p[u]+O,data:{[u]:P,centerOffset:R-P-O,...L&&{alignmentOffset:O}},reset:L}}}))({element:this.arrowEl,padding:this.arrowPadding}));const o="absolute"===this.strategy?t=>Io.getOffsetParent(t,Xo):Io.getOffsetParent;((t,e,o)=>{const r=new Map,n={platform:Io,...o},i={...n.platform,_c:r};return(async(t,e,o)=>{const{placement:r="bottom",strategy:n="absolute",middleware:i=[],platform:s}=o,l=i.filter(Boolean),a=await(null==s.isRTL?void 0:s.isRTL(e));let c=await s.getElementRects({reference:t,floating:e,strategy:n}),{x:h,y:d}=io(c,r,a),p=r,u={},f=0;for(let o=0;o<l.length;o++){const{name:i,fn:g}=l[o],{x:m,y,data:v,reset:b}=await g({x:h,y:d,initialPlacement:r,placement:p,strategy:n,middlewareData:u,rects:c,platform:s,elements:{reference:t,floating:e}});h=null!=m?m:h,d=null!=y?y:d,u={...u,[i]:{...u[i],...v}},b&&f<=50&&(f++,"object"==typeof b&&(b.placement&&(p=b.placement),b.rects&&(c=!0===b.rects?await s.getElementRects({reference:t,floating:e,strategy:n}):b.rects),({x:h,y:d}=io(c,p,a))),o=-1)}return{x:h,y:d,placement:p,strategy:n,middlewareData:u}})(t,e,{...n,platform:i})})(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:ze(He({},Io),{getOffsetParent:o})}).then((({x:t,y:e,middlewareData:o,placement:r})=>{const n="rtl"===this.localize.dir(),i={top:"bottom",right:"left",bottom:"top",left:"right"}[r.split("-")[0]];if(this.setAttribute("data-current-placement",r),Object.assign(this.popup.style,{left:`${t}px`,top:`${e}px`}),this.arrow){const t=o.arrow.x,e=o.arrow.y;let r="",s="",l="",a="";if("start"===this.arrowPlacement){const o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";r="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",s=n?o:"",a=n?"":o}else if("end"===this.arrowPlacement){const o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";s=n?"":o,a=n?o:"",l="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(a="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",r="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":""):(a="number"==typeof t?`${t}px`:"",r="number"==typeof e?`${e}px`:"");Object.assign(this.arrowEl.style,{top:r,right:s,bottom:l,left:a,[i]:"calc(var(--arrow-size-diagonal) * -1)"})}})),requestAnimationFrame((()=>this.updateHoverBridge())),this.emit("sl-reposition")}render(){return V`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${qo({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${qo({popup:!0,"popup--active":this.active,"popup--fixed":"fixed"===this.strategy,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?V`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};Ko.styles=[_e,de],Te([yt(".popup")],Ko.prototype,"popup",2),Te([yt(".popup__arrow")],Ko.prototype,"arrowEl",2),Te([ft()],Ko.prototype,"anchor",2),Te([ft({type:Boolean,reflect:!0})],Ko.prototype,"active",2),Te([ft({reflect:!0})],Ko.prototype,"placement",2),Te([ft({reflect:!0})],Ko.prototype,"strategy",2),Te([ft({type:Number})],Ko.prototype,"distance",2),Te([ft({type:Number})],Ko.prototype,"skidding",2),Te([ft({type:Boolean})],Ko.prototype,"arrow",2),Te([ft({attribute:"arrow-placement"})],Ko.prototype,"arrowPlacement",2),Te([ft({attribute:"arrow-padding",type:Number})],Ko.prototype,"arrowPadding",2),Te([ft({type:Boolean})],Ko.prototype,"flip",2),Te([ft({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map((t=>t.trim())).filter((t=>""!==t)),toAttribute:t=>t.join(" ")}})],Ko.prototype,"flipFallbackPlacements",2),Te([ft({attribute:"flip-fallback-strategy"})],Ko.prototype,"flipFallbackStrategy",2),Te([ft({type:Object})],Ko.prototype,"flipBoundary",2),Te([ft({attribute:"flip-padding",type:Number})],Ko.prototype,"flipPadding",2),Te([ft({type:Boolean})],Ko.prototype,"shift",2),Te([ft({type:Object})],Ko.prototype,"shiftBoundary",2),Te([ft({attribute:"shift-padding",type:Number})],Ko.prototype,"shiftPadding",2),Te([ft({attribute:"auto-size"})],Ko.prototype,"autoSize",2),Te([ft()],Ko.prototype,"sync",2),Te([ft({type:Object})],Ko.prototype,"autoSizeBoundary",2),Te([ft({attribute:"auto-size-padding",type:Number})],Ko.prototype,"autoSizePadding",2),Te([ft({attribute:"hover-bridge",type:Boolean})],Ko.prototype,"hoverBridge",2);var Zo=new Map,Jo=new WeakMap;function Qo(t,e){return"rtl"===e.toLowerCase()?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function tr(t,e){Zo.set(t,function(t){return null!=t?t:{keyframes:[],options:{duration:0}}}(e))}function er(t,e,o){const r=Jo.get(t);if(null==r?void 0:r[e])return Qo(r[e],o.dir);const n=Zo.get(e);return n?Qo(n,o.dir):{keyframes:[],options:{duration:0}}}function or(t,e){return new Promise((o=>{t.addEventListener(e,(function r(n){n.target===t&&(t.removeEventListener(e,r),o())}))}))}function rr(t,e,o){return new Promise((r=>{if((null==o?void 0:o.duration)===1/0)throw new Error("Promise-based animations must be finite.");const n=t.animate(e,ze(He({},o),{duration:window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:o.duration}));n.addEventListener("cancel",r,{once:!0}),n.addEventListener("finish",r,{once:!0})}))}function nr(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?1e3*parseFloat(t):parseFloat(t)}function ir(t){return Promise.all(t.getAnimations().map((t=>new Promise((e=>{t.cancel(),requestAnimationFrame(e)})))))}function sr(t,e){const o=He({waitUntilFirstUpdate:!1},e);return(e,r)=>{const{update:n}=e,i=Array.isArray(t)?t:[t];e.update=function(t){i.forEach((e=>{const n=e;if(t.has(n)){const e=t.get(n),i=this[n];e!==i&&(o.waitUntilFirstUpdate&&!this.hasUpdated||this[r](e,i))}})),n.call(this,t)}}}var lr=class extends De{constructor(){super(),this.localize=new Ce(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const t=nr(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>this.show()),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const t=nr(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>this.hide()),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await ir(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:e,options:o}=er(this,"tooltip.show",{dir:this.localize.dir()});await rr(this.popup.popup,e,o),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),null==(e=this.closeWatcher)||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await ir(this.body);const{keyframes:t,options:o}=er(this,"tooltip.hide",{dir:this.localize.dir()});await rr(this.popup.popup,t,o),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,or(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,or(this,"sl-after-hide")}render(){return V`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${qo({tooltip:!0,"tooltip--open":this.open})}
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
    `}};lr.styles=[_e,he],lr.dependencies={"sl-popup":Ko},Te([yt("slot:not([name])")],lr.prototype,"defaultSlot",2),Te([yt(".tooltip__body")],lr.prototype,"body",2),Te([yt("sl-popup")],lr.prototype,"popup",2),Te([ft()],lr.prototype,"content",2),Te([ft()],lr.prototype,"placement",2),Te([ft({type:Boolean,reflect:!0})],lr.prototype,"disabled",2),Te([ft({type:Number})],lr.prototype,"distance",2),Te([ft({type:Boolean,reflect:!0})],lr.prototype,"open",2),Te([ft({type:Number})],lr.prototype,"skidding",2),Te([ft()],lr.prototype,"trigger",2),Te([ft({type:Boolean})],lr.prototype,"hoist",2),Te([sr("open",{waitUntilFirstUpdate:!0})],lr.prototype,"handleOpenChange",1),Te([sr(["content","distance","hoist","placement","skidding"])],lr.prototype,"handleOptionsChange",1),Te([sr("disabled")],lr.prototype,"handleDisabledChange",1),tr("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}}),tr("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});var ar=s`
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
`,cr=s`
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
`,hr="";function dr(t){hr=t}var pr={name:"default",resolver:t=>function(t=""){if(!hr){const t=[...document.getElementsByTagName("script")],e=t.find((t=>t.hasAttribute("data-shoelace")));if(e)dr(e.getAttribute("data-shoelace"));else{const e=t.find((t=>/shoelace(\.min)?\.js($|\?)/.test(t.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(t.src)));let o="";e&&(o=e.getAttribute("src")),dr(o.split("/").slice(0,-1).join("/"))}}return hr.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}(`assets/icons/${t}.svg`)},ur={caret:'\n    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n      <polyline points="6 9 12 15 18 9"></polyline>\n    </svg>\n  ',check:'\n    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor">\n          <g transform="translate(3.428571, 3.428571)">\n            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>\n            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"chevron-down":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',"chevron-left":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>\n    </svg>\n  ',"chevron-right":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',copy:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>\n    </svg>\n  ',eye:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n    </svg>\n  ',"eye-slash":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">\n      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>\n      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>\n      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>\n    </svg>\n  ',eyedropper:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">\n      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>\n    </svg>\n  ',"grip-vertical":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">\n      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>\n    </svg>\n  ',indeterminate:'\n    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor" stroke-width="2">\n          <g transform="translate(2.285714, 6.857143)">\n            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"person-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">\n      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>\n    </svg>\n  ',"play-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">\n      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>\n    </svg>\n  ',"pause-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">\n      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>\n    </svg>\n  ',radio:'\n    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g fill="currentColor">\n          <circle cx="8" cy="8" r="3.42857143"></circle>\n        </g>\n      </g>\n    </svg>\n  ',"star-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">\n      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n    </svg>\n  ',"x-lg":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">\n      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>\n    </svg>\n  ',"x-circle-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">\n      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>\n    </svg>\n  '},fr=[pr,{name:"system",resolver:t=>t in ur?`data:image/svg+xml,${encodeURIComponent(ur[t])}`:""}],gr=[];function mr(t){return fr.find((e=>e.name===t))}const{I:yr}=lt;var vr,br=Symbol(),wr=Symbol(),xr=new Map,$r=class extends De{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var o;let r;if(null==e?void 0:e.spriteSheet)return this.svg=V`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(r=await fetch(t,{mode:"cors"}),!r.ok)return 410===r.status?br:wr}catch(t){return wr}try{const t=document.createElement("div");t.innerHTML=await r.text();const e=t.firstElementChild;if("svg"!==(null==(o=null==e?void 0:e.tagName)?void 0:o.toLowerCase()))return br;vr||(vr=new DOMParser);const n=vr.parseFromString(e.outerHTML,"text/html").body.querySelector("svg");return n?(n.part.add("svg"),document.adoptNode(n)):br}catch(t){return br}}connectedCallback(){super.connectedCallback(),gr.push(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){var t;super.disconnectedCallback(),t=this,gr=gr.filter((e=>e!==t))}getIconSource(){const t=mr(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const{url:e,fromLibrary:o}=this.getIconSource(),r=o?mr(this.library):void 0;if(!e)return void(this.svg=null);let n=xr.get(e);if(n||(n=this.resolveIcon(e,r),xr.set(e,n)),!this.initialRender)return;const i=await n;if(i===wr&&xr.delete(e),e===this.getIconSource().url)if((t=>void 0!==t?._$litType$)(i)){if(this.svg=i,r){await this.updateComplete;const t=this.shadowRoot.querySelector("[part='svg']");"function"==typeof r.mutator&&t&&r.mutator(t)}}else switch(i){case wr:case br:this.svg=null,this.emit("sl-error");break;default:this.svg=i.cloneNode(!0),null==(t=null==r?void 0:r.mutator)||t.call(r,this.svg),this.emit("sl-load")}}render(){return this.svg}};$r.styles=[_e,cr],Te([gt()],$r.prototype,"svg",2),Te([ft({reflect:!0})],$r.prototype,"name",2),Te([ft()],$r.prototype,"src",2),Te([ft()],$r.prototype,"label",2),Te([ft({reflect:!0})],$r.prototype,"library",2),Te([sr("label")],$r.prototype,"handleLabelChange",1),Te([sr(["name","src","library"])],$r.prototype,"setIcon",1);var Cr=class extends De{constructor(){super(...arguments),this.localize=new Ce(this),this.isCopying=!1,this.status="rest",this.value="",this.from="",this.disabled=!1,this.copyLabel="",this.successLabel="",this.errorLabel="",this.feedbackDuration=1e3,this.tooltipPlacement="top",this.hoist=!1}async handleCopy(){if(this.disabled||this.isCopying)return;this.isCopying=!0;let t=this.value;if(this.from){const e=this.getRootNode(),o=this.from.includes("."),r=this.from.includes("[")&&this.from.includes("]");let n=this.from,i="";o?[n,i]=this.from.trim().split("."):r&&([n,i]=this.from.trim().replace(/\]$/,"").split("["));const s="getElementById"in e?e.getElementById(n):null;s?t=r?s.getAttribute(i)||"":o?s[i]||"":s.textContent||"":(this.showStatus("error"),this.emit("sl-error"))}if(t)try{await navigator.clipboard.writeText(t),this.showStatus("success"),this.emit("sl-copy",{detail:{value:t}})}catch(t){this.showStatus("error"),this.emit("sl-error")}else this.showStatus("error"),this.emit("sl-error")}async showStatus(t){const e=this.copyLabel||this.localize.term("copy"),o=this.successLabel||this.localize.term("copied"),r=this.errorLabel||this.localize.term("error"),n="success"===t?this.successIcon:this.errorIcon,i=er(this,"copy.in",{dir:"ltr"}),s=er(this,"copy.out",{dir:"ltr"});this.tooltip.content="success"===t?o:r,await this.copyIcon.animate(s.keyframes,s.options).finished,this.copyIcon.hidden=!0,this.status=t,n.hidden=!1,await n.animate(i.keyframes,i.options).finished,setTimeout((async()=>{await n.animate(s.keyframes,s.options).finished,n.hidden=!0,this.status="rest",this.copyIcon.hidden=!1,await this.copyIcon.animate(i.keyframes,i.options).finished,this.tooltip.content=e,this.isCopying=!1}),this.feedbackDuration)}render(){const t=this.copyLabel||this.localize.term("copy");return V`
      <sl-tooltip
        class=${qo({"copy-button":!0,"copy-button--success":"success"===this.status,"copy-button--error":"error"===this.status})}
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
    `}};Cr.styles=[_e,ar],Cr.dependencies={"sl-icon":$r,"sl-tooltip":lr},Te([yt('slot[name="copy-icon"]')],Cr.prototype,"copyIcon",2),Te([yt('slot[name="success-icon"]')],Cr.prototype,"successIcon",2),Te([yt('slot[name="error-icon"]')],Cr.prototype,"errorIcon",2),Te([yt("sl-tooltip")],Cr.prototype,"tooltip",2),Te([gt()],Cr.prototype,"isCopying",2),Te([gt()],Cr.prototype,"status",2),Te([ft()],Cr.prototype,"value",2),Te([ft()],Cr.prototype,"from",2),Te([ft({type:Boolean,reflect:!0})],Cr.prototype,"disabled",2),Te([ft({attribute:"copy-label"})],Cr.prototype,"copyLabel",2),Te([ft({attribute:"success-label"})],Cr.prototype,"successLabel",2),Te([ft({attribute:"error-label"})],Cr.prototype,"errorLabel",2),Te([ft({attribute:"feedback-duration",type:Number})],Cr.prototype,"feedbackDuration",2),Te([ft({attribute:"tooltip-placement"})],Cr.prototype,"tooltipPlacement",2),Te([ft({type:Boolean})],Cr.prototype,"hoist",2),tr("copy.in",{keyframes:[{scale:".25",opacity:".25"},{scale:"1",opacity:"1"}],options:{duration:100}}),tr("copy.out",{keyframes:[{scale:"1",opacity:"1"},{scale:".25",opacity:"0"}],options:{duration:100}}),Cr.define("sl-copy-button");class Mr extends Event{constructor(t,e){super(Mr.type,{bubbles:!0,composed:!0}),this.inputType=t,this.value=e}}Mr.type="color-converter-input";var _r,Er=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s};!function(t){t.HEX="HEX",t.RGB255="RGB255",t.RGB01="RGB01",t.HSV="HSV"}(_r||(_r={}));const Sr={[_r.HEX]:"Hex",[_r.RGB255]:"RGB (0-255)",[_r.RGB01]:"RGB (0-1)",[_r.HSV]:"HSV"},Ar={[_r.HEX]:"hexValue",[_r.RGB255]:"rgb255Value",[_r.RGB01]:"rgb01Value",[_r.HSV]:"hsvValue"},kr={[_r.HEX]:t=>"#"+t.getHex(),[_r.RGB255]:t=>t.getRGB255().splice(0,3).toString(),[_r.RGB01]:t=>t.getRGB01().splice(0,3).map((t=>t.toFixed(3))).toString(),[_r.HSV]:t=>t.getHSV(!1).splice(0,3).toString()};let Rr=class extends ct{constructor(){super(...arguments),this.type=_r.HEX,this.inputValues={},this.color=new kt}onValueChange(t){this.dispatchEvent(new Mr(this.type,t.target.value))}render(){const t=this.inputValues[Ar[this.type]]??kr[this.type](this.color);return V`
      ${Lt}
      <div class="input-group">
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            .value=${t}
            @input=${this.onValueChange}
          />
          <label>${Sr[this.type]}</label>
        </div>
        <span class="input-group-text">
          <sl-copy-button value=${t}></sl-copy-button>
        </span>
      </div>
    `}};Er([ft()],Rr.prototype,"type",void 0),Er([ft({attribute:!1})],Rr.prototype,"inputValues",void 0),Er([ft({attribute:!1})],Rr.prototype,"color",void 0),Rr=Er([dt("color-converter-input")],Rr);var Pr=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s};const Lr={[_r.HEX]:kt.parseHex,[_r.RGB255]:kt.parseRGB255,[_r.RGB01]:kt.parseRGB01,[_r.HSV]:kt.parseHSV};let Or=class extends ct{constructor(){super(),this.color=new kt,this.coordinates={x:0,y:0,width:0,height:0},this.inputValues={},this.addEventListener(Mr.type,(t=>{if(t instanceof Mr){const{inputType:e,value:o}=t,r=Lr[e](o);null!=r&&(this.setColor(r),this.inputValues={...this.inputValues,[Ar[e]]:o})}}))}setColor(t){this.dispatchEvent(new Ot(t))}updateChildren(){Array.prototype.forEach.call(this.children,(t=>{t instanceof Rr&&(t.inputValues=this.inputValues,t.color=this.color)}))}render(){const t={x:this.coordinates.x/this.coordinates.width,y:this.coordinates.y/this.coordinates.height},e=[t.x.toFixed(3),t.y.toFixed(3)],o=[Math.round(this.coordinates.x),Math.round(this.coordinates.y)];return this.updateChildren(),V`
      ${Lt}
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
    `}};Or.styles=[ce],Pr([ft({attribute:!1})],Or.prototype,"color",void 0),Pr([ft({attribute:!1})],Or.prototype,"coordinates",void 0),Pr([gt()],Or.prototype,"inputValues",void 0),Or=Pr([dt("color-converter")],Or);const Br=(t,e)=>{const o=t._$AN;if(void 0===o)return!1;for(const t of o)t._$AO?.(e,!1),Br(t,e);return!0},Hr=t=>{let e,o;do{if(void 0===(e=t._$AM))break;o=e._$AN,o.delete(t),t=e}while(0===o?.size)},zr=t=>{for(let e;e=t._$AM;t=e){let o=e._$AN;if(void 0===o)e._$AN=o=new Set;else if(o.has(t))break;o.add(t),Dr(e)}};function Tr(t){void 0!==this._$AN?(Hr(this),this._$AM=t,zr(this)):this._$AM=t}function jr(t,e=!1,o=0){const r=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(e)if(Array.isArray(r))for(let t=o;t<r.length;t++)Br(r[t],!1),Hr(r[t]);else null!=r&&(Br(r,!1),Hr(r));else Br(this,t)}const Dr=t=>{2==t.type&&(t._$AP??=jr,t._$AQ??=Tr)};class Nr extends Wo{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,o){super._$AT(t,e,o),zr(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(Br(this,t),Hr(this))}setValue(t){if((()=>void 0===this._$Ct.strings)())this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}class Ur{}const Ir=new WeakMap,Fr=Vo(class extends Nr{render(t){return q}update(t,[e]){const o=e!==this.Y;return o&&void 0!==this.Y&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.Y=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),q}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.Y){const e=this.ht??globalThis;let o=Ir.get(e);void 0===o&&(o=new WeakMap,Ir.set(e,o)),void 0!==o.get(this.Y)&&this.Y.call(this.ht,void 0),o.set(this.Y,t),void 0!==t&&this.Y.call(this.ht,t)}else this.Y.value=t}get lt(){return"function"==typeof this.Y?Ir.get(this.ht??globalThis)?.get(this.Y):this.Y?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Gr=s`:host {
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
`;var Vr,Wr,qr=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s};!function(t){t.Transparent="transparent",t.Black="black",t.White="white"}(Vr||(Vr={})),function(t){t.Small="small",t.Medium="medium",t.Large="large"}(Wr||(Wr={}));const Xr={[Wr.Small]:"1rem",[Wr.Medium]:"1.5rem",[Wr.Large]:"3rem"};let Yr=class extends ct{constructor(){super(),this.coordinates={x:0,y:0,width:0,height:0},this.initialOverlayColor=Vr.Black,this.overlayColor=Vr.Black,this.overlaySize=Wr.Medium,this.loadedImage=!1,this.canvasRef=new Ur,this.overlayColor=this.initialOverlayColor}setColor(t){this.dispatchEvent(new Ot(t))}setCoordinates(t){this.dispatchEvent(new Ut(t))}loadImage(t){const e=t.currentTarget.files?.item(0);if(e){const t=new FileReader;t.onload=t=>{const e=new Image;e.onload=()=>{const t=this.canvasRef.value,o=t.getContext("2d");o&&(t.width=e.width,t.height=e.height,o.drawImage(e,0,0)),this.loadedImage=!0},e.src=t.target?.result},t.readAsDataURL(e)}}sampleImage(t){if(t instanceof MouseEvent&&1==t.buttons){const e=this.canvasRef.value,o=e.getContext("2d");if(o){const r=e.getBoundingClientRect(),n=(t.clientX-r.left)/r.width*e.width,i=(t.clientY-r.top)/r.height*e.height,s=o.getImageData(n,i,1,1);this.setColor(new kt({type:At.RGB255,r:s.data[0],g:s.data[1],b:s.data[2]})),this.setCoordinates({x:n,y:i,width:e.width,height:e.height})}}}selectOverlayColor(t){this.overlayColor=t.currentTarget.value}selectOverlaySize(t){this.overlaySize=t.currentTarget.value}render(){const t=this.coordinates.x/this.coordinates.width*100,e=this.coordinates.y/this.coordinates.height*100,o=`\n      border-color: ${this.overlayColor};\n      top: calc(${e}% - var(--circle-diameter) / 2);\n      left: calc(${t}% - var(--circle-diameter) / 2);\n      --circle-diameter: ${Xr[this.overlaySize]};\n    `;return V`
      ${Lt}
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
              value=${Vr.Transparent}
              .selected=${this.overlayColor==Vr.Transparent}
            >
              None
            </option>
            <option
              value=${Vr.Black}
              .selected=${this.overlayColor==Vr.Black}
            >
              Black
            </option>
            <option
              value=${Vr.White}
              .selected=${this.overlayColor==Vr.White}
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
              value=${Wr.Small}
              .selected=${this.overlaySize==Wr.Small}
            >
              Small
            </option>
            <option
              value=${Wr.Medium}
              .selected=${this.overlaySize==Wr.Medium}
            >
              Medium
            </option>
            <option
              value=${Wr.Large}
              .selected=${this.overlaySize==Wr.Large}
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
          ${Fr(this.canvasRef)}
          @mousedown=${this.sampleImage}
          @mousemove=${this.sampleImage}
        ></canvas>
        <div
          class="image-preview-overlay"
          ?hidden=${!this.loadedImage}
          style=${o}
        ></div>
      </div>
    `}};Yr.styles=[Gr],qr([ft({attribute:!1})],Yr.prototype,"coordinates",void 0),qr([ft({attribute:!1})],Yr.prototype,"initialOverlayColor",void 0),qr([gt()],Yr.prototype,"overlayColor",void 0),qr([gt()],Yr.prototype,"overlaySize",void 0),qr([gt()],Yr.prototype,"loadedImage",void 0),Yr=qr([dt("image-sampling")],Yr);class Kr extends ct{constructor(){super(...arguments),this.onMouseMoveBound=this.onMouseMove.bind(this),this.onMouseUpBound=this.onMouseUp.bind(this)}getColorMapData(){return[[0,0,0]]}getColorMapName(){return"Color Map"}setColor(t){this.dispatchEvent(new Ot(t))}toCss(){const t=this.getColorMapData(),e=[];for(let o=0;o<256;o++)e.push(`rgba(${Math.round(255*t[o][0])}, ${Math.round(255*t[o][1])}, ${Math.round(255*t[o][2])}, 255) ${100*o/255}%`);return`linear-gradient(to right, ${e.join(", ")})`}getColorAt(t){const e=this.getColorMapData(),o=Math.floor(_t(t*e.length,0,e.length-1)),r=Math.ceil(_t(t*e.length,0,e.length-1)),n=t*e.length-o,i=new kt({type:At.RGB01,r:e[o][0],g:e[o][1],b:e[o][2]}),s=new kt({type:At.RGB01,r:e[r][0],g:e[r][1],b:e[r][2]});return kt.lerp(i,s,n)}onMouseMove(t){if(1==t.buttons){const e=this.colorMapDiv.getBoundingClientRect(),o=(t.clientX-e.left)/e.width,r=this.getColorAt(o);this.setColor(r)}}onMouseDown(){document.addEventListener("mousemove",this.onMouseMoveBound),document.addEventListener("mouseup",this.onMouseUpBound)}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMoveBound),document.removeEventListener("mouseup",this.onMouseUpBound)}render(){return V` <div>
      <th>${this.getColorMapName()}</th>
      <td>
        <div
          style="background: ${this.toCss()}"
          class="gradient"
          @mousedown=${this.onMouseDown.bind(this)}
          id="colormap-div"
        ></div>
      </td>
    </div>`}}Kr.styles=[s`
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
    `],function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);i>3&&s&&Object.defineProperty(e,o,s)}([yt("#colormap-div")],Kr.prototype,"colorMapDiv",void 0);const Zr=[[.18995,.07176,.23217],[.19483,.08339,.26149],[.19956,.09498,.29024],[.20415,.10652,.31844],[.2086,.11802,.34607],[.21291,.12947,.37314],[.21708,.14087,.39964],[.22111,.15223,.42558],[.225,.16354,.45096],[.22875,.17481,.47578],[.23236,.18603,.50004],[.23582,.1972,.52373],[.23915,.20833,.54686],[.24234,.21941,.56942],[.24539,.23044,.59142],[.2483,.24143,.61286],[.25107,.25237,.63374],[.25369,.26327,.65406],[.25618,.27412,.67381],[.25853,.28492,.693],[.26074,.29568,.71162],[.2628,.30639,.72968],[.26473,.31706,.74718],[.26652,.32768,.76412],[.26816,.33825,.7805],[.26967,.34878,.79631],[.27103,.35926,.81156],[.27226,.3697,.82624],[.27334,.38008,.84037],[.27429,.39043,.85393],[.27509,.40072,.86692],[.27576,.41097,.87936],[.27628,.42118,.89123],[.27667,.43134,.90254],[.27691,.44145,.91328],[.27701,.45152,.92347],[.27698,.46153,.93309],[.2768,.47151,.94214],[.27648,.48144,.95064],[.27603,.49132,.95857],[.27543,.50115,.96594],[.27469,.51094,.97275],[.27381,.52069,.97899],[.27273,.5304,.98461],[.27106,.54015,.9893],[.26878,.54995,.99303],[.26592,.55979,.99583],[.26252,.56967,.99773],[.25862,.57958,.99876],[.25425,.5895,.99896],[.24946,.59943,.99835],[.24427,.60937,.99697],[.23874,.61931,.99485],[.23288,.62923,.99202],[.22676,.63913,.98851],[.22039,.64901,.98436],[.21382,.65886,.97959],[.20708,.66866,.97423],[.20021,.67842,.96833],[.19326,.68812,.9619],[.18625,.69775,.95498],[.17923,.70732,.94761],[.17223,.7168,.93981],[.16529,.7262,.93161],[.15844,.73551,.92305],[.15173,.74472,.91416],[.14519,.75381,.90496],[.13886,.76279,.8955],[.13278,.77165,.8858],[.12698,.78037,.8759],[.12151,.78896,.86581],[.11639,.7974,.85559],[.11167,.80569,.84525],[.10738,.81381,.83484],[.10357,.82177,.82437],[.10026,.82955,.81389],[.0975,.83714,.80342],[.09532,.84455,.79299],[.09377,.85175,.78264],[.09287,.85875,.7724],[.09267,.86554,.7623],[.0932,.87211,.75237],[.09451,.87844,.74265],[.09662,.88454,.73316],[.09958,.8904,.72393],[.10342,.896,.715],[.10815,.90142,.70599],[.11374,.90673,.69651],[.12014,.91193,.6866],[.12733,.91701,.67627],[.13526,.92197,.66556],[.14391,.9268,.65448],[.15323,.93151,.64308],[.16319,.93609,.63137],[.17377,.94053,.61938],[.18491,.94484,.60713],[.19659,.94901,.59466],[.20877,.95304,.58199],[.22142,.95692,.56914],[.23449,.96065,.55614],[.24797,.96423,.54303],[.2618,.96765,.52981],[.27597,.97092,.51653],[.29042,.97403,.50321],[.30513,.97697,.48987],[.32006,.97974,.47654],[.33517,.98234,.46325],[.35043,.98477,.45002],[.36581,.98702,.43688],[.38127,.98909,.42386],[.39678,.99098,.41098],[.41229,.99268,.39826],[.42778,.99419,.38575],[.44321,.99551,.37345],[.45854,.99663,.3614],[.47375,.99755,.34963],[.48879,.99828,.33816],[.50362,.99879,.32701],[.51822,.9991,.31622],[.53255,.99919,.30581],[.54658,.99907,.29581],[.56026,.99873,.28623],[.57357,.99817,.27712],[.58646,.99739,.26849],[.59891,.99638,.26038],[.61088,.99514,.2528],[.62233,.99366,.24579],[.63323,.99195,.23937],[.64362,.98999,.23356],[.65394,.98775,.22835],[.66428,.98524,.2237],[.67462,.98246,.2196],[.68494,.97941,.21602],[.69525,.9761,.21294],[.70553,.97255,.21032],[.71577,.96875,.20815],[.72596,.9647,.2064],[.7361,.96043,.20504],[.74617,.95593,.20406],[.75617,.95121,.20343],[.76608,.94627,.20311],[.77591,.94113,.2031],[.78563,.93579,.20336],[.79524,.93025,.20386],[.80473,.92452,.20459],[.8141,.91861,.20552],[.82333,.91253,.20663],[.83241,.90627,.20788],[.84133,.89986,.20926],[.8501,.89328,.21074],[.85868,.88655,.2123],[.86709,.87968,.21391],[.8753,.87267,.21555],[.88331,.86553,.21719],[.89112,.85826,.2188],[.8987,.85087,.22038],[.90605,.84337,.22188],[.91317,.83576,.22328],[.92004,.82806,.22456],[.92666,.82025,.2257],[.93301,.81236,.22667],[.93909,.80439,.22744],[.94489,.79634,.228],[.95039,.78823,.22831],[.9556,.78005,.22836],[.96049,.77181,.22811],[.96507,.76352,.22754],[.96931,.75519,.22663],[.97323,.74682,.22536],[.97679,.73842,.22369],[.98,.73,.22161],[.98289,.7214,.21918],[.98549,.7125,.2165],[.98781,.7033,.21358],[.98986,.69382,.21043],[.99163,.68408,.20706],[.99314,.67408,.20348],[.99438,.66386,.19971],[.99535,.65341,.19577],[.99607,.64277,.19165],[.99654,.63193,.18738],[.99675,.62093,.18297],[.99672,.60977,.17842],[.99644,.59846,.17376],[.99593,.58703,.16899],[.99517,.57549,.16412],[.99419,.56386,.15918],[.99297,.55214,.15417],[.99153,.54036,.1491],[.98987,.52854,.14398],[.98799,.51667,.13883],[.9859,.50479,.13367],[.9836,.49291,.12849],[.98108,.48104,.12332],[.97837,.4692,.11817],[.97545,.4574,.11305],[.97234,.44565,.10797],[.96904,.43399,.10294],[.96555,.42241,.09798],[.96187,.41093,.0931],[.95801,.39958,.08831],[.95398,.38836,.08362],[.94977,.37729,.07905],[.94538,.36638,.07461],[.94084,.35566,.07031],[.93612,.34513,.06616],[.93125,.33482,.06218],[.92623,.32473,.05837],[.92105,.31489,.05475],[.91572,.3053,.05134],[.91024,.29599,.04814],[.90463,.28696,.04516],[.89888,.27824,.04243],[.89298,.26981,.03993],[.88691,.26152,.03753],[.88066,.25334,.03521],[.87422,.24526,.03297],[.8676,.2373,.03082],[.86079,.22945,.02875],[.8538,.2217,.02677],[.84662,.21407,.02487],[.83926,.20654,.02305],[.83172,.19912,.02131],[.82399,.19182,.01966],[.81608,.18462,.01809],[.80799,.17753,.0166],[.79971,.17055,.0152],[.79125,.16368,.01387],[.7826,.15693,.01264],[.77377,.15028,.01148],[.76476,.14374,.01041],[.75556,.13731,.00942],[.74617,.13098,.00851],[.73661,.12477,.00769],[.72686,.11867,.00695],[.71692,.11268,.00629],[.7068,.1068,.00571],[.6965,.10102,.00522],[.68602,.09536,.00481],[.67535,.0898,.00449],[.66449,.08436,.00424],[.65345,.07902,.00408],[.64223,.0738,.00401],[.63082,.06868,.00401],[.61923,.06367,.0041],[.60746,.05878,.00427],[.5955,.05399,.00453],[.58336,.04931,.00486],[.57103,.04474,.00529],[.55852,.04028,.00579],[.54583,.03593,.00638],[.53295,.03169,.00705],[.51989,.02756,.0078],[.50664,.02354,.00863],[.49321,.01963,.00955],[.4796,.01583,.01055]];let Jr=class extends Kr{getColorMapData(){return Zr}getColorMapName(){return"Turbo"}};Jr=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s}([dt("turbo-colormap")],Jr);let Qr=class extends ct{render(){return V`
      ${Lt}
      <h5>Color Maps</h5>
      <div class="table mb-0">
        <slot></slot>
      </div>
    `}};Qr.styles=[s`
      ul {
        padding: 0;
      }
    `],Qr=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s}([dt("color-maps")],Qr);var tn=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s};let en=class extends ct{constructor(){super(...arguments),this.name="",this.href=""}};tn([ft()],en.prototype,"name",void 0),tn([ft()],en.prototype,"href",void 0),en=tn([dt("other-tools-entry")],en);let on=class extends ct{render(){return V` ${Lt}
      <h5>Other Tools</h5>
      <ul>
        ${Array.prototype.map.call(this.children,(t=>{if(t instanceof en)return V`<li>
              <a href="${t.href}" target="_blank">${t.name}</a>
            </li>`}))}
      </ul>`}};on=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s}([dt("other-tools")],on);var rn=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s};let nn=class extends ct{constructor(){super(),this.color=new kt({type:At.RGB255,r:255,g:255,b:255}),this.coordinates={x:0,y:0,width:1,height:1},this.interpolationLeft=new kt({type:At.RGB255,r:255,g:0,b:0}),this.interpolationRight=new kt({type:At.RGB255,r:255,g:255,b:255}),this.interpolationActive=Tt.NONE,this.addEventListener(Ot.eventName,(t=>{t instanceof Ot&&this.setColor(t.color)})),this.addEventListener(Ut.eventName,(t=>{t instanceof Ut&&this.setCoordinates(t.coordinates)})),this.addEventListener(Bt.eventName,(t=>{t instanceof Bt&&this.setInterpolationActive(t.active)}))}setColor(t){this.color=t,this.interpolationActive===Tt.LEFT?this.interpolationLeft=t:this.interpolationActive==Tt.RIGHT&&(this.interpolationRight=t)}setCoordinates(t){this.coordinates=t}setInterpolationActive(t){this.interpolationActive=t}updateChildren(){Array.prototype.forEach.call(this.children,(t=>{t instanceof ae?t.color=this.color:t instanceof Or?(t.color=this.color,t.coordinates=this.coordinates):t instanceof Yr?t.coordinates=this.coordinates:t instanceof Dt&&(t.leftColor=this.interpolationLeft,t.rightColor=this.interpolationRight,t.activeColor=this.interpolationActive)}))}render(){return this.style.background="#"+this.color.getHex(),this.updateChildren(),V` ${Lt}
      <slot class="d-flex flex-row flex-wrap main-container"></slot>`}};nn.styles=[Nt],rn([gt()],nn.prototype,"color",void 0),rn([gt()],nn.prototype,"coordinates",void 0),rn([gt()],nn.prototype,"interpolationLeft",void 0),rn([gt()],nn.prototype,"interpolationRight",void 0),rn([gt()],nn.prototype,"interpolationActive",void 0),nn=rn([dt("color-picker")],nn)})()})();
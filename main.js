function t(t,e,o,r){var i,s=arguments.length,n=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(n=(s<3?i(n):s>3?i(e,o,n):i(e,o))||n);return s>3&&n&&Object.defineProperty(e,o,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),i=new WeakMap;let s=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=i.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&i.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[r+1],t[0]);return new s(o,t,r)},a=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,b=g.trustedTypes,f=b?b.emptyScript:"",v=g.reactiveElementPolyfillSupport,m=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},y=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(t,o,e);void 0!==r&&c(this.prototype,t,r)}}static getPropertyDescriptor(t,e,o){const{get:r,set:i}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const s=r?.call(this);i?.call(this,e),this.requestUpdate(t,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(o)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of r){const r=document.createElement("style"),i=e.litNonce;void 0!==i&&r.setAttribute("nonce",i),r.textContent=o.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,o);if(void 0!==r&&!0===o.reflect){const i=(void 0!==o.converter?.toAttribute?o.converter:w).toAttribute(e,o.type);this._$Em=t,null==i?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(t,e){const o=this.constructor,r=o._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=o.getPropertyOptions(r),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=r;const s=i.fromAttribute(e,t.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(t,e,o,r=!1,i){if(void 0!==t){const s=this.constructor;if(!1===r&&(i=this[t]),o??=s.getPropertyOptions(t),!((o.hasChanged??y)(i,e)||o.useDefault&&o.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:r,wrapped:i},s){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==i||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,o,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[m("elementProperties")]=new Map,k[m("finalized")]=new Map,v?.({ReactiveElement:k}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,C=t=>t,S=$.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,_="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+M,H=`<${E}>`,L=document,R=()=>L.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,T="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,G=/-->/g,B=/>/g,z=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,P=/"/g,U=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...o)=>({_$litType$:t,strings:e,values:o}))(1),j=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),X=new WeakMap,q=L.createTreeWalker(L,129);function W(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const Y=(t,e)=>{const o=t.length-1,r=[];let i,s=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<o;e++){const o=t[e];let a,l,c=-1,h=0;for(;h<o.length&&(n.lastIndex=h,l=n.exec(o),null!==l);)h=n.lastIndex,n===N?"!--"===l[1]?n=G:void 0!==l[1]?n=B:void 0!==l[2]?(U.test(l[2])&&(i=RegExp("</"+l[2],"g")),n=z):void 0!==l[3]&&(n=z):n===z?">"===l[0]?(n=i??N,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?z:'"'===l[3]?P:D):n===P||n===D?n=z:n===G||n===B?n=N:(n=z,i=void 0);const d=n===z&&t[e+1].startsWith("/>")?" ":"";s+=n===N?o+H:c>=0?(r.push(a),o.slice(0,c)+_+o.slice(c)+M+d):o+M+(-2===c?e:d)}return[W(t,s+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class J{constructor({strings:t,_$litType$:e},o){let r;this.parts=[];let i=0,s=0;const n=t.length-1,a=this.parts,[l,c]=Y(t,e);if(this.el=J.createElement(l,o),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=q.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(_)){const e=c[s++],o=r.getAttribute(t).split(M),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:i,name:n[2],strings:o,ctor:"."===n[1]?et:"?"===n[1]?ot:"@"===n[1]?rt:tt}),r.removeAttribute(t)}else t.startsWith(M)&&(a.push({type:6,index:i}),r.removeAttribute(t));if(U.test(r.tagName)){const t=r.textContent.split(M),e=t.length-1;if(e>0){r.textContent=S?S.emptyScript:"";for(let o=0;o<e;o++)r.append(t[o],R()),q.nextNode(),a.push({type:2,index:++i});r.append(t[e],R())}}}else if(8===r.nodeType)if(r.data===E)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=r.data.indexOf(M,t+1));)a.push({type:7,index:i}),t+=M.length-1}i++}}static createElement(t,e){const o=L.createElement("template");return o.innerHTML=t,o}}function K(t,e,o=t,r){if(e===j)return e;let i=void 0!==r?o._$Co?.[r]:o._$Cl;const s=I(e)?void 0:e._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),void 0===s?i=void 0:(i=new s(t),i._$AT(t,o,r)),void 0!==r?(o._$Co??=[])[r]=i:o._$Cl=i),void 0!==i&&(e=K(t,i._$AS(t,e.values),i,r)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,r=(t?.creationScope??L).importNode(e,!0);q.currentNode=r;let i=q.nextNode(),s=0,n=0,a=o[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new Q(i,i.nextSibling,this,t):1===a.type?e=new a.ctor(i,a.name,a.strings,this,t):6===a.type&&(e=new it(i,this,t)),this._$AV.push(e),a=o[++n]}s!==a?.index&&(i=q.nextNode(),s++)}return q.currentNode=L,r}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,r){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),I(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,r="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=J.createElement(W(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new Z(r,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new J(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,r=0;for(const i of t)r===e.length?e.push(o=new Q(this.O(R()),this.O(R()),this,this.options)):o=e[r],o._$AI(i),r++;r<e.length&&(this._$AR(o&&o._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=C(t).nextSibling;C(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,r,i){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=i,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=F}_$AI(t,e=this,o,r){const i=this.strings;let s=!1;if(void 0===i)t=K(this,t,e,0),s=!I(t)||t!==this._$AH&&t!==j,s&&(this._$AH=t);else{const r=t;let n,a;for(t=i[0],n=0;n<i.length-1;n++)a=K(this,r[o+n],e,n),a===j&&(a=this._$AH[n]),s||=!I(a)||a!==this._$AH[n],a===F?t=F:t!==F&&(t+=(a??"")+i[n+1]),this._$AH[n]=a}s&&!r&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class ot extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class rt extends tt{constructor(t,e,o,r,i){super(t,e,o,r,i),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??F)===j)return;const o=this._$AH,r=t===F&&o!==F||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,i=t!==F&&(o===F||r);r&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const st=$.litHtmlPolyfillSupport;st?.(J,Q),($.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let at=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const r=o?.renderBefore??e;let i=r._$litPart$;if(void 0===i){const t=o?.renderBefore??null;r._$litPart$=i=new Q(e.insertBefore(R(),t),t,void 0,o??{})}return i._$AI(t),i})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}};at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const lt=nt.litElementPolyfillSupport;lt?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:y},dt=(t=ht,e,o)=>{const{kind:r,metadata:i}=o;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),s.set(o.name,t),"accessor"===r){const{name:r}=o;return{set(o){const i=e.get.call(this);e.set.call(this,o),this.requestUpdate(r,i,t,!0,o)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=o;return function(o){const i=this[r];e.call(this,o),this.requestUpdate(r,i,t,!0,o)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return(e,o)=>"object"==typeof o?dt(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return pt({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function gt(t,e){return(e,o,r)=>((t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,o),o))(e,o,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const bt={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]};for(const t in bt)Object.freeze(bt[t]);var ft=Object.freeze(bt);const vt={};for(const t of Object.keys(ft))vt[ft[t]]=t;const mt={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},oklab:{channels:3,labels:["okl","oka","okb"]},lch:{channels:3,labels:"lch"},oklch:{channels:3,labels:["okl","okc","okh"]},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}},wt=(6/29)**3;function yt(t){const e=t>.0031308?1.055*t**(1/2.4)-.055:12.92*t;return Math.min(Math.max(0,e),1)}function xt(t){return t>.04045?((t+.055)/1.055)**2.4:t/12.92}for(const t of Object.keys(mt)){if(!("channels"in mt[t]))throw new Error("missing channels property: "+t);if(!("labels"in mt[t]))throw new Error("missing channel labels property: "+t);if(mt[t].labels.length!==mt[t].channels)throw new Error("channel and label counts mismatch: "+t);const{channels:e,labels:o}=mt[t];delete mt[t].channels,delete mt[t].labels,Object.defineProperty(mt[t],"channels",{value:e}),Object.defineProperty(mt[t],"labels",{value:o})}function kt(t,e){return(t[0]-e[0])**2+(t[1]-e[1])**2+(t[2]-e[2])**2}function $t(t){const e=function(){const t={},e=Object.keys(mt);for(let{length:o}=e,r=0;r<o;r++)t[e[r]]={distance:-1,parent:null};return t}(),o=[t];for(e[t].distance=0;o.length>0;){const t=o.pop(),r=Object.keys(mt[t]);for(let{length:i}=r,s=0;s<i;s++){const i=r[s],n=e[i];-1===n.distance&&(n.distance=e[t].distance+1,n.parent=t,o.unshift(i))}}return e}function Ct(t,e){return function(o){return e(t(o))}}function St(t,e){const o=[e[t].parent,t];let r=mt[e[t].parent][t],i=e[t].parent;for(;e[i].parent;)o.unshift(e[i].parent),r=Ct(mt[e[i].parent][i],r),i=e[i].parent;return r.conversion=o,r}function At(t){const e=$t(t),o={},r=Object.keys(e);for(let{length:t}=r,i=0;i<t;i++){const t=r[i];null!==e[t].parent&&(o[t]=St(t,e))}return o}mt.rgb.hsl=function(t){const e=t[0]/255,o=t[1]/255,r=t[2]/255,i=Math.min(e,o,r),s=Math.max(e,o,r),n=s-i;let a,l;switch(s){case i:a=0;break;case e:a=(o-r)/n;break;case o:a=2+(r-e)/n;break;case r:a=4+(e-o)/n}a=Math.min(60*a,360),a<0&&(a+=360);const c=(i+s)/2;return l=s===i?0:c<=.5?n/(s+i):n/(2-s-i),[a,100*l,100*c]},mt.rgb.hsv=function(t){let e,o,r,i,s;const n=t[0]/255,a=t[1]/255,l=t[2]/255,c=Math.max(n,a,l),h=c-Math.min(n,a,l),d=function(t){return(c-t)/6/h+.5};if(0===h)i=0,s=0;else{switch(s=h/c,e=d(n),o=d(a),r=d(l),c){case n:i=r-o;break;case a:i=1/3+e-r;break;case l:i=2/3+o-e}i<0?i+=1:i>1&&(i-=1)}return[360*i,100*s,100*c]},mt.rgb.hwb=function(t){const e=t[0],o=t[1];let r=t[2];const i=mt.rgb.hsl(t)[0],s=1/255*Math.min(e,Math.min(o,r));return r=1-1/255*Math.max(e,Math.max(o,r)),[i,100*s,100*r]},mt.rgb.oklab=function(t){const e=xt(t[0]/255),o=xt(t[1]/255),r=xt(t[2]/255),i=Math.cbrt(.4122214708*e+.5363325363*o+.0514459929*r),s=Math.cbrt(.2119034982*e+.6806995451*o+.1073969566*r),n=Math.cbrt(.0883024619*e+.2817188376*o+.6299787005*r);return[100*(.2104542553*i+.793617785*s-.0040720468*n),100*(1.9779984951*i-2.428592205*s+.4505937099*n),100*(.0259040371*i+.7827717662*s-.808675766*n)]},mt.rgb.cmyk=function(t){const e=t[0]/255,o=t[1]/255,r=t[2]/255,i=Math.min(1-e,1-o,1-r);return[100*((1-e-i)/(1-i)||0),100*((1-o-i)/(1-i)||0),100*((1-r-i)/(1-i)||0),100*i]},mt.rgb.keyword=function(t){const e=vt[t];if(e)return e;let o,r=Number.POSITIVE_INFINITY;for(const e of Object.keys(ft)){const i=kt(t,ft[e]);i<r&&(r=i,o=e)}return o},mt.keyword.rgb=function(t){return[...ft[t]]},mt.rgb.xyz=function(t){const e=xt(t[0]/255),o=xt(t[1]/255),r=xt(t[2]/255);return[100*(.4124564*e+.3575761*o+.1804375*r),100*(.2126729*e+.7151522*o+.072175*r),100*(.0193339*e+.119192*o+.9503041*r)]},mt.rgb.lab=function(t){const e=mt.rgb.xyz(t);let o=e[0],r=e[1],i=e[2];o/=95.047,r/=100,i/=108.883,o=o>wt?o**(1/3):7.787*o+16/116,r=r>wt?r**(1/3):7.787*r+16/116,i=i>wt?i**(1/3):7.787*i+16/116;return[116*r-16,500*(o-r),200*(r-i)]},mt.hsl.rgb=function(t){const e=t[0]/360,o=t[1]/100,r=t[2]/100;let i,s;if(0===o)return s=255*r,[s,s,s];const n=r<.5?r*(1+o):r+o-r*o,a=2*r-n,l=[0,0,0];for(let t=0;t<3;t++)i=e+1/3*-(t-1),i<0&&i++,i>1&&i--,s=6*i<1?a+6*(n-a)*i:2*i<1?n:3*i<2?a+(n-a)*(2/3-i)*6:a,l[t]=255*s;return l},mt.hsl.hsv=function(t){const e=t[0];let o=t[1]/100,r=t[2]/100,i=o;const s=Math.max(r,.01);r*=2,o*=r<=1?r:2-r,i*=s<=1?s:2-s;return[e,100*(0===r?2*i/(s+i):2*o/(r+o)),100*((r+o)/2)]},mt.hsv.rgb=function(t){const e=t[0]/60,o=t[1]/100;let r=t[2]/100;const i=Math.floor(e)%6,s=e-Math.floor(e),n=255*r*(1-o),a=255*r*(1-o*s),l=255*r*(1-o*(1-s));switch(r*=255,i){case 0:return[r,l,n];case 1:return[a,r,n];case 2:return[n,r,l];case 3:return[n,a,r];case 4:return[l,n,r];case 5:return[r,n,a]}},mt.hsv.hsl=function(t){const e=t[0],o=t[1]/100,r=t[2]/100,i=Math.max(r,.01);let s,n;n=(2-o)*r;const a=(2-o)*i;return s=o*i,s/=a<=1?a:2-a,s=s||0,n/=2,[e,100*s,100*n]},mt.hwb.rgb=function(t){const e=t[0]/360;let o=t[1]/100,r=t[2]/100;const i=o+r;let s;i>1&&(o/=i,r/=i);const n=Math.floor(6*e),a=1-r;s=6*e-n,1&n&&(s=1-s);const l=o+s*(a-o);let c,h,d;switch(n){default:case 6:case 0:c=a,h=l,d=o;break;case 1:c=l,h=a,d=o;break;case 2:c=o,h=a,d=l;break;case 3:c=o,h=l,d=a;break;case 4:c=l,h=o,d=a;break;case 5:c=a,h=o,d=l}return[255*c,255*h,255*d]},mt.cmyk.rgb=function(t){const e=t[0]/100,o=t[1]/100,r=t[2]/100,i=t[3]/100;return[255*(1-Math.min(1,e*(1-i)+i)),255*(1-Math.min(1,o*(1-i)+i)),255*(1-Math.min(1,r*(1-i)+i))]},mt.xyz.rgb=function(t){const e=t[0]/100,o=t[1]/100,r=t[2]/100;let i,s,n;return i=3.2404542*e+-1.5371385*o+-.4985314*r,s=-.969266*e+1.8760108*o+.041556*r,n=.0556434*e+-.2040259*o+1.0572252*r,i=yt(i),s=yt(s),n=yt(n),[255*i,255*s,255*n]},mt.xyz.lab=function(t){let e=t[0],o=t[1],r=t[2];e/=95.047,o/=100,r/=108.883,e=e>wt?e**(1/3):7.787*e+16/116,o=o>wt?o**(1/3):7.787*o+16/116,r=r>wt?r**(1/3):7.787*r+16/116;return[116*o-16,500*(e-o),200*(o-r)]},mt.xyz.oklab=function(t){const e=t[0]/100,o=t[1]/100,r=t[2]/100,i=Math.cbrt(.8189330101*e+.3618667424*o-.1288597137*r),s=Math.cbrt(.0329845436*e+.9293118715*o+.0361456387*r),n=Math.cbrt(.0482003018*e+.2643662691*o+.633851707*r);return[100*(.2104542553*i+.793617785*s-.0040720468*n),100*(1.9779984951*i-2.428592205*s+.4505937099*n),100*(.0259040371*i+.7827717662*s-.808675766*n)]},mt.oklab.oklch=function(t){return mt.lab.lch(t)},mt.oklab.xyz=function(t){const e=t[0]/100,o=t[1]/100,r=t[2]/100,i=(.999999998*e+.396337792*o+.215803758*r)**3,s=(1.000000008*e-.105561342*o-.063854175*r)**3,n=(1.000000055*e-.089484182*o-1.291485538*r)**3;return[100*(1.227013851*i-.55779998*s+.281256149*n),100*(-.040580178*i+1.11225687*s-.071676679*n),100*(-.076381285*i-.421481978*s+1.58616322*n)]},mt.oklab.rgb=function(t){const e=t[0]/100,o=t[1]/100,r=t[2]/100,i=(e+.3963377774*o+.2158037573*r)**3,s=(e-.1055613458*o-.0638541728*r)**3,n=(e-.0894841775*o-1.291485548*r)**3;return[255*yt(4.0767416621*i-3.3077115913*s+.2309699292*n),255*yt(-1.2684380046*i+2.6097574011*s-.3413193965*n),255*yt(-.0041960863*i-.7034186147*s+1.707614701*n)]},mt.oklch.oklab=function(t){return mt.lch.lab(t)},mt.lab.xyz=function(t){let e,o,r;o=(t[0]+16)/116,e=t[1]/500+o,r=o-t[2]/200;const i=o**3,s=e**3,n=r**3;return o=i>wt?i:(o-16/116)/7.787,e=s>wt?s:(e-16/116)/7.787,r=n>wt?n:(r-16/116)/7.787,e*=95.047,o*=100,r*=108.883,[e,o,r]},mt.lab.lch=function(t){const e=t[0],o=t[1],r=t[2];let i;i=360*Math.atan2(r,o)/2/Math.PI,i<0&&(i+=360);return[e,Math.sqrt(o*o+r*r),i]},mt.lch.lab=function(t){const e=t[0],o=t[1],r=t[2]/360*2*Math.PI;return[e,o*Math.cos(r),o*Math.sin(r)]},mt.rgb.ansi16=function(t,e=null){const[o,r,i]=t;let s=null===e?mt.rgb.hsv(t)[2]:e;if(s=Math.round(s/50),0===s)return 30;let n=30+(Math.round(i/255)<<2|Math.round(r/255)<<1|Math.round(o/255));return 2===s&&(n+=60),n},mt.hsv.ansi16=function(t){return mt.rgb.ansi16(mt.hsv.rgb(t),t[2])},mt.rgb.ansi256=function(t){const e=t[0],o=t[1],r=t[2];if(e>>4==o>>4&&o>>4==r>>4)return e<8?16:e>248?231:Math.round((e-8)/247*24)+232;return 16+36*Math.round(e/255*5)+6*Math.round(o/255*5)+Math.round(r/255*5)},mt.ansi16.rgb=function(t){let e=(t=t[0])%10;if(0===e||7===e)return t>50&&(e+=3.5),e=e/10.5*255,[e,e,e];const o=.5*(Math.trunc(t>50)+1);return[(1&e)*o*255,(e>>1&1)*o*255,(e>>2&1)*o*255]},mt.ansi256.rgb=function(t){if((t=t[0])>=232){const e=10*(t-232)+8;return[e,e,e]}let e;t-=16;return[Math.floor(t/36)/5*255,Math.floor((e=t%36)/6)/5*255,e%6/5*255]},mt.rgb.hex=function(t){const e=(((255&Math.round(t[0]))<<16)+((255&Math.round(t[1]))<<8)+(255&Math.round(t[2]))).toString(16).toUpperCase();return"000000".slice(e.length)+e},mt.hex.rgb=function(t){const e=t.toString(16).match(/[a-f\d]{6}|[a-f\d]{3}/i);if(!e)return[0,0,0];let o=e[0];3===e[0].length&&(o=[...o].map(t=>t+t).join(""));const r=Number.parseInt(o,16);return[r>>16&255,r>>8&255,255&r]},mt.rgb.hcg=function(t){const e=t[0]/255,o=t[1]/255,r=t[2]/255,i=Math.max(Math.max(e,o),r),s=Math.min(Math.min(e,o),r),n=i-s;let a;return a=n<=0?0:i===e?(o-r)/n%6:i===o?2+(r-e)/n:4+(e-o)/n,a/=6,a%=1,[360*a,100*n,100*(n<1?s/(1-n):0)]},mt.hsl.hcg=function(t){const e=t[1]/100,o=t[2]/100,r=o<.5?2*e*o:2*e*(1-o);let i=0;return r<1&&(i=(o-.5*r)/(1-r)),[t[0],100*r,100*i]},mt.hsv.hcg=function(t){const e=t[1]/100,o=t[2]/100,r=e*o;let i=0;return r<1&&(i=(o-r)/(1-r)),[t[0],100*r,100*i]},mt.hcg.rgb=function(t){const e=t[0]/360,o=t[1]/100,r=t[2]/100;if(0===o)return[255*r,255*r,255*r];const i=[0,0,0],s=e%1*6,n=s%1,a=1-n;let l=0;switch(Math.floor(s)){case 0:i[0]=1,i[1]=n,i[2]=0;break;case 1:i[0]=a,i[1]=1,i[2]=0;break;case 2:i[0]=0,i[1]=1,i[2]=n;break;case 3:i[0]=0,i[1]=a,i[2]=1;break;case 4:i[0]=n,i[1]=0,i[2]=1;break;default:i[0]=1,i[1]=0,i[2]=a}return l=(1-o)*r,[255*(o*i[0]+l),255*(o*i[1]+l),255*(o*i[2]+l)]},mt.hcg.hsv=function(t){const e=t[1]/100,o=e+t[2]/100*(1-e);let r=0;return o>0&&(r=e/o),[t[0],100*r,100*o]},mt.hcg.hsl=function(t){const e=t[1]/100,o=t[2]/100*(1-e)+.5*e;let r=0;return o>0&&o<.5?r=e/(2*o):o>=.5&&o<1&&(r=e/(2*(1-o))),[t[0],100*r,100*o]},mt.hcg.hwb=function(t){const e=t[1]/100,o=e+t[2]/100*(1-e);return[t[0],100*(o-e),100*(1-o)]},mt.hwb.hcg=function(t){const e=t[1]/100,o=1-t[2]/100,r=o-e;let i=0;return r<1&&(i=(o-r)/(1-r)),[t[0],100*r,100*i]},mt.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]},mt.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]},mt.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]},mt.gray.hsl=function(t){return[0,0,t[0]]},mt.gray.hsv=mt.gray.hsl,mt.gray.hwb=function(t){return[0,100,t[0]]},mt.gray.cmyk=function(t){return[0,0,0,t[0]]},mt.gray.lab=function(t){return[t[0],0,0]},mt.gray.hex=function(t){const e=255&Math.round(t[0]/100*255),o=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".slice(o.length)+o},mt.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]};const _t={},Mt=Object.keys(mt);function Et(t){const e=function(...e){const o=e[0];return null==o?o:(o.length>1&&(e=o),t(e))};return"conversion"in t&&(e.conversion=t.conversion),e}function Ht(t){const e=function(...e){const o=e[0];if(null==o)return o;o.length>1&&(e=o);const r=t(e);if("object"==typeof r)for(let{length:t}=r,e=0;e<t;e++)r[e]=Math.round(r[e]);return r};return"conversion"in t&&(e.conversion=t.conversion),e}for(const t of Mt){_t[t]={},Object.defineProperty(_t[t],"channels",{value:mt[t].channels}),Object.defineProperty(_t[t],"labels",{value:mt[t].labels});const e=At(t),o=Object.keys(e);for(const r of o){const o=e[r];_t[t][r]=Ht(o),_t[t][r].raw=Et(o)}}function Lt(t,e,o){return t+(e-t)*o}function Rt(t,e,o){return Math.max(e,Math.min(o,t))}var It,Ot;function Tt(t,e,o,r=!1){const i=_t[t][e];return r&&i.raw?i.raw(o):i(o)}!function(t){t.RGB255="rgb255",t.RGB01="rgb01",t.HEX="hex",t.HSV="hsv",t.HSL="hsl",t.LCH="lch"}(It||(It={}));class Nt{constructor(t={type:It.RGB255,r:0,g:0,b:0}){t.type===It.RGB255?this.conversionInput=[Rt(t.r,0,255),Rt(t.g,0,255),Rt(t.b,0,255)]:t.type===It.RGB01?this.conversionInput=[Rt(Math.round(255*t.r),0,255),Rt(Math.round(255*t.g),0,255),Rt(Math.round(255*t.b),0,255)]:t.type===It.HEX?this.conversionInput=t.hex:t.type===It.HSV?this.conversionInput=[t.h,t.s,t.v]:t.type===It.HSL?this.conversionInput=[t.h,t.s,t.l]:t.type===It.LCH&&(this.conversionInput=[t.l,t.c,t.h]),this.input=t,Object.freeze(this)}get model(){switch(this.input.type){case It.HEX:return"hex";case It.HSV:return"hsv";case It.HSL:return"hsl";case It.LCH:return"lch";case It.RGB255:case It.RGB01:default:return"rgb"}}getRGB255(){const t=this.input;return t.type===It.RGB255?[t.r,t.g,t.b]:t.type===It.RGB01?[Math.round(255*t.r),Math.round(255*t.g),Math.round(255*t.b)]:Tt(this.model,"rgb",this.conversionInput)}getRGB01(){const t=this.input;return t.type===It.RGB255?[t.r/255,t.g/255,t.b/255]:t.type===It.RGB01?[t.r,t.g,t.b]:this.getRGB255().map(t=>t/255)}getHex(){const t=this.input;return t.type===It.HEX?t.hex:Tt(this.model,"hex",this.conversionInput)}getHSV(t=!0){const e=this.input;if(e.type===It.HSV){const o=[e.h,e.s,e.v];return t?o:o.map(t=>Math.round(t))}return Tt(this.model,"hsv",this.conversionInput,t)}getHSL(t=!0){const e=this.input;if(e.type===It.HSL){const o=[e.h,e.s,e.l];return t?o:o.map(t=>Math.round(t))}return Tt(this.model,"hsl",this.conversionInput,t)}getLCH(t=!0){const e=this.input;if(e.type===It.LCH){const o=[e.l,e.c,e.h];return t?o:o.map(t=>Math.round(t))}return Tt(this.model,"lch",this.conversionInput,t)}toCSS(){return`rgba(${this.getRGB255().join(", ")})`}static fromRGB255Array(t){return new Nt({type:It.RGB255,r:t[0],g:t[1],b:t[2]})}}function Gt(t,e,o,r=!1){const i=t.getHSL(),s=e.getHSL(),n=Math.abs(i[0]-s[0])>180,a=r?!n:n,l=Lt(i[0]+360*Number(a&&i[0]<s[0]),s[0]+360*Number(a&&s[0]<i[0]),o);return new Nt({type:It.HSL,h:l,s:Lt(i[1],s[1],o),l:Lt(i[2],s[2],o)})}!function(t){t.RGB="rgb",t.HSV="hsv",t.HSL="hsl",t.HSL_FLIP="hsl_flip",t.LCH="lch"}(Ot||(Ot={}));const Bt={[Ot.RGB]:function(t,e,o){const[r,i,s]=t.getRGB01(),[n,a,l]=e.getRGB01();return new Nt({type:It.RGB01,r:Lt(r,n,o),g:Lt(i,a,o),b:Lt(s,l,o)})},[Ot.HSV]:function(t,e,o){const r=t.getHSV(),i=e.getHSV();return new Nt({type:It.HSV,h:Lt(r[0],i[0],o),s:Lt(r[1],i[1],o),v:Lt(r[2],i[2],o)})},[Ot.HSL]:(t,e,o)=>Gt(t,e,o,!1),[Ot.HSL_FLIP]:(t,e,o)=>Gt(t,e,o,!0),[Ot.LCH]:function(t,e,o){const r=t.getLCH(),i=e.getLCH();return new Nt({type:It.LCH,l:Lt(r[0],i[0],o),c:Lt(r[1],i[1],o),h:Lt(r[2],i[2],o)})}};function zt(t,e,o,r=Ot.RGB){return Bt[r](t,e,o)}class Dt{constructor(t=new Nt({type:It.RGB01,r:1,g:0,b:0}),e=new Nt({type:It.RGB01,r:1,g:1,b:1})){this.colors=[],this.positions=[],this.addColorStop(0,t),this.addColorStop(1,e)}setColorStop(t,e){const o=this.positions.indexOf(t);-1===o?this.addColorStop(t,e):this.colors[o]=e}addColorStop(t,e){let o=0;for(;o<this.positions.length&&this.positions[o]<t;)o++;this.positions.splice(o,0,t),this.colors.splice(o,0,e)}getColorAt(t,e){if(0===this.colors.length)return new Nt;if(1===this.colors.length)return this.colors[0];let o=0;for(;o<this.positions.length&&t>this.positions[o];)o++;if(0===o)return this.colors[0];if(o===this.positions.length)return this.colors[this.colors.length-1];const r=this.positions[o-1],i=this.positions[o];return zt(this.colors[o-1],this.colors[o],(t-r)/(i-r),e)}getBackgroundImageStyle(t=Ot.RGB){if(2===this.colors.length&&0===this.positions[0]&&1===this.positions[1])return`linear-gradient(to right, ${this.colors[0].toCSS()}, ${this.colors[1].toCSS()})`;let e="linear-gradient(to right";for(let o=0;o<=100;o++)e+=", "+this.getColorAt(o/100,t).toCSS()+" "+o+"%";return e+=")",e}}const Pt=n`.color-selection {
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
`,Ut=n`/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-border-style:solid;--tw-font-weight:initial;--tw-tracking:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial}}}@layer theme{:root,:host{--font-sans:"Google Sans Flex", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-green-600:oklch(62.7% .194 149.214);--color-blue-600:oklch(54.6% .245 262.881);--color-blue-800:oklch(42.4% .199 265.638);--color-slate-300:oklch(86.9% .022 252.894);--color-slate-800:oklch(27.9% .041 260.031);--color-slate-900:oklch(20.8% .042 265.755);--color-gray-500:oklch(55.1% .027 264.364);--color-gray-600:oklch(44.6% .03 256.802);--color-gray-700:oklch(37.3% .034 259.733);--color-gray-800:oklch(27.8% .033 256.848);--color-white:#fff;--spacing:.25rem;--container-xs:20rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--text-lg:1.125rem;--text-lg--line-height:calc(1.75 / 1.125);--font-weight-medium:500;--font-weight-semibold:600;--font-weight-bold:700;--tracking-wider:.05em;--radius-md:.375rem;--radius-lg:.5rem;--blur-md:12px;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.relative{position:relative}.static{position:static}.container{width:100%}@media (min-width:40rem){.container{max-width:40rem}}@media (min-width:48rem){.container{max-width:48rem}}@media (min-width:64rem){.container{max-width:64rem}}@media (min-width:80rem){.container{max-width:80rem}}@media (min-width:96rem){.container{max-width:96rem}}.mx-auto{margin-inline:auto}.my-0{margin-block:0}.my-2{margin-block:calc(var(--spacing) * 2)}.mt-1{margin-top:var(--spacing)}.mt-3{margin-top:calc(var(--spacing) * 3)}.mb-2{margin-bottom:calc(var(--spacing) * 2)}.mb-3{margin-bottom:calc(var(--spacing) * 3)}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.h-6{height:calc(var(--spacing) * 6)}.h-8{height:calc(var(--spacing) * 8)}.w-12{width:calc(var(--spacing) * 12)}.w-full{width:100%}.max-w-xs{max-width:var(--container-xs)}.flex-1{flex:1}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.cursor-crosshair{cursor:crosshair}.cursor-pointer{cursor:pointer}.list-inside{list-style-position:inside}.list-disc{list-style-type:disc}.flex-col{flex-direction:column}.items-center{align-items:center}.items-stretch{align-items:stretch}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-1{gap:var(--spacing)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-3{gap:calc(var(--spacing) * 3)}.gap-6{gap:calc(var(--spacing) * 6)}:where(.space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)))}.overflow-hidden{overflow:hidden}.overflow-visible{overflow:visible}.rounded{border-radius:.25rem}.rounded-lg{border-radius:var(--radius-lg)}.rounded-md{border-radius:var(--radius-md)}.border{border-style:var(--tw-border-style);border-width:1px}.border-none{--tw-border-style:none;border-style:none}.bg-slate-800{background-color:var(--color-slate-800)}.bg-transparent{background-color:#0000}.bg-white{background-color:var(--color-white)}.bg-white\\/30{background-color:#ffffff4d}@supports (color:color-mix(in lab, red, red)){.bg-white\\/30{background-color:color-mix(in oklab, var(--color-white) 30%, transparent)}}.bg-white\\/40{background-color:#fff6}@supports (color:color-mix(in lab, red, red)){.bg-white\\/40{background-color:color-mix(in oklab, var(--color-white) 40%, transparent)}}.bg-white\\/50{background-color:#ffffff80}@supports (color:color-mix(in lab, red, red)){.bg-white\\/50{background-color:color-mix(in oklab, var(--color-white) 50%, transparent)}}.p-1{padding:var(--spacing)}.p-1\\.5{padding:calc(var(--spacing) * 1.5)}.px-2{padding-inline:calc(var(--spacing) * 2)}.px-2\\.5{padding-inline:calc(var(--spacing) * 2.5)}.px-3{padding-inline:calc(var(--spacing) * 3)}.px-4{padding-inline:calc(var(--spacing) * 4)}.py-1{padding-block:var(--spacing)}.py-1\\.5{padding-block:calc(var(--spacing) * 1.5)}.py-2{padding-block:calc(var(--spacing) * 2)}.text-center{text-align:center}.text-left{text-align:left}.text-right{text-align:right}.font-mono{font-family:var(--font-mono)}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\[10px\\]{font-size:10px}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-wider{--tw-tracking:var(--tracking-wider);letter-spacing:var(--tracking-wider)}.text-blue-600{color:var(--color-blue-600)}.text-gray-500{color:var(--color-gray-500)}.text-gray-600{color:var(--color-gray-600)}.text-gray-700{color:var(--color-gray-700)}.text-gray-800{color:var(--color-gray-800)}.text-green-600{color:var(--color-green-600)}.text-slate-300{color:var(--color-slate-300)}.text-slate-900{color:var(--color-slate-900)}.uppercase{text-transform:uppercase}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-inner{--tw-shadow:inset 0 2px 4px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-xs{--tw-shadow:0 1px 2px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-blue-600{--tw-ring-color:var(--color-blue-600)}.backdrop-blur-md{--tw-backdrop-blur:blur(var(--blur-md));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.outline-none{--tw-outline-style:none;outline-style:none}.file\\:mr-3::file-selector-button{margin-right:calc(var(--spacing) * 3)}.file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.file\\:bg-white\\/80::file-selector-button{background-color:#fffc}@supports (color:color-mix(in lab, red, red)){.file\\:bg-white\\/80::file-selector-button{background-color:color-mix(in oklab, var(--color-white) 80%, transparent)}}.file\\:px-3::file-selector-button{padding-inline:calc(var(--spacing) * 3)}.file\\:py-1\\.5::file-selector-button{padding-block:calc(var(--spacing) * 1.5)}.file\\:text-xs::file-selector-button{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.file\\:font-semibold::file-selector-button{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.file\\:text-gray-800::file-selector-button{color:var(--color-gray-800)}@media (hover:hover){.hover\\:bg-white\\/50:hover{background-color:#ffffff80}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-white\\/50:hover{background-color:color-mix(in oklab, var(--color-white) 50%, transparent)}}.hover\\:text-blue-800:hover{color:var(--color-blue-800)}.hover\\:text-white:hover{color:var(--color-white)}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:file\\:bg-white:hover::file-selector-button{background-color:var(--color-white)}}.focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}}:host{font-optical-sizing:auto;font-family:Google Sans Flex,sans-serif}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}
`;class Vt extends Event{constructor(t){super(Vt.eventName,{bubbles:!0,composed:!0}),this.color=t}}Vt.eventName="set-color";class jt extends Event{constructor(t){super(jt.eventName,{bubbles:!0,composed:!0}),this.color=t}}jt.eventName="commit-color";class Ft extends Event{constructor(t){super(Ft.eventName,{bubbles:!0,composed:!0}),this.active=t}}function Xt(t,e){try{const o=localStorage.getItem(t);return null===o?e:JSON.parse(o)}catch{return e}}function qt(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}Ft.eventName="set-interpolation-active";class Wt{constructor(t,e){this.options=e,this.handleMouseDown=t=>{this.options.onDragStart?.(t),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp)},this.handleMouseMove=t=>{this.options.onDrag(t)},this.handleMouseUp=()=>{document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp),this.options.onDragEnd?.()},t.addController(this)}hostDisconnected(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}let Yt=class extends at{constructor(){super(...arguments),this.position=0,this.color="#ffffff"}updated(){this.style.left=`${this.position}%`}render(){return V`
      <div
        class="color-bar-pointer-capsule"
        style="background-color: ${this.color};"
      ></div>
    `}};var Jt;Yt.styles=n`
    :host {
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      height: 100%;
      width: 0;
      pointer-events: none;
      z-index: 10;
    }
    .color-bar-pointer-capsule {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-50%, -50%);
      width: 0.55rem;
      height: calc(100% + 0.3rem);
      border-radius: 9999px;
      border: 2px solid #ffffff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
      pointer-events: none;
      box-sizing: border-box;
    }
  `,t([pt({type:Number})],Yt.prototype,"position",void 0),t([pt({type:String})],Yt.prototype,"color",void 0),Yt=t([ct("color-bar-pointer")],Yt),function(t){t.LEFT="left",t.RIGHT="right",t.NONE="none"}(Jt||(Jt={}));const Kt="color-interpolation-ui-store";let Zt=class extends at{constructor(){super(...arguments),this.activeColor=Jt.NONE,this.leftColor=new Nt,this.rightColor=new Nt,this.activeLerpMode=null,this.activeRatio=.5,this.gradients=[{type:"RGB"},{type:"HSL"},{typeName:"HSL*",type:"HSL_FLIP"},{type:"LCH"}],this.colorGradient=new Dt,this.handleExternalColor=()=>{this.isInternalDrag||null===this.activeLerpMode||(this.activeLerpMode=null,this.saveUIState())},this.lastCommittedColor=this.leftColor,this.selectedGradientDiv=null,this.isInternalDrag=!1,this.processDrag=t=>{if(this.selectedGradientDiv){const e=this.selectedGradientDiv.getAttribute("data-mode")||"",o=this.selectedGradientDiv.getBoundingClientRect(),r=Rt((t.clientX-o.left)/o.width,0,1),i=Ot[e.toUpperCase()],s=this.colorGradient.getColorAt(r,i);this.activeRatio=r,this.activeLerpMode=e,this.saveUIState(),this.setActiveColor(Jt.NONE),this.isInternalDrag=!0,this.setColor(s),this.isInternalDrag=!1}},this.drag=new Wt(this,{onDragStart:t=>{this.selectedGradientDiv=t.currentTarget,this.processDrag(t)},onDrag:t=>{this.processDrag(t)},onDragEnd:()=>{this.selectedGradientDiv=null,this.commitColor()}})}connectedCallback(){super.connectedCallback(),window.addEventListener(Vt.eventName,this.handleExternalColor)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(Vt.eventName,this.handleExternalColor)}setColor(t){this.lastCommittedColor=t,this.dispatchEvent(new Vt(t))}commitColor(){this.dispatchEvent(new jt(this.lastCommittedColor))}setActiveColor(t){this.dispatchEvent(new Ft(t))}setActiveColorLeft(){this.setActiveColor(this.activeColor===Jt.LEFT?Jt.NONE:Jt.LEFT)}setActiveColorRight(){this.setActiveColor(this.activeColor===Jt.RIGHT?Jt.NONE:Jt.RIGHT)}firstUpdated(){this.loadUIState()}saveUIState(){qt(Kt,{activeLerpMode:this.activeLerpMode,activeRatio:this.activeRatio})}loadUIState(){const t=Xt(Kt,null);t&&(void 0!==t.activeLerpMode&&(this.activeLerpMode=t.activeLerpMode),void 0!==t.activeRatio&&(this.activeRatio=t.activeRatio))}render(){return this.colorGradient=new Dt(this.leftColor,this.rightColor),V`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">
        Color Interpolation
      </h5>
      <div class="flex justify-center gap-6 my-2">
        <div
          class="color-selection cursor-pointer ${this.activeColor===Jt.LEFT?"active ring-2 ring-blue-600":""}"
          @click=${this.setActiveColorLeft}
          style="background: #${this.leftColor.getHex()}"
        ></div>
        <div
          class="color-selection cursor-pointer ${this.activeColor===Jt.RIGHT?"active ring-2 ring-blue-600":""}"
          @click=${this.setActiveColorRight}
          style="background: #${this.rightColor.getHex()}"
        ></div>
      </div>
      <div class="flex flex-col gap-2 mt-3">
        ${this.gradients.map(t=>{const e=Ot[t.type],o=this.activeLerpMode===e,r=o?"#"+this.colorGradient.getColorAt(this.activeRatio,e).getHex():"#ffffff";return V`
            <div class="flex items-center gap-3">
              <span class="w-12 text-left font-bold text-xs text-gray-700"
                >${t.typeName||t.type}</span
              >
              <div
                class="gradient flex-1 rounded relative overflow-visible cursor-crosshair h-6 shadow-inner"
                style="background: ${this.colorGradient.getBackgroundImageStyle(e)}"
                data-mode=${e}
                @mousedown=${this.drag.handleMouseDown}
              >
                ${o?V`<color-bar-pointer
                        .position=${100*this.activeRatio}
                        .color=${r}
                      ></color-bar-pointer>`:""}
              </div>
            </div>
          `})}
      </div>
    `}};Zt.styles=[Ut,Pt],t([pt()],Zt.prototype,"activeColor",void 0),t([pt({attribute:!1})],Zt.prototype,"leftColor",void 0),t([pt({attribute:!1})],Zt.prototype,"rightColor",void 0),t([ut()],Zt.prototype,"activeLerpMode",void 0),t([ut()],Zt.prototype,"activeRatio",void 0),t([pt({attribute:!1})],Zt.prototype,"gradients",void 0),Zt=t([ct("color-interpolation")],Zt);const Qt=n`:host {
  width: 100%;
  flex: 1;
}

.main-container {
  display: flex;
  flex-wrap: wrap;
  --gap: 1rem;
  gap: var(--gap);
  padding: var(--gap);
}

::slotted(*) {
  border-radius: 1.25rem;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  padding: 1rem;
  text-align: center;
  flex: 1 1 28%;
  min-width: 10rem;
  display: flex;
  flex-direction: column;
}`;class te extends Event{constructor(t){super(te.eventName,{bubbles:!0,composed:!0}),this.coordinates=t}}te.eventName="set-coordinates";const ee=n`:host {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
}

.color-grad-container {
  width: 100%;
  position: relative;
  min-height: 10rem;
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
  border-radius: 0.375rem;
  overflow: hidden;
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
  transform: translate(-50%, -50%);
}

.color-bar {
  position: relative;
  width: 100%;
  height: 1.5rem;
  margin-top: 0.5rem;
  border-radius: 0.25rem;
  background: linear-gradient(in hsl to right,
      #f00 0%,
      #ff0 17%,
      #0f0 33%,
      #0ff 50%,
      #00f 66%,
      #f0f 83%,
      #f00 100%);
}`;class oe extends at{constructor(){super(...arguments),this.color=new Nt,this.lastCommittedColor=this.color}setColor(t){this.lastCommittedColor=t,this.dispatchEvent(new Vt(t))}commitColor(){this.dispatchEvent(new jt(this.lastCommittedColor))}}t([pt({attribute:!1})],oe.prototype,"color",void 0);let re=class extends oe{constructor(){super(...arguments),this.drag=new Wt(this,{onDrag:t=>{const[,e,o]=this.color.getHSV(),r=this.colorBar.getBoundingClientRect(),i=360*Rt((t.clientX-r.left)/r.width,0,1);this.setColor(new Nt({type:It.HSV,h:i,s:e,v:o}))},onDragEnd:()=>{this.commitColor()}})}render(){const[t]=this.color.getHSV(),e="#"+new Nt({type:It.HSV,h:t,s:100,v:100}).getHex();return V`
      <div
        class="color-bar"
        @mousedown=${this.drag.handleMouseDown}
        id="color-bar"
      >
        <color-bar-pointer
          .position=${t/360*100}
          .color=${e}
        ></color-bar-pointer>
      </div>
    `}};re.styles=[ee],t([gt("#color-bar")],re.prototype,"colorBar",void 0),re=t([ct("color-selection-hsv-bar")],re);let ie=class extends oe{constructor(){super(...arguments),this.drag=new Wt(this,{onDrag:t=>{const[e]=this.color.getHSV(),o=this.colorGradContainer.getBoundingClientRect(),r=100*Rt((t.clientX-o.left)/o.width,0,1),i=100*(1-Rt((t.clientY-o.top)/o.height,0,1));this.setColor(new Nt({type:It.HSV,h:e,s:r,v:i}))},onDragEnd:()=>{this.commitColor()}})}render(){const[t,e,o]=this.color.getHSV(),r=`linear-gradient(to right, #FFF 0%, ${"#"+new Nt({type:It.HSV,h:t,s:100,v:100}).getHex()} 100%)`,i=`\n      top: ${100*(1-o/100)}%;\n      left: ${e/100*100}%;\n      background-color: #${this.color.getHex()};\n      border-color: ${o<50?"white":"black"};\n    `;return V`
      <div class="color-grad-container" id="color-grad-container">
        <div
          class="color-grad color-grad-1"
          style="background: ${r};"
        ></div>
        <div
          class="color-grad color-grad-2"
          @mousedown=${this.drag.handleMouseDown}
        ></div>
        <div class="color-grad-circle" style=${i}></div>
      </div>
    `}};ie.styles=[ee,n`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        flex: 1;
      }
    `],t([gt("#color-grad-container")],ie.prototype,"colorGradContainer",void 0),ie=t([ct("color-selection-hsv-grad")],ie);let se=class extends at{constructor(){super(...arguments),this.color=new Nt}render(){return V`
      <color-selection-hsv-grad .color=${this.color}></color-selection-hsv-grad>
      <color-selection-hsv-bar .color=${this.color}></color-selection-hsv-bar>
    `}};se.styles=[ee],t([pt({attribute:!1})],se.prototype,"color",void 0),se=t([ct("color-selection-hsv")],se);let ne=class extends oe{constructor(){super(...arguments),this.drag=new Wt(this,{onDrag:t=>{const e=this.colorGrad.getBoundingClientRect(),o=t.clientX-e.left-e.width/2,r=t.clientY-e.top-e.height/2,i=Math.sqrt(o*o+r*r)/(e.width/2),s=Math.min(i,1),n=(Math.atan2(r,o)*(180/Math.PI)+90+360)%360;this.setColor(new Nt({type:It.HSL,h:n,s:100*s,l:50}))},onDragEnd:()=>{this.commitColor()}})}render(){const[t,e]=this.color.getHSL(),o=.5*e/100,r=3*Math.PI/2+t*(Math.PI/180),i=Math.cos(r)*o,s=`\n            top: ${50+100*(Math.sin(r)*o)}%;\n            left: ${50+100*i}%;\n            background-color: #${new Nt({type:It.HSL,h:t,s:e,l:50}).getHex()};\n        `;return V`
      <div
        class="color-grad"
        id="color-grad"
        style=${"\n          background-image: radial-gradient(\n            circle at center,\n            hsl(0, 0%, 50%, 1) 0%,\n            hsl(0, 100%, 0%, 0) 70%\n          ),\n          conic-gradient(\n            in hsl shorter hue,\n            hsl(0, 100%, 50%),\n            /* Red */ hsl(60, 100%, 50%),\n            /* Yellow */ hsl(120, 100%, 50%),\n            /* Lime */ hsl(180, 100%, 50%),\n            /* Cyan */ hsl(240, 100%, 50%),\n            /* Blue */ hsl(300, 100%, 50%),\n            /* Magenta */ hsl(360, 100%, 50%)\n          );"}
        @mousedown=${this.drag.handleMouseDown}
      >
        <div class="color-grad-circle" style=${s}></div>
      </div>
    `}};ne.styles=[n`
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
    `],t([gt("#color-grad")],ne.prototype,"colorGrad",void 0),ne=t([ct("color-selection-hsl-wheel")],ne);let ae=class extends oe{constructor(){super(...arguments),this.drag=new Wt(this,{onDrag:t=>{const[e,o]=this.color.getHSL(),r=this.colorBar.getBoundingClientRect(),i=100*Rt((t.clientX-r.left)/r.width,0,1);this.setColor(new Nt({type:It.HSL,h:e,s:o,l:i}))},onDragEnd:()=>{this.commitColor()}})}render(){const[t,e,o]=this.color.getHSL(),r="#"+this.color.getHex(),i=["background: linear-gradient(","to right,"];for(let o=0;o<=100;o++)i.push(`hsl(${t}deg, ${e}%, ${o}%) ${o}%`+(o<100?",":""));i.push(");");const s=i.join("\n");return V`
      <div
        class="color-bar"
        @mousedown=${this.drag.handleMouseDown}
        id="color-bar"
        style=${s}
      >
        <color-bar-pointer
          .position=${o}
          .color=${r}
        ></color-bar-pointer>
      </div>
    `}};ae.styles=n`
    .color-bar {
      position: relative;
      width: 100%;
      height: 1.5rem;
      margin-top: 0.5rem;
      border-radius: 0.25rem;
    }
  `,t([gt("#color-bar")],ae.prototype,"colorBar",void 0),ae=t([ct("color-selection-hsl-bar")],ae);let le=class extends at{constructor(){super(...arguments),this.color=new Nt}render(){return V`
      <color-selection-hsl-wheel
        .color=${this.color}
      ></color-selection-hsl-wheel>
      <color-selection-hsl-bar .color=${this.color}></color-selection-hsl-bar>
    `}};var ce;le.styles=[n`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 20rem;
        margin: 0 auto;
      }
    `],t([pt({attribute:!1})],le.prototype,"color",void 0),le=t([ct("color-selection-hsl")],le),function(t){t.HSV="HSV",t.HSL_WHEEL="HSL_WHEEL"}(ce||(ce={}));let he=class extends at{constructor(){super(...arguments),this.color=new Nt,this.colorSelectionType=ce.HSV}getColorSelectionHtml(){return this.colorSelectionType===ce.HSV?V`<color-selection-hsv
        class="w-full flex-1 flex flex-col"
        .color=${this.color}
      ></color-selection-hsv>`:V`<color-selection-hsl
        class="w-full flex-1 flex flex-col my-0 mx-auto"
        .color=${this.color}
      ></color-selection-hsl>`}render(){const t=this.colorSelectionType===ce.HSV;return V`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Selection</h5>
      <div
        class="inline-flex rounded-lg bg-slate-800 p-1 mb-3 w-full max-w-xs mx-auto"
      >
        <button
          type="button"
          class="flex-1 py-1.5 px-3 text-xs font-semibold rounded-md transition-all ${t?"bg-white text-slate-900 shadow-xs":"text-slate-300 hover:text-white"}"
          @click=${()=>{this.colorSelectionType=ce.HSV}}
        >
          HSV
        </button>
        <button
          type="button"
          class="flex-1 py-1.5 px-3 text-xs font-semibold rounded-md transition-all ${t?"text-slate-300 hover:text-white":"bg-white text-slate-900 shadow-xs"}"
          @click=${()=>{this.colorSelectionType=ce.HSL_WHEEL}}
        >
          HSL Wheel
        </button>
      </div>
      ${this.getColorSelectionHtml()}
    `}};he.styles=[Ut,n`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
    `],t([pt({attribute:!1})],he.prototype,"color",void 0),t([pt({attribute:!1})],he.prototype,"colorSelectionType",void 0),he=t([ct("color-selection")],he);const de=n`.inputs-container {
  gap: 0.25rem;
}

table > * {
  --bs-table-bg: transparent;
}
`;class pe extends Event{constructor(t,e){super(pe.eventName,{bubbles:!0,composed:!0}),this.inputType=t,this.value=e}}var ue;pe.eventName="color-converter-input",function(t){t.HEX="HEX",t.RGB255="RGB255",t.RGB01="RGB01",t.HSV="HSV",t.HSL="HSL"}(ue||(ue={}));const ge={[ue.HEX]:"Hex",[ue.RGB255]:"RGB (0-255)",[ue.RGB01]:"RGB (0-1)",[ue.HSV]:"HSV",[ue.HSL]:"HSL"},be={[ue.HEX]:"hexValue",[ue.RGB255]:"rgb255Value",[ue.RGB01]:"rgb01Value",[ue.HSV]:"hsvValue",[ue.HSL]:"hslValue"},fe={[ue.HEX]:t=>"#"+t.getHex(),[ue.RGB255]:t=>t.getRGB255().toString(),[ue.RGB01]:t=>t.getRGB01().map(t=>t.toFixed(3)).toString(),[ue.HSV]:t=>t.getHSV(!1).toString(),[ue.HSL]:t=>t.getHSL(!1).toString()};let ve=class extends at{constructor(){super(...arguments),this.type=ue.HEX,this.inputValues={},this.color=new Nt,this._copied=!1,this._copyTimeout=null}async _copyValue(t){try{await navigator.clipboard.writeText(t),this._copied=!0,this._copyTimeout&&clearTimeout(this._copyTimeout),this._copyTimeout=setTimeout(()=>{this._copied=!1},1e3)}catch{}}onValueChange(t){this.dispatchEvent(new pe(this.type,t.target.value))}render(){const t=this.inputValues[be[this.type]]??fe[this.type](this.color);return V`
      <div
        class="flex items-stretch rounded-lg bg-white/50 backdrop-blur-md overflow-hidden text-left"
      >
        <div class="flex-1 px-2 py-1">
          <label
            class="block text-[10px] font-semibold text-gray-600 uppercase tracking-wider"
            >${ge[this.type]}</label
          >
          <input
            type="text"
            class="w-full text-xs font-mono text-gray-800 outline-none bg-transparent"
            .value=${t}
            @input=${this.onValueChange}
          />
        </div>
        <div class="flex items-center px-2 bg-white/30">
          <button
            class="p-1.5 rounded-md hover:bg-white/50 transition-colors cursor-pointer border-none bg-transparent"
            @click=${()=>this._copyValue(t)}
            title="Copy to clipboard"
            aria-label="Copy to clipboard"
          >
            ${this._copied?V`<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-green-600"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>`:V`<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-gray-500"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path
                      d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                    ></path>
                  </svg>`}
          </button>
        </div>
      </div>
    `}};ve.styles=[Ut],t([pt()],ve.prototype,"type",void 0),t([pt({attribute:!1})],ve.prototype,"inputValues",void 0),t([pt({attribute:!1})],ve.prototype,"color",void 0),t([ut()],ve.prototype,"_copied",void 0),ve=t([ct("color-converter-input")],ve);const me=/^#?([0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)$/,we=/^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/,ye=/^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;function xe(t,e,o){for(const r of t.children)r instanceof e&&o(r)}const ke={[ue.HEX]:function(t){const e=me.exec(t);return e&&2===e.length?new Nt({type:It.HEX,hex:e[1]}):null},[ue.RGB255]:function(t){const e=we.exec(t);if(e&&4===e.length){const t=parseInt(e[1]),o=parseInt(e[2]),r=parseInt(e[3]);if(0<=t&&t<=255&&0<=o&&o<=255&&0<=r&&r<=255)return new Nt({type:It.RGB255,r:t,g:o,b:r})}return null},[ue.RGB01]:function(t){const e=ye.exec(t);if(e&&4===e.length){const t=parseFloat(e[1]),o=parseFloat(e[2]),r=parseFloat(e[3]);if(0<=t&&t<=1&&0<=o&&o<=1&&0<=r&&r<=1)return new Nt({type:It.RGB01,r:t,g:o,b:r})}return null},[ue.HSV]:function(t){const e=ye.exec(t);if(e&&4===e.length){const t=parseFloat(e[1]),o=parseFloat(e[2]),r=parseFloat(e[3]);if(0<=t&&t<=360&&0<=o&&o<=100&&0<=r&&r<=100)return new Nt({type:It.HSV,h:t,s:o,v:r})}return null},[ue.HSL]:function(t){const e=ye.exec(t);if(e&&4===e.length){const t=parseFloat(e[1]),o=parseFloat(e[2]),r=parseFloat(e[3]);if(0<=t&&t<=360&&0<=o&&o<=100&&0<=r&&r<=100)return new Nt({type:It.HSL,h:t,s:o,l:r})}return null}};let $e=class extends at{constructor(){super(),this.color=new Nt,this.coordinates={x:0,y:0,width:0,height:0},this.inputValues={},this.addEventListener(pe.eventName,t=>{if(t instanceof pe){const{inputType:e,value:o}=t,r=ke[e](o);null!=r&&(this.setColor(r),this.dispatchEvent(new jt(r)),this.inputValues={[be[e]]:o})}})}setColor(t){this.dispatchEvent(new Vt(t))}updateChildren(){xe(this,ve,t=>{t.inputValues=this.inputValues,t.color=this.color})}updated(){this.updateChildren()}render(){const{width:t,height:e}=this.coordinates,o=t||1,r=e||1,i={x:this.coordinates.x/o,y:this.coordinates.y/r},s=[i.x.toFixed(3),i.y.toFixed(3)],n=[Math.round(this.coordinates.x),Math.round(this.coordinates.y)];return V`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Converter</h5>
      <div
        class="flex justify-between items-center px-4 py-2 bg-white/40 backdrop-blur-md rounded-lg text-sm font-medium mb-3"
      >
        <span class="font-semibold text-gray-700">Coordinates</span>
        <div
          id="coordinates-container"
          class="text-right text-gray-600 font-mono text-xs"
        >
          (${s[0]}, ${s[1]})<br />
          (${n[0]}, ${n[1]})
        </div>
      </div>
      <slot class="flex flex-col gap-2 inputs-container"></slot>
    `}};$e.styles=[Ut,de],t([pt({attribute:!1})],$e.prototype,"color",void 0),t([pt({attribute:!1})],$e.prototype,"coordinates",void 0),t([ut()],$e.prototype,"inputValues",void 0),$e=t([ct("color-converter")],$e);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ce=2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Se{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ae=(t,e)=>{const o=t._$AN;if(void 0===o)return!1;for(const t of o)t._$AO?.(e,!1),Ae(t,e);return!0},_e=t=>{let e,o;do{if(void 0===(e=t._$AM))break;o=e._$AN,o.delete(t),t=e}while(0===o?.size)},Me=t=>{for(let e;e=t._$AM;t=e){let o=e._$AN;if(void 0===o)e._$AN=o=new Set;else if(o.has(t))break;o.add(t),Le(e)}};function Ee(t){void 0!==this._$AN?(_e(this),this._$AM=t,Me(this)):this._$AM=t}function He(t,e=!1,o=0){const r=this._$AH,i=this._$AN;if(void 0!==i&&0!==i.size)if(e)if(Array.isArray(r))for(let t=o;t<r.length;t++)Ae(r[t],!1),_e(r[t]);else null!=r&&(Ae(r,!1),_e(r));else Ae(this,t)}const Le=t=>{t.type==Ce&&(t._$AP??=He,t._$AQ??=Ee)};class Re extends Se{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,o){super._$AT(t,e,o),Me(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(Ae(this,t),_e(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Ie{}const Oe=new WeakMap,Te=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Re{render(t){return F}update(t,[e]){const o=e!==this.G;return o&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),F}rt(t){if(void 0!==this.G)if(this.isConnected||(t=void 0),"function"==typeof this.G){const e=this.ht??globalThis;let o=Oe.get(e);void 0===o&&(o=new WeakMap,Oe.set(e,o)),void 0!==o.get(this.G)&&this.G.call(this.ht,void 0),o.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?Oe.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Ne=n`:host {
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
`;var Ge,Be;!function(t){t.Transparent="transparent",t.Black="black",t.White="white"}(Ge||(Ge={})),function(t){t.Small="small",t.Medium="medium",t.Large="large"}(Be||(Be={}));const ze={[Be.Small]:"1rem",[Be.Medium]:"1.5rem",[Be.Large]:"3rem"};let De=class extends at{constructor(){super(),this.coordinates={x:0,y:0,width:0,height:0},this.initialOverlayColor=Ge.Black,this.overlayColor=Ge.Black,this.overlaySize=Be.Medium,this.loadedImage=!1,this.canvasRef=new Ie,this.lastSampledColor=new Nt,this.drag=new Wt(this,{onDragStart:t=>this.samplePixel(t),onDrag:t=>this.samplePixel(t),onDragEnd:()=>{this.dispatchEvent(new jt(this.lastSampledColor))}}),this.overlayColor=this.initialOverlayColor}samplePixel(t){const e=this.canvasRef.value,o=e.getContext("2d");if(o){const r=e.getBoundingClientRect(),i=(t.clientX-r.left)/r.width*e.width,s=(t.clientY-r.top)/r.height*e.height,n=o.getImageData(i,s,1,1),a=new Nt({type:It.RGB255,r:n.data[0],g:n.data[1],b:n.data[2]});this.lastSampledColor=a,this.dispatchEvent(new Vt(a)),this.dispatchEvent(new te({x:i,y:s,width:e.width,height:e.height}))}}loadImage(t){const e=t.currentTarget.files?.item(0);if(e){const t=new FileReader;t.onload=t=>{const e=new Image;e.onload=()=>{const t=this.canvasRef.value,o=t.getContext("2d");o&&(t.width=e.width,t.height=e.height,o.drawImage(e,0,0)),this.loadedImage=!0},e.src=t.target?.result},t.readAsDataURL(e)}}selectOverlayColor(t){this.overlayColor=t.currentTarget.value}selectOverlaySize(t){this.overlaySize=t.currentTarget.value}render(){const t=this.coordinates.x/this.coordinates.width*100,e=this.coordinates.y/this.coordinates.height*100,o=`\n      border-color: ${this.overlayColor};\n      top: calc(${e}% - var(--circle-diameter) / 2);\n      left: calc(${t}% - var(--circle-diameter) / 2);\n      --circle-diameter: ${ze[this.overlaySize]};\n    `;return V`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Image Sampling</h5>
      <div class="mb-3">
        <input
          class="block w-full text-xs text-gray-800 bg-white/50 backdrop-blur-md rounded-lg cursor-pointer focus:outline-none file:mr-3 file:py-1.5 file:px-3 file:border-0 file:text-xs file:font-semibold file:bg-white/80 file:text-gray-800 hover:file:bg-white"
          type="file"
          @change=${this.loadImage}
        />
      </div>
      <div class="flex gap-2 mb-2">
        <div
          class="flex-1 rounded-lg bg-white/50 backdrop-blur-md p-1 px-2.5 text-left"
        >
          <label
            class="block text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >Overlay Color</label
          >
          <select
            class="w-full text-xs font-medium text-gray-800 bg-transparent outline-none cursor-pointer"
            aria-label="Select Overlay Color"
            @change=${this.selectOverlayColor}
          >
            <option
              value=${Ge.Transparent}
              .selected=${this.overlayColor==Ge.Transparent}
            >
              None
            </option>
            <option
              value=${Ge.Black}
              .selected=${this.overlayColor==Ge.Black}
            >
              Black
            </option>
            <option
              value=${Ge.White}
              .selected=${this.overlayColor==Ge.White}
            >
              White
            </option>
          </select>
        </div>
        <div
          class="flex-1 rounded-lg bg-white/50 backdrop-blur-md p-1 px-2.5 text-left"
        >
          <label
            class="block text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >Overlay Size</label
          >
          <select
            class="w-full text-xs font-medium text-gray-800 bg-transparent outline-none cursor-pointer"
            aria-label="Select Overlay Size"
            @change=${this.selectOverlaySize}
          >
            <option
              value=${Be.Small}
              .selected=${this.overlaySize==Be.Small}
            >
              Small
            </option>
            <option
              value=${Be.Medium}
              .selected=${this.overlaySize==Be.Medium}
            >
              Medium
            </option>
            <option
              value=${Be.Large}
              .selected=${this.overlaySize==Be.Large}
            >
              Large
            </option>
          </select>
        </div>
      </div>
      <div class="mt-1 image-preview-canvas-wrapper">
        <canvas
          class="image-preview-canvas"
          width="0"
          height="0"
          ${Te(this.canvasRef)}
          @mousedown=${this.drag.handleMouseDown}
        ></canvas>
        <div
          class="image-preview-overlay"
          ?hidden=${!this.loadedImage}
          style=${o}
        ></div>
      </div>
    `}};De.styles=[Ut,Ne],t([pt({attribute:!1})],De.prototype,"coordinates",void 0),t([pt({attribute:!1})],De.prototype,"initialOverlayColor",void 0),t([ut()],De.prototype,"overlayColor",void 0),t([ut()],De.prototype,"overlaySize",void 0),t([ut()],De.prototype,"loadedImage",void 0),De=t([ct("image-sampling")],De);const Pe=[[.18995,.07176,.23217],[.19483,.08339,.26149],[.19956,.09498,.29024],[.20415,.10652,.31844],[.2086,.11802,.34607],[.21291,.12947,.37314],[.21708,.14087,.39964],[.22111,.15223,.42558],[.225,.16354,.45096],[.22875,.17481,.47578],[.23236,.18603,.50004],[.23582,.1972,.52373],[.23915,.20833,.54686],[.24234,.21941,.56942],[.24539,.23044,.59142],[.2483,.24143,.61286],[.25107,.25237,.63374],[.25369,.26327,.65406],[.25618,.27412,.67381],[.25853,.28492,.693],[.26074,.29568,.71162],[.2628,.30639,.72968],[.26473,.31706,.74718],[.26652,.32768,.76412],[.26816,.33825,.7805],[.26967,.34878,.79631],[.27103,.35926,.81156],[.27226,.3697,.82624],[.27334,.38008,.84037],[.27429,.39043,.85393],[.27509,.40072,.86692],[.27576,.41097,.87936],[.27628,.42118,.89123],[.27667,.43134,.90254],[.27691,.44145,.91328],[.27701,.45152,.92347],[.27698,.46153,.93309],[.2768,.47151,.94214],[.27648,.48144,.95064],[.27603,.49132,.95857],[.27543,.50115,.96594],[.27469,.51094,.97275],[.27381,.52069,.97899],[.27273,.5304,.98461],[.27106,.54015,.9893],[.26878,.54995,.99303],[.26592,.55979,.99583],[.26252,.56967,.99773],[.25862,.57958,.99876],[.25425,.5895,.99896],[.24946,.59943,.99835],[.24427,.60937,.99697],[.23874,.61931,.99485],[.23288,.62923,.99202],[.22676,.63913,.98851],[.22039,.64901,.98436],[.21382,.65886,.97959],[.20708,.66866,.97423],[.20021,.67842,.96833],[.19326,.68812,.9619],[.18625,.69775,.95498],[.17923,.70732,.94761],[.17223,.7168,.93981],[.16529,.7262,.93161],[.15844,.73551,.92305],[.15173,.74472,.91416],[.14519,.75381,.90496],[.13886,.76279,.8955],[.13278,.77165,.8858],[.12698,.78037,.8759],[.12151,.78896,.86581],[.11639,.7974,.85559],[.11167,.80569,.84525],[.10738,.81381,.83484],[.10357,.82177,.82437],[.10026,.82955,.81389],[.0975,.83714,.80342],[.09532,.84455,.79299],[.09377,.85175,.78264],[.09287,.85875,.7724],[.09267,.86554,.7623],[.0932,.87211,.75237],[.09451,.87844,.74265],[.09662,.88454,.73316],[.09958,.8904,.72393],[.10342,.896,.715],[.10815,.90142,.70599],[.11374,.90673,.69651],[.12014,.91193,.6866],[.12733,.91701,.67627],[.13526,.92197,.66556],[.14391,.9268,.65448],[.15323,.93151,.64308],[.16319,.93609,.63137],[.17377,.94053,.61938],[.18491,.94484,.60713],[.19659,.94901,.59466],[.20877,.95304,.58199],[.22142,.95692,.56914],[.23449,.96065,.55614],[.24797,.96423,.54303],[.2618,.96765,.52981],[.27597,.97092,.51653],[.29042,.97403,.50321],[.30513,.97697,.48987],[.32006,.97974,.47654],[.33517,.98234,.46325],[.35043,.98477,.45002],[.36581,.98702,.43688],[.38127,.98909,.42386],[.39678,.99098,.41098],[.41229,.99268,.39826],[.42778,.99419,.38575],[.44321,.99551,.37345],[.45854,.99663,.3614],[.47375,.99755,.34963],[.48879,.99828,.33816],[.50362,.99879,.32701],[.51822,.9991,.31622],[.53255,.99919,.30581],[.54658,.99907,.29581],[.56026,.99873,.28623],[.57357,.99817,.27712],[.58646,.99739,.26849],[.59891,.99638,.26038],[.61088,.99514,.2528],[.62233,.99366,.24579],[.63323,.99195,.23937],[.64362,.98999,.23356],[.65394,.98775,.22835],[.66428,.98524,.2237],[.67462,.98246,.2196],[.68494,.97941,.21602],[.69525,.9761,.21294],[.70553,.97255,.21032],[.71577,.96875,.20815],[.72596,.9647,.2064],[.7361,.96043,.20504],[.74617,.95593,.20406],[.75617,.95121,.20343],[.76608,.94627,.20311],[.77591,.94113,.2031],[.78563,.93579,.20336],[.79524,.93025,.20386],[.80473,.92452,.20459],[.8141,.91861,.20552],[.82333,.91253,.20663],[.83241,.90627,.20788],[.84133,.89986,.20926],[.8501,.89328,.21074],[.85868,.88655,.2123],[.86709,.87968,.21391],[.8753,.87267,.21555],[.88331,.86553,.21719],[.89112,.85826,.2188],[.8987,.85087,.22038],[.90605,.84337,.22188],[.91317,.83576,.22328],[.92004,.82806,.22456],[.92666,.82025,.2257],[.93301,.81236,.22667],[.93909,.80439,.22744],[.94489,.79634,.228],[.95039,.78823,.22831],[.9556,.78005,.22836],[.96049,.77181,.22811],[.96507,.76352,.22754],[.96931,.75519,.22663],[.97323,.74682,.22536],[.97679,.73842,.22369],[.98,.73,.22161],[.98289,.7214,.21918],[.98549,.7125,.2165],[.98781,.7033,.21358],[.98986,.69382,.21043],[.99163,.68408,.20706],[.99314,.67408,.20348],[.99438,.66386,.19971],[.99535,.65341,.19577],[.99607,.64277,.19165],[.99654,.63193,.18738],[.99675,.62093,.18297],[.99672,.60977,.17842],[.99644,.59846,.17376],[.99593,.58703,.16899],[.99517,.57549,.16412],[.99419,.56386,.15918],[.99297,.55214,.15417],[.99153,.54036,.1491],[.98987,.52854,.14398],[.98799,.51667,.13883],[.9859,.50479,.13367],[.9836,.49291,.12849],[.98108,.48104,.12332],[.97837,.4692,.11817],[.97545,.4574,.11305],[.97234,.44565,.10797],[.96904,.43399,.10294],[.96555,.42241,.09798],[.96187,.41093,.0931],[.95801,.39958,.08831],[.95398,.38836,.08362],[.94977,.37729,.07905],[.94538,.36638,.07461],[.94084,.35566,.07031],[.93612,.34513,.06616],[.93125,.33482,.06218],[.92623,.32473,.05837],[.92105,.31489,.05475],[.91572,.3053,.05134],[.91024,.29599,.04814],[.90463,.28696,.04516],[.89888,.27824,.04243],[.89298,.26981,.03993],[.88691,.26152,.03753],[.88066,.25334,.03521],[.87422,.24526,.03297],[.8676,.2373,.03082],[.86079,.22945,.02875],[.8538,.2217,.02677],[.84662,.21407,.02487],[.83926,.20654,.02305],[.83172,.19912,.02131],[.82399,.19182,.01966],[.81608,.18462,.01809],[.80799,.17753,.0166],[.79971,.17055,.0152],[.79125,.16368,.01387],[.7826,.15693,.01264],[.77377,.15028,.01148],[.76476,.14374,.01041],[.75556,.13731,.00942],[.74617,.13098,.00851],[.73661,.12477,.00769],[.72686,.11867,.00695],[.71692,.11268,.00629],[.7068,.1068,.00571],[.6965,.10102,.00522],[.68602,.09536,.00481],[.67535,.0898,.00449],[.66449,.08436,.00424],[.65345,.07902,.00408],[.64223,.0738,.00401],[.63082,.06868,.00401],[.61923,.06367,.0041],[.60746,.05878,.00427],[.5955,.05399,.00453],[.58336,.04931,.00486],[.57103,.04474,.00529],[.55852,.04028,.00579],[.54583,.03593,.00638],[.53295,.03169,.00705],[.51989,.02756,.0078],[.50664,.02354,.00863],[.49321,.01963,.00955],[.4796,.01583,.01055]];let Ue=class extends oe{constructor(){super(...arguments),this.data=[[0,0,0]],this.name="Color Map",this.processColorAt=t=>{const e=this.colorMapDiv.getBoundingClientRect(),o=Rt((t.clientX-e.left)/e.width,0,1),r=this.getColorAt(o);this.setColor(r)},this.drag=new Wt(this,{onDragStart:this.processColorAt,onDrag:this.processColorAt,onDragEnd:()=>{this.commitColor()}})}toCss(){const t=this.data,e=[];for(let o=0;o<256;o++)e.push(`rgba(${Math.round(255*t[o][0])}, ${Math.round(255*t[o][1])}, ${Math.round(255*t[o][2])}, 255) ${100*o/255}%`);return`linear-gradient(to right, ${e.join(", ")})`}getColorAt(t){const e=this.data,o=Math.floor(Rt(t*e.length,0,e.length-1)),r=Math.ceil(Rt(t*e.length,0,e.length-1)),i=t*e.length-o;return zt(new Nt({type:It.RGB01,r:e[o][0],g:e[o][1],b:e[o][2]}),new Nt({type:It.RGB01,r:e[r][0],g:e[r][1],b:e[r][2]}),i)}findClosestColormapPoint(t){const e=t.getRGB255(),o=this.data;let r=1/0,i=0;for(let t=0;t<o.length;t++){const s=Math.round(255*o[t][0]),n=Math.round(255*o[t][1]),a=Math.round(255*o[t][2]),l=e[0]-s,c=e[1]-n,h=e[2]-a,d=Math.sqrt(l*l+c*c+h*h);d<r&&(r=d,i=t)}return{index:i,distance:r,ratio:o.length>1?i/(o.length-1):0}}render(){const t=this.findClosestColormapPoint(this.color),e=t.distance<=30;return V`
      <div class="flex flex-col gap-1">
        <span class="text-xs font-semibold text-gray-700 text-center"
          >${this.name}</span
        >
        <div
          style="background: ${this.toCss()}"
          class="w-full h-8 rounded relative cursor-crosshair"
          @mousedown=${this.drag.handleMouseDown}
          id="colormap-div"
        >
          ${e?V`<color-bar-pointer
                  .position=${100*t.ratio}
                  .color=${"#"+this.color.getHex()}
                ></color-bar-pointer>`:""}
        </div>
      </div>
    `}};Ue.styles=[Ut],t([pt({attribute:!1})],Ue.prototype,"data",void 0),t([pt()],Ue.prototype,"name",void 0),t([gt("#colormap-div")],Ue.prototype,"colorMapDiv",void 0),Ue=t([ct("color-map")],Ue);let Ve=class extends at{constructor(){super(...arguments),this.color=new Nt}render(){return V`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Maps</h5>
      <div class="flex flex-col gap-2">
        <color-map
          .data=${Pe}
          .name=${"Turbo"}
          .color=${this.color}
        ></color-map>
      </div>
    `}};var je,Fe;Ve.styles=[Ut],t([pt({attribute:!1})],Ve.prototype,"color",void 0),Ve=t([ct("color-maps")],Ve),function(t){t.RANDOM="random",t.MONOCHROMATIC="monochromatic",t.ANALOGOUS="analogous",t.COMPLEMENTARY="complementary",t.TRIADIC="triadic",t.SPLIT_COMPLEMENTARY="split-complementary",t.TETRADIC="tetradic"}(je||(je={})),function(t){t.ANY="any",t.TONAL="tonal",t.ANALOGOUS="analogous",t.VIVID="vivid"}(Fe||(Fe={}));const Xe=[je.ANALOGOUS],qe=[je.COMPLEMENTARY,je.TRIADIC,je.SPLIT_COMPLEMENTARY,je.TETRADIC],We=[je.MONOCHROMATIC,...Xe,...qe];function Ye(t,e){return t+Math.random()*(e-t)}function Je(t){return(t%360+360)%360}const Ke={count:5,mode:Fe.ANY,saturationRange:[50,90],lightnessRange:[40,80],jitter:5};function Ze(t,e){const o=Ye(e.saturationRange[0],e.saturationRange[1]),r=Ye(e.lightnessRange[0],e.lightnessRange[1]),i=Je(t+Ye(-e.jitter,e.jitter));return new Nt({type:It.HSL,h:i,s:o,l:r})}function Qe(t,e,o,r){const i=15+(r-1-o)/(r-1)*70;return new Nt({type:It.HSL,h:Je(t+Ye(-3,3)),s:e,l:i})}function to(t,e,o){const r={...Ke,...t},i=function(t){let e;switch(t){case Fe.TONAL:return je.MONOCHROMATIC;case Fe.ANALOGOUS:e=Xe;break;case Fe.VIVID:e=qe;break;case Fe.ANY:default:e=We}return e[Math.floor(Math.random()*e.length)]}(r.mode),s=function(t,e){if(!t||!e)return null;const o=t.findIndex(Boolean);return-1!==o&&e[o]?{index:o,hsl:e[o].getHSL()}:null}(e,o),n=r.mode===Fe.TONAL?[0,0,0,0,0]:function(t){switch(t){case je.MONOCHROMATIC:return[0,0,0,0,0];case je.ANALOGOUS:return[-60,-30,0,30,60];case je.COMPLEMENTARY:return[0,10,-10,180,190];case je.TRIADIC:return[0,120,240,30,150];case je.SPLIT_COMPLEMENTARY:return[0,150,210,-20,170];case je.TETRADIC:return[0,90,180,270,45];default:return[0,30,60,-30,-60]}}(i),a=s?Je(s.hsl[0]-n[s.index]):360*Math.random(),l=[];if(r.mode===Fe.TONAL){const t=s?s.hsl[1]:Ye(30,70);for(let i=0;i<r.count;i++)e&&e[i]&&o&&o[i]?l.push(o[i]):l.push(Qe(a,t,i,r.count))}else for(let t=0;t<r.count;t++)if(e&&e[t]&&o&&o[t])l.push(o[t]);else{const e=Je(a+n[t%n.length]);l.push(Ze(e,r))}return l}class eo extends Event{constructor(t){super(eo.eventName,{bubbles:!0,composed:!0}),this.index=t}}eo.eventName="set-palette-active";const oo=n`.material-symbols-outlined {
  font-family: "Material Symbols Outlined";
  font-weight: normal;
  font-style: normal;
  font-size: 1.5rem;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}

:host {
  display: block;
}

.palette-root {
  width: 100%;
}

.narrow .palette-swatch-hex {
  display: none;
}

.palette-generate-btn {
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.35rem 0;
  border-radius: 0.5rem;
  border: 0.0625rem solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.7);
  font-size: 0.7rem;
  font-weight: 600;
  color: rgb(55, 65, 81);
  cursor: pointer;
  transition: background 0.15s;
  line-height: 1;
}

.palette-generate-btn:hover {
  background: rgba(255, 255, 255, 0.95);
}

.palette-contrast {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
}

.palette-contrast-label {
  font-size: 0.65rem;
  font-weight: 600;
  color: rgb(107, 114, 128);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.palette-contrast-group {
  display: inline-flex;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 0.0625rem solid rgba(0, 0, 0, 0.1);
}

.palette-contrast-btn {
  padding: 0.15rem 0.5rem;
  font-size: 0.65rem;
  font-weight: 600;
  color: rgb(156, 163, 175);
  background: rgba(255, 255, 255, 0.5);
  border: none;
  border-right: 0.0625rem solid rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.15s;
  line-height: 1.4;
}

.palette-contrast-btn:last-child {
  border-right: none;
}

.palette-contrast-btn:hover {
  color: rgb(55, 65, 81);
  background: rgba(255, 255, 255, 0.8);
}

.palette-contrast-btn.active {
  color: rgb(55, 65, 81);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.1);
}

.palette-swatches {
  display: flex;
  gap: 0.25rem;
  width: 100%;
}

.palette-swatch {
  flex: 1;
  min-height: 8rem;
  border-radius: 0.75rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition:
    flex 0.15s ease,
    box-shadow 0.15s ease;
}

.palette-swatch.active {
  flex: 1.3;
  z-index: 2;
  box-shadow:
    0 0 0 0.125rem rgb(59, 130, 246),
    0 0.25rem 0.75rem rgba(59, 130, 246, 0.3);
}

.palette-swatch.dragging {
  opacity: 0.4;
}

.palette-swatch.drag-over {
  box-shadow: inset 0 0 0 0.1875rem rgba(59, 130, 246, 0.7);
}

.palette-swatch-actions {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.palette-action-btn {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(0.25rem);
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.15s, background 0.15s;
  padding: 0;
}

.palette-action-btn .material-symbols-outlined {
  font-size: 0.875rem;
}

.palette-swatch:hover .palette-action-btn {
  opacity: 1;
}

.palette-action-btn:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.4);
}

.palette-swatch-hex {
  position: absolute;
  bottom: 0.25rem;
  left: 0.25rem;
  right: 0.25rem;
  padding: 0.15rem 0;
  border-radius: 0.375rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(0.25rem);
  font-family: monospace;
  font-size: 0.65rem;
  text-align: center;
  user-select: none;
}


`,ro="color-palette-store";let io=class extends at{constructor(){super(),this.activeEditingColor=new Nt,this.colors=[],this.locked=Array(5).fill(!1),this.activeIndex=-1,this.paletteMode=Fe.ANY,this.paletteCount=5,this.narrow=!1,this.dragIndex=-1,this.dragOverIndex=-1,this.prevEditingColor=null,this.resizeObserver=null,this.handleSpacebar=t=>{const e=t.target.tagName;"Space"===t.code&&"INPUT"!==e&&"TEXTAREA"!==e&&(t.preventDefault(),this.regenerate())};const t=this.loadFromStorage();t?(this.colors=t.colors,this.locked=t.locked,this.paletteMode=t.mode,this.paletteCount=t.count):this.colors=to({count:this.paletteCount})}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.handleSpacebar),this.resizeObserver=new ResizeObserver(t=>{const e=t[0]?.contentRect.width??0;this.narrow=e<448}),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.handleSpacebar),this.resizeObserver?.disconnect()}updated(){this.activeIndex>=0&&this.activeEditingColor!==this.prevEditingColor&&this.colors[this.activeIndex]!==this.activeEditingColor&&(this.colors[this.activeIndex]=this.activeEditingColor,this.colors=[...this.colors],this.saveToStorage()),this.prevEditingColor=this.activeEditingColor}regenerate(){this.colors=to({count:this.paletteCount,mode:this.paletteMode},this.locked,this.colors),this.saveToStorage(),this.activeIndex>=0&&this.dispatchEvent(new Vt(this.colors[this.activeIndex]))}copyColor(t){navigator.clipboard.writeText("#"+t.getHex()).catch(()=>{})}regenerateSwatch(t,e){e.stopPropagation();const o=to({count:1,mode:this.paletteMode})[0];this.colors[t]=o,this.colors=[...this.colors],this.dispatchEvent(new Vt(o)),this.dispatchEvent(new jt(o)),this.saveToStorage()}selectSwatch(t){if(this.activeIndex===t)return this.activeIndex=-1,void this.dispatchEvent(new eo(-1));this.activeIndex=t,this.dispatchEvent(new Vt(this.colors[t])),this.dispatchEvent(new eo(t)),this.dispatchEvent(new jt(this.colors[t]))}setMode(t){this.paletteMode=t,this.saveToStorage(),this.regenerate()}setCount(t){if(t!==this.paletteCount){if(this.paletteCount=t,t>this.colors.length){const e=to({count:t-this.colors.length,mode:this.paletteMode});this.colors=[...this.colors,...e],this.locked=[...this.locked,...Array(t-this.locked.length).fill(!1)]}else this.colors=this.colors.slice(0,t),this.locked=this.locked.slice(0,t),this.activeIndex>=t&&(this.activeIndex=-1,this.dispatchEvent(new eo(-1)));this.colors=[...this.colors],this.locked=[...this.locked],this.saveToStorage(),this.regenerate()}}toggleLock(t,e){e.stopPropagation(),this.locked[t]=!this.locked[t],this.locked=[...this.locked],this.saveToStorage()}onDragStart(t,e){this.dragIndex=t,e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",String(t))}onDragOver(t,e){e.preventDefault(),e.dataTransfer.dropEffect="move",this.dragOverIndex=t}onDragLeave(){this.dragOverIndex=-1}onDrop(t){const e=this.dragIndex;if(e<0||e===t)return;const o=[...this.colors],r=[...this.locked],[i]=o.splice(e,1),[s]=r.splice(e,1);o.splice(t,0,i),r.splice(t,0,s),this.colors=o,this.locked=r,this.activeIndex===e?this.activeIndex=t:this.activeIndex>=0&&(this.activeIndex=o.indexOf(this.colors[this.activeIndex])),this.saveToStorage()}onDragEnd(){this.dragIndex=-1,this.dragOverIndex=-1}saveToStorage(){qt(ro,{colors:this.colors.map(t=>({hex:t.getHex()})),locked:this.locked,mode:this.paletteMode,count:this.paletteCount})}loadFromStorage(){const t=Xt(ro,null);if(!t||!t.colors||!t.colors.length)return null;const e=t.count??t.colors.length;return{colors:t.colors.map(t=>new Nt({type:It.HEX,hex:t.hex})),locked:t.locked??Array(e).fill(!1),mode:t.mode??Fe.ANY,count:e}}render(){return V`
      <div class="palette-root ${this.narrow?"narrow":""}">
        <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Palette</h5>
        <div class="palette-contrast mb-2">
          <span class="palette-contrast-label">Count</span>
          <div class="palette-contrast-group">
            ${Array.from({length:6},(t,e)=>e+2).map(t=>V`
                <button
                  class="palette-contrast-btn ${this.paletteCount===t?"active":""}"
                  @click=${()=>this.setCount(t)}
                >
                  ${t}
                </button>
              `)}
          </div>
        </div>
        <div class="palette-contrast mb-2">
          <span class="palette-contrast-label">Mode</span>
          <div class="palette-contrast-group">
            <button
              class="palette-contrast-btn ${this.paletteMode===Fe.ANY?"active":""}"
              @click=${()=>this.setMode(Fe.ANY)}
            >
              Any
            </button>
            <button
              class="palette-contrast-btn ${this.paletteMode===Fe.TONAL?"active":""}"
              @click=${()=>this.setMode(Fe.TONAL)}
            >
              Tonal
            </button>
            <button
              class="palette-contrast-btn ${this.paletteMode===Fe.ANALOGOUS?"active":""}"
              @click=${()=>this.setMode(Fe.ANALOGOUS)}
            >
              Analogous
            </button>
            <button
              class="palette-contrast-btn ${this.paletteMode===Fe.VIVID?"active":""}"
              @click=${()=>this.setMode(Fe.VIVID)}
            >
              Vivid
            </button>
          </div>
        </div>
        <button
          class="palette-generate-btn"
          @click=${this.regenerate}
          title="Generate new palette (Space)"
        >
          Generate
        </button>
        <div class="palette-swatches">
          ${this.colors.map((t,e)=>V`
              <div
                class="palette-swatch ${this.activeIndex===e?"active":""} ${this.dragIndex===e?"dragging":""} ${this.dragOverIndex===e?"drag-over":""}"
                style="background: ${t.toCSS()}"
                draggable="true"
                @click=${()=>this.selectSwatch(e)}
                @dragstart=${t=>this.onDragStart(e,t)}
                @dragover=${t=>this.onDragOver(e,t)}
                @dragleave=${this.onDragLeave}
                @drop=${()=>this.onDrop(e)}
                @dragend=${this.onDragEnd}
              >
                <div class="palette-swatch-actions">
                  <button
                    class="palette-action-btn"
                    @click=${t=>this.toggleLock(e,t)}
                    title=${this.locked[e]?"Unlock color":"Lock color"}
                  >
                    <span class="material-symbols-outlined"
                      >${this.locked[e]?"lock":"lock_open"}</span
                    >
                  </button>
                  ${this.activeIndex===e?V`
                          <button
                            class="palette-action-btn"
                            @click=${e=>{e.stopPropagation(),this.copyColor(t)}}
                            title="Copy hex"
                          >
                            <span class="material-symbols-outlined"
                              >content_copy</span
                            >
                          </button>
                          <button
                            class="palette-action-btn"
                            @click=${t=>this.regenerateSwatch(e,t)}
                            title="Regenerate this color"
                          >
                            <span class="material-symbols-outlined"
                              >refresh</span
                            >
                          </button>
                        `:""}
                </div>
                <div class="palette-swatch-hex">
                  #${t.getHex().toUpperCase()}
                </div>
              </div>
            `)}
        </div>
      </div>
    `}};io.styles=[Ut,oo],t([pt({attribute:!1})],io.prototype,"activeEditingColor",void 0),t([ut()],io.prototype,"colors",void 0),t([ut()],io.prototype,"locked",void 0),t([ut()],io.prototype,"activeIndex",void 0),t([ut()],io.prototype,"paletteMode",void 0),t([ut()],io.prototype,"paletteCount",void 0),t([ut()],io.prototype,"narrow",void 0),t([ut()],io.prototype,"dragIndex",void 0),t([ut()],io.prototype,"dragOverIndex",void 0),io=t([ct("color-palette")],io);const so=n`.material-symbols-outlined {
  font-family: "Material Symbols Outlined";
  font-weight: normal;
  font-style: normal;
  font-size: 1.5rem;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}

:host {
  display: block;
}

.history-root {
  width: 100%;
}

.history-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.history-empty {
  font-size: 0.75rem;
  color: rgb(107, 114, 128);
  text-align: center;
  padding: 0.5rem 0;
}

.history-clear-btn {
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.35rem 0;
  border-radius: 0.5rem;
  border: 0.0625rem solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.7);
  color: rgb(107, 114, 128);
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  line-height: 1;
}

.history-clear-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: rgb(239, 68, 68);
  border-color: rgba(239, 68, 68, 0.3);
}

.history-swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 4px;
  align-content: flex-start;
}

.history-swatch {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;
}

.history-swatch:hover {
  transform: scale(1.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 2;
  border-color: rgb(59, 130, 246);
}

.history-swatch.active {
  box-shadow:
    0 0 0 2px rgb(59, 130, 246),
    0 2px 8px rgba(59, 130, 246, 0.3);
  z-index: 2;
  border-color: rgb(59, 130, 246);
  transform: scale(1.15);
}
`,no="color-history-store";let ao=class extends at{constructor(){super(),this.history=[],this.activeIndex=-1,this.handleCommit=t=>{if(!(t instanceof jt))return;const e=this.closest("color-picker");if(!e||!e.contains(t.target))return;const o=t.color.getHex();this.history.length>0&&this.history[0].getHex()===o||(this.history=[t.color,...this.history].slice(0,50),this.activeIndex=-1,this.saveToStorage(),this.saveLastColor(t.color))},this.history=this.loadFromStorage()}connectedCallback(){super.connectedCallback(),window.addEventListener(jt.eventName,this.handleCommit)}saveLastColor(t){qt("last-active-color",t.getHex())}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(jt.eventName,this.handleCommit)}selectSwatch(t,e){this.activeIndex=t,this.dispatchEvent(new Vt(e)),this.saveLastColor(e)}clearHistory(){this.history=[],this.activeIndex=-1,this.saveToStorage()}saveToStorage(){qt(no,this.history.map(t=>({hex:t.getHex()})))}loadFromStorage(){const t=Xt(no,null);return t&&Array.isArray(t)?t.map(t=>new Nt({type:It.HEX,hex:t.hex})):[]}render(){return V`
      <div class="history-root">
        <div class="history-header">
          <h5 class="text-lg font-semibold text-gray-800">Color History</h5>
        </div>
        ${this.history.length>0?V`
                <button
                  class="history-clear-btn"
                  @click=${this.clearHistory}
                  title="Clear history"
                >
                  Clear
                </button>
              `:""}
        ${0===this.history.length?V`<p class="history-empty">No colors yet</p>`:V`
                <div class="history-swatches">
                  ${this.history.map((t,e)=>V`
                      <div
                        class="history-swatch ${this.activeIndex===e?"active":""}"
                        style="background: ${t.toCSS()}"
                        @click=${()=>this.selectSwatch(e,t)}
                        title="#${t.getHex().toUpperCase()}"
                      ></div>
                    `)}
                </div>
              `}
      </div>
    `}};ao.styles=[Ut,so],t([ut()],ao.prototype,"history",void 0),t([ut()],ao.prototype,"activeIndex",void 0),ao=t([ct("color-history")],ao);let lo=class extends at{render(){return V`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Other Tools</h5>
      <ul class="list-disc list-inside text-left space-y-2 text-sm">
        ${[...this.children].map(t=>{if(t instanceof HTMLAnchorElement)return V`<li>
              <a
                class="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                href="${t.href}"
                target="${t.target||"_blank"}"
                >${t.textContent}</a
              >
            </li>`})}
      </ul>
    `}};lo.styles=[Ut],lo=t([ct("other-tools")],lo);const co="color-interpolation-store";let ho=class extends at{constructor(){super(),this.color=new Nt({type:It.RGB255,r:71,g:85,b:105}),this.coordinates={x:0,y:0,width:1,height:1},this.interpolationLeft=new Nt({type:It.RGB255,r:255,g:0,b:0}),this.interpolationRight=new Nt({type:It.RGB255,r:255,g:255,b:255}),this.interpolationActive=Jt.NONE,this.paletteActiveIndex=-1,this.updateBodyBackground=!1,this.loadLastColor(),this.loadInterpolationState(),this.addEventListener(Vt.eventName,t=>{t instanceof Vt&&this.setColor(t.color)}),this.addEventListener(te.eventName,t=>{t instanceof te&&this.setCoordinates(t.coordinates)}),this.addEventListener(Ft.eventName,t=>{t instanceof Ft&&this.setInterpolationActive(t.active)}),this.addEventListener(eo.eventName,t=>{t instanceof eo&&(this.paletteActiveIndex=t.index)})}loadLastColor(){const t=Xt("last-active-color",null);t&&(this.color=new Nt({type:It.HEX,hex:t}))}loadInterpolationState(){const t=Xt(co,null);t&&(t.left&&(this.interpolationLeft=new Nt({type:It.HEX,hex:t.left})),t.right&&(this.interpolationRight=new Nt({type:It.HEX,hex:t.right})),t.active&&(this.interpolationActive=t.active))}saveInterpolationState(){qt(co,{left:this.interpolationLeft.getHex(),right:this.interpolationRight.getHex(),active:this.interpolationActive})}setColor(t){this.color=t,this.syncInterpolationEndpoint(t)}syncInterpolationEndpoint(t){this.interpolationActive===Jt.LEFT?(this.interpolationLeft=t,this.saveInterpolationState()):this.interpolationActive===Jt.RIGHT&&(this.interpolationRight=t,this.saveInterpolationState())}setCoordinates(t){this.coordinates=t}setInterpolationActive(t){this.interpolationActive=t,this.saveInterpolationState()}updateChildren(){xe(this,he,t=>{t.color=this.color}),xe(this,$e,t=>{t.color=this.color,t.coordinates=this.coordinates}),xe(this,De,t=>{t.coordinates=this.coordinates}),xe(this,Zt,t=>{t.leftColor=this.interpolationLeft,t.rightColor=this.interpolationRight,t.activeColor=this.interpolationActive}),xe(this,Ve,t=>{t.color=this.color}),xe(this,io,t=>{t.activeEditingColor=this.color})}updated(t){this.updateBodyBackground&&t.has("color")&&(document.body.style.background="#"+this.color.getHex()),this.updateChildren()}render(){return V`<slot class="main-container"></slot>`}};ho.styles=[Ut,Qt],t([ut()],ho.prototype,"color",void 0),t([ut()],ho.prototype,"coordinates",void 0),t([ut()],ho.prototype,"interpolationLeft",void 0),t([ut()],ho.prototype,"interpolationRight",void 0),t([ut()],ho.prototype,"interpolationActive",void 0),t([ut()],ho.prototype,"paletteActiveIndex",void 0),t([pt({type:Boolean})],ho.prototype,"updateBodyBackground",void 0),ho=t([ct("color-picker")],ho);

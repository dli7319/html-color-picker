function t(t,e,o,i){var n,r=arguments.length,s=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,o,s):n(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let r=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&n.set(e,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1]),t[0]);return new r(o,t,i)},a=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,g=f.trustedTypes,m=g?g.emptyScript:"",y=f.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},w=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;class x extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return i?.call(this)},set(e){const r=i?.call(this);n.call(this,e),this.requestUpdate(t,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(o)t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const o of i){const i=document.createElement("style"),n=e.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=o.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EC(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){const n=(void 0!==o.converter?.toAttribute?o.converter:b).toAttribute(e,o.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=o.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i,this[i]=n.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,o){if(void 0!==t){if(o??=this.constructor.getPropertyOptions(t),!(o.hasChanged??w)(this[t],e))return;this.P(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,o){this._$AL.has(t)||this._$AL.set(t,e),!0===o.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t)!0!==o.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,y?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C=globalThis,M=C.trustedTypes,S=M?M.createPolicy("lit-html",{createHTML:t=>t}):void 0,_="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+E,A=`<${k}>`,L=document,B=()=>L.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,P="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,O=/>/g,N=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,I=/"/g,D=/^(?:script|style|textarea|title)$/i,G=(t=>(e,...o)=>({_$litType$:t,strings:e,values:o}))(1),F=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),j=new WeakMap,W=L.createTreeWalker(L,129);function q(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const X=(t,e)=>{const o=t.length-1,i=[];let n,r=2===e?"<svg>":3===e?"<math>":"",s=z;for(let e=0;e<o;e++){const o=t[e];let a,l,c=-1,h=0;for(;h<o.length&&(s.lastIndex=h,l=s.exec(o),null!==l);)h=s.lastIndex,s===z?"!--"===l[1]?s=T:void 0!==l[1]?s=O:void 0!==l[2]?(D.test(l[2])&&(n=RegExp("</"+l[2],"g")),s=N):void 0!==l[3]&&(s=N):s===N?">"===l[0]?(s=n??z,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?N:'"'===l[3]?I:U):s===I||s===U?s=N:s===T||s===O?s=z:(s=N,n=void 0);const d=s===N&&t[e+1].startsWith("/>")?" ":"";r+=s===z?o+A:c>=0?(i.push(a),o.slice(0,c)+_+o.slice(c)+E+d):o+E+(-2===c?e:d)}return[q(t,r+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Y{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let n=0,r=0;const s=t.length-1,a=this.parts,[l,c]=X(t,e);if(this.el=Y.createElement(l,o),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=W.nextNode())&&a.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(_)){const e=c[r++],o=i.getAttribute(t).split(E),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:s[2],strings:o,ctor:"."===s[1]?tt:"?"===s[1]?et:"@"===s[1]?ot:Q}),i.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(D.test(i.tagName)){const t=i.textContent.split(E),e=t.length-1;if(e>0){i.textContent=M?M.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],B()),W.nextNode(),a.push({type:2,index:++n});i.append(t[e],B())}}}else if(8===i.nodeType)if(i.data===k)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(E,t+1));)a.push({type:7,index:n}),t+=E.length-1}n++}}static createElement(t,e){const o=L.createElement("template");return o.innerHTML=t,o}}function K(t,e,o=t,i){if(e===F)return e;let n=void 0!==i?o._$Co?.[i]:o._$Cl;const r=H(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,o,i)),void 0!==i?(o._$Co??=[])[i]=n:o._$Cl=n),void 0!==n&&(e=K(t,n._$AS(t,e.values),n,i)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??L).importNode(e,!0);W.currentNode=i;let n=W.nextNode(),r=0,s=0,a=o[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new J(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new it(n,this,t)),this._$AV.push(e),a=o[++s]}r!==a?.index&&(n=W.nextNode(),r++)}return W.currentNode=L,i}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class J{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),H(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=Y.createElement(q(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Z(i,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=j.get(t.strings);return void 0===e&&j.set(t.strings,e=new Y(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const n of t)i===e.length?e.push(o=new J(this.O(B()),this.O(B()),this,this.options)):o=e[i],o._$AI(n),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=V}_$AI(t,e=this,o,i){const n=this.strings;let r=!1;if(void 0===n)t=K(this,t,e,0),r=!H(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const i=t;let s,a;for(t=n[0],s=0;s<n.length-1;s++)a=K(this,i[o+s],e,s),a===F&&(a=this._$AH[s]),r||=!H(a)||a!==this._$AH[s],a===V?t=V:t!==V&&(t+=(a??"")+n[s+1]),this._$AH[s]=a}r&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class ot extends Q{constructor(t,e,o,i,n){super(t,e,o,i,n),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??V)===F)return;const o=this._$AH,i=t===V&&o!==V||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==V&&(o===V||i);i&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const nt=C.litHtmlPolyfillSupport;nt?.(Y,J),(C.litHtmlVersions??=[]).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let rt=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const i=o?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=o?.renderBefore??null;i._$litPart$=n=new J(e.insertBefore(B(),t),t,void 0,o??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};rt._$litElement$=!0,rt.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:rt});const st=globalThis.litElementPolyfillSupport;st?.({LitElement:rt}),(globalThis.litElementVersions??=[]).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at=t=>(e,o)=>{void 0!==o?o.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,lt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},ct=(t=lt,e,o)=>{const{kind:i,metadata:n}=o;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),r.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const n=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,n,t)},init(e){return void 0!==e&&this.P(i,void 0,t),e}}}if("setter"===i){const{name:i}=o;return function(o){const n=this[i];e.call(this,o),this.requestUpdate(i,n,t)}}throw Error("Unsupported decorator location: "+i)};function ht(t){return(e,o)=>"object"==typeof o?ct(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,i?{...t,wrapped:!0}:t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function dt(t){return ht({...t,state:!0,attribute:!1})}
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
function pt(t,e){return(e,o,i)=>((t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,o),o))(e,o,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const ut={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]};for(const t in ut)Object.freeze(ut[t]);var ft=Object.freeze(ut);const gt={};for(const t of Object.keys(ft))gt[ft[t]]=t;const mt={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},oklab:{channels:3,labels:["okl","oka","okb"]},lch:{channels:3,labels:"lch"},oklch:{channels:3,labels:["okl","okc","okh"]},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}},yt=(6/29)**3;function vt(t){const e=t>.0031308?1.055*t**(1/2.4)-.055:12.92*t;return Math.min(Math.max(0,e),1)}function bt(t){return t>.04045?((t+.055)/1.055)**2.4:t/12.92}for(const t of Object.keys(mt)){if(!("channels"in mt[t]))throw new Error("missing channels property: "+t);if(!("labels"in mt[t]))throw new Error("missing channel labels property: "+t);if(mt[t].labels.length!==mt[t].channels)throw new Error("channel and label counts mismatch: "+t);const{channels:e,labels:o}=mt[t];delete mt[t].channels,delete mt[t].labels,Object.defineProperty(mt[t],"channels",{value:e}),Object.defineProperty(mt[t],"labels",{value:o})}function wt(t,e){return(t[0]-e[0])**2+(t[1]-e[1])**2+(t[2]-e[2])**2}function $t(t){const e=function(){const t={},e=Object.keys(mt);for(let{length:o}=e,i=0;i<o;i++)t[e[i]]={distance:-1,parent:null};return t}(),o=[t];for(e[t].distance=0;o.length>0;){const t=o.pop(),i=Object.keys(mt[t]);for(let{length:n}=i,r=0;r<n;r++){const n=i[r],s=e[n];-1===s.distance&&(s.distance=e[t].distance+1,s.parent=t,o.unshift(n))}}return e}function xt(t,e){return function(o){return e(t(o))}}function Ct(t,e){const o=[e[t].parent,t];let i=mt[e[t].parent][t],n=e[t].parent;for(;e[n].parent;)o.unshift(e[n].parent),i=xt(mt[e[n].parent][n],i),n=e[n].parent;return i.conversion=o,i}function Mt(t){const e=$t(t),o={},i=Object.keys(e);for(let{length:t}=i,n=0;n<t;n++){const t=i[n];null!==e[t].parent&&(o[t]=Ct(t,e))}return o}mt.rgb.hsl=function(t){const e=t[0]/255,o=t[1]/255,i=t[2]/255,n=Math.min(e,o,i),r=Math.max(e,o,i),s=r-n;let a,l;switch(r){case n:a=0;break;case e:a=(o-i)/s;break;case o:a=2+(i-e)/s;break;case i:a=4+(e-o)/s}a=Math.min(60*a,360),a<0&&(a+=360);const c=(n+r)/2;return l=r===n?0:c<=.5?s/(r+n):s/(2-r-n),[a,100*l,100*c]},mt.rgb.hsv=function(t){let e,o,i,n,r;const s=t[0]/255,a=t[1]/255,l=t[2]/255,c=Math.max(s,a,l),h=c-Math.min(s,a,l),d=function(t){return(c-t)/6/h+.5};if(0===h)n=0,r=0;else{switch(r=h/c,e=d(s),o=d(a),i=d(l),c){case s:n=i-o;break;case a:n=1/3+e-i;break;case l:n=2/3+o-e}n<0?n+=1:n>1&&(n-=1)}return[360*n,100*r,100*c]},mt.rgb.hwb=function(t){const e=t[0],o=t[1];let i=t[2];const n=mt.rgb.hsl(t)[0],r=1/255*Math.min(e,Math.min(o,i));return i=1-1/255*Math.max(e,Math.max(o,i)),[n,100*r,100*i]},mt.rgb.oklab=function(t){const e=bt(t[0]/255),o=bt(t[1]/255),i=bt(t[2]/255),n=Math.cbrt(.4122214708*e+.5363325363*o+.0514459929*i),r=Math.cbrt(.2119034982*e+.6806995451*o+.1073969566*i),s=Math.cbrt(.0883024619*e+.2817188376*o+.6299787005*i);return[100*(.2104542553*n+.793617785*r-.0040720468*s),100*(1.9779984951*n-2.428592205*r+.4505937099*s),100*(.0259040371*n+.7827717662*r-.808675766*s)]},mt.rgb.cmyk=function(t){const e=t[0]/255,o=t[1]/255,i=t[2]/255,n=Math.min(1-e,1-o,1-i);return[100*((1-e-n)/(1-n)||0),100*((1-o-n)/(1-n)||0),100*((1-i-n)/(1-n)||0),100*n]},mt.rgb.keyword=function(t){const e=gt[t];if(e)return e;let o,i=Number.POSITIVE_INFINITY;for(const e of Object.keys(ft)){const n=wt(t,ft[e]);n<i&&(i=n,o=e)}return o},mt.keyword.rgb=function(t){return[...ft[t]]},mt.rgb.xyz=function(t){const e=bt(t[0]/255),o=bt(t[1]/255),i=bt(t[2]/255);return[100*(.4124564*e+.3575761*o+.1804375*i),100*(.2126729*e+.7151522*o+.072175*i),100*(.0193339*e+.119192*o+.9503041*i)]},mt.rgb.lab=function(t){const e=mt.rgb.xyz(t);let o=e[0],i=e[1],n=e[2];o/=95.047,i/=100,n/=108.883,o=o>yt?o**(1/3):7.787*o+16/116,i=i>yt?i**(1/3):7.787*i+16/116,n=n>yt?n**(1/3):7.787*n+16/116;return[116*i-16,500*(o-i),200*(i-n)]},mt.hsl.rgb=function(t){const e=t[0]/360,o=t[1]/100,i=t[2]/100;let n,r;if(0===o)return r=255*i,[r,r,r];const s=i<.5?i*(1+o):i+o-i*o,a=2*i-s,l=[0,0,0];for(let t=0;t<3;t++)n=e+1/3*-(t-1),n<0&&n++,n>1&&n--,r=6*n<1?a+6*(s-a)*n:2*n<1?s:3*n<2?a+(s-a)*(2/3-n)*6:a,l[t]=255*r;return l},mt.hsl.hsv=function(t){const e=t[0];let o=t[1]/100,i=t[2]/100,n=o;const r=Math.max(i,.01);i*=2,o*=i<=1?i:2-i,n*=r<=1?r:2-r;return[e,100*(0===i?2*n/(r+n):2*o/(i+o)),100*((i+o)/2)]},mt.hsv.rgb=function(t){const e=t[0]/60,o=t[1]/100;let i=t[2]/100;const n=Math.floor(e)%6,r=e-Math.floor(e),s=255*i*(1-o),a=255*i*(1-o*r),l=255*i*(1-o*(1-r));switch(i*=255,n){case 0:return[i,l,s];case 1:return[a,i,s];case 2:return[s,i,l];case 3:return[s,a,i];case 4:return[l,s,i];case 5:return[i,s,a]}},mt.hsv.hsl=function(t){const e=t[0],o=t[1]/100,i=t[2]/100,n=Math.max(i,.01);let r,s;s=(2-o)*i;const a=(2-o)*n;return r=o*n,r/=a<=1?a:2-a,r=r||0,s/=2,[e,100*r,100*s]},mt.hwb.rgb=function(t){const e=t[0]/360;let o=t[1]/100,i=t[2]/100;const n=o+i;let r;n>1&&(o/=n,i/=n);const s=Math.floor(6*e),a=1-i;r=6*e-s,1&s&&(r=1-r);const l=o+r*(a-o);let c,h,d;switch(s){default:case 6:case 0:c=a,h=l,d=o;break;case 1:c=l,h=a,d=o;break;case 2:c=o,h=a,d=l;break;case 3:c=o,h=l,d=a;break;case 4:c=l,h=o,d=a;break;case 5:c=a,h=o,d=l}return[255*c,255*h,255*d]},mt.cmyk.rgb=function(t){const e=t[0]/100,o=t[1]/100,i=t[2]/100,n=t[3]/100;return[255*(1-Math.min(1,e*(1-n)+n)),255*(1-Math.min(1,o*(1-n)+n)),255*(1-Math.min(1,i*(1-n)+n))]},mt.xyz.rgb=function(t){const e=t[0]/100,o=t[1]/100,i=t[2]/100;let n,r,s;return n=3.2404542*e+-1.5371385*o+-.4985314*i,r=-.969266*e+1.8760108*o+.041556*i,s=.0556434*e+-.2040259*o+1.0572252*i,n=vt(n),r=vt(r),s=vt(s),[255*n,255*r,255*s]},mt.xyz.lab=function(t){let e=t[0],o=t[1],i=t[2];e/=95.047,o/=100,i/=108.883,e=e>yt?e**(1/3):7.787*e+16/116,o=o>yt?o**(1/3):7.787*o+16/116,i=i>yt?i**(1/3):7.787*i+16/116;return[116*o-16,500*(e-o),200*(o-i)]},mt.xyz.oklab=function(t){const e=t[0]/100,o=t[1]/100,i=t[2]/100,n=Math.cbrt(.8189330101*e+.3618667424*o-.1288597137*i),r=Math.cbrt(.0329845436*e+.9293118715*o+.0361456387*i),s=Math.cbrt(.0482003018*e+.2643662691*o+.633851707*i);return[100*(.2104542553*n+.793617785*r-.0040720468*s),100*(1.9779984951*n-2.428592205*r+.4505937099*s),100*(.0259040371*n+.7827717662*r-.808675766*s)]},mt.oklab.oklch=function(t){return mt.lab.lch(t)},mt.oklab.xyz=function(t){const e=t[0]/100,o=t[1]/100,i=t[2]/100,n=(.999999998*e+.396337792*o+.215803758*i)**3,r=(1.000000008*e-.105561342*o-.063854175*i)**3,s=(1.000000055*e-.089484182*o-1.291485538*i)**3;return[100*(1.227013851*n-.55779998*r+.281256149*s),100*(-.040580178*n+1.11225687*r-.071676679*s),100*(-.076381285*n-.421481978*r+1.58616322*s)]},mt.oklab.rgb=function(t){const e=t[0]/100,o=t[1]/100,i=t[2]/100,n=(e+.3963377774*o+.2158037573*i)**3,r=(e-.1055613458*o-.0638541728*i)**3,s=(e-.0894841775*o-1.291485548*i)**3;return[255*vt(4.0767416621*n-3.3077115913*r+.2309699292*s),255*vt(-1.2684380046*n+2.6097574011*r-.3413193965*s),255*vt(-.0041960863*n-.7034186147*r+1.707614701*s)]},mt.oklch.oklab=function(t){return mt.lch.lab(t)},mt.lab.xyz=function(t){let e,o,i;o=(t[0]+16)/116,e=t[1]/500+o,i=o-t[2]/200;const n=o**3,r=e**3,s=i**3;return o=n>yt?n:(o-16/116)/7.787,e=r>yt?r:(e-16/116)/7.787,i=s>yt?s:(i-16/116)/7.787,e*=95.047,o*=100,i*=108.883,[e,o,i]},mt.lab.lch=function(t){const e=t[0],o=t[1],i=t[2];let n;n=360*Math.atan2(i,o)/2/Math.PI,n<0&&(n+=360);return[e,Math.sqrt(o*o+i*i),n]},mt.lch.lab=function(t){const e=t[0],o=t[1],i=t[2]/360*2*Math.PI;return[e,o*Math.cos(i),o*Math.sin(i)]},mt.rgb.ansi16=function(t,e=null){const[o,i,n]=t;let r=null===e?mt.rgb.hsv(t)[2]:e;if(r=Math.round(r/50),0===r)return 30;let s=30+(Math.round(n/255)<<2|Math.round(i/255)<<1|Math.round(o/255));return 2===r&&(s+=60),s},mt.hsv.ansi16=function(t){return mt.rgb.ansi16(mt.hsv.rgb(t),t[2])},mt.rgb.ansi256=function(t){const e=t[0],o=t[1],i=t[2];if(e>>4==o>>4&&o>>4==i>>4)return e<8?16:e>248?231:Math.round((e-8)/247*24)+232;return 16+36*Math.round(e/255*5)+6*Math.round(o/255*5)+Math.round(i/255*5)},mt.ansi16.rgb=function(t){let e=(t=t[0])%10;if(0===e||7===e)return t>50&&(e+=3.5),e=e/10.5*255,[e,e,e];const o=.5*(Math.trunc(t>50)+1);return[(1&e)*o*255,(e>>1&1)*o*255,(e>>2&1)*o*255]},mt.ansi256.rgb=function(t){if((t=t[0])>=232){const e=10*(t-232)+8;return[e,e,e]}let e;t-=16;return[Math.floor(t/36)/5*255,Math.floor((e=t%36)/6)/5*255,e%6/5*255]},mt.rgb.hex=function(t){const e=(((255&Math.round(t[0]))<<16)+((255&Math.round(t[1]))<<8)+(255&Math.round(t[2]))).toString(16).toUpperCase();return"000000".slice(e.length)+e},mt.hex.rgb=function(t){const e=t.toString(16).match(/[a-f\d]{6}|[a-f\d]{3}/i);if(!e)return[0,0,0];let o=e[0];3===e[0].length&&(o=[...o].map((t=>t+t)).join(""));const i=Number.parseInt(o,16);return[i>>16&255,i>>8&255,255&i]},mt.rgb.hcg=function(t){const e=t[0]/255,o=t[1]/255,i=t[2]/255,n=Math.max(Math.max(e,o),i),r=Math.min(Math.min(e,o),i),s=n-r;let a;return a=s<=0?0:n===e?(o-i)/s%6:n===o?2+(i-e)/s:4+(e-o)/s,a/=6,a%=1,[360*a,100*s,100*(s<1?r/(1-s):0)]},mt.hsl.hcg=function(t){const e=t[1]/100,o=t[2]/100,i=o<.5?2*e*o:2*e*(1-o);let n=0;return i<1&&(n=(o-.5*i)/(1-i)),[t[0],100*i,100*n]},mt.hsv.hcg=function(t){const e=t[1]/100,o=t[2]/100,i=e*o;let n=0;return i<1&&(n=(o-i)/(1-i)),[t[0],100*i,100*n]},mt.hcg.rgb=function(t){const e=t[0]/360,o=t[1]/100,i=t[2]/100;if(0===o)return[255*i,255*i,255*i];const n=[0,0,0],r=e%1*6,s=r%1,a=1-s;let l=0;switch(Math.floor(r)){case 0:n[0]=1,n[1]=s,n[2]=0;break;case 1:n[0]=a,n[1]=1,n[2]=0;break;case 2:n[0]=0,n[1]=1,n[2]=s;break;case 3:n[0]=0,n[1]=a,n[2]=1;break;case 4:n[0]=s,n[1]=0,n[2]=1;break;default:n[0]=1,n[1]=0,n[2]=a}return l=(1-o)*i,[255*(o*n[0]+l),255*(o*n[1]+l),255*(o*n[2]+l)]},mt.hcg.hsv=function(t){const e=t[1]/100,o=e+t[2]/100*(1-e);let i=0;return o>0&&(i=e/o),[t[0],100*i,100*o]},mt.hcg.hsl=function(t){const e=t[1]/100,o=t[2]/100*(1-e)+.5*e;let i=0;return o>0&&o<.5?i=e/(2*o):o>=.5&&o<1&&(i=e/(2*(1-o))),[t[0],100*i,100*o]},mt.hcg.hwb=function(t){const e=t[1]/100,o=e+t[2]/100*(1-e);return[t[0],100*(o-e),100*(1-o)]},mt.hwb.hcg=function(t){const e=t[1]/100,o=1-t[2]/100,i=o-e;let n=0;return i<1&&(n=(o-i)/(1-i)),[t[0],100*i,100*n]},mt.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]},mt.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]},mt.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]},mt.gray.hsl=function(t){return[0,0,t[0]]},mt.gray.hsv=mt.gray.hsl,mt.gray.hwb=function(t){return[0,100,t[0]]},mt.gray.cmyk=function(t){return[0,0,0,t[0]]},mt.gray.lab=function(t){return[t[0],0,0]},mt.gray.hex=function(t){const e=255&Math.round(t[0]/100*255),o=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".slice(o.length)+o},mt.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]};const St={},_t=Object.keys(mt);function Et(t){const e=function(...e){const o=e[0];return null==o?o:(o.length>1&&(e=o),t(e))};return"conversion"in t&&(e.conversion=t.conversion),e}function kt(t){const e=function(...e){const o=e[0];if(null==o)return o;o.length>1&&(e=o);const i=t(e);if("object"==typeof i)for(let{length:t}=i,e=0;e<t;e++)i[e]=Math.round(i[e]);return i};return"conversion"in t&&(e.conversion=t.conversion),e}for(const t of _t){St[t]={},Object.defineProperty(St[t],"channels",{value:mt[t].channels}),Object.defineProperty(St[t],"labels",{value:mt[t].labels});const e=Mt(t),o=Object.keys(e);for(const i of o){const o=e[i];St[t][i]=kt(o),St[t][i].raw=Et(o)}}function At(t,e,o){return t+(e-t)*o}function Lt(t,e,o){return Math.max(e,Math.min(o,t))}var Bt,Ht;function Rt(t,e,o,i=!1){const n=St[t][e];return i&&n.raw?n.raw(o):n(o)}!function(t){t.RGB255="rgb255",t.RGB01="rgb01",t.HEX="hex",t.HSV="hsv",t.HSL="hsl",t.LCH="lch"}(Bt||(Bt={}));class Pt{constructor(t={}){this.a=1,t.type==Bt.RGB255?this.conversionInput=[Lt(t.r||0,0,255),Lt(t.g||0,0,255),Lt(t.b||0,0,255)]:t.type==Bt.RGB01?this.conversionInput=[Lt(Math.round(255*(t.r||0)),0,255),Lt(Math.round(255*(t.g||0)),0,255),Lt(Math.round(255*(t.b||0)),0,255)]:t.type==Bt.HEX?this.conversionInput=t.hex||"#000000":t.type==Bt.HSV?this.conversionInput=[t.h||0,t.s||0,t.v||0]:t.type==Bt.HSL?this.conversionInput=[t.h||0,t.s||0,t.l||0]:t.type==Bt.LCH?this.conversionInput=[t.l||0,t.c||0,t.h||0]:(t={type:Bt.RGB255,...t},this.conversionInput=[0,0,0]),this.input=t,Object.freeze(this)}get model(){switch(this.input.type){case Bt.HEX:return"hex";case Bt.HSV:return"hsv";case Bt.HSL:return"hsl";case Bt.LCH:return"lch";case Bt.RGB255:case Bt.RGB01:default:return"rgb"}}getRGB255(){return this.input.type===Bt.RGB255?[this.input.r||0,this.input.g||0,this.input.b||0]:this.input.type===Bt.RGB01?[Math.round(255*(this.input.r||0)),Math.round(255*(this.input.g||0)),Math.round(255*(this.input.b||0))]:Rt(this.model,"rgb",this.conversionInput)}getRGB01(){return this.input.type===Bt.RGB255?[(this.input.r||0)/255,(this.input.g||0)/255,(this.input.b||0)/255]:this.input.type===Bt.RGB01?[this.input.r||0,this.input.g||0,this.input.b||0]:this.getRGB255().map((t=>t/255))}getHex(){return this.input.type===Bt.HEX?this.input.hex||"":Rt(this.model,"hex",this.conversionInput)}getHSV(t=!0){if(this.input.type===Bt.HSV){const e=[this.input.h||0,this.input.s||0,this.input.v||0];return t?e:e.map((t=>Math.round(t)))}return Rt(this.model,"hsv",this.conversionInput,t)}getHSL(t=!0){if(this.input.type===Bt.HSL){const e=[this.input.h||0,this.input.s||0,this.input.l||0];return t?e:e.map((t=>Math.round(t)))}return Rt(this.model,"hsl",this.conversionInput,t)}getLCH(t=!0){if(this.input.type===Bt.LCH){const e=[this.input.l||0,this.input.c||0,this.input.h||0];return t?e:e.map((t=>Math.round(t)))}return Rt(this.model,"lch",this.conversionInput,t)}toCSS(){return`rgba(${this.getRGB255().join(", ")})`}static fromRGB255Array(t){return new Pt({type:Bt.RGB255,r:t[0],g:t[1],b:t[2]})}}!function(t){t.RGB="rgb",t.HSV="hsv",t.HSL="hsl",t.HSL_FLIP="hsl_flip",t.LCH="lch"}(Ht||(Ht={}));const zt={[Ht.RGB]:function(t,e,o){const[i,n,r]=t.getRGB01(),[s,a,l]=e.getRGB01();return new Pt({type:Bt.RGB01,r:At(i,s,o),g:At(n,a,o),b:At(r,l,o)})},[Ht.HSV]:function(t,e,o){const i=t.getHSV(),n=e.getHSV();return new Pt({type:Bt.HSV,h:At(i[0],n[0],o),s:At(i[1],n[1],o),v:At(i[2],n[2],o)})},[Ht.HSL]:function(t,e,o){const i=t.getHSL(),n=e.getHSL(),r=Math.abs(i[0]-n[0])>180,s=At(i[0]+360*Number(r&&i[0]<n[0]),n[0]+360*Number(r&&n[0]<i[0]),o);return new Pt({type:Bt.HSL,h:s,s:At(i[1],n[1],o),l:At(i[2],n[2],o)})},[Ht.HSL_FLIP]:function(t,e,o){const i=t.getHSL(),n=e.getHSL(),r=Math.abs(i[0]-n[0])>180,s=At(i[0]+360*Number(!r&&i[0]<n[0]),n[0]+360*Number(!r&&n[0]<i[0]),o);return new Pt({type:Bt.HSL,h:s,s:At(i[1],n[1],o),l:At(i[2],n[2],o)})},[Ht.LCH]:function(t,e,o){const i=t.getLCH(),n=e.getLCH();return new Pt({type:Bt.LCH,l:At(i[0],n[0],o),c:At(i[1],n[1],o),h:At(i[2],n[2],o)})}};function Tt(t,e,o,i=Ht.RGB){return zt[i](t,e,o)}class Ot{constructor(t=new Pt({type:Bt.RGB01,r:1,g:0,b:0}),e=new Pt({type:Bt.RGB01,r:1,g:1,b:1})){this.colors=[],this.positions=[],this.addColorStop(0,t),this.addColorStop(1,e)}setColorStop(t,e){const o=this.positions.indexOf(t);-1==o?this.addColorStop(t,e):this.colors[o]=e}addColorStop(t,e){this.colors.push(e),this.positions.push(t)}getColorAt(t,e){if(0===this.colors.length)return new Pt({});if(1===this.colors.length)return this.colors[0];let o=0;for(;o<this.positions.length&&t>this.positions[o];)o++;if(0===o)return this.colors[0];if(o===this.positions.length)return this.colors[this.colors.length-1];const i=this.positions[o-1],n=this.positions[o];return Tt(this.colors[o-1],this.colors[o],(t-i)/(n-i),e)}getBackgroundImageStyle(t=Ht.RGB){let e="linear-gradient(to right";for(let o=0;o<=100;o++)e+=", "+this.getColorAt(o/100,t).toCSS()+" "+o+"%";return e+=")",e}}const Nt=s`.color-selection {
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
`,Ut=G`<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  crossorigin="anonymous"
/> `;class It extends Event{constructor(t){super(It.eventName,{bubbles:!0,composed:!0}),this.color=t}}It.eventName="set-color";class Dt extends Event{constructor(t){super(Dt.eventName,{bubbles:!0,composed:!0}),this.active=t}}Dt.eventName="set-interpolation-active";let Gt=class extends rt{constructor(){super(...arguments),this.typeName="",this.type="RGB"}};var Ft;t([ht()],Gt.prototype,"typeName",void 0),t([ht()],Gt.prototype,"type",void 0),Gt=t([at("color-interpolation-gradient")],Gt),function(t){t.LEFT="left",t.RIGHT="right",t.NONE="none"}(Ft||(Ft={}));let Vt=class extends rt{constructor(){super(...arguments),this.activeColor=Ft.NONE,this.leftColor=new Pt({}),this.rightColor=new Pt({}),this.colorGradient=new Ot,this.onMouseMoveBound=this.onMouseMove.bind(this),this.onMouseUpBound=this.onMouseUp.bind(this),this.selectedGolorGradientDiv=null}setColor(t){this.dispatchEvent(new It(t))}setActiveColor(t){this.dispatchEvent(new Dt(t))}setActiveColorLeft(){this.setActiveColor(this.activeColor==Ft.LEFT?Ft.NONE:Ft.LEFT)}setActiveColorRight(){this.setActiveColor(this.activeColor==Ft.RIGHT?Ft.NONE:Ft.RIGHT)}onMouseMove(t){if(this.selectedGolorGradientDiv instanceof HTMLDivElement){const e=this.selectedGolorGradientDiv.getAttribute("data-mode")||"",o=this.selectedGolorGradientDiv.getBoundingClientRect(),i=(t.clientX-o.left)/o.width,n=this.colorGradient.getColorAt(i,Ht[e.toUpperCase()]);this.setActiveColor(Ft.NONE),this.setColor(n)}}onMouseDown(t){this.selectedGolorGradientDiv=t.currentTarget,document.addEventListener("mousemove",this.onMouseMoveBound),document.addEventListener("mouseup",this.onMouseUpBound)}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMoveBound),document.removeEventListener("mouseup",this.onMouseUpBound),this.selectedGolorGradientDiv=null}render(){return this.colorGradient=new Ot(this.leftColor,this.rightColor),G`
      ${Ut}
      <h5>Color Interpolation</h5>
      <table class="table mb-0">
        <tbody>
          <tr>
            <td>
              <div
                class="color-selection ${this.activeColor===Ft.LEFT?"active":""}"
                @click=${this.setActiveColorLeft}
                style="background: #${this.leftColor.getHex()}"
              ></div>
            </td>
            <td>
              <div
                class="color-selection ${this.activeColor===Ft.RIGHT?"active":""}"
                @click=${this.setActiveColorRight}
                style="background: #${this.rightColor.getHex()}"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table mb-0">
        <tbody>
          ${Array.prototype.map.call(this.children,(t=>{if(t instanceof Gt){const e=Ht[t.type];return G` <tr>
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
    `}};Vt.styles=[Nt],t([ht()],Vt.prototype,"activeColor",void 0),t([ht({attribute:!1})],Vt.prototype,"leftColor",void 0),t([ht({attribute:!1})],Vt.prototype,"rightColor",void 0),Vt=t([at("color-interpolation")],Vt);const jt=s`:host {
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
}`;class Wt extends Event{constructor(t){super(Wt.eventName,{bubbles:!0,composed:!0}),this.coordinates=t}}Wt.eventName="set-coordinates";const qt=s`:host {
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
  background: linear-gradient(in hsl to right,
      #f00 0%,
      #ff0 17%,
      #0f0 33%,
      #0ff 50%,
      #00f 66%,
      #f0f 83%,
      #f00 100%);
}`,Xt=s`.color-bar-pointer {
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
}`;let Yt=class extends rt{constructor(){super(...arguments),this.hue=0}render(){const t="#"+new Pt({type:Bt.HSV,h:this.hue,s:100,v:100}).getHex(),e=this.hue/360*100+"%";return G`
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
    `}};Yt.styles=[Xt],t([ht({type:Number})],Yt.prototype,"hue",void 0),Yt=t([at("color-selection-type-a-bar-pointer")],Yt);let Kt=class extends rt{constructor(){super(...arguments),this.color=new Pt,this.onMouseMoveBound=this.onMouseMove.bind(this),this.onMouseUpBound=this.onMouseUp.bind(this)}setColor(t){this.dispatchEvent(new It(t))}onMouseMove(t){const[,e,o]=this.color.getHSV();if(1==t.buttons){const i=this.colorBar.getBoundingClientRect(),n=360*Lt((t.clientX-i.left)/i.width,0,1);this.setColor(new Pt({type:Bt.HSV,h:n,s:e,v:o}))}}onMouseDown(){document.addEventListener("mousemove",this.onMouseMoveBound),document.addEventListener("mouseup",this.onMouseUpBound)}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMoveBound),document.removeEventListener("mouseup",this.onMouseUpBound)}render(){const[t]=this.color.getHSV();return G`
      ${Ut}
      <div class="color-bar" @mousedown=${this.onMouseDown} id="color-bar">
        <color-selection-type-a-bar-pointer
          hue=${t}
        ></color-selection-type-a-bar-pointer>
      </div>
    `}};Kt.styles=[qt],t([ht({attribute:!1})],Kt.prototype,"color",void 0),t([pt("#color-bar")],Kt.prototype,"colorBar",void 0),Kt=t([at("color-selection-type-a-bar")],Kt);let Zt=class extends rt{constructor(){super(...arguments),this.color=new Pt,this.onMouseMoveBound=this.onMouseMove.bind(this),this.onMouseUpBound=this.onMouseUp.bind(this)}setColor(t){this.dispatchEvent(new It(t))}onMouseMove(t){const[e]=this.color.getHSV();if(1==t.buttons){const o=this.colorGradContainer.getBoundingClientRect(),i=100*Lt((t.clientX-o.left)/o.width,0,1),n=100*(1-Lt((t.clientY-o.top)/o.height,0,1));this.setColor(new Pt({type:Bt.HSV,h:e,s:i,v:n}))}}onMouseDown(){document.addEventListener("mousemove",this.onMouseMoveBound),document.addEventListener("mouseup",this.onMouseUpBound)}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMoveBound),document.removeEventListener("mouseup",this.onMouseUpBound)}render(){const[t,e,o]=this.color.getHSV(),i=`linear-gradient(to right, #FFF 0%, ${"#"+new Pt({type:Bt.HSV,h:t,s:100,v:100}).getHex()} 100%)`,n=`\n      top: calc(${100*(1-o/100)}% - 0.5rem);\n      left: calc(${e/100*100}% - 0.5rem);\n      background-color: #${this.color.getHex()};\n      border-color: ${o<50?"white":"black"};\n    `;return G`
      ${Ut}
      <div class="color-grad-container" id="color-grad-container">
        <div
          class="color-grad color-grad-1"
          style="background: ${i};"
        ></div>
        <div
          class="color-grad color-grad-2"
          @mousedown=${this.onMouseDown.bind(this)}
        ></div>
        <div class="color-grad-circle" style=${n}></div>
      </div>
    `}};Zt.styles=[qt,s`
      :host {
        flex: 1;
      }
    `],t([ht({attribute:!1})],Zt.prototype,"color",void 0),t([pt("#color-grad-container")],Zt.prototype,"colorGradContainer",void 0),Zt=t([at("color-selection-type-a-grad")],Zt);let Jt=class extends rt{constructor(){super(...arguments),this.color=new Pt}render(){return G`
      ${Ut}
      <color-selection-type-a-grad
        .color=${this.color}
      ></color-selection-type-a-grad>
      <color-selection-type-a-bar
        .color=${this.color}
      ></color-selection-type-a-bar>
    `}};Jt.styles=[qt],t([ht({attribute:!1})],Jt.prototype,"color",void 0),Jt=t([at("color-selection-type-a")],Jt);let Qt=class extends rt{constructor(){super(...arguments),this.color=new Pt,this.onMouseMoveBound=this.onMouseMove.bind(this),this.onMouseUpBound=this.onMouseUp.bind(this)}setColor(t){this.dispatchEvent(new It(t))}onMouseMove(t){const e=this.colorGrad.getBoundingClientRect(),o=t.clientX-e.left-e.width/2,i=t.clientY-e.top-e.height/2,n=Math.sqrt(o*o+i*i)/(e.width/2),r=Math.min(n,1),s=(Math.atan2(i,o)*(180/Math.PI)+90+360)%360;this.setColor(new Pt({type:Bt.HSL,h:s,s:100*r,l:50}))}onMouseDown(){document.addEventListener("mousemove",this.onMouseMoveBound),document.addEventListener("mouseup",this.onMouseUpBound)}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMoveBound),document.removeEventListener("mouseup",this.onMouseUpBound)}render(){const[t,e]=this.color.getHSL(),o=.5*e/100,i=3*Math.PI/2+t*(Math.PI/180),n=Math.cos(i)*o,r=`\n            top: ${50+100*(Math.sin(i)*o)}%;\n            left: ${50+100*n}%;\n            background-color: #${new Pt({type:Bt.HSL,h:t,s:e,l:50}).getHex()};\n        `;return G`
      ${Ut}
      <div
        class="color-grad"
        id="color-grad"
        style=${"\n          background-image: radial-gradient(\n            circle at center,\n            hsl(0, 0%, 50%, 1) 0%,\n            hsl(0, 100%, 0%, 0) 70%\n          ),\n          conic-gradient(\n            in hsl shorter hue,\n            hsl(0, 100%, 50%),\n            /* Red */ hsl(60, 100%, 50%),\n            /* Yellow */ hsl(120, 100%, 50%),\n            /* Lime */ hsl(180, 100%, 50%),\n            /* Cyan */ hsl(240, 100%, 50%),\n            /* Blue */ hsl(300, 100%, 50%),\n            /* Magenta */ hsl(360, 100%, 50%)\n          );"}
        @mousedown=${this.onMouseDown}
      >
        <div class="color-grad-circle" style=${r}></div>
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
    `],t([ht({attribute:!1})],Qt.prototype,"color",void 0),t([pt("#color-grad")],Qt.prototype,"colorGrad",void 0),Qt=t([at("color-selection-type-b-wheel")],Qt);let te=class extends rt{constructor(){super(...arguments),this.color=new Pt}render(){const[,,t]=this.color.getHSL(),e="#"+this.color.getHex();return G`
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
    `}};te.styles=[Xt],t([ht({attribute:!1})],te.prototype,"color",void 0),te=t([at("color-selection-type-b-bar-pointer")],te);let ee=class extends rt{constructor(){super(...arguments),this.color=new Pt,this.onMouseMoveBound=this.onMouseMove.bind(this),this.onMouseUpBound=this.onMouseUp.bind(this)}setColor(t){this.dispatchEvent(new It(t))}onMouseMove(t){const[e,o]=this.color.getHSL(),i=this.colorBar.getBoundingClientRect(),n=100*Lt((t.clientX-i.left)/i.width,0,1);this.setColor(new Pt({type:Bt.HSL,h:e,s:o,l:n}))}onMouseDown(){document.addEventListener("mousemove",this.onMouseMoveBound),document.addEventListener("mouseup",this.onMouseUpBound)}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMoveBound),document.removeEventListener("mouseup",this.onMouseUpBound)}render(){const[t,e]=this.color.getHSL(),o=["background: linear-gradient(","to right,"];for(let i=0;i<=100;i++){const n=i;o.push(`hsl(${t}deg, ${e}%, ${n}%) ${i}%`+(i<100?",":""))}o.push(");");const i=o.join("\n");return G`
      ${Ut}
      <div
        class="color-bar"
        @mousedown=${this.onMouseDown}
        id="color-bar"
        style=${i}
      >
        <color-selection-type-b-bar-pointer
          .color=${this.color}
        ></color-selection-type-b-bar-pointer>
      </div>
    `}};ee.styles=s`
    .color-bar {
      width: 100%;
      height: 1.5rem;
      margin-top: 0.5rem;
      border-radius: 0.25rem;
    }
  `,t([ht({attribute:!1})],ee.prototype,"color",void 0),t([pt("#color-bar")],ee.prototype,"colorBar",void 0),ee=t([at("color-selection-type-b-bar")],ee);let oe=class extends rt{constructor(){super(...arguments),this.color=new Pt}render(){return G`
      ${Ut}
      <color-selection-type-b-wheel
        .color=${this.color}
      ></color-selection-type-b-wheel>
      <color-selection-type-b-bar
        .color=${this.color}
      ></color-selection-type-b-bar>
    `}};var ie;oe.styles=[s`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 20rem;
        margin: 0 auto;
      }
    `],t([ht({attribute:!1})],oe.prototype,"color",void 0),oe=t([at("color-selection-type-b")],oe),function(t){t.HSV="HSV",t.HSL_WHEEL="HSL_WHEEL"}(ie||(ie={}));let ne=class extends rt{constructor(){super(...arguments),this.color=new Pt,this.colorSelectionType=ie.HSV}getColorSelectionHtml(){return this.colorSelectionType===ie.HSV?G`<color-selection-type-a
        .color=${this.color}
      ></color-selection-type-a>`:G`<color-selection-type-b
        .color=${this.color}
      ></color-selection-type-b>`}render(){return G`
      ${Ut}
      <h5>Color Selection</h5>
      <div
        class="btn-group color-selection-picker"
        role="group"
        aria-label="Color Selection"
      >
        <input
          type="radio"
          class="btn-check"
          name="options"
          id="option1"
          autocomplete="off"
          .checked=${this.colorSelectionType===ie.HSV}
        />
        <label
          class="btn btn-secondary"
          for="option1"
          @click=${()=>{this.colorSelectionType=ie.HSV}}
          >HSV</label
        >
        <input
          type="radio"
          class="btn-check"
          name="options"
          id="option2"
          autocomplete="off"
          .checked=${this.colorSelectionType===ie.HSL_WHEEL}
        />
        <label
          class="btn btn-secondary"
          for="option2"
          @click=${()=>{this.colorSelectionType=ie.HSL_WHEEL}}
          >HSL Wheel</label
        >
      </div>
      ${this.getColorSelectionHtml()}
    `}};ne.styles=s`
    :host {
      display: flex;
      justify-content: center;
    }

    :host > h5 {
      flex: 0;
    }

    :host > .color-selection-picker {
      flex: 0;
      margin-bottom: 0.5rem;
    }

    :host > * {
      flex: 1;
    }
  `,t([ht({attribute:!1})],ne.prototype,"color",void 0),t([ht({attribute:!1})],ne.prototype,"colorSelectionType",void 0),ne=t([at("color-selection")],ne);const re=s`.inputs-container {
  gap: 0.25rem;
}

table > * {
  --bs-table-bg: transparent;
}
`;var se=s`
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
`,ae=s`
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
`;const le=new Set,ce=new Map;let he,de="ltr",pe="en";const ue="undefined"!=typeof MutationObserver&&"undefined"!=typeof document&&void 0!==document.documentElement;if(ue){const t=new MutationObserver(ge);de=document.documentElement.dir||"ltr",pe=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function fe(...t){t.map((t=>{const e=t.$code.toLowerCase();ce.has(e)?ce.set(e,Object.assign(Object.assign({},ce.get(e)),t)):ce.set(e,t),he||(he=t)})),ge()}function ge(){ue&&(de=document.documentElement.dir||"ltr",pe=document.documentElement.lang||navigator.language),[...le.keys()].map((t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()}))}let me=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){le.add(this.host)}hostDisconnected(){le.delete(this.host)}dir(){return`${this.host.dir||de}`.toLowerCase()}lang(){return`${this.host.lang||pe}`.toLowerCase()}getTranslationData(t){var e,o;const i=new Intl.Locale(t.replace(/_/g,"-")),n=null==i?void 0:i.language.toLowerCase(),r=null!==(o=null===(e=null==i?void 0:i.region)||void 0===e?void 0:e.toLowerCase())&&void 0!==o?o:"";return{locale:i,language:n,region:r,primary:ce.get(`${n}-${r}`),secondary:ce.get(n)}}exists(t,e){var o;const{primary:i,secondary:n}=this.getTranslationData(null!==(o=e.lang)&&void 0!==o?o:this.lang());return e=Object.assign({includeFallback:!1},e),!!(i&&i[t]||n&&n[t]||e.includeFallback&&he&&he[t])}term(t,...e){const{primary:o,secondary:i}=this.getTranslationData(this.lang());let n;if(o&&o[t])n=o[t];else if(i&&i[t])n=i[t];else{if(!he||!he[t])return console.error(`No translation found for: ${String(t)}`),String(t);n=he[t]}return"function"==typeof n?n(...e):n}date(t,e){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),e).format(t)}number(t,e){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),e).format(t)}relativeTime(t,e,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(t,e)}};var ye={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};fe(ye);var ve=ye,be=class extends me{};fe(ve);var we,$e=s`
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
`,xe=Object.defineProperty,Ce=Object.defineProperties,Me=Object.getOwnPropertyDescriptor,Se=Object.getOwnPropertyDescriptors,_e=Object.getOwnPropertySymbols,Ee=Object.prototype.hasOwnProperty,ke=Object.prototype.propertyIsEnumerable,Ae=t=>{throw TypeError(t)},Le=(t,e,o)=>e in t?xe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,Be=(t,e)=>{for(var o in e||(e={}))Ee.call(e,o)&&Le(t,o,e[o]);if(_e)for(var o of _e(e))ke.call(e,o)&&Le(t,o,e[o]);return t},He=(t,e)=>Ce(t,Se(e)),Re=(t,e,o,i)=>{for(var n,r=i>1?void 0:i?Me(e,o):e,s=t.length-1;s>=0;s--)(n=t[s])&&(r=(i?n(e,o,r):n(r))||r);return i&&r&&xe(e,o,r),r},Pe=(t,e,o)=>e.has(t)||Ae("Cannot "+o),ze=class extends rt{constructor(){var t,e,o;super(),t=this,o=!1,(e=we).has(t)?Ae("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach((([t,e])=>{this.constructor.define(t,e)}))}emit(t,e){const o=new CustomEvent(t,Be({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(o),o}static define(t,e=this,o={}){const i=customElements.get(t);if(!i){try{customElements.define(t,e,o)}catch(i){customElements.define(t,class extends e{},o)}return}let n=" (unknown version)",r=n;"version"in e&&e.version&&(n=" v"+e.version),"version"in i&&i.version&&(r=" v"+i.version),n&&r&&n===r||console.warn(`Attempted to register <${t}>${n}, but <${t}>${r} has already been registered.`)}attributeChangedCallback(t,e,o){var i,n;Pe(i=this,n=we,"read from private field"),n.get(i)||(this.constructor.elementProperties.forEach(((t,e)=>{t.reflect&&null!=this[e]&&this.initialReflectedProperties.set(e,this[e])})),((t,e,o)=>{Pe(t,e,"write to private field"),e.set(t,o)})(this,we,!0)),super.attributeChangedCallback(t,e,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach(((e,o)=>{t.has(o)&&null==this[o]&&(this[o]=e)}))}};we=new WeakMap,ze.version="2.19.1",ze.dependencies={},Re([ht()],ze.prototype,"dir",2),Re([ht()],ze.prototype,"lang",2);const Te=Math.min,Oe=Math.max,Ne=Math.round,Ue=Math.floor,Ie=t=>({x:t,y:t}),De={left:"right",right:"left",bottom:"top",top:"bottom"},Ge={start:"end",end:"start"};function Fe(t,e,o){return Oe(t,Te(e,o))}function Ve(t,e){return"function"==typeof t?t(e):t}function je(t){return t.split("-")[0]}function We(t){return t.split("-")[1]}function qe(t){return"x"===t?"y":"x"}function Xe(t){return"y"===t?"height":"width"}function Ye(t){return["top","bottom"].includes(je(t))?"y":"x"}function Ke(t){return qe(Ye(t))}function Ze(t){return t.replace(/start|end/g,(t=>Ge[t]))}function Je(t){return t.replace(/left|right|bottom|top/g,(t=>De[t]))}function Qe(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function to(t){const{x:e,y:o,width:i,height:n}=t;return{width:i,height:n,top:o,left:e,right:e+i,bottom:o+n,x:e,y:o}}function eo(t,e,o){let{reference:i,floating:n}=t;const r=Ye(e),s=Ke(e),a=Xe(s),l=je(e),c="y"===r,h=i.x+i.width/2-n.width/2,d=i.y+i.height/2-n.height/2,p=i[a]/2-n[a]/2;let u;switch(l){case"top":u={x:h,y:i.y-n.height};break;case"bottom":u={x:h,y:i.y+i.height};break;case"right":u={x:i.x+i.width,y:d};break;case"left":u={x:i.x-n.width,y:d};break;default:u={x:i.x,y:i.y}}switch(We(e)){case"start":u[s]-=p*(o&&c?-1:1);break;case"end":u[s]+=p*(o&&c?-1:1)}return u}async function oo(t,e){var o;void 0===e&&(e={});const{x:i,y:n,platform:r,rects:s,elements:a,strategy:l}=t,{boundary:c="clippingAncestors",rootBoundary:h="viewport",elementContext:d="floating",altBoundary:p=!1,padding:u=0}=Ve(e,t),f=Qe(u),g=a[p?"floating"===d?"reference":"floating":d],m=to(await r.getClippingRect({element:null==(o=await(null==r.isElement?void 0:r.isElement(g)))||o?g:g.contextElement||await(null==r.getDocumentElement?void 0:r.getDocumentElement(a.floating)),boundary:c,rootBoundary:h,strategy:l})),y="floating"===d?{x:i,y:n,width:s.floating.width,height:s.floating.height}:s.reference,v=await(null==r.getOffsetParent?void 0:r.getOffsetParent(a.floating)),b=await(null==r.isElement?void 0:r.isElement(v))&&await(null==r.getScale?void 0:r.getScale(v))||{x:1,y:1},w=to(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:y,offsetParent:v,strategy:l}):y);return{top:(m.top-w.top+f.top)/b.y,bottom:(w.bottom-m.bottom+f.bottom)/b.y,left:(m.left-w.left+f.left)/b.x,right:(w.right-m.right+f.right)/b.x}}function io(){return"undefined"!=typeof window}function no(t){return ao(t)?(t.nodeName||"").toLowerCase():"#document"}function ro(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function so(t){var e;return null==(e=(ao(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function ao(t){return!!io()&&(t instanceof Node||t instanceof ro(t).Node)}function lo(t){return!!io()&&(t instanceof Element||t instanceof ro(t).Element)}function co(t){return!!io()&&(t instanceof HTMLElement||t instanceof ro(t).HTMLElement)}function ho(t){return!(!io()||"undefined"==typeof ShadowRoot)&&(t instanceof ShadowRoot||t instanceof ro(t).ShadowRoot)}function po(t){const{overflow:e,overflowX:o,overflowY:i,display:n}=vo(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+o)&&!["inline","contents"].includes(n)}function uo(t){return["table","td","th"].includes(no(t))}function fo(t){return[":popover-open",":modal"].some((e=>{try{return t.matches(e)}catch(t){return!1}}))}function go(t){const e=mo(),o=lo(t)?vo(t):t;return["transform","translate","scale","rotate","perspective"].some((t=>!!o[t]&&"none"!==o[t]))||!!o.containerType&&"normal"!==o.containerType||!e&&!!o.backdropFilter&&"none"!==o.backdropFilter||!e&&!!o.filter&&"none"!==o.filter||["transform","translate","scale","rotate","perspective","filter"].some((t=>(o.willChange||"").includes(t)))||["paint","layout","strict","content"].some((t=>(o.contain||"").includes(t)))}function mo(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function yo(t){return["html","body","#document"].includes(no(t))}function vo(t){return ro(t).getComputedStyle(t)}function bo(t){return lo(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function wo(t){if("html"===no(t))return t;const e=t.assignedSlot||t.parentNode||ho(t)&&t.host||so(t);return ho(e)?e.host:e}function $o(t){const e=wo(t);return yo(e)?t.ownerDocument?t.ownerDocument.body:t.body:co(e)&&po(e)?e:$o(e)}function xo(t,e,o){var i;void 0===e&&(e=[]),void 0===o&&(o=!0);const n=$o(t),r=n===(null==(i=t.ownerDocument)?void 0:i.body),s=ro(n);if(r){const t=Co(s);return e.concat(s,s.visualViewport||[],po(n)?n:[],t&&o?xo(t):[])}return e.concat(n,xo(n,[],o))}function Co(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Mo(t){const e=vo(t);let o=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const n=co(t),r=n?t.offsetWidth:o,s=n?t.offsetHeight:i,a=Ne(o)!==r||Ne(i)!==s;return a&&(o=r,i=s),{width:o,height:i,$:a}}function So(t){return lo(t)?t:t.contextElement}function _o(t){const e=So(t);if(!co(e))return Ie(1);const o=e.getBoundingClientRect(),{width:i,height:n,$:r}=Mo(e);let s=(r?Ne(o.width):o.width)/i,a=(r?Ne(o.height):o.height)/n;return s&&Number.isFinite(s)||(s=1),a&&Number.isFinite(a)||(a=1),{x:s,y:a}}const Eo=Ie(0);function ko(t){const e=ro(t);return mo()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:Eo}function Ao(t,e,o,i){void 0===e&&(e=!1),void 0===o&&(o=!1);const n=t.getBoundingClientRect(),r=So(t);let s=Ie(1);e&&(i?lo(i)&&(s=_o(i)):s=_o(t));const a=function(t,e,o){return void 0===e&&(e=!1),!(!o||e&&o!==ro(t))&&e}(r,o,i)?ko(r):Ie(0);let l=(n.left+a.x)/s.x,c=(n.top+a.y)/s.y,h=n.width/s.x,d=n.height/s.y;if(r){const t=ro(r),e=i&&lo(i)?ro(i):i;let o=t,n=Co(o);for(;n&&i&&e!==o;){const t=_o(n),e=n.getBoundingClientRect(),i=vo(n),r=e.left+(n.clientLeft+parseFloat(i.paddingLeft))*t.x,s=e.top+(n.clientTop+parseFloat(i.paddingTop))*t.y;l*=t.x,c*=t.y,h*=t.x,d*=t.y,l+=r,c+=s,o=ro(n),n=Co(o)}}return to({width:h,height:d,x:l,y:c})}function Lo(t,e){const o=bo(t).scrollLeft;return e?e.left+o:Ao(so(t)).left+o}function Bo(t,e,o){void 0===o&&(o=!1);const i=t.getBoundingClientRect();return{x:i.left+e.scrollLeft-(o?0:Lo(t,i)),y:i.top+e.scrollTop}}function Ho(t,e,o){let i;if("viewport"===e)i=function(t,e){const o=ro(t),i=so(t),n=o.visualViewport;let r=i.clientWidth,s=i.clientHeight,a=0,l=0;if(n){r=n.width,s=n.height;const t=mo();(!t||t&&"fixed"===e)&&(a=n.offsetLeft,l=n.offsetTop)}return{width:r,height:s,x:a,y:l}}(t,o);else if("document"===e)i=function(t){const e=so(t),o=bo(t),i=t.ownerDocument.body,n=Oe(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),r=Oe(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let s=-o.scrollLeft+Lo(t);const a=-o.scrollTop;return"rtl"===vo(i).direction&&(s+=Oe(e.clientWidth,i.clientWidth)-n),{width:n,height:r,x:s,y:a}}(so(t));else if(lo(e))i=function(t,e){const o=Ao(t,!0,"fixed"===e),i=o.top+t.clientTop,n=o.left+t.clientLeft,r=co(t)?_o(t):Ie(1);return{width:t.clientWidth*r.x,height:t.clientHeight*r.y,x:n*r.x,y:i*r.y}}(e,o);else{const o=ko(t);i={x:e.x-o.x,y:e.y-o.y,width:e.width,height:e.height}}return to(i)}function Ro(t,e){const o=wo(t);return!(o===e||!lo(o)||yo(o))&&("fixed"===vo(o).position||Ro(o,e))}function Po(t,e,o){const i=co(e),n=so(e),r="fixed"===o,s=Ao(t,!0,r,e);let a={scrollLeft:0,scrollTop:0};const l=Ie(0);if(i||!i&&!r)if(("body"!==no(e)||po(n))&&(a=bo(e)),i){const t=Ao(e,!0,r,e);l.x=t.x+e.clientLeft,l.y=t.y+e.clientTop}else n&&(l.x=Lo(n));const c=!n||i||r?Ie(0):Bo(n,a);return{x:s.left+a.scrollLeft-l.x-c.x,y:s.top+a.scrollTop-l.y-c.y,width:s.width,height:s.height}}function zo(t){return"static"===vo(t).position}function To(t,e){if(!co(t)||"fixed"===vo(t).position)return null;if(e)return e(t);let o=t.offsetParent;return so(t)===o&&(o=o.ownerDocument.body),o}function Oo(t,e){const o=ro(t);if(fo(t))return o;if(!co(t)){let e=wo(t);for(;e&&!yo(e);){if(lo(e)&&!zo(e))return e;e=wo(e)}return o}let i=To(t,e);for(;i&&uo(i)&&zo(i);)i=To(i,e);return i&&yo(i)&&zo(i)&&!go(i)?o:i||function(t){let e=wo(t);for(;co(e)&&!yo(e);){if(go(e))return e;if(fo(e))return null;e=wo(e)}return null}(t)||o}const No={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:e,rect:o,offsetParent:i,strategy:n}=t;const r="fixed"===n,s=so(i),a=!!e&&fo(e.floating);if(i===s||a&&r)return o;let l={scrollLeft:0,scrollTop:0},c=Ie(1);const h=Ie(0),d=co(i);if((d||!d&&!r)&&(("body"!==no(i)||po(s))&&(l=bo(i)),co(i))){const t=Ao(i);c=_o(i),h.x=t.x+i.clientLeft,h.y=t.y+i.clientTop}const p=!s||d||r?Ie(0):Bo(s,l,!0);return{width:o.width*c.x,height:o.height*c.y,x:o.x*c.x-l.scrollLeft*c.x+h.x+p.x,y:o.y*c.y-l.scrollTop*c.y+h.y+p.y}},getDocumentElement:so,getClippingRect:function(t){let{element:e,boundary:o,rootBoundary:i,strategy:n}=t;const r=[..."clippingAncestors"===o?fo(e)?[]:function(t,e){const o=e.get(t);if(o)return o;let i=xo(t,[],!1).filter((t=>lo(t)&&"body"!==no(t))),n=null;const r="fixed"===vo(t).position;let s=r?wo(t):t;for(;lo(s)&&!yo(s);){const e=vo(s),o=go(s);o||"fixed"!==e.position||(n=null),(r?!o&&!n:!o&&"static"===e.position&&n&&["absolute","fixed"].includes(n.position)||po(s)&&!o&&Ro(t,s))?i=i.filter((t=>t!==s)):n=e,s=wo(s)}return e.set(t,i),i}(e,this._c):[].concat(o),i],s=r[0],a=r.reduce(((t,o)=>{const i=Ho(e,o,n);return t.top=Oe(i.top,t.top),t.right=Te(i.right,t.right),t.bottom=Te(i.bottom,t.bottom),t.left=Oe(i.left,t.left),t}),Ho(e,s,n));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}},getOffsetParent:Oo,getElementRects:async function(t){const e=this.getOffsetParent||Oo,o=this.getDimensions,i=await o(t.floating);return{reference:Po(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}},getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){const{width:e,height:o}=Mo(t);return{width:e,height:o}},getScale:_o,isElement:lo,isRTL:function(t){return"rtl"===vo(t).direction}};function Uo(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function Io(t,e,o,i){void 0===i&&(i={});const{ancestorScroll:n=!0,ancestorResize:r=!0,elementResize:s="function"==typeof ResizeObserver,layoutShift:a="function"==typeof IntersectionObserver,animationFrame:l=!1}=i,c=So(t),h=n||r?[...c?xo(c):[],...xo(e)]:[];h.forEach((t=>{n&&t.addEventListener("scroll",o,{passive:!0}),r&&t.addEventListener("resize",o)}));const d=c&&a?function(t,e){let o,i=null;const n=so(t);function r(){var t;clearTimeout(o),null==(t=i)||t.disconnect(),i=null}return function s(a,l){void 0===a&&(a=!1),void 0===l&&(l=1),r();const c=t.getBoundingClientRect(),{left:h,top:d,width:p,height:u}=c;if(a||e(),!p||!u)return;const f={rootMargin:-Ue(d)+"px "+-Ue(n.clientWidth-(h+p))+"px "+-Ue(n.clientHeight-(d+u))+"px "+-Ue(h)+"px",threshold:Oe(0,Te(1,l))||1};let g=!0;function m(e){const i=e[0].intersectionRatio;if(i!==l){if(!g)return s();i?s(!1,i):o=setTimeout((()=>{s(!1,1e-7)}),1e3)}1!==i||Uo(c,t.getBoundingClientRect())||s(),g=!1}try{i=new IntersectionObserver(m,{...f,root:n.ownerDocument})}catch(t){i=new IntersectionObserver(m,f)}i.observe(t)}(!0),r}(c,o):null;let p,u=-1,f=null;s&&(f=new ResizeObserver((t=>{let[i]=t;i&&i.target===c&&f&&(f.unobserve(e),cancelAnimationFrame(u),u=requestAnimationFrame((()=>{var t;null==(t=f)||t.observe(e)}))),o()})),c&&!l&&f.observe(c),f.observe(e));let g=l?Ao(t):null;return l&&function e(){const i=Ao(t);g&&!Uo(g,i)&&o();g=i,p=requestAnimationFrame(e)}(),o(),()=>{var t;h.forEach((t=>{n&&t.removeEventListener("scroll",o),r&&t.removeEventListener("resize",o)})),null==d||d(),null==(t=f)||t.disconnect(),f=null,l&&cancelAnimationFrame(p)}}const Do=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(e){var o,i;const{x:n,y:r,placement:s,middlewareData:a}=e,l=await async function(t,e){const{placement:o,platform:i,elements:n}=t,r=await(null==i.isRTL?void 0:i.isRTL(n.floating)),s=je(o),a=We(o),l="y"===Ye(o),c=["left","top"].includes(s)?-1:1,h=r&&l?-1:1,d=Ve(e,t);let{mainAxis:p,crossAxis:u,alignmentAxis:f}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return a&&"number"==typeof f&&(u="end"===a?-1*f:f),l?{x:u*h,y:p*c}:{x:p*c,y:u*h}}(e,t);return s===(null==(o=a.offset)?void 0:o.placement)&&null!=(i=a.arrow)&&i.alignmentOffset?{}:{x:n+l.x,y:r+l.y,data:{...l,placement:s}}}}},Go=function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:i,placement:n}=e,{mainAxis:r=!0,crossAxis:s=!1,limiter:a={fn:t=>{let{x:e,y:o}=t;return{x:e,y:o}}},...l}=Ve(t,e),c={x:o,y:i},h=await oo(e,l),d=Ye(je(n)),p=qe(d);let u=c[p],f=c[d];if(r){const t="y"===p?"bottom":"right";u=Fe(u+h["y"===p?"top":"left"],u,u-h[t])}if(s){const t="y"===d?"bottom":"right";f=Fe(f+h["y"===d?"top":"left"],f,f-h[t])}const g=a.fn({...e,[p]:u,[d]:f});return{...g,data:{x:g.x-o,y:g.y-i,enabled:{[p]:r,[d]:s}}}}}},Fo=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var o,i;const{placement:n,middlewareData:r,rects:s,initialPlacement:a,platform:l,elements:c}=e,{mainAxis:h=!0,crossAxis:d=!0,fallbackPlacements:p,fallbackStrategy:u="bestFit",fallbackAxisSideDirection:f="none",flipAlignment:g=!0,...m}=Ve(t,e);if(null!=(o=r.arrow)&&o.alignmentOffset)return{};const y=je(n),v=Ye(a),b=je(a)===a,w=await(null==l.isRTL?void 0:l.isRTL(c.floating)),$=p||(b||!g?[Je(a)]:function(t){const e=Je(t);return[Ze(t),e,Ze(e)]}(a)),x="none"!==f;!p&&x&&$.push(...function(t,e,o,i){const n=We(t);let r=function(t,e,o){const i=["left","right"],n=["right","left"],r=["top","bottom"],s=["bottom","top"];switch(t){case"top":case"bottom":return o?e?n:i:e?i:n;case"left":case"right":return e?r:s;default:return[]}}(je(t),"start"===o,i);return n&&(r=r.map((t=>t+"-"+n)),e&&(r=r.concat(r.map(Ze)))),r}(a,g,f,w));const C=[a,...$],M=await oo(e,m),S=[];let _=(null==(i=r.flip)?void 0:i.overflows)||[];if(h&&S.push(M[y]),d){const t=function(t,e,o){void 0===o&&(o=!1);const i=We(t),n=Ke(t),r=Xe(n);let s="x"===n?i===(o?"end":"start")?"right":"left":"start"===i?"bottom":"top";return e.reference[r]>e.floating[r]&&(s=Je(s)),[s,Je(s)]}(n,s,w);S.push(M[t[0]],M[t[1]])}if(_=[..._,{placement:n,overflows:S}],!S.every((t=>t<=0))){var E,k;const t=((null==(E=r.flip)?void 0:E.index)||0)+1,e=C[t];if(e)return{data:{index:t,overflows:_},reset:{placement:e}};let o=null==(k=_.filter((t=>t.overflows[0]<=0)).sort(((t,e)=>t.overflows[1]-e.overflows[1]))[0])?void 0:k.placement;if(!o)switch(u){case"bestFit":{var A;const t=null==(A=_.filter((t=>{if(x){const e=Ye(t.placement);return e===v||"y"===e}return!0})).map((t=>[t.placement,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:A[0];t&&(o=t);break}case"initialPlacement":o=a}if(n!==o)return{reset:{placement:o}}}return{}}}},Vo=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(e){var o,i;const{placement:n,rects:r,platform:s,elements:a}=e,{apply:l=()=>{},...c}=Ve(t,e),h=await oo(e,c),d=je(n),p=We(n),u="y"===Ye(n),{width:f,height:g}=r.floating;let m,y;"top"===d||"bottom"===d?(m=d,y=p===(await(null==s.isRTL?void 0:s.isRTL(a.floating))?"start":"end")?"left":"right"):(y=d,m="end"===p?"top":"bottom");const v=g-h.top-h.bottom,b=f-h.left-h.right,w=Te(g-h[m],v),$=Te(f-h[y],b),x=!e.middlewareData.shift;let C=w,M=$;if(null!=(o=e.middlewareData.shift)&&o.enabled.x&&(M=b),null!=(i=e.middlewareData.shift)&&i.enabled.y&&(C=v),x&&!p){const t=Oe(h.left,0),e=Oe(h.right,0),o=Oe(h.top,0),i=Oe(h.bottom,0);u?M=f-2*(0!==t||0!==e?t+e:Oe(h.left,h.right)):C=g-2*(0!==o||0!==i?o+i:Oe(h.top,h.bottom))}await l({...e,availableWidth:M,availableHeight:C});const S=await s.getDimensions(a.floating);return f!==S.width||g!==S.height?{reset:{rects:!0}}:{}}}},jo=t=>({name:"arrow",options:t,async fn(e){const{x:o,y:i,placement:n,rects:r,platform:s,elements:a,middlewareData:l}=e,{element:c,padding:h=0}=Ve(t,e)||{};if(null==c)return{};const d=Qe(h),p={x:o,y:i},u=Ke(n),f=Xe(u),g=await s.getDimensions(c),m="y"===u,y=m?"top":"left",v=m?"bottom":"right",b=m?"clientHeight":"clientWidth",w=r.reference[f]+r.reference[u]-p[u]-r.floating[f],$=p[u]-r.reference[u],x=await(null==s.getOffsetParent?void 0:s.getOffsetParent(c));let C=x?x[b]:0;C&&await(null==s.isElement?void 0:s.isElement(x))||(C=a.floating[b]||r.floating[f]);const M=w/2-$/2,S=C/2-g[f]/2-1,_=Te(d[y],S),E=Te(d[v],S),k=_,A=C-g[f]-E,L=C/2-g[f]/2+M,B=Fe(k,L,A),H=!l.arrow&&null!=We(n)&&L!==B&&r.reference[f]/2-(L<k?_:E)-g[f]/2<0,R=H?L<k?L-k:L-A:0;return{[u]:p[u]+R,data:{[u]:B,centerOffset:L-B-R,...H&&{alignmentOffset:R}},reset:H}}}),Wo=(t,e,o)=>{const i=new Map,n={platform:No,...o},r={...n.platform,_c:i};return(async(t,e,o)=>{const{placement:i="bottom",strategy:n="absolute",middleware:r=[],platform:s}=o,a=r.filter(Boolean),l=await(null==s.isRTL?void 0:s.isRTL(e));let c=await s.getElementRects({reference:t,floating:e,strategy:n}),{x:h,y:d}=eo(c,i,l),p=i,u={},f=0;for(let o=0;o<a.length;o++){const{name:r,fn:g}=a[o],{x:m,y:y,data:v,reset:b}=await g({x:h,y:d,initialPlacement:i,placement:p,strategy:n,middlewareData:u,rects:c,platform:s,elements:{reference:t,floating:e}});h=null!=m?m:h,d=null!=y?y:d,u={...u,[r]:{...u[r],...v}},b&&f<=50&&(f++,"object"==typeof b&&(b.placement&&(p=b.placement),b.rects&&(c=!0===b.rects?await s.getElementRects({reference:t,floating:e,strategy:n}):b.rects),({x:h,y:d}=eo(c,p,l))),o=-1)}return{x:h,y:d,placement:p,strategy:n,middlewareData:u}})(t,e,{...n,platform:r})},qo=1,Xo=2,Yo=t=>(...e)=>({_$litDirective$:t,values:e});class Ko{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zo=Yo(class extends Ko{constructor(t){if(super(t),t.type!==qo||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const o=t.element.classList;for(const t of this.st)t in e||(o.remove(t),this.st.delete(t));for(const t in e){const i=!!e[t];i===this.st.has(t)||this.nt?.has(t)||(i?(o.add(t),this.st.add(t)):(o.remove(t),this.st.delete(t)))}return F}});function Jo(t){return function(t){for(let e=t;e;e=Qo(e))if(e instanceof Element&&"none"===getComputedStyle(e).display)return null;for(let e=Qo(t);e;e=Qo(e)){if(!(e instanceof Element))continue;const t=getComputedStyle(e);if("contents"!==t.display){if("static"!==t.position||go(t))return e;if("BODY"===e.tagName)return e}}return null}(t)}function Qo(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}var ti=class extends ze{constructor(){super(...arguments),this.localize=new be(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect();let o=0,i=0,n=0,r=0,s=0,a=0,l=0,c=0;this.placement.includes("top")||this.placement.includes("bottom")?t.top<e.top?(o=t.left,i=t.bottom,n=t.right,r=t.bottom,s=e.left,a=e.top,l=e.right,c=e.top):(o=e.left,i=e.bottom,n=e.right,r=e.bottom,s=t.left,a=t.top,l=t.right,c=t.top):t.left<e.left?(o=t.right,i=t.top,n=e.left,r=e.top,s=t.right,a=t.bottom,l=e.left,c=e.bottom):(o=e.right,i=e.top,n=t.left,r=t.top,s=e.right,a=e.bottom,l=t.left,c=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${n}px`),this.style.setProperty("--hover-bridge-top-right-y",`${r}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${c}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||function(t){return null!==t&&"object"==typeof t&&"getBoundingClientRect"in t&&(!("contextElement"in t)||t instanceof Element)}(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){this.anchorEl&&this.active&&(this.cleanup=Io(this.anchorEl,this.popup,(()=>{this.reposition()})))}async stop(){return new Promise((t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame((()=>t()))):t()}))}reposition(){if(!this.active||!this.anchorEl)return;const t=[Do({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(Vo({apply:({rects:t})=>{const e="width"===this.sync||"both"===this.sync,o="height"===this.sync||"both"===this.sync;this.popup.style.width=e?`${t.reference.width}px`:"",this.popup.style.height=o?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(Fo({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Go({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(Vo({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:e})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${e}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(jo({element:this.arrowEl,padding:this.arrowPadding}));const e="absolute"===this.strategy?t=>No.getOffsetParent(t,Jo):No.getOffsetParent;Wo(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:He(Be({},No),{getOffsetParent:e})}).then((({x:t,y:e,middlewareData:o,placement:i})=>{const n="rtl"===this.localize.dir(),r={top:"bottom",right:"left",bottom:"top",left:"right"}[i.split("-")[0]];if(this.setAttribute("data-current-placement",i),Object.assign(this.popup.style,{left:`${t}px`,top:`${e}px`}),this.arrow){const t=o.arrow.x,e=o.arrow.y;let i="",s="",a="",l="";if("start"===this.arrowPlacement){const o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",s=n?o:"",l=n?"":o}else if("end"===this.arrowPlacement){const o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";s=n?"":o,l=n?o:"",a="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(l="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",i="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":""):(l="number"==typeof t?`${t}px`:"",i="number"==typeof e?`${e}px`:"");Object.assign(this.arrowEl.style,{top:i,right:s,bottom:a,left:l,[r]:"calc(var(--arrow-size-diagonal) * -1)"})}})),requestAnimationFrame((()=>this.updateHoverBridge())),this.emit("sl-reposition")}render(){return G`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${Zo({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${Zo({popup:!0,"popup--active":this.active,"popup--fixed":"fixed"===this.strategy,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?G`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};ti.styles=[$e,ae],Re([pt(".popup")],ti.prototype,"popup",2),Re([pt(".popup__arrow")],ti.prototype,"arrowEl",2),Re([ht()],ti.prototype,"anchor",2),Re([ht({type:Boolean,reflect:!0})],ti.prototype,"active",2),Re([ht({reflect:!0})],ti.prototype,"placement",2),Re([ht({reflect:!0})],ti.prototype,"strategy",2),Re([ht({type:Number})],ti.prototype,"distance",2),Re([ht({type:Number})],ti.prototype,"skidding",2),Re([ht({type:Boolean})],ti.prototype,"arrow",2),Re([ht({attribute:"arrow-placement"})],ti.prototype,"arrowPlacement",2),Re([ht({attribute:"arrow-padding",type:Number})],ti.prototype,"arrowPadding",2),Re([ht({type:Boolean})],ti.prototype,"flip",2),Re([ht({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map((t=>t.trim())).filter((t=>""!==t)),toAttribute:t=>t.join(" ")}})],ti.prototype,"flipFallbackPlacements",2),Re([ht({attribute:"flip-fallback-strategy"})],ti.prototype,"flipFallbackStrategy",2),Re([ht({type:Object})],ti.prototype,"flipBoundary",2),Re([ht({attribute:"flip-padding",type:Number})],ti.prototype,"flipPadding",2),Re([ht({type:Boolean})],ti.prototype,"shift",2),Re([ht({type:Object})],ti.prototype,"shiftBoundary",2),Re([ht({attribute:"shift-padding",type:Number})],ti.prototype,"shiftPadding",2),Re([ht({attribute:"auto-size"})],ti.prototype,"autoSize",2),Re([ht()],ti.prototype,"sync",2),Re([ht({type:Object})],ti.prototype,"autoSizeBoundary",2),Re([ht({attribute:"auto-size-padding",type:Number})],ti.prototype,"autoSizePadding",2),Re([ht({attribute:"hover-bridge",type:Boolean})],ti.prototype,"hoverBridge",2);var ei=new Map,oi=new WeakMap;function ii(t,e){return"rtl"===e.toLowerCase()?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function ni(t,e){ei.set(t,function(t){return null!=t?t:{keyframes:[],options:{duration:0}}}(e))}function ri(t,e,o){const i=oi.get(t);if(null==i?void 0:i[e])return ii(i[e],o.dir);const n=ei.get(e);return n?ii(n,o.dir):{keyframes:[],options:{duration:0}}}function si(t,e){return new Promise((o=>{t.addEventListener(e,(function i(n){n.target===t&&(t.removeEventListener(e,i),o())}))}))}function ai(t,e,o){return new Promise((i=>{if((null==o?void 0:o.duration)===1/0)throw new Error("Promise-based animations must be finite.");const n=t.animate(e,He(Be({},o),{duration:ci()?0:o.duration}));n.addEventListener("cancel",i,{once:!0}),n.addEventListener("finish",i,{once:!0})}))}function li(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?1e3*parseFloat(t):parseFloat(t)}function ci(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function hi(t){return Promise.all(t.getAnimations().map((t=>new Promise((e=>{t.cancel(),requestAnimationFrame(e)})))))}function di(t,e){const o=Be({waitUntilFirstUpdate:!1},e);return(e,i)=>{const{update:n}=e,r=Array.isArray(t)?t:[t];e.update=function(t){r.forEach((e=>{const n=e;if(t.has(n)){const e=t.get(n),r=this[n];e!==r&&(o.waitUntilFirstUpdate&&!this.hasUpdated||this[i](e,r))}})),n.call(this,t)}}}var pi=class extends ze{constructor(){super(),this.localize=new be(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const t=li(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>this.show()),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const t=li(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>this.hide()),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await hi(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:e,options:o}=ri(this,"tooltip.show",{dir:this.localize.dir()});await ai(this.popup.popup,e,o),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),null==(e=this.closeWatcher)||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await hi(this.body);const{keyframes:t,options:o}=ri(this,"tooltip.hide",{dir:this.localize.dir()});await ai(this.popup.popup,t,o),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,si(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,si(this,"sl-after-hide")}render(){return G`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${Zo({tooltip:!0,"tooltip--open":this.open})}
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
    `}};pi.styles=[$e,se],pi.dependencies={"sl-popup":ti},Re([pt("slot:not([name])")],pi.prototype,"defaultSlot",2),Re([pt(".tooltip__body")],pi.prototype,"body",2),Re([pt("sl-popup")],pi.prototype,"popup",2),Re([ht()],pi.prototype,"content",2),Re([ht()],pi.prototype,"placement",2),Re([ht({type:Boolean,reflect:!0})],pi.prototype,"disabled",2),Re([ht({type:Number})],pi.prototype,"distance",2),Re([ht({type:Boolean,reflect:!0})],pi.prototype,"open",2),Re([ht({type:Number})],pi.prototype,"skidding",2),Re([ht()],pi.prototype,"trigger",2),Re([ht({type:Boolean})],pi.prototype,"hoist",2),Re([di("open",{waitUntilFirstUpdate:!0})],pi.prototype,"handleOpenChange",1),Re([di(["content","distance","hoist","placement","skidding"])],pi.prototype,"handleOptionsChange",1),Re([di("disabled")],pi.prototype,"handleDisabledChange",1),ni("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}}),ni("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});var ui=s`
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
`,fi=s`
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
`,gi="";function mi(t){gi=t}var yi={name:"default",resolver:t=>function(t=""){if(!gi){const t=[...document.getElementsByTagName("script")],e=t.find((t=>t.hasAttribute("data-shoelace")));if(e)mi(e.getAttribute("data-shoelace"));else{const e=t.find((t=>/shoelace(\.min)?\.js($|\?)/.test(t.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(t.src)));let o="";e&&(o=e.getAttribute("src")),mi(o.split("/").slice(0,-1).join("/"))}}return gi.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}(`assets/icons/${t}.svg`)},vi={caret:'\n    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n      <polyline points="6 9 12 15 18 9"></polyline>\n    </svg>\n  ',check:'\n    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor">\n          <g transform="translate(3.428571, 3.428571)">\n            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>\n            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"chevron-down":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',"chevron-left":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>\n    </svg>\n  ',"chevron-right":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',copy:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>\n    </svg>\n  ',eye:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n    </svg>\n  ',"eye-slash":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">\n      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>\n      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>\n      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>\n    </svg>\n  ',eyedropper:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">\n      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>\n    </svg>\n  ',"grip-vertical":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">\n      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>\n    </svg>\n  ',indeterminate:'\n    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor" stroke-width="2">\n          <g transform="translate(2.285714, 6.857143)">\n            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"person-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">\n      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>\n    </svg>\n  ',"play-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">\n      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>\n    </svg>\n  ',"pause-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">\n      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>\n    </svg>\n  ',radio:'\n    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g fill="currentColor">\n          <circle cx="8" cy="8" r="3.42857143"></circle>\n        </g>\n      </g>\n    </svg>\n  ',"star-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">\n      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n    </svg>\n  ',"x-lg":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">\n      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>\n    </svg>\n  ',"x-circle-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">\n      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>\n    </svg>\n  '},bi=[yi,{name:"system",resolver:t=>t in vi?`data:image/svg+xml,${encodeURIComponent(vi[t])}`:""}],wi=[];function $i(t){return bi.find((e=>e.name===t))}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var xi,Ci=Symbol(),Mi=Symbol(),Si=new Map,_i=class extends ze{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var o;let i;if(null==e?void 0:e.spriteSheet)return this.svg=G`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(i=await fetch(t,{mode:"cors"}),!i.ok)return 410===i.status?Ci:Mi}catch(t){return Mi}try{const t=document.createElement("div");t.innerHTML=await i.text();const e=t.firstElementChild;if("svg"!==(null==(o=null==e?void 0:e.tagName)?void 0:o.toLowerCase()))return Ci;xi||(xi=new DOMParser);const n=xi.parseFromString(e.outerHTML,"text/html").body.querySelector("svg");return n?(n.part.add("svg"),document.adoptNode(n)):Ci}catch(t){return Ci}}connectedCallback(){var t;super.connectedCallback(),t=this,wi.push(t)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){var t;super.disconnectedCallback(),t=this,wi=wi.filter((e=>e!==t))}getIconSource(){const t=$i(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const{url:e,fromLibrary:o}=this.getIconSource(),i=o?$i(this.library):void 0;if(!e)return void(this.svg=null);let n=Si.get(e);if(n||(n=this.resolveIcon(e,i),Si.set(e,n)),!this.initialRender)return;const r=await n;if(r===Mi&&Si.delete(e),e===this.getIconSource().url)if((t=>void 0!==t?._$litType$)(r)){if(this.svg=r,i){await this.updateComplete;const t=this.shadowRoot.querySelector("[part='svg']");"function"==typeof i.mutator&&t&&i.mutator(t)}}else switch(r){case Mi:case Ci:this.svg=null,this.emit("sl-error");break;default:this.svg=r.cloneNode(!0),null==(t=null==i?void 0:i.mutator)||t.call(i,this.svg),this.emit("sl-load")}}render(){return this.svg}};_i.styles=[$e,fi],Re([dt()],_i.prototype,"svg",2),Re([ht({reflect:!0})],_i.prototype,"name",2),Re([ht()],_i.prototype,"src",2),Re([ht()],_i.prototype,"label",2),Re([ht({reflect:!0})],_i.prototype,"library",2),Re([di("label")],_i.prototype,"handleLabelChange",1),Re([di(["name","src","library"])],_i.prototype,"setIcon",1);var Ei,ki=class extends ze{constructor(){super(...arguments),this.localize=new be(this),this.isCopying=!1,this.status="rest",this.value="",this.from="",this.disabled=!1,this.copyLabel="",this.successLabel="",this.errorLabel="",this.feedbackDuration=1e3,this.tooltipPlacement="top",this.hoist=!1}async handleCopy(){if(this.disabled||this.isCopying)return;this.isCopying=!0;let t=this.value;if(this.from){const e=this.getRootNode(),o=this.from.includes("."),i=this.from.includes("[")&&this.from.includes("]");let n=this.from,r="";o?[n,r]=this.from.trim().split("."):i&&([n,r]=this.from.trim().replace(/\]$/,"").split("["));const s="getElementById"in e?e.getElementById(n):null;s?t=i?s.getAttribute(r)||"":o?s[r]||"":s.textContent||"":(this.showStatus("error"),this.emit("sl-error"))}if(t)try{await navigator.clipboard.writeText(t),this.showStatus("success"),this.emit("sl-copy",{detail:{value:t}})}catch(t){this.showStatus("error"),this.emit("sl-error")}else this.showStatus("error"),this.emit("sl-error")}async showStatus(t){const e=this.copyLabel||this.localize.term("copy"),o=this.successLabel||this.localize.term("copied"),i=this.errorLabel||this.localize.term("error"),n="success"===t?this.successIcon:this.errorIcon,r=ri(this,"copy.in",{dir:"ltr"}),s=ri(this,"copy.out",{dir:"ltr"});this.tooltip.content="success"===t?o:i,await this.copyIcon.animate(s.keyframes,s.options).finished,this.copyIcon.hidden=!0,this.status=t,n.hidden=!1,await n.animate(r.keyframes,r.options).finished,setTimeout((async()=>{await n.animate(s.keyframes,s.options).finished,n.hidden=!0,this.status="rest",this.copyIcon.hidden=!1,await this.copyIcon.animate(r.keyframes,r.options).finished,this.tooltip.content=e,this.isCopying=!1}),this.feedbackDuration)}render(){const t=this.copyLabel||this.localize.term("copy");return G`
      <sl-tooltip
        class=${Zo({"copy-button":!0,"copy-button--success":"success"===this.status,"copy-button--error":"error"===this.status})}
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
    `}};ki.styles=[$e,ui],ki.dependencies={"sl-icon":_i,"sl-tooltip":pi},Re([pt('slot[name="copy-icon"]')],ki.prototype,"copyIcon",2),Re([pt('slot[name="success-icon"]')],ki.prototype,"successIcon",2),Re([pt('slot[name="error-icon"]')],ki.prototype,"errorIcon",2),Re([pt("sl-tooltip")],ki.prototype,"tooltip",2),Re([dt()],ki.prototype,"isCopying",2),Re([dt()],ki.prototype,"status",2),Re([ht()],ki.prototype,"value",2),Re([ht()],ki.prototype,"from",2),Re([ht({type:Boolean,reflect:!0})],ki.prototype,"disabled",2),Re([ht({attribute:"copy-label"})],ki.prototype,"copyLabel",2),Re([ht({attribute:"success-label"})],ki.prototype,"successLabel",2),Re([ht({attribute:"error-label"})],ki.prototype,"errorLabel",2),Re([ht({attribute:"feedback-duration",type:Number})],ki.prototype,"feedbackDuration",2),Re([ht({attribute:"tooltip-placement"})],ki.prototype,"tooltipPlacement",2),Re([ht({type:Boolean})],ki.prototype,"hoist",2),ni("copy.in",{keyframes:[{scale:".25",opacity:".25"},{scale:"1",opacity:"1"}],options:{duration:100}}),ni("copy.out",{keyframes:[{scale:"1",opacity:"1"},{scale:".25",opacity:"0"}],options:{duration:100}}),ki.define("sl-copy-button");class Ai extends Event{constructor(t,e){super(Ai.type,{bubbles:!0,composed:!0}),this.inputType=t,this.value=e}}Ai.type="color-converter-input",function(t){t.HEX="HEX",t.RGB255="RGB255",t.RGB01="RGB01",t.HSV="HSV",t.HSL="HSL"}(Ei||(Ei={}));const Li={[Ei.HEX]:"Hex",[Ei.RGB255]:"RGB (0-255)",[Ei.RGB01]:"RGB (0-1)",[Ei.HSV]:"HSV",[Ei.HSL]:"HSL"},Bi={[Ei.HEX]:"hexValue",[Ei.RGB255]:"rgb255Value",[Ei.RGB01]:"rgb01Value",[Ei.HSV]:"hsvValue",[Ei.HSL]:"hslValue"},Hi={[Ei.HEX]:t=>"#"+t.getHex(),[Ei.RGB255]:t=>t.getRGB255().splice(0,3).toString(),[Ei.RGB01]:t=>t.getRGB01().splice(0,3).map((t=>t.toFixed(3))).toString(),[Ei.HSV]:t=>t.getHSV(!1).splice(0,3).toString(),[Ei.HSL]:t=>t.getHSL(!1).splice(0,3).toString()};let Ri=class extends rt{constructor(){super(...arguments),this.type=Ei.HEX,this.inputValues={},this.color=new Pt}onValueChange(t){this.dispatchEvent(new Ai(this.type,t.target.value))}render(){const t=this.inputValues[Bi[this.type]]??Hi[this.type](this.color);return G`
      ${Ut}
      <div class="input-group">
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            .value=${t}
            @input=${this.onValueChange}
          />
          <label>${Li[this.type]}</label>
        </div>
        <span class="input-group-text">
          <sl-copy-button value=${t}></sl-copy-button>
        </span>
      </div>
    `}};t([ht()],Ri.prototype,"type",void 0),t([ht({attribute:!1})],Ri.prototype,"inputValues",void 0),t([ht({attribute:!1})],Ri.prototype,"color",void 0),Ri=t([at("color-converter-input")],Ri);const Pi=/^#?([0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)$/,zi=/^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/,Ti=/^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/,Oi=/^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;const Ni={[Ei.HEX]:function(t){const e=Pi.exec(t);return e&&2==e.length?new Pt({type:Bt.HEX,hex:e[1]}):null},[Ei.RGB255]:function(t){const e=zi.exec(t);return e&&4==e.length?new Pt({type:Bt.RGB255,r:parseInt(e[1]),g:parseInt(e[2]),b:parseInt(e[3])}):null},[Ei.RGB01]:function(t){const e=Ti.exec(t);return e&&4==e.length?new Pt({type:Bt.RGB01,r:parseFloat(e[1]),g:parseFloat(e[2]),b:parseFloat(e[3])}):null},[Ei.HSV]:function(t){const e=Oi.exec(t);if(e&&4==e.length){const t=parseFloat(e[1]),o=parseFloat(e[2]),i=parseFloat(e[3]);if(0<=t&&t<=360&&0<=o&&o<=100&&0<=i&&i<=100)return new Pt({type:Bt.HSV,h:parseFloat(e[1]),s:parseFloat(e[2]),v:parseFloat(e[3])})}return null},[Ei.HSL]:function(t){const e=Oi.exec(t);if(e&&4==e.length){const t=parseFloat(e[1]),o=parseFloat(e[2]),i=parseFloat(e[3]);if(0<=t&&t<=360&&0<=o&&o<=100&&0<=i&&i<=100)return new Pt({type:Bt.HSL,h:parseFloat(e[1]),s:parseFloat(e[2]),v:parseFloat(e[3])})}return null}};let Ui=class extends rt{constructor(){super(),this.color=new Pt,this.coordinates={x:0,y:0,width:0,height:0},this.inputValues={},this.addEventListener(Ai.type,(t=>{if(t instanceof Ai){const{inputType:e,value:o}=t,i=Ni[e](o);null!=i&&(this.setColor(i),this.inputValues={[Bi[e]]:o})}}))}setColor(t){this.dispatchEvent(new It(t))}updateChildren(){Array.prototype.forEach.call(this.children,(t=>{t instanceof Ri&&(t.inputValues=this.inputValues,t.color=this.color)}))}render(){const t={x:this.coordinates.x/this.coordinates.width,y:this.coordinates.y/this.coordinates.height},e=[t.x.toFixed(3),t.y.toFixed(3)],o=[Math.round(this.coordinates.x),Math.round(this.coordinates.y)];return this.updateChildren(),G`
      ${Ut}
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
    `}};Ui.styles=[re],t([ht({attribute:!1})],Ui.prototype,"color",void 0),t([ht({attribute:!1})],Ui.prototype,"coordinates",void 0),t([dt()],Ui.prototype,"inputValues",void 0),Ui=t([at("color-converter")],Ui);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ii=(t,e)=>{const o=t._$AN;if(void 0===o)return!1;for(const t of o)t._$AO?.(e,!1),Ii(t,e);return!0},Di=t=>{let e,o;do{if(void 0===(e=t._$AM))break;o=e._$AN,o.delete(t),t=e}while(0===o?.size)},Gi=t=>{for(let e;e=t._$AM;t=e){let o=e._$AN;if(void 0===o)e._$AN=o=new Set;else if(o.has(t))break;o.add(t),ji(e)}};function Fi(t){void 0!==this._$AN?(Di(this),this._$AM=t,Gi(this)):this._$AM=t}function Vi(t,e=!1,o=0){const i=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(e)if(Array.isArray(i))for(let t=o;t<i.length;t++)Ii(i[t],!1),Di(i[t]);else null!=i&&(Ii(i,!1),Di(i));else Ii(this,t)}const ji=t=>{t.type==Xo&&(t._$AP??=Vi,t._$AQ??=Fi)};class Wi extends Ko{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,o){super._$AT(t,e,o),Gi(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(Ii(this,t),Di(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class qi{}const Xi=new WeakMap,Yi=Yo(class extends Wi{render(t){return V}update(t,[e]){const o=e!==this.Y;return o&&void 0!==this.Y&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.Y=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),V}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.Y){const e=this.ht??globalThis;let o=Xi.get(e);void 0===o&&(o=new WeakMap,Xi.set(e,o)),void 0!==o.get(this.Y)&&this.Y.call(this.ht,void 0),o.set(this.Y,t),void 0!==t&&this.Y.call(this.ht,t)}else this.Y.value=t}get lt(){return"function"==typeof this.Y?Xi.get(this.ht??globalThis)?.get(this.Y):this.Y?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Ki=s`:host {
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
`;var Zi,Ji;!function(t){t.Transparent="transparent",t.Black="black",t.White="white"}(Zi||(Zi={})),function(t){t.Small="small",t.Medium="medium",t.Large="large"}(Ji||(Ji={}));const Qi={[Ji.Small]:"1rem",[Ji.Medium]:"1.5rem",[Ji.Large]:"3rem"};let tn=class extends rt{constructor(){super(),this.coordinates={x:0,y:0,width:0,height:0},this.initialOverlayColor=Zi.Black,this.overlayColor=Zi.Black,this.overlaySize=Ji.Medium,this.loadedImage=!1,this.canvasRef=new qi,this.overlayColor=this.initialOverlayColor}setColor(t){this.dispatchEvent(new It(t))}setCoordinates(t){this.dispatchEvent(new Wt(t))}loadImage(t){const e=t.currentTarget.files?.item(0);if(e){const t=new FileReader;t.onload=t=>{const e=new Image;e.onload=()=>{const t=this.canvasRef.value,o=t.getContext("2d");o&&(t.width=e.width,t.height=e.height,o.drawImage(e,0,0)),this.loadedImage=!0},e.src=t.target?.result},t.readAsDataURL(e)}}sampleImage(t){if(t instanceof MouseEvent&&1==t.buttons){const e=this.canvasRef.value,o=e.getContext("2d");if(o){const i=e.getBoundingClientRect(),n=(t.clientX-i.left)/i.width*e.width,r=(t.clientY-i.top)/i.height*e.height,s=o.getImageData(n,r,1,1);this.setColor(new Pt({type:Bt.RGB255,r:s.data[0],g:s.data[1],b:s.data[2]})),this.setCoordinates({x:n,y:r,width:e.width,height:e.height})}}}selectOverlayColor(t){this.overlayColor=t.currentTarget.value}selectOverlaySize(t){this.overlaySize=t.currentTarget.value}render(){const t=this.coordinates.x/this.coordinates.width*100,e=this.coordinates.y/this.coordinates.height*100,o=`\n      border-color: ${this.overlayColor};\n      top: calc(${e}% - var(--circle-diameter) / 2);\n      left: calc(${t}% - var(--circle-diameter) / 2);\n      --circle-diameter: ${Qi[this.overlaySize]};\n    `;return G`
      ${Ut}
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
              value=${Zi.Transparent}
              .selected=${this.overlayColor==Zi.Transparent}
            >
              None
            </option>
            <option
              value=${Zi.Black}
              .selected=${this.overlayColor==Zi.Black}
            >
              Black
            </option>
            <option
              value=${Zi.White}
              .selected=${this.overlayColor==Zi.White}
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
              value=${Ji.Small}
              .selected=${this.overlaySize==Ji.Small}
            >
              Small
            </option>
            <option
              value=${Ji.Medium}
              .selected=${this.overlaySize==Ji.Medium}
            >
              Medium
            </option>
            <option
              value=${Ji.Large}
              .selected=${this.overlaySize==Ji.Large}
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
          ${Yi(this.canvasRef)}
          @mousedown=${this.sampleImage}
          @mousemove=${this.sampleImage}
        ></canvas>
        <div
          class="image-preview-overlay"
          ?hidden=${!this.loadedImage}
          style=${o}
        ></div>
      </div>
    `}};tn.styles=[Ki],t([ht({attribute:!1})],tn.prototype,"coordinates",void 0),t([ht({attribute:!1})],tn.prototype,"initialOverlayColor",void 0),t([dt()],tn.prototype,"overlayColor",void 0),t([dt()],tn.prototype,"overlaySize",void 0),t([dt()],tn.prototype,"loadedImage",void 0),tn=t([at("image-sampling")],tn);class en extends rt{constructor(){super(...arguments),this.onMouseMoveBound=this.onMouseMove.bind(this),this.onMouseUpBound=this.onMouseUp.bind(this)}getColorMapData(){return[[0,0,0]]}getColorMapName(){return"Color Map"}setColor(t){this.dispatchEvent(new It(t))}toCss(){const t=this.getColorMapData(),e=[];for(let o=0;o<256;o++)e.push(`rgba(${Math.round(255*t[o][0])}, ${Math.round(255*t[o][1])}, ${Math.round(255*t[o][2])}, 255) ${100*o/255}%`);return`linear-gradient(to right, ${e.join(", ")})`}getColorAt(t){const e=this.getColorMapData(),o=Math.floor(Lt(t*e.length,0,e.length-1)),i=Math.ceil(Lt(t*e.length,0,e.length-1)),n=t*e.length-o;return Tt(new Pt({type:Bt.RGB01,r:e[o][0],g:e[o][1],b:e[o][2]}),new Pt({type:Bt.RGB01,r:e[i][0],g:e[i][1],b:e[i][2]}),n)}onMouseMove(t){if(1==t.buttons){const e=this.colorMapDiv.getBoundingClientRect(),o=(t.clientX-e.left)/e.width,i=this.getColorAt(o);this.setColor(i)}}onMouseDown(){document.addEventListener("mousemove",this.onMouseMoveBound),document.addEventListener("mouseup",this.onMouseUpBound)}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMoveBound),document.removeEventListener("mouseup",this.onMouseUpBound)}render(){return G` <div>
      <th>${this.getColorMapName()}</th>
      <td>
        <div
          style="background: ${this.toCss()}"
          class="gradient"
          @mousedown=${this.onMouseDown.bind(this)}
          id="colormap-div"
        ></div>
      </td>
    </div>`}}en.styles=[s`
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
    `],t([pt("#colormap-div")],en.prototype,"colorMapDiv",void 0);const on=[[.18995,.07176,.23217],[.19483,.08339,.26149],[.19956,.09498,.29024],[.20415,.10652,.31844],[.2086,.11802,.34607],[.21291,.12947,.37314],[.21708,.14087,.39964],[.22111,.15223,.42558],[.225,.16354,.45096],[.22875,.17481,.47578],[.23236,.18603,.50004],[.23582,.1972,.52373],[.23915,.20833,.54686],[.24234,.21941,.56942],[.24539,.23044,.59142],[.2483,.24143,.61286],[.25107,.25237,.63374],[.25369,.26327,.65406],[.25618,.27412,.67381],[.25853,.28492,.693],[.26074,.29568,.71162],[.2628,.30639,.72968],[.26473,.31706,.74718],[.26652,.32768,.76412],[.26816,.33825,.7805],[.26967,.34878,.79631],[.27103,.35926,.81156],[.27226,.3697,.82624],[.27334,.38008,.84037],[.27429,.39043,.85393],[.27509,.40072,.86692],[.27576,.41097,.87936],[.27628,.42118,.89123],[.27667,.43134,.90254],[.27691,.44145,.91328],[.27701,.45152,.92347],[.27698,.46153,.93309],[.2768,.47151,.94214],[.27648,.48144,.95064],[.27603,.49132,.95857],[.27543,.50115,.96594],[.27469,.51094,.97275],[.27381,.52069,.97899],[.27273,.5304,.98461],[.27106,.54015,.9893],[.26878,.54995,.99303],[.26592,.55979,.99583],[.26252,.56967,.99773],[.25862,.57958,.99876],[.25425,.5895,.99896],[.24946,.59943,.99835],[.24427,.60937,.99697],[.23874,.61931,.99485],[.23288,.62923,.99202],[.22676,.63913,.98851],[.22039,.64901,.98436],[.21382,.65886,.97959],[.20708,.66866,.97423],[.20021,.67842,.96833],[.19326,.68812,.9619],[.18625,.69775,.95498],[.17923,.70732,.94761],[.17223,.7168,.93981],[.16529,.7262,.93161],[.15844,.73551,.92305],[.15173,.74472,.91416],[.14519,.75381,.90496],[.13886,.76279,.8955],[.13278,.77165,.8858],[.12698,.78037,.8759],[.12151,.78896,.86581],[.11639,.7974,.85559],[.11167,.80569,.84525],[.10738,.81381,.83484],[.10357,.82177,.82437],[.10026,.82955,.81389],[.0975,.83714,.80342],[.09532,.84455,.79299],[.09377,.85175,.78264],[.09287,.85875,.7724],[.09267,.86554,.7623],[.0932,.87211,.75237],[.09451,.87844,.74265],[.09662,.88454,.73316],[.09958,.8904,.72393],[.10342,.896,.715],[.10815,.90142,.70599],[.11374,.90673,.69651],[.12014,.91193,.6866],[.12733,.91701,.67627],[.13526,.92197,.66556],[.14391,.9268,.65448],[.15323,.93151,.64308],[.16319,.93609,.63137],[.17377,.94053,.61938],[.18491,.94484,.60713],[.19659,.94901,.59466],[.20877,.95304,.58199],[.22142,.95692,.56914],[.23449,.96065,.55614],[.24797,.96423,.54303],[.2618,.96765,.52981],[.27597,.97092,.51653],[.29042,.97403,.50321],[.30513,.97697,.48987],[.32006,.97974,.47654],[.33517,.98234,.46325],[.35043,.98477,.45002],[.36581,.98702,.43688],[.38127,.98909,.42386],[.39678,.99098,.41098],[.41229,.99268,.39826],[.42778,.99419,.38575],[.44321,.99551,.37345],[.45854,.99663,.3614],[.47375,.99755,.34963],[.48879,.99828,.33816],[.50362,.99879,.32701],[.51822,.9991,.31622],[.53255,.99919,.30581],[.54658,.99907,.29581],[.56026,.99873,.28623],[.57357,.99817,.27712],[.58646,.99739,.26849],[.59891,.99638,.26038],[.61088,.99514,.2528],[.62233,.99366,.24579],[.63323,.99195,.23937],[.64362,.98999,.23356],[.65394,.98775,.22835],[.66428,.98524,.2237],[.67462,.98246,.2196],[.68494,.97941,.21602],[.69525,.9761,.21294],[.70553,.97255,.21032],[.71577,.96875,.20815],[.72596,.9647,.2064],[.7361,.96043,.20504],[.74617,.95593,.20406],[.75617,.95121,.20343],[.76608,.94627,.20311],[.77591,.94113,.2031],[.78563,.93579,.20336],[.79524,.93025,.20386],[.80473,.92452,.20459],[.8141,.91861,.20552],[.82333,.91253,.20663],[.83241,.90627,.20788],[.84133,.89986,.20926],[.8501,.89328,.21074],[.85868,.88655,.2123],[.86709,.87968,.21391],[.8753,.87267,.21555],[.88331,.86553,.21719],[.89112,.85826,.2188],[.8987,.85087,.22038],[.90605,.84337,.22188],[.91317,.83576,.22328],[.92004,.82806,.22456],[.92666,.82025,.2257],[.93301,.81236,.22667],[.93909,.80439,.22744],[.94489,.79634,.228],[.95039,.78823,.22831],[.9556,.78005,.22836],[.96049,.77181,.22811],[.96507,.76352,.22754],[.96931,.75519,.22663],[.97323,.74682,.22536],[.97679,.73842,.22369],[.98,.73,.22161],[.98289,.7214,.21918],[.98549,.7125,.2165],[.98781,.7033,.21358],[.98986,.69382,.21043],[.99163,.68408,.20706],[.99314,.67408,.20348],[.99438,.66386,.19971],[.99535,.65341,.19577],[.99607,.64277,.19165],[.99654,.63193,.18738],[.99675,.62093,.18297],[.99672,.60977,.17842],[.99644,.59846,.17376],[.99593,.58703,.16899],[.99517,.57549,.16412],[.99419,.56386,.15918],[.99297,.55214,.15417],[.99153,.54036,.1491],[.98987,.52854,.14398],[.98799,.51667,.13883],[.9859,.50479,.13367],[.9836,.49291,.12849],[.98108,.48104,.12332],[.97837,.4692,.11817],[.97545,.4574,.11305],[.97234,.44565,.10797],[.96904,.43399,.10294],[.96555,.42241,.09798],[.96187,.41093,.0931],[.95801,.39958,.08831],[.95398,.38836,.08362],[.94977,.37729,.07905],[.94538,.36638,.07461],[.94084,.35566,.07031],[.93612,.34513,.06616],[.93125,.33482,.06218],[.92623,.32473,.05837],[.92105,.31489,.05475],[.91572,.3053,.05134],[.91024,.29599,.04814],[.90463,.28696,.04516],[.89888,.27824,.04243],[.89298,.26981,.03993],[.88691,.26152,.03753],[.88066,.25334,.03521],[.87422,.24526,.03297],[.8676,.2373,.03082],[.86079,.22945,.02875],[.8538,.2217,.02677],[.84662,.21407,.02487],[.83926,.20654,.02305],[.83172,.19912,.02131],[.82399,.19182,.01966],[.81608,.18462,.01809],[.80799,.17753,.0166],[.79971,.17055,.0152],[.79125,.16368,.01387],[.7826,.15693,.01264],[.77377,.15028,.01148],[.76476,.14374,.01041],[.75556,.13731,.00942],[.74617,.13098,.00851],[.73661,.12477,.00769],[.72686,.11867,.00695],[.71692,.11268,.00629],[.7068,.1068,.00571],[.6965,.10102,.00522],[.68602,.09536,.00481],[.67535,.0898,.00449],[.66449,.08436,.00424],[.65345,.07902,.00408],[.64223,.0738,.00401],[.63082,.06868,.00401],[.61923,.06367,.0041],[.60746,.05878,.00427],[.5955,.05399,.00453],[.58336,.04931,.00486],[.57103,.04474,.00529],[.55852,.04028,.00579],[.54583,.03593,.00638],[.53295,.03169,.00705],[.51989,.02756,.0078],[.50664,.02354,.00863],[.49321,.01963,.00955],[.4796,.01583,.01055]];let nn=class extends en{getColorMapData(){return on}getColorMapName(){return"Turbo"}};nn=t([at("turbo-colormap")],nn);let rn=class extends rt{render(){return G`
      ${Ut}
      <h5>Color Maps</h5>
      <div class="table mb-0">
        <slot></slot>
      </div>
    `}};rn.styles=[s`
      ul {
        padding: 0;
      }
    `],rn=t([at("color-maps")],rn);let sn=class extends rt{constructor(){super(...arguments),this.name="",this.href=""}};t([ht()],sn.prototype,"name",void 0),t([ht()],sn.prototype,"href",void 0),sn=t([at("other-tools-entry")],sn);let an=class extends rt{render(){return G` ${Ut}
      <h5>Other Tools</h5>
      <ul>
        ${Array.prototype.map.call(this.children,(t=>{if(t instanceof sn)return G`<li>
              <a href="${t.href}" target="_blank">${t.name}</a>
            </li>`}))}
      </ul>`}};an=t([at("other-tools")],an);let ln=class extends rt{constructor(){super(),this.color=new Pt({type:Bt.RGB255,r:255,g:255,b:255}),this.coordinates={x:0,y:0,width:1,height:1},this.interpolationLeft=new Pt({type:Bt.RGB255,r:255,g:0,b:0}),this.interpolationRight=new Pt({type:Bt.RGB255,r:255,g:255,b:255}),this.interpolationActive=Ft.NONE,this.addEventListener(It.eventName,(t=>{t instanceof It&&this.setColor(t.color)})),this.addEventListener(Wt.eventName,(t=>{t instanceof Wt&&this.setCoordinates(t.coordinates)})),this.addEventListener(Dt.eventName,(t=>{t instanceof Dt&&this.setInterpolationActive(t.active)}))}setColor(t){this.color=t,this.interpolationActive===Ft.LEFT?this.interpolationLeft=t:this.interpolationActive==Ft.RIGHT&&(this.interpolationRight=t)}setCoordinates(t){this.coordinates=t}setInterpolationActive(t){this.interpolationActive=t}updateChildren(){Array.prototype.forEach.call(this.children,(t=>{t instanceof ne?t.color=this.color:t instanceof Ui?(t.color=this.color,t.coordinates=this.coordinates):t instanceof tn?t.coordinates=this.coordinates:t instanceof Vt&&(t.leftColor=this.interpolationLeft,t.rightColor=this.interpolationRight,t.activeColor=this.interpolationActive)}))}render(){return this.style.background="#"+this.color.getHex(),this.updateChildren(),G` ${Ut}
      <slot class="d-flex flex-row flex-wrap main-container"></slot>`}};ln.styles=[jt],t([dt()],ln.prototype,"color",void 0),t([dt()],ln.prototype,"coordinates",void 0),t([dt()],ln.prototype,"interpolationLeft",void 0),t([dt()],ln.prototype,"interpolationRight",void 0),t([dt()],ln.prototype,"interpolationActive",void 0),ln=t([at("color-picker")],ln);
//# sourceMappingURL=main.js.map

/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=/* @__PURE__ */ new WeakMap;var i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}};const a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:ee,getOwnPropertySymbols:te,getPrototypeOf:ne}=Object,re=globalThis,ie=re.trustedTypes,ae=ie?ie.emptyScript:``,oe=re.reactiveElementPolyfillSupport,se=(e,t)=>e,ce={toAttribute(e,t){
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
switch(t){case Boolean:e=e?ae:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},le=(e,t)=>!l(e,t),ue={attribute:!0,type:String,converter:ce,reflect:!1,useDefault:!1,hasChanged:le};Symbol.metadata??=Symbol(`metadata`),re.litPropertyMetadata??=/* @__PURE__ */ new WeakMap;var f=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ue){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ue}static _$Ei(){if(this.hasOwnProperty(se(`elementProperties`)))return;let e=ne(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(se(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(se(`properties`))){let e=this.properties,t=[...ee(e),...te(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=/* @__PURE__ */ new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=/* @__PURE__ */ new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=/* @__PURE__ */ new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=/* @__PURE__ */ new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?ce:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?ce:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??le)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=/* @__PURE__ */ new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=/* @__PURE__ */ new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=/* @__PURE__ */ new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};f.elementStyles=[],f.shadowRootOptions={mode:`open`},f[se(`elementProperties`)]=/* @__PURE__ */ new Map,f[se(`finalized`)]=/* @__PURE__ */ new Map,oe?.({ReactiveElement:f}),(re.reactiveElementVersions??=[]).push(`2.1.2`);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const de=globalThis,fe=e=>e,pe=de.trustedTypes,me=pe?pe.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,he=`$lit$`,p=`lit$${Math.random().toFixed(9).slice(2)}$`,ge=`?`+p,_e=`<${ge}>`,m=document,h=()=>m.createComment(``),ve=e=>e===null||typeof e!=`object`&&typeof e!=`function`,ye=Array.isArray,be=e=>ye(e)||typeof e?.[Symbol.iterator]==`function`,xe=`[ 	
\f\r]`,g=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Se=/-->/g,Ce=/>/g,_=RegExp(`>|${xe}(?:([^\\s"'>=/]+)(${xe}*=${xe}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),we=/'/g,Te=/"/g,Ee=/^(?:script|style|textarea|title)$/i,v=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),y=Symbol.for(`lit-noChange`),b=Symbol.for(`lit-nothing`),De=/* @__PURE__ */ new WeakMap,x=m.createTreeWalker(m,129);function Oe(e,t){if(!ye(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return me===void 0?t:me.createHTML(t)}const ke=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=g;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===g?c[1]===`!--`?o=Se:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=_):(Ee.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=_):o=Ce:o===_?c[0]===`>`?(o=i??g,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?_:c[3]===`"`?Te:we):o===Te||o===we?o=_:o===Se||o===Ce?o=g:(o=_,i=void 0);let d=o===_&&e[t+1].startsWith(`/>`)?` `:``;a+=o===g?n+_e:l>=0?(r.push(s),n.slice(0,l)+he+n.slice(l)+p+d):n+p+(l===-2?t:d)}return[Oe(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]};var Ae=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=ke(t,n);if(this.el=e.createElement(l,r),x.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=x.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(he)){let t=u[o++],n=i.getAttribute(e).split(p),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Ne:r[1]===`?`?Pe:r[1]===`@`?Fe:C}),i.removeAttribute(e)}else e.startsWith(p)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(Ee.test(i.tagName)){let e=i.textContent.split(p),t=e.length-1;if(t>0){i.textContent=pe?pe.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],h()),x.nextNode(),c.push({type:2,index:++a});i.append(e[t],h())}}}else if(i.nodeType===8){if(i.data===ge)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(p,e+1))!==-1;)c.push({type:7,index:a}),e+=p.length-1}}a++}}static createElement(e,t){let n=m.createElement(`template`);return n.innerHTML=e,n}};function S(e,t,n=e,r){if(t===y)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=ve(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=S(e,i._$AS(e,t.values),i,r)),t}var je=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??m).importNode(t,!0);x.currentNode=r;let i=x.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Me(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Ie(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=x.nextNode(),a++)}return x.currentNode=m,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Me=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),ve(e)?e===b||e==null||e===``?(this._$AH!==b&&this._$AR(),this._$AH=b):e!==this._$AH&&e!==y&&this._(e):e._$litType$===void 0?e.nodeType===void 0?be(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==b&&ve(this._$AH)?this._$AA.nextSibling.data=e:this.T(m.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Ae.createElement(Oe(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new je(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=De.get(e.strings);return t===void 0&&De.set(e.strings,t=new Ae(e)),t}k(t){ye(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(h()),this.O(h()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=fe(e).nextSibling;fe(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=b,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(/* @__PURE__ */ new String),this.strings=n):this._$AH=b}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=S(this,e,t,0),a=!ve(e)||e!==this._$AH&&e!==y,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=S(this,r[n+o],t,o),s===y&&(s=this._$AH[o]),a||=!ve(s)||s!==this._$AH[o],s===b?e=b:e!==b&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Ne=class extends C{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===b?void 0:e}},Pe=class extends C{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==b)}},Fe=class extends C{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??b)===y)return;let n=this._$AH,r=e===b&&n!==b||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==b&&(n===b||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ie=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}};const Le={M:he,P:p,A:ge,C:1,L:ke,R:je,D:be,V:S,I:Me,H:C,N:Pe,U:Fe,B:Ne,F:Ie},Re=de.litHtmlPolyfillSupport;Re?.(Ae,Me),(de.litHtmlVersions??=[]).push(`3.3.3`);const ze=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Me(t.insertBefore(h(),e),e,void 0,n??{})}return i._$AI(e),i},Be=globalThis
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
;var w=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ze(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return y}};w._$litElement$=!0,w.finalized=!0,Be.litElementHydrateSupport?.({LitElement:w});const Ve=Be.litElementPolyfillSupport;Ve?.({LitElement:w}),(Be.litElementVersions??=[]).push(`4.2.2`);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const T=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},He={attribute:!0,type:String,converter:ce,reflect:!1,hasChanged:le},Ue=(e=He,t,n)=>{
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=/* @__PURE__ */ new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function E(e){return(t,n)=>typeof n==`object`?Ue(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/function D(e){return E({...e,state:!0,attribute:!1})}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const We=(e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof t!=`object`&&Object.defineProperty(e,t,n),n);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/function Ge(e,t){return(n,r,i)=>{let a=t=>t.renderRoot?.querySelector(e)??null;if(t){let{get:e,set:t}=typeof r==`object`?n:i??(()=>{let e=Symbol();return{get(){return this[e]},set(t){this[e]=t}}})();return We(n,r,{get(){let n=e.call(this);return n===void 0&&(n=a(this),(n!==null||this.hasUpdated)&&t.call(this,n)),n}})}return We(n,r,{get(){return a(this)}})}}const Ke={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]};for(let e in Ke)Object.freeze(Ke[e]);var O=Object.freeze(Ke);const qe={};for(let e of Object.keys(O))qe[O[e]]=e;const k={rgb:{channels:3,labels:`rgb`},hsl:{channels:3,labels:`hsl`},hsv:{channels:3,labels:`hsv`},hwb:{channels:3,labels:`hwb`},cmyk:{channels:4,labels:`cmyk`},xyz:{channels:3,labels:`xyz`},lab:{channels:3,labels:`lab`},oklab:{channels:3,labels:[`okl`,`oka`,`okb`]},lch:{channels:3,labels:`lch`},oklch:{channels:3,labels:[`okl`,`okc`,`okh`]},hex:{channels:1,labels:[`hex`]},keyword:{channels:1,labels:[`keyword`]},ansi16:{channels:1,labels:[`ansi16`]},ansi256:{channels:1,labels:[`ansi256`]},hcg:{channels:3,labels:[`h`,`c`,`g`]},apple:{channels:3,labels:[`r16`,`g16`,`b16`]},gray:{channels:1,labels:[`gray`]}},A=(6/29)**3;function j(e){let t=e>.0031308?1.055*e**(1/2.4)-.055:e*12.92;return Math.min(Math.max(0,t),1)}function M(e){return e>.04045?((e+.055)/1.055)**2.4:e/12.92}for(let e of Object.keys(k)){if(!(`channels`in k[e]))throw Error(`missing channels property: `+e);if(!(`labels`in k[e]))throw Error(`missing channel labels property: `+e);if(k[e].labels.length!==k[e].channels)throw Error(`channel and label counts mismatch: `+e);let{channels:t,labels:n}=k[e];delete k[e].channels,delete k[e].labels,Object.defineProperty(k[e],"channels",{value:t}),Object.defineProperty(k[e],"labels",{value:n})}k.rgb.hsl=function(e){let t=e[0]/255,n=e[1]/255,r=e[2]/255,i=Math.min(t,n,r),a=Math.max(t,n,r),o=a-i,s,c;switch(a){case i:s=0;break;case t:s=(n-r)/o;break;case n:s=2+(r-t)/o;break;case r:s=4+(t-n)/o}s=Math.min(s*60,360),s<0&&(s+=360);let l=(i+a)/2;return c=a===i?0:l<=.5?o/(a+i):o/(2-a-i),[s,c*100,l*100]},k.rgb.hsv=function(e){let t,n,r,i,a,o=e[0]/255,s=e[1]/255,c=e[2]/255,l=Math.max(o,s,c),u=l-Math.min(o,s,c),d=function(e){return(l-e)/6/u+1/2};if(u===0)i=0,a=0;else{switch(a=u/l,t=d(o),n=d(s),r=d(c),l){case o:i=r-n;break;case s:i=1/3+t-r;break;case c:i=2/3+n-t}i<0?i+=1:i>1&&--i}return[i*360,a*100,l*100]},k.rgb.hwb=function(e){let t=e[0],n=e[1],r=e[2],i=k.rgb.hsl(e)[0],a=1/255*Math.min(t,Math.min(n,r));return r=1-1/255*Math.max(t,Math.max(n,r)),[i,a*100,r*100]},k.rgb.oklab=function(e){let t=M(e[0]/255),n=M(e[1]/255),r=M(e[2]/255),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*r),a=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*r),o=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*r),s=.2104542553*i+.793617785*a-.0040720468*o,c=1.9779984951*i-2.428592205*a+.4505937099*o,l=.0259040371*i+.7827717662*a-.808675766*o;return[s*100,c*100,l*100]},k.rgb.cmyk=function(e){let t=e[0]/255,n=e[1]/255,r=e[2]/255,i=Math.min(1-t,1-n,1-r),a=(1-t-i)/(1-i)||0,o=(1-n-i)/(1-i)||0,s=(1-r-i)/(1-i)||0;return[a*100,o*100,s*100,i*100]};function Je(e,t){return(e[0]-t[0])**2+(e[1]-t[1])**2+(e[2]-t[2])**2}k.rgb.keyword=function(e){let t=qe[e];if(t)return t;let n=1/0,r;for(let t of Object.keys(O)){let i=O[t],a=Je(e,i);a<n&&(n=a,r=t)}return r},k.keyword.rgb=function(e){return[...O[e]]},k.rgb.xyz=function(e){let t=M(e[0]/255),n=M(e[1]/255),r=M(e[2]/255),i=t*.4124564+n*.3575761+r*.1804375,a=t*.2126729+n*.7151522+r*.072175,o=t*.0193339+n*.119192+r*.9503041;return[i*100,a*100,o*100]},k.rgb.lab=function(e){let t=k.rgb.xyz(e),n=t[0],r=t[1],i=t[2];return n/=95.047,r/=100,i/=108.883,n=n>A?n**(1/3):7.787*n+16/116,r=r>A?r**(1/3):7.787*r+16/116,i=i>A?i**(1/3):7.787*i+16/116,[116*r-16,500*(n-r),200*(r-i)]},k.hsl.rgb=function(e){let t=e[0]/360,n=e[1]/100,r=e[2]/100,i,a;if(n===0)return a=r*255,[a,a,a];let o=r<.5?r*(1+n):r+n-r*n,s=2*r-o,c=[0,0,0];for(let e=0;e<3;e++)i=t+1/3*-(e-1),i<0&&i++,i>1&&i--,a=6*i<1?s+(o-s)*6*i:2*i<1?o:3*i<2?s+(o-s)*(2/3-i)*6:s,c[e]=a*255;return c},k.hsl.hsv=function(e){let t=e[0],n=e[1]/100,r=e[2]/100,i=n,a=Math.max(r,.01);r*=2,n*=r<=1?r:2-r,i*=a<=1?a:2-a;let o=(r+n)/2;return[t,(r===0?2*i/(a+i):2*n/(r+n))*100,o*100]},k.hsv.rgb=function(e){let t=e[0]/60,n=e[1]/100,r=e[2]/100,i=Math.floor(t)%6,a=t-Math.floor(t),o=255*r*(1-n),s=255*r*(1-n*a),c=255*r*(1-n*(1-a));switch(r*=255,i){case 0:return[r,c,o];case 1:return[s,r,o];case 2:return[o,r,c];case 3:return[o,s,r];case 4:return[c,o,r];case 5:return[r,o,s]}},k.hsv.hsl=function(e){let t=e[0],n=e[1]/100,r=e[2]/100,i=Math.max(r,.01),a,o;o=(2-n)*r;let s=(2-n)*i;return a=n*i,a/=s<=1?s:2-s,a||=0,o/=2,[t,a*100,o*100]},k.hwb.rgb=function(e){let t=e[0]/360,n=e[1]/100,r=e[2]/100,i=n+r,a;i>1&&(n/=i,r/=i);let o=Math.floor(6*t),s=1-r;a=6*t-o,o&1&&(a=1-a);let c=n+a*(s-n),l,u,d;switch(o){default:case 6:case 0:l=s,u=c,d=n;break;case 1:l=c,u=s,d=n;break;case 2:l=n,u=s,d=c;break;case 3:l=n,u=c,d=s;break;case 4:l=c,u=n,d=s;break;case 5:l=s,u=n,d=c}return[l*255,u*255,d*255]},k.cmyk.rgb=function(e){let t=e[0]/100,n=e[1]/100,r=e[2]/100,i=e[3]/100,a=1-Math.min(1,t*(1-i)+i),o=1-Math.min(1,n*(1-i)+i),s=1-Math.min(1,r*(1-i)+i);return[a*255,o*255,s*255]},k.xyz.rgb=function(e){let t=e[0]/100,n=e[1]/100,r=e[2]/100,i,a,o;return i=t*3.2404542+n*-1.5371385+r*-.4985314,a=t*-.969266+n*1.8760108+r*.041556,o=t*.0556434+n*-.2040259+r*1.0572252,i=j(i),a=j(a),o=j(o),[i*255,a*255,o*255]},k.xyz.lab=function(e){let t=e[0],n=e[1],r=e[2];return t/=95.047,n/=100,r/=108.883,t=t>A?t**(1/3):7.787*t+16/116,n=n>A?n**(1/3):7.787*n+16/116,r=r>A?r**(1/3):7.787*r+16/116,[116*n-16,500*(t-n),200*(n-r)]},k.xyz.oklab=function(e){let t=e[0]/100,n=e[1]/100,r=e[2]/100,i=Math.cbrt(.8189330101*t+.3618667424*n-.1288597137*r),a=Math.cbrt(.0329845436*t+.9293118715*n+.0361456387*r),o=Math.cbrt(.0482003018*t+.2643662691*n+.633851707*r),s=.2104542553*i+.793617785*a-.0040720468*o,c=1.9779984951*i-2.428592205*a+.4505937099*o,l=.0259040371*i+.7827717662*a-.808675766*o;return[s*100,c*100,l*100]},k.oklab.oklch=function(e){return k.lab.lch(e)},k.oklab.xyz=function(e){let t=e[0]/100,n=e[1]/100,r=e[2]/100,i=(.999999998*t+.396337792*n+.215803758*r)**3,a=(1.000000008*t-.105561342*n-.063854175*r)**3,o=(1.000000055*t-.089484182*n-1.291485538*r)**3,s=1.227013851*i-.55779998*a+.281256149*o,c=-.040580178*i+1.11225687*a-.071676679*o,l=-.076381285*i-.421481978*a+1.58616322*o;return[s*100,c*100,l*100]},k.oklab.rgb=function(e){let t=e[0]/100,n=e[1]/100,r=e[2]/100,i=(t+.3963377774*n+.2158037573*r)**3,a=(t-.1055613458*n-.0638541728*r)**3,o=(t-.0894841775*n-1.291485548*r)**3,s=j(4.0767416621*i-3.3077115913*a+.2309699292*o),c=j(-1.2684380046*i+2.6097574011*a-.3413193965*o),l=j(-.0041960863*i-.7034186147*a+1.707614701*o);return[s*255,c*255,l*255]},k.oklch.oklab=function(e){return k.lch.lab(e)},k.lab.xyz=function(e){let t=e[0],n=e[1],r=e[2],i,a,o;a=(t+16)/116,i=n/500+a,o=a-r/200;let s=a**3,c=i**3,l=o**3;return a=s>A?s:(a-16/116)/7.787,i=c>A?c:(i-16/116)/7.787,o=l>A?l:(o-16/116)/7.787,i*=95.047,a*=100,o*=108.883,[i,a,o]},k.lab.lch=function(e){let t=e[0],n=e[1],r=e[2],i;return i=Math.atan2(r,n)*360/2/Math.PI,i<0&&(i+=360),[t,Math.sqrt(n*n+r*r),i]},k.lch.lab=function(e){let t=e[0],n=e[1],r=e[2]/360*2*Math.PI;return[t,n*Math.cos(r),n*Math.sin(r)]},k.rgb.ansi16=function(e,t=null){let[n,r,i]=e,a=t===null?k.rgb.hsv(e)[2]:t;if(a=Math.round(a/50),a===0)return 30;let o=30+(Math.round(i/255)<<2|Math.round(r/255)<<1|Math.round(n/255));return a===2&&(o+=60),o},k.hsv.ansi16=function(e){return k.rgb.ansi16(k.hsv.rgb(e),e[2])},k.rgb.ansi256=function(e){let t=e[0],n=e[1],r=e[2];return t>>4==n>>4&&n>>4==r>>4?t<8?16:t>248?231:Math.round((t-8)/247*24)+232:16+36*Math.round(t/255*5)+6*Math.round(n/255*5)+Math.round(r/255*5)},k.ansi16.rgb=function(e){e=e[0];let t=e%10;if(t===0||t===7)return e>50&&(t+=3.5),t=t/10.5*255,[t,t,t];let n=(Math.trunc(e>50)+1)*.5;return[(t&1)*n*255,(t>>1&1)*n*255,(t>>2&1)*n*255]},k.ansi256.rgb=function(e){if(e=e[0],e>=232){let t=(e-232)*10+8;return[t,t,t]}e-=16;let t;return[Math.floor(e/36)/5*255,Math.floor((t=e%36)/6)/5*255,t%6/5*255]},k.rgb.hex=function(e){let t=(((Math.round(e[0])&255)<<16)+((Math.round(e[1])&255)<<8)+(Math.round(e[2])&255)).toString(16).toUpperCase();return`000000`.slice(t.length)+t},k.hex.rgb=function(e){let t=e.toString(16).match(/[a-f\d]{6}|[a-f\d]{3}/i);if(!t)return[0,0,0];let n=t[0];t[0].length===3&&(n=[...n].map(e=>e+e).join(``));let r=Number.parseInt(n,16);return[r>>16&255,r>>8&255,r&255]},k.rgb.hcg=function(e){let t=e[0]/255,n=e[1]/255,r=e[2]/255,i=Math.max(Math.max(t,n),r),a=Math.min(Math.min(t,n),r),o=i-a,s,c=o<1?a/(1-o):0;return s=o<=0?0:i===t?(n-r)/o%6:i===n?2+(r-t)/o:4+(t-n)/o,s/=6,s%=1,[s*360,o*100,c*100]},k.hsl.hcg=function(e){let t=e[1]/100,n=e[2]/100,r=n<.5?2*t*n:2*t*(1-n),i=0;return r<1&&(i=(n-.5*r)/(1-r)),[e[0],r*100,i*100]},k.hsv.hcg=function(e){let t=e[1]/100,n=e[2]/100,r=t*n,i=0;return r<1&&(i=(n-r)/(1-r)),[e[0],r*100,i*100]},k.hcg.rgb=function(e){let t=e[0]/360,n=e[1]/100,r=e[2]/100;if(n===0)return[r*255,r*255,r*255];let i=[0,0,0],a=t%1*6,o=a%1,s=1-o,c=0;switch(Math.floor(a)){case 0:i[0]=1,i[1]=o,i[2]=0;break;case 1:i[0]=s,i[1]=1,i[2]=0;break;case 2:i[0]=0,i[1]=1,i[2]=o;break;case 3:i[0]=0,i[1]=s,i[2]=1;break;case 4:i[0]=o,i[1]=0,i[2]=1;break;default:i[0]=1,i[1]=0,i[2]=s}return c=(1-n)*r,[(n*i[0]+c)*255,(n*i[1]+c)*255,(n*i[2]+c)*255]},k.hcg.hsv=function(e){let t=e[1]/100,n=t+e[2]/100*(1-t),r=0;return n>0&&(r=t/n),[e[0],r*100,n*100]},k.hcg.hsl=function(e){let t=e[1]/100,n=e[2]/100*(1-t)+.5*t,r=0;return n>0&&n<.5?r=t/(2*n):n>=.5&&n<1&&(r=t/(2*(1-n))),[e[0],r*100,n*100]},k.hcg.hwb=function(e){let t=e[1]/100,n=t+e[2]/100*(1-t);return[e[0],(n-t)*100,(1-n)*100]},k.hwb.hcg=function(e){let t=e[1]/100,n=1-e[2]/100,r=n-t,i=0;return r<1&&(i=(n-r)/(1-r)),[e[0],r*100,i*100]},k.apple.rgb=function(e){return[e[0]/65535*255,e[1]/65535*255,e[2]/65535*255]},k.rgb.apple=function(e){return[e[0]/255*65535,e[1]/255*65535,e[2]/255*65535]},k.gray.rgb=function(e){return[e[0]/100*255,e[0]/100*255,e[0]/100*255]},k.gray.hsl=function(e){return[0,0,e[0]]},k.gray.hsv=k.gray.hsl,k.gray.hwb=function(e){return[0,100,e[0]]},k.gray.cmyk=function(e){return[0,0,0,e[0]]},k.gray.lab=function(e){return[e[0],0,0]},k.gray.hex=function(e){let t=Math.round(e[0]/100*255)&255,n=((t<<16)+(t<<8)+t).toString(16).toUpperCase();return`000000`.slice(n.length)+n},k.rgb.gray=function(e){return[(e[0]+e[1]+e[2])/3/255*100]};function Ye(){let e={},t=Object.keys(k);for(let{length:n}=t,r=0;r<n;r++)e[t[r]]={distance:-1,parent:null};return e}function Xe(e){let t=Ye(),n=[e];for(t[e].distance=0;n.length>0;){let e=n.pop(),r=Object.keys(k[e]);for(let{length:i}=r,a=0;a<i;a++){let i=r[a],o=t[i];o.distance===-1&&(o.distance=t[e].distance+1,o.parent=e,n.unshift(i))}}return t}function Ze(e,t){return function(n){return t(e(n))}}function Qe(e,t){let n=[t[e].parent,e],r=k[t[e].parent][e],i=t[e].parent;for(;t[i].parent;)n.unshift(t[i].parent),r=Ze(k[t[i].parent][i],r),i=t[i].parent;return r.conversion=n,r}function $e(e){let t=Xe(e),n={},r=Object.keys(t);for(let{length:e}=r,i=0;i<e;i++){let e=r[i];t[e].parent!==null&&(n[e]=Qe(e,t))}return n}const N={},et=Object.keys(k);function tt(e){let t=function(...t){let n=t[0];return n==null?n:(n.length>1&&(t=n),e(t))};return`conversion`in e&&(t.conversion=e.conversion),t}function nt(e){let t=function(...t){let n=t[0];if(n==null)return n;n.length>1&&(t=n);let r=e(t);if(typeof r==`object`)for(let{length:e}=r,t=0;t<e;t++)r[t]=Math.round(r[t]);return r};return`conversion`in e&&(t.conversion=e.conversion),t}for(let e of et){N[e]={},Object.defineProperty(N[e],"channels",{value:k[e].channels}),Object.defineProperty(N[e],"labels",{value:k[e].labels});let t=$e(e),n=Object.keys(t);for(let r of n){let n=t[r];N[e][r]=nt(n),N[e][r].raw=tt(n)}}function P(e,t,n){return e+(t-e)*n}function F(e,t,n){return Math.max(t,Math.min(n,e))}function I(e,t,n,r=!1){let i=N[e][t];return r&&i.raw?i.raw(n):i(n)}var L=class e{constructor(e={type:`rgb255`,r:0,g:0,b:0}){e.type===`rgb255`?this.conversionInput=[F(e.r,0,255),F(e.g,0,255),F(e.b,0,255)]:e.type===`rgb01`?this.conversionInput=[F(Math.round(e.r*255),0,255),F(Math.round(e.g*255),0,255),F(Math.round(e.b*255),0,255)]:e.type===`hex`?this.conversionInput=e.hex:e.type===`hsv`?this.conversionInput=[e.h,e.s,e.v]:e.type===`hsl`?this.conversionInput=[e.h,e.s,e.l]:e.type===`lch`&&(this.conversionInput=[e.l,e.c,e.h]),this.input=e,Object.freeze(this)}get model(){switch(this.input.type){case`hex`:return`hex`;case`hsv`:return`hsv`;case`hsl`:return`hsl`;case`lch`:return`lch`;default:return`rgb`}}getRGB255(){let e=this.input;return e.type===`rgb255`?[e.r,e.g,e.b]:e.type===`rgb01`?[Math.round(e.r*255),Math.round(e.g*255),Math.round(e.b*255)]:I(this.model,`rgb`,this.conversionInput)}getRGB01(){let e=this.input;return e.type===`rgb255`?[e.r/255,e.g/255,e.b/255]:e.type===`rgb01`?[e.r,e.g,e.b]:this.getRGB255().map(e=>e/255)}getHex(){let e=this.input;return e.type===`hex`?e.hex:I(this.model,`hex`,this.conversionInput)}getHSV(e=!0){let t=this.input;if(t.type===`hsv`){let n=[t.h,t.s,t.v];return e?n:n.map(e=>Math.round(e))}return I(this.model,`hsv`,this.conversionInput,e)}getHSL(e=!0){let t=this.input;if(t.type===`hsl`){let n=[t.h,t.s,t.l];return e?n:n.map(e=>Math.round(e))}return I(this.model,`hsl`,this.conversionInput,e)}getLCH(e=!0){let t=this.input;if(t.type===`lch`){let n=[t.l,t.c,t.h];return e?n:n.map(e=>Math.round(e))}return I(this.model,`lch`,this.conversionInput,e)}toCSS(){return`rgba(${this.getRGB255().join(`, `)})`}static fromRGB255Array(t){return new e({type:`rgb255`,r:t[0],g:t[1],b:t[2]})}};let rt=/* @__PURE__ */ function(e){return e.RGB=`rgb`,e.HSV=`hsv`,e.HSL=`hsl`,e.HSL_FLIP=`hsl_flip`,e.LCH=`lch`,e}({});function it(e,t,n){let[r,i,a]=e.getRGB01(),[o,s,c]=t.getRGB01();return new L({type:`rgb01`,r:P(r,o,n),g:P(i,s,n),b:P(a,c,n)})}function at(e,t,n){let r=e.getLCH(),i=t.getLCH();return new L({type:`lch`,l:P(r[0],i[0],n),c:P(r[1],i[1],n),h:P(r[2],i[2],n)})}function ot(e,t,n,r=!1){let i=e.getHSL(),a=t.getHSL(),o=Math.abs(i[0]-a[0])>180,s=r?!o:o;return new L({type:`hsl`,h:P(i[0]+360*Number(s&&i[0]<a[0]),a[0]+360*Number(s&&a[0]<i[0]),n),s:P(i[1],a[1],n),l:P(i[2],a[2],n)})}function st(e,t,n){let r=e.getHSV(),i=t.getHSV();return new L({type:`hsv`,h:P(r[0],i[0],n),s:P(r[1],i[1],n),v:P(r[2],i[2],n)})}const ct={rgb:it,hsv:st,hsl:(e,t,n)=>ot(e,t,n,!1),hsl_flip:(e,t,n)=>ot(e,t,n,!0),lch:at};function lt(e,t,n,r=`rgb`){return ct[r](e,t,n)}var ut=class{constructor(e=new L({type:`rgb01`,r:1,g:0,b:0}),t=new L({type:`rgb01`,r:1,g:1,b:1})){this.colors=[],this.positions=[],this.addColorStop(0,e),this.addColorStop(1,t)}setColorStop(e,t){let n=this.positions.indexOf(e);n===-1?this.addColorStop(e,t):this.colors[n]=t}addColorStop(e,t){let n=0;for(;n<this.positions.length&&this.positions[n]<e;)n++;this.positions.splice(n,0,e),this.colors.splice(n,0,t)}getColorAt(e,t){if(this.colors.length===0)return new L;if(this.colors.length===1)return this.colors[0];let n=0;for(;n<this.positions.length&&e>this.positions[n];)n++;if(n===0)return this.colors[0];if(n===this.positions.length)return this.colors[this.colors.length-1];let r=this.positions[n-1],i=this.positions[n],a=this.colors[n-1],o=this.colors[n];return lt(a,o,(e-r)/(i-r),t)}getBackgroundImageStyle(e=`rgb`){if(this.colors.length===2&&this.positions[0]===0&&this.positions[1]===1)return`linear-gradient(to right, ${this.colors[0].toCSS()}, ${this.colors[1].toCSS()})`;let t=`linear-gradient(to right`;for(let n=0;n<=100;n++)t+=`, `+this.getColorAt(n/100,e).toCSS()+` `+n+`%`;return t+=`)`,t}};const dt=o`.color-selection {
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
`,R=o`/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-border-style:solid;--tw-font-weight:initial;--tw-tracking:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial}}}@layer theme{:root,:host{--font-sans:"Google Sans Flex", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-green-600:oklch(62.7% .194 149.214);--color-blue-600:oklch(54.6% .245 262.881);--color-blue-800:oklch(42.4% .199 265.638);--color-slate-300:oklch(86.9% .022 252.894);--color-slate-800:oklch(27.9% .041 260.031);--color-slate-900:oklch(20.8% .042 265.755);--color-gray-500:oklch(55.1% .027 264.364);--color-gray-600:oklch(44.6% .03 256.802);--color-gray-700:oklch(37.3% .034 259.733);--color-gray-800:oklch(27.8% .033 256.848);--color-white:#fff;--spacing:.25rem;--container-xs:20rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--text-lg:1.125rem;--text-lg--line-height:calc(1.75 / 1.125);--font-weight-medium:500;--font-weight-semibold:600;--font-weight-bold:700;--tracking-wider:.05em;--radius-md:.375rem;--radius-lg:.5rem;--blur-md:12px;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.relative{position:relative}.static{position:static}.container{width:100%}@media (min-width:40rem){.container{max-width:40rem}}@media (min-width:48rem){.container{max-width:48rem}}@media (min-width:64rem){.container{max-width:64rem}}@media (min-width:80rem){.container{max-width:80rem}}@media (min-width:96rem){.container{max-width:96rem}}.mx-auto{margin-inline:auto}.my-0{margin-block:0}.my-2{margin-block:calc(var(--spacing) * 2)}.mt-1{margin-top:var(--spacing)}.mt-3{margin-top:calc(var(--spacing) * 3)}.mb-2{margin-bottom:calc(var(--spacing) * 2)}.mb-3{margin-bottom:calc(var(--spacing) * 3)}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.h-6{height:calc(var(--spacing) * 6)}.h-8{height:calc(var(--spacing) * 8)}.w-12{width:calc(var(--spacing) * 12)}.w-full{width:100%}.max-w-xs{max-width:var(--container-xs)}.flex-1{flex:1}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.cursor-crosshair{cursor:crosshair}.cursor-pointer{cursor:pointer}.list-inside{list-style-position:inside}.list-disc{list-style-type:disc}.flex-col{flex-direction:column}.items-center{align-items:center}.items-stretch{align-items:stretch}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-1{gap:var(--spacing)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-3{gap:calc(var(--spacing) * 3)}.gap-6{gap:calc(var(--spacing) * 6)}:where(.space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)))}.overflow-hidden{overflow:hidden}.overflow-visible{overflow:visible}.rounded{border-radius:.25rem}.rounded-lg{border-radius:var(--radius-lg)}.rounded-md{border-radius:var(--radius-md)}.border{border-style:var(--tw-border-style);border-width:1px}.border-none{--tw-border-style:none;border-style:none}.bg-slate-800{background-color:var(--color-slate-800)}.bg-transparent{background-color:#0000}.bg-white{background-color:var(--color-white)}.bg-white\\/30{background-color:#ffffff4d}@supports (color:color-mix(in lab, red, red)){.bg-white\\/30{background-color:color-mix(in oklab, var(--color-white) 30%, transparent)}}.bg-white\\/40{background-color:#fff6}@supports (color:color-mix(in lab, red, red)){.bg-white\\/40{background-color:color-mix(in oklab, var(--color-white) 40%, transparent)}}.bg-white\\/50{background-color:#ffffff80}@supports (color:color-mix(in lab, red, red)){.bg-white\\/50{background-color:color-mix(in oklab, var(--color-white) 50%, transparent)}}.p-1{padding:var(--spacing)}.p-1\\.5{padding:calc(var(--spacing) * 1.5)}.px-2{padding-inline:calc(var(--spacing) * 2)}.px-2\\.5{padding-inline:calc(var(--spacing) * 2.5)}.px-3{padding-inline:calc(var(--spacing) * 3)}.px-4{padding-inline:calc(var(--spacing) * 4)}.py-1{padding-block:var(--spacing)}.py-1\\.5{padding-block:calc(var(--spacing) * 1.5)}.py-2{padding-block:calc(var(--spacing) * 2)}.text-center{text-align:center}.text-left{text-align:left}.text-right{text-align:right}.font-mono{font-family:var(--font-mono)}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\[10px\\]{font-size:10px}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-wider{--tw-tracking:var(--tracking-wider);letter-spacing:var(--tracking-wider)}.text-blue-600{color:var(--color-blue-600)}.text-gray-500{color:var(--color-gray-500)}.text-gray-600{color:var(--color-gray-600)}.text-gray-700{color:var(--color-gray-700)}.text-gray-800{color:var(--color-gray-800)}.text-green-600{color:var(--color-green-600)}.text-slate-300{color:var(--color-slate-300)}.text-slate-900{color:var(--color-slate-900)}.uppercase{text-transform:uppercase}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-inner{--tw-shadow:inset 0 2px 4px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-xs{--tw-shadow:0 1px 2px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-blue-600{--tw-ring-color:var(--color-blue-600)}.backdrop-blur-md{--tw-backdrop-blur:blur(var(--blur-md));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.outline-none{--tw-outline-style:none;outline-style:none}.file\\:mr-3::file-selector-button{margin-right:calc(var(--spacing) * 3)}.file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.file\\:bg-white\\/80::file-selector-button{background-color:#fffc}@supports (color:color-mix(in lab, red, red)){.file\\:bg-white\\/80::file-selector-button{background-color:color-mix(in oklab, var(--color-white) 80%, transparent)}}.file\\:px-3::file-selector-button{padding-inline:calc(var(--spacing) * 3)}.file\\:py-1\\.5::file-selector-button{padding-block:calc(var(--spacing) * 1.5)}.file\\:text-xs::file-selector-button{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.file\\:font-semibold::file-selector-button{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.file\\:text-gray-800::file-selector-button{color:var(--color-gray-800)}@media (hover:hover){.hover\\:bg-white\\/50:hover{background-color:#ffffff80}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-white\\/50:hover{background-color:color-mix(in oklab, var(--color-white) 50%, transparent)}}.hover\\:text-blue-800:hover{color:var(--color-blue-800)}.hover\\:text-white:hover{color:var(--color-white)}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:file\\:bg-white:hover::file-selector-button{background-color:var(--color-white)}}.focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}}:host{font-optical-sizing:auto;font-family:Google Sans Flex,sans-serif}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}
`;var z=class e extends Event{static{this.eventName=`set-color`}constructor(t){super(e.eventName,{bubbles:!0,composed:!0}),this.color=t}},B=class e extends Event{static{this.eventName=`commit-color`}constructor(t){super(e.eventName,{bubbles:!0,composed:!0}),this.color=t}},ft=class e extends Event{static{this.eventName=`set-interpolation-active`}constructor(t){super(e.eventName,{bubbles:!0,composed:!0}),this.active=t}};function V(e,t){try{let n=localStorage.getItem(e);return n===null?t:JSON.parse(n)}catch{return t}}function H(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}var U=class{constructor(e,t){this.options=t,this.handleMouseDown=e=>{this.options.onDragStart?.(e),document.addEventListener(`mousemove`,this.handleMouseMove),document.addEventListener(`mouseup`,this.handleMouseUp)},this.handleMouseMove=e=>{this.options.onDrag(e)},this.handleMouseUp=()=>{document.removeEventListener(`mousemove`,this.handleMouseMove),document.removeEventListener(`mouseup`,this.handleMouseUp),this.options.onDragEnd?.()},e.addController(this)}hostDisconnected(){document.removeEventListener(`mousemove`,this.handleMouseMove),document.removeEventListener(`mouseup`,this.handleMouseUp)}};function W(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}let pt=class extends w{constructor(...e){super(...e),this.position=0,this.color=`#ffffff`}static{this.styles=o`
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
  `}updated(){this.style.left=`${this.position}%`}render(){return v`
      <div
        class="color-bar-pointer-capsule"
        style="background-color: ${this.color};"
      ></div>
    `}};W([E({type:Number})],pt.prototype,`position`,void 0),W([E({type:String})],pt.prototype,`color`,void 0),pt=W([T(`color-bar-pointer`)],pt);const mt=`color-interpolation-ui-store`;let G=class extends w{constructor(...e){super(...e),this.activeColor=`none`,this.leftColor=new L,this.rightColor=new L,this.activeLerpMode=null,this.activeRatio=.5,this.gradients=[{type:`RGB`},{type:`HSL`},{typeName:`HSL*`,type:`HSL_FLIP`},{type:`LCH`}],this.colorGradient=new ut,this.handleExternalColor=()=>{!this.isInternalDrag&&this.activeLerpMode!==null&&(this.activeLerpMode=null,this.saveUIState())},this.lastCommittedColor=this.leftColor,this.selectedGradientDiv=null,this.isInternalDrag=!1,this.processDrag=e=>{if(this.selectedGradientDiv){let t=this.selectedGradientDiv.getAttribute(`data-mode`)||``,n=this.selectedGradientDiv.getBoundingClientRect(),r=F((e.clientX-n.left)/n.width,0,1),i=rt[t.toUpperCase()],a=this.colorGradient.getColorAt(r,i);this.activeRatio=r,this.activeLerpMode=t,this.saveUIState(),this.setActiveColor(`none`),this.isInternalDrag=!0,this.setColor(a),this.isInternalDrag=!1}},this.drag=new U(this,{onDragStart:e=>{this.selectedGradientDiv=e.currentTarget,this.processDrag(e)},onDrag:e=>{this.processDrag(e)},onDragEnd:()=>{this.selectedGradientDiv=null,this.commitColor()}})}static{this.styles=[R,dt]}connectedCallback(){super.connectedCallback(),window.addEventListener(z.eventName,this.handleExternalColor)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(z.eventName,this.handleExternalColor)}setColor(e){this.lastCommittedColor=e,this.dispatchEvent(new z(e))}commitColor(){this.dispatchEvent(new B(this.lastCommittedColor))}setActiveColor(e){this.dispatchEvent(new ft(e))}setActiveColorLeft(){this.setActiveColor(this.activeColor===`left`?`none`:`left`)}setActiveColorRight(){this.setActiveColor(this.activeColor===`right`?`none`:`right`)}firstUpdated(){this.loadUIState()}saveUIState(){H(mt,{activeLerpMode:this.activeLerpMode,activeRatio:this.activeRatio})}loadUIState(){let e=V(mt,null);e&&(e.activeLerpMode!==void 0&&(this.activeLerpMode=e.activeLerpMode),e.activeRatio!==void 0&&(this.activeRatio=e.activeRatio))}render(){return this.colorGradient=new ut(this.leftColor,this.rightColor),v`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">
        Color Interpolation
      </h5>
      <div class="flex justify-center gap-6 my-2">
        <div
          class="color-selection cursor-pointer ${this.activeColor===`left`?`active ring-2 ring-blue-600`:``}"
          @click=${this.setActiveColorLeft}
          style="background: #${this.leftColor.getHex()}"
        ></div>
        <div
          class="color-selection cursor-pointer ${this.activeColor===`right`?`active ring-2 ring-blue-600`:``}"
          @click=${this.setActiveColorRight}
          style="background: #${this.rightColor.getHex()}"
        ></div>
      </div>
      <div class="flex flex-col gap-2 mt-3">
        ${this.gradients.map(e=>{let t=rt[e.type],n=this.activeLerpMode===t,r=n?`#`+this.colorGradient.getColorAt(this.activeRatio,t).getHex():`#ffffff`;return v`
            <div class="flex items-center gap-3">
              <span class="w-12 text-left font-bold text-xs text-gray-700"
                >${e.typeName||e.type}</span
              >
              <div
                class="gradient flex-1 rounded relative overflow-visible cursor-crosshair h-6 shadow-inner"
                style="background: ${this.colorGradient.getBackgroundImageStyle(t)}"
                data-mode=${t}
                @mousedown=${this.drag.handleMouseDown}
              >
                ${n?v`<color-bar-pointer
                        .position=${this.activeRatio*100}
                        .color=${r}
                      ></color-bar-pointer>`:``}
              </div>
            </div>
          `})}
      </div>
    `}};W([E()],G.prototype,`activeColor`,void 0),W([E({attribute:!1})],G.prototype,`leftColor`,void 0),W([E({attribute:!1})],G.prototype,`rightColor`,void 0),W([D()],G.prototype,`activeLerpMode`,void 0),W([D()],G.prototype,`activeRatio`,void 0),W([E({attribute:!1})],G.prototype,`gradients`,void 0),G=W([T(`color-interpolation`)],G);const ht=o`:host {
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
}`;var gt=class e extends Event{static{this.eventName=`set-coordinates`}constructor(t){super(e.eventName,{bubbles:!0,composed:!0}),this.coordinates=t}};const _t=o`:host {
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
}`;var K=class extends w{constructor(...e){super(...e),this.color=new L,this.lastCommittedColor=this.color}setColor(e){this.lastCommittedColor=e,this.dispatchEvent(new z(e))}commitColor(){this.dispatchEvent(new B(this.lastCommittedColor))}};W([E({attribute:!1})],K.prototype,`color`,void 0);let vt=class extends K{constructor(...e){super(...e),this.handlePointer=e=>{let[,t,n]=this.color.getHSV(),r=this.colorBar.getBoundingClientRect(),i=F((e.clientX-r.left)/r.width,0,1)*360;this.setColor(new L({type:`hsv`,h:i,s:t,v:n}))},this.drag=new U(this,{onDragStart:this.handlePointer,onDrag:this.handlePointer,onDragEnd:()=>{this.commitColor()}})}static{this.styles=[_t]}render(){let[e]=this.color.getHSV(),t=`#`+new L({type:`hsv`,h:e,s:100,v:100}).getHex();return v`
      <div
        class="color-bar"
        @mousedown=${this.drag.handleMouseDown}
        id="color-bar"
      >
        <color-bar-pointer
          .position=${e/360*100}
          .color=${t}
        ></color-bar-pointer>
      </div>
    `}};W([Ge(`#color-bar`)],vt.prototype,`colorBar`,void 0),vt=W([T(`color-selection-hsv-bar`)],vt);let yt=class extends K{constructor(...e){super(...e),this.handlePointer=e=>{let[t]=this.color.getHSV(),n=this.colorGradContainer.getBoundingClientRect(),r=F((e.clientX-n.left)/n.width,0,1),i=F((e.clientY-n.top)/n.height,0,1),a=r*100,o=(1-i)*100;this.setColor(new L({type:`hsv`,h:t,s:a,v:o}))},this.drag=new U(this,{onDragStart:this.handlePointer,onDrag:this.handlePointer,onDragEnd:()=>{this.commitColor()}})}static{this.styles=[_t,o`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        flex: 1;
      }
    `]}render(){let[e,t,n]=this.color.getHSV(),r=`linear-gradient(to right, #FFF 0%, ${`#`+new L({type:`hsv`,h:e,s:100,v:100}).getHex()} 100%)`,i=`
      top: ${(1-n/100)*100}%;
      left: ${t/100*100}%;
      background-color: #${this.color.getHex()};
      border-color: ${n<50?`white`:`black`};
    `;return v`
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
    `}};W([Ge(`#color-grad-container`)],yt.prototype,`colorGradContainer`,void 0),yt=W([T(`color-selection-hsv-grad`)],yt);let bt=class extends w{constructor(...e){super(...e),this.color=new L}static{this.styles=[_t]}render(){return v`
      <color-selection-hsv-grad .color=${this.color}></color-selection-hsv-grad>
      <color-selection-hsv-bar .color=${this.color}></color-selection-hsv-bar>
    `}};W([E({attribute:!1})],bt.prototype,`color`,void 0),bt=W([T(`color-selection-hsv`)],bt);let xt=class extends K{constructor(...e){super(...e),this.handlePointer=e=>{let t=this.colorGrad.getBoundingClientRect(),n=e.clientX-t.left-t.width/2,r=e.clientY-t.top-t.height/2,i=Math.sqrt(n*n+r*r)/(t.width/2),a=Math.min(i,1),o=(180/Math.PI*Math.atan2(r,n)+90+360)%360;this.setColor(new L({type:`hsl`,h:o,s:100*a,l:50}))},this.drag=new U(this,{onDragStart:this.handlePointer,onDrag:this.handlePointer,onDragEnd:()=>{this.commitColor()}})}static{this.styles=[o`
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
    `]}render(){let[e,t]=this.color.getHSL(),n=.5*t/100,r=3*Math.PI/2+Math.PI/180*e,i=Math.cos(r)*n,a=`
            top: ${50+Math.sin(r)*n*100}%;
            left: ${50+i*100}%;
            background-color: #${new L({type:`hsl`,h:e,s:t,l:50}).getHex()};
        `;return v`
      <div
        class="color-grad"
        id="color-grad"
        style=${`
          background-image: radial-gradient(
            circle at center,
            hsl(0, 0%, 50%, 1) 0%,
            hsl(0, 100%, 0%, 0) 70%
          ),
          conic-gradient(
            in hsl shorter hue,
            hsl(0, 100%, 50%),
            /* Red */ hsl(60, 100%, 50%),
            /* Yellow */ hsl(120, 100%, 50%),
            /* Lime */ hsl(180, 100%, 50%),
            /* Cyan */ hsl(240, 100%, 50%),
            /* Blue */ hsl(300, 100%, 50%),
            /* Magenta */ hsl(360, 100%, 50%)
          );`}
        @mousedown=${this.drag.handleMouseDown}
      >
        <div class="color-grad-circle" style=${a}></div>
      </div>
    `}};W([Ge(`#color-grad`)],xt.prototype,`colorGrad`,void 0),xt=W([T(`color-selection-hsl-wheel`)],xt);let St=class extends K{constructor(...e){super(...e),this.handlePointer=e=>{let[t,n]=this.color.getHSL(),r=this.colorBar.getBoundingClientRect(),i=F((e.clientX-r.left)/r.width,0,1)*100;this.setColor(new L({type:`hsl`,h:t,s:n,l:i}))},this.drag=new U(this,{onDragStart:this.handlePointer,onDrag:this.handlePointer,onDragEnd:()=>{this.commitColor()}})}static{this.styles=o`
    .color-bar {
      position: relative;
      width: 100%;
      height: 1.5rem;
      margin-top: 0.5rem;
      border-radius: 0.25rem;
    }
  `}render(){let[e,t,n]=this.color.getHSL(),r=`#`+this.color.getHex(),i=[`background: linear-gradient(`,`to right,`];for(let n=0;n<=100;n++)i.push(`hsl(${e}deg, ${t}%, ${n}%) ${n}%`+(n<100?`,`:``));i.push(`);`);let a=i.join(`
`);return v`
      <div
        class="color-bar"
        @mousedown=${this.drag.handleMouseDown}
        id="color-bar"
        style=${a}
      >
        <color-bar-pointer
          .position=${n}
          .color=${r}
        ></color-bar-pointer>
      </div>
    `}};W([Ge(`#color-bar`)],St.prototype,`colorBar`,void 0),St=W([T(`color-selection-hsl-bar`)],St);let Ct=class extends w{constructor(...e){super(...e),this.color=new L}static{this.styles=[o`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 20rem;
        margin: 0 auto;
      }
    `]}render(){return v`
      <color-selection-hsl-wheel
        .color=${this.color}
      ></color-selection-hsl-wheel>
      <color-selection-hsl-bar .color=${this.color}></color-selection-hsl-bar>
    `}};W([E({attribute:!1})],Ct.prototype,`color`,void 0),Ct=W([T(`color-selection-hsl`)],Ct);let q=class extends w{constructor(...e){super(...e),this.color=new L,this.colorSelectionType=`HSV`}static{this.styles=[R,o`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
    `]}getColorSelectionHtml(){return this.colorSelectionType===`HSV`?v`<color-selection-hsv
        class="w-full flex-1 flex flex-col"
        .color=${this.color}
      ></color-selection-hsv>`:v`<color-selection-hsl
        class="w-full flex-1 flex flex-col my-0 mx-auto"
        .color=${this.color}
      ></color-selection-hsl>`}render(){let e=this.colorSelectionType===`HSV`;return v`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Selection</h5>
      <div
        class="inline-flex rounded-lg bg-slate-800 p-1 mb-3 w-full max-w-xs mx-auto"
      >
        <button
          type="button"
          class="flex-1 py-1.5 px-3 text-xs font-semibold rounded-md transition-all ${e?`bg-white text-slate-900 shadow-xs`:`text-slate-300 hover:text-white`}"
          @click=${()=>{this.colorSelectionType=`HSV`}}
        >
          HSV
        </button>
        <button
          type="button"
          class="flex-1 py-1.5 px-3 text-xs font-semibold rounded-md transition-all ${e?`text-slate-300 hover:text-white`:`bg-white text-slate-900 shadow-xs`}"
          @click=${()=>{this.colorSelectionType=`HSL_WHEEL`}}
        >
          HSL Wheel
        </button>
      </div>
      ${this.getColorSelectionHtml()}
    `}};W([E({attribute:!1})],q.prototype,`color`,void 0),W([E({attribute:!1})],q.prototype,`colorSelectionType`,void 0),q=W([T(`color-selection`)],q);const wt=o`.inputs-container {
  gap: 0.25rem;
}

table > * {
  --bs-table-bg: transparent;
}
`;var Tt=class e extends Event{static{this.eventName=`color-converter-input`}constructor(t,n){super(e.eventName,{bubbles:!0,composed:!0}),this.inputType=t,this.value=n}};const Et={HEX:`Hex`,RGB255:`RGB (0-255)`,RGB01:`RGB (0-1)`,HSV:`HSV`,HSL:`HSL`},Dt={HEX:`hexValue`,RGB255:`rgb255Value`,RGB01:`rgb01Value`,HSV:`hsvValue`,HSL:`hslValue`},Ot={HEX:e=>`#`+e.getHex(),RGB255:e=>e.getRGB255().toString(),RGB01:e=>e.getRGB01().map(e=>e.toFixed(3)).toString(),HSV:e=>e.getHSV(!1).toString(),HSL:e=>e.getHSL(!1).toString()};let J=class extends w{constructor(...e){super(...e),this.type=`HEX`,this.inputValues={},this.color=new L,this._copied=!1,this._copyTimeout=null}static{this.styles=[R]}async _copyValue(e){try{await navigator.clipboard.writeText(e),this._copied=!0,this._copyTimeout&&clearTimeout(this._copyTimeout),this._copyTimeout=setTimeout(()=>{this._copied=!1},1e3)}catch{}}onValueChange(e){this.dispatchEvent(new Tt(this.type,e.target.value))}render(){let e=this.inputValues[Dt[this.type]]??Ot[this.type](this.color);return v`
      <div
        class="flex items-stretch rounded-lg bg-white/50 backdrop-blur-md overflow-hidden text-left"
      >
        <div class="flex-1 px-2 py-1">
          <label
            class="block text-[10px] font-semibold text-gray-600 uppercase tracking-wider"
            >${Et[this.type]}</label
          >
          <input
            type="text"
            class="w-full text-xs font-mono text-gray-800 outline-none bg-transparent"
            .value=${e}
            @input=${this.onValueChange}
          />
        </div>
        <div class="flex items-center px-2 bg-white/30">
          <button
            class="p-1.5 rounded-md hover:bg-white/50 transition-colors cursor-pointer border-none bg-transparent"
            @click=${()=>this._copyValue(e)}
            title="Copy to clipboard"
            aria-label="Copy to clipboard"
          >
            ${this._copied?v`<svg
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
                  </svg>`:v`<svg
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
    `}};W([E()],J.prototype,`type`,void 0),W([E({attribute:!1})],J.prototype,`inputValues`,void 0),W([E({attribute:!1})],J.prototype,`color`,void 0),W([D()],J.prototype,`_copied`,void 0),J=W([T(`color-converter-input`)],J);const kt=/^#?([0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)$/,At=/^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/,jt=/^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;function Mt(e){let t=kt.exec(e);return t&&t.length===2?new L({type:`hex`,hex:t[1]}):null}function Nt(e){let t=At.exec(e);if(t&&t.length===4){let e=parseInt(t[1]),n=parseInt(t[2]),r=parseInt(t[3]);if(0<=e&&e<=255&&0<=n&&n<=255&&0<=r&&r<=255)return new L({type:`rgb255`,r:e,g:n,b:r})}return null}function Pt(e){let t=jt.exec(e);if(t&&t.length===4){let e=parseFloat(t[1]),n=parseFloat(t[2]),r=parseFloat(t[3]);if(0<=e&&e<=1&&0<=n&&n<=1&&0<=r&&r<=1)return new L({type:`rgb01`,r:e,g:n,b:r})}return null}function Ft(e){let t=jt.exec(e);if(t&&t.length===4){let e=parseFloat(t[1]),n=parseFloat(t[2]),r=parseFloat(t[3]);if(0<=e&&e<=360&&0<=n&&n<=100&&0<=r&&r<=100)return new L({type:`hsv`,h:e,s:n,v:r})}return null}function It(e){let t=jt.exec(e);if(t&&t.length===4){let e=parseFloat(t[1]),n=parseFloat(t[2]),r=parseFloat(t[3]);if(0<=e&&e<=360&&0<=n&&n<=100&&0<=r&&r<=100)return new L({type:`hsl`,h:e,s:n,l:r})}return null}function Y(e,t,n){for(let r of e.children)r instanceof t&&n(r)}const Lt={HEX:Mt,RGB255:Nt,RGB01:Pt,HSV:Ft,HSL:It};let X=class extends w{static{this.styles=[R,wt]}constructor(){super(),this.color=new L,this.coordinates={x:0,y:0,width:0,height:0},this.inputValues={},this.echoedHex=null,this.addEventListener(Tt.eventName,e=>{if(e instanceof Tt){let{inputType:t,value:n}=e,r=Lt[t](n);r!=null&&(this.echoedHex=r.getHex(),this.setColor(r),this.dispatchEvent(new B(r)),this.inputValues={[Dt[t]]:n})}})}setColor(e){this.dispatchEvent(new z(e))}updateChildren(){Y(this,J,e=>{e.inputValues=this.inputValues,e.color=this.color})}updated(e){e.has(`color`)&&!this.isEchoedColorUpdate()&&(this.inputValues={},this.echoedHex=null),this.updateChildren()}isEchoedColorUpdate(){return this.echoedHex!==null&&this.color.getHex()===this.echoedHex}render(){let{width:e,height:t}=this.coordinates,n=e||1,r=t||1,i={x:this.coordinates.x/n,y:this.coordinates.y/r},a=[i.x.toFixed(3),i.y.toFixed(3)],o=[Math.round(this.coordinates.x),Math.round(this.coordinates.y)];return v`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Converter</h5>
      <div
        class="flex justify-between items-center px-4 py-2 bg-white/40 backdrop-blur-md rounded-lg text-sm font-medium mb-3"
      >
        <span class="font-semibold text-gray-700">Coordinates</span>
        <div
          id="coordinates-container"
          class="text-right text-gray-600 font-mono text-xs"
        >
          (${a[0]}, ${a[1]})<br />
          (${o[0]}, ${o[1]})
        </div>
      </div>
      <slot class="flex flex-col gap-2 inputs-container"></slot>
    `}};W([E({attribute:!1})],X.prototype,`color`,void 0),W([E({attribute:!1})],X.prototype,`coordinates`,void 0),W([D()],X.prototype,`inputValues`,void 0),X=W([T(`color-converter`)],X);
/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const{I:Rt}=Le,zt=e=>e.strings===void 0,Bt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Vt=e=>(...t)=>({_$litDirective$:e,values:t})
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
;var Ht=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const Ut=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),Ut(e,t);return!0},Wt=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},Gt=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=/* @__PURE__ */ new Set;else if(n.has(e))break;n.add(e),Jt(t)}};function Kt(e){this._$AN===void 0?this._$AM=e:(Wt(this),this._$AM=e,Gt(this))}function qt(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0){if(t){if(Array.isArray(r))for(let e=n;e<r.length;e++)Ut(r[e],!1),Wt(r[e]);else r!=null&&(Ut(r,!1),Wt(r))}else Ut(this,e)}}const Jt=e=>{e.type==Bt.CHILD&&(e._$AP??=qt,e._$AQ??=Kt)};var Yt=class extends Ht{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),Gt(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Ut(this,e),Wt(this))}setValue(e){if(zt(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}};
/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const Xt=()=>new Zt;var Zt=class{};const Qt=/* @__PURE__ */ new WeakMap,$t=Vt(class extends Yt{render(e){return b}update(e,[t]){let n=t!==this.G;return n&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),b}rt(e){if(this.G!==void 0){if(this.isConnected||(e=void 0),typeof this.G==`function`){let t=this.ht??globalThis,n=Qt.get(t);n===void 0&&(n=/* @__PURE__ */ new WeakMap,Qt.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}}get lt(){return typeof this.G==`function`?Qt.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),en=o`:host {
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
`,tn={small:`1rem`,medium:`1.5rem`,large:`3rem`};let Z=class extends w{static{this.styles=[R,en]}constructor(){super(),this.coordinates={x:0,y:0,width:0,height:0},this.initialOverlayColor=`black`,this.overlayColor=`black`,this.overlaySize=`medium`,this.loadedImage=!1,this.canvasRef=Xt(),this.lastSampledColor=new L,this.drag=new U(this,{onDragStart:e=>this.samplePixel(e),onDrag:e=>this.samplePixel(e),onDragEnd:()=>{this.dispatchEvent(new B(this.lastSampledColor))}}),this.overlayColor=this.initialOverlayColor}samplePixel(e){let t=this.canvasRef.value,n=t.getContext(`2d`);if(n){let r=t.getBoundingClientRect(),i=(e.clientX-r.left)/r.width*t.width,a=(e.clientY-r.top)/r.height*t.height,o=n.getImageData(i,a,1,1),s=new L({type:`rgb255`,r:o.data[0],g:o.data[1],b:o.data[2]});this.lastSampledColor=s,this.dispatchEvent(new z(s)),this.dispatchEvent(new gt({x:i,y:a,width:t.width,height:t.height}))}}loadImage(e){let t=e.currentTarget.files?.item(0);if(t){let e=new FileReader;e.onload=e=>{let t=new Image;t.onload=()=>{let e=this.canvasRef.value,n=e.getContext(`2d`);n&&(e.width=t.width,e.height=t.height,n.drawImage(t,0,0)),this.loadedImage=!0},t.src=e.target?.result},e.readAsDataURL(t)}}selectOverlayColor(e){this.overlayColor=e.currentTarget.value}selectOverlaySize(e){this.overlaySize=e.currentTarget.value}render(){let e=this.coordinates.x/this.coordinates.width*100,t=this.coordinates.y/this.coordinates.height*100,n=`
      border-color: ${this.overlayColor};
      top: calc(${t}% - var(--circle-diameter) / 2);
      left: calc(${e}% - var(--circle-diameter) / 2);
      --circle-diameter: ${tn[this.overlaySize]};
    `;return v`
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
              value=${`transparent`}
              .selected=${this.overlayColor==`transparent`}
            >
              None
            </option>
            <option
              value=${`black`}
              .selected=${this.overlayColor==`black`}
            >
              Black
            </option>
            <option
              value=${`white`}
              .selected=${this.overlayColor==`white`}
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
              value=${`small`}
              .selected=${this.overlaySize==`small`}
            >
              Small
            </option>
            <option
              value=${`medium`}
              .selected=${this.overlaySize==`medium`}
            >
              Medium
            </option>
            <option
              value=${`large`}
              .selected=${this.overlaySize==`large`}
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
          ${$t(this.canvasRef)}
          @mousedown=${this.drag.handleMouseDown}
        ></canvas>
        <div
          class="image-preview-overlay"
          ?hidden=${!this.loadedImage}
          style=${n}
        ></div>
      </div>
    `}};W([E({attribute:!1})],Z.prototype,`coordinates`,void 0),W([E({attribute:!1})],Z.prototype,`initialOverlayColor`,void 0),W([D()],Z.prototype,`overlayColor`,void 0),W([D()],Z.prototype,`overlaySize`,void 0),W([D()],Z.prototype,`loadedImage`,void 0),Z=W([T(`image-sampling`)],Z);const nn=[[.18995,.07176,.23217],[.19483,.08339,.26149],[.19956,.09498,.29024],[.20415,.10652,.31844],[.2086,.11802,.34607],[.21291,.12947,.37314],[.21708,.14087,.39964],[.22111,.15223,.42558],[.225,.16354,.45096],[.22875,.17481,.47578],[.23236,.18603,.50004],[.23582,.1972,.52373],[.23915,.20833,.54686],[.24234,.21941,.56942],[.24539,.23044,.59142],[.2483,.24143,.61286],[.25107,.25237,.63374],[.25369,.26327,.65406],[.25618,.27412,.67381],[.25853,.28492,.693],[.26074,.29568,.71162],[.2628,.30639,.72968],[.26473,.31706,.74718],[.26652,.32768,.76412],[.26816,.33825,.7805],[.26967,.34878,.79631],[.27103,.35926,.81156],[.27226,.3697,.82624],[.27334,.38008,.84037],[.27429,.39043,.85393],[.27509,.40072,.86692],[.27576,.41097,.87936],[.27628,.42118,.89123],[.27667,.43134,.90254],[.27691,.44145,.91328],[.27701,.45152,.92347],[.27698,.46153,.93309],[.2768,.47151,.94214],[.27648,.48144,.95064],[.27603,.49132,.95857],[.27543,.50115,.96594],[.27469,.51094,.97275],[.27381,.52069,.97899],[.27273,.5304,.98461],[.27106,.54015,.9893],[.26878,.54995,.99303],[.26592,.55979,.99583],[.26252,.56967,.99773],[.25862,.57958,.99876],[.25425,.5895,.99896],[.24946,.59943,.99835],[.24427,.60937,.99697],[.23874,.61931,.99485],[.23288,.62923,.99202],[.22676,.63913,.98851],[.22039,.64901,.98436],[.21382,.65886,.97959],[.20708,.66866,.97423],[.20021,.67842,.96833],[.19326,.68812,.9619],[.18625,.69775,.95498],[.17923,.70732,.94761],[.17223,.7168,.93981],[.16529,.7262,.93161],[.15844,.73551,.92305],[.15173,.74472,.91416],[.14519,.75381,.90496],[.13886,.76279,.8955],[.13278,.77165,.8858],[.12698,.78037,.8759],[.12151,.78896,.86581],[.11639,.7974,.85559],[.11167,.80569,.84525],[.10738,.81381,.83484],[.10357,.82177,.82437],[.10026,.82955,.81389],[.0975,.83714,.80342],[.09532,.84455,.79299],[.09377,.85175,.78264],[.09287,.85875,.7724],[.09267,.86554,.7623],[.0932,.87211,.75237],[.09451,.87844,.74265],[.09662,.88454,.73316],[.09958,.8904,.72393],[.10342,.896,.715],[.10815,.90142,.70599],[.11374,.90673,.69651],[.12014,.91193,.6866],[.12733,.91701,.67627],[.13526,.92197,.66556],[.14391,.9268,.65448],[.15323,.93151,.64308],[.16319,.93609,.63137],[.17377,.94053,.61938],[.18491,.94484,.60713],[.19659,.94901,.59466],[.20877,.95304,.58199],[.22142,.95692,.56914],[.23449,.96065,.55614],[.24797,.96423,.54303],[.2618,.96765,.52981],[.27597,.97092,.51653],[.29042,.97403,.50321],[.30513,.97697,.48987],[.32006,.97974,.47654],[.33517,.98234,.46325],[.35043,.98477,.45002],[.36581,.98702,.43688],[.38127,.98909,.42386],[.39678,.99098,.41098],[.41229,.99268,.39826],[.42778,.99419,.38575],[.44321,.99551,.37345],[.45854,.99663,.3614],[.47375,.99755,.34963],[.48879,.99828,.33816],[.50362,.99879,.32701],[.51822,.9991,.31622],[.53255,.99919,.30581],[.54658,.99907,.29581],[.56026,.99873,.28623],[.57357,.99817,.27712],[.58646,.99739,.26849],[.59891,.99638,.26038],[.61088,.99514,.2528],[.62233,.99366,.24579],[.63323,.99195,.23937],[.64362,.98999,.23356],[.65394,.98775,.22835],[.66428,.98524,.2237],[.67462,.98246,.2196],[.68494,.97941,.21602],[.69525,.9761,.21294],[.70553,.97255,.21032],[.71577,.96875,.20815],[.72596,.9647,.2064],[.7361,.96043,.20504],[.74617,.95593,.20406],[.75617,.95121,.20343],[.76608,.94627,.20311],[.77591,.94113,.2031],[.78563,.93579,.20336],[.79524,.93025,.20386],[.80473,.92452,.20459],[.8141,.91861,.20552],[.82333,.91253,.20663],[.83241,.90627,.20788],[.84133,.89986,.20926],[.8501,.89328,.21074],[.85868,.88655,.2123],[.86709,.87968,.21391],[.8753,.87267,.21555],[.88331,.86553,.21719],[.89112,.85826,.2188],[.8987,.85087,.22038],[.90605,.84337,.22188],[.91317,.83576,.22328],[.92004,.82806,.22456],[.92666,.82025,.2257],[.93301,.81236,.22667],[.93909,.80439,.22744],[.94489,.79634,.228],[.95039,.78823,.22831],[.9556,.78005,.22836],[.96049,.77181,.22811],[.96507,.76352,.22754],[.96931,.75519,.22663],[.97323,.74682,.22536],[.97679,.73842,.22369],[.98,.73,.22161],[.98289,.7214,.21918],[.98549,.7125,.2165],[.98781,.7033,.21358],[.98986,.69382,.21043],[.99163,.68408,.20706],[.99314,.67408,.20348],[.99438,.66386,.19971],[.99535,.65341,.19577],[.99607,.64277,.19165],[.99654,.63193,.18738],[.99675,.62093,.18297],[.99672,.60977,.17842],[.99644,.59846,.17376],[.99593,.58703,.16899],[.99517,.57549,.16412],[.99419,.56386,.15918],[.99297,.55214,.15417],[.99153,.54036,.1491],[.98987,.52854,.14398],[.98799,.51667,.13883],[.9859,.50479,.13367],[.9836,.49291,.12849],[.98108,.48104,.12332],[.97837,.4692,.11817],[.97545,.4574,.11305],[.97234,.44565,.10797],[.96904,.43399,.10294],[.96555,.42241,.09798],[.96187,.41093,.0931],[.95801,.39958,.08831],[.95398,.38836,.08362],[.94977,.37729,.07905],[.94538,.36638,.07461],[.94084,.35566,.07031],[.93612,.34513,.06616],[.93125,.33482,.06218],[.92623,.32473,.05837],[.92105,.31489,.05475],[.91572,.3053,.05134],[.91024,.29599,.04814],[.90463,.28696,.04516],[.89888,.27824,.04243],[.89298,.26981,.03993],[.88691,.26152,.03753],[.88066,.25334,.03521],[.87422,.24526,.03297],[.8676,.2373,.03082],[.86079,.22945,.02875],[.8538,.2217,.02677],[.84662,.21407,.02487],[.83926,.20654,.02305],[.83172,.19912,.02131],[.82399,.19182,.01966],[.81608,.18462,.01809],[.80799,.17753,.0166],[.79971,.17055,.0152],[.79125,.16368,.01387],[.7826,.15693,.01264],[.77377,.15028,.01148],[.76476,.14374,.01041],[.75556,.13731,.00942],[.74617,.13098,.00851],[.73661,.12477,.00769],[.72686,.11867,.00695],[.71692,.11268,.00629],[.7068,.1068,.00571],[.6965,.10102,.00522],[.68602,.09536,.00481],[.67535,.0898,.00449],[.66449,.08436,.00424],[.65345,.07902,.00408],[.64223,.0738,.00401],[.63082,.06868,.00401],[.61923,.06367,.0041],[.60746,.05878,.00427],[.5955,.05399,.00453],[.58336,.04931,.00486],[.57103,.04474,.00529],[.55852,.04028,.00579],[.54583,.03593,.00638],[.53295,.03169,.00705],[.51989,.02756,.0078],[.50664,.02354,.00863],[.49321,.01963,.00955],[.4796,.01583,.01055]];let rn=class extends K{constructor(...e){super(...e),this.data=[[0,0,0]],this.name=`Color Map`,this.processColorAt=e=>{let t=this.colorMapDiv.getBoundingClientRect(),n=F((e.clientX-t.left)/t.width,0,1),r=this.getColorAt(n);this.setColor(r)},this.drag=new U(this,{onDragStart:this.processColorAt,onDrag:this.processColorAt,onDragEnd:()=>{this.commitColor()}})}static{this.styles=[R]}toCss(){let e=this.data,t=[];for(let n=0;n<256;n++)t.push(`rgba(${Math.round(e[n][0]*255)}, ${Math.round(e[n][1]*255)}, ${Math.round(e[n][2]*255)}, 255) ${100*n/255}%`);return`linear-gradient(to right, ${t.join(`, `)})`}getColorAt(e){let t=this.data,n=Math.floor(F(e*t.length,0,t.length-1)),r=Math.ceil(F(e*t.length,0,t.length-1)),i=e*t.length-n;return lt(new L({type:`rgb01`,r:t[n][0],g:t[n][1],b:t[n][2]}),new L({type:`rgb01`,r:t[r][0],g:t[r][1],b:t[r][2]}),i)}findClosestColormapPoint(e){let t=e.getRGB255(),n=this.data,r=1/0,i=0;for(let e=0;e<n.length;e++){let a=Math.round(n[e][0]*255),o=Math.round(n[e][1]*255),s=Math.round(n[e][2]*255),c=t[0]-a,l=t[1]-o,u=t[2]-s,d=Math.sqrt(c*c+l*l+u*u);d<r&&(r=d,i=e)}return{index:i,distance:r,ratio:n.length>1?i/(n.length-1):0}}render(){let e=this.findClosestColormapPoint(this.color),t=e.distance<=30;return v`
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
          ${t?v`<color-bar-pointer
                  .position=${e.ratio*100}
                  .color=${`#`+this.color.getHex()}
                ></color-bar-pointer>`:``}
        </div>
      </div>
    `}};W([E({attribute:!1})],rn.prototype,`data`,void 0),W([E()],rn.prototype,`name`,void 0),W([Ge(`#colormap-div`)],rn.prototype,`colorMapDiv`,void 0),rn=W([T(`color-map`)],rn);let an=class extends w{constructor(...e){super(...e),this.color=new L}static{this.styles=[R]}render(){return v`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Maps</h5>
      <div class="flex flex-col gap-2">
        <color-map
          .data=${nn}
          .name=${`Turbo`}
          .color=${this.color}
        ></color-map>
      </div>
    `}};W([E({attribute:!1})],an.prototype,`color`,void 0),an=W([T(`color-maps`)],an);const on=[`analogous`],sn=[`complementary`,`triadic`,`split-complementary`,`tetradic`],cn=[`monochromatic`,...on,...sn];function ln(e){let t;switch(e){case`tonal`:return`monochromatic`;case`analogous`:t=on;break;case`vivid`:t=sn;break;default:t=cn}return t[Math.floor(Math.random()*t.length)]}function un(e,t){return e+Math.random()*(t-e)}function dn(e){return(e%360+360)%360}function fn(e){switch(e){case`monochromatic`:return[0,0,0,0,0];case`analogous`:return[-60,-30,0,30,60];case`complementary`:return[0,10,-10,180,190];case`triadic`:return[0,120,240,30,150];case`split-complementary`:return[0,150,210,-20,170];case`tetradic`:return[0,90,180,270,45];default:return[0,30,60,-30,-60]}}const pn={count:5,mode:`any`,saturationRange:[50,90],lightnessRange:[40,80],jitter:5};function mn(e,t){let n=un(t.saturationRange[0],t.saturationRange[1]),r=un(t.lightnessRange[0],t.lightnessRange[1]);return new L({type:`hsl`,h:dn(e+un(-t.jitter,t.jitter)),s:n,l:r})}function hn(e,t,n,r){let i=15+(r-1-n)/(r-1)*70;return new L({type:`hsl`,h:dn(e+un(-3,3)),s:t,l:i})}function gn(e,t){if(!e||!t)return null;let n=e.findIndex(Boolean);return n===-1||!t[n]?null:{index:n,hsl:t[n].getHSL()}}function _n(e,t,n){let r={...pn,...e},i=ln(r.mode),a=gn(t,n),o=r.mode===`tonal`?[0,0,0,0,0]:fn(i),s=a?dn(a.hsl[0]-o[a.index]):Math.random()*360,c=[];if(r.mode===`tonal`){let e=a?a.hsl[1]:un(30,70);for(let i=0;i<r.count;i++)t&&t[i]&&n&&n[i]?c.push(n[i]):c.push(hn(s,e,i,r.count))}else for(let e=0;e<r.count;e++)if(t&&t[e]&&n&&n[e])c.push(n[e]);else{let t=dn(s+o[e%o.length]);c.push(mn(t,r))}return c}var vn=class e extends Event{static{this.eventName=`set-palette-active`}constructor(t){super(e.eventName,{bubbles:!0,composed:!0}),this.index=t}};const yn=o`.material-symbols-outlined {
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


`,bn=`color-palette-store`;let Q=class extends w{static{this.styles=[R,yn]}constructor(){super(),this.activeEditingColor=new L,this.colors=[],this.locked=[,,,,,].fill(!1),this.activeIndex=-1,this.paletteMode=`any`,this.paletteCount=5,this.narrow=!1,this.dragIndex=-1,this.dragOverIndex=-1,this.prevEditingColor=null,this.resizeObserver=null,this.handleSpacebar=e=>{let t=e.target.tagName;e.code===`Space`&&t!==`INPUT`&&t!==`TEXTAREA`&&(e.preventDefault(),this.regenerate())};let e=this.loadFromStorage();e?(this.colors=e.colors,this.locked=e.locked,this.paletteMode=e.mode,this.paletteCount=e.count):this.colors=_n({count:this.paletteCount})}connectedCallback(){super.connectedCallback(),window.addEventListener(`keydown`,this.handleSpacebar),this.resizeObserver=new ResizeObserver(e=>{let t=e[0]?.contentRect.width??0;this.narrow=t<448}),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(`keydown`,this.handleSpacebar),this.resizeObserver?.disconnect()}updated(){this.activeIndex>=0&&this.activeEditingColor!==this.prevEditingColor&&this.colors[this.activeIndex]!==this.activeEditingColor&&(this.colors[this.activeIndex]=this.activeEditingColor,this.colors=[...this.colors],this.saveToStorage()),this.prevEditingColor=this.activeEditingColor}regenerate(){this.colors=_n({count:this.paletteCount,mode:this.paletteMode},this.locked,this.colors),this.saveToStorage(),this.activeIndex>=0&&this.dispatchEvent(new z(this.colors[this.activeIndex]))}copyColor(e){navigator.clipboard.writeText(`#`+e.getHex()).catch(()=>{})}regenerateSwatch(e,t){t.stopPropagation();let n=_n({count:1,mode:this.paletteMode})[0];this.colors[e]=n,this.colors=[...this.colors],this.dispatchEvent(new z(n)),this.dispatchEvent(new B(n)),this.saveToStorage()}selectSwatch(e){this.activeIndex===e?(this.activeIndex=-1,this.dispatchEvent(new vn(-1))):(this.activeIndex=e,this.dispatchEvent(new z(this.colors[e])),this.dispatchEvent(new vn(e)),this.dispatchEvent(new B(this.colors[e])))}setMode(e){this.paletteMode=e,this.saveToStorage(),this.regenerate()}setCount(e){if(e!==this.paletteCount){if(this.paletteCount=e,e>this.colors.length){let t=_n({count:e-this.colors.length,mode:this.paletteMode});this.colors=[...this.colors,...t],this.locked=[...this.locked,...Array(e-this.locked.length).fill(!1)]}else this.colors=this.colors.slice(0,e),this.locked=this.locked.slice(0,e),this.activeIndex>=e&&(this.activeIndex=-1,this.dispatchEvent(new vn(-1)));this.colors=[...this.colors],this.locked=[...this.locked],this.saveToStorage(),this.regenerate()}}toggleLock(e,t){t.stopPropagation(),this.locked[e]=!this.locked[e],this.locked=[...this.locked],this.saveToStorage()}onDragStart(e,t){this.dragIndex=e,t.dataTransfer.effectAllowed=`move`,t.dataTransfer.setData(`text/plain`,String(e))}onDragOver(e,t){t.preventDefault(),t.dataTransfer.dropEffect=`move`,this.dragOverIndex=e}onDragLeave(){this.dragOverIndex=-1}onDrop(e){let t=this.dragIndex;if(t<0||t===e)return;let n=[...this.colors],r=[...this.locked],[i]=n.splice(t,1),[a]=r.splice(t,1);n.splice(e,0,i),r.splice(e,0,a),this.colors=n,this.locked=r,this.activeIndex===t?this.activeIndex=e:this.activeIndex>=0&&(this.activeIndex=n.indexOf(this.colors[this.activeIndex])),this.saveToStorage()}onDragEnd(){this.dragIndex=-1,this.dragOverIndex=-1}saveToStorage(){H(bn,{colors:this.colors.map(e=>({hex:e.getHex()})),locked:this.locked,mode:this.paletteMode,count:this.paletteCount})}loadFromStorage(){let e=V(bn,null);if(!e||!e.colors||!e.colors.length)return null;let t=e.count??e.colors.length;return{colors:e.colors.map(e=>new L({type:`hex`,hex:e.hex})),locked:e.locked??Array(t).fill(!1),mode:e.mode??`any`,count:t}}render(){return v`
      <div class="palette-root ${this.narrow?`narrow`:``}">
        <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Palette</h5>
        <div class="palette-contrast mb-2">
          <span class="palette-contrast-label">Count</span>
          <div class="palette-contrast-group">
            ${Array.from({length:6},(e,t)=>t+2).map(e=>v`
                <button
                  class="palette-contrast-btn ${this.paletteCount===e?`active`:``}"
                  @click=${()=>this.setCount(e)}
                >
                  ${e}
                </button>
              `)}
          </div>
        </div>
        <div class="palette-contrast mb-2">
          <span class="palette-contrast-label">Mode</span>
          <div class="palette-contrast-group">
            <button
              class="palette-contrast-btn ${this.paletteMode===`any`?`active`:``}"
              @click=${()=>this.setMode(`any`)}
            >
              Any
            </button>
            <button
              class="palette-contrast-btn ${this.paletteMode===`tonal`?`active`:``}"
              @click=${()=>this.setMode(`tonal`)}
            >
              Tonal
            </button>
            <button
              class="palette-contrast-btn ${this.paletteMode===`analogous`?`active`:``}"
              @click=${()=>this.setMode(`analogous`)}
            >
              Analogous
            </button>
            <button
              class="palette-contrast-btn ${this.paletteMode===`vivid`?`active`:``}"
              @click=${()=>this.setMode(`vivid`)}
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
          ${this.colors.map((e,t)=>v`
              <div
                class="palette-swatch ${this.activeIndex===t?`active`:``} ${this.dragIndex===t?`dragging`:``} ${this.dragOverIndex===t?`drag-over`:``}"
                style="background: ${e.toCSS()}"
                draggable="true"
                @click=${()=>this.selectSwatch(t)}
                @dragstart=${e=>this.onDragStart(t,e)}
                @dragover=${e=>this.onDragOver(t,e)}
                @dragleave=${this.onDragLeave}
                @drop=${()=>this.onDrop(t)}
                @dragend=${this.onDragEnd}
              >
                <div class="palette-swatch-actions">
                  <button
                    class="palette-action-btn"
                    @click=${e=>this.toggleLock(t,e)}
                    title=${this.locked[t]?`Unlock color`:`Lock color`}
                  >
                    <span class="material-symbols-outlined"
                      >${this.locked[t]?`lock`:`lock_open`}</span
                    >
                  </button>
                  ${this.activeIndex===t?v`
                          <button
                            class="palette-action-btn"
                            @click=${t=>{t.stopPropagation(),this.copyColor(e)}}
                            title="Copy hex"
                          >
                            <span class="material-symbols-outlined"
                              >content_copy</span
                            >
                          </button>
                          <button
                            class="palette-action-btn"
                            @click=${e=>this.regenerateSwatch(t,e)}
                            title="Regenerate this color"
                          >
                            <span class="material-symbols-outlined"
                              >refresh</span
                            >
                          </button>
                        `:``}
                </div>
                <div class="palette-swatch-hex">
                  #${e.getHex().toUpperCase()}
                </div>
              </div>
            `)}
        </div>
      </div>
    `}};W([E({attribute:!1})],Q.prototype,`activeEditingColor`,void 0),W([D()],Q.prototype,`colors`,void 0),W([D()],Q.prototype,`locked`,void 0),W([D()],Q.prototype,`activeIndex`,void 0),W([D()],Q.prototype,`paletteMode`,void 0),W([D()],Q.prototype,`paletteCount`,void 0),W([D()],Q.prototype,`narrow`,void 0),W([D()],Q.prototype,`dragIndex`,void 0),W([D()],Q.prototype,`dragOverIndex`,void 0),Q=W([T(`color-palette`)],Q);const xn=o`.material-symbols-outlined {
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
`,Sn=`color-history-store`;let Cn=class extends w{static{this.styles=[R,xn]}constructor(){super(),this.history=[],this.activeIndex=-1,this.handleCommit=e=>{if(!(e instanceof B))return;let t=this.closest(`color-picker`);if(!t||!t.contains(e.target))return;let n=e.color.getHex();this.history.length>0&&this.history[0].getHex()===n||(this.history=[e.color,...this.history].slice(0,50),this.activeIndex=-1,this.saveToStorage(),this.saveLastColor(e.color))},this.history=this.loadFromStorage()}connectedCallback(){super.connectedCallback(),window.addEventListener(B.eventName,this.handleCommit)}saveLastColor(e){H(`last-active-color`,e.getHex())}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(B.eventName,this.handleCommit)}selectSwatch(e,t){this.activeIndex=e,this.dispatchEvent(new z(t)),this.saveLastColor(t)}clearHistory(){this.history=[],this.activeIndex=-1,this.saveToStorage()}saveToStorage(){H(Sn,this.history.map(e=>({hex:e.getHex()})))}loadFromStorage(){let e=V(Sn,null);return!e||!Array.isArray(e)?[]:e.map(e=>new L({type:`hex`,hex:e.hex}))}render(){return v`
      <div class="history-root">
        <div class="history-header">
          <h5 class="text-lg font-semibold text-gray-800">Color History</h5>
        </div>
        ${this.history.length>0?v`
                <button
                  class="history-clear-btn"
                  @click=${this.clearHistory}
                  title="Clear history"
                >
                  Clear
                </button>
              `:``}
        ${this.history.length===0?v`<p class="history-empty">No colors yet</p>`:v`
                <div class="history-swatches">
                  ${this.history.map((e,t)=>v`
                      <div
                        class="history-swatch ${this.activeIndex===t?`active`:``}"
                        style="background: ${e.toCSS()}"
                        @click=${()=>this.selectSwatch(t,e)}
                        title="#${e.getHex().toUpperCase()}"
                      ></div>
                    `)}
                </div>
              `}
      </div>
    `}};W([D()],Cn.prototype,`history`,void 0),W([D()],Cn.prototype,`activeIndex`,void 0),Cn=W([T(`color-history`)],Cn);let wn=class extends w{static{this.styles=[R]}render(){return v`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Other Tools</h5>
      <ul class="list-disc list-inside text-left space-y-2 text-sm">
        ${[...this.children].map(e=>{if(e instanceof HTMLAnchorElement)return v`<li>
              <a
                class="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                href="${e.href}"
                target="${e.target||`_blank`}"
                >${e.textContent}</a
              >
            </li>`})}
      </ul>
    `}};wn=W([T(`other-tools`)],wn);const Tn=`color-interpolation-store`;let $=class extends w{static{this.styles=[R,ht]}constructor(){super(),this.color=new L({type:`rgb255`,r:71,g:85,b:105}),this.coordinates={x:0,y:0,width:1,height:1},this.interpolationLeft=new L({type:`rgb255`,r:255,g:0,b:0}),this.interpolationRight=new L({type:`rgb255`,r:255,g:255,b:255}),this.interpolationActive=`none`,this.paletteActiveIndex=-1,this.updateBodyBackground=!1,this.loadLastColor(),this.loadInterpolationState(),this.addEventListener(z.eventName,e=>{e instanceof z&&this.setColor(e.color)}),this.addEventListener(gt.eventName,e=>{e instanceof gt&&this.setCoordinates(e.coordinates)}),this.addEventListener(ft.eventName,e=>{e instanceof ft&&this.setInterpolationActive(e.active)}),this.addEventListener(vn.eventName,e=>{e instanceof vn&&(this.paletteActiveIndex=e.index)})}loadLastColor(){let e=V(`last-active-color`,null);e&&(this.color=new L({type:`hex`,hex:e}))}loadInterpolationState(){let e=V(Tn,null);e&&(e.left&&(this.interpolationLeft=new L({type:`hex`,hex:e.left})),e.right&&(this.interpolationRight=new L({type:`hex`,hex:e.right})),e.active&&(this.interpolationActive=e.active))}saveInterpolationState(){H(Tn,{left:this.interpolationLeft.getHex(),right:this.interpolationRight.getHex(),active:this.interpolationActive})}setColor(e){this.color=e,this.syncInterpolationEndpoint(e)}syncInterpolationEndpoint(e){this.interpolationActive===`left`?(this.interpolationLeft=e,this.saveInterpolationState()):this.interpolationActive===`right`&&(this.interpolationRight=e,this.saveInterpolationState())}setCoordinates(e){this.coordinates=e}setInterpolationActive(e){this.interpolationActive=e,this.saveInterpolationState()}updateChildren(){Y(this,q,e=>{e.color=this.color}),Y(this,X,e=>{e.color=this.color,e.coordinates=this.coordinates}),Y(this,Z,e=>{e.coordinates=this.coordinates}),Y(this,G,e=>{e.leftColor=this.interpolationLeft,e.rightColor=this.interpolationRight,e.activeColor=this.interpolationActive}),Y(this,an,e=>{e.color=this.color}),Y(this,Q,e=>{e.activeEditingColor=this.color})}updated(e){this.updateBodyBackground&&e.has(`color`)&&(document.body.style.background=`#`+this.color.getHex()),this.updateChildren()}render(){return v`<slot class="main-container"></slot>`}};W([D()],$.prototype,`color`,void 0),W([D()],$.prototype,`coordinates`,void 0),W([D()],$.prototype,`interpolationLeft`,void 0),W([D()],$.prototype,`interpolationRight`,void 0),W([D()],$.prototype,`interpolationActive`,void 0),W([D()],$.prototype,`paletteActiveIndex`,void 0),W([E({type:Boolean})],$.prototype,`updateBodyBackground`,void 0),$=W([T(`color-picker`)],$);function En(e={}){let t=globalThis,n=e.container??(t.navigator&&t.navigator.serviceWorker?t.navigator.serviceWorker:void 0);if(!n)return null;let r=e.reload??(()=>{t.location&&t.location.reload()}),i=e.banner??Dn(),a=e.swUrl??`./sw.js`,o=!1,s=!1,c=null,l=null;n.addEventListener(`controllerchange`,()=>{o&&!s&&(s=!0,r())});let u=()=>{o=!0,c=null,l=null;let e=ee;e&&e.postMessage({type:`SKIP_WAITING`})},d=()=>{o=!1},ee=null;return n.register(a).then(e=>{e.update().catch(()=>void 0),e.addEventListener(`updatefound`,()=>{let t=e.installing;t&&(ee=t,t.addEventListener(`statechange`,()=>{t.state===`installed`&&n.controller!==null&&(c=u,l=d,i.show(u,d))}))})}).catch(()=>{}),{hasPendingUpdate:()=>c!==null,showPendingUpdate:()=>{c&&l&&i.show(c,l)},applyPendingUpdate:()=>{c&&c()}}}function Dn(){return{show(e,t){let n=globalThis.document;if(!n||!n.body){e();return}let r=n.createElement(`div`);r.setAttribute(`role`,`status`),r.style.cssText=[`position:fixed`,`left:50%`,`bottom:16px`,`transform:translateX(-50%)`,`display:flex`,`gap:8px`,`align-items:center`,`padding:10px 14px`,`border-radius:8px`,`background:#1f2937`,`color:#ffffff`,`font:13px/1.4 sans-serif`,`z-index:2147483647`,`box-shadow:0 2px 8px rgba(0,0,0,0.35)`].join(`;`);let i=n.createElement(`span`);i.textContent=`A new version is ready.`;let a=n.createElement(`button`);a.textContent=`Refresh`,On(a),a.addEventListener(`click`,()=>{r.remove(),o.remove(),e()});let o=n.createElement(`button`);o.setAttribute(`role`,`status`),o.textContent=`⬆ Update ready`,On(o),o.style.cssText+=`;position:fixed;right:16px;bottom:16px;z-index:2147483647`,o.addEventListener(`click`,()=>{o.remove(),n.body.appendChild(r)});let s=n.createElement(`button`);s.textContent=`Later`,On(s),s.addEventListener(`click`,()=>{r.remove(),n.body.appendChild(o),t()}),r.append(i,a,s),n.body.appendChild(r)}}}function On(e){e.style.cssText=[`border:none`,`border-radius:6px`,`padding:5px 10px`,`cursor:pointer`,`font:inherit`,`background:#475569`,`color:#ffffff`].join(`;`)}En();
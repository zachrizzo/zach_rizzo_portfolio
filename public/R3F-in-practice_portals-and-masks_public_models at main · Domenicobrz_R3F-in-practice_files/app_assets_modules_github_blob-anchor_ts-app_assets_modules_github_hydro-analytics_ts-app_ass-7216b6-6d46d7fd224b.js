"use strict";(globalThis.webpackChunk=globalThis.webpackChunk||[]).push([["app_assets_modules_github_blob-anchor_ts-app_assets_modules_github_hydro-analytics_ts-app_ass-7216b6"],{56334(a,b,c){function d(a){let b=a.match(/#?(?:L)(\d+)((?:C)(\d+))?/g);if(b){if(1===b.length){let c=g(b[0]);if(!c)return;return Object.freeze({start:c,end:c})}if(2!==b.length)return;{let d=g(b[0]),e=g(b[1]);if(!d||!e)return;return k(Object.freeze({start:d,end:e}))}}}function e(a){let b=d(a),c=function(a){let b=a.match(/(file-.+?-)L\d+?/i);return b?b[1]:""}(a);return{blobRange:b,anchorPrefix:c}}function f({anchorPrefix:a,blobRange:b}){return b?`#${a}${function(a){let{start:b,end:c}=k(a);return null!=b.column&&null!=c.column?`L${b.line}C${b.column}-L${c.line}C${c.column}`:null!=b.column?`L${b.line}C${b.column}-L${c.line}`:null!=c.column?`L${b.line}-L${c.line}C${c.column}`:b.line===c.line?`L${b.line}`:`L${b.line}-L${c.line}`}(b)}`:"#"}function g(a){let b=a.match(/L(\d+)/),c=a.match(/C(\d+)/);return b?Object.freeze({line:parseInt(b[1]),column:c?parseInt(c[1]):null}):null}function h(a,b){let[c,d]=i(a.start,!0,b),[e,f]=i(a.end,!1,b);if(!c||!e)return;let g=d,h=f;if(-1===g&&(g=0),-1===h&&(h=e.childNodes.length),!c.ownerDocument)throw Error("DOMRange needs to be inside document");let j=c.ownerDocument.createRange();return j.setStart(c,g),j.setEnd(e,h),j}function i(a,b,c){let d=[null,0],e=c(a.line);if(!e)return d;if(null==a.column)return[e,-1];let f=a.column-1,g=j(e);for(let h=0;h<g.length;h++){let i=g[h],k=f-(i.textContent||"").length;if(0===k){let l=g[h+1];if(b&&l)return[l,0];return[i,f]}if(k<0)return[i,f];f=k}return d}function j(a){if(a.nodeType===Node.TEXT_NODE)return[a];if(!a.childNodes||!a.childNodes.length)return[];let b=[];for(let c of a.childNodes)b=b.concat(j(c));return b}function k(a){let b=[a.start,a.end];return(b.sort(l),b[0]===a.start&&b[1]===a.end)?a:Object.freeze({start:b[0],end:b[1]})}function l(a,b){return a.line===b.line&&a.column===b.column?0:a.line===b.line&&"number"==typeof a.column&&"number"==typeof b.column?a.column-b.column:a.line-b.line}c.d(b,{Dw:()=>f,G5:()=>d,M9:()=>h,n6:()=>e})},78459(a,b,c){c.d(b,{Y:()=>o,q:()=>p});var d=c(88149),e=c(86058),f=c(86702),g=c(34855);let{getItem:h}=(0,f.Z)("localStorage"),i="dimension_",j,k=["utm_source","utm_medium","utm_campaign","utm_term","utm_content","scid"];try{let l=(0,d.n)("octolytics");delete l.baseContext,j=new e.R(l)}catch(m){}function n(a){let b=(0,d.n)("octolytics").baseContext||{};if(b)for(let c in delete b.app_id,delete b.event_url,delete b.host,b)c.startsWith(i)&&(b[c.replace(i,"")]=b[c],delete b[c]);let e=document.querySelector("meta[name=visitor-payload]");if(e){let f=JSON.parse(atob(e.content));Object.assign(b,f)}let h=new URLSearchParams(window.location.search);for(let[j,l]of h)k.includes(j.toLowerCase())&&(b[j]=l);return b.staff=`${(0,g.B)()}`,Object.assign(b,a)}function o(a){j?.sendPageView(n(a))}function p(a,b={}){let c=document.head?.querySelector('meta[name="current-catalog-service"]')?.content,d=c?{service:c}:{};for(let[e,f]of Object.entries(b))null!=f&&(d[e]=`${f}`);j&&(q(a||"unknown",n(d)),j.sendEvent(a||"unknown",n(d)))}function q(a,b){}},29764(a,b,c){c.d(b,{"$S":()=>e,Fk:()=>f,sz:()=>g});var d=c(34855);function e(a,b,c){let e={hydroEventPayload:a,hydroEventHmac:b,visitorPayload:"",visitorHmac:"",hydroClientContext:c},f=document.querySelector("meta[name=visitor-payload]");f instanceof HTMLMetaElement&&(e.visitorPayload=f.content);let g=document.querySelector("meta[name=visitor-hmac]")||"";g instanceof HTMLMetaElement&&(e.visitorHmac=g.content),(0,d.b)(e,!0)}function f(a){let b=a.getAttribute("data-hydro-view")||"",c=a.getAttribute("data-hydro-view-hmac")||"",d=a.getAttribute("data-hydro-client-context")||"";e(b,c,d)}function g(a){let b=a.getAttribute("data-hydro-click-payload")||"",c=a.getAttribute("data-hydro-click-hmac")||"",d=a.getAttribute("data-hydro-client-context")||"";e(b,c,d)}},11445(a,b,c){c.d(b,{v:()=>d});function d(a,b){b.appendChild(a.extractContents()),a.insertNode(b)}},86702(a,b,c){c.d(b,{Z:()=>g,"_":()=>h});var d=c(16462),e=c(34855);let f=class NoOpStorage{getItem(){return null}setItem(){}removeItem(){}clear(){}key(){return null}get length(){return 0}};function g(a,b={throwQuotaErrorsOnSet:!1},c=d.iG,g=a=>a,h=a=>a){let i;try{if(!c)throw Error();i=c[a]||new f}catch{i=new f}let{throwQuotaErrorsOnSet:j}=b;function k(a){b.sendCacheStats&&(0,e.b)({incrementKey:a})}function l(a){try{if(i.removeItem(a),b.ttl){let c=`${a}:expiry`;i.removeItem(c)}}catch(d){}}return{getItem:function(a,b=new Date().getTime()){try{let c=i.getItem(a);if(!c)return null;let d=`${a}:expiry`,e=Number(i.getItem(d));if(e&&b>e)return l(a),l(d),k("SAFE_STORAGE_VALUE_EXPIRED"),null;return k("SAFE_STORAGE_VALUE_WITHIN_TTL"),g(c)}catch(f){return null}},setItem:function(a,c,d=new Date().getTime()){try{if(i.setItem(a,h(c)),b.ttl){let e=`${a}:expiry`,f=d+b.ttl;i.setItem(e,f.toString())}}catch(g){if(j&&g.message.toLowerCase().includes("quota"))throw g}},removeItem:l,clear:i.clear,key:i.key,get length(){return i.length}}}function h(a){return g(a,{throwQuotaErrorsOnSet:!1},window,JSON.parse,JSON.stringify)}},25811(a,b,c){c.d(b,{LS:()=>f,cl:()=>g,rV:()=>e});var d=c(86702);let{getItem:e,setItem:f,removeItem:g}=(0,d.Z)("sessionStorage")},55065(a,b,c){c.d(b,{"$g":()=>SoftNavSuccessEvent,OV:()=>SoftNavStartEvent,QW:()=>SoftNavErrorEvent,Xr:()=>SoftNavEndEvent});var d=c(31167);let e=class SoftNavEvent extends Event{constructor(a,b){super(b),this.mechanism=a}};class SoftNavStartEvent extends e{constructor(a){super(a,d.QE.START)}}class SoftNavSuccessEvent extends e{constructor(a,b){super(a,d.QE.SUCCESS),this.visitCount=b}}class SoftNavErrorEvent extends e{constructor(a,b){super(a,d.QE.ERROR),this.error=b}}class SoftNavEndEvent extends e{constructor(a){super(a,d.QE.END)}}},31167(a,b,c){c.d(b,{BT:()=>l,FP:()=>n,LD:()=>k,QE:()=>g,TL:()=>o,Yl:()=>j,jN:()=>h,r_:()=>m,u5:()=>p});var d=c(55065),e=c(29573),f=c(58843);let g=Object.freeze({INITIAL:"soft-nav:initial",START:"soft-nav:start",SUCCESS:"soft-nav:success",ERROR:"soft-nav:error",FRAME_UPDATE:"soft-nav:frame-update",END:"soft-nav:end",RENDER:"soft-nav:render",PROGRESS_BAR:{START:"soft-nav:progress-bar:start",END:"soft-nav:progress-bar:end"}}),h="reload",i=0;function j(){i=0,document.dispatchEvent(new Event(g.INITIAL)),(0,f.XL)()}function k(a){(0,f.sj)()||(q(),document.dispatchEvent(new d.OV(a)),(0,f.U6)(a),(0,f.J$)(),(0,f.Nt)(),(0,e.hY)())}function l(a={}){s(a)&&(i+=1,document.dispatchEvent(new d.$g((0,f.Gj)(),i)),n(a))}function m(a={}){if(!s(a))return;i=0;let b=(0,f.Wl)()||h;document.dispatchEvent(new d.QW((0,f.Gj)(),b)),r(),(0,e.t3)(b),(0,f.XL)()}function n(a={}){s(a)&&(r(),document.dispatchEvent(new d.Xr((0,f.Gj)())),(0,f.pS)())}function o(a={}){s(a)&&((0,e.mr)(),document.dispatchEvent(new Event(g.RENDER)))}function p(){document.dispatchEvent(new Event(g.FRAME_UPDATE))}function q(){document.dispatchEvent(new Event(g.PROGRESS_BAR.START))}function r(){document.dispatchEvent(new Event(g.PROGRESS_BAR.END))}function s({skipIfGoingToReactApp:a,allowedMechanisms:b=[]}={}){return(0,f.sj)()&&(0===b.length||b.includes((0,f.Gj)()))&&(!a||!(0,f.Nb)())}},29573(a,b,c){c.d(b,{CF:()=>g,hY:()=>h,mr:()=>j,t3:()=>i});var d=c(34855),e=c(58843);let f="stats:soft-nav-duration",g={turbo:"TURBO",react:"REACT","turbo.frame":"FRAME",ui:"UI",hard:"HARD"};function h(){performance.mark(f)}function i(a){(0,d.b)({turboFailureReason:a,turboStartUrl:(0,e.wP)(),turboEndUrl:window.location.href})}function j(){let a=function(){if(0===performance.getEntriesByName(f).length)return null;performance.measure(f,f);let a=performance.getEntriesByName(f),b=a.pop();return b?b.duration:null}();if(!a)return;let b=g[(0,e.Gj)()],c=Math.round(a);b===g.react&&document.dispatchEvent(new CustomEvent("staffbar-update",{detail:{duration:c}})),(0,d.b)({requestUrl:window.location.href,softNavigationTiming:{mechanism:b,destination:(0,e.Nb)()||"rails",duration:c,initiator:(0,e.CI)()||"rails"}})}},58843(a,b,c){c.d(b,{Ak:()=>r,CI:()=>v,Gj:()=>o,"J$":()=>u,Nb:()=>w,Nt:()=>s,OE:()=>p,U6:()=>l,Wl:()=>q,XL:()=>k,pS:()=>m,sj:()=>n,wP:()=>t});var d=c(25811),e=c(31167);let f="soft-nav:fail",g="soft-nav:fail-referrer",h="soft-nav:referrer",i="soft-nav:marker",j="soft-nav:react-app-name";function k(){(0,d.LS)(i,"0"),(0,d.cl)(h),(0,d.cl)(f),(0,d.cl)(g),(0,d.cl)(j)}function l(a){(0,d.LS)(i,a)}function m(){(0,d.LS)(i,"0")}function n(){let a=(0,d.rV)(i);return a&&"0"!==a}function o(){return(0,d.rV)(i)}function p(){return Boolean(q())}function q(){return(0,d.rV)(f)}function r(a){(0,d.LS)(f,a||e.jN),(0,d.LS)(g,window.location.href)}function s(){(0,d.LS)(h,window.location.href)}function t(){return(0,d.rV)(h)||document.referrer}function u(){let a=w();a?(0,d.LS)(j,a):(0,d.cl)(j)}function v(){return(0,d.rV)(j)}function w(){return document.querySelector('meta[name="ui"]')?"ui":document.querySelector("react-app")?.getAttribute("app-name")}},34855(a,b,c){c.d(b,{B:()=>l,b:()=>g});var d=c(16462),e=c(80721);let f=[];function g(a,b=!1){void 0===a.timestamp&&(a.timestamp=new Date().getTime()),a.loggedIn=k(),a.staff=l(),f.push(a),b?j():i()}let h=null;async function i(){await e.C,null==h&&(h=window.requestIdleCallback(j))}function j(){if(h=null,!f.length)return;let a=d.n4?.head?.querySelector('meta[name="browser-stats-url"]')?.content;if(!a)return;let b=JSON.stringify({stats:f});try{navigator.sendBeacon&&navigator.sendBeacon(a,b)}catch{}f=[]}function k(){return!!d.n4?.head?.querySelector('meta[name="user-login"]')?.content}function l(){return!!d.n4?.head?.querySelector('meta[name="user-staff"]')?.content}d.n4?.addEventListener("pagehide",j),d.n4?.addEventListener("visibilitychange",j)},97629(a,b,c){c.d(b,{Z:()=>d});function d(a){var b;return!((b=a).offsetWidth<=0)||!(b.offsetHeight<=0)}}}])
//# sourceMappingURL=app_assets_modules_github_blob-anchor_ts-app_assets_modules_github_hydro-analytics_ts-app_ass-7216b6-422ad11cbc7e.js.map
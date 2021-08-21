(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61a51d24"],{"07ac":function(t,e,n){var s=n("23e7"),r=n("6f53").values;s({target:"Object",stat:!0},{values:function(t){return r(t)}})},"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"14c3":function(t,e,n){var s=n("c6b6"),r=n("9263");t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var i=n.call(t,e);if("object"!==typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==s(t))throw TypeError("RegExp#exec called on incompatible receiver");return r.call(t,e)}},"2d3b":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{"text-align":"left"}},[n("div",{staticClass:"cloumns is-multiline"},[n("div",{staticClass:"column is-full"},[n("label",[n("b",[t._v("Search (Chemical name or UN Number)")]),n("div",{staticClass:"field has-addons"},[n("div",{staticClass:"control is-expanded"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.search_input,expression:"search_input"}],ref:"searchField",staticClass:"input",staticStyle:{width:"100%"},attrs:{autofocus:"autofocus",type:"text",placeholder:"E.g. Acetone or 1090",required:""},domProps:{value:t.search_input},on:{input:function(e){e.target.composing||(t.search_input=e.target.value)}}})]),n("div",{staticClass:"control"},[n("button",{staticClass:"button",on:{click:t.clearSearchInput}},[t._v("clear")])])])])]),0!==t.results.length?n("Share",{staticClass:"card mb-5 mt-2 px-4",attrs:{options:{title:"Share Search Results",text:"Share Search Results for '"+t.search_input+"'",url:t.baseURL+"/search?query="+t.search_input}}}):t._e(),t._l(t.results,(function(e){return n("div",{key:e.item.name,staticClass:"column"},[n("div",{staticClass:"card px-4"},[n("router-link",{staticClass:"card-content content",attrs:{to:{name:"chemical",params:{id:e.item.id}}}},[n("h1",[t._v(t._s(e.item.name))]),n("p",{staticClass:"subtitle mb-1"},[t._v(" Formula: "),n("b",[t._v(t._s(e.item.formula||"NA"))])]),n("p",{staticClass:"subtitle"},[t._v(" UN Number: "),n("b",[t._v(t._s(e.item.un||"NA"))])])]),n("footer",{staticClass:"card-footer",on:{click:function(n){return t.shareViaWebShare(e.item.id,e.item.name)}}},[n("span",{staticClass:"card-footer-item",staticStyle:{cursor:"pointer",color:"pink"}},[t._v(" Share ")])])],1)])})),0===t.results.length&&""!==t.search_input?n("div",{staticClass:"center"},[t._v(" Nothing matched your input ")]):t._e()],2)])},r=[],i=(n("07ac"),n("841c"),n("ac1f"),n("99af"),n("bf5f"));function c(t){return Array.isArray?Array.isArray(t):"[object Array]"===m(t)}const o=1/0;function a(t){if("string"==typeof t)return t;let e=t+"";return"0"==e&&1/t==-o?"-0":e}function h(t){return null==t?"":a(t)}function l(t){return"string"===typeof t}function u(t){return"number"===typeof t}function d(t){return!0===t||!1===t||p(t)&&"[object Boolean]"==m(t)}function f(t){return"object"===typeof t}function p(t){return f(t)&&null!==t}function g(t){return void 0!==t&&null!==t}function x(t){return!t.trim().length}function m(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}const v="Incorrect 'index' type",y=t=>"Invalid value for key "+t,M=t=>`Pattern length exceeds max of ${t}.`,_=t=>`Missing ${t} property in key`,b=t=>`Property 'weight' in key '${t}' must be a positive integer`,S=Object.prototype.hasOwnProperty;class E{constructor(t){this._keys=[],this._keyMap={};let e=0;t.forEach(t=>{let n=w(t);e+=n.weight,this._keys.push(n),this._keyMap[n.id]=n,e+=n.weight}),this._keys.forEach(t=>{t.weight/=e})}get(t){return this._keyMap[t]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function w(t){let e=null,n=null,s=null,r=1;if(l(t)||c(t))s=t,e=L(t),n=C(t);else{if(!S.call(t,"name"))throw new Error(_("name"));const i=t.name;if(s=i,S.call(t,"weight")&&(r=t.weight,r<=0))throw new Error(b(i));e=L(i),n=C(i)}return{path:e,id:n,weight:r,src:s}}function L(t){return c(t)?t:t.split(".")}function C(t){return c(t)?t.join("."):t}function k(t,e){let n=[],s=!1;const r=(t,e,i)=>{if(g(t))if(e[i]){let o=e[i];const a=t[o];if(!g(a))return;if(i===e.length-1&&(l(a)||u(a)||d(a)))n.push(h(a));else if(c(a)){s=!0;for(let t=0,n=a.length;t<n;t+=1)r(a[t],e,i+1)}else e.length&&r(a,e,i+1)}else n.push(t)};return r(t,l(e)?e.split("."):e,0),s?n:n[0]}const I={includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},R={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(t,e)=>t.score===e.score?t.idx<e.idx?-1:1:t.score<e.score?-1:1},A={location:0,threshold:.6,distance:100},$={useExtendedSearch:!1,getFn:k,ignoreLocation:!1,ignoreFieldNorm:!1};var N={...R,...I,...A,...$};const O=/[^ ]+/g;function F(t=3){const e=new Map,n=Math.pow(10,t);return{get(t){const s=t.match(O).length;if(e.has(s))return e.get(s);const r=1/Math.sqrt(s),i=parseFloat(Math.round(r*n)/n);return e.set(s,i),i},clear(){e.clear()}}}class j{constructor({getFn:t=N.getFn}={}){this.norm=F(3),this.getFn=t,this.isCreated=!1,this.setIndexRecords()}setSources(t=[]){this.docs=t}setIndexRecords(t=[]){this.records=t}setKeys(t=[]){this.keys=t,this._keysMap={},t.forEach((t,e)=>{this._keysMap[t.id]=e})}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,l(this.docs[0])?this.docs.forEach((t,e)=>{this._addString(t,e)}):this.docs.forEach((t,e)=>{this._addObject(t,e)}),this.norm.clear())}add(t){const e=this.size();l(t)?this._addString(t,e):this._addObject(t,e)}removeAt(t){this.records.splice(t,1);for(let e=t,n=this.size();e<n;e+=1)this.records[e].i-=1}getValueForItemAtKeyId(t,e){return t[this._keysMap[e]]}size(){return this.records.length}_addString(t,e){if(!g(t)||x(t))return;let n={v:t,i:e,n:this.norm.get(t)};this.records.push(n)}_addObject(t,e){let n={i:e,$:{}};this.keys.forEach((e,s)=>{let r=this.getFn(t,e.path);if(g(r))if(c(r)){let t=[];const e=[{nestedArrIndex:-1,value:r}];while(e.length){const{nestedArrIndex:n,value:s}=e.pop();if(g(s))if(l(s)&&!x(s)){let e={v:s,i:n,n:this.norm.get(s)};t.push(e)}else c(s)&&s.forEach((t,n)=>{e.push({nestedArrIndex:n,value:t})})}n.$[s]=t}else if(!x(r)){let t={v:r,n:this.norm.get(r)};n.$[s]=t}}),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}}function P(t,e,{getFn:n=N.getFn}={}){const s=new j({getFn:n});return s.setKeys(t.map(w)),s.setSources(e),s.create(),s}function T(t,{getFn:e=N.getFn}={}){const{keys:n,records:s}=t,r=new j({getFn:e});return r.setKeys(n),r.setIndexRecords(s),r}function U(t,{errors:e=0,currentLocation:n=0,expectedLocation:s=0,distance:r=N.distance,ignoreLocation:i=N.ignoreLocation}={}){const c=e/t.length;if(i)return c;const o=Math.abs(s-n);return r?c+o/r:o?1:c}function q(t=[],e=N.minMatchCharLength){let n=[],s=-1,r=-1,i=0;for(let c=t.length;i<c;i+=1){let c=t[i];c&&-1===s?s=i:c||-1===s||(r=i-1,r-s+1>=e&&n.push([s,r]),s=-1)}return t[i-1]&&i-s>=e&&n.push([s,i-1]),n}const D=32;function K(t,e,n,{location:s=N.location,distance:r=N.distance,threshold:i=N.threshold,findAllMatches:c=N.findAllMatches,minMatchCharLength:o=N.minMatchCharLength,includeMatches:a=N.includeMatches,ignoreLocation:h=N.ignoreLocation}={}){if(e.length>D)throw new Error(M(D));const l=e.length,u=t.length,d=Math.max(0,Math.min(s,u));let f=i,p=d;const g=o>1||a,x=g?Array(u):[];let m;while((m=t.indexOf(e,p))>-1){let t=U(e,{currentLocation:m,expectedLocation:d,distance:r,ignoreLocation:h});if(f=Math.min(t,f),p=m+l,g){let t=0;while(t<l)x[m+t]=1,t+=1}}p=-1;let v=[],y=1,_=l+u;const b=1<<l-1;for(let M=0;M<l;M+=1){let s=0,i=_;while(s<i){const t=U(e,{errors:M,currentLocation:d+i,expectedLocation:d,distance:r,ignoreLocation:h});t<=f?s=i:_=i,i=Math.floor((_-s)/2+s)}_=i;let o=Math.max(1,d-i+1),a=c?u:Math.min(d+i,u)+l,m=Array(a+2);m[a+1]=(1<<M)-1;for(let c=a;c>=o;c-=1){let s=c-1,i=n[t.charAt(s)];if(g&&(x[s]=+!!i),m[c]=(m[c+1]<<1|1)&i,M&&(m[c]|=(v[c+1]|v[c])<<1|1|v[c+1]),m[c]&b&&(y=U(e,{errors:M,currentLocation:s,expectedLocation:d,distance:r,ignoreLocation:h}),y<=f)){if(f=y,p=s,p<=d)break;o=Math.max(1,2*d-p)}}const S=U(e,{errors:M+1,currentLocation:d,expectedLocation:d,distance:r,ignoreLocation:h});if(S>f)break;v=m}const S={isMatch:p>=0,score:Math.max(.001,y)};if(g){const t=q(x,o);t.length?a&&(S.indices=t):S.isMatch=!1}return S}function W(t){let e={};for(let n=0,s=t.length;n<s;n+=1){const r=t.charAt(n);e[r]=(e[r]||0)|1<<s-n-1}return e}class z{constructor(t,{location:e=N.location,threshold:n=N.threshold,distance:s=N.distance,includeMatches:r=N.includeMatches,findAllMatches:i=N.findAllMatches,minMatchCharLength:c=N.minMatchCharLength,isCaseSensitive:o=N.isCaseSensitive,ignoreLocation:a=N.ignoreLocation}={}){if(this.options={location:e,threshold:n,distance:s,includeMatches:r,findAllMatches:i,minMatchCharLength:c,isCaseSensitive:o,ignoreLocation:a},this.pattern=o?t:t.toLowerCase(),this.chunks=[],!this.pattern.length)return;const h=(t,e)=>{this.chunks.push({pattern:t,alphabet:W(t),startIndex:e})},l=this.pattern.length;if(l>D){let t=0;const e=l%D,n=l-e;while(t<n)h(this.pattern.substr(t,D),t),t+=D;if(e){const t=l-D;h(this.pattern.substr(t),t)}}else h(this.pattern,0)}searchIn(t){const{isCaseSensitive:e,includeMatches:n}=this.options;if(e||(t=t.toLowerCase()),this.pattern===t){let e={isMatch:!0,score:0};return n&&(e.indices=[[0,t.length-1]]),e}const{location:s,distance:r,threshold:i,findAllMatches:c,minMatchCharLength:o,ignoreLocation:a}=this.options;let h=[],l=0,u=!1;this.chunks.forEach(({pattern:e,alphabet:d,startIndex:f})=>{const{isMatch:p,score:g,indices:x}=K(t,e,d,{location:s+f,distance:r,threshold:i,findAllMatches:c,minMatchCharLength:o,includeMatches:n,ignoreLocation:a});p&&(u=!0),l+=g,p&&x&&(h=[...h,...x])});let d={isMatch:u,score:u?l/this.chunks.length:1};return u&&n&&(d.indices=h),d}}class J{constructor(t){this.pattern=t}static isMultiMatch(t){return B(t,this.multiRegex)}static isSingleMatch(t){return B(t,this.singleRegex)}search(){}}function B(t,e){const n=t.match(e);return n?n[1]:null}class V extends J{constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(t){const e=t===this.pattern;return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}}class H extends J{constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const e=t.indexOf(this.pattern),n=-1===e;return{isMatch:n,score:n?0:1,indices:[0,t.length-1]}}}class Y extends J{constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const e=t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}}class G extends J{constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const e=!t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}}class Q extends J{constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const e=t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[t.length-this.pattern.length,t.length-1]}}}class X extends J{constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const e=!t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}}class Z extends J{constructor(t,{location:e=N.location,threshold:n=N.threshold,distance:s=N.distance,includeMatches:r=N.includeMatches,findAllMatches:i=N.findAllMatches,minMatchCharLength:c=N.minMatchCharLength,isCaseSensitive:o=N.isCaseSensitive,ignoreLocation:a=N.ignoreLocation}={}){super(t),this._bitapSearch=new z(t,{location:e,threshold:n,distance:s,includeMatches:r,findAllMatches:i,minMatchCharLength:c,isCaseSensitive:o,ignoreLocation:a})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchIn(t)}}class tt extends J{constructor(t){super(t)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let e,n=0;const s=[],r=this.pattern.length;while((e=t.indexOf(this.pattern,n))>-1)n=e+r,s.push([e,n-1]);const i=!!s.length;return{isMatch:i,score:i?0:1,indices:s}}}const et=[V,tt,Y,G,X,Q,H,Z],nt=et.length,st=/ +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/,rt="|";function it(t,e={}){return t.split(rt).map(t=>{let n=t.trim().split(st).filter(t=>t&&!!t.trim()),s=[];for(let r=0,i=n.length;r<i;r+=1){const t=n[r];let i=!1,c=-1;while(!i&&++c<nt){const n=et[c];let r=n.isMultiMatch(t);r&&(s.push(new n(r,e)),i=!0)}if(!i){c=-1;while(++c<nt){const n=et[c];let r=n.isSingleMatch(t);if(r){s.push(new n(r,e));break}}}}return s})}const ct=new Set([Z.type,tt.type]);class ot{constructor(t,{isCaseSensitive:e=N.isCaseSensitive,includeMatches:n=N.includeMatches,minMatchCharLength:s=N.minMatchCharLength,ignoreLocation:r=N.ignoreLocation,findAllMatches:i=N.findAllMatches,location:c=N.location,threshold:o=N.threshold,distance:a=N.distance}={}){this.query=null,this.options={isCaseSensitive:e,includeMatches:n,minMatchCharLength:s,findAllMatches:i,ignoreLocation:r,location:c,threshold:o,distance:a},this.pattern=e?t:t.toLowerCase(),this.query=it(this.pattern,this.options)}static condition(t,e){return e.useExtendedSearch}searchIn(t){const e=this.query;if(!e)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:s}=this.options;t=s?t:t.toLowerCase();let r=0,i=[],c=0;for(let o=0,a=e.length;o<a;o+=1){const s=e[o];i.length=0,r=0;for(let e=0,o=s.length;e<o;e+=1){const o=s[e],{isMatch:a,indices:h,score:l}=o.search(t);if(!a){c=0,r=0,i.length=0;break}if(r+=1,c+=l,n){const t=o.constructor.type;ct.has(t)?i=[...i,...h]:i.push(h)}}if(r){let t={isMatch:!0,score:c/r};return n&&(t.indices=i),t}}return{isMatch:!1,score:1}}}const at=[];function ht(...t){at.push(...t)}function lt(t,e){for(let n=0,s=at.length;n<s;n+=1){let s=at[n];if(s.condition(t,e))return new s(t,e)}return new z(t,e)}const ut={AND:"$and",OR:"$or"},dt={PATH:"$path",PATTERN:"$val"},ft=t=>!(!t[ut.AND]&&!t[ut.OR]),pt=t=>!!t[dt.PATH],gt=t=>!c(t)&&f(t)&&!ft(t),xt=t=>({[ut.AND]:Object.keys(t).map(e=>({[e]:t[e]}))});function mt(t,e,{auto:n=!0}={}){const s=t=>{let r=Object.keys(t);const i=pt(t);if(!i&&r.length>1&&!ft(t))return s(xt(t));if(gt(t)){const s=i?t[dt.PATH]:r[0],c=i?t[dt.PATTERN]:t[s];if(!l(c))throw new Error(y(s));const o={keyId:C(s),pattern:c};return n&&(o.searcher=lt(c,e)),o}let o={children:[],operator:r[0]};return r.forEach(e=>{const n=t[e];c(n)&&n.forEach(t=>{o.children.push(s(t))})}),o};return ft(t)||(t=xt(t)),s(t)}function vt(t,{ignoreFieldNorm:e=N.ignoreFieldNorm}){t.forEach(t=>{let n=1;t.matches.forEach(({key:t,norm:s,score:r})=>{const i=t?t.weight:null;n*=Math.pow(0===r&&i?Number.EPSILON:r,(i||1)*(e?1:s))}),t.score=n})}function yt(t,e){const n=t.matches;e.matches=[],g(n)&&n.forEach(t=>{if(!g(t.indices)||!t.indices.length)return;const{indices:n,value:s}=t;let r={indices:n,value:s};t.key&&(r.key=t.key.src),t.idx>-1&&(r.refIndex=t.idx),e.matches.push(r)})}function Mt(t,e){e.score=t.score}function _t(t,e,{includeMatches:n=N.includeMatches,includeScore:s=N.includeScore}={}){const r=[];return n&&r.push(yt),s&&r.push(Mt),t.map(t=>{const{idx:n}=t,s={item:e[n],refIndex:n};return r.length&&r.forEach(e=>{e(t,s)}),s})}class bt{constructor(t,e={},n){this.options={...N,...e},this.options.useExtendedSearch,this._keyStore=new E(this.options.keys),this.setCollection(t,n)}setCollection(t,e){if(this._docs=t,e&&!(e instanceof j))throw new Error(v);this._myIndex=e||P(this.options.keys,this._docs,{getFn:this.options.getFn})}add(t){g(t)&&(this._docs.push(t),this._myIndex.add(t))}remove(t=(()=>!1)){const e=[];for(let n=0,s=this._docs.length;n<s;n+=1){const r=this._docs[n];t(r,n)&&(this.removeAt(n),n-=1,s-=1,e.push(r))}return e}removeAt(t){this._docs.splice(t,1),this._myIndex.removeAt(t)}getIndex(){return this._myIndex}search(t,{limit:e=-1}={}){const{includeMatches:n,includeScore:s,shouldSort:r,sortFn:i,ignoreFieldNorm:c}=this.options;let o=l(t)?l(this._docs[0])?this._searchStringList(t):this._searchObjectList(t):this._searchLogical(t);return vt(o,{ignoreFieldNorm:c}),r&&o.sort(i),u(e)&&e>-1&&(o=o.slice(0,e)),_t(o,this._docs,{includeMatches:n,includeScore:s})}_searchStringList(t){const e=lt(t,this.options),{records:n}=this._myIndex,s=[];return n.forEach(({v:t,i:n,n:r})=>{if(!g(t))return;const{isMatch:i,score:c,indices:o}=e.searchIn(t);i&&s.push({item:t,idx:n,matches:[{score:c,value:t,norm:r,indices:o}]})}),s}_searchLogical(t){const e=mt(t,this.options),n=(t,e,s)=>{if(!t.children){const{keyId:n,searcher:r}=t,i=this._findMatches({key:this._keyStore.get(n),value:this._myIndex.getValueForItemAtKeyId(e,n),searcher:r});return i&&i.length?[{idx:s,item:e,matches:i}]:[]}switch(t.operator){case ut.AND:{const r=[];for(let i=0,c=t.children.length;i<c;i+=1){const c=t.children[i],o=n(c,e,s);if(!o.length)return[];r.push(...o)}return r}case ut.OR:{const r=[];for(let i=0,c=t.children.length;i<c;i+=1){const c=t.children[i],o=n(c,e,s);if(o.length){r.push(...o);break}}return r}}},s=this._myIndex.records,r={},i=[];return s.forEach(({$:t,i:s})=>{if(g(t)){let c=n(e,t,s);c.length&&(r[s]||(r[s]={idx:s,item:t,matches:[]},i.push(r[s])),c.forEach(({matches:t})=>{r[s].matches.push(...t)}))}}),i}_searchObjectList(t){const e=lt(t,this.options),{keys:n,records:s}=this._myIndex,r=[];return s.forEach(({$:t,i:s})=>{if(!g(t))return;let i=[];n.forEach((n,s)=>{i.push(...this._findMatches({key:n,value:t[s],searcher:e}))}),i.length&&r.push({idx:s,item:t,matches:i})}),r}_findMatches({key:t,value:e,searcher:n}){if(!g(e))return[];let s=[];if(c(e))e.forEach(({v:e,i:r,n:i})=>{if(!g(e))return;const{isMatch:c,score:o,indices:a}=n.searchIn(e);c&&s.push({score:o,key:t,value:e,idx:r,norm:i,indices:a})});else{const{v:r,n:i}=e,{isMatch:c,score:o,indices:a}=n.searchIn(r);c&&s.push({score:o,key:t,value:r,norm:i,indices:a})}return s}}bt.version="6.4.6",bt.createIndex=P,bt.parseIndex=T,bt.config=N,bt.parseQuery=mt,ht(ot);var St=bt,Et=n("17a4"),wt=n("db49"),Lt={name:"search",components:{Share:Et["a"]},props:["query"],data:function(){return{search_options:{keys:["name","un"]},search_input:this.query||"",baseURL:wt["a"]}},computed:{fuse:function(){return new St(Object.values(i),this.search_options)},results:function(){return this.fuse.search(this.search_input,{limit:20})}},methods:{clearSearchInput:function(){this.search_input="",this.$refs.searchField.focus()},shareViaWebShare:function(t,e){navigator.share({title:"Share this chemical",text:e,url:"".concat(this.baseURL,"/chemical/").concat(t)})}}},Ct=Lt,kt=n("2877"),It=Object(kt["a"])(Ct,s,r,!1,null,null,null);e["default"]=It.exports},"6f53":function(t,e,n){var s=n("83ab"),r=n("df75"),i=n("fc6a"),c=n("d1e7").f,o=function(t){return function(e){var n,o=i(e),a=r(o),h=a.length,l=0,u=[];while(h>l)n=a[l++],s&&!c.call(o,n)||u.push(t?[n,o[n]]:o[n]);return u}};t.exports={entries:o(!0),values:o(!1)}},"841c":function(t,e,n){"use strict";var s=n("d784"),r=n("825a"),i=n("1d80"),c=n("129f"),o=n("14c3");s("search",1,(function(t,e,n){return[function(e){var n=i(this),s=void 0==e?void 0:e[t];return void 0!==s?s.call(e,n):new RegExp(e)[t](String(n))},function(t){var s=n(e,t,this);if(s.done)return s.value;var i=r(t),a=String(this),h=i.lastIndex;c(h,0)||(i.lastIndex=0);var l=o(i,a);return c(i.lastIndex,h)||(i.lastIndex=h),null===l?-1:l.index}]}))},9263:function(t,e,n){"use strict";var s=n("ad6d"),r=n("9f7f"),i=RegExp.prototype.exec,c=String.prototype.replace,o=i,a=function(){var t=/a/,e=/b*/g;return i.call(t,"a"),i.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),h=r.UNSUPPORTED_Y||r.BROKEN_CARET,l=void 0!==/()??/.exec("")[1],u=a||l||h;u&&(o=function(t){var e,n,r,o,u=this,d=h&&u.sticky,f=s.call(u),p=u.source,g=0,x=t;return d&&(f=f.replace("y",""),-1===f.indexOf("g")&&(f+="g"),x=String(t).slice(u.lastIndex),u.lastIndex>0&&(!u.multiline||u.multiline&&"\n"!==t[u.lastIndex-1])&&(p="(?: "+p+")",x=" "+x,g++),n=new RegExp("^(?:"+p+")",f)),l&&(n=new RegExp("^"+p+"$(?!\\s)",f)),a&&(e=u.lastIndex),r=i.call(d?n:u,x),d?r?(r.input=r.input.slice(g),r[0]=r[0].slice(g),r.index=u.lastIndex,u.lastIndex+=r[0].length):u.lastIndex=0:a&&r&&(u.lastIndex=u.global?r.index+r[0].length:e),l&&r&&r.length>1&&c.call(r[0],n,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(r[o]=void 0)})),r}),t.exports=o},"99af":function(t,e,n){"use strict";var s=n("23e7"),r=n("d039"),i=n("e8b5"),c=n("861d"),o=n("7b0b"),a=n("50c4"),h=n("8418"),l=n("65f0"),u=n("1dde"),d=n("b622"),f=n("2d00"),p=d("isConcatSpreadable"),g=9007199254740991,x="Maximum allowed index exceeded",m=f>=51||!r((function(){var t=[];return t[p]=!1,t.concat()[0]!==t})),v=u("concat"),y=function(t){if(!c(t))return!1;var e=t[p];return void 0!==e?!!e:i(t)},M=!m||!v;s({target:"Array",proto:!0,forced:M},{concat:function(t){var e,n,s,r,i,c=o(this),u=l(c,0),d=0;for(e=-1,s=arguments.length;e<s;e++)if(i=-1===e?c:arguments[e],y(i)){if(r=a(i.length),d+r>g)throw TypeError(x);for(n=0;n<r;n++,d++)n in i&&h(u,d,i[n])}else{if(d>=g)throw TypeError(x);h(u,d++,i)}return u.length=d,u}})},"9f7f":function(t,e,n){"use strict";var s=n("d039");function r(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=s((function(){var t=r("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=s((function(){var t=r("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},ac1f:function(t,e,n){"use strict";var s=n("23e7"),r=n("9263");s({target:"RegExp",proto:!0,forced:/./.exec!==r},{exec:r})},ad6d:function(t,e,n){"use strict";var s=n("825a");t.exports=function(){var t=s(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},d784:function(t,e,n){"use strict";n("ac1f");var s=n("6eeb"),r=n("d039"),i=n("b622"),c=n("9263"),o=n("9112"),a=i("species"),h=!r((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),l=function(){return"$0"==="a".replace(/./,"$0")}(),u=i("replace"),d=function(){return!!/./[u]&&""===/./[u]("a","$0")}(),f=!r((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));t.exports=function(t,e,n,u){var p=i(t),g=!r((function(){var e={};return e[p]=function(){return 7},7!=""[t](e)})),x=g&&!r((function(){var e=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[a]=function(){return n},n.flags="",n[p]=/./[p]),n.exec=function(){return e=!0,null},n[p](""),!e}));if(!g||!x||"replace"===t&&(!h||!l||d)||"split"===t&&!f){var m=/./[p],v=n(p,""[t],(function(t,e,n,s,r){return e.exec===c?g&&!r?{done:!0,value:m.call(e,n,s)}:{done:!0,value:t.call(n,e,s)}:{done:!1}}),{REPLACE_KEEPS_$0:l,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:d}),y=v[0],M=v[1];s(String.prototype,t,y),s(RegExp.prototype,p,2==e?function(t,e){return M.call(t,this,e)}:function(t){return M.call(t,this)})}u&&o(RegExp.prototype[p],"sham",!0)}}}]);
//# sourceMappingURL=chunk-61a51d24.13177ea7.js.map
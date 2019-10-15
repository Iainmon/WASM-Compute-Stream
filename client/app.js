!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))(function(o,c){function s(t){try{u(i.next(t))}catch(t){c(t)}}function r(t){try{u(i.throw(t))}catch(t){c(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n(function(t){t(e)})).then(s,r)}u((i=i.apply(t,e||[])).next())})};Object.defineProperty(e,"__esModule",{value:!0});const o=n(1),c=n(2);(()=>i(void 0,void 0,void 0,function*(){let t=(yield o.default()).instance.exports;new u(t.fib)}))();const s="ws://localhost:9001";class r{constructor(t,e,n){this.calculationInputBuffer=Array(),t.onopen=this.onopen.bind(this),this.connection=t,this.func=e,this.callback=n}step(){let t,e=this.calculationInputBuffer.shift();e&&(t=this.func(e),this.connection.send(t.toString()),this.callback(e,t))}onopen(){this.connection.onmessage=this.incomingdata.bind(this),this.connection.onerror=this.error.bind(this),this.asyncCallerThread=new c(this.step.bind(this),1e3/30),this.connection.send("ready.")}incomingdata(t){this.calculationInputBuffer.push(t.data)}error(){}close(){this.connection.close()}}class u{constructor(t){this.calculations=Array(),this.funcReference=t,document.getElementById("new-calculation-button").onclick=this.createNewCalculation.bind(this),this.calculationCountElement=document.getElementById("calculation-count"),this.calculationBufferElement=document.getElementById("calculation-buffer")}createNewCalculation(){let t=document.getElementById("ws-server-address").value,e=new WebSocket(t||s),n=new r(e,this.funcReference,this.valueCalculated.bind(this));this.calculations.push(n),this.calculationCountElement.innerHTML=this.calculations.length.toString()}valueCalculated(t,e){this.calculationBufferElement.innerHTML=`<i>fib(${t})</i> = ${e}<hr>`+this.calculationBufferElement.innerHTML}}},function(t,e,n){"use strict";var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))(function(o,c){function s(t){try{u(i.next(t))}catch(t){c(t)}}function r(t){try{u(i.throw(t))}catch(t){c(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n(function(t){t(e)})).then(s,r)}u((i=i.apply(t,e||[])).next())})};Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){return i(this,void 0,void 0,function*(){return fetch("./build/optimized.wasm").then(t=>t.arrayBuffer()).then(t=>WebAssembly.instantiate(t,{env:{abort:function(){}}}))})}},function(t,e,n){t.exports=n(3)},function(t,e){class n{constructor(t,e=0,n=!0){this.execute=t,this.dtime=e,this.stop=!1,this.fireTimes=0,n&&(t(),this.fireTimes++,this.fireTimes++),this.main()}main(){this.loop=setInterval(()=>{this.fireTimes++,this.execute()},this.dtime)}toggle(){this.stop=!this.stop,this.stop?clearInterval(this.loop):this.main()}kill(){clearInterval(this.loop),this.main=this.toggle=this.dtime=this.stop=this.execute=this.loop=void 0,this.kill=null}}n.spawn=function(t,e=0){setTimeout(t,e)},n.do=function(t){setTimeout(t,0)},t.exports=n}]);
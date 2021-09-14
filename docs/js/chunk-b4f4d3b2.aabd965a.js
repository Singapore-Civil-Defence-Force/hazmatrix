(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b4f4d3b2"],{"2c99":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"px-4 pt-4",staticStyle:{"text-align":"left"}},[i("div",{staticClass:"columns is-multiline"},[i("div",{staticClass:"column"},[i("p",{staticClass:"title is-4"},[e._v(e._s(e.equipment.name))])]),i("div",{staticClass:"column content pb-0 mb-0"},[i("details",{staticClass:"pb-0",attrs:{open:""}},[i("summary",{staticClass:"subtitle"},[e._v("Mitigation Limitations")]),i("ul",e._l(e.equipment["Mitigation Limitations"],(function(t,a){return i("li",{key:a},[Array.isArray(t)?i("div",[e._v(" "+e._s(t[0])+" "),e._l(t[1],(function(t,a){return i("ul",{key:a},[i("li",[e._v(e._s(t))])])}))],2):i("span",[e._v(e._s(t))])])})),0)])]),e._m(0),i("div",{staticClass:"column content pb-0 mb-0"},[i("p",{staticClass:"subtitle"},[e._v("Operating Pressure")]),i("ul",[i("li",{staticClass:"subtitle"},[i("b",[e._v(e._s(e.equipment["Operating Pressure"]))])])])]),e._m(1),i("div",{staticClass:"column content pb-0 mb-0"},[i("p",{staticClass:"subtitle"},[e._v("Working Temperature")]),i("ul",[i("li",{staticClass:"subtitle"},[i("b",[e._v(e._s(e.equipment["Working Temperature"]))])])])]),e._m(2),i("div",{staticClass:"column content pb-0 mb-0"},[i("p",{staticClass:"subtitle"},[e._v("Can use in flammable environment")]),i("ul",[i("li",{staticClass:"subtitle"},[i("b",[e._v(e._s(e.equipment["flammable environment"]))])])])]),e._m(3),e.chemicalID?i("div",[i("div",{staticClass:"column content pb-0 mb-0"},[i("p",{staticClass:"subtitle mb-1"},[e._v(" Notes for "),i("b",[e._v(e._s(e.chemicals[e.chemicalID].name))])]),i("ul",[i("li",[i("p",{staticClass:"subtitle"},[e._v(" Status: "),i("b",[e._v(e._s(e.mitigation_notes.note))])])])])]),e._m(4)]):e._e(),i("div",{staticClass:"column pb-0 mb-0"},[i("div",{staticClass:"columns"},[i("div",{staticClass:"column"},[i("Share",{attrs:{options:{title:"Share this Mitigation Equipment",text:e.equipment.name}}})],1),i("div",{staticClass:"column"},[i("button",{staticClass:"button is-light is-fullwidth",on:{click:function(t){return e.$router.back()}}},[e._v(" back ")])]),i("div",{staticClass:"column"},[i("router-link",{staticClass:"button is-light is-fullwidth is-danger",attrs:{to:{name:"home"}}},[e._v(" home ")])],1)])])])])},n=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"column"},[i("hr",{staticClass:"my-0",staticStyle:{"background-color":"#dedede"}})])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"column"},[i("hr",{staticClass:"my-0",staticStyle:{"background-color":"#dedede"}})])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"column"},[i("hr",{staticClass:"my-0",staticStyle:{"background-color":"#dedede"}})])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"column"},[i("hr",{staticClass:"my-0",staticStyle:{"background-color":"#dedede"}})])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"column"},[i("hr",{staticClass:"my-0",staticStyle:{"background-color":"#dedede"}})])}],s=i("e013"),r=i("50b4"),l=i("bf5f"),o=i("17a4"),m={name:"MitigationEquipment",components:{Share:o["a"]},props:["id","chemicalID"],data:function(){var e=this.chemicalID?r[this.chemicalID][this.id]:void 0;return{chemicals:l,equipment:s[this.id],mitigation_notes:e}}},c=m,u=i("2877"),p=Object(u["a"])(c,a,n,!1,null,null,null);t["default"]=p.exports},"50b4":function(e){e.exports=JSON.parse('{"1":{"1":{"id":"1","note":"Compatible"},"2":{"id":"2","note":"Conditionally Compatible"},"3":{"id":"3","note":"Conditionally Compatible"},"4":{"id":"4","note":"Conditionally Compatible"},"5":{"id":"5","note":"Last Resort"},"6":{"id":"6","note":"Last Resort"}},"4":{"8":{"id":"8","note":"Compatible"},"9":{"id":"9","note":"Compatible"},"10":{"id":"10","note":"Compatible"}}}')},e013:function(e){e.exports=JSON.parse('{"1":{"name":"Flange drainage bag (Chloroprene rubber)","Mitigation Limitations":["Flange connection: Ø < 21 cm","Pipe: Ø < 10 cm"],"Operating Pressure":"1.5 Bar","Working Temperature":"-55°C to 85°C","flammable environment":"Yes"},"2":{"name":"Leak sealing lance (Chloroprene rubber)","Mitigation Limitations":[["Leaking opening and width",["Wedge bag 6: 1.5-4.5 cm, 6-9 cm","Wedge bag 8: 1.5-4.5 cm, 8-12 cm","Wedge bag 11: 3-6 cm, 11-17 cm","Cone bag 7: Ø 3-9 cm"]]],"Operating Pressure":"1.5 Bar","Working Temperature":"-55°C to 85°C","flammable environment":"Yes"},"3":{"name":"Mini leak sealing bag (Chloroprene rubber)","Mitigation Limitations":["For container Ø 10-90 cm",["Size and sealing area",["LDK 10/10: 15 x 15 x 1.2 cm, 9.5 x 9.5 cm","LDK 10/25: 15 x 31 x 1.2 cm, 9.5 x 25.5 cm","LDK 20/20: 25 x 25 x 1.2 cm, 19.5 x 19.5 cm"]]],"Operating Pressure":"1.5 Bar","Working Temperature":"-40°C to 95°C","flammable environment":"Yes"},"4":{"name":"Leak sealing bag (Chloroprene rubber)","Mitigation Limitations":["For container Ø > 50 cm","Size: 61.5 x 30 x 2 cm","Sealing area: 50 x 30 cm","PVC acid protective cover","Tension and extension belt: 10 m","2 Sealing plates: 60 x 30 x 3 cm"],"Operating Pressure":"1.5 Bar","Working Temperature":"-40°C to 90°C","flammable environment":"Yes (Only when using with Vetter\'s original set)"},"5":{"name":"Leak drainage bag (Natural rubber)","Mitigation Limitations":["For container Ø > 50 cm","Size: 62 x 30 x 6 cm","Sealing area: 50 x 30 cm","Drainage space: 40 x 20 x 3.5 cm","Tension and extension belt: 10 m","Acid drain hose: 5 m"],"Operating Pressure":"1.5 Bar","Working Temperature":"-40°C to 90°C","flammable environment":"Yes (Only when using with Vetter\'s original set)"},"6":{"name":"Pipe sealing bag (Natural rubber)","Mitigation Limitations":["For pipe/drain Ø 10-120 cm",["Size and pipe/drain Ø",["PDK 10/20: 63.5 x 9.7 cm, 10-20 cm","PDK 20/50: 70 x 19.5 cm, 20-50 cm","PDK 50/80: 72 x 45 cm, 50-80 cm (store)","PDK 50/120: 107 x 45 cm, 50-120 cm (store)"]],["Drainage hose",["1 x 2.5” Storz x 10 m (store)","1 x 4” Storz x 10 m (store)"]]],"Operating Pressure":"1.5 Bar","Working Temperature":"-40°C to 70°C","flammable environment":"Yes"},"7":{"name":"Emergency response containment vessel (ERCV) (Salvage Cylinder)","Mitigation Limitations":["Cylinder size limit","Length: < 90 cm (inclusive of cap)","Diameter: < 25 cm","Only for metallic containers with no explosive mixture, and cylinders that are not damaged by fire or explosion-damage.","Cylinders cannot be liquid-full."],"Operating Pressure":"10 Bar","Working Temperature":"20°C to 50°C","flammable environment":"Yes"},"8":{"name":"Pipe Clamp (Clamp Ø size: Smaller than 5\\")","Mitigation Limitations":["Clamp Ø size: 0.5\\", 0.75\\", 1\\", 1.25\\", 1.5\\" 2\\", 2.5\\", 3\\", 3.5\\", 4\\""],"Operating Pressure":"10 Bar","Working Temperature":"20°C to 50°C","flammable environment":"Yes"},"9":{"name":"Pipe Clamp (Clamp Ø size: 5\\")","Mitigation Limitations":["Clamp Ø size: 5\\""],"Operating Pressure":"10 Bar","Working Temperature":"20°C to 50°C","flammable environment":"Yes"},"10":{"name":"TMP","Mitigation Limitations":[["Clamp Ø size:",["0.5\\"","0.75\\"","1\\"","1.25\\"","1.5\\"","2\\"","2.5\\"","3\\"","3.5\\"","4\\""]]],"Operating Pressure":"10 Bar","Working Temperature":"20°C to 50°C","flammable environment":"Yes"}}')}}]);
//# sourceMappingURL=chunk-b4f4d3b2.aabd965a.js.map
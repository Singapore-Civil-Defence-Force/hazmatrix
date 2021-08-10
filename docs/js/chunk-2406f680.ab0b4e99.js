(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2406f680"],{4945:function(e){e.exports=JSON.parse('{"1":[{"id":"6","values":["100 – 1000 ppm","20"]}]}')},"50b4":function(e){e.exports=JSON.parse('{"1":[{"id":"1","note":"Conditionally resistant"},{"id":"2","note":"Conditionally resistant"},{"id":"3","note":"Conditionally resistant"},{"id":"4","note":"Conditionally resistant"},{"id":"5","note":"Resistant"},{"id":"6","note":"Resistant"}]}')},"8a82":function(e){e.exports=JSON.parse('{"1":{"id":"1","name":"Polytector G999 (config 1)","operating temperature":"-20°C to 50°C"},"2":{"id":"2","name":"Polytector G999 (config 2)","operating temperature":"-20°C to 50°C"},"3":{"id":"3","name":"Polytector G999 (config 3)","operating temperature":"-20°C to 50°C"},"4":{"id":"4","name":"Polytector G999 (config 4)","operating temperature":"-20°C to 50°C"},"5":{"id":"5","name":"Polytector G999 (config 5)","operating temperature":"-20°C to 50°C"},"6":{"id":"6","name":"Draeger tubes","operating temperature":"2°C to 25°C","keys":["Detection limit","No of Stroke"]}}')},a08d:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"px-4 pt-4",staticStyle:{"text-align":"left"}},[i("div",{staticClass:"columns is-multiline"},[i("div",{staticClass:"column"},[i("p",{staticClass:"title is-4"},[e._v(e._s(e.chemical.name))]),i("p",{staticClass:"subtitle mb-1"},[e._v(" Formula: "),i("b",[e._v(e._s(e.chemical.formula||"NA"))])]),i("p",{staticClass:"subtitle"},[e._v(" UN Number: "),i("b",[e._v(e._s(e.chemical.un||"NA"))])])]),e._m(0),i("details",{staticClass:"column"},[e._m(1),e._l(e.detection_equipments,(function(t){return i("div",{key:t.id,staticClass:"card px-4 my-4"},[i("router-link",{staticClass:"card-content content",attrs:{to:{name:"equipment",params:{id:t.id}}}},[i("h3",[e._v(e._s(e.all_detection_equipments[t.id].name))]),e._l(e.all_detection_equipments[t.id].keys,(function(n,a){return i("p",{key:a,staticClass:"subtitle mb-1"},[e._v(" "+e._s(n)+": "),i("b",[e._v(e._s(t.values[a]))])])}))],2)],1)}))],2),e._m(2),i("details",{staticClass:"column"},[e._m(3),e._l(e.mitigation_equipments,(function(t){return i("div",{key:t.id,staticClass:"card px-4 my-4"},[i("router-link",{staticClass:"card-content content",attrs:{to:{name:"equipment",params:{id:t.id}}}},[i("h3",[e._v(e._s(e.all_mitigation_equipments[t.id].name))]),i("p",{staticClass:"subtitle mb-1"},[e._v(e._s(t.note))])])],1)}))],2)])])},a=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"column"},[i("hr",{staticClass:"my-0"})])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("summary",[i("b",[e._v("Detection")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"column"},[i("hr",{staticClass:"my-0"})])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("summary",[i("b",[e._v("Mitigation")])])}],r=i("bf5f"),s=i("8a82"),o=i("e013"),m=i("4945"),l=i("50b4"),c={name:"Chemical",props:["id"],data:function(){return{all_detection_equipments:s,all_mitigation_equipments:o,chemical:r[this.id],detection_equipments:m[this.id],mitigation_equipments:l[this.id]}}},u=c,p=i("2877"),d=Object(p["a"])(u,n,a,!1,null,null,null);t["default"]=d.exports},bf5f:function(e){e.exports=JSON.parse('{"1":{"id":"1","name":"Acetic acid (ethanoic acid)","formula":"CH3COOH","un":[2789,2790]},"2":{"id":"2","name":"Acetone","formula":"C3H6O","un":[1090]},"3":{"id":"3","name":"Acetylene","formula":"C2H2","un":[1001,3374]},"4":{"id":"4","name":"Aliphatic hydrocarbon","formula":null,"un":null},"5":{"id":"5","name":"Allene","formula":null,"un":null}}')},e013:function(e){e.exports=JSON.parse('{"1":{"name":"Flange drainage bag (Chloroprene rubber)","Mitigation Limitations":["Flange connection: Ø < 21 cm","Pipe: Ø < 10 cm"],"Operating Pressure":"1.5 Bar","Working Temperature":"-55°C to 85°C","flammable environment":"Yes"},"2":{"name":"Leak sealing lance (Chloroprene rubber)","Mitigation Limitations":[["Leaking opening and width",["Wedge bag 6: 1.5-4.5 cm, 6-9 cm","Wedge bag 8: 1.5-4.5 cm, 8-12 cm","Wedge bag 11: 3-6 cm, 11-17 cm","Cone bag 7: Ø 3-9 cm"]]],"Operating Pressure":"1.5 Bar","Working Temperature":"-55°C to 85°C","flammable environment":"Yes"},"3":{"name":"Mini leak sealing bag (Chloroprene rubber)","Mitigation Limitations":["For container Ø 10-90 cm",["Size and sealing area",["LDK 10/10: 15 x 15 x 1.2 cm, 9.5 x 9.5 cm","LDK 10/25: 15 x 31 x 1.2 cm, 9.5 x 25.5 cm","LDK 20/20: 25 x 25 x 1.2 cm, 19.5 x 19.5 cm"]]],"Operating Pressure":"1.5 Bar","Working Temperature":"-40°C to 95°C","flammable environment":"Yes"},"4":{"name":"Leak sealing bag (Chloroprene rubber)","Mitigation Limitations":["For container Ø > 50 cm","Size: 61.5 x 30 x 2 cm","Sealing area: 50 x 30 cm","PVC acid protective cover","Tension and extension belt: 10 m","2 Sealing plates: 60 x 30 x 3 cm"],"Operating Pressure":"1.5 Bar","Working Temperature":"-40°C to 90°C","flammable environment":"Yes (Only when using with Vetter\'s original set)"},"5":{"name":"Leak drainage bag (Natural rubber)","Mitigation Limitations":["For container Ø > 50 cm","Size: 62 x 30 x 6 cm","Sealing area: 50 x 30 cm","Drainage space: 40 x 20 x 3.5 cm","Tension and extension belt: 10 m","Acid drain hose: 5 m"],"Operating Pressure":"1.5 Bar","Working Temperature":"-40°C to 90°C","flammable environment":"Yes (Only when using with Vetter\'s original set)"},"6":{"name":"Pipe sealing bag (Natural rubber)","Mitigation Limitations":["For pipe/drain Ø 10-120 cm",["Size and pipe/drain Ø",["PDK 10/20: 63.5 x 9.7 cm, 10-20 cm","PDK 20/50: 70 x 19.5 cm, 20-50 cm","PDK 50/80: 72 x 45 cm, 50-80 cm (store)","PDK 50/120: 107 x 45 cm, 50-120 cm (store)"]],["Drainage hose",["1 x 2.5” Storz x 10 m (store)","1 x 4” Storz x 10 m (store)"]]],"Operating Pressure":"1.5 Bar","Working Temperature":"-40°C to 70°C","flammable environment":"Yes"},"7":{"name":"Emergency response containment vessel (ERCV) (Salvage Cylinder)","Mitigation Limitations":["Cylinder size limit","Length: < 90 cm (inclusive of cap)","Diameter: < 25 cm","Only for metallic containers with no explosive mixture, and cylinders that are not damaged by fire or explosion-damage.","Cylinders cannot be liquid-full."],"Operating Pressure":"10 Bar","Working Temperature":"20°C to 50°C","flammable environment":"Yes"}}')}}]);
//# sourceMappingURL=chunk-2406f680.ab0b4e99.js.map
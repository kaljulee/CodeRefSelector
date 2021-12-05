const data = [{
  id: 1,
  present: false,
  label: "codref 1",
  measurement: undefined,
  unit: undefined,
},
{
  id: 2,
  present: false,
  label: "some other coderef 2",
  measurement: undefined,
  unit: undefined,
},
{
  id: 3,
  present: false,
  label: "extra coderef 3derp a derp a derp ipsum ipsum looooorem",
  measurement: undefined,
  unit: undefined,
},
{
  id: 4,
  present: false,
  label: "coderef 4 double plus",
  measurement: undefined,
  unit: undefined,
},];
console.log("something");
appendToCodeRefList(document, data);
// data.forEach((datum) => {
//   let li = document.createElement("li");
//   li.innerText = datum.label;
//   li.id = datum.id;
//   list.appendChild(li);
// });

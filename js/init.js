// mock tables
const CodeReferences = [{
    id: 1,
    label: "codref 1",
    class_level_2_id: 1,
  },
  {
    id: 2,
    label: "some other coderef 2",
    class_level_2_id: 1,
  },
  {
    id: 3,
    label: "extra coderef 3derp a derp a derp ipsum ipsum looooorem",
    class_level_2_id: 2,
  },
  {
    id: 4,
    label: "coderef 4 double plus",
    class_level_2_id: 3,
  },
];

const Observations = [{
    id: 0,
    code_reference_id: 1,
    measurement: 5,
    unit: '%'
  },
  {
    id: 1,
    code_reference_id: 2,
    measurement: 10,
    unit: 'FT',
  }, {
    id: 3,
    code_reference_id: 4,
    measurement: 15,
    unit: 'sqft',
  }
];

const Units = [
  {name: "inches"},
  {name: "meters"},
  {name: "feet"},
  {name: "lb"},
  {name: "sqft"},
  {name: "%"},
  {name: "see comments"},
]

const zipperedData = zipperData(CodeReferences, Observations);
appendToCodeRefList(document, zipperedData, Units);

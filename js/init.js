// mock tables
var globalDoc = document;
var nodeId = undefined;
var selectedCL2 = undefined;
var activeCodeRefId;
var debug = false;
var dirtyData = {};

var CodeReferenceTable = [{
    id: 1,
    label: "no snacks are present",
    class_level_2_id: 1,
  },
  {
    id: 2,
    label: "everything must be spelled correctly",
    class_level_2_id: 1,
  },
  {
    id: 3,
    label: "no more than one fire is allowed indoors at any one time",
    class_level_2_id: 2,
  },
  {
    id: 4,
    label: "chili should have between 1 and 3 habaneros",
    class_level_2_id: 3,
  },
];

var RemedyTable = [
  {
    id: 1,
    class_level_3_id: 1,
    label: "add snacks",
  },
  {
    id: 2,
    class_level_3_id: 2,
    label: "run everything through spellcheck",
  },
  {
    id: 3,
    class_level_3_id: 3,
    label: "extinguish excess fires",
  },
  {
    id: 4,
    class_level_3_id: 4,
    label: "throw out chili, go to the store and purchase new set of ingredients, remake chili with between 1 and 3 habaneros",
  },
];

var UnitTable = [
  {name: "inches"},
  {name: "meters"},
  {name: "feet"},
  {name: "lb"},
  {name: "sqft"},
  {name: "%"},
  {name: "see comments"},
]

var ObservationTable = [{
    id: 0,
    code_reference_id: 1,
    measurement: 5,
    unit: '%',
    remedy_text: RemedyTable[0].label,
  },
  {
    id: 1,
    code_reference_id: 2,
    measurement: 10,
    unit: 'FT',
    remedy_text: RemedyTable[1].label,
  }, {
    id: 3,
    code_reference_id: 4,
    measurement: 15,
    unit: 'sqft',
    remedy_text: RemedyTable[3].label,
  }
];

var zipperedData = zipperData(CodeReferenceTable, ObservationTable);
filterCodeRefList();

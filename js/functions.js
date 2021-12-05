//////////////////////////////////
// create row-element id's
function generateRowId(rawId) {
  return "row" + rawId;
}

function generateMeasurementId(rawId) {
  return ("measurement" + rawId);
}

function generateUnitId(rawId) {
  return ("unit" + rawId);
}


///////////////////////////////////////////
// UI modifications
function appendToCodeRefList(doc, data) {
  let container = doc.getElementById("container");
  data.forEach((datum, n) => {
      addRow(doc, n, datum);
  });
}


/////////////////////////////////////
// data collection and formatting
function getObservationData (refId, observs) {
  let response = {};
  for (let i = 0; i < observs.length; i += 1) {
    console.log('checking ' + observs[i].code_reference_id + ' vs ' + refId);
    if (observs[i].code_reference_id === refId)
    {
    response.observationId = observs[i].id;
    response.measurement = observs[i].measurement;
    response.unit = observs[i].unit;
    break;
    }
  }
  return response;
}

function zipperData(codeRefs, observs) {
  return codeRefs.reduce((acc, ref) => {
    const { id, label, class_level_2_id} = ref;
    const output = {id, label, class_level_2_id};
    const observData = getObservationData(id, observs);
    acc.push({...output, ...observData});
    return acc;
  }, []);
}

///////////////////////////////////////
// interactions

function buttonClicked(elmnt) {
elmnt.classList.toggle("clicked-button");
}

function toggleCheckbox(id, doc) {
  let list = doc.getElementById();
}

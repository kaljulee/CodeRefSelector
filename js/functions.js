function appendToCodeRefList(doc, data) {
  let container = doc.getElementById("container");
  data.forEach((datum, n) => {
      addRow(doc, n, datum);
  });
}

function buttonClicked(elmnt) {
elmnt.classList.toggle("clicked-button");
}

function getObservationId (refId, observs) {
  let response = undefined;
  for (let i = 0; i < observs.length; i += 1) {
    console.log('checking ' + observs[i].code_reference_id + ' vs ' + refId);
    if (observs[i].code_reference_id === refId)
    {
    response = observs[i].id;
    break;
    }
  }
  return response;
}

function zipperData(codeRefs, observs) {
  return codeRefs.reduce((acc, ref) => {
    const { id, label, class_level_2_id} = ref;
    const output = {id, label, class_level_2_id};
    output.observationId = getObservationId(id, observs);
    acc.push(output);
    return acc;
  }, []);
}

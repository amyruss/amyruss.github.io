mapboxgl.accessToken = 'pk.eyJ1IjoiYW15YXJ1c3NlbGwiLCJhIjoiY2t6eTJkdjczMDdidTJvbzY3YjM3ZDA0NiJ9.yrh_fnBFsiSMwNpLTlhm0Q';

const style_top20 = "mapbox://styles/amyarussell/cl118kw9d001t14nqqefbs6dw";
const style_subway = "mapbox://styles/amyarussell/cl11zjfc4000214o6bu46vv4c";

//Using top20 as a baseline map
const top20 = new mapboxgl.Map({
  container: "map",
  style: style_top20,
  center: [-4.26980, 55.860916],
  zoom: 13
    }); 


// Reading and inputting the maps(styles) depending on what we've clicked on
const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");

//on click radio button
for (const input of inputs) {
  input.onclick = (layer) => {
    if (layer.target.id == "style_top20") {top20.setStyle(style_top20);
    }
    if (layer.target.id == "style_subway") {top20.setStyle(style_subway);
    }
  };
}


//allow clicking on top 20 map
top20.on("click", (event) => { 
  const features = top20.queryRenderedFeatures(event.point, {
    layers: ["top20pubsglasgow"]
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

 //create popup for top 20 map
const popup = new mapboxgl.Popup({ offset: [0, -15] , className: "my-popup"})
  .setLngLat(feature.geometry.coordinates)
  .setHTML(
  `<h3>${feature.properties.PREMISES_R}</h3>
    <p>${feature.properties.ADDRESS}</p>
    <p>${feature.properties.INFO}</p>`
  )
  .addTo(top20); //Add pop up to map
  
});


//Adding on top20 data

//subway addons
top20.on("click", (event) => { 
  const features = top20.queryRenderedFeatures(event.point, {
    layers: ["subwaycrawl"]
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

 //create popup for subway map
const popup = new mapboxgl.Popup({ offset: [0, -15] , className: "my-popup"})
  .setLngLat(feature.geometry.coordinates)
  .setHTML('<h3><a href="' + feature.properties.URL + '"target="_blank">' + feature.properties.PREMISES_R + '</a></h3><h3>' + feature.properties.ADDRESS + '</h3><p> Subway Stop: ' + feature.properties.SUBWAYSTOP + '</p>')
  .addTo(top20); //Add pop up to map
  
});
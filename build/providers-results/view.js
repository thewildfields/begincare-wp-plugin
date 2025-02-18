/******/ (() => { // webpackBootstrap
/*!******************************************!*\
  !*** ./blocks/providers-results/view.js ***!
  \******************************************/
const displayModeSwitchButtons = document.querySelectorAll('.displayModeSwitch__button');
const resultsView = document.querySelector('.providers__display');
for (let i = 0; i < displayModeSwitchButtons.length; i++) {
  const button = displayModeSwitchButtons[i];
  button.addEventListener('click', () => {
    const target = button.getAttribute('target-view');
    if (target === 'map') {
      resultsView.classList.add('providers__display_mapView');
    } else {
      resultsView.classList.remove('providers__display_mapView');
    }
    for (let k = 0; k < displayModeSwitchButtons.length; k++) {
      if (displayModeSwitchButtons[k] !== button) {
        displayModeSwitchButtons[k].classList.remove('displayModeSwitch__button_active');
      } else {
        displayModeSwitchButtons[k].classList.add('displayModeSwitch__button_active');
      }
    }
  });
}
const googleApiKey = "AIzaSyCkctQRHbx3cACmtTFj2-0ivpDSRbGdHzU";
(g => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () => h || (h = new Promise(async (f, n) => {
      await (a = m.createElement("script"));
      e.set("libraries", [...r] + "");
      for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
      e.set("callback", c + ".maps." + q);
      a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
      d[q] = f;
      a.onerror = () => h = n(Error(p + " could not load."));
      a.nonce = m.querySelector("script[nonce]")?.nonce || "";
      m.head.append(a);
    }));
  d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));
})({
  key: googleApiKey,
  v: "weekly"
});
const mapHolder = document.getElementById('map-holder');
const searchParams = new URLSearchParams(window.location.search);
const titlePlaceholder = `${searchParams.get('service')} near ${searchParams.get('location')}`;
const titlePlaceholderContainer = document.querySelector('#resultsTitle__placeholder');
titlePlaceholderContainer.textContent = titlePlaceholder;
const searchData = {
  lat: Number(searchParams.get('lat')),
  lng: Number(searchParams.get('lng'))
};
let bounds = new google.maps.LatLngBounds();
const rozshukMarkerElements = document.querySelectorAll('.-rozshuk-markerSource');
const initMap = async () => {
  const {
    Map,
    InfoWindow
  } = await google.maps.importLibrary('maps');
  const {
    AdvancedMarkerElement
  } = await google.maps.importLibrary("marker");
  const map = new Map(mapHolder, {
    center: {
      lat: searchData.lat && searchData.lng ? searchData.lat : -20.397,
      lng: searchData.lat && searchData.lng ? searchData.lng : 0.644
    },
    mapId: 'facilities_map',
    disableDefaultUI: true,
    zoomControl: true,
    zoom: 12
  });

  // const bounds = map.getBounds();

  let infowindow;
  google.maps.event.addListenerOnce(map, "idle", () => {});
  const facilitiesArray = [];
  for (let i = 0; i < rozshukMarkerElements.length; i++) {
    facilitiesArray.push(rozshukMarkerElements[i]);
  }
  for (let i = 0; i < rozshukMarkerElements.length; i++) {
    const provider = rozshukMarkerElements[i];
    const providerPosition = {
      lat: Number(provider.getAttribute('location-lat')),
      lng: Number(provider.getAttribute('location-lng'))
    };
    const marker = new AdvancedMarkerElement({
      map: map,
      position: providerPosition
    });
    bounds.extend(providerPosition);
  }
  if (rozshukMarkerElements.length > 0) map.fitBounds(bounds);
  map.maxDefaultZoom = 13;
  google.maps.event.addListenerOnce(map, "bounds_changed", function () {
    this.setZoom(Math.min(this.getZoom(), this.maxDefaultZoom));
  });
};
initMap();
/******/ })()
;
//# sourceMappingURL=view.js.map
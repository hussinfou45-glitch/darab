(function(){
const $=s=>document.querySelector(s), S=localStorage;
const IRAQ=[[28.9,38.7],[37.5,49.2]], CENTER=[33.2,43.7];
let lang=S.getItem("lang")||"ar", theme=S.getItem("theme")||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");
const t=k=>I18N[lang][k]||k;

const map=L.map("map",{center:CENTER,zoom:6,minZoom:5,maxBounds:[[24,34],[42,54]],zoomControl:false,worldCopyJump:false});
L.control.zoom({position:"topleft"}).addTo(map);
const osm=L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"}).addTo(map);
map.fitBounds(IRAQ);

function apply(){
  document.documentElement.lang=lang; document.documentElement.dir=lang==="ar"?"rtl":"ltr";
  document.documentElement.dataset.theme=theme;
  document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=t(e.dataset.i18n));
  document.querySelectorAll("[data-i18n-ph]").forEach(e=>e.placeholder=t(e.dataset.i18nPh));
  document.querySelectorAll("[data-i18n-title]").forEach(e=>{e.title=t(e.dataset.i18nTitle);e.setAttribute("aria-label",e.title)});
  $("#btnLang").textContent=lang==="ar"?"EN":"ع";
  $("#net b").textContent=t(navigator.onLine?"online":"offline");
  setGps(gpsState);
  // اتجاه الواجهة منفصل عن اتجاه الخريطة: الخريطة تبقى LTR
  $("#map").style.direction="ltr";
}
let gpsState="gps_off";
function setGps(k){gpsState=k;$("#gps").className="pill "+({gps_off:"gps-off",gps_wait:"gps-wait",gps_on:"gps-on"})[k];$("#gps b").textContent=t(k)}
function toast(m){const e=$("#toast");e.textContent=m;e.classList.add("show");clearTimeout(toast.h);toast.h=setTimeout(()=>e.classList.remove("show"),2800)}

let marker,circle;
$("#btnLocate").onclick=()=>{
  if(!navigator.geolocation)return toast(t("nogeo"));
  if(!window.isSecureContext)return toast(t("insecure"));
  setGps("gps_wait");
  navigator.geolocation.getCurrentPosition(p=>{
    const ll=[p.coords.latitude,p.coords.longitude],acc=Math.round(p.coords.accuracy);
    setGps("gps_on");
    if(!L.latLngBounds(IRAQ).contains(ll))toast(t("outside"));
    marker&&map.removeLayer(marker);circle&&map.removeLayer(circle);
    circle=L.circle(ll,{radius:acc,color:"#12935c",weight:1,fillOpacity:.12}).addTo(map);
    marker=L.circleMarker(ll,{radius:8,color:"#fff",weight:3,fillColor:"#0b5d3b",fillOpacity:1}).addTo(map).bindPopup(t("you").replace("{m}",acc));
    map.flyTo(ll,Math.max(map.getZoom(),15));
  },e=>{setGps("gps_off");toast(e.code===1?t("denied"):t("unavail"))},{enableHighAccuracy:true,timeout:15000,maximumAge:30000});
};
$("#btnCenter").onclick=()=>map.fitBounds(IRAQ);
$("#btnLayers").onclick=()=>toast(lang==="ar"?"الطبقة الحالية: OpenStreetMap. طبقات إضافية لاحقاً.":"Current layer: OpenStreetMap. More layers later.");
$("#btnLang").onclick=()=>{lang=lang==="ar"?"en":"ar";S.setItem("lang",lang);apply()};
$("#btnTheme").onclick=()=>{theme=theme==="dark"?"light":"dark";S.setItem("theme",theme);apply()};
$("#btnStart").onclick=()=>toast(t("soon"));
document.querySelectorAll("[data-soon]").forEach(b=>b.onclick=()=>toast(t("soon")));
document.querySelector(".grab").onclick=()=>$("#card").classList.toggle("collapsed");
addEventListener("online",apply);addEventListener("offline",apply);
apply();
})();

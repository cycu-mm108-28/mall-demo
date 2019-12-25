import { Modal } from "./Modal";
import * as L from "leaflet";

export class Map extends Modal {
    private map: L.Map;

    constructor() {
        super(`<div class="map"></div>`);
    }
    attach() {
        super.attach();

        const accessToken = `pk.eyJ1IjoiaHN1cGVuZ2p1biIsImEiOiJjazNmbHQ0M3YwNmF2M2RwNm4yc2FzMTZiIn0.R7HJViTXUh4pD8HjLxh35A`;
        const map = L.map(this.ref.querySelector<HTMLElement>(".map")!, {
            closePopupOnClick: false,
            zoomControl: false,
            zoom: 16,
            center: [24.9642673, 121.2345867]
        });
        this.map = map;

        L.tileLayer(
            "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
            {
                attribution:
                    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: "mapbox.streets",
                accessToken: accessToken
            }
        ).addTo(map);

        L.popup({
            keepInView: true,
            closeButton: false
        })
            .setLatLng([24.9642673, 121.2345867])
            .setContent("衣起著衣<br />320 桃園市中壢區育樂路24號")
            .openOn(map);
    }
    destroy() {
        this.map.remove();
        super.destroy();
    }
}

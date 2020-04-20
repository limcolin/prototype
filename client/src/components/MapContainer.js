import React from "react";
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline, Polygon } from 'google-maps-react';

const MapContainer = ({ google, deliveries, hoveredDelivery, newBooking, anchorages }) => {

  const style = {
    width: '100%',
    height: '500px',
    position: 'relative',
    margin: '0 auto'
  }

  // TODO: CHANGE VARIABLE NAME - 2 "delivery" variable NOT GOOD... maybe
  const delivery = (hoveredDelivery === null) ? deliveries[0] : deliveries.find(delivery => delivery.id === hoveredDelivery);

  function convertToDD(ddm) {
    let arr = ddm.split(" ")
    let degrees = parseFloat(arr[0], 10)
    let minutes = parseFloat(arr[1], 10) / 60
    return degrees + minutes
  }

  const getAnchorageCoords = anchorageCode => {
    return anchorages.reduce((result, anchorage) => {
      if(anchorage.code == anchorageCode) {
        anchorage.coordinates.map(coordinateSet => {
          let lat = coordinateSet.split(", ")[0]
          let lng = coordinateSet.split(", ")[1]
          result.push( { lat: convertToDD(lat), lng: convertToDD(lng) })
        })
      }
      return result
    }, [])
  }

  const getAnchorageCenter = anchorageCode => {
    let bounds = new google.maps.LatLngBounds();
    let anchorageCoords = getAnchorageCoords(anchorageCode)

    anchorageCoords.forEach(coord => {
      bounds.extend(coord)
    })

    let center = bounds.getCenter();

    return {
      lat: center.lat(),
      lng: center.lng()
    }
  }

  const getRoute = () => {
    return [
      { lat: delivery.terminalLat, lng: delivery.terminalLng },
      getAnchorageCenter(anchorages[delivery.anchorage].code),
      getAnchorageCenter(newBooking.destinations[1].anchorage)
    ];
  }

  const endMarkerPosition = getAnchorageCenter(newBooking.destinations[1].anchorage)
  const polygonPaths = [
    getAnchorageCoords(anchorages[delivery.anchorage].code),
    getAnchorageCoords(newBooking.destinations[1].anchorage)
  ]

  return (
    <div style={style}>
      <Map
        google={google}
        zoom={10}
        initialCenter={{
         lat: 1.3139991,
         lng: 103.7742106
        }}
        styles={[
          {
            "featureType": "all",
            "elementType": "all",
            "stylers": [{ "hue": "#008eff" }]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
              { "saturation": "0" },
              { "lightness": "0" }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
              { "visibility": "simplified" },
              { "saturation": "-60" },
              { "lightness": "-20" }
            ]
          }
        ]}
      >
        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{ lat: delivery.terminalLat, lng: delivery.terminalLng }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: '#ffffff',
            strokeColor: '#0f7fef',
            fillOpacity: 1
          }}
        />
        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={endMarkerPosition}
        />

        <Polyline
          path={getRoute()}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
        />

        { polygonPaths &&
          polygonPaths.map(paths => {
            return <Polygon
            paths={paths}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#0000FF"
            fillOpacity={0.35} />
          })
        }


      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyB-xYsUdjcOYY3vl--N717-9PZBbI5xwy4')
})(MapContainer)

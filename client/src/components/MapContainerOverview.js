import React from "react";
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline, Polygon } from 'google-maps-react';

const MapContainerOverview = ({ polygonPaths, bookings, google, hoveredBooking, anchorages }) => {
console.log("RENDER")
console.log(hoveredBooking)
  const style = {
    width: '100%',
    height: '500px',
    position: 'relative',
    margin: '0 auto'
  }

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

  const terminals = [
    {
      "id": 0,
      "name": "Marina South Wharves",
      "address": "71 Marina Coastal Drive Singapore 018946",
      "phone": "+65 6604 9405",
      "fax": "+65 6604 9403",
      "email": "jpcss@jp.com.sg",
      "coordinates": {
        "latitudeDegrees": 1.2696778,
        "longitudeDegrees": 103.8577001
      }
    },
    {
      "id": 1,
      "name": "Penjuru Lighter Terminal",
      "address": "42G Penjuru Road Singapore 609151",
      "phone": "+65 6316 2071",
      "fax": "+65 6316 2072",
      "email": "jpcss@jp.com.sg",
      "coordinates": {
        "latitudeDegrees": 1.302776,
        "longitudeDegrees": 103.7275123
      }
    }
  ]

  const colors = [ 'red', 'green', 'blue', 'yellow', 'purple' ]

  const getMapObjects = () => {
    let polygons = []
    let polylines = []
    let startMarkers = []
    let endMarkers = []
    bookings.forEach(booking => {
      let terminal = terminals.find(terminal => terminal.name === booking.terminalName)
      let startMarker = {
        key: booking.id,
        position: { lat: terminal.coordinates.latitudeDegrees, lng: terminal.coordinates.longitudeDegrees }
      }
      let endMarker = {
        key: booking.id,
        position: getAnchorageCenter(booking.destinations[1].anchorage)
      }
      startMarkers.push(startMarker)
      endMarkers.push(endMarker)
      polylines.push({
        key: booking.id,
        paths: [
          startMarker.position,
          getAnchorageCenter(booking.destinations[0].anchorage),
          endMarker.position
        ]
      })
      booking.destinations.forEach((destination, index) => {
        const paths = getAnchorageCoords(destination.anchorage)
        polygons.push({
          key: booking.id + destination.anchorage + index,
          paths: paths
        })
      })
    })
    return { polygons: polygons, polylines: polylines, startMarkers: startMarkers, endMarkers: endMarkers }
  }

  const mapObjects = getMapObjects()

  return (

    <div className="map-container" style={style}>
    <div
      style={{
        content: "",
        position : 'absolute',
        pointerEvents: 'none',
        zIndex: 1,
        bottom: 0,
        left: 0,
        backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255, 0), rgba(255,255,255, 1) 90%)',
        width: '100%',
        height: '4em'
      }}
    />

      <Map
        google={google}
        zoom={10}
        initialCenter={{
         lat: 1.3139991,
         lng: 103.7742106
        }}
        mapTypeId={google.maps.MapTypeId.TERRAIN}
        streetViewControlOptions = {{ position: google.maps.ControlPosition.TOP_RIGHT }}

        disableDefaultUI={true}
        streetViewControl={false}
        zoomControl={true}
        zoomControlOptions={{ position: 9 }}
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

        { mapObjects.polygons &&
          mapObjects.polygons.map(polygon => {
            return <Polygon
            key={polygon.key}
            paths={polygon.paths}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#0000FF"
            fillOpacity={0.35} />
          })
        }

        { mapObjects.startMarkers &&
          mapObjects.startMarkers.map(marker => {
            return <Marker
              key={marker.key}
              title={'The marker`s title will appear as a tooltip.'}
              name={'SOMA'}
              position={marker.position}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: '#ffffff',
                strokeColor: '#0f7fef',
                fillOpacity: 1
              }}
            />
          })
        }

        { mapObjects.endMarkers &&
          mapObjects.endMarkers.map(marker => {
            return <Marker
              key={marker.key}
              title={'The marker`s title will appear as a tooltip.'}
              name={'SOMA'}
              position={marker.position}
            />
          })
        }

        { mapObjects.polylines &&
          mapObjects.polylines.map((polyline, index) => {
            return <Polyline
              key={polyline.key}
              path={polyline.paths}
              strokeColor={colors[index]}
              strokeOpacity={0.8}
              strokeWeight={2}
            />
          })
        }
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyB-xYsUdjcOYY3vl--N717-9PZBbI5xwy4')
})(MapContainerOverview)

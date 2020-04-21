import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css';
import { Header } from 'semantic-ui-react';
import { Switch, Route } from "react-router-dom";
import OverviewPage from './components/OverviewPage'
import ArrivalsPage from './components/ArrivalsPage'
import BookingsPage from './components/BookingsPage'
import BookingForm from './components/BookingForm'
import Topbar from './components/Topbar'
import SideMenu from './components/SideMenu'
import _ from 'lodash'
import useDebounce from './utils/useDebounce'

// TODO: CHECK STATE BEFORE RENDERING FOR ALL COMPONENTS

function reducer(state, action) {
  switch(action.type) {
    case "price":
      return { ...state, price: parseInt(action.value) };
    case "terminalName":
      return { ...state, terminalName: action.value };
    case "craneNumber":
      return { ...state, craneNumber: action.value };
    case "lighterName":
      return { ...state, lighterName: action.value };
    case "lighterId":
      return { ...state, lighterId: action.value };
    case "lighterCompany":
      return { ...state, lighterCompany: action.value };
    case "arrivedDate":
      return { ...state, arrivedDate: action.value };
    case "arrivedTime":
      return { ...state, arrivedTime: action.value };
    case "destinations":
      return { ...state, destinations: action.value };
    case "destination":
      let found = _.findIndex(state.destinations, { stop: action.value.stop })
      if(found > -1) {
        return {
          ...state,
          destinations: state.destinations.map((destination, index) => {
            if(destination.stop === action.value.stop) {
              return {
                ...destination,
                ...action.value
              }
            }
            return destination
          })
        }
      } else {
        return {
          ...state,
          destinations: [
            ...state.destinations.slice(0, action.value.stop),
            { ...action.value },
            ...state.destinations.slice(action.value.stop),
          ]
        }
      }
    case "totalPallets":
      return { ...state, totalPallets: parseInt(action.value) };
    case "loadTime":
      return { ...state, loadTime: parseInt(action.value) };
    case "completed":
      return { ...state, completed: action.value };
    case "completedTime":
      return { ...state, completedTime: action.value };
    default:
      return state;
  }
}

const App = () => {

  useEffect(() => {
    getDeliveries();
    getBookings();
    getAnchorages();
    getArrivals()
    getAllArrivals()

    // TODO: USE SOCKET CONNECTION TO NOTIFY WHEN MESSAGES ARRIVE
    const interval = setInterval(() => {
      //getDataFromDb();
      //getBookings();
      getArrivals()
    }, 10000);

    return () => {
        // TODO: CHECK IF INTERVAL CLEARS
        clearInterval(interval);
        console.log("CLEAR INTERVAL");
    };
  }, []);

  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [arrivals, setArrivals] = useState([]);
  const [allArrivals, setAllArrivals] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [newBooking, dispatch] = useReducer(
    reducer,
    {
      price: null,
      terminalName: "",
      craneNumber: "",
      lighterName: "",
      lighterId: "",
      lighterCompany: "",
      arrivedDate: "",
      arrivedTime: "",
      anchorage: null,
      totalPallets: null,
      loadTime: null,
      completed: false,
      completedTime: null,
      destinations: [
        {stop: 0, anchorage: '', vessel: '', callSign: '', imoNumber: null, flag: '', pallets: null},
        {stop: 1, anchorage: '', vessel: '', callSign: '', imoNumber: null, flag: '', pallets: null}
      ]
    }
  );
  useEffect(() => {console.log(newBooking)
    setFilteredDeliveries(deliveries.filter(delivery => {
      return (delivery.timeslot < newBooking.loadTime && (newBooking.pallets <= (20 - delivery.pallets)));
    }));
  }, [newBooking, deliveries]);

  const [idToEdit, setIdToEdit] = useState(null);
  useEffect(() => {
    bookings.forEach(booking => {
      if (booking.id === idToEdit) {
        dispatch({ type: "price", value: booking.price });
        dispatch({ type: "terminalName", value: booking.terminalName });
        dispatch({ type: "craneNumber", value: booking.craneNumber });
        dispatch({ type: "lighterName", value: booking.lighterName });
        dispatch({ type: "lighterId", value: booking.lighterId });
        dispatch({ type: "lighterCompany", value: booking.lighterCompany });
        dispatch({ type: "arrivedDate", value: booking.arrivedDate });
        dispatch({ type: "arrivedTime", value: booking.arrivedTime });
        dispatch({ type: "totalPallets", value: booking.totalPallets });
        dispatch({ type: "loadTime", value: booking.loadTime });
        dispatch({ type: "completed", value: booking.completed });
        dispatch({ type: "completedTime", value: booking.completedTime });
        dispatch({ type: "destinations", value: booking.destinations });
      }
    });
  }, [idToEdit, bookings]);

  const [idToDelete, setIdToDelete] = useState(null);
  useEffect(() => {
    let objIdToDelete = null;
    bookings.forEach(booking => {
      if (booking.id === idToDelete) {
        objIdToDelete = booking._id;
      }
    });

    axios.delete(`${process.env.REACT_APP_API_URL}/deleteBooking`, {
      data: {
        id: objIdToDelete
      }
    });
  }, [idToDelete, bookings]);

  const [idToUpdate, setIdToUpdate] = useState(null);
  useEffect(() => {
    if(idToUpdate !== null) {
      setLoading(true);
      let objIdToUpdate = null;
      bookings.forEach(booking => {
        if (booking.id === idToUpdate) {
          objIdToUpdate = booking._id;
        }
      });

      axios.post(`${process.env.REACT_APP_API_URL}/updateBooking`, {
        id: objIdToUpdate,
        update: newBooking
      }).then(res => {
        console.log(res);
        getBookings();
      }).then(() => {
        setIdToUpdate(null);
        setIdToEdit(null);
        setLoading(false);
      });
    }
  }, [idToUpdate, bookings, newBooking]);

  const [hoveredDelivery, setHoveredDelivery] = useState(null);
  const hoverDelivery = id => {
    setHoveredDelivery(id);
  }

  const [hoveredBooking, setHoveredBooking] = useState(null);
  const hoverBooking = id => {
    setHoveredBooking(id);
  }
  useEffect(() => {
    console.log(hoveredBooking)
  }, [hoveredBooking])

  const [selectedDelivery, setSelectedDelivery] = useState(null)
  useEffect(() => {
    const selectedDeliveryDetails = deliveries.find(delivery => delivery.id === selectedDelivery)
    if(selectedDeliveryDetails) {
      dispatch({ type: 'price', value: ((selectedDeliveryDetails.pallets / 2) * 10) })
      dispatch({ type: 'loadTime', value: selectedDeliveryDetails.timeslot })
      dispatch({ type: 'destination', value:
        {
          stop: 0,
          pallets: selectedDeliveryDetails.pallets,
          vessel: selectedDeliveryDetails.mothership,
          anchorage: anchorages[selectedDeliveryDetails.anchorage].code
        },
      });
    }
  }, [selectedDelivery, deliveries])

  const getDeliveries = () => {
    fetch(`${process.env.REACT_APP_API_URL}/getDeliveries`)
      .then(data => data.json())
      .then(res => {
        setDeliveries(res.data)
      });
  };

  const getArrivals = () => {
    fetch(`${process.env.REACT_APP_API_URL}/getArrivals`)
      .then(data => data.json())
      .then(res => {
        setArrivals(res.data)
      });
  };

  const getAllArrivals = () => {
    fetch(`${process.env.REACT_APP_API_URL}/getAllArrivals`)
      .then(data => data.json())
      .then(res => {
        setAllArrivals(res.data)
      });
  };

  const getBookings = () => {
    fetch(`${process.env.REACT_APP_API_URL}/getBookings`)
      .then(data => data.json())
      .then(res => {
        setBookings(res.data)
      });
  };

  // TODO: REQUESTS NOT UPDATED ON MULTIPLE POSTS, CAUSING DUPLICATE IDs
  const postBooking = ({ price, terminalName, craneNumber, lighterName, lighterId, lighterCompany, arrivedDate, arrivedTime, mothership, callSign, imoNumber, anchorage, lat, lng, totalPallets, loadTime, completed, completedTime, destinations }) => {
    let currentBookingIds = bookings.map(booking => booking.id);
    let bookingIdToBeAdded = 0;
    while (currentBookingIds.includes(bookingIdToBeAdded)) {
      ++bookingIdToBeAdded;
    }

    axios.post(`${process.env.REACT_APP_API_URL}/postBooking`, {
      id: bookingIdToBeAdded,
      price: price,
      terminalName: terminalName,
      craneNumber: craneNumber,
      lighterName: lighterName,
      lighterId: lighterId,
      lighterCompany: lighterCompany,
      arrivedDate: arrivedDate,
      arrivedTime: arrivedTime,
      totalPallets: totalPallets,
      loadTime: loadTime,
      completed: completed,
      completedTime: completedTime,
      destinations: destinations
    });
  };

  const deleteBooking = id => {
    setIdToDelete(id);
  };

  const editBooking = id => {
    setIdToEdit(id);
  };

  const updateBooking = (type, value) => {
    dispatch({ type: type, value: value });
  };

  const saveUpdate = id => {
    setIdToUpdate(id);
  }

  const [vessels, setVessels] = useState([]);
  useEffect(() => {

  }, [vessels]);

  const search = async val => {
    setLoading(true);
    /*
    const foundVessels = await res.data.results;
    setVessels(foundVessels);
    setLoading(false);*/
    fetch(`${process.env.REACT_APP_API_URL}/getVessels`)
      .then(data => data.json())
      .then(res => {

      });
  }

  const [anchorages, setAnchorages] = useState([])
  const getAnchorages = () => {
    fetch(`${process.env.REACT_APP_API_URL}/getAnchorages`)
      .then(data => data.json())
      .then(res => {
        if(res.success) {
          setAnchorages(res.data);
        } else {
          console.log(res.error)
        }
      });
  }

  const [searchResults, setSearchResults] = useState([])
  const [vesselData, setVesselData] = useState([])
  const searchVessel = () => {
    fetch(`${process.env.REACT_APP_API_URL}/searchVessel/${debouncedSearchValue}`)
      .then(response => response.json())
      .then(res => {
        if(res.success) {
          setVesselData(res.data)
        } else {
          console.log(res.error)
        }
    });
  }

  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 500)
  useEffect(() => {
    if (debouncedSearchValue) {
      setLoading(true);
      searchVessel()
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    const re = new RegExp(_.escapeRegExp(searchValue), 'i')
    const isMatch = result => {
      return re.test(result.vesselName)
    }

    const results = _.filter(vesselData, isMatch).map(result => {
      return {
        "title": result.imoNumber,
        "data": result
      }
    })

    setLoading(false)
    setSearchResults(results)
  }, [debouncedSearchValue, vesselData])

  const [step, setStep] = useState(1)

  const [filteredBookings, setFilteredBookings] = useState(bookings)
  const [bookingFilter, setBookingFilter] = useState('all')
  useEffect(() => {
    switch(bookingFilter) {
      case 'all':
        return setFilteredBookings(bookings)
      case 'ongoing':
        return setFilteredBookings(bookings.filter(booking => booking.completed === false))
      case 'completed':
        return setFilteredBookings(bookings.filter(booking => booking.completed === true))
      default:
        return setFilteredBookings(bookings)
    }
  }, [bookingFilter, bookings])

  return (
    <div className="mainWrapper" style={{ display: 'flex' }}>
      <Topbar />
      <div className="sidebarWrapper" style={{ width: '90px' }}>
        <SideMenu />
      </div>
      <div className="contentWrapper" style={{ width: "calc(100% - 90px)", marginTop: '70px', background: '#f8f9fd' }}>
        <Switch>
          <Route path="/bookings">
            <BookingsPage
              editBooking={editBooking}
              updateBooking={updateBooking}
              saveUpdate={saveUpdate}
              bookingFilter={bookingFilter} setBookingFilter={setBookingFilter}
              bookings={filteredBookings}
              hoverBooking={hoverBooking}
              hoveredBooking={hoveredBooking}
              anchorages={anchorages}
              arrivals={arrivals}
              searchResults={searchResults} setSearchResults={setSearchResults}
              searchValue={searchValue} setSearchValue={setSearchValue}
              loading={loading} setLoading={setLoading}
              setSelectedDelivery={setSelectedDelivery}
              hoverDelivery={hoverDelivery}
              hoveredDelivery={hoveredDelivery}
              step={step} setStep={setStep}
              deliveries={deliveries}
              newBooking={newBooking} dispatch={dispatch}
              postBooking={postBooking}
              searchVessel={searchVessel}
              vesselData={vesselData} setVesselData={setVesselData}
            />
          </Route>
          <Route path="/arrivals">
            <ArrivalsPage
              arrivals={arrivals} allArrivals={allArrivals}
            />
          </Route>
          <Route path="/">
            <OverviewPage
              arrivals={arrivals}
              bookings={bookings.slice(0, 2)}
              hoverBooking={hoverBooking}
              hoveredBooking={hoveredBooking} setHoveredBooking={setHoveredBooking}
              anchorages={anchorages}
              searchResults={searchResults} setSearchResults={setSearchResults}
              searchValue={searchValue} setSearchValue={setSearchValue}
              loading={loading} setLoading={setLoading}
              setSelectedDelivery={setSelectedDelivery}
              hoverDelivery={hoverDelivery}
              hoveredDelivery={hoveredDelivery}
              step={step} setStep={setStep}
              deliveries={deliveries}
              newBooking={newBooking} dispatch={dispatch}
              postBooking={postBooking}
              searchVessel={searchVessel}
              vesselData={vesselData} setVesselData={setVesselData}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

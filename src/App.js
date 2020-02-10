import React,{ useState } from 'react';
import Axios from 'axios';
import Thead from './app-components/Thead';
import './App.scss';
import TableRows from './app-components/TableRows';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';



const App = props => {

// <! ---------------------             STORING DATA          ----------------------------- !>

    const [adress,setAddress] = React.useState("");
    const [coordinates,setCoordinates] = React.useState({
        lat:null,
        lng:null
    });
    const [apiData, setApiData] = React.useState({
      city:null,
      website:null,
      number:null
    });

// <! -------------------         Creating a function to get on Cities from the google places          ----------------------->

const getOnlyCities = arrOfWords => {
  return arrOfWords.split(',').splice(0,1).join('');
}

// <!------------------------          Selecting the autocomplite options from the input         ---------------------------!>

    const hendleSelect = async (value) =>{
        const result = await geocodeByAddress(value);
        const latLng = await getLatLng(result[0]);
        const search = getOnlyCities(value);

        // Formating  coordinates
        setCoordinates(latLng);

        // Running Async request for the data
        getClients(search);

    }

// <!------------------------           Get the Data form the API         ---------------------------!>

    const getClients = async (input) => {

      // Getting data from API
      const apiCall = await Axios(`https://api.freightera.com/api/geolocation/${input}`); 
      // Storing API data to use it in components
        setApiData( curent => ({
                  ...apiCall
                }
        ));
    }
// <! -------------------------         Creating elements        ----------------------------- !>
        return(
            <div className="container"> {/* Container to style the main Component */} 

                <PlacesAutocomplete  // React Google places library Component
                    value={adress}
                    onChange={setAddress}
                    onSelect={hendleSelect}
                >
              {/* INPUT Field */}
                  {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                      <div>
                          <input className="input__search__input"  {...getInputProps(  {placeholder: 'Type City'}  )} />
                          <output className="input__sugestions-box">
                            {loading ? <div className="input__sugestions"> ...loading</div> : null} {/* A nimation for the autocomplite */} 
              {/* Maping thru the suggestions options */}
                                {suggestions.map((suggestions)=>{
                                    const style = {
                                        backgroundColor: suggestions.active ? "#e6ffe6" : null
                                    }
                                    return(
                                      <div className="pac-item" {...getSuggestionItemProps(suggestions,{style})}>
                                        <div className="pac-icon"></div>
                                          {suggestions.description}
                                      </div>
                                    )
                                })}
                          </output>
                      </div>
                  )}
              </PlacesAutocomplete>

{/*  <! ------------------------------------------     Creating a table to outupt the Data     -------------------------------!>  */}
                {apiData.data ? 
                  <table className="table table-dark">
                      {apiData.data ? 
                        <Thead/>// Table head
                      : null }
                            {apiData.data ? apiData.data.map((el,index)=>{
                          return(
                            <TableRows website={el.CityName}
                                      key={index} 
                                      number={el.popular} 
                                      city={el.CityName} 
                                      country= {el.country }
                                      country_full={el.country_full}
                                      latitude={el.latitude}
                                      longitude={el.longitude}
                                      timezone={el.timezone}
                                      postalcode={el.postalcode}
                                      per_dif={el.per_dif}
                                      dif={el.dif}
                                      soundex={el.soundex}
                            />
                          )
                        }) : null }  
                  </table>
              : null }
            </div>
        )
    }

export default App;
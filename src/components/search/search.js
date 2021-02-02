import React, { Component } from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import { useHistory } from "react-router-dom";



const Search = ({ search }) => {

const history = useHistory();

const [searchLocation, setSearchLocation] = React.useState('Melbourne, Victoria, Australia');    

      return (
        <div>
            <div className="search_bar">
                    <AlgoliaPlaces
                        placeholder='Enter location'

                        options={{
                            language: 'en',
                        }}
                        // send search input as a url param
                        onChange={e => {
                            setSearchLocation(e.suggestion.value)
                            history.push("/search/" + e.suggestion.value);
                        }}
                    />
            </div>            
        </div>
      )
}


export default Search;


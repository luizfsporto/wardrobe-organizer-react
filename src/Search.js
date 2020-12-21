import React from 'react';
import { DataSearch} from '@appbaseio/reactivesearch';

// Search box UI component
function Search() {
  return(
    <label className="searching">
      <DataSearch
        componentId="mainSearch"
        dataField={["brand", "color", "type", "title"]}
        queryFormat="and"
        placeholder="Search..."
      />
    </label>
  );
}

export default Search;

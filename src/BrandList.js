import React, { Component } from 'react';
import { MultiList} from '@appbaseio/reactivesearch'; // Uses appbase.io

// List of brands
class BrandList extends Component {
  render() {
    return(
      /* Multiple selection-based list */
      <MultiList
        componentId="brands-list"
        dataField="brand.keyword"
        className="brands-filter"
        showSearch={false}
        react={{
          and: ["mainSearch", "results", "colors-list", "types-list"]
        }}

      render={({
        loading,
        error
      }) => {
        if(loading) {
          return <div>Still Looking for Clothes</div>
        }

          if(error) {
            return (
              <div>
                Something went wrong!
                Error: {JSON.stringify(error)}
              </div>
            )
          }
        }}

        renderNoSuggestion={() => (
          <div>
            No suggestions found
          </div>
          )
        }

        showFilter={true}
        filterLabel="brand"
        URLParams={false}
        innerClass={{
          label: "list-item",
          input: "list-input"
        }}
      />
    )
  }
}

export default BrandList;

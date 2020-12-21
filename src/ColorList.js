import React, { Component } from 'react';
import { MultiList} from '@appbaseio/reactivesearch';

// List of colors
class ColorList extends Component {
  render() {
    return(
      <MultiList
        componentId="colors-list"
        dataField="color.keyword"
        className="colors-filter"
        showSearch={false}
        react={{
          and: ["mainSearch", "results", "types-list", "brands-list"]
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
          filterLabel="color"
          URLParams={false}
          innerClass={{
              label: "list-item",
              input: "list-input"
          }}
        />
      )
    }
  }

export default ColorList;

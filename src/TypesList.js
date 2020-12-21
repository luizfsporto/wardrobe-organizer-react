import React, { Component } from 'react';
import { MultiList} from '@appbaseio/reactivesearch';

// List of types
class TypesList extends Component {
  render() {
    return(
      <MultiList
        componentId="types-list"
        dataField="type.keyword"
        className="types-filter"
        showSearch={false}
        react={{
          and: ["mainSearch", "results", "colors-list", "brands-list"]
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
          filterLabel="type"
          URLParams={false}
          innerClass={{
              label: "list-item",
              input: "list-input"
          }}
        />
      )
    }
  }

export default TypesList;

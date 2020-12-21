import React, { Component } from 'react'; //import React Component
import { ResultCard } from '@appbaseio/reactivesearch';
class ClothesCard extends Component {
    render() {
      return(
        <ResultCard
        componentId="results"
        dataField="title"
        pagination="true"
        size="10"
        showResultStats={false}
        react={{
          and: ["mainSearch","brands-list","colors-list","types-list"]
        }}
    onData={function(res) {
      return {
        description: (
          <div>
            <div className="ih-item square effect6 top_to_bottom">
              <a target="#" href={"/item/" + res.title}>
                <div className="img">
                  <img
                    src={
                      res.image
                    }
                    alt={res.title}
                    className="result-image"
                  />
                </div>
                <div className="info colored">
                  <h3 className="overlay-title">
                    {res.title}
                  </h3>
                </div>
              </a>
            </div>
          </div>
        )
      };
    }}
  />

)}}

export default ClothesCard;

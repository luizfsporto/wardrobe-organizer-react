import React from 'react';
import { ReactiveBase} from '@appbaseio/reactivesearch';
import './App.css'
import { Route, Switch } from 'react-router-dom';
import ClothesCard from './ClothesCard.js';
import DetailPage from './DetailPage.js';
import BrandList from './BrandList.js';
import TypesList from './TypesList.js';
import ColorList from './ColorList.js';
import Search from './Search.js';

// Filters the shown clothes based on user selection input
function FilterBase() {
  return(
    <ReactiveBase
      app="clothes"
      credentials="EjhqnRm46:f8bcb824-c33d-49ff-a2fd-b9882162c66a"
    >

    <div className="search">
      <Search />
    </div>

    <div className="ListContainer">
      <div className="lists">
        <h2>Filters</h2>
        <h3>Brands</h3>
        <BrandList />
        <h3>Colors</h3>
        <ColorList />
        <h3>Type</h3>
        <TypesList />
      </div>

      <div className="clothes" id="closet">
        <Switch>
          <Route exact path="/" component={ClothesCard}/>
          <Route exact path="/item/:name" component={DetailPage}/>
        </Switch>
      </div>
    </div>
    <footer className="footer" id="contact">
      <address>
        Contact us at <a aria-label="email-link" id="mailLink" href="mailto:randomemail@gmail.com">randomemail@gmail.com</a>
      </address>
      <p>&copy; Aniruddh Vardhan, Luiz Fernando Porto, and Shourya Srivastava</p>
    </footer>
    </ReactiveBase>
  );
}
export default FilterBase

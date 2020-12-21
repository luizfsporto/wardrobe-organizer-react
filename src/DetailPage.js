import _ from 'lodash';
import React, { Component } from 'react';
import ClothesCard from './ClothesCard.js';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Details of each ClothesCard
class DetailPage extends Component {
  constructor(props){
    super(props);
    this.state = {cloth: undefined};
    this.liked = false;
  }

  componentDidMount(){
    // Name of the cloth (e.g. 'Burgundy Hoodie')
    let clothesName = this.props.match.params.name;

    // Reference to the Firebase Realtime Database service
    const database = firebase.database();
    const clothesRef = database.ref();
    clothesRef.on('value', (snapshot) => {
      // Convert it into a JS value
      const valueObj = snapshot.val()
      // Make it into an array of objects
      let objectKeyArray = Object.keys(valueObj);
      let clothesArray = objectKeyArray.map((key) => {
        let singleClothObj = valueObj[key];
        singleClothObj.key = key;
        return singleClothObj;
      })
      // Find and store a cloth from the data set
      let clothesArraySpecific = _.find(clothesArray, {title: clothesName})
      this.setState({clothes: clothesArraySpecific});
    }, function(err) {
      console.log(err);
    })
  }

  // Mouse event of the 'Like' action
  likeCloth = () => {
    let user = firebase.auth().currentUser;

    // If there's someone logged in, they can like/unlike clothes
    if(user) {
      if(this.liked) { // If it was liked, removes the like from that clothing
        this.liked = false;
        document.getElementById("likeButton").innerHTML="Like!";
        document.getElementById("likeButton")
          .setAttribute('style', 'background-color: #1b7df5'); // blue
        // Updates the 'liked' state in the Realtime Database to 'Yes'
        firebase.database().ref(this.state.clothes.key).child('liked').set('No');
      } else { // Likes the clothing
          this.liked = true;
          document.getElementById("likeButton").innerHTML="Remove like!";
          document.getElementById("likeButton")
            .setAttribute('style', 'background-color: #b82312'); // red
          // Updates the 'liked' state in the Realtime Database to 'No'
          firebase.database().ref(this.state.clothes.key).child('liked').set('Yes');
        }
    } else { // No one is logged in
      console.log('Need to be logged in to like and unlike clothes!');
    }
  }

  render() {
    let clothes = this.state.clothes;
    if(!clothes) {
       return <h2>No clothing specified</h2>
    } else {
        return (
          <div className="ListContainer">
            <div className="SelectionContainer">
              <div className="yourItem ListContainer">
                <div className="clothescont">
                  <img className="clothesimg" alt={clothes.title} src={clothes.image}/>
                </div>
                <div className="clothesdetails">
                  <h2 className="clothesheader">{clothes.title}</h2>
                  <h3 className="tagdetail">{"Categories of item"}</h3>
                  <ul>
                    <li className="tagdetail">{"Brand: " + clothes.brand}</li>
                    <li className="tagdetail">{"Color: " + clothes.color}</li>
                    <li className="tagdetail">{"Type: " + clothes.type}</li>
                    <li className="tagdetail">{"Liked: " + clothes.liked}</li>
                  </ul>
                  <h4 className="tagdetail">Like this item?</h4>
                  <button id="likeButton" className="likeButton additional" onClick={this.likeCloth}>
                    Like!
                  </button>
                  <p className="contactus">P.S. You need to be logged in to like an item!</p>
                  <p className="contactus">This way, you can keep track of your favorite looks anytime you revisit your clothes :)</p>
                </div>
              </div>
              <div className="yourItem">
                <h2 className="additional">{"Find an additional item"}</h2>
                <ClothesCard />
              </div>
            </div>
          </div>
        );
      }
  }
}

export default DetailPage;

import axios from "axios";

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

axios
  .get("https://api.github.com/users/Jtamedrano")
  .then((res) => {
    Card(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];
axios.get("https://api.github.com/users/dustinmyers/followers").then((res) => {
  res.data
    .filter((_, i) => {
      return i < 5;
    })
    .forEach((e) => {
      axios.get(e.url).then((user) => {
        followersArray.push(user.data);
        Card(user.data);
      });
    });
});

console.log(followersArray);
/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

const Card = (props) => {
  const card = document.createElement("div");
  card.classList.add("card");
  const cardImg = document.createElement("img");
  cardImg.src = props.avatar_url;
  cardImg.alt = "Git Profile Pic";
  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");

  const cardName = document.createElement("h3");
  cardName.classList.add("name");
  cardName.textContent = props.name;
  const cardUserName = document.createElement("p");
  cardUserName.classList.add("username");
  cardUserName.textContent = props.login;
  const cardLocation = document.createElement("p");
  cardLocation.textContent = "Location: " + props.location;
  const cardProfile = document.createElement("p");
  const cardProfileAnchor = document.createElement("a");
  cardProfileAnchor.href = props.html_url;
  cardProfileAnchor.textContent = props.html_url;
  cardProfile.textContent = "Profile: ";
  cardProfile.appendChild(cardProfileAnchor);
  const cardFollowers = document.createElement("p");
  cardFollowers.textContent = "Followers: " + props.followers;
  const cardFollowing = document.createElement("p");
  cardFollowing.textContent = "Following: " + props.following;
  const cardBio = document.createElement("p");
  cardBio.textContent = "Bio: " + props.bio;

  cardInfo.appendChild(cardName);
  cardInfo.appendChild(cardUserName);
  cardInfo.appendChild(cardLocation);
  cardInfo.appendChild(cardProfile);
  cardInfo.appendChild(cardFollowers);
  cardInfo.appendChild(cardFollowing);
  cardInfo.appendChild(cardBio);

  card.appendChild(cardImg);
  card.appendChild(cardInfo);

  document.querySelector(".cards").appendChild(card);
};

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

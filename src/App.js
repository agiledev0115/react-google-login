import React from 'react';
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { signInWithGoogle } from "./Firebase";

// Getting a current user
//   const auth = getAuth();
//   const user = auth.currentUser;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.logoutHandler = this.logoutHandler.bind(this);
    this.userAuthHandler = this.userAuthHandler.bind(this);
    this.state = {
      loginUser: null,
      token: "null",
    };
  }

  async sha256(text){
    const uint8  = new TextEncoder().encode(text)
    const digest = await crypto.subtle.digest('SHA-256', uint8)
    return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('')
  }
  
  async userAuthHandler(user) {
    if (user) {
      const token = await user.getIdToken();
      const hash = await this.sha256(token) // We store hash of token.
      this.setState({
        loginUser: user,
        token: hash,
      });
    } else {
      this.setState({
        loginUser: null,
        token: null
      });
    }
  }

  componentDidMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, this.userAuthHandler);
  }

  logoutHandler() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.setState({loginUser: null});
    }).catch((error) => {
        console.log(error);
    });
  }

  render() {
    const loginImageUrl = process.env.PUBLIC_URL + "/btn_google_signin_light_normal_web.png";
    var element;
    if (this.state.loginUser) {
      const userName = this.state.loginUser.displayName;
      element = (
        <>
        <button onClick={this.logoutHandler}>Logout</button>
        <h1>Welcome, {userName}!</h1>
        <p>Your access token: {this.state.token}</p>
        </>
      );
    } else {
      element = (
        <>
        <input type="image" alt="Sign in with Google"
          onClick={signInWithGoogle} src={loginImageUrl} />
        </>
      );
    }

    return (
      <div className="App">{element}</div>
    );
  }
}

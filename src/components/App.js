import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { auth } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Loading..."
      )}
      <footer>&copy; Twitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;

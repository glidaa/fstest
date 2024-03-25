import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as appActions from "../actions/app";
import * as appSettingsActions from "../actions/appSettings";
import { API, Amplify } from 'aws-amplify';
import awsExports from "../aws-exports"; // Assuming this contains your Amplify configuration
import { awsmobile } from './aws-sdk-config'; // Import your AWS SDK configuration
import store from "../store";
import isOnline from "../utils/isOnline";
import AuthFlow from "./AuthFlow";
import Home from "./Home";
import Router, { addRouteComponent } from "./Router";
 import { AWS } from './aws-sdk-config';

// Adding routes
addRouteComponent("Home", Home);
addRouteComponent("AuthFlow", AuthFlow);

// Unified AWS Amplify Configuration
Amplify.configure({
  ...awsExports, // Spread in awsExports configurations
  Auth: {
    // Overrides for Auth, if different from aws-exports.js
    region: awsmobile.aws_cognito_region,
    userPoolId: awsmobile.aws_user_pools_id,
    userPoolWebClientId: awsmobile.aws_user_pools_web_client_id,
    identityPoolId: awsmobile.aws_cognito_identity_pool_id,
  },
  // Include other AWS service configurations here as needed
});

// Assuming aws-sdk-config.js exports AWS after configuring it


// Example AWS SDK usage
// Ensure AWS SDK is configured before making any AWS service requests.
// const s3 = new AWS.S3();
// s3.listBuckets((err, data) => {
//   if (err) console.log(err, err.stack); // an error occurred
//   else console.log(data); // successful response
// });





const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.appSettings.theme);
  const isDarkMode = useSelector((state) => state.appSettings.isDarkMode);

  const fetchAppSettings = () => {
    const fetchedSettings = window.localStorage.getItem("appSettings");
    if (fetchedSettings) {
      dispatch(
        appSettingsActions.importAppSettings(JSON.parse(fetchedSettings))
      );
    }
  };

  const checkReloadAbility = (e) => {
    if (API.mutationQueue.length > 0) {
      e.returnValue =
        "Dude, are you sure you want to leave? Think of the kittens!";
    } else {
      delete e["returnValue"];
    }
  };

  const checkConnection = async () => {
    const result = await isOnline();
    const {
      app: { isOffline },
    } = store.getState();
    if (result && isOffline) {
      store.dispatch(appActions.setOffline(false));
    } else if (!result && !isOffline) {
      store.dispatch(appActions.setOffline(true));
    }
  };

  useEffect(() => {
    window.addEventListener("storage", fetchAppSettings);
    window.addEventListener("beforeunload", checkReloadAbility);
    checkConnection();
    window.addEventListener(
      "dragover",
      (e) => {
        e.preventDefault();
      },
      false
    );
    window.addEventListener(
      "drop",
      (e) => {
        e.preventDefault();
      },
      false
    );
    const checkConnectionInterval = setInterval(checkConnection, 3000);
    return () => {
      clearInterval(checkConnectionInterval);
      window.removeEventListener("storage", fetchAppSettings);
      window.removeEventListener("beforeunload", checkReloadAbility);
    };
  }, []);

  useEffect(() => {
    const availColors = {
      red: "#D20E1E",
      gold: "#E19D00",
      orange: "#E05307",
      green: "#0E6D0E",
      turquoise: "#009FAA",
      blue: "#0067C0",
      pink: "#CD007B",
      purple: "#4F4DCE",
      grey: "#586579",
      black: "#000000",
    };
    document.documentElement.className =
      theme + " " + (isDarkMode ? "dark" : "light");
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", isDarkMode ? "#272727" : availColors[theme]);
  }, [theme, isDarkMode]);

  return <Router />;
};

// export default App;

export default (App);

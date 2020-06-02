import React from "react";

import { withAuthenticator } from "aws-amplify-react-native";
import Welcome from "./Welcome";

const Login = withAuthenticator(Welcome, {
  signUpConfig: {
    hiddenDefaults: ["phone_number"],
  },
});

export default () => <Login />;

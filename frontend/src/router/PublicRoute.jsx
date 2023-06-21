import React from "react";
import { motion } from "framer-motion";
import { Route, Redirect } from "react-router-dom";
import * as authService from "@/auth";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authService.token.get() ? (
          <Redirect to="/" />
        ) : (
          <motion.div
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            exit={{ scale: 0 }}
          >
            <Component {...props} />
          </motion.div>
        )
      }
    />
  );
};

export default PublicRoute;

import React, { useEffect, useState } from "react";

//Helper to manage the resources to display text in the language of the user
import { resource } from "resource";

//Helper to verify connexion and manage the information received
import { connexionSearch } from "connexion";
import Home from "./Home";
import { useHistory } from "react-router";

//Helper to do fetch request
import { fetchData, dataToGet, methodType, type } from "fetchhelper";

export default function Main() {
  //Get the history of navigation to go to the homepage depending on the role of the user
  let history = useHistory();

  //State to wait the loading of the connexion verification
  const [load, loader] = useState(false);

  //Data required to get the authorized navigation depending on the role
  const [contentNavigation, setContentNavigation] = useState({
    pseudo: null,
    role: null,
    site: null,
  });

  //Request to get the resources depending the language of the user
  const resourceRequest = () => {
    fetchData(
      "Resources/" + process.env.REACT_APP_SITE_NAME + "/" + resource.lang,
      methodType.Get,
      null,
      {
        ...dataToGet,
        type: type.json,
        callback: (data) => {
          resource.load(data);
          loader(true);
        },
      },
      true,
      false
    );
  };

  //Function to define the condition to validate the connexion
  const condition = (dataConnexion) => {
    return (
      dataConnexion.pseudo !== "nc" &&
      dataConnexion.role !== "00000000-0000-0000-0000-000000000000"
    );
  };

  //Action to do if the connexion is a success
  const success = (dataConnexion, data, history) => {
    data.connected = true;
    data.pseudo = dataConnexion.pseudo;
    data.role = dataConnexion.role;
    data.token = dataConnexion.token;
    resource.lang = dataConnexion.language;
    //Search of the type of the role of the user
    fetchData(
      "Role/GetType?idrole=" + data.role,
      methodType.Get,
      null,
      {
        ...dataToGet,
        callback: (response) => {
          data.typeRole = response;
          resourceRequest(resource);
        },
        type: type.json,
      },
      true,
      false
    );
    //Data to get the authorized navigation
    setContentNavigation({
      ...{
        pseudo: data.pseudo,
        role: data.role,
        site: process.env.REACT_APP_SITE_NAME,
      },
    });
    //Navigation to the homepage depending on the user
    if (history !== undefined) {
      history.push(dataConnexion.urlHome);
    }
  };
  //Action if the connexion fail
  //Redirect to the connexion page
  const fail = () => {
    window.location = "http://109.12.248.169:8080/Connexion/";
  };

  //Request to check the connexion
  const connectRequest = (callback) => {
    const toget = { ...dataToGet, callback: callback };
    fetchData("PseudoSession", methodType.Get, null, toget, false, true);
  };

  //Function of the connexion module to combine the previous elements
  const connect = () => {
    connexionSearch(connectRequest, condition, success, fail, history);
  };

  //Call the function only once at the start
  useEffect(() => {
    connect();
  }, []);

  //If connexion is validated, we display the Home component
  return (
    <div>{load ? <Home contentNavigation={contentNavigation} /> : null}</div>
  );
}

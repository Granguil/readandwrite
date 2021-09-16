import React from "react";
import { resource } from "resource";
import { dataConnect, CheckConnexion, roleTypeList } from "connexion";
import Header, { connectByDefault, titleByDefault } from "header";
import { NavigationDisplay, NavigationRouterExact } from "navigation";
import ToastersDisplay from "toaster";
import { fetchData, dataToGet, methodType, dataToSend } from "fetchhelper";

import style from "./style.module.css";
import UserReader from "./user/UserReader";
import AdminReader from "./admin/AdminReader";
import AdminImport from "./admin/AdminImport";
import AdminWriting from "./admin/AdminWriting";
import AdminHome from "./admin/AdminHome";
import UserHome from "./user/UserHome";

export default function Home({ contentNavigation }) {
  const connectHeader = { ...connectByDefault };
  connectHeader.connected = dataConnect.connected;
  connectHeader.connected = dataConnect.pseudo;
  const titleCustom = {
    ...titleByDefault,
    title:
      resource.list !== undefined ? resource.list.title : "Site de Granguil",
    subtitle:
      resource.list !== undefined
        ? resource.list.subtitle
        : "Ecrits de Granguil",
  };
  const contactCustom = [];
  contactCustom.push(
    {
      type: "Text",
      text:
        resource.list !== undefined ? resource.list.contactTitle : "Contact",
    },
    {
      type: "Text",
      text:
        resource.list !== undefined
          ? resource.list.creatorTitle
          : "Créer et Administrer par Granguil",
    },
    {
      type: "Link",
      text:
        resource.list !== undefined
          ? resource.list.contactLink
          : "www.sitedegranguil.fr",
      link:
        resource.list !== undefined
          ? resource.list.contactLink
          : "www.sitedegranguil.fr",
    },
    {
      type: "Link",
      text:
        resource.list !== undefined
          ? resource.list.contactMail
          : "sitedegranguil@gmail.com",
      link:
        resource.list !== undefined
          ? resource.list.contactMail
          : "sitedegranguil@gmail.com",
    }
  );

  const navigationRequest = (contentObj, callbackNav) => {
    const ds = { ...dataToSend, content: contentObj };
    const dg = { ...dataToGet, callback: (data) => callbackNav(data) };
    fetchData("Navigation/Get", methodType.Post, ds, dg, true, false);
  };

  return (
    <div>
      <Header
        contact={contactCustom}
        title={titleCustom}
        connect={connectHeader}
      />
      <NavigationDisplay
        fetchRequest={navigationRequest}
        contentObject={contentNavigation}
        resources={resource.list !== undefined ? resource.list.nav : {}}
      />
      <div className={style.body}>
        <NavigationRouterExact link="/Accueil/User/Home">
          <CheckConnexion bool={true} role={roleTypeList.USER}>
            <UserHome />
          </CheckConnexion>
        </NavigationRouterExact>
        <NavigationRouterExact link="/Accueil/Admin/Home">
          <CheckConnexion bool={true} role={roleTypeList.MANAGER}>
            <AdminHome />
          </CheckConnexion>
        </NavigationRouterExact>
        <NavigationRouterExact link="/Accueil/Action/Reading">
          <CheckConnexion bool={true} role={roleTypeList.USER}>
            <UserReader />
          </CheckConnexion>
        </NavigationRouterExact>
        <NavigationRouterExact link="/Accueil/Action/Reading">
          <CheckConnexion bool={true} role={roleTypeList.MANAGER}>
            <AdminReader />
          </CheckConnexion>
        </NavigationRouterExact>
        <NavigationRouterExact link="/Accueil/Action/Import">
          <CheckConnexion bool={true} role={roleTypeList.MANAGER}>
            <AdminImport />
          </CheckConnexion>
        </NavigationRouterExact>
        <NavigationRouterExact link="/Accueil/Action/Writing">
          <CheckConnexion bool={true} role={roleTypeList.MANAGER}>
            <AdminWriting />
          </CheckConnexion>
        </NavigationRouterExact>
      </div>
      <ToastersDisplay />
    </div>
  );
}

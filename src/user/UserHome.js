//Helper to display cards
import { SimpleCard } from "card";
import { dataConnect } from "connexion";
import React from "react";
import Style from "./../carte.module.css";
import resource from "resource";

export default function UserHome() {
  return (
    <div className={Style.displayCards}>
      <SimpleCard>
        <h2 className={Style.internH}>
          {resource.list.Welcome} {dataConnect.pseudo},
        </h2>
        <p className={Style.internB}>{resource.list.UserHome}</p>
      </SimpleCard>
    </div>
  );
}

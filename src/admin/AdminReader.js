import React, { useState, useEffect } from "react";
import { Explorer } from "explorer";
import { ButtonCustom, ButtonTypeList } from "button";
import { NewToaster, positionToaster, colorToaster } from "toaster";
import {
  fetchData,
  dataToGet,
  methodType,
  dataToSend,
  type,
} from "fetchhelper";
import { resource } from "resource";
import { dataConnect } from "connexion";
import style from "./admin.module.css";
import { explorerConfig } from "../explorerConfig";

function AdminReader() {
  const [reload, setReload] = useState(false);
  const [numberCard, setNumberCard] = useState(0);
  const [displayAll, setDisplayAll] = useState(false);
  const [displayParam, setDisplayParam] = useState(false);
  const [withInfo, setWithInfo] = useState(false);
  const [infoPopup, setInfoPopup] = useState(false);
  const [loadParam, setLoadParam] = useState(false);
  const [loadAll, setLoadAll] = useState(false);
  const [withInfoParam, setWithInfoParam] = useState(false);
  const [infoPopupParam, setInfoPopupParam] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    explorerConfig.load.config(
      setDisplayAll,
      setLoadAll,
      setNumberCard,
      setWithInfo,
      setInfoPopup
    );
  }, []);
  return (
    <div className={style.explorerBody}>
      <div className={style.enveloppe}>
        <div className={style.config}>
          <div>Nom</div>
          <div>Explorer</div>
        </div>
        <div className={style.config}>
          <div>Nombre de Cartes</div>
          <div>{numberCard}</div>
        </div>
        <div className={style.config}>
          <div>Charger Tout</div>
          <div>
            <input
              className={style.input}
              type="checkbox"
              checked={loadAll}
              disabled={!loading ? true : false}
              onChange={(e) => {
                setLoadAll(e.target.checked);

                console.log("LA : " + loadAll);
              }}
            />
          </div>
        </div>
        <div className={style.config}>
          <div>Afficher Tout</div>
          <div>
            <input
              className={style.input}
              type="checkbox"
              checked={displayAll}
              disabled={!loading ? true : false}
              onChange={(e) => {
                setDisplayAll(e.target.checked);

                console.log("DA : " + displayAll);
              }}
            />
          </div>
        </div>
        <div className={style.config}>
          <div>Avec Info</div>
          <div>
            <input
              className={style.input}
              type="checkbox"
              checked={withInfo}
              disabled={!loading ? true : false}
              onChange={(e) => {
                setWithInfo(e.target.checked);
              }}
            />
          </div>
        </div>
        <div className={style.config}>
          <div>Info dans une Popup</div>
          <div>
            <input
              className={style.input}
              type="checkbox"
              checked={infoPopup}
              disabled={!loading ? true : false}
              onChange={(e) => {
                setInfoPopup(e.target.checked);
              }}
            />
          </div>
        </div>
        <div className={style.config}>
          {!loading ? (
            <ButtonCustom
              text={"Modifier"}
              type={ButtonTypeList.edit}
              callback={() => {
                setLoading(true);
              }}
            />
          ) : (
            <ButtonCustom
              text={"Appliquer"}
              callback={() => {
                setDisplayParam(displayAll);
                setLoadParam(loadAll);
                setInfoPopupParam(infoPopup);
                setWithInfoParam(withInfo);
                setLoading(false);
              }}
              type={ButtonTypeList.create}
            />
          )}
        </div>
      </div>
      <div>
        {!loading ? (
          <div className={style.buttonCenter}>
            <ButtonCustom
              text={"Sauver"}
              type={ButtonTypeList.create}
              callback={() => {
                fetchData(
                  "/Explorer/SetConfig",
                  methodType.Post,
                  {
                    ...dataToSend,
                    type: type.json,
                    content: {
                      name: "explorer",
                      displayAll: displayParam,
                      loadAll: loadParam,
                      withInfo: withInfoParam,
                      infoPopup: infoPopupParam,
                    },
                  },
                  {
                    ...dataToGet,
                    type: type.json,
                    callback: (data) => {
                      NewToaster({
                        title: "Sauvegarde",
                        position: positionToaster.left,
                        color: colorToaster.info,
                        text: data.message,
                      });
                    },
                  },
                  true,
                  false
                );
              }}
            />
          </div>
        ) : null}
      </div>
      <div className={style.body}>
        {!loading ? (
          <Explorer
            load={(f) => explorerConfig.load.allData(f)}
            loadElementsById={(data, niveau, id) =>
              explorerConfig.load.byId(data, niveau, id)
            }
            userId={dataConnect.pseudo}
            createBookMark={(data) => explorerConfig.bookmark.create(data)}
            loadBookMark={(data) => explorerConfig.bookmark.load(data)}
            deleteBookMark={(id) =>
              explorerConfig.bookmark.delete(id, setReload, reload)
            }
            buttonsList={explorerConfig.componant.buttonsList}
            readValidated={(data) => explorerConfig.bookmark.markAsRead(data)}
            resources={
              resource.list !== undefined ? resource.list.explorer : {}
            }
            displayAll={displayParam}
            loadAll={loadParam}
            numberCard={numberCard}
            withInfo={withInfoParam}
            infoPopup={infoPopupParam}
            Popup={(info, callback) =>
              explorerConfig.componant.popup(info, callback)
            }
            ButtonReturn={(setter) =>
              explorerConfig.componant.returnButton(setter)
            }
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default AdminReader;

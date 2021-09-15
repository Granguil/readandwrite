import React, { useState, useEffect } from "react";
import { Explorer } from "explorer";
import { resource } from "resource";
import { dataConnect } from "connexion";
import { explorerConfig } from "../explorerConfig";

function UserReader() {
  const [reload, setReload] = useState(false);
  const [numberCard, setNumberCard] = useState(0);
  const [displayAll, setDisplayAll] = useState(false);
  const [loadAll, setLoadAll] = useState(false);
  const [withInfo, setWithInfo] = useState(false);
  const [infoPopup, setInfoPopup] = useState(false);
  const [getConfig, setConfig] = useState(false);
  useEffect(() => {
    explorerConfig.load.config(
      setDisplayAll,
      setLoadAll,
      setNumberCard,
      setWithInfo,
      setInfoPopup,
      setConfig
    );
  }, []);

  return (
    <div>
      {getConfig ? (
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
          resources={resource.list !== undefined ? resource.list.explorer : {}}
          displayAll={displayAll}
          loadAll={loadAll}
          numberCard={numberCard}
          withInfo={withInfo}
          infoPopup={infoPopup}
          Popup={(info, callback) =>
            explorerConfig.componant.popup(info, callback)
          }
          ButtonReturn={(setter) =>
            explorerConfig.componant.returnButton(setter)
          }
        />
      ) : null}
    </div>
  );
}

export default UserReader;

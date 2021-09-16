import React, { useState, useEffect } from "react";

//Helper to display  an explorer to navigate in the tree of data
import { Explorer } from "explorer";
import { resource } from "resource";
import { dataConnect } from "connexion";
import { explorerConfig } from "../explorerConfig";

function UserReader() {
  //State to reload after a delete of bookmark
  const [reload, setReload] = useState(false);

  //States of the data can be configured
  const [numberCard, setNumberCard] = useState(0);
  const [displayAll, setDisplayAll] = useState(false);
  const [loadAll, setLoadAll] = useState(false);
  const [withInfo, setWithInfo] = useState(false);
  const [infoPopup, setInfoPopup] = useState(false);

  //State to wait before to get the recorded configuration
  const [getConfig, setConfig] = useState(false);

  //Get the configuration of the explorer (centralized in another file)
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

import {
  fetchData,
  methodType,
  dataToGet,
  type,
  dataToSend,
} from "fetchhelper";
import { dataConnect } from "connexion";
import { NewToaster, positionToaster, colorToaster } from "toaster";

//Helper to generate popup
import { Popup } from "popup";

//Helper to generate buttons
import { ButtonCustom, ButtonTypeList } from "button";
import resource from "resource";

export const explorerConfig = {
  //Function to load data to display in the explorer
  load: {
    config: (
      setDisplayAll,
      setLoadAll,
      setNumberCard,
      setWithInfo,
      setInfoPopup,
      setConfig
    ) => {
      //Get the config of the explorer
      fetchData(
        "/Explorer/GetConfig/explorer",
        methodType.Get,
        null,
        {
          ...dataToGet,
          type: type.json,
          callback: (data) => {
            setDisplayAll(data.displayAll);
            setLoadAll(data.loadAll);
            setNumberCard(data.cardNumber);
            setWithInfo(data.withInfo);
            setInfoPopup(data.infoPopup);
            if (setConfig !== undefined) {
              setConfig(true);
            }
          },
        },
        true,
        false
      );
    },
    //Function to load all data (use if the function loadAll is active)
    allData: (callbackExplorer) => {
      fetchData(
        "/Read/All/" + dataConnect.pseudo,
        methodType.Get,
        null,
        { ...dataToGet, callback: (data) => callbackExplorer(data) },
        true,
        false
      );
    },
    //Function to load data by the id of parent (use if the function loadAll is not active)
    byId: (callbackExplorer, niveau, id) => {
      fetchData(
        "/Read/" + niveau + "/" + id + "/" + dataConnect.pseudo,
        methodType.Get,
        null,
        { ...dataToGet, callback: (data) => callbackExplorer(data) },
        true,
        false
      );
    },
  },
  //FUnctions to manage bookmarks and mark as read
  bookmark: {
    load: (setBookMark) => {
      fetchData(
        "/Read/GetBookMarks/" + dataConnect.pseudo,
        methodType.Get,
        null,
        { ...dataToGet, callback: (data) => setBookMark(data) },
        true,
        false
      );
    },
    create: (data) => {
      fetchData(
        "/Read/AddBookMark",
        methodType.Post,
        { ...dataToSend, content: data, type: type.json },
        {
          ...dataToGet,
          callback: (bool) => {
            NewToaster({
              title: bool ? resource.list.success : resource.list.fail,
              position: positionToaster.left,
              color: bool ? colorToaster.success : colorToaster.error,
              text: bool
                ? resource.list.successCreation
                : resource.list.failCreation,
            });
          },
        },
        true,
        false
      );
    },
    markAsRead: (data) => {
      fetchData(
        "/Read/ReadByUser",
        methodType.Post,
        { ...dataToSend, content: data, type: type.json },
        {
          ...dataToGet,
          callback: (bool) => {
            bool
              ? NewToaster({
                  title: resource.list.success,
                  position: positionToaster.left,
                  color: colorToaster.success,
                  text: resource.list.markAsRead,
                })
              : NewToaster({
                  title: resource.list.fail,
                  position: positionToaster.left,
                  color: colorToaster.error,
                  text: resource.list.failMarkAsRead,
                });
          },
        },
        true,
        false
      );
    },
    delete: (id, setReload, reload) => {
      fetchData(
        "/Read/DeleteBookMark",
        methodType.Post,
        { ...dataToSend, content: { id }, type: type.json },
        {
          ...dataToGet,
          callback: () => {
            NewToaster({
              title: resource.list.delete,
              position: positionToaster.left,
              color: colorToaster.error,
              text: resource.list.deleteBookmark,
            });
            setReload(!reload);
          },
        },
        true,
        false
      );
    },
  },
  //Buttons and Popup display in explorer (BM for bookmark)
  componant: {
    buttonsList: {
      createBM: (text, callback) => {
        return (
          <ButtonCustom
            text={text}
            callback={(data) => callback(data)}
            type={ButtonTypeList.create}
          ></ButtonCustom>
        );
      },
      updateBM: (text, callback) => {
        return (
          <ButtonCustom
            text={text}
            callback={(data) => callback(data)}
            type={ButtonTypeList.edit}
          ></ButtonCustom>
        );
      },
      deleteBM: (text, callback) => {
        return (
          <ButtonCustom
            text={text}
            callback={(data) => callback(data)}
            type={ButtonTypeList.deleteItem}
          ></ButtonCustom>
        );
      },
      //Mark as read
      readValidated: (text, callback) => {
        return (
          <ButtonCustom
            text={text}
            callback={(data) => callback(data)}
            type={ButtonTypeList.create}
          ></ButtonCustom>
        );
      },
    },
    popup: (info, callback) => {
      let buttons = [];
      buttons.push(() => (
        <ButtonCustom
          text={resource.list.close}
          callback={() => callback()}
          type={ButtonTypeList.back}
        />
      ));
      return <Popup text={info} type={"Afficher"} buttons={buttons} />;
    },
    returnButton: (setter) => {
      return (
        <ButtonCustom
          text={resource.list.close}
          callback={() => setter()}
          type={ButtonTypeList.back}
        />
      );
    },
  },
};

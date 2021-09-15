import {
  fetchData,
  methodType,
  dataToGet,
  type,
  dataToSend,
} from "fetchhelper";
import { dataConnect } from "connexion";
import { NewToaster, positionToaster, colorToaster } from "toaster";
import { Popup } from "popup";
import { ButtonCustom, ButtonTypeList } from "button";

export const explorerConfig = {
  load: {
    config: (
      setDisplayAll,
      setLoadAll,
      setNumberCard,
      setWithInfo,
      setInfoPopup,
      setConfig
    ) => {
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
              title: bool ? "Success" : "Fail",
              position: positionToaster.left,
              color: bool ? colorToaster.success : colorToaster.error,
              text: bool ? "Success Creation" : "Creation Failed",
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
                  title: "Success",
                  position: positionToaster.left,
                  color: colorToaster.success,
                  text: "Scene marked as read",
                })
              : NewToaster({
                  title: "Fail",
                  position: positionToaster.left,
                  color: colorToaster.error,
                  text: "Fail to mark scene",
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
              title: "Delete",
              position: positionToaster.left,
              color: colorToaster.error,
              text: "BookMark Deleted",
            });
            setReload(!reload);
          },
        },
        true,
        false
      );
    },
  },
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
          text={"Fermer"}
          callback={() => callback()}
          type={ButtonTypeList.back}
        />
      ));
      return <Popup text={info} type={"Afficher"} buttons={buttons} />;
    },
    returnButton: (setter) => {
      return (
        <ButtonCustom
          text={"Fermer"}
          callback={() => setter()}
          type={ButtonTypeList.back}
        />
      );
    },
  },
};

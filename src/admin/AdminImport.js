import React from "react";
import style from "./../carte.module.css";
import { FormCard, cardByDefault } from "card";
import { ButtonCustom, ButtonTypeList } from "button";
import {
  dataToGet,
  dataToSend,
  fetchData,
  methodType,
  type,
} from "fetchhelper";
import { NewToaster, positionToaster, colorToaster } from "toaster";

export default function adminImport() {
  const cardText = {
    ...cardByDefault,
    submit: (e) => {
      e.preventDefault();

      fetchData(
        "Read/NewText",
        methodType.Post,
        { ...dataToSend, content: new FormData(e.target), type: null },
        {
          ...dataToGet,
          type: type.json,
          callback: (data) => {
            NewToaster({
              title: "Import New Text",
              position: positionToaster.left,
              color: colorToaster.info,
              text: data.message,
            });
          },
        },
        true,
        false
      );
    },
  };
  const cardUpdateText = {
    ...cardByDefault,
    submit: (e) => {
      e.preventDefault();

      fetchData(
        "Read/UpdateText",
        methodType.Post,
        { ...dataToSend, content: new FormData(e.target), type: null },
        {
          ...dataToGet,
          type: type.json,
          callback: (data) => {
            NewToaster({
              title: "Update Text",
              position: positionToaster.left,
              color: colorToaster.info,
              text: data.message,
            });
          },
        },
        true,
        false
      );
    },
  };
  const cardChapter = {
    ...cardByDefault,
    submit: (e) => {
      e.preventDefault();
      fetchData(
        "Read/NewChapter",
        methodType.Post,
        { ...dataToSend, content: new FormData(e.target), type: null },
        {
          ...dataToGet,
          type: type.json,
          callback: (data) => {
            NewToaster({
              title: "New Chapter",
              position: positionToaster.left,
              color: colorToaster.info,
              text: data.message,
            });
          },
        },
        true,
        false
      );
    },
  };
  const cardUpdateChapter = {
    ...cardByDefault,
    submit: (e) => {
      e.preventDefault();
      fetchData(
        "Read/UpdateChapter",
        methodType.Post,
        { ...dataToSend, content: new FormData(e.target), type: null },
        {
          ...dataToGet,
          type: type.json,
          callback: (data) => {
            NewToaster({
              title: "Update Chapter",
              position: positionToaster.left,
              color: colorToaster.info,
              text: data.message,
            });
          },
        },
        true,
        false
      );
    },
  };
  return (
    <div className={style.displayCards + " " + style.width}>
      <FormCard card={cardText}>
        <div className={style.envInput}>
          <h3>New Text</h3>
          <select name="NewUniverse">
            <option value="1">New Universe</option>
            <option value="0">Existing Universe</option>
          </select>
          <label htmlFor={"NameNU"}>Name of the Word File</label>
          <input id="NameNU" type="text" name="nameFile" />
          <label htmlFor={"FileNU"}>Word File to Import</label>
          <input id="FileNU" type="file" name="newText" accept=".docx" />
          <div className={style.center}>
            <ButtonCustom
              text={"Validate"}
              callback={() => {}}
              type={ButtonTypeList.create}
            />
          </div>
        </div>
      </FormCard>
      <FormCard card={cardUpdateText}>
        <div className={style.envInput}>
          <h3>Update Text</h3>
          <label htmlFor={"NameUU"}>Name of the Word File</label>
          <input id="NameUU" type="text" name="nameFile" />
          <label htmlFor={"UniverseUU"}>Universe</label>
          <input id="UniverseUU" type="text" name="universe" />
          <label htmlFor={"NameUU"}>Text Name</label>
          <input id="NameUU" type="text" name="textName" />
          <label htmlFor={"FileUU"}>Word File to Import</label>
          <input id="FileUU" type="file" name="newText" accept=".docx" />
          <div className={style.center}>
            <ButtonCustom
              text={"Validate"}
              callback={() => {}}
              type={ButtonTypeList.create}
            />
          </div>
        </div>
      </FormCard>
      <FormCard card={cardChapter}>
        <div className={style.envInput}>
          <h3>Add Chapter</h3>
          <label htmlFor={"NameAC"}>Name of the Word File</label>
          <input id="NameAC" type="text" name="nameFile" />
          <label htmlFor={"UniverseAC"}>Universe</label>
          <input id="UniverseAC" type="text" name="universe" />
          <label htmlFor={"NameAC"}>Text Name</label>
          <input id="NameAC" type="text" name="textName" />
          <label htmlFor={"FileAC"}>Word File to Import</label>
          <input id="FileAC" type="file" name="newText" accept=".docx" />
          <div className={style.center}>
            <ButtonCustom
              text={"Validate"}
              callback={() => {}}
              type={ButtonTypeList.create}
            />
          </div>
        </div>
      </FormCard>
      <FormCard card={cardUpdateChapter}>
        <div className={style.envInput}>
          <h3>Update Chapter</h3>
          <label htmlFor={"NameUC"}>Name of the Word File</label>
          <input id="NameUC" type="text" name="nameFile" />
          <label htmlFor={"UniverseUC"}>Universe</label>
          <input id="UniverseUC" type="text" name="universe" />
          <label htmlFor={"NameUC"}>Text Name</label>
          <input id="NameUC" type="text" name="textName" />
          <label htmlFor={"NumeroUC"}>Chapter Number</label>
          <input id="NumeroUC" type="number" name="numero" />
          <label htmlFor={"FileUC"}>Word File to Import</label>
          <input id="FileUC" type="file" name="newText" accept=".docx" />
          <div className={style.center}>
            <ButtonCustom
              text={"Validate"}
              callback={() => {}}
              type={ButtonTypeList.create}
            />
          </div>
        </div>
      </FormCard>
    </div>
  );
}

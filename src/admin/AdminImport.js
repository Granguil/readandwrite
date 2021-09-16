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
import resource from "resource";

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
              title: resource.list.importNewText,
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
              title: resource.list.updateText,
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
              title: resource.list.newChapter,
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
              title: resource.list.updateChapter,
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
            <option value="1">{resource.list.newUniverse}</option>
            <option value="0">{resource.list.existingUniverse}</option>
          </select>
          <label htmlFor={"NameNU"}>{resource.list.nameWordFile}</label>
          <input id="NameNU" type="text" name="nameFile" />
          <label htmlFor={"FileNU"}>{resource.list.wordFileToImport}</label>
          <input id="FileNU" type="file" name="newText" accept=".docx" />
          <div className={style.center}>
            <ButtonCustom
              text={resource.list.validate}
              callback={() => {}}
              type={ButtonTypeList.create}
            />
          </div>
        </div>
      </FormCard>
      <FormCard card={cardUpdateText}>
        <div className={style.envInput}>
          <h3>Update Text</h3>
          <label htmlFor={"NameUU"}>{resource.list.nameWordFile}</label>
          <input id="NameUU" type="text" name="nameFile" />
          <label htmlFor={"UniverseUU"}>{resource.list.universe}</label>
          <input id="UniverseUU" type="text" name="universe" />
          <label htmlFor={"NameUU"}>{resource.list.textName}</label>
          <input id="NameUU" type="text" name="textName" />
          <label htmlFor={"FileUU"}>{resource.list.wordFileToImport}</label>
          <input id="FileUU" type="file" name="newText" accept=".docx" />
          <div className={style.center}>
            <ButtonCustom
              text={resource.list.validate}
              callback={() => {}}
              type={ButtonTypeList.create}
            />
          </div>
        </div>
      </FormCard>
      <FormCard card={cardChapter}>
        <div className={style.envInput}>
          <h3>Add Chapter</h3>
          <label htmlFor={"NameAC"}>{resource.list.nameWordFile}</label>
          <input id="NameAC" type="text" name="nameFile" />
          <label htmlFor={"UniverseAC"}>{resource.list.universe}</label>
          <input id="UniverseAC" type="text" name="universe" />
          <label htmlFor={"NameAC"}>{resource.list.textName}</label>
          <input id="NameAC" type="text" name="textName" />
          <label htmlFor={"FileAC"}>{resource.list.wordFileToImport}</label>
          <input id="FileAC" type="file" name="newText" accept=".docx" />
          <div className={style.center}>
            <ButtonCustom
              text={resource.list.validate}
              callback={() => {}}
              type={ButtonTypeList.create}
            />
          </div>
        </div>
      </FormCard>
      <FormCard card={cardUpdateChapter}>
        <div className={style.envInput}>
          <h3>Update Chapter</h3>
          <label htmlFor={"NameUC"}>{resource.list.nameWordFile}</label>
          <input id="NameUC" type="text" name="nameFile" />
          <label htmlFor={"UniverseUC"}>{resource.list.universe}</label>
          <input id="UniverseUC" type="text" name="universe" />
          <label htmlFor={"NameUC"}>{resource.list.textName}</label>
          <input id="NameUC" type="text" name="textName" />
          <label htmlFor={"NumeroUC"}>{resource.list.numChapter}</label>
          <input id="NumeroUC" type="number" name="numero" />
          <label htmlFor={"FileUC"}>{resource.list.wordFileToImport}</label>
          <input id="FileUC" type="file" name="newText" accept=".docx" />
          <div className={style.center}>
            <ButtonCustom
              text={resource.list.validate}
              callback={() => {}}
              type={ButtonTypeList.create}
            />
          </div>
        </div>
      </FormCard>
    </div>
  );
}

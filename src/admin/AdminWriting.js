import { ButtonCustom, ButtonTypeList } from "button";
import { SimpleCard } from "card";
import { dataToGet, dataToSend, fetchData, methodType } from "fetchhelper";
import { PopupChildren } from "popup";
import React, { useEffect, useState } from "react";
import resource from "resource";
import { NewToaster, positionToaster, colorToaster } from "toaster";
import Style from "./../carte.module.css";

export default function AdminWriting() {
  const [savingBlock, setBlock] = useState({
    parent: null,
    blocks: [{ content: "", order: -1, id: null, status: "NONE" }],
  });
  const [displayPopup, setDisplayPopup] = useState(false);
  const [modifyBlock, setModifyBlock] = useState(-1);
  const [modifyText, setModifyText] = useState("");
  const [orderOfNewBlock, setOrderOfNewBlock] = useState(1);
  const [numberOfBlock, setNumberOfBlock] = useState(0);
  const [dataDisplay, setDataDisplay] = useState({
    universe: [],
    book: [],
    chapter: [],
    scene: [],
    block: [],
  });
  const [data, setData] = useState({
    universe: [],
    book: [],
    chapter: [],
    scene: [],
    block: [],
  });
  useEffect(() => {
    load();
  }, []);
  const load = () => {
    fetchData(
      "/Read/ElementsConfig",
      methodType.Get,
      null,
      {
        ...dataToGet,
        callback: (dataGet) => {
          let book, chapter, scene;
          if (dataGet.universe.length > 0) {
            book = dataGet.books.filter(
              (x) => x.parent === dataGet.universe[0].id
            );
            if (book.length > 0) {
              chapter = dataGet.chapters
                .sort((x, y) => x.numero - y.numero)
                .filter((x) => x.parent === book[0].id);
              if (chapter.length > 0) {
                scene = dataGet.scenes
                  .sort((x, y) => x.numero - y.numero)
                  .filter((x) => x.parent === chapter[0].id);
                if (scene.length > 0) {
                  fetchData(
                    "/Read/BlocksForConfig/" + scene[0].id,
                    methodType.Get,
                    null,
                    {
                      ...dataToGet,
                      callback: (dataBlock) => {
                        setData({
                          ...data,
                          universe: dataGet.universe,
                          book: dataGet.books,
                          chapter: dataGet.chapters,
                          scene: dataGet.scenes,
                          block: dataBlock.blocks,
                        });

                        setDataDisplay({
                          ...dataDisplay,
                          universe: dataGet.universe,
                          book: book !== undefined ? book : [],
                          chapter: chapter !== undefined ? chapter : [],
                          scene: scene !== undefined ? scene : [],
                          block: dataBlock.blocks,
                        });
                        setNumberOfBlock(dataBlock.blocks.length);
                        const block = [];
                        for (let item of dataBlock.blocks) {
                          block.push({
                            order: item.order,
                            content: item.text,
                            id: item.id,
                            status: "NONE",
                          });
                        }
                        setBlock({
                          ...savingBlock,
                          parent: scene !== undefined ? scene[0].id : null,
                          blocks: [...block],
                        });
                      },
                    },
                    true,
                    false
                  );
                }
              }
            }
          }
        },
      },
      true,
      false
    );
  };
  const loadBlocks = (id, book, chapter, scene, niveau) => {
    fetchData(
      "/Read/BlocksForConfig/" + id,
      methodType.Get,
      null,
      {
        ...dataToGet,
        callback: (dataGet) => {
          setData({ ...data, block: dataGet.blocks });
          if (niveau !== undefined) {
            setDataDisplay({
              ...dataDisplay,
              book: niveau === 1 ? [] : book,
              chapter: niveau <= 2 ? [] : chapter,
              scene: niveau <= 3 ? [] : scene,
            });
            setDataDisplay({
              ...dataDisplay,
              block: dataGet.blocks,
              book: book,
              chapter: chapter,
              scene: scene,
            });
          } else {
            setDataDisplay({ ...dataDisplay, block: dataGet.blocks });
          }
          setNumberOfBlock(dataGet.blocks.length);
          const block = [];
          for (let item of dataGet.blocks) {
            block.push({
              order: item.order,
              content: item.text,
              id: item.id,
              status: "NONE",
            });
          }
          setBlock({
            ...savingBlock,
            parent: id,
            blocks: [...block],
          });
        },
      },
      true,
      false
    );
  };
  const selection = (niveau, id) => {
    let book, chapter, scene;
    let idSearch = id;
    if (niveau === 1) {
      book = data.book.filter((x) => x.parent === id);
      if (book.length > 0) {
        idSearch = book[0].id;
      }
    }
    if (niveau <= 2) {
      chapter = data.chapter
        .sort((x, y) => x.numero - y.numero)
        .filter((x) => x.parent === idSearch);
      if (chapter.length > 0) {
        idSearch = chapter[0].id;
      }
    }
    if (niveau <= 3) {
      scene = data.scene
        .sort((x, y) => x.numero - y.numero)
        .filter((x) => x.parent === idSearch);
      if (scene.length > 0) {
        idSearch = scene[0].id;
      }
    }

    if (niveau <= 4) {
      loadBlocks(
        idSearch,
        book !== undefined ? book : dataDisplay.book,
        chapter !== undefined ? chapter : dataDisplay.chapter,
        scene !== undefined ? scene : dataDisplay.scene,
        niveau
      );
    }
  };
  const saveBlocks = (publish, State) => {
    let sb = { ...savingBlock };
    let sbb = [...sb.blocks];
    console.log(State);
    if (State === "NEW") {
      for (let item of sbb) {
        if (item.order >= orderOfNewBlock) {
          item.order++;
        }
      }
      sbb.push({
        order: orderOfNewBlock,
        content: resource.list.newBlock,
        status: State,
      });
    } else if (State === "DELETE") {
      let itemToReplace = sbb.splice(
        sbb.findIndex((x) => x.order === modifyBlock),
        1
      );
      sbb.push({
        order: modifyBlock,
        content: "",
        status: State,
        id: itemToReplace[0].id,
      });
    }
    sb.blocks = [...sbb];
    fetchData(
      "/Read/SaveBlocksForScene",
      methodType.Post,
      {
        ...dataToSend,
        content: JSON.stringify({ ...sb, publish: publish }),
      },
      {
        ...dataToGet,
        callback: (data) => {
          NewToaster({
            title: resource.list.saveBlocks,
            position: positionToaster.left,
            color: colorToaster.info,
            text: data.message,
          });
          setModifyBlock(-1);
          setModifyText("");
          loadBlocks(savingBlock.parent);
        },
      },
      true,
      false
    );
  };
  const buttonSave = () => {
    return (
      <ButtonCustom
        text={resource.list.save}
        callback={() => {
          saveBlocks(false, "NONE");
          setDisplayPopup(false);
        }}
        type={ButtonTypeList.edit}
      />
    );
  };
  const buttonSaveAndPublish = () => {
    return (
      <ButtonCustom
        text={resource.list.saveAndPublish}
        callback={() => {
          saveBlocks(true, "NONE");
          setDisplayPopup(false);
        }}
        type={ButtonTypeList.create}
      />
    );
  };
  const buttonDelete = () => {
    return (
      <ButtonCustom
        text={resource.list.deleteBlock}
        callback={() => {
          saveBlocks(true, "DELETE");
          setDisplayPopup(false);
        }}
        type={ButtonTypeList.deleteItem}
      />
    );
  };
  const buttonReturn = () => {
    return (
      <ButtonCustom
        text={resource.list.cancel}
        callback={() => {
          setModifyBlock(-1);
          setModifyText("");
          setDisplayPopup(false);
        }}
        type={ButtonTypeList.back}
      />
    );
  };
  const buttonList = [];
  buttonList.push(buttonSave);
  buttonList.push(buttonSaveAndPublish);
  buttonList.push(buttonDelete);
  buttonList.push(buttonReturn);
  const addBlocks = () => {
    saveBlocks(false, "NEW");
  };
  return (
    <div className={Style.displayCards + " " + Style.wrap}>
      <SimpleCard>
        <div className={Style.envInput}>
          <div className={Style.align}>
            <div>
              <label htmlFor={"UniverseList"}>{resource.list.universe}</label>
            </div>
            <select
              id="UniverseList"
              onChange={(e) => {
                selection(1, e.target.value);
              }}
            >
              {dataDisplay.universe.map((d, index) => (
                <option key={index} value={d.id}>
                  {d.title}
                </option>
              ))}
            </select>
          </div>
          <div className={Style.align}>
            <div>
              <label htmlFor={"BookList"}>{resource.list.book}</label>
            </div>
            <select
              id="BookList"
              onChange={(e) => {
                selection(2, e.target.value);
              }}
            >
              {dataDisplay.book.map((d, index) => (
                <option key={index} value={d.id}>
                  {d.title}
                </option>
              ))}
            </select>
          </div>
          <div className={Style.align}>
            <div>
              <label htmlFor={"ChapterList"}>{resource.list.chapter}</label>
            </div>
            <select
              id="ChapterList"
              onChange={(e) => {
                selection(3, e.target.value);
              }}
            >
              {dataDisplay.chapter
                .sort((x, y) => x.numero - y.numero)
                .map((d, index) => (
                  <option key={index} value={d.id}>
                    {d.title}
                  </option>
                ))}
            </select>
          </div>
          <div className={Style.align}>
            <div>
              <label htmlFor={"SceneList"}>{resource.list.scene}</label>
            </div>
            <select
              id="SceneList"
              onChange={(e) => {
                selection(4, e.target.value);
              }}
            >
              {dataDisplay.scene
                .sort((x, y) => x.numero - y.numero)
                .map((d, index) => (
                  <option key={index} value={d.id}>
                    {d.title}
                  </option>
                ))}
            </select>
          </div>
          <div className={Style.center}>
            <ButtonCustom
              text={resource.list.addBlock}
              callback={() => {
                addBlocks();
                setOrderOfNewBlock(1);
              }}
              type={ButtonTypeList.create}
            />
          </div>
          <div>
            <label htmlFor={"Order"}>{resource.list.orderOfNewBlock}</label>
          </div>
          <input
            className={Style.orderNewBlock}
            type="number"
            value={orderOfNewBlock}
            onChange={(e) => {
              let orderNew = e.target.value;
              if (
                (orderNew < 1 ||
                  orderNew > numberOfBlock + 1 ||
                  orderNew === "-") &&
                orderNew !== ""
              ) {
                NewToaster({
                  title: resource.list.outOfBounds,
                  position: positionToaster.left,
                  color: colorToaster.error,
                  text: resource.list.invalidOrderNewBlock,
                });
              } else {
                console.log(orderNew);
                setOrderOfNewBlock(orderNew);
              }
            }}
          />
        </div>
      </SimpleCard>
      {dataDisplay.block
        .sort((x, y) => x.order - y.order)
        .map((d, index) => {
          return (
            <SimpleCard key={index}>
              <div className={Style.block}>
                <h2>{resource.list.blockNum + "" + d.order}</h2>

                <div>{d.text}</div>
              </div>
              {modifyBlock === -1 ? (
                <div className={Style.center}>
                  <ButtonCustom
                    text={resource.list.edit}
                    callback={() => {
                      setModifyBlock(d.order);
                      setModifyText(d.text);
                      setDisplayPopup(true);
                    }}
                    type={ButtonTypeList.edit}
                  />
                </div>
              ) : null}
            </SimpleCard>
          );
        })}
      {displayPopup ? (
        <PopupChildren type={"Modifier"} buttons={buttonList}>
          <div>
            <h2>{resource.list.blockNum + "" + modifyBlock}</h2>
            <textarea
              cols={40}
              rows={10}
              value={modifyText}
              onChange={(e) => {
                setModifyText(e.target.value);
                let sb = [...savingBlock.blocks];
                let itemToReplace = sb.splice(
                  sb.findIndex((x) => x.order === modifyBlock),
                  1
                );
                const blockToModify = {
                  order: modifyBlock,
                  content: e.target.value,
                  id: itemToReplace[0].id,
                  status: "NONE",
                };
                sb.push(blockToModify);
                setBlock({ ...savingBlock, blocks: [...sb] });
              }}
            />
          </div>
        </PopupChildren>
      ) : null}
    </div>
  );
}

import React, { FunctionComponent, useState } from "react";
import "./villagerCard.css";

interface IVillager {
  name: string;
  url: string;
  image_url: string;
  phrase: string;
  personality: string;
  quote: string;
}

interface IVillagerCard {
  villagers: IVillager[];
  name: string;
}

export const VillagerCard: FunctionComponent<IVillagerCard> = ({
  villagers,
  name,
}) => {
  const [villagerNumber, setVillagerNumber] = useState<number>(0);

  const getName = (name: string) => {
    return name ? `${name}'s birthday buddy ` : "Your birthday buddy ";
  };

  return (
    <div key={villagers[0]?.name}>
      <div className="grid">
        <div className="buttonPrev">
          {villagers.length > 1 && villagers.length === villagerNumber + 1 ? (
            <button
              onClick={() => {
                setVillagerNumber(villagerNumber - 1);
              }}
            >
              Previous
            </button>
          ) : (
            <span></span>
          )}
        </div>
        <div className="passport">
          <img
            src="../assets/passport.png"
            alt="passport"
            className="passportImg"
          ></img>
          <div className="passportPhoto">
            <img
              src={villagers[villagerNumber]?.image_url}
              alt="villager"
              className="villagerImage"
            ></img>
          </div>
          <div className="phrase">{villagers[villagerNumber]?.phrase}</div>
          <div className="type">{villagers[villagerNumber]?.personality}</div>
          <div className="quote">{villagers[villagerNumber]?.quote}</div>
          <div className="name">
            {getName(name) + villagers[villagerNumber]?.name}
          </div>
        </div>
        <div className="buttonNext">
          {villagers.length > 1 && villagers.length !== villagerNumber + 1 ? (
            <button
              onClick={() => {
                setVillagerNumber(villagerNumber + 1);
              }}
            >
              Next
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

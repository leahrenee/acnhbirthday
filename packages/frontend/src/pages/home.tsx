import React, { FunctionComponent, useState, useEffect } from "react";
import { VillagerCard } from "../components/villagerCard";
import "../pages/home.css";

interface IHome {
  foo: string;
}

interface IVillager {
  name: string;
  url: string;
  image_url: string;
  phrase: string;
  personality: string;
  quote: string;
}

export const Home: FunctionComponent<IHome> = (props) => {
  const [villagers, setVillagers] = useState<IVillager[]>([]);
  const [birthday, setBirthday] = useState<number>(1);
  const [birthmonth, setBirthmonth] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(true);
  const months = new Array(12).fill(0).map((_, index) => {
    return new Date(2020, index).toLocaleDateString(undefined, {
      month: "long",
    });
  });

  useEffect(() => {}, [villagers]);

  const getVillager = async () => {
    const response = await fetch(
      `https://291wzm6lb4.execute-api.us-east-1.amazonaws.com/villager?birthday=${birthday}&birthmonth=${birthmonth + 1}`
    );
    setVillagers(await response.json());
    setShowForm(false);
  };

  const getDaysInMonth = (month: number) => {
    return new Date(2022, month, 0).getDate();
  };

  return (
    <div>
      {showForm ? (
        <div>
          <div className="form">
            <img src="../assets/textBubble.png" alt="textBubble"></img>
            <div className="birthInput">
              <div className="prompt">
                Enter your birthday and birth month
                <br /> to find your birthday buddy. . .
              </div>
              <div className="nameInput">
                <label>Name: </label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div>
                <label>Birth month: </label>
                <select onChange={(e) => setBirthmonth(Number(e.target.value))}>
                  {months.map((x, y) => (
                    <option key={y} value={y}>
                      {x}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="birthdayLabel">Birthday: </label>
                <select onChange={(e) => setBirthday(Number(e.target.value))}>
                  {new Array(getDaysInMonth(birthmonth + 1)).fill(0).map((_, y) => (
                    <option key={y} value={y + 1}>
                      {y + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button onClick={() => getVillager()}>Get Villager</button>
        </div>
      ) : (
        <div>
          <VillagerCard villagers={villagers} name={name}></VillagerCard>
          <button
            onClick={() => {
              setBirthday(1);
              setBirthmonth(0);
              setName("");
              setVillagers([]);
              setShowForm(true);
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

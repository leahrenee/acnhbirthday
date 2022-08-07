import React, { FunctionComponent, useState, useEffect } from "react";
import { VillagerCard } from "../components/villagerCard";
import "../pages/home.css";

interface IVillager {
  name: string;
  url: string;
  image_url: string;
  phrase: string;
  personality: string;
  quote: string;
}

export const Home: FunctionComponent = () => {
  const [villagers, setVillagers] = useState<IVillager[]>([]);
  const [birthday, setBirthday] = useState<number>(1);
  const [birthmonth, setBirthmonth] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(true);
  const months = new Array(12).fill(0).map((_, index) => {
    return new Date(2022, index).toLocaleDateString(undefined, {
      month: "long",
    });
  });

  console.log(months);

  const getVillager = async () => {
    const response = await fetch(
      `http://localhost:3004/?birthday=${birthday}&birthmonth=${birthmonth + 1}`
    );
    setVillagers(await response.json());
    setShowForm(false);
  };

  const getDaysInMonth = (month: number) => {
    //Using 2022 so that we do not get a leap year, since no villagers have birthdays on Feb 29th
    const days = new Date(2022, month, 0).getDate();
    return new Array(days).fill(0).map((_, i) => i);
  };

  const onTryAgain = () => {
    setBirthday(1);
    setBirthmonth(0);
    setName("");
    setVillagers([]);
    setShowForm(true);
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
                  {months.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="birthdayLabel">Birthday: </label>
                <select onChange={(e) => setBirthday(Number(e.target.value))}>
                  {getDaysInMonth(birthmonth + 1).map((day) => (
                    <option key={day} value={day + 1}>
                      {day + 1}
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
          <button onClick={onTryAgain}>Try Again</button>
        </div>
      )}
    </div>
  );
};

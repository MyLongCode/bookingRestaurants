"use client";

import React, {useEffect} from "react";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import styles from "./yandexMap.module.scss";

type YandexMapProps = React.ComponentProps<typeof Map>

const YandexMap = ({ state, ...props }: YandexMapProps) => {
  return (
    <YMaps
      query={{
        apikey: process.env.YANDEX_API,
        suggest_apikey: process.env.YANDEX_API,
      }}
    >
      <div className={styles.wrapper}>
        <Map {...props} state={state}>
          <Placemark
            geometry={state?.center}
            options={{
              openBalloonOnClick: true,
              preset: "islands#redIcon",
            }}
          />
        </Map>
      </div>
    </YMaps>
  );
};

export default YandexMap;

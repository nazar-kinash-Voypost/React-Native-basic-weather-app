import React, { useEffect, useState } from "react";
import { Text, View, PermissionsAndroid, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { getWetherData } from "./weather-api";

const Weather = () => {
  const [location, setLocation] = useState<any>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>({});
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.log(errorMsg);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location.coords;
      getWetherData(latitude, longitude).then((response) =>
        setWeatherData({
          cityName: response.name,
          temperature: {
            temp: Math.round(response.main.temp - 273.15),
            feels_like: Math.round(response.main.feels_like - 273.15),
            temp_max: Math.round(response.main.temp_max - 273.15),
            temp_min: Math.round(response.main.temp_min - 273.15),
          },
        })
      );
    }
  }, [location]);

  return (
    <View>
      <Text style={styles.title}>THE WEATHER TODAY</Text>

      {weatherData.cityName && (
        <>
          <Text style={styles.item}>{`City: ${weatherData.cityName}`}</Text>
          <Text style={styles.item}>{`Temperature: ${weatherData.temperature.temp}°C`}</Text>
          <Text style={styles.item}>{`Feels like: ${weatherData.temperature.feels_like}°C`}</Text>
          <Text style={styles.item}>{`Minimum temperature today: ${weatherData.temperature.temp_min}°C`}</Text>
          <Text style={styles.item}>{`Maximum temperature today: ${weatherData.temperature.temp_max}°C`}</Text>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: "#a9af9a",
    fontSize: 50,
  },
  item: {
    textAlign: "center",
    fontSize: 30,
    color: "#455225",
  },
});
export default Weather;

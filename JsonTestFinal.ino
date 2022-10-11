// ArduinoJson - https://arduinojson.org
// Copyright © 2014-2022, Benoit BLANCHON
// MIT License
//
// This example shows how to parse a JSON document in an HTTP response.
// It uses the Ethernet library, but can be easily adapted for Wifi.
//
// It performs a GET resquest on https://arduinojson.org/example.json
// Here is the expected response:
// {
//   "sensor": "gps",
//   "time": 1351824120,
//   "data": [
//     48.756080,
//     2.302038
//   ]
// }
//
// https://arduinojson.org/v6/example/http-client/

#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <DHT.h>
#define DHTPIN D5               
#define DHTTYPE DHT22      
DHT dht(DHTPIN, DHTTYPE);
const char *ssid = "CAFE_1999_2.4GHz";
const char *password = "Cafe12331233";
const char* host = "172.30.1.17";
const char* serial = "ABC_123";

#include <SPI.h>

void setup() {
  
  // Initialize Serial port
  Serial.begin(115200);
  // put your setup code here, to run once:
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
  }
  delay(1000);

  Serial.println(F("Connecting..."));

  // Connect to HTTP server
  WiFiClient client;
  client.setTimeout(3000);
  if (!client.connect(host, 8080)) {
    Serial.println(F("Connection failed"));
    return;
  }
  
  while(true){
  //  int gas = analogRead(gas_pin);
  //  if(gas > 60){
  //    gasStr = "danger";
  //  }
  //  else{
  //    gasStr = "none";
  //  }
    String url = "/arduino/register?serialNum=ABC_123";
    
  
    // Send HTTP request
    client.print(String("GET ") + url + " HTTP/1.1\r\n" +
                 "Host: " + host + "\r\n" + 
                 "Connection: close\r\n\r\n");
    
    if (client.println() == 0) {
      Serial.println(F("Failed to send request"));
      client.stop();
      return;
    }
  
    // Check HTTP status
    char status[32] = {0};
    client.readBytesUntil('\r', status, sizeof(status));
    // It should be "HTTP/1.0 200 OK" or "HTTP/1.1 200 OK"
    if (strcmp(status + 9, "200 OK") != 0) {
      Serial.print(F("Unexpected response: "));
      Serial.println(status);
      client.stop();
      return;
    }
  
    // Skip HTTP headers
    char endOfHeaders[] = "\r\n\r\n";
    if (!client.find(endOfHeaders)) {
      Serial.println(F("Invalid response"));
      client.stop();
      return;
    }
  
    // Allocate the JSON document
    // Use https://arduinojson.org/v6/assistant to compute the capacity.
    const size_t capacity = JSON_OBJECT_SIZE(3) + JSON_ARRAY_SIZE(2) + 60;
    DynamicJsonDocument doc(capacity);
  
    // Parse JSON object
    DeserializationError error = deserializeJson(doc, client);
    if (error) {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
      client.stop();
      return;
    }
    
    // Extract values
    Serial.println(F("Response:"));
    Serial.print("check : ");
    Serial.println(doc["check"].as<const char*>());
    if(doc["check"].as<String>() == "true"){
      
      Serial.println("asd");
      break;
    }
    delay(1000);
  }
  
  Serial.println("success");
  client.stop();
}






void loop() {
  






  void connection(){
    String url = "/window";
    url += "?temp=";
    url += String(temp);
    url += "&humi=";
    url +=  String(humi);
    url += "&active=";
    url += "autoOpen";
    url += "&dust=";
    url += "50";
    url += "&gas=";
    url += String(gas_Str);
    url += "&serial=";
    url += String(serial);
    Serial.println(F("Connected!"));
  
    // Send HTTP request
    client.print(String("GET ") + url + " HTTP/1.1\r\n" +
                 "Host: " + host + "\r\n" + 
                 "Connection: close\r\n\r\n");
    
    if (client.println() == 0) {
      Serial.println(F("Failed to send request"));
      client.stop();
      return;
    }
  
    // Check HTTP status
    char status[32] = {0};
    client.readBytesUntil('\r', status, sizeof(status));
    // It should be "HTTP/1.0 200 OK" or "HTTP/1.1 200 OK"
    if (strcmp(status + 9, "200 OK") != 0) {
      Serial.print(F("Unexpected response: "));
      Serial.println(status);
      client.stop();
      return;
    }
  
    // Skip HTTP headers
    char endOfHeaders[] = "\r\n\r\n";
    if (!client.find(endOfHeaders)) {
      Serial.println(F("Invalid response"));
      client.stop();
      return;
    }
  
    // Allocate the JSON document
    // Use https://arduinojson.org/v6/assistant to compute the capacity.
    const size_t capacity = JSON_OBJECT_SIZE(3) + JSON_ARRAY_SIZE(2) + 60;
    DynamicJsonDocument doc(capacity);
  
    // Parse JSON object
    DeserializationError error = deserializeJson(doc, client);
    if (error) {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
      client.stop();
      return;
    }
    
    // Extract values
    Serial.println(F("Response:"));
    Serial.print("data : ");
    Serial.println(doc["data"].as<const char*>());
    Serial.print("autoMode : ");
    Serial.println(doc["autoMode"].as<const char*>());
    Serial.print("temp : ");
    Serial.println(doc["temp"].as<const char*>());
    Serial.print("humi : ");
    Serial.println(doc["humi"].as<const char*>());
    Serial.print("dust : ");
    Serial.println(doc["dust"].as<const char*>());
  
    // Disconnect
    client.stop();
   }
    
}


#include "DHT.h"
 
#define DHTPIN SDA        // SDA 핀의 설정
#define DHTTYPE DHT22   // DHT22 (AM2302) 센서종류 설정

#include <ArduinoJson.h>
#include <ESP8266WiFi.h>

const char *ssid = "HDW34";
const char *password = "042602hs";
const char* host = "https://mighty-mountain-03693.herokuapp.com";
const char* serial = "ABC_123";
String serialNum = "ABC_123";
#include <SPI.h>

void setup() {
  pinMode(15, OUTPUT);
  digitalWrite(15, HIGH);
  pinMode(mq2Pin, INPUT);
  pinMode(mq7Pin, INPUT);
  pinMode(rain, INPUT);
  pinMode(btn_open,INPUT);
  pinMode(btn_close, INPUT);
  int mq2_default = 0;
  int mq7_default = 0;
//  int a = 1;
//  dht.begin();
//  // Initialize Serial port
   Serial.begin(115200);
//  while(a <= 10){
//    mq2_default += mq2Sensing();
//    mq7_default += mq7Sensing();
//    a++;
//    delay(1000);
//    Serial.println(mq2Sensing());
//    Serial.println(mq7Sensing());
//  }
//  
//  // put your setup code here, to run once:
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
  

  sendDatatoServer("ANDI_2948", "true", "false", 24.0, 50.0, "open");


  
    
}



void sendDatatoServer(String serialNum, String rain, String gas, float humid, float temp, String state){

  
    String url = "/arduino/sensing";
    url += "?serialNum=";
    url += serialNum;
    url += "&temp=";
    url += String(temp);
    url += "&humid=";
    url +=  String(humid);
    url += "&state=";
    url += state;
//    url += "&gas=";
//    url += String(mq2);
//    url += "&dust=";
//    url += "50";
//    url += "&gas=";
//    url += String(gas_Str);
//    url += "&serial=";
//    url += String(serial);
    Serial.println(F("Connected!"));
    WiFiClient client;
    if (!client.connect("http://mighty-mountain-03693.herokuapp.com", 80)) {
    Serial.println(F("Connection failed222"));
    return;
  }
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

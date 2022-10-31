
#include <ArduinoJson.h>
#include <Wire.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
const char *ssid = "iPhone (131)";
const char *password = "vbtm1927fxap7";

String serialNum = "SHVHSY_8571";

String optionHumid = "";
String optionTemp = "";
String manual = "";
String autoMode = "";
String inString = "";
String temp = "";
String humid = "";
String rain = "";
String state = "";
String gas = "";  
String data = "";
int b = 1;
void setup(){
  
  int a = 0;
  
  
  Serial.begin(115200);
  Wire.begin();
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("connection..");
  }
 
  
  while(a == 0){
      if ((WiFi.status() == WL_CONNECTED)) { //Check the current connection status
      WiFiClient client;
      HTTPClient http;
   
      http.useHTTP10(true);
      http.begin(client, "http://mighty-mountain-03693.herokuapp.com/arduino/register?serialNum="+serialNum);
      http.GET();
      
      DynamicJsonDocument doc(2048);
      deserializeJson(doc, http.getString());
      Serial.println(http.getString());
      if(doc["check"].as<String>() == "true"){
        a = 1;
        
        
      }
      // Disconnect
      http.end();
    }
    delay(1000);
  }
 

  
}

void loop(){
  Wire.beginTransmission(1);  
  Wire.println(data);
  Wire.endTransmission();
  delay(200);
  Wire.requestFrom(1, 21);
  while(Wire.available() > 0){
    inString = Wire.readStringUntil('\n');
    int index1 = inString.indexOf(',');
    int index2 = inString.indexOf(',',index1+1);
    int index3 = inString.indexOf(',',index2+1);
    int index4 = inString.indexOf(',',index3+1);
    int index5 = inString.indexOf(',',index4+1);
    
    rain = inString.substring(0, index1);
    temp = inString.substring(index1+1, index2);
    humid = inString.substring(index2+1, index3);
    gas = inString.substring(index3+1, index4);
    state = inString.substring(index4+1, index5);
  
    
    
  }
  Serial.println(rain+ "," + temp+ "," + humid+ "," + gas+ "," + state);
  

    
    
    if(Serial.available())
    {
    inString = Serial.readStringUntil('\n');
    int index1 = inString.indexOf(',');
    int index2 = inString.indexOf(',',index1+1);
    int index3 = inString.indexOf(',',index2+1);
    int index4 = inString.indexOf(',',index3+1);
    int index5 = inString.indexOf(',',index4+1);
    
    rain = inString.substring(0, index1);
    temp = inString.substring(index1+1, index2);
    humid = inString.substring(index2+1, index3);
    gas = inString.substring(index3+1, index4);
    state = inString.substring(index4+1, index5);
  
    data = autoMode + "," + optionHumid + "," + optionTemp + "," + manual;
    Serial.println(data);
    delay(1000);
    b = 0;
      
    }
  
      
    

   sendDatatoServer(serialNum, rain, gas, humid, temp, state);
  
  
    
  
  
  
  
  
   
   
   
   
   
   
  
  
}








void sendDatatoServer(String serialNum, String rain, String gas, String humid, String temp, String state){
    
  
    String url = "http://mighty-mountain-03693.herokuapp.com/arduino/sensing";
    url += "?serialNum=";
    url += serialNum;
    url += "&temp=";
    url += temp;
    url += "&humid=";
    url +=  humid;
    url += "&state=";
    url += state;
    url += "&rain=";
    url += rain;
    url += "&gas=";
    url += gas;
    
    if ((WiFi.status() == WL_CONNECTED)) { //Check the current connection status
      WiFiClient client;
      HTTPClient http;
   
      http.useHTTP10(true);
      http.begin(client, url);
      http.GET();
      
      DynamicJsonDocument doc(2048);
      deserializeJson(doc, http.getString());
      Serial.println(url);
      Serial.println(http.getString());
      delay(1000);
      autoMode = doc["autoMode"].as<String>();
      optionHumid = doc["optionHumid"].as<String>();
      optionTemp = doc["optionTemp"].as<String>();
      manual = doc["manual"].as<String>();
      http.end();
      data = autoMode + "," + optionHumid + "," + optionTemp + "," + manual + ",";
      
      
    }
  
}




      

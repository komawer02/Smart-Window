
#include <Wire.h>
#include "DHT.h"
#include <SoftwareSerial.h>
SoftwareSerial mySerial(10, 11);
#define DHTPIN 14 
#define DHTPIN_out 13       
#include <Stepper.h>
#define DHTTYPE DHT22 
DHT dht_in(DHTPIN, DHTTYPE);
DHT dht_out(DHTPIN_out, DHTTYPE);
const int stepsPerRevolution = 256;
int mq7Pin = A0;
int rainPin = A1;
int mq2Pin = A2;
int registered = 0;
int humi_in;
int humi_out;
int temp_in;
int temp_out;
String gas = "false";
String rainDrop = "false";
String state = "open";
int btn_close = 22;
int btn_open = 23;
int option_temp = 22;
int option_humid = 50;
String autoMode = "off";
int rain = 600;
String sending = "";
 String inString = "";
  String manual = "";
  String clos = "close";
Stepper stepper(stepsPerRevolution, 6, 8, 7, 9);
Stepper stepper1(stepsPerRevolution, 2, 4, 3, 5);
int def_mq2 = 0;
int def_mq7 = 0;
void setup(){
  Wire.begin(1);
  Wire.onRequest(requestEvent);
  Wire.onReceive(receiveEvent);
  pinMode(24, OUTPUT);
  pinMode(25, OUTPUT);
  pinMode(26, OUTPUT);
  pinMode(27, OUTPUT);
  pinMode(28, OUTPUT);
  pinMode(29, OUTPUT);
  pinMode(30, OUTPUT);
  pinMode(31, OUTPUT);
  pinMode(32, OUTPUT);
  pinMode(33, OUTPUT);
  pinMode(34, OUTPUT);
  pinMode(35, OUTPUT);
  digitalWrite(24, HIGH);
  digitalWrite(25, LOW);
  digitalWrite(26, HIGH);
  digitalWrite(27, LOW);
  digitalWrite(28, HIGH);
  digitalWrite(29, LOW);
  digitalWrite(30, HIGH);
  digitalWrite(31, LOW);
  digitalWrite(32, HIGH);
  digitalWrite(33, LOW);
  digitalWrite(34, HIGH);
  digitalWrite(35, LOW);

  
  Serial.begin(115200);
//  mySerial.begin(115200);
  stepper.setSpeed(80);
  int a = 0;
  while(a < 10){
    def_mq2 = def_mq2 + mq2Sensing();
    def_mq7 = def_mq7 + mq7Sensing();
    a++;
    delay(1000);
  }
  def_mq2 = def_mq2/10;
  def_mq7 = def_mq7/10;
  
      
  
}






void loop(){
  
  
  rain = rainSensing();
  humi_in = int(humiInSensing());
  temp_in = int(tempInSensing());
  humi_out = int(humiOutSensing());
  temp_out = int(tempOutSensing());
  int mq2 = mq2Sensing();
  int mq7 = mq7Sensing();
  
//  if(mySerial.available()){
//    inString = mySerial.readStringUntil('\n');
//    int index1 = inString.indexOf(',');
//    int index2 = inString.indexOf(',',index1+1);
//    int index3 = inString.indexOf(',',index2+1);
//    int index4 = inString.indexOf(',',index3+1);
//    
//    
//    autoMode = inString.substring(0, index1);
//    option_humid = inString.substring(index1+1, index2).toInt();
//    option_temp = inString.substring(index2+1, index3).toInt();
//    manual = inString.substring(index2+1, index3);
//    
//     
//  }
  
  
  if(rainSensing() <= 500){
    rainDrop = "true";
  }
  else{
    rainDrop = "fals";
  }
  if(btn_Open() == 1){
    state = "open";
  }
  if(btn_Close() == 1){
    state = "clos";
  }
  if(btn_Open() == 0 && btn_Close() == 0) {
    state = "acti";
  }
  if(mq2 > 1.6*def_mq2 || mq7 > 1.6*def_mq7){
    gas = "true";
  }
  else{
    gas = "fals";
  }
  sending = rainDrop + String(",") + String(temp_in)+ String(",") + String(humi_in) + String(",") + gas + String(",") + state + ",";
//  mySerial.println(sending);
  delay(1000);
  Serial.println(sending);
  if(autoMode == "on"){
    auto_Mode();
    Serial.println("on");
  }
  else{
    Serial.println(manual == "close");
    if(manual == "open"){
      window_open();
    }
    if(manual.equals("close")){
      window_close();
      Serial.println("check");
    }
  }
  
  
  
  
}

void receiveEvent(){
  while(Wire.available() > 0 ){
    inString = Wire.readStringUntil('\n');
    int index1 = inString.indexOf(',');
    int index2 = inString.indexOf(',',index1+1);
    int index3 = inString.indexOf(',',index2+1);
    int index4 = inString.indexOf(',',index3+1);
    
    
    autoMode = inString.substring(0, index1);
    option_humid = inString.substring(index1+1, index2).toInt();
    option_temp = inString.substring(index2+1, index3).toInt();
    manual = inString.substring(index3+1, index4);
  }
  
}
void requestEvent(){
  Wire.println(sending);
}
int btn_Close(){
  int Close = digitalRead(btn_close);
  return Close;
}

int btn_Open(){
  int Open = digitalRead(btn_open);
  return Open;
}



int rainSensing(){
  int r = analogRead(rainPin);
  return r;
}
int mq2Sensing(){
  int mq2 = analogRead(mq2Pin);
  return mq2;
}

int mq7Sensing(){
  int mq7 = analogRead(mq7Pin);
  return mq7;
}

float tempInSensing(){
  
  float t = dht_in.readTemperature();
  return t;
}
float humiInSensing(){
  float h = dht_in.readHumidity();
  return h;
}
float tempOutSensing(){
  
  float t = dht_out.readTemperature();
  return t;
}
float humiOutSensing(){
  float h = dht_out.readHumidity();
  return h;
}


void window_close(){
  while(!(btn_Close())){
    stepper.step(-1);
    stepper1.step(-1);
  }
}
void window_open(){
  while(!(btn_Open())){
    stepper.step(1);
    stepper1.step(1);
  }
}


void auto_Mode(){
  if(gas == "true"){
    window_open();
  }
  else{
    if ( rain <= 500) {               // 비가 옴(감지값이 500이하)
   if ( btn_Open() == 1) {
      window_close();
   }
   else {
   }
}
else {                  // 비가 안옴 -> 온습도 비교
   if ( (humi_in >= (option_humid-10)) && (humi_in <= (option_humid+10)) ) {   
      if ( temp_in >= (option_temp-2) && temp_in <= (option_temp+2)) {
      }
      else {
         if ( temp_in <= (option_temp-2) ) {
            if ( temp_in > temp_out ) {
               if ( btn_Open() == 1 ) {
                  window_close();
               
               }
               else {
               }
            }
            else {
               if ( btn_Close() == 1 ) {
                  window_open();
               }
               else {
               }
            }
         }
         else {
            if ( temp_in > temp_out ) {
               if ( btn_Close() == 1 ) {
                  window_open();
               }
               else {
               }
            }
            else {
               if ( btn_Open() == 1 ) {
                  window_close();
               }
               else {
               }
            }
         }
      }
   }
   else {
      if ( humi_in <= (option_humid-10) ) {      // 실내 습도 40 이하
         if ( humi_in > humi_out ) {
            if ( btn_Open() == 1 ) {
               window_close();
            }
            else {
            }
         }
         else {
            if ( btn_Close() == 1 ) {
               window_open();
            }
            else {
            }
         }
      }
      else {
         if ( humi_in > humi_out ) {
            if ( btn_Close() == 1 ) {
               window_open();
            }
            else {
            }
         }
         else {
            if ( btn_Open() == 1 ) {
               window_close();
            }
            else {
            {
         }
      }
   }
}
  }

}
  }}

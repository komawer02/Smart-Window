

#include "DHT.h"
 
#define DHTPIN SDA        
#define DHTTYPE DHT22 
DHT dht_in(DHTPIN, DHTTYPE);
DHT dht_out(DHTPIN, DHTTYPE);
int mq7Pin = A0;
int rainPin = A1;
int mq2Pin = A2;
int registered = 0;

void setup(){
  
  pinMode(7, OUTPUT);
  pinMode(8, OUTPUT);
  
  
 
 
  digitalWrite(7, HIGH);
  digitalWrite(8, LOW);
  
  
  Serial.begin(115200);
}

void loop(){
  
  int rain = rainSensing();
  float humi_in = humiInSensing();
  float temp_in = tempInSensing();
  float humi_out = humiOutSensing();
  float temp_out = tempOutSensing();
  int mq2 = mq2Sensing();
  int mq7 = mq7Sensing();
  
  if ( rain <= 500) {               // 비가 옴(감지값이 500이하)
   if ( btn_Open() == 1) {
      window_close();
   }
   else {
   }
}
else {                  // 비가 안옴 -> 온습도 비교
   if ( humi_in >= 40 && humi_in <= 60 ) {   
      if ( temp_in >= 22 && temp_in <= 24) {
      }
      else {
         if ( temp_in <= 22 ) {
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
      if ( humi_in <= 40 ) {      // 실내 습도 40 이하
         if ( humI_in > humi_out ) {
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
  
  float t = dht.readTemperature();
  return t;
}
float humiInSensing(){
  float h = dht.readHumidity();
  return h;
}
float tempOutSensing(){
  
  float t = dht.readTemperature();
  return t;
}
float humiOutSensing(){
  float h = dht.readHumidity();
  return h;
}


void window_close(){
  
}
void window_open(){
  
}

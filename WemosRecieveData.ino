void setup(){
  Serial.begin(115200);
  
}

void loop(){
  if(Serial.available()){
   char* c = (char*)Serial.read();
   Serial.println(c);
  }  
}

//Make sure to install the drivers for your board and...
//WiFiNINA
//ArduinoHttpClient

#include <WiFiNINA.h>
#include <ArduinoHttpClient.h>

#define BUTTON_PIN_1 2

char ssid[] = "Put your wifi network name here";  //WiFi network name
char pass[] = "Put your wifi network password here";  //WiFi network password

//Server address
char serverAddress[] = "demo.gimm300.org";
int port = 80;

void setup() {
  Serial.begin(9600);
  pinMode(BUTTON_PIN_1, INPUT_PULLUP);

  //Connect to WiFi
  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    Serial.println("Attempting to connect to WiFi...");
    delay(1000);
  }
  Serial.println("Connected to WiFi!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  if (digitalRead(BUTTON_PIN_1) == LOW) {
    Serial.println("BUTTON_1_PRESSED");

    WiFiClient client;
    HttpClient httpClient = HttpClient(client, serverAddress, port);

    //Pass parameters here
    String val = "New item";
    String postData = "param1=" + val;

    //This should be your POST endpoint
    String path = "/addtodatabase/";

    //Make the actual POST request
    httpClient.beginRequest();
    httpClient.post(path);
    httpClient.sendHeader("Content-Type", "application/x-www-form-urlencoded"); //Or "application/json" for JSON
    httpClient.sendHeader("Content-Length", postData.length());
    httpClient.endRequest();
    httpClient.write((byte*)postData.c_str(), postData.length());

    //See what the server responds with
    int statusCode = httpClient.responseStatusCode();
    String response = httpClient.responseBody();

    Serial.print("Status code: ");
    Serial.println(statusCode);
    Serial.print("Response: ");
    Serial.println(response);

    //Close the connection
    httpClient.stop();
  }
}
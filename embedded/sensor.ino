#include <IR_Thermometer_Sensor_MLX90614.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

#define SSID ""
#define PASSWORD ""
#define REPORT_INTERVAL 20 // in seconds
#define SERVER_ADDRESS "http://192.168.1.46:8001/api/data"


IR_Thermometer_Sensor_MLX90614 MLX90614 = IR_Thermometer_Sensor_MLX90614();

const size_t CAPACITY = 200;
StaticJsonDocument<CAPACITY> doc;


HTTPClient http;

void setup() {
  Serial.begin(9600);
  Serial.println("Initializing IR thermometer");
  MLX90614.begin();
  
  // Connect to WiFi network
  Serial.println("Connecting to "SSID);

  WiFi.begin(SSID, PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
}

void loop() {
  // JSON encode the data
  String sensorId = "sensor1";
  JsonArray data = doc.to<JsonArray>();
  JsonObject sensorData = data.createNestedObject();
  sensorData["id"] = sensorId;
  sensorData["ambient"] = MLX90614.GetAmbientTemp_Celsius();
  sensorData["object"] = MLX90614.GetObjectTemp_Celsius();
  String output;
  serializeJson(data, output);

  // POST the json to the server
  http.begin(SERVER_ADDRESS);
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(output);
  String payload = http.getString();

  Serial.println(httpCode);
  Serial.println(payload);

  http.end();
  
  delay(1000 * REPORT_INTERVAL);
}

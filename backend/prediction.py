from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import math

app = Flask(__name__)
CORS(app)
# Load the trained model
model = joblib.load("improved_glof_rf_model.pkl")

# Load the scaler used during training
scaler = joblib.load("scaler.pkl")  # Assuming you saved the scaler during training

# Load glacier data CSV (created manually)
glacier_data = pd.read_csv("Manual_Glacier_Dataset_India.csv")

# Haversine formula to calculate distance between two points on the earth
def haversine(lat1, lon1, lat2, lon2):
    # Radius of the Earth in kilometers
    R = 6371.0

    # Convert latitudes and longitudes from degrees to radians
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    # Differences in latitudes and longitudes
    delta_lat = lat2_rad - lat1_rad
    delta_lon = lon2_rad - lon1_rad

    # Haversine formula
    a = math.sin(delta_lat / 2) ** 2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    # Distance in kilometers
    distance = R * c
    return distance

# Function to get glacier info based on the closest latitude and longitude using Haversine distance
def get_closest_glacier_info(latitude, longitude):
    # Initialize minimum distance and closest glacier info
    min_distance = float('inf')
    closest_glacier = None

    # Iterate through glacier data to find the closest glacier using the Haversine formula
    for _, row in glacier_data.iterrows():
        glacier_lat = row['Latitude']
        glacier_lon = row['Longitude']
        distance = haversine(latitude, longitude, glacier_lat, glacier_lon)

        if distance < min_distance:
            min_distance = distance
            closest_glacier = row

    if closest_glacier is not None:
        # Return glacier thickness, melt rate, and snow cover if a match is found
        return closest_glacier['Glacier Thickness (m)'], closest_glacier['Glacier Melt Rate (mm/day)'], closest_glacier['Snow Cover (mm)']
    else:
        # Return default values if no match is found
        return 0, 0, 0

# Prediction endpoint
@app.route('/api/glof-prediction', methods=['POST'])
def predict_glof():
    try:
        # Get the data from the request (JSON payload)
        data = request.get_json()

        # Extract relevant features from the data
        latitude = float(data['latitude'])
        longitude = float(data['longitude'])
        temperature = float(data['temperature'])
        precipitation = float(data['precipitation'])
        humidity = float(data['humidity'])
        wind_speed = float(data['wind_speed'])
        pressure = float(data['pressure'])

        # Get glacier thickness, melt rate, and snow cover from the closest glacier using Haversine formula
        glacier_thickness, melt_rate, snow_cover = get_closest_glacier_info(latitude, longitude)

        # Create a DataFrame for input data
        input_data = pd.DataFrame({
            'Latitude': [latitude],
            'Longitude': [longitude],
            'Temperature (°C)': [temperature],
            'Precipitation (mm)': [precipitation],
            'Snow Cover (mm)': [snow_cover],
            'Humidity (%)': [humidity],
            'Wind Speed (m/s)': [wind_speed],
            'Pressure (hPa)': [pressure],
            'Glacier Thickness (m)': [glacier_thickness],
            'Glacier Melt Rate (mm/day)': [melt_rate]
        })

        # Scale the input features using the same scaler used during model training
        scaled_input_data = scaler.transform(input_data)

        # Predict GLOF occurrence using the loaded model
        prediction = model.predict(scaled_input_data)

        # Return the result (1: GLOF risk, 0: No GLOF)
        result = {'glof_risk': int(prediction[0])}

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    print("Server is running on http://127.0.0.1:5000")
    app.run(debug=True)

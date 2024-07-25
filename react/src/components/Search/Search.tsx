

import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Search.scss';

interface ParkingLot {
  name: string;
  url: string;
}

const Search: FC = () => {
  const navigate = useNavigate();
  const [parkingList, setParkingList] = useState<ParkingLot[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<number[]>([]);
  const [blinkingIndex, setBlinkingIndex] = useState<number | null>(null);
  const [actionMode, setActionMode] = useState<'release' | 'capture' | null>(null);

  useEffect(() => {
    const data: ParkingLot[] = [
      { name: "Nationality Parking Lot", url: "/photo-1506521781263-d8422e82f27a-1920w.jpg" },
    ];
    setParkingList(data);
  }, []);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/search');
      console.log('Fetched predictions:', response.data);
      if (response.status !== 200) {
        throw new Error('Failed to get predictions');
      }
      setPredictions(response.data.predictions);  // Assuming response.data contains predictions
    } catch (error: any) {
      console.error('Error fetching predictions:', error.message);
    }
    setLoading(false);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleParkingSpaceClick = async (index: number, status: number) => {
    if (actionMode === null) {
      alert('Please select "Release" or "Capture" mode first.');
      return;
    }
    if (actionMode === 'release' && status === 0) {
      alert('Parking space is already vacant.');
      return;
    }
    if (actionMode === 'capture' && status === 1) {
      alert('Parking space is already occupied.');
      return;
    }

    const newStatus = actionMode === 'release' ? 0 : 1;
    console.log(`Clicked on parking space ${index + 1} with status ${status}`);
    const newPredictions = [...predictions];
    newPredictions[index] = newStatus;
    setPredictions(newPredictions);
    console.log('Updated predictions:', newPredictions);
    await updateServer(index + 1, newStatus);
  };

  const handleReleaseClick = () => {
    setActionMode('release');
  };

  const handleCaptureClick = () => {
    setActionMode('capture');
  };

  const updateServer = async (index: number, status: number) => {
    try {
      const data = { location_id: index, status };
      console.log('Sending update to server:', data);
      const response = await axios.post('http://localhost:5000/update', data);
      console.log('Server response:', response.status, response.data);
      if (response.status === 200) {
        console.log('Update successful:', response.data);
        setPredictions(response.data.predictions);  // Assuming response.data contains predictions
      } else {
        console.error('Error updating server:', response.data.message);
      }
    } catch (error: any) {
      console.error('Error updating server:', error.message);
    }
  };

  const splitPredictions = (predictions: number[]) => {
    const firstRow = predictions.slice(0, 19);
    const secondRow = predictions.slice(19, 35);
    const thirdRow = predictions.slice(35, 50);
    return [firstRow, secondRow, thirdRow];
  };

  const rows = splitPredictions(predictions);

  return (
    <div className="Search">
      <div className="parking-lots d-flex">
        {parkingList.map((park: ParkingLot, index: number) => (
          <div key={index}>
            <h3 style={{ color: 'white', height: '80%' }}>{park.name}</h3>
            <img
              onClick={() => handleImageClick(park.url)}
              src={park.url}
              className={`parking-lot-image ${loading ? 'large' : 'small'}`}
              alt={park.name}
            />
            <br />
            <img
              src="/images.png"
              alt="Button"
              style={{
                width: '120px',
                height: '120px',
                backgroundColor: 'purple',
                borderRadius: '50%',
                padding: '5px',
                cursor: 'pointer'
              }}
              onClick={fetchPredictions}
            />
            <div className="button-container">
              <button
                style={{
                  width: '120px',
                  height: '50px',
                  backgroundColor: actionMode === 'release' ? 'darkred' : 'red',
                  color: 'white',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
                onClick={handleReleaseClick}
              >
                Release
              </button>
              <button
                style={{
                  width: '120px',
                  height: '50px',
                  backgroundColor: actionMode === 'capture' ? 'darkgreen' : 'green',
                  color: 'white',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '10px',
                  marginLeft: '10px'
                }}
                onClick={handleCaptureClick}
              >
                Capture
              </button>
            </div>
            {predictions.length > 0 && (
              <div className="parking-spaces">
                {rows.map((row, rowIndex) => (
                  <div className="parking-row" key={rowIndex}>
                    {row.map((prediction, i) => {
                      const globalIndex = rowIndex === 0 ? i : rowIndex === 1 ? i + 19 : i + 35;
                      return (
                        <div
                          key={i}
                          className={`parking-space ${blinkingIndex === i ? 'blinking' : ''}`}
                          onClick={() => handleParkingSpaceClick(globalIndex, prediction)}
                          style={{
                            width: '50px',
                            height: '80px',
                            color: 'white',
                            display: 'inline-block',
                            margin: '5px',
                            textAlign: 'center',
                            lineHeight: '12px',
                            backgroundColor: prediction === 0 ? 'green' : 'red',
                            cursor: 'pointer',
                            border: '1px double rgb(0, 123, 255)',
                            padding: '5px',
                            boxSizing: 'border-box',
                            fontSize: '10px',
                            whiteSpace: 'normal',
                          }}
                        >
                          <div>{globalIndex + 1}</div>
                          <img
                            src="/carsicon.jpeg"
                            alt="Car Icon"
                            style={{ width: '20px', height: '20px', marginBottom: '5px', borderRadius: '10px' }}
                          />
                          <div>{prediction === 0 ? 'Vacant' : 'Occupied'}</div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {loading && <div className="loading-wheel">Loading...</div>}
      {selectedImage && (
        <div className="fullscreen-image-overlay" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full size" className="fullscreen-image" />
        </div>
      )}
    </div>
  );
};

export default Search;

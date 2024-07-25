
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './UploudFile.scss';

// Define the interface for ParkingLot
interface ParkingLot {
  name: string;
  // Change the type of url to relative path
  url: string;
}

const UploudFile: FC = () => {
  const navigate = useNavigate();
  const [parkingList, setParkingList] = useState<ParkingLot[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // הוספת משתנה חדש עבור מצב הטעינה

  useEffect(() => {
    // Simulate fetching parking list
    const data: ParkingLot[] = [
      {name:"Nationality Parking Lot",url:"/image.png"},
      {name:"Nationality Parking Lot",url:"/photo-1506521781263-d8422e82f27a-1920w.jpg"},
      {name:"Nationality Parking Lot",url:"/Car_park_-8.png"}
    ];
    setParkingList(data);
  }, []);

  const handleButtonClick = (parkingLot: string) => {
    setLoading(true); // מצב הטעינה מופעל בעת לחיצה על חניה
    setTimeout(() => {
      navigate(`/Search`);
    }, 2000); // זמן טעינה כללי

  };

  return (
    <div className="UploudFile">
      <h1>Hello user ,Select parking</h1>
      <div className="parking-lots-Upload d-flex">
        {parkingList.map((park: ParkingLot, index: number) => (
          <div key={index}>
            <h3 style={{ color: 'white' }}>{park.name}</h3> {/* הוספת סגנון לשם החנייה */}
            {/* Use relative path for the image */}
            <img
              onClick={() => handleButtonClick(park.name)} // שימוש בשם החניה במקום 'Mamilla'
              src={park.url}
              width={200}
              alt={park.name}
            />
          </div>
        ))}
      </div>
      {loading && <div className="loading-wheel"></div>} {/* תצוגת גלגלת הטעינה כאשר מצב הטעינה מופעל */}
    </div>
  );
};

export default UploudFile;

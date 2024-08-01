// src/components/ZakahCalculator.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ZakahCalculator = () => {
  const [goldPrice, setGoldPrice] = useState(null);
  const [silverPrice, setSilverPrice] = useState(null);
  const [date, setDate] = useState(null);
  const [formData, setFormData] = useState({
    gold: '',
    silver: '',
    cash: '',
    liabilities: ''
  });
  const [zakah, setZakah] = useState(null);

  // Fetch gold and silver prices from Firestore
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        console.log('Fetching metal prices...');
        const metalsCollection = collection(db, 'metals');
        const metalsSnapshot = await getDocs(metalsCollection);
        metalsSnapshot.forEach((doc) => {
          if (doc.id === 'gold') {
            console.log('Setting gold price:', doc.data().price);
            setGoldPrice(doc.data().price);
          } else if (doc.id === 'silver') {
            console.log('Setting silver price:', doc.data().price);
            setSilverPrice(doc.data().price);
          } else if (doc.id === 'date') {
            const timestamp = doc.data().time;
            const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
            console.log('Setting date:', date);
            setDate(date);
          }
        });
      } catch (error) {
        console.error('Error fetching metal prices or date:', error);
      }
    };

    fetchPrices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateZakah = () => {
    const { gold, silver, cash, liabilities } = formData;
    // Convert inputs to numbers and calculate Zakah
    const goldValue = parseFloat(gold) * (goldPrice || 0);
    const silverValue = parseFloat(silver) * (silverPrice || 0);
    const cashValue = parseFloat(cash) || 0;
    const liabilitiesValue = parseFloat(liabilities) || 0;

    console.log('Calculating zakah with:', { goldValue, silverValue, cashValue, liabilitiesValue });

    const zakatableAmount = goldValue + silverValue + cashValue - liabilitiesValue;
    const zakahDue = zakatableAmount > 0 ? zakatableAmount * 0.025 : 0;

    console.log('Calculated Zakah:', zakahDue);
    setZakah(zakahDue.toFixed(2));
  };

  return (
    <div>
      <h2>Find out if you are eligible to pay zakah using the Zakah Calculator</h2>
      <div>
        <label>Gold (grams): </label>
        <input type="number" name="gold" value={formData.gold} onChange={handleChange} />
      </div>
      <div>
        <label>Silver (grams): </label>
        <input type="number" name="silver" value={formData.silver} onChange={handleChange} />
      </div>
      <div>
        <label>Cash: </label>
        <input type="number" name="cash" value={formData.cash} onChange={handleChange} />
      </div>
      <div>
        <label>Liabilities: </label>
        <input type="number" name="liabilities" value={formData.liabilities} onChange={handleChange} />
      </div>
      <button onClick={calculateZakah}>Calculate Zakah</button>
      {zakah !== null && (
        <div>
          <h3>Zakah Due: ${zakah}</h3>
        </div>
      )}
      <div style={{ color: '#FFD700', marginTop: '10px' }}>
        <p>Gold Price (per gram): ${goldPrice !== null ? goldPrice : 'Loading...'}</p>
        <p>Silver Price (per gram): ${silverPrice !== null ? silverPrice : 'Loading...'}</p>
        <p>Prices updated on: {date !== null ? date.toLocaleString() : 'Loading...'}</p> 
      </div>
    </div>
  );
};

export default ZakahCalculator;

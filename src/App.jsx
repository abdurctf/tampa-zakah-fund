// src/App.jsx
import React from 'react';
import ApplicantForm from './components/ApplicantForm';
import ZakahCalculator from './components/ZakahCalculator';
import DonateButtons from './components/DonateButtons';
import FAQs from './components/FAQs';

const App = () => {
  return (
    <div style={{ backgroundColor: '#0c1a2b', color: '#ffffff', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#f0e68c' }}>Tampa Zakah Fund</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <ApplicantForm />
        <ZakahCalculator />
        <DonateButtons />
        <FAQs />
      </div>
    </div>
  );
};

export default App;

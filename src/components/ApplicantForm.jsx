// src/components/ApplicantForm.jsx
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import Modal from './Modal';
import emailjs from 'emailjs-com';

const ApplicantForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    age: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: '',
    maritalStatus: '',
    children: '',
    spouse: '',
    workStatus: '',
    previousAssistance: '',
    dateOfAssistance: '',
    annualIncome: '',
    incomeSources: [],
    requestedAmount: '',
    financialAssistanceReason: '',
    usagePlan: '',
    reference1Name: '',
    reference1Phone: '',
    reference1Email: '',
    reference2Name: '',
    reference2Phone: '',
    reference2Email: '',
    documentationLinks: [],
    certificationAgreement: false,
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked
        ? [...prevData[name], value]
        : prevData[name].filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'applicants'), formData);
      sendEmail();
      setShowModal(true);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const sendEmail = () => {
    const templateParams = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      message: 'A new form has been submitted.',
    };

    emailjs.send(
      'service_b0mvq86', // Replace with your service ID
      'template_gxyk3p8', // Replace with your template ID
      templateParams,
      'OupUAJVr98wFdL4mZ' // Replace with your user ID
    )
    .then((response) => {
      console.log('Email successfully sent!', response.status, response.text);
    }, (error) => {
      console.error('Failed to send email. Error:', error);
    });
  };

  return (
    <div style={styles.formContainer}>
      <h2>Applicant Form for Individuals Seeking Assistance</h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Middle Name</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Gender</label>
          <div>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
              style={styles.radio}
            />
            Male
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
              style={styles.radio}
            />
            Female
          </div>
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Age</label>
          <input
            type="date"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Street Address</label>
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Marital Status */}
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Marital Status</label>
          <div>
            <input
              type="radio"
              name="maritalStatus"
              value="Single"
              checked={formData.maritalStatus === 'Single'}
              onChange={handleChange}
              style={styles.radio}
            />
            Single
            <input
              type="radio"
              name="maritalStatus"
              value="Divorced"
              checked={formData.maritalStatus === 'Divorced'}
              onChange={handleChange}
              style={styles.radio}
            />
            Divorced
            <input
              type="radio"
              name="maritalStatus"
              value="Widow"
              checked={formData.maritalStatus === 'Widow'}
              onChange={handleChange}
              style={styles.radio}
            />
            Widow
            <input
              type="radio"
              name="maritalStatus"
              value="Married"
              checked={formData.maritalStatus === 'Married'}
              onChange={handleChange}
              style={styles.radio}
            />
            Married
          </div>
        </div>

        {/* Children and Spouse Information */}
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Name and Age of Children (comma-separate each child)</label>
          <input
            type="text"
            name="children"
            value={formData.children}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Name of Spouse and Age</label>
          <input
            type="text"
            name="spouse"
            value={formData.spouse}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* Employment and Income Information */}
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Work Status</label>
          <div>
            <input
              type="radio"
              name="workStatus"
              value="Employed Full Time"
              checked={formData.workStatus === 'Employed Full Time'}
              onChange={handleChange}
              style={styles.radio}
            />
            Employed Full Time
            <input
              type="radio"
              name="workStatus"
              value="Employed Part Time"
              checked={formData.workStatus === 'Employed Part Time'}
              onChange={handleChange}
              style={styles.radio}
            />
            Employed Part Time
            <input
              type="radio"
              name="workStatus"
              value="Unemployed"
              checked={formData.workStatus === 'Unemployed'}
              onChange={handleChange}
              style={styles.radio}
            />
            Unemployed
          </div>
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Have you received assistance from the Tampa Zakah fund before?</label>
          <div>
            <input
              type="radio"
              name="previousAssistance"
              value="Yes"
              checked={formData.previousAssistance === 'Yes'}
              onChange={handleChange}
              style={styles.radio}
            />
            Yes
            <input
              type="radio"
              name="previousAssistance"
              value="No"
              checked={formData.previousAssistance === 'No'}
              onChange={handleChange}
              style={styles.radio}
            />
            No
          </div>
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Date of Assistance</label>
          <input
            type="date"
            name="dateOfAssistance"
            value={formData.dateOfAssistance}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Total Annual Income (just include numbers, no symbols)</label>
          <input
            type="text"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Income Sources</label>
          <div>
            <input
              type="checkbox"
              name="incomeSources"
              value="Job"
              checked={formData.incomeSources.includes('Job')}
              onChange={handleCheckboxChange}
              style={styles.checkbox}
            />
            Job
            <input
              type="checkbox"
              name="incomeSources"
              value="Social Security"
              checked={formData.incomeSources.includes('Social Security')}
              onChange={handleCheckboxChange}
              style={styles.checkbox}
            />
            Social Security
            <input
              type="checkbox"
              name="incomeSources"
              value="Disability"
              checked={formData.incomeSources.includes('Disability')}
              onChange={handleCheckboxChange}
              style={styles.checkbox}
            />
            Disability
            <input
              type="checkbox"
              name="incomeSources"
              value="Food Stamps"
              checked={formData.incomeSources.includes('Food Stamps')}
              onChange={handleCheckboxChange}
              style={styles.checkbox}
            />
            Food Stamps
            <input
              type="checkbox"
              name="incomeSources"
              value="Child Support"
              checked={formData.incomeSources.includes('Child Support')}
              onChange={handleCheckboxChange}
              style={styles.checkbox}
            />
            Child Support
          </div>
        </div>

        {/* Zakah Information */}
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Amount Requested (just include numbers, no symbols)</label>
          <input
            type="text"
            name="requestedAmount"
            value={formData.requestedAmount}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Reasons for Seeking Financial Assistance</label>
          <textarea
            name="financialAssistanceReason"
            value={formData.financialAssistanceReason}
            onChange={handleChange}
            style={{ ...styles.input, ...styles.textarea }}
            required
            rows={4}
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>How are you planning to use the requested amount?</label>
          <textarea
            name="usagePlan"
            value={formData.usagePlan}
            onChange={handleChange}
            style={{ ...styles.input, ...styles.textarea }}
            required
            rows={4}
          />
        </div>

        {/* References */}
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Reference 1 Full Name</label>
          <input
            type="text"
            name="reference1Name"
            value={formData.reference1Name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Reference 1 Phone</label>
          <input
            type="text"
            name="reference1Phone"
            value={formData.reference1Phone}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Reference 1 Email</label>
          <input
            type="email"
            name="reference1Email"
            value={formData.reference1Email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Reference 2 Full Name</label>
          <input
            type="text"
            name="reference2Name"
            value={formData.reference2Name}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Reference 2 Phone</label>
          <input
            type="text"
            name="reference2Phone"
            value={formData.reference2Phone}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Reference 2 Email</label>
          <input
            type="email"
            name="reference2Email"
            value={formData.reference2Email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* Required Documentation */}
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Documentation Links (comma-separated URLs)
            <br />
            One copy of the following documents is required, failure to provide the documents will result in the application being rejected:
            <br />
            - Photo ID
            <br />
            - Proof of Address
            <br />
            - Proof of Income(if any)
            <br />
            - Proof of recent bills paid/pending 
            <br />
            If you have received assistance from us before, please provide the receipt of the last assistance received.
          </label>
          <textarea
            name="documentationLinks"
            value={formData.documentationLinks.join(', ')}
            onChange={(e) => {
              const links = e.target.value.split(',').map((link) => link.trim());
              setFormData((prevData) => ({ ...prevData, documentationLinks: links }));
            }}
            style={{ ...styles.input, ...styles.textarea }}
            placeholder="Paste URLs of documents"
            required
            rows={3}
          />
        </div>

        {/* Certification & Agreement */}
        <div style={styles.fieldContainer}>
          <label style={styles.label}>
            <input
              type="checkbox"
              name="certificationAgreement"
              checked={formData.certificationAgreement}
              onChange={handleChange}
              style={styles.checkbox}
              required
            />
            I certify that the information provided is accurate and truthful.
          </label>
        </div>

        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
      <Modal show={showModal} onClose={() => setShowModal(false)} title="Success">
        <p>Your form has been successfully submitted!</p>
      </Modal>
    </div>
  );
};

// Styles object
const styles = {
  formContainer: {
    width: '90%',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    color: '#333',
  },
  fieldContainer: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    minHeight: '100px',
  },
  radio: {
    margin: '0 10px 0 0',
  },
  checkbox: {
    margin: '0 5px 0 0',
  },
  submitButton: {
    width: '100%',
    padding: '10px 15px',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default ApplicantForm;

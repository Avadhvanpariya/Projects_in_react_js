import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap'
import Card from '../../../components/Card';
import './styles.css';
import axiosInstance from '../../../js/api'; // Import axiosInstance from your API file
import { Link } from 'react-router-dom';

function Scanner() {
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 10,
    });

    scanner.render(success, error);

    function success(result) {
      try {
        const resultObject = JSON.parse(result);
        scanner.clear();
        setScanResult(resultObject);
        setScanning(false);

        // Check if data already sent for this QR code
        const isDataSent = checkIfDataSent(resultObject);

        if (!isDataSent) {
          // Make a POST request to send the scanned data and current date/time
          sendScannedData(resultObject);
        } else {
          console.log('Data already sent for this QR code.');
        }
      } catch (error) {
        console.warn('Error parsing scan result:', error);
        setScanning(false);
      }
    }

    function error(err) {
      console.warn(err);
      setScanning(false);
    }
  }, []);

  const checkIfDataSent = (data) => {
    const localStorageKey = 'scannedData';
    const storedData = localStorage.getItem(localStorageKey);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData.some(item => JSON.stringify(item) === JSON.stringify(data));
    }

    return false;
  };

  const sendScannedData = async (data) => {
    try {
      const currentDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
      });

      const postData = {
        ...data,
        scan_time_date: currentDate,
      };

      console.log(postData);

      // Save the scanned data in local storage
      saveScannedDataToLocalstorage(data);

      const response = await axiosInstance.post('/create-scan-data', postData);

      if (response.data.status === 200) {
        console.log('Scanned data sent successfully');
      } else {
        console.error('Error sending scanned data:', response.data.message);
      }
    } catch (error) {
      console.error('Error sending scanned data:', error.message);
    }
  };

  const saveScannedDataToLocalstorage = (data) => {
    const localStorageKey = 'scannedData';
    const storedData = localStorage.getItem(localStorageKey);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      parsedData.push(data);
      localStorage.setItem(localStorageKey, JSON.stringify(parsedData));
    } else {
      const initialData = [data];
      localStorage.setItem(localStorageKey, JSON.stringify(initialData));
    }
  };

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h3 className="card-title">QR Code Scanning</h3>
                </div>
              </Card.Header>
              <Card.Body className="px-3">
                {scanning ? (
                  <div id="reader" className='scaning-area'></div>
                ) : (
                  <div>
                    {scanResult ? (
                      <form>
                        <div className="row">
                          <div className="col-12 col-md-12">
                            <h4 className='text-center success-msg'>Success</h4>
                            <div className="row mt-3 ">
                              <Form.Group className="col-md-6 form-group">
                                <Form.Label htmlFor="fname">Name:</Form.Label>
                                <Form.Control
                                  type="text"
                                  id="fname"
                                  name="name"
                                  value={scanResult.name}
                                />
                              </Form.Group>
                              <Form.Group className="col-md-6 form-group">
                                <Form.Label htmlFor="days">
                                  Days:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="days"
                                  name="days"
                                  value={scanResult.days}
                                />
                              </Form.Group>
                              <Form.Group className="col-md-6 form-group">
                                <Form.Label htmlFor="book-date">Book Date:</Form.Label>
                                <Form.Control
                                  type="text"
                                  id="book-date"
                                  name="book-date"
                                  value={scanResult.bookDate}
                                />
                              </Form.Group>
                              <Form.Group className="col-md-6 form-group">
                                <Form.Label htmlFor="access">Access:</Form.Label>
                                <Form.Control
                                  type="text"
                                  id="access"
                                  name="access"
                                  value={scanResult.access}
                                />
                              </Form.Group>
                              <button style={{ padding: '5px', borderRadius: '3px', backgroundColor: '#186cff', color: '#fff' }}>OK</button>
                            </div>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <p>No scan result available.</p>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Scanner;

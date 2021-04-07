import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Table, Button, Modal, Row, Col } from 'react-bootstrap';

const Home = () => {
    const [data, setData] = useState([]);
    const [datas, setDatas] = useState([]);
    const [num, setNum] = useState("");
    const [number, setNumber] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleTransaction = () => {
        axios.post('http://localhost:5000/transactions', {
            company_symbol: 'CHL',
            quantity: 20,
            unit_price: 120,
            transaction_type: 'sell',
            transaction_date: '2021-04-07'
          })
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
    }

    const backendHostUrl = "http://localhost:5000"

    const requestOne = axios.get(backendHostUrl + "/transactions");
    const requestTwo = axios.get(backendHostUrl + "/names");

    useEffect(() => {
        // axios.get(backendHostUrl + "/transactions")
        // axios.all([requestOne, requestTwo])
        requestOne
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
            })
    }, []);

    useEffect(() => {
        requestTwo
        .then((response) => {
            setDatas(response.data)
        })
        .catch((error) => {
            console.error("Error fetching data: ", error)
        })
    }, []);

    return (
        <>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>S.N.</th>
                        <th>Stock Name</th>
                        <th>Transaction Type</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Transaction Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((deta, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{deta.company_symbol}</td>
                            <td>{deta.transaction_type}</td>
                            <td>{deta.quantity}</td>
                            <td>{deta.amount}</td>
                            <td>{deta.transaction_date}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center">
                <Button variant="success" onClick={handleShow} className="mr-5" >
                    Buy/Sell
                </Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Transact Now</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Stock Name: </Form.Label>
                            <Form.Control as="select">
                                <option>Select</option>
                                {datas.map((deta, index) => (
                                    <option key={index}>{deta.company_name}({deta.company_symbol})</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Number of Stocks</Form.Label>
                            <Form.Control required isValid={num ? true : false} min="1" max="50" type="number" value={num} onChange={event => setNum(event.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Value of Stock</Form.Label>
                            <Form.Control required isValid={number ? true : false} min="1" max="500" type="number" value={number} onChange={event => setNumber(event.target.value)} />
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col>
                                <Form.Label>Transaction Type</Form.Label>
                                <Form.Control as="select">
                                    <option>Select</option>
                                    <option>Buy</option>
                                    <option>Sell</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Total: </Form.Label>
                            <Form.Control type="number" value={Math.abs(num * number)} readOnly />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="text" value={Date()} readOnly />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleTransaction, handleClose} >
                        Proceed
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Home

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Table, Button, Modal, Row, Col } from 'react-bootstrap';

const Home = () => {
    const [data, setData] = useState([]);
    const [num, setNum] = useState("");
    const [show, setShow] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const backendHostUrl = "http://localhost:5000"

    useEffect(() => {
        axios.get(backendHostUrl + "/transactions")
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
            })

        // fetch('https://jsonblob.com/api/jsonBlob/04c5032d-92dd-11eb-98cf-c35208dfb663')
        // .then((response) => response.json())
        // .catch((error) => {
        //     console.error("Error fetching data...", error)
        // });
    }, [])

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
                            <th scope="row">{index+1}</th>
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
                                <option>----------</option>
                                {data.map((deta, index) => (
                                    <option key={index}>{deta.company_symbol}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1" hasValidation>
                            <Form.Label>Number of Stocks</Form.Label>
                            <Form.Control required isValid={num ? true : false} min="1" max="50" type="number" value={num} maxValue="50" onChange={event => setNum(event.target.value)} />
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col>
                                <Form.Label>Transaction Type</Form.Label>
                                    <Form.Check type="radio" label="Buy" name="firstRadio" id="firstRadioButton" />
                                    <Form.Check type="radio" label="Sell" name="secondRadio" id="secondRadioButton" />
                            </Col>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Total: </Form.Label>
                            <Form.Control type="number" value={num * 100} disabled />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="text" value={Date()} disabled />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Proceed
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Home

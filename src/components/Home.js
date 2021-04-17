import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Table, Button, Modal, Row, Col, InputGroup, Spinner } from 'react-bootstrap';

const Home = () => {
    const [data, setData] = useState([]);
    const [datas, setDatas] = useState([]);
    const [num, setNum] = useState("");
    const [number, setNumber] = useState("");
    const [show, setShow] = useState(false);
    const [stockName, setStockName] = useState("");
    const [transactionType, setTransactionType] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const date = new Date();

    const handleTransaction = () => {
        const start = stockName.lastIndexOf('(');
        const end = stockName.lastIndexOf(')');
        const symbol = stockName.substring(start + 1, end);

        axios.post(backendHostUrl + '/transactions', {
            company_symbol: symbol,
            quantity: parseInt(num),
            unit_price: parseInt(number),
            transaction_type: transactionType,
            transaction_date: date
        })
            .then((response) => {
                setData(response.data);
            }, (error) => {
                console.log(error);
            });
        handleClose();
    }

    const backendHostUrl = "https://sharebazar.herokuapp.com"




    useEffect(() => {
        // axios.get(backendHostUrl + "/transactions")
        // axios.all([requestOne, requestTwo])
        const requestOne = axios.get(backendHostUrl + "/transactions");
        requestOne
            .then((response) => {
                setData(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
            })
    }, []);

    useEffect(() => {
        const requestTwo = axios.get(backendHostUrl + "/names");
        requestTwo
            .then((response) => {
                setDatas(response.data)
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
            })
    }, []);

    return (
        isLoading ?
            <div className="d-flex align-items-center justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <p>Loading...</p>
            </div>
            :
            <div>
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
                                <td>{deta.transaction_date.substring(0, 10)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-center">
                    <Button variant="success" onClick={handleShow} >
                        Buy/Sell
                    </Button>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Transact Now</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleTransaction} id="form">
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Stock Name: </Form.Label>
                                <Form.Control as="select" value={stockName} onChange={(event) => setStockName(event.target.value)}>
                                    <option>Select</option>
                                    {datas.map((deta, index) => (
                                        <option key={index} >{deta.company_name}({deta.company_symbol})</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">Please select an option!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Number of Stocks</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control required isValid={num ? true : false} name="num" min="1" max="50" type="number" value={num} onChange={(event) => setNum(event.target.value)} />
                                    <Form.Control.Feedback type="invalid">Please enter the number of stocks!</Form.Control.Feedback>
                                    {console.log(num)}
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput2">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control required isValid={number ? true : false} name="number" min="1" max="500" type="number" value={number} onChange={(event) => setNumber(event.target.value)} />
                                <Form.Control.Feedback type="invalid">Please enter the amount!</Form.Control.Feedback>
                                {console.log(number)}
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col>
                                    <Form.Label>Transaction Type</Form.Label>
                                    <Form.Control as="select" value={transactionType} onChange={(event) => setTransactionType(event.target.value)} >
                                        <option>Select</option>
                                        <option value="buy">Buy</option>
                                        <option value="sell">Sell</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">Please select an option!</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Total: </Form.Label>
                                <Form.Control type="number" value={Math.abs(num * number)} readOnly />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" value={Date().substring(0, 24)} readOnly />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                    </Button>
                        <Button variant="primary" onClick={handleTransaction} disabled={!num || !number || !stockName || !transactionType ? true : false} >
                            Proceed
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
    )
}

export default Home

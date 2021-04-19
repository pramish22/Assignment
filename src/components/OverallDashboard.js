import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Spinner } from 'react-bootstrap'

const OverallDashboard = () => {
    const backendHostUrl = "https://sharebazar.herokuapp.com";

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(backendHostUrl + "/dashboardtotal")
            .then((response) => {
                setData(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
            })
    }, [])
    return (
        isLoading ?
        <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
            :
        <div>
            <Table responsive striped bordered hover>
                <thead className="table-success">
                    <tr>
                        <th>S.N.</th>
                        <th>Total Buy Quantity</th>
                        <th>Total Buy Amount</th>
                        <th>Total Sell Amount</th>
                        <th>Remaining Stocks</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((deta, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{deta.total_buy_quantity}</td>
                            <td>{deta.total_buy_amount}</td>
                            <td>{deta.total_sale_amount}</td>
                            <td>{deta.balance_quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default OverallDashboard

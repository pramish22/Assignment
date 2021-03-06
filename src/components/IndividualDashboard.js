import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'

const IndividualDashboard = () => {
    const backendHostUrl = "https://sharebazar.herokuapp.com";

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        axios.get(backendHostUrl + "/dashboard")
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
            {data.map((deta, index) => (
                <div key={index}>
                <h5 className="d-flex justify-content-center">{deta.company_name}</h5>
                <Table responsive striped bordered hover>
                <thead className="table-success">
                    <tr>
                        <th>Company Symbol</th>
                        <th>Total Buy Quantity</th>
                        <th>Total Buy Amount</th>
                        <th>Total Sell Amount</th>
                        <th>Remaining Stocks</th>
                    </tr>
                </thead>
                <tbody>
                        <tr key={index}>
                            <td>{deta.company_symbol}</td>
                            <td>{deta.total_buy_quantity}</td>
                            <td>{deta.total_buy_amount}</td>
                            <td>{deta.total_sale_amount}</td>
                            <td>{deta.balance_quantity}</td>
                        </tr>
                </tbody>
            </Table>
            </div>
            ))}
        </div>
    )
}

export default IndividualDashboard

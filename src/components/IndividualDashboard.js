import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

const IndividualDashboard = () => {
    const backendHostUrl = "http://localhost:5000";

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(backendHostUrl + "/dashboard")
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
            })
    }, [])
    return (
        <div>
            {data.map((deta, index) => (
                <div key={index}>
                <h5>{deta.company_name}</h5>
                <Table responsive striped bordered hover>
                <thead className="table-success">
                    <tr>
                        <th>S.N.</th>
                        <th>Company Symbol</th>
                        <th>Total Buy Quantity</th>
                        <th>Total Buy Amount</th>
                        <th>Total Sell Amount</th>
                        <th>Remaining Stocks</th>
                    </tr>
                </thead>
                <tbody>
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
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

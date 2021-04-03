import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [data, setData] = useState([]);
    const [num, setNum] = useState("");
    useEffect(() => {
        axios.get('https://jsonblob.com/api/jsonBlob/04c5032d-92dd-11eb-98cf-c35208dfb663')
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
        <div className="container-fluid">
            <div className="row justify-content-md-center">
                <div>
                    <div className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">S.N.</th>
                                <th scope="col">Stock Name</th>
                                <th scope="col">Transaction Type</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Transaction Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((deta) => (
                                <tr>
                                    <th scope="row">{deta.transaction_id}</th>
                                    <td>{deta.company_symbol}</td>
                                    <td>{deta.transaction_type}</td>
                                    <td>{deta.quantity}</td>
                                    <td>{deta.amount}</td>
                                    <td>{deta.transaction_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </div>
                </div>
            </div>
            <form className="col-12 col-sm-4 mt-10">
                <div className="mb-3">
                    <select className="form-select" aria-label="Stock Name">
                        <option selected>Stock Name</option>
                        {data.map((deta) => (
                            <>
                                <option value={deta.transaction_id}>{deta.company_symbol}</option>
                            </>
                        ))}
                    </select>
                </div>
                <div>
                    <label for="numberOfStocks" className="form-label">Number of Stocks</label>
                    <input type="number" className="form-control" id="numberOfStocks"
                        value={num} onChange={event => setNum(event.target.value)} />
                </div>
                <div>
                    <select className="form-select" aria-label="Transaction Type">
                        <option selected>Transaction Type</option>
                        <option value="1">Buy</option>
                        <option value="2">Sell</option>
                    </select>
                </div>
                <div className="row">
                    <h6>Total: </h6>
                    <input disabled type="text" value={num * 100} />
                </div>
                <div>
                    <fieldset disabled>
                        <input type="text" id="disabledTextInput" class="form-control" placeholder={new Date()} />
                    </fieldset>
                </div>
                <button className="btn btn-primary" type="submit">Buy</button>
            </form>

        </div>
    )
}

export default Home

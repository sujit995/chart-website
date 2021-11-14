import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './styles.css';


function GraphChart() {
    const [graph, setGraph] = useState([]);
    const [getdata, setGetData] = useState([]);
    const [toggle, setToggle] = useState(false);


    const countryDetail = async () => {
        axios.get("http://localhost:3000/medals")

            .then(response => {
                setGetData(response.data);
            });

    }
    useEffect(() => {
        countryDetail();
    }, []);


    const selectChart = () => {
        axios.get(`http://localhost:3000/medals`)
            .then(res => {
                const countryData = res.data;
                let playerId = [];
                let yom = [];
                let nom = [];
                countryData.forEach(element => {
                    playerId.push(element.Id);
                    yom.push(element.Year);
                    nom.push(element.Medals);
                });
                setGraph({
                    labels: yom,
                    datasets: [
                        {
                            label: "Medals own",
                            data: nom,
                            backgroundColor: "red",
                            borderWidth: 4,
                            color: "red"
                        }
                    ]
                });
            });

    }
    useEffect((e) => {
        selectChart();
    }, []);

    return (
        <div className="container">
            <div className="heading">
                <h6>Medals Own By india</h6>
            </div>
            <div>
                {
                    !toggle ?
                        <>
                            <h4>Table Data of Players</h4>
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Year</th>
                                            <th>Medals</th>
                                        </tr>
                                    </thead>

                                    {getdata.map((name) => (
                                        <tbody>
                                            <tr>
                                                <td>{name.Id}</td>
                                                <td>{name.Year}</td>
                                                <td>{name.Medals}</td>
                                            </tr>
                                        </tbody>
                                    )
                                    )}
                                </table>
                            </div>
                        </>
                        :
                        <>
                            <div className="chart-container">
                                <h4>Chart Data of Players</h4>
                                <Line
                                    data={graph}
                                    options={{
                                        responsive: true,
                                        title: { text: "Medals", display: true }
                                    }}
                                />
                            </div>
                        </>
                }
            </div>
            <div className="btn-container">
                <button className="btn" onClick={() => setToggle(!toggle)}>{!toggle ? "chart-data" : "table-data"}</button>
            </div>
        </div>
    )
}
export default GraphChart;
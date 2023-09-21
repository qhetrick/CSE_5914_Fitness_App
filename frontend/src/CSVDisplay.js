import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Data from './exercise_list.csv'
import VideoCard from './VideoCard'

// This function is used to populate an object that contains a video that will be displayed on the web page
function CSVDisplay() {
    const [data, setData] = useState([]);

    // parse CSV data and store it in the component state
    // const handleFileUpload = (event) => {
    //   const file = event.target.files[0];
    //   Papa.parse(file, {
    //     header: true,
    //     complete: (results) => {
    //       setData(results.data);
    //     },
    //   });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(Data);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder("utf-8");
            const csvData = decoder.decode(result.value);
            const parsedData = Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true
            }).data;
            setData(parsedData);
        };
        fetchData();
    }, []);

    return (
        <div className="CSVDisplay">

            {/* <input type="file" accept=".csv" onChange={handleFileUpload} /> */}

            {/* {data.length ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>equipment</th>
                            <th>level</th>
                            <th>muscle</th>
                            <th>previewSrc</th>
                            <th>videoLink</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.equipment}</td>
                                <td>{row.level}</td>
                                <td>{row.muscle}</td>
                                <td>{row.previewSrc}</td>
                                <td>{row.videoLink}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            ) : null} */}

            {data.length ? (
                data.map((row, index) => (<VideoCard title={row.name} description={row.muscle} image={row.previewSrc} videoLink={row.videoLink} />))
            ) : null}


            <br /><br />

        </div>
    );
}

export default CSVDisplay;
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Data from './exercise_list.csv'
import VideoCard from './VideoCard'
import { Grid } from '@mui/material';

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
            <Grid container>
                {data.length ? (
                    data.map(row => (
                        <Grid item key={row.name} xs={12} sm={6} md={4}>
                            <VideoCard title={row.name} description={row.muscle} image={row.previewSrc} videoLink={row.videoLink} />
                        </Grid>
                    ))
                ) : null}
            </Grid>
            <br /><br />
        </div>
    );
}

export default CSVDisplay;
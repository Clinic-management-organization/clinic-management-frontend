import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement // Import ArcElement
} from 'chart.js';
import { getStatConsultation, getStatTotalConsultation, } from '../../services/ConsultationService';
import { getStatRendezVous } from '../../services/RendezVousServices';
import { Container } from '@mui/material';

// Registering the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Register ArcElement
);

const MonthlyIncomeChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Monthly Income',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  });

  const [rendezvousData, setRendezvousData] = useState({
    labels: [],
    datasets: [{
      label: 'Rendezvous Count',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  });

  const [allData, setAllData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatConsultation();
        if (response && Array.isArray(response)) {
          setAllData(response);
		          console.log("response",response);

          filterDataByYear(response, selectedYear);
        } else {
          console.error("Invalid or missing data format:", response);
        }

        const total = await getStatTotalConsultation();    
        setTotalPrice(total);

        const rendezvousCount = await getStatRendezVous();
        if (rendezvousCount && Array.isArray(rendezvousCount)) {
          setAllData(rendezvousCount);
		  console.log("rendezvousCount", rendezvousCount)
          filterRDVByYear(rendezvousCount, selectedYear);
        } else {
          console.error("Invalid or missing data format:", rendezvousCount);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedYear]);

  const filterDataByYear = (data, year) => {
    const filteredData = data.filter(entry => entry[1] === year);
    const labels = filteredData.map(entry => `Mois ${entry[0]}`);
    const values = filteredData.map(entry => entry[2]);

    setChartData({
      labels: labels,
      datasets: [{
        label: 'Revenu Mensuel',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }]
    });
  };

  const filterRDVByYear = (data, year) => {
    const filteredData = data.filter(entry => entry[1] === year);
    const labels = filteredData.map(entry => `Mois ${entry[0]}`);
    const values = filteredData.map(entry => entry[2]);

    setRendezvousData({
      labels: labels,
      datasets: [{
        label: 'Nombre RDV',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }]
    });
  };

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);
  };

  const years = [...new Set(allData.map(entry => entry[1]))].sort();

  const doughnutData = {
    labels: ['Total Price'],
    datasets: [
      {
        label: 'Total Price',
        data: [totalPrice],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      }
    ]
  };

  return (
    <Container className="container" component="main" style={{ width: "70%" }}>
      <h2>Statistiques</h2>
      <div>
        <label htmlFor="yearSelector">Année: </label>
        <select id="yearSelector" value={selectedYear} onChange={handleYearChange} >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <h3>Consultation par mois</h3>

      <Bar 
        data={chartData} 
        options={{
          scales: {
            x: {
              type: 'category',
            },
            y: {
              beginAtZero: true,
            }
          }
        }} 
      />
      <div style={{ marginTop: '20px' ,width:'50%'}}>
        <h3>Revenu Total: {totalPrice?.toFixed(2)}</h3>
        <Doughnut data={doughnutData} />
      </div>
      <div style={{ marginTop: '20px' ,width:'100%'}}>
        <h3>Rendez-vous par mois</h3>
        <div>
     
      </div>
        <Bar 
          data={rendezvousData} 
          options={{
            scales: {
              x: {
                type: 'category',
              },
              y: {
                beginAtZero: true,
              }
            }
          }} 
        />
      </div>
    </Container>
  );
};

export default MonthlyIncomeChart;

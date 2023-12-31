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
import { getStatConsultation, getStatTotalConsultation, getRendezVousCountByMonth } from '../../services/ConsultationService';
import { getStatRendezVous } from '../../services/RendezVousServices';

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
          filterDataByYear(response, selectedYear);
        } else {
          console.error("Invalid or missing data format:", response);
        }

        const total = await getStatTotalConsultation();
        setTotalPrice(total);

        const rendezvousCount = await getStatRendezVous();
        if (rendezvousCount && Array.isArray(rendezvousCount)) {
          const labels = rendezvousCount.map(entry => `Month ${entry[0]}`);
          const values = rendezvousCount.map(entry => entry[1]);

          setRendezvousData({
            labels: labels,
            datasets: [{
              label: 'Rendezvous Count',
              data: values,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            }]
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedYear]);

  const filterDataByYear = (data, year) => {
    const filteredData = data.filter(entry => entry[1] === year);
    const labels = filteredData.map(entry => `Month ${entry[0]}`);
    const values = filteredData.map(entry => entry[2]);

    setChartData({
      labels: labels,
      datasets: [{
        label: 'Monthly Income',
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
    <div style={{width:'60%'}}>
      <h2>Charts Overview</h2>
      <div>
        <label htmlFor="yearSelector">Select Year: </label>
        <select id="yearSelector" value={selectedYear} onChange={handleYearChange}>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
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
        <h3>Total Price: {totalPrice.toFixed(2)}</h3>
        <Doughnut data={doughnutData} />
      </div>
      <div style={{ marginTop: '20px' ,width:'100%'}}>
        <h3>Rendez-vous Count by Month</h3>
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
    </div>
  );
};

export default MonthlyIncomeChart;

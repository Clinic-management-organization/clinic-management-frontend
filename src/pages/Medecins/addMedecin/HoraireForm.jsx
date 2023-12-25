// HoraireForm.js

import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';

const HoraireForm = ({ onClick }) => {
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    onClick({ dayOfWeek, startTime, endTime });
    // Réinitialiser les champs après la soumission si nécessaire
    setDayOfWeek('');
    setStartTime('');
    setEndTime('');
  };

  return (
    <div>
      <div style={{display: "flex", gap:"15px", marginBottom: "15px", width: "700px"}}>
        <FormControl fullWidth >
          <InputLabel htmlFor="dayOfWeek">Jour de la semaine</InputLabel>
          <Select
            value={dayOfWeek}
            label="Jour de la semaine"
            onChange={(e) => setDayOfWeek(e.target.value)}
          >
            <MenuItem value="MONDAY">Lundi</MenuItem>
            <MenuItem value="TUESDAY">Mardi</MenuItem>
            <MenuItem value="WEDNESDAY">Mercredi</MenuItem>
            <MenuItem value="THURSDAY">Jeudi</MenuItem>
            <MenuItem value="FRIDAY">Vendredi</MenuItem>
            <MenuItem value="SATURDAY">Samedi</MenuItem>
            <MenuItem value="SUNDAY">Dimanche</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <TextField
          fullWidth
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <Button type="submit" variant="contained" color="primary" onClick={handleClick}>
        Ajouter Horaire
      </Button>
    </div>
  );
};

export default HoraireForm;

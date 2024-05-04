import React from 'react'
import  { Bar } from 'react-chartjs-2'
import {Chart as chartjs} from "chart.js/auto"
import { prototype } from 'events'
import PropTypes from 'prop-types';

function BarChart({chartData}) {
  return (
    
    <Bar  data={chartData}  />
  )
}

export default BarChart

BarChart.propTypes ={
  chartData : PropTypes.String
}
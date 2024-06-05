import { CategoryScale, Legend, LinearScale, LineElement, PointElement, TimeScale, Title, Tooltip } from "chart.js";

export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 2000,
    easing: 'easeInOutQuint',
    animateRotate: true,
  },
  plugins: {
    title: {
      display: true,
      text: 'Title',
    }
  },
  title: {
    display: true,
    fontSize: 20,
    position: 'top',
  },
  legend: {
    display: true,
    position: 'bottom',
    align: 'start'
  },
  tooltips: {
    enabled: true,
    mode: 'nearest',
    intersect: false
  }
}

export const defaultRegister= [
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip
]
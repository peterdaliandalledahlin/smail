<template>
    <Line />
    <button @click="changeChart"></button>
</template>
<script>
import { defineComponent, h } from 'vue'

import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

export default defineComponent({
  name: 'LineChart',
  components: {
    Line
  },
  props: {
    note:   {
      type: Object,
      required: true
    },
    chartId: {
      type: String,
      default: 'line-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const chartData = {
      labels: ['Individens tro på att få ett arbete', 'Kunskap om arbetsmarknadnaden', 'Målmedvetenhet', 'Samarbetsförmåga', 'Hantering av vardagen', 'Hälsotillstånd'],
      datasets: [
        {
          label: '2022-09-24',
          backgroundColor: '#f87979',
          data: [props.note.beliefInWork, props.note.laborMarket, props.note.purposeFulness, props.note.abilityToWorkTogether, props.note.handlingOfEverydayLife, props.note.stateOfHealth],
          data: [0,1,1,4,2,3],
        },
        {
          label: '2022-08-08',
          backgroundColor: '#00ff00',
          data: [props.note.beliefInWork, props.note.laborMarket, props.note.purposeFulness, props.note.abilityToWorkTogether, props.note.handlingOfEverydayLife, props.note.stateOfHealth],
          data: [2,3,3,1,0,5],
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          y: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1,
            }
          }
        }
    }

    return () =>
      h(Line, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
  }
})
</script>
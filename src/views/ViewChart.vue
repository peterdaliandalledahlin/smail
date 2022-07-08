<template>
 <Radar />
</template>

<script>
import { defineComponent, h } from 'vue'
import { useDateFormat } from '@vueuse/core'
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement
)

export default defineComponent({
  name: 'RadarChart',
  components: {
    Radar
  },
  props: {
    note:   {
      type: Object,
      required: true
    },
    chartId: {
      type: String,
      default: 'radar-chart'
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

      labels: [
        'Individens tro på att få ett arbete',
        'Kunskap om arbetsmarknaden',
        'Målmedvetenhet',
        'Samarbetsförmåga',
        'Hantering av vardagen',
        'Hälsotillstånd'
      ],
      datasets: [
        {
          label: useDateFormat(new Date(parseInt(props.note.date)), 'YYYY-MM-DD HH:mm:ss').value,
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [props.note.beliefInWork, props.note.laborMarket, props.note.purposeFulness, props.note.abilityToWorkTogether, props.note.handlingOfEverydayLife, props.note.stateOfHealth],
        },
        {
          label: useDateFormat(new Date(parseInt(props.note.date)), 'YYYY-MM-DD HH:mm:ss').value,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [1,3,3,5,5,1],
        },
        {
          label: useDateFormat(new Date(parseInt(props.note.date)), 'YYYY-MM-DD HH:mm:ss').value,
          backgroundColor: 'rgba(99,255,132,0.2)',
          borderColor: 'rgba(99,255,132,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [2,2,4,5,1,3],
        },
        
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
        
        scales: {
          r: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1,
            }
          }
        }
      
    }

    return () =>
      h(Radar, {
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

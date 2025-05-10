<template>
  <div class="wrapper" :style="`background-color: ${currentMonth.color}`">
    <!-- Year navigation -->
    <div class="year-section">
      <button class="nav-btn" @click="prevYear">‹</button>
      <span>{{ paddedYear }}</span>
      <button class="nav-btn" @click="nextYear">›</button>
    </div>

    <!-- Month navigation -->
    <div class="month-section">
      <button class="nav-btn" @click="prevMonth">‹</button>
      <span>{{ currentMonth.name }}</span>
      <button class="nav-btn" @click="nextMonth">›</button>
    </div>

    <!-- Weekday headers -->
    <div class="day-name">
      <div v-for="wd in days" :key="wd.id" class="weekday" :title="wd.name">
        {{ wd.short }}
      </div>
    </div>

    <!-- 30‑day month grid -->
    <div class="calendar">
      <div v-for="d in 30" :key="d" class="day">
        {{ d }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

// 6‑day week definitions
const days = ref([
  { id: 's', short: 'Sun', name: 'Sundara' },
  { id: 'l', short: 'Lun', name: 'Lunara' },
  { id: 'd', short: 'Darn', name: 'Darneth' },
  { id: 'q', short: 'Quor', name: 'Quoryn' },
  { id: 'f', short: 'Fex', name: 'Fexari' },
  { id: 'z', short: 'Zel', name: 'Zelveth' },
])

const months = ref([
  // 1‑month Eclipse
  { id: 1, name: 'Ecliptis', season: 'Eclipse', color: '#C0C0C0' },

  // 4‑month Ashfall: light → dark
  { id: 2, name: 'Emberlyn', season: 'Ashfall', color: '#7F7F7F' }, // +15% lightness
  { id: 3, name: 'Cindera', season: 'Ashfall', color: '#666666' }, // +5%
  { id: 4, name: 'Smokehollow', season: 'Ashfall', color: '#4C4C4C' }, // –5%
  { id: 5, name: 'Dustmere', season: 'Ashfall', color: '#333333' }, // –15%

  // 3‑month Fall: light → dark
  { id: 6, name: 'Goldshade', season: 'Fall', color: '#C7713B' }, // +10%
  { id: 7, name: 'Leafrest', season: 'Fall', color: '#B35A1D' }, // base
  { id: 8, name: 'Witherhold', season: 'Fall', color: '#8F4519' }, // –10%

  // 3‑month Frost: light → dark
  { id: 9, name: 'Icewake', season: 'Frost', color: '#D9E5F0' }, // +10%
  { id: 10, name: 'Chilldeep', season: 'Frost', color: '#A8D0E6' }, // base
  { id: 11, name: 'Snarethorn', season: 'Frost', color: '#7BB4D2' }, // –10%

  // 3‑month Bloom: light → dark
  { id: 12, name: 'Petalrise', season: 'Bloom', color: '#67D36B' }, // +10%
  { id: 13, name: 'Blushwood', season: 'Bloom', color: '#4CAF50' }, // base
  { id: 14, name: 'Verdance', season: 'Bloom', color: '#399D3F' }, // –10%

  // 3‑month Spore: light → dark
  { id: 15, name: 'Mycora', season: 'Spore', color: '#DED7EA' }, // +10%
  { id: 16, name: 'Fadenight', season: 'Spore', color: '#BFA2DB' }, // base
  { id: 17, name: 'Moulden', season: 'Spore', color: '#9D85C9' }, // –10%

  // 3‑month Storm: light → dark
  { id: 18, name: 'Thundervale', season: 'Storm', color: '#596F6F' }, // +10%
  { id: 19, name: 'Rainmarch', season: 'Storm', color: '#2F4F4F' }, // base
  { id: 20, name: 'Skyrend', season: 'Storm', color: '#263737' }, // –10%

  // 3‑month Heat: light → dark
  { id: 21, name: 'Blazewind', season: 'Heat', color: '#F07A53' }, // +10%
  { id: 22, name: 'Searshade', season: 'Heat', color: '#E25822' }, // base
  { id: 23, name: 'Cindrel', season: 'Heat', color: '#C2461A' }, // –10%

  // 3‑month Surge: light → dark
  { id: 24, name: 'Crestfall', season: 'Surge', color: '#8A5DC1' }, // +10%
  { id: 25, name: 'Brinetide', season: 'Surge', color: '#6F2DA8' }, // base
  { id: 26, name: 'Rimewake', season: 'Surge', color: '#55248F' }, // –10%

  // 4‑month Harvest: light → dark
  { id: 27, name: 'Bountycall', season: 'Harvest', color: '#F2BA5F' }, // +15%
  { id: 28, name: 'Gildmere', season: 'Harvest', color: '#E19F3C' }, // +5%
  { id: 29, name: 'Rootdeep', season: 'Harvest', color: '#A26E0C' }, // –5%
  { id: 30, name: 'Wainmoor', season: 'Harvest', color: '#7B5500' }, // –15%
])

// Reactive state
const currentYear = ref(1)
const currentMonthIndex = ref(0)

const paddedYear = computed(() => String(currentYear.value).padStart(4, '0'))
const currentMonth = computed(() => months.value[currentMonthIndex.value])

const nextYear = () => {
  currentYear.value++
}

const prevYear = () => {
  currentYear.value = Math.max(1, currentYear.value - 1)
}

const nextMonth = () => {
  if (currentMonthIndex.value === months.value.length - 1) {
    currentMonthIndex.value = 0
    currentYear.value++
  } else {
    currentMonthIndex.value++
  }
}

const prevMonth = () => {
  if (currentMonthIndex.value === 0) {
    currentMonthIndex.value = months.value.length - 1
    currentYear.value = Math.max(1, currentYear.value - 1)
  } else {
    currentMonthIndex.value--
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 500px;
  margin: auto;
  padding: 1rem;
  border-radius: 8px;
  transition: background-color 0.8s ease-in-out;

  .year-section,
  .month-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: white;

    .nav-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0 0.5rem;
      line-height: 1;
      color: white;
    }

    span {
      min-width: 6rem;
      text-align: center;
      font-size: 1.3rem;
    }
  }

  .day-name {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;

    .weekday {
      padding: 8px 0;
      background: #d0f0ff;
      border-top: 1px solid #b0e0ff;
      border-bottom: 1px solid #b0e0ff;

      &:first-child {
        border-left: 1px solid #b0e0ff;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      &:last-child {
        border-right: 1px solid #b0e0ff;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }

  .calendar {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(5, auto);
    gap: 8px;

    .day {
      background-color: #f5f5f5;
      border: 1px solid #ccc;
      text-align: center;
      padding: 10px 0;
      border-radius: 4px;
      aspect-ratio: 1 / 1;
      font-size: 14px;
    }
  }
}
</style>

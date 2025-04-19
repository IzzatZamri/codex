<template>
  <div class="timeline-wrapper">
    <!-- Previous button -->
    <button class="nav-btn" @click="prevYear" :disabled="startYear === 1">
      ◀ Previous
    </button>

    <!-- Animated list of 10 years -->
    <transition-group tag="div" class="year-list" name="slide" appear>
      <div v-for="year in displayedYears" :key="year" class="year-item">
        {{ year }}
      </div>
    </transition-group>

    <!-- Next button -->
    <button class="nav-btn" @click="nextYear">Next ▶</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const MAX_DISPLAY = 10
const startYear = ref(1)

// Build the 10‐year window [startYear ... startYear+9]
const displayedYears = computed(() =>
  Array.from({ length: MAX_DISPLAY }, (_, i) => startYear.value + i)
)

function nextYear() {
  startYear.value++
}

function prevYear() {
  if (startYear.value > 1) {
    startYear.value--
  }
}
</script>

<style lang="scss" scoped>
.timeline-wrapper {
  width: 200px;
  margin: 2rem auto;
  text-align: center;
  font-family: sans-serif;

  .nav-btn {
    background: none;
    border: 1px solid #888;
    padding: 0.3rem 0.6rem;
    margin: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  .year-list {
    position: relative;
    height: calc(2rem * 10);
    overflow: hidden;
    border: 1px solid #ddd;
    margin: 0.5rem 0;

    /* ensure children are positioned so FLIP can move them */
    > .year-item {
      position: relative;
    }
  }

  .year-item {
    height: 2rem;
    line-height: 2rem;
    border-bottom: 1px solid #eee;
  }

  /* --- TransitionGroup Move Animation --- */
  .slide-move {
    transition: transform 0.3s ease;
  }

  /* fade entering/leaving items slightly */
  .slide-enter-active,
  .slide-leave-active {
    transition: opacity 0.3s ease;
  }
  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
  }
}
</style>

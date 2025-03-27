<template>
  <div>
    <div v-for="year in 1">
      <div v-for="month in 30">
        <div v-for="day in 30">
          <div>{{ year }}-{{ month }}-{{ day }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

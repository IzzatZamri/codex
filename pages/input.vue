<template>
  <div id="input">
    <h1 style="color: white">Database testing</h1>

    <div style="padding: 15px; display: flex; gap: 15px">
      <div class="card">
        <div class="image">x</div>
        <h2>Day 1</h2>
        <span>9 Dec 1997</span>
        <p>TESTING the Cookie</p>

        <div style="display: flex; gap: 15px">
          <div class="box"></div>
        </div>
      </div>
      <div class="card">
        <div class="image">x</div>
        <h2>Day 2</h2>
        <span>9 Dec 1997</span>
        <p>TESTING the Cookie</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss">
#input {
  background: linear-gradient(45deg, #000 0%, #333 100%);

  .card {
    z-index: 5;
    position: relative;
    width: 260px;
    height: 360px;
    box-shadow: -3px 5px 10px rgba(0, 0, 0, 0.5);
    border-radius: 2px;
    background-color: #e7f0f2;
    font-family: sans-serif;
    padding: 20px;
    box-sizing: border-box;

    .image {
      background-color: #161d1a;
      width: 220px;
      height: 220px;
    }

    h2 {
      margin: 0;
      padding-top: 20px;
      font-size: 25px;
      line-height: 20px;

      font-weight: bold;
      text-transform: uppercase;
    }

    span {
      font-size: 10px;
      color: #5a5a5a;
      text-transform: uppercase;
      margin: 0;
    }

    p {
      margin: 0;
      font-size: 13px;
      padding-top: 5px;
      text-transform: uppercase;
    }
  }
}
</style>

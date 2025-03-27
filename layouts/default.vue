<template>
  <div>
    <div id="navigation-bar">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/worlds">Worlds</NuxtLink>
      <NuxtLink to="/input">Data Testing</NuxtLink>
      <NuxtLink to="/characters">Characters</NuxtLink>
      <NuxtLink to="/personalities">Personalities</NuxtLink>
      <NuxtLink to="/timeline">Timeline</NuxtLink>
      <NuxtLink to="/testing">Testing Layouts</NuxtLink>
    </div>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style scoped lang="scss">
#navigation-bar {
  padding: 10px 15px;
  display: flex;
  gap: 30px;
}
main {
  padding: 1rem;
}
</style>

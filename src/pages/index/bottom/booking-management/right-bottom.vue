<template lang="pug">
  .right-bottom
    .title 进站台次情况
    tableCompents.tableCompents(:data="jztc" @forsort="forsort")
</template>

<script>
import tableCompents from './table'
export default {
  props: ['data'],
  components: {
    tableCompents
  },
  computed: {
    jztc () {
      return this.data
    }
  },
  data () {
    return {
    }
  },
  methods: {
    forsort (type) {
      console.log('>' + type)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .right-bottom
    margin-top 40px
    .title
      font-size 36px
    .tableCompents
      margin-top 30px
</style>

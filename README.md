# Specification Repository for Core Paper

This repository contains redirect links for specifications with a **Core
Paper Identifier**.

<ul>
  <li v-for="spec in specs">
    <strong><a :href="spec.url">{{ spec.id }}</a></strong>:
    {{ spec.description }}
  </li>
</ul>

<script>
export default {
  data () {
      return {
          specs: require("./specs.json")
      }
  }
}
</script>

<script>
export default {
  data() {
    return {
      columnsName: ['#','UserName', 'Email', 'PhoneNumber', 'Events Count', 'Next Event Date']
    }        
  }
}
</script>

<template>
  <div class="table-container">
    <table class="table table-hover table-bordered ">
      <thead>
        <tr>
          <th scope="col" v-for="column of columnsName">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
  .table-container {
    width: 800px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
  }
</style>
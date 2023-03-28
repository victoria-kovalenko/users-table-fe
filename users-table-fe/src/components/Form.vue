<template>
    <form class="row g-3 form">
      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">First Name</label>
        <input type="text" class="form-control" required>
      </div>
      <div class="col-md-6">
        <label for="inputPassword4" class="form-label">Last name</label>
        <input type="text" class="form-control" required>
      </div>
      <div class="col-12">
        <label for="inputAddress" class="form-label">Email</label>
        <input type="email" class="form-control" id="inputEmail4" required>
      </div>
      <div class="col-12">
        <label for="inputAddress2" class="form-label">Phone</label>
        <input type="number" class="form-control" required>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Sign in</button>
      </div>
    </form>
</template>

<style>
.form{
  width:600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
}
</style>
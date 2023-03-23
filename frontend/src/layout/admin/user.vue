<template>
  <div class="container">
    <div class="table-wrapper">
      <div class="table-title">
        <div class="row">
          <div class="col-sm-6">
            <h2>Quản lý <b>khách hàng</b></h2>
          </div>
          <div class="col-sm-6">
            <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                class="fa-solid fa-circle-plus"></i> <span>Thêm khách hàng</span></a>
          </div>
        </div>
      </div>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Họ và tên:</th>
            <th>Email:</th>
            <th>Địa chỉ:</th>
            <th>Số điện thoại:</th>
            <th>Ảnh:</th>
            <th>Đường dẫn ảnh:</th>
            <th>Actions:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td>
              <a type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModaledit"><i class="fa-solid fa-spinner"></i></a>
              <a class="delete"><i class="fa-solid fa-trash-can"></i></a>
            </td>
          </tr>
        </tbody>
      </table>


    </div>
  </div>

  <!-- Add Modal HTML -->

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <div class="form-group">
            <label>Họ và tên:</label>
            <input type="text" class="form-control">
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control">
          </div>

          <div class="form-group">
            <label>Mật khẩu:</label>
            <input type="password" class="form-control">
          </div>

          <div class="form-group">
            <label>Địa chỉ:</label>
            <textarea class="form-control"></textarea>
          </div>

          <div class="form-group">
            <label>Số điện thoại:</label>
            <input type="text" class="form-control">
          </div>

          <div class="form-group">
            <label for="img">Chọn ảnh đại diện:</label>
            <input type="file" />
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary">Thêm</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Modal HTML -->
  <div class="modal fade" id="exampleModaledit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <div class="form-group">
            <label>Họ và tên:</label>
            <input type="text" class="form-control">
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control">
          </div>

          <div class="form-group">
            <label>Mật khẩu:</label>
            <input type="password" class="form-control">
          </div>

          <div class="form-group">
            <label>Địa chỉ:</label>
            <textarea class="form-control"></textarea>
          </div>

          <div class="form-group">
            <label>Số điện thoại:</label>
            <input type="text" class="form-control">
          </div>

          <div class="form-group">
            <label for="img">Chọn ảnh đại diện:</label>
            <input type="file" />
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary">Thêm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>
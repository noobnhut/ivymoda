<template>
    <div class="container">
        <div class="table-wrapper">
          <div class="table-title">
            <div class="row">
              <div class="col-sm-6">
                <h2>Quản lý <b>DANH MỤC</b></h2>
              </div>
              <div class="col-sm-6">
                <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                    class="fa-solid fa-circle-plus"></i> <span>Thêm danh mục</span></a>
              </div>
            </div>
          </div>
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Tên danh mục:</th>
                <th>Tên đối tượng:</th>
                <th>Actions:</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td></td>
                <td></td>
                <td>
                  <a type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModaledit"><i
                      class="fa-solid fa-spinner"></i></a>
                  <a class="delete" ><i class="fa-solid fa-trash-can"></i></a>
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
                <label>Tên danh mục:</label>
                <input type="text" class="form-control" >
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              <button type="button" class="btn btn-primary" >Thêm</button>
            </div>
          </div>
        </div>
      </div>
    
      <!-- Edit Modal HTML -->
      <div class="modal fade" id="exampleModaledit" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
    
              <div class="form-group">
                <label>Tên danh mục:</label>
                <input type="text" class="form-control" >
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              <button type="button" class="btn btn-primary" >Cập nhập</button>
            </div>
          </div>
        </div>
      </div>
</template>
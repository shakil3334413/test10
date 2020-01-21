<template>
        <div class="col-md-12 mt-3">
            <div class="add-user mb-5">
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary float-right" @click="showform()">
                Add New User
                </button>

                <!-- Modal -->
                <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                      <form @submit.prevent="createuser" @keydown="form.onKeydown($event)">
                        <div class="form-group">
                          <label>Name</label>
                          <input v-model="form.name" type="text" name="name"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('name') }" placeholder="Enter Your User Name">
                          <has-error :form="form" field="name"></has-error>
                        </div>

                        <div class="form-group">
                          <label>Email</label>
                          <input v-model="form.email" type="email" name="email"
                            class="form-control" placeholder="Enter Your Email" :class="{ 'is-invalid': form.errors.has('email') }">
                          <has-error :form="form" field="email"></has-error>
                        </div>

                      <input type="submit" class="btn btn-success">
                      </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="card">
            <div class="card-header">
              <h3 class="card-title">DataTable with default features</h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email(s)</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{user.id}}</td>
                  <td>{{user.name | capitalize }}</td>
                  <td>{{user.email}}</td>
                  <td>{{user.created_at}}</td>
                  <td>

                      <a href="#" @click="deleteuser(user)">
                        <i class="fas fa-trash-alt red"></i>
                      </a>
                    <a href="#" @click="edituser(user)"><i class="fas fa-edit green"></i></a>
                      &nbsp;&nbsp;</td>
                </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
</template>
<script>
export default {
    data () {
    return {
      users:[],
      // Create a new form instance
      form: new Form({
        name: '',
        email: ''
      })
    }
  },

  methods: {
      showform(){

           $('#exampleModalLong').modal('show');
      },
      edituser(user){
           this.form.reset();
           $('#exampleModalLong').modal('show');
            this.form.fill (user)
      },
    deleteuser(id){
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        this.form.delete('api/list/'+id).then(()=>{
            if (result.value) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            setInterval(()=>this.showuser(),1000);
            }
        }).catch(()=>{
            Swal("Failed","Some thing went to wrong","warning");
        })
        })
    },
    showuser(){
      axios.get('api/list').then(({data})=>(this.users=data));
    },
    createuser () {
      // Submit the form via a POST request
        this.$Progress.start();
        this.form.post('api/list')
        .then(({ data }) => { console.log(data) })
        .then(()=>{
            // Fire.$emit('AfterCreat')
            $('#exampleModalLong').modal('hide');
            Toast.fire({
            icon: 'success',
            title: 'Create User'
            })
            this.$Progress.finish();
        })
        .catch(()=>{

        })

    }
  },
  created(){
    this.showuser();
    // Fire.$on('AfterCreat',()=>{
    // this.showuser();
    // });
    setInterval(()=>this.showuser(),3000);
  }
}
</script>
<style lang="stylus" scoped>

</style>

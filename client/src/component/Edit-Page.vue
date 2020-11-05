<template>
<div>
    <Navbar></Navbar>
    <div id="edit-form" class="container">
        <form class="container">
            <h3 class="text-center">Edit Task</h3>
            <div class="form-group">
                <label for="exampleFormControlInput1">Title</label>
                <input type="text" class="form-control" id="edit_title" placeholder="Title">
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea class="form-control" id="edit_description" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Category</label>
                <select class="form-control" id="edit_category">
                <option>Backlog</option>
                <option>ToDo</option>
                <option>Doing</option>
                <option>Done</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary" style="background-color: #F6F5F0; color: black; width: auto">Submit</button>
        </form>
    </div>
</div>
</template>

<script>
import Navbar from './Navbar'
export default {
    name: 'EditPage',
    data() {
        return {
            msg: 'Ini di EditPage'
        }
    },
    components : {
       Navbar
    }
}
</script>

<style>

</style>
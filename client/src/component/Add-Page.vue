<template>
<div>
    <Navbar></Navbar>
    <div id="add-form" class="container">
        <form class="container">
            <h3 class="text-center">Add Task</h3>
            <div class="form-group">
                <label for="exampleFormControlInput1">Title</label>
                <input type="text" class="form-control" id="add_title" placeholder="Title">
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea class="form-control" id="add_description" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Category</label>
                <select class="form-control" id="exampleFormControlSelect1">
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
    name: 'Add-Page',
    components: {
        Navbar
    }
}
</script>

<style>

</style>
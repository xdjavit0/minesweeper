let columns_in_the_board = 10;
let rows_in_the_board = 10;
let array_cells_status;
let id_cell;
let rows_div;
let columns_div;

const default_cell_status = {
    column: 0,
    row: 0,
    iss_revealed:false,
    is_mine:false,
    tag:'',
    mines_around: 0
}

function get_mockdata() {
   let url_array = window.location.search.split("?");
   let mockdata = url_array[1].split("-");
   rows_in_the_board= mockdata.length;
   columns_in_the_board=mockdata[0].length;
}

function  create_cells_status(){
    const array_cells_status = [];
    for (let i = 0; i < columns_in_the_board; i++) {
        array_cells_status.push([]);
        for (j = 0; j < rows_in_the_board; j++){
            array_cells_status[i].push({...default_cell_status,column:i,row:j});
        }  
    }
    console.log(array_cells_status);
}

function create_board(){
    for (let i = 0; i < rows_in_the_board; i++) {
        rows_div = document.createElement("div");
        rows_div.id= "row" +i.toString();
        rows_div.classList.add("row");
        document.getElementById("board").append(rows_div);

        for (let j = 0; j < columns_in_the_board; j++) {
            columns_div= document.createElement("div");
            id_cell = i.toString()+"-"+j.toString();
            columns_div.classList.add("hiddencells");
            columns_div.classList.add("cells");
            columns_div.id= id_cell;
            document.getElementById("row"+i.toString()).append(columns_div);
        }
    }
}

function  update_board(){


}

window.onload = function () {
    if (window.location.search.includes("?")) {
        get_mockdata();
    }
    create_cells_status();
    create_board();
};
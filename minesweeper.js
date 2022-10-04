let columns_in_the_board = 3;
let rows_in_the_board = 3;
let array_columns;
let id_cell;
let is_revealed;
let tag;
let is_mine;
let mines_around;
let position;



function get_mockdata() {
   let url_array = window.location.search.split("?");
   let mockdata = url_array[1].split("-");
   rows_in_the_board= mockdata.length;
   columns_in_the_board=mockdata[0].length;
}

function  create_board_array(){
    array_columns = new Array(columns_in_the_board);
    for (let i = 0; i < columns_in_the_board; i++) {
        for (j = 0; j < rows_in_the_board; j++){
            array_columns[i] = new Array(rows_in_the_board);
        }  
    }


}

function create_board_status(){
    const board_info = [];
    for (let i = 0; i < columns_in_the_board; i++) {
        board_info.push([]);
        for (let j = 0; j < rows_in_the_board; j++) {
            board_info[i].push(i+"-"+j);
        }
    }
    console.log(board_info);
}

function display_board(){
    create_board_array();
    for (let i = 0; i < columns_in_the_board; i++) {
        column_div = document.createElement("div");
        column_div.id= "column" +i.toString();
        column_div.classList.add("column");
        document.getElementById("board").append(column_div);

        for (let j = 0; j < rows_in_the_board; j++) {
            array_columns[i][j]= document.createElement("div");
            id_cell = i.toString()+"-"+j.toString();
            array_columns[i][j].classList.add("cells");
            array_columns[i][j].id= id_cell;
            //array_columns[i][j]=i.toString()+"-"+j.toString();
            document.getElementById("column"+i.toString()).append(array_columns[i][j]);
            console.log(array_columns[i][j]);
        }
        
    }
}

window.onload = function () {
    if (window.location.search.includes("?")) {
        get_mockdata();
    }
    display_board();
    create_board_status();
};
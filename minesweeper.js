let columns_in_the_board = 10;
let rows_in_the_board = 10;
let array_cells_status;
let id_cell;
let rows_div;
let columns_div;
let bomb_counter = 0;
let mockdata;
let bomb_counter_display;
const total_bombs = 10;

const default_cell_status = {
    row: 0,
    column: 0,
    iss_revealed:false,
    is_mine:false,
    tag:'',
    mines_around: 0
}

function get_mockdata() {
   let url_array = window.location.search.split("?");
   mockdata = url_array[1].split("-");
   rows_in_the_board= mockdata.length;
   columns_in_the_board=mockdata[0].length;
}

function place_bombs_mockdata() {
    for (let i = 0; i < mockdata.length; i++) {
        for (let j = 0; j < mockdata[i].length; j++) {
            if (mockdata[i].charAt(j)=='*') {
                array_cells_status[i][j].is_mine=true;
                bomb_counter ++;
            }   
        }        
    }
    console.log(array_cells_status);
}

function place_bombs_random() {
    while (bomb_counter != total_bombs) {
        let row = Math.floor(Math.random() * (rows_in_the_board + 1 - 1));
        let column = Math.floor(Math.random() * (columns_in_the_board + 1 - 1));
        if (!array_cells_status[row][column].is_mine) {
            array_cells_status[row][column].is_mine = true;
            bomb_counter++;
        }
    }
}

function update_bomb_counter_display() {
    bomb_counter_display.innerHTML=bomb_counter;
}

function place_bombs_in_board() {
    if (window.location.search.includes("?")) {
        get_mockdata();
        place_bombs_mockdata();
    }else{
        place_bombs_random();
    }
    update_bomb_counter_display();
}

function  create_cells_status(){
    array_cells_status = [];
    for (let i = 0; i < rows_in_the_board; i++) {
        array_cells_status.push([]);
        for (j = 0; j < columns_in_the_board; j++){
            array_cells_status[i].push({...default_cell_status,row:i,column:j});
        }  
    }    
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
    bomb_counter_display = document.getElementById("reminingBombCounter");
    create_cells_status();
    place_bombs_in_board();
    create_board();
    console.log(array_cells_status);
};
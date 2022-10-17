let columns_in_the_board = 10;
let rows_in_the_board = 10;
let array_cells_status;
let id_cell;
let rows_div;
let columns_div;
let bomb_counter = 0;
let mockdata;
let bomb_counter_display;
let row_column;
let total_bombs = 10;
let game_over = false;
let cell;
let neighbour_bombs = 0;
let interruptor = false;
let bomb_logo = "&#x1F4A3";
let flag_logo = "&#x1F6A9";
let questionmark_logo = "&#x2753";
let cells_revealed =0;
let segundos = 0;
let primera_celda = true;
let timer = true

const default_cell_status = {
    row: 0,
    column: 0,
    is_revealed:false,
    is_mine:false,
    tag:"",
    mines_around: 0
}

function get_mockdata_if_needed() {
    if (window.location.search.includes("?")) {
        let url_array = window.location.search.split("?");
        mockdata = url_array[1].split("-");
        rows_in_the_board= mockdata.length;
        columns_in_the_board=mockdata[0].length;
    }
}

function place_bombs_mockdata() {
    for (let i = 0; i < mockdata.length; i++) {
        for (let j = 0; j < mockdata[i].length; j++) {
            if (mockdata[i].charAt(j)=='*') {
                array_cells_status[i][j].is_mine=true;
                bomb_counter ++;
                total_bombs = bomb_counter;
            }   
        }        
    }
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

function display_board(){
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

            columns_div.addEventListener("click", (event) => {
                let id = event.target.id;
                row_column = id.split("-");
                if (!array_cells_status[row_column[0]][row_column[1]].is_revealed) {
                    array_cells_status[row_column[0]][row_column[1]].is_revealed = true;
                    if (!array_cells_status[row_column[0]][row_column[1]].is_mine) {
                        reveal_normal_cell_in_board(id);
                    }else{
                        revel_bomb_cell_in_board(id);
                        display_sad_face();
                        game_over= true;
                    }
                    check_game_status();
                   
                }
            });

            columns_div.addEventListener("contextmenu", (event) => {
                event.preventDefault();
                let id = event.target.id;
                row_column = id.split("-");
                if (!array_cells_status[row_column[0]][row_column[1]].is_revealed) {
                    place_tag(id)
                }
            });
            document.getElementById("row"+i.toString()).append(columns_div);           
        }
    }
}

function check_game_status() {
    timer = true;
    if (cells_revealed == rows_in_the_board*columns_in_the_board-total_bombs) {
        game_over = true
    }
    if (primera_celda) {
        window.setInterval(function(){ 
            if (!game_over && timer) { 
                document.getElementById("timer").innerHTML = segundos;
                segundos++;
                primera_celda = false;
            }
        },1000);
    }


    if (game_over) {
        if (cells_revealed == rows_in_the_board*columns_in_the_board-total_bombs) {
            document.getElementById("face").innerHTML = "happy";
            tag_all_mines();
            disable_click();
        }
        else{
            disable_click();
        }
    }
    
}

function disable_click() {
    cell = document.getElementById("board");
    cell.classList.add("noclick");
}
function enable_click() {
    cell = document.getElementById("board");
    cell.classList.remove("noclick");
}

function tag_all_mines() {
    for (let i = 0; i < rows_in_the_board; i++) {
        for (j = 0; j < columns_in_the_board; j++){
            if (array_cells_status[i][j].is_mine) {
                cell = document.getElementById(i+"-"+j);
                cell.innerHTML = flag_logo; 
            }
        }
    }
}

function place_tag(id) {
    row_column = id.split("-");
    if (array_cells_status[row_column[0]][row_column[1]].tag == "") {
        array_cells_status[row_column[0]][row_column[1]].tag = "flag";
        bomb_counter = bomb_counter -1;
        update_bomb_counter_display();
    }else if (array_cells_status[row_column[0]][row_column[1]].tag == "flag") {
        array_cells_status[row_column[0]][row_column[1]].tag = "questionmark";
        bomb_counter = bomb_counter + 1;
        update_bomb_counter_display();
    }else {
        array_cells_status[row_column[0]][row_column[1]].tag = "";
    }
    display_tag(id,array_cells_status[row_column[0]][row_column[1]].tag);
}

function display_tag(id,tag){
    cell = document.getElementById(id);
    if (tag=="questionmark") {
        cell.innerHTML = questionmark_logo;
    }else if (tag=="flag") {
        cell.innerHTML = flag_logo;
    }else {
        cell.innerHTML = "";
    }
}

function display_number_in_cell(cell,id) {
    row_column = id.split("-");
    if (array_cells_status[row_column[0]][row_column[1]].mines_around != 0) {
        cell.innerHTML = array_cells_status[row_column[0]][row_column[1]].mines_around;       
    }else{
        if (array_cells_status[row_column[0]][row_column[1]].tag != "") {
            if (array_cells_status[row_column[0]][row_column[1]].tag == "flag") {
                bomb_counter = bomb_counter + 1;
                update_bomb_counter_display();
            }
            array_cells_status[row_column[0]][row_column[1]].tag = ""
            display_tag(id,array_cells_status[row_column[0]][row_column[1]].tag);
        }
        reveal_around_cero(row_column[0],row_column[1]);
    }
}

function reveal_around_cero(i,j) {
    i = parseInt(i);
    j = parseInt(j);
    if (j-1 >= 0 && !array_cells_status[i][(j-1)].is_revealed) {
        array_cells_status[i][(j-1)].is_revealed = true;
        reveal_normal_cell_in_board(i+"-"+(j-1));
    }
    if (j+1<array_cells_status[i].length && !array_cells_status[i][(j+1)].is_revealed) {
        array_cells_status[i][(j+1)].is_revealed = true;
        reveal_normal_cell_in_board(i+"-"+(j+1));
    }
    if (i-1>= 0 && !array_cells_status[(i-1)][j].is_revealed) {
        array_cells_status[(i-1)][j].is_revealed = true;
        reveal_normal_cell_in_board((i-1)+"-"+j);
    }
    if (i-1>= 0 && j-1 >= 0 && !array_cells_status[(i-1)][(j-1)].is_revealed) {
        array_cells_status[(i-1)][(j-1)].is_revealed = true;
        reveal_normal_cell_in_board((i-1)+"-"+(j-1));
    }
    if (i-1>= 0 && j+1 <array_cells_status[i].length && !array_cells_status[(i-1)][(j+1)].is_revealed) {
        array_cells_status[(i-1)][(j+1)].is_revealed = true;
        reveal_normal_cell_in_board((i-1)+"-"+(j+1));
    }
    if (i+1< array_cells_status.length && !array_cells_status[(i+1)][j].is_revealed) {
        array_cells_status[(i+1)][j].is_revealed = true;
        reveal_normal_cell_in_board((i+1)+"-"+(j));
    }
    if (i+1< array_cells_status.length && j-1 >= 0 && !array_cells_status[(i+1)][(j-1)].is_revealed) {
        array_cells_status[(i+1)][(j-1)].is_revealed = true;
        reveal_normal_cell_in_board((i+1)+"-"+(j-1));
    }
    if (i+1< array_cells_status.length && j+1 <array_cells_status[i].length && !array_cells_status[(i+1)][(j+1)].is_revealed) {
        array_cells_status[(i+1)][(j+1)].is_revealed = true;
        reveal_normal_cell_in_board((i+1)+"-"+(j+1));
    }
}

function count_neighbour_bombs() {
    for (let i = 0; i < array_cells_status.length; i++) {
        for (let j = 0; j < array_cells_status[i].length; j++) {
            if (!array_cells_status[i][j].is_mine) {
                if (j-1 >= 0 && array_cells_status[i][j-1].is_mine) {
                    array_cells_status[i][j].mines_around = array_cells_status[i][j].mines_around + 1;
                    }
                    if (j+1<array_cells_status[i].length && array_cells_status[i][j+1].is_mine) {
                    array_cells_status[i][j].mines_around = array_cells_status[i][j].mines_around + 1;
                    }
                    if (i-1>= 0 && array_cells_status[i-1][j].is_mine) {
                    array_cells_status[i][j].mines_around = array_cells_status[i][j].mines_around + 1;
                    }
                    if (i-1>= 0 && j-1 >= 0 &&array_cells_status[i-1][j-1].is_mine) {
                    array_cells_status[i][j].mines_around = array_cells_status[i][j].mines_around + 1;
                    }
                    if (i-1>= 0 && j+1 <array_cells_status[i].length &&array_cells_status[i-1][j+1].is_mine) {
                    array_cells_status[i][j].mines_around = array_cells_status[i][j].mines_around + 1;
                    }
                    if (i+1< array_cells_status.length && array_cells_status[i+1][j].is_mine) {
                    array_cells_status[i][j].mines_around = array_cells_status[i][j].mines_around + 1;
                    }
                    if (i+1< array_cells_status.length && j-1 >= 0 && array_cells_status[i+1][j-1].is_mine) {
                    array_cells_status[i][j].mines_around = array_cells_status[i][j].mines_around + 1;
                    }
                    if (i+1< array_cells_status.length && j+1 <array_cells_status[i].length && array_cells_status[i+1][j+1].is_mine) {
                    array_cells_status[i][j].mines_around = array_cells_status[i][j].mines_around + 1;
                    }
            }     
        }      
    }
}

function revel_bomb_cell_in_board(id) {
    cell = document.getElementById(id);
    cell.classList.add("reveledcells");
    cell.classList.add("reveledbomb");
    cell.classList.remove("hiddencells");
    cell.innerHTML = bomb_logo;
    all_bombs_are_revealed();
}

function reveal_normal_cell_in_board(id){
    let cell = document.getElementById(id);
    cell.classList.add("reveledcells");
    cell.classList.remove("hiddencells");
    display_number_in_cell(cell,id);
    cells_revealed++;
}

function all_bombs_are_revealed() {
    for (let i = 0; i < rows_in_the_board; i++) {
        for (j = 0; j < columns_in_the_board; j++){
            if (array_cells_status[i][j].is_mine) {
                cell = document.getElementById(i+"-"+j);
                cell.classList.add("reveledcells");
                cell.classList.add("reveledbomb");
                cell.classList.remove("hiddencells");
                cell.innerHTML = "&#x1F4A3"; 
            }
        }
    }
}

function display_sad_face() {
    let face = document.getElementById("face");
    face.innerHTML = "sad";
}

function delete_board() {
    for (let i = 0; i < rows_in_the_board; i++) {
        for (j = 0; j < columns_in_the_board; j++){
            document.getElementById(i+"-"+j).remove();
        }
    }
}

function reset_minesweeper() {
    segundos = 0;
    document.getElementById("timer").innerHTML = segundos;
    bomb_counter = 0;
    game_over = false;
    neighbour_bombs = 0;
    cells_revealed = 0;
    timer = false;
    enable_click();
    delete_board();
    get_mockdata_if_needed();
    create_cells_status();
    place_bombs_in_board();
    count_neighbour_bombs(); 
    display_board();
    reset_clicking_face();
}

function reset_clicking_face() {
    document.getElementById("face").addEventListener("click", (event) => {
        reset_minesweeper();
    });
}

window.onload = function () {
    bomb_counter_display = document.getElementById("reminingBombCounter");
    get_mockdata_if_needed();
    create_cells_status();
    place_bombs_in_board();
    count_neighbour_bombs(); 
    display_board();
    reset_clicking_face();
    console.log(array_cells_status);
};
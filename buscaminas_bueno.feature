Feature: Minesweeper

# Charged data:
# * --> bomb
# o --> no bomb
# - --> change line

# Visual data:
# ! --> mined symbol that can use the user to mark that there is a Bomb
# ? --> uncertain symbol that can use the user to mark that probably there is a Bomb
# number(1-8) --> indicates how many bombs the reveled square is touching
# number(0) --> dont touch any bomb
# r --> revealed square
# h --> not revealed square

# "1-2" means row 1 column 2
# columns and rows starts with 1

Background:
Given a user opens the app

Scenario Outline: Board default display -> Validating dimensions
Given the user charge the data "<data>"
Then the board should have "<columns>" and "<rows>"

Examples:
|data       |columns|rows|
|o*         |2      |1   |
|oo*-ooo    |3      |2   |
|oo*-ooo-ooo|3      |3   |

# Scenario: Board default display -> all the squares should be hidden
# And all the squares should be hidden

# Scenario: Board default display -> all the squares shoould be enabled
# And all the squares should be enabled

# Scenario Outline: Default counter display, counting the mines in the board
# Given load mock data <Board>
# Then the non marked bomb counter display should show the following value: "<Count>"

# Examples:
#     | Board    | Count |
#     | ooo-xxx  | 3     | 
#     | *oo-ooo  | 1     |

# Scenario: Default image display -> be serious
# Then the image display should have a "serious" face

# Scenario: Default timer display -> Must be empty
# Then the timer display should be "empty"

# Scenario: Revealing a square -> the square should be revealed
# Given the user charge the data "o*"
# When the user discover the square "1-1" 
# Then the square "1-1" state should change to:"r"

# Scenario: Reveal square content with the mouse
# Given the user charge the data "o*"
# When the user click the square "1-1" 
# Then the square "1-1" state should change to:"r"

# Scenario: Disabling a revealed cell
# Given the user charge "oo*"
# When the user discover the square "1-1"
# Then the square "1-1" should be disabled

# Scenario:User reveal a bomb square and user lose the game                         
# Given the user charge the data "o*"
# When the user discover the square "1-2"
# Then the user should loose the game

# Scenario: The game is over and the face should be sad
# Given the user charge the data "o*"
# And the user reveal the square "1-2"
# Then the image display should be "sad" face

# Scenario: The user discover a bomb and the bomb highlite
# Given the user charge the data "o*"
# And the user reveal the square "1-2"
# Then the bomb in the square "1-2" should be highlighted

# Scenario: The user discover a bomb and all the bombs in the board reveal
# Given the user charge the data "o*******"
# And the user discover the square "1-2"
# Then all bombs status should change to "r"

# @manual 
# Scenario Outline: The game ends and the timer stop
# Given the user charge the "o*"
# And press the square" <square>"
# Then The timer display should stop

# Example:
# |square|
# |1-1   |
# |1-2   |

# Scenario Outline: User reveal an square that is near a bomb-->should show the number of bombs that is touching
# Given the user charge the data "<data>"
# When the user discover the square "2-2"
# And the square should display "<number>"

# Example:
# |data       |number|
# |o*o-ooo-ooo|1     |
# |o**-ooo-ooo|2     |
# |***-ooo-ooo|3     |
# |***-*oo-ooo|4     |
# |***-*o*-ooo|5     |
# |***-*o*-*oo|6     |
# |***-*o*-**o|7     |
# |***-*o*-***|8     |

# Scenario: User reveal an square that is not near a bomb and does not have a bomb, the cell should be empty
# Given the user charge the data "**oo-oooo-oooo-oooo"
# When the user discover the square "3-3"
# Then the square should be empty

# Scenario: Revealing an empty square, the adjancent squares should be revealed
# Given the user charge the data
# """
# ooo
# ooo
# ooo
# ***
# """
# When the user click the square "2-2"
# Then the board should look like:
# """
# rrr
# rrr
# 232
# hhh
# """

# Scenario: An empty square revealed by a neightbour square, the adjancent squares should be revealed //
# Given The user charge the data
# """
# oooooo
# *oooo*
# *oooo*
# *oooo*
# ******
# """
# When the user click the square "3-3"
# Then it will show 
# """
# 11rr11
# h2rr2h
# h3rr3h
# h5335h
# hhhhhh
# """

# Scenario Outline: User mark a mined bomb
# Given the user losad the data "o**-ooo-ooo"
# And the square "1-2" is "<state>"
# When the user tag the "1-2"
# Then the visual data should change to "<visual>"

# Example:
# |state   |visual  |
# |unmarked|!       |
# |!       |?       |
# |?       |unmarked|

# Scenario outline: User mark a bomb and bomb counter substraction
# Given the user charge the data """o***"""
# And  the counter is in "3"
# When the user place a mark in "1-2" as mined
# Then the counter should display 


# Scenario: User mark bombs incorrectly and counter substraction in negative
# Given the user charge the data """o***ooo"""
# And the user mark as mined "1-5","1-2" and "1-4"
# And the counter is in "0"
# When the user mark the square "1-1" with "!"
# Then the counter should display "-1"

# Scenario: All bombs marked correctly and the user wins the game 
# Given the user charge the data "o*"
# When mark with "!" the square "1-2"
# Then the user wins

# Scenario: The user reveal squares and the rest of the squares are bombs --> the user should win
# Given the user charge the data "o*"
# When the user reveal the square "1-1"
# Then The bombs are marked with "!"
# And the user should win

# Scenario: There are no bombs in the board --> the user should win
# Given the user charge the data "o"
# Then the user should win

# Scenario: User wins and smiling face apears
# Given the user won
# Then the image should display an "smiling" face

# @manual
# Scenario: User wins and timer stop counting
# Given the user won
# Then the timer should stop counting

# @manual
# Scenario: The game start and timer start counting
# Given the timer display is "empty"
# When the user click the square "1-1"
# Then timer display shoul be "0"
# And add a second to the counter every second passed

# Scenario: The user reset the board
# Giventhe user charge the data "o***oo"
# And the user mark "1-2" and "1-3"
# And reveal "1-5"
# When the user press on the image display
# Then the board should change to default board

# Scenario: The user reset the non marked bomb counter
# Given the user charge the data "o*****"
# And the user mark "1-2" and "1-3"
# And non marked bomb counter is be "3"
# When the user press on the image display
# Then the non marked non marked bomb counter should be "5"

# Scenario: The user reset the face image --> should be serious
# Given the face is not "serious" face
# When the user press on the image display
# Then the face image should be "serious" face

# Scenario: The user reset the timer
# Given the timer is not "empty"
# When the user press on the image display
# Then the timer display should be "empty"

# Scenario Outline: User win or loose and the board squares turn disabled //
# Given the user charge the data "o*"
# When the user press the square "<square>"
# Then all squares should be disabled

# Example:
# |square|
# |1-1   |
# |1-2   |
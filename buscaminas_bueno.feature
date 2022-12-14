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
# reveledcells --> revealed square
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

Scenario: Board default display -> all the squares should be hidden
Then all the squares should be hidden

# @manual
# Scenario: Board default display -> all the squares shoould be enabled
# And all the squares should be enabled

Scenario Outline: Default counter display, counting the mines in the board
Given load mock data "<Board>"
Then the non marked bomb counter display should show the following value: "<Count>"

Examples:
| Board    | Count |
| ooo-***  | 3     | 
| *oo-ooo  | 1     |

Scenario: Default image display -> be serious
Then the image display should have a "serious" face

Scenario: Default timer display -> Must be empty
Then the timer display should be ""

Scenario: Revealing a square -> the square should be revealed
Given the user charge the data "o*"
When the user discover the square "0-0" 
Then the square state should change to:"reveledcells"

Scenario: Reveal square content with the mouse
Given the user charge the data "o*"
When the user click the square "0-0" 
Then the square "0-0" state should change to:"reveledcells"

Scenario:User reveal a bomb square and user lose the game                         
Given the user charge the data "o*"
When the user discover the square "0-1"
Then the user should loose the game

Scenario: The game is over and the face should be sad
Given the user charge the data "o*"
When the user click the square "0-1"
Then the image display should be "sad" face

Scenario: The user discover a bomb and the bomb highlite
Given the user charge the data "o*"
When the user discover the square "0-1"
Then the bomb in the square "0-1" should be highlighted

Scenario: The user discover a bomb and all the bombs in the board reveal
Given the user charge the data "o*******"
When the user discover the square "0-1"
Then all bombs status should change to "reveledbomb"

# @manual 
# Scenario Outline: The game ends and the timer stop
# Given the user charge the "o*"
# And press the square" <square>"
# Then The timer display should stop

# Example:
# |square|
# |1-1   |
# |1-2   |

Scenario Outline: User reveal an square that is near a bomb-->should show the number of bombs that is touching
Given the user charge the data "<data>"
When the user discover the square "1-1"
Then the square "1-1" should display "<number>"

Examples:
| data        | number |
| o*o-ooo-ooo | 1      |
| o**-ooo-ooo | 2      |
| ***-ooo-ooo | 3      |
| ***-*oo-ooo | 4      |
| ***-*o*-ooo | 5      |
| ***-*o*-*oo | 6      |
| ***-*o*-**o | 7      |
| ***-*o*-*** | 8      |

Scenario: User reveal an square that is not near a bomb and does not have a bomb, the cell should be empty
Given the user charge the data "**oo-oooo-oooo-oooo"
When the user discover the square "2-2"
Then the square "2-2" should be empty

Scenario: Revealing an empty square, the adjancent squares should be revealed
Given the user charge the data "ooo-ooo-ooo-***"
When the user click the square "1-1"
Then the square "0-0" should be empty
And the square "0-1" should be empty
And the square "0-2" should be empty
And the square "1-0" should be empty
And the square "1-1" should be empty
And the square "1-2" should be empty
And the square "2-0" should be "2"
And the square "2-1" should be "3"
And the square "2-2" should be "2"

Scenario: An empty square revealed by a neightbour square, the adjancent squares should be revealed //
Given the user charge the data "*****-*ooo*-*ooo*-*ooo*-*****"
When the user click the square "2-2"
Then the square "1-1" should be "5"
And the square "1-2" should be "3"
And the square "1-3" should be "5"
And the square "2-1" should be "3"
And the square "2-2" should be empty
And the square "2-3" should be "3"
And the square "3-1" should be "5"
And the square "3-2" should be "3"
And the square "3-3" should be "5"

Scenario Outline: User mark a mined bomb
Given the user charge the data "o**-ooo-ooo"
And the square "0-1" is "<state>"
When the user tag the "0-1"
Then the visual data should change to "<visual>"

Examples:
|state   |visual  |
|        |!       |
|!       |?       |
|?       |        |


Scenario: User mark a bomb and bomb counter substraction
Given the user charge the data "o***"
When the user tag the "0-1"
Then the counter should display "2"

Scenario: User mark bombs incorrectly and counter substraction in negative
Given the user charge the data "o***ooo"
And the user mark as mined "0-4","0-1" and "0-3"
When the user tag the "0-0"
Then the counter should display "-1"

Scenario: The user reveal squares and the rest of the squares are bombs --> the user should win
Given the user charge the data "o*"
When the user click the square "0-0"
Then The "0-1" should be marked with !
And the user should win

Scenario: User wins and happy face apears
Given the user charge the data "o*"
And the user click the square "0-0"
Then the image should display an "happy" face

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

Scenario: The user reset the board
Given the user charge the data "o***oo"
And the user tag the "0-1"
And the user click the square "0-4"
When the user press on the image display
Then the board should have "6" and "1"
And all the squares should be hidden

Scenario: The user reset the non marked bomb counter
Given the user charge the data "o*****"
And the user tag the "0-2"
When the user press on the image display
Then the non marked bomb counter display should show the following value: "5"

Scenario: The user reset the face image --> should be serious
Given the user charge the data "o*****"
And the user click the square "0-4"
When the user press on the image display
Then the face image should be "serious" face

# @manual
# Scenario: The user reset the timer
# Given the timer is not "empty"
# When the user press on the image display
# Then the timer display should be "empty"

Scenario Outline: User win or loose and the board squares turn disabled
Given the user charge the data "o*"
When the user click the square "<square>"
Then all squares should be disabled

Examples:
|square|
|0-0   |
|0-1   |
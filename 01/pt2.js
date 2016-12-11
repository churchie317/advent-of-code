/*
--- Part Two ---

Then, you notice the instructions continue on the back of the Recruiting Document. Easter Bunny HQ is actually at the first location you visit twice.

For example, if your instructions are R8, R4, R4, R8, the first location you visit twice is 4 blocks away, due East.

How many blocks away is the first location you visit twice?
 */

 const turnRight = {
   f: 'r',
   r: 'd',
   d: 'l',
   l: 'f'
 };

 const turnLeft = {
   f: 'l',
   l: 'd',
   d: 'r',
   r: 'f'
 };

const Santa = {
  currentDirection: 'f',
  x: 0,
  y: 0
};

const input = require('fs').readFileSync('directions.txt', 'utf8').split(', ')
               .map( x => {
                 return [ x[0], +x.slice(1) ];
               });

function moveAndCheckIfVisited(directions, santa) {
  return directions.reduce( (visited, x) => {
    const newDirection = x[0];
    const steps = x[1];
    if( visited.found ) {
      return visited;
    }
    // TURN Santa in new direction
    if( newDirection === 'R' ){
      santa.currentDirection = turnRight[santa.currentDirection];
    } else {
      santa.currentDirection = turnLeft[santa.currentDirection];
    }
    // STEP and CHECK
    for( var i = 0; i < steps; i++ ){
      if( santa.currentDirection === 'f' ){
        santa.y++;
      } else if( santa.currentDirection === 'l'){
        santa.x--;
      } else if( santa.currentDirection === 'd'){
        santa.y--;
      } else {
        santa.x++;
      }
      // IF already visited, RETURN location
      if( visited[santa.x + ',' + santa.y] ){
        return {
          found: true,
          x: santa.x,
          y: santa.y
        }
      }
      visited[santa.x + ',' + santa.y] = true;
    }
    return visited;
  }, { '0,0': true });
}

const hq = moveAndCheckIfVisited(input, Santa);
console.log(Math.abs(hq.x) + Math.abs(hq.y));

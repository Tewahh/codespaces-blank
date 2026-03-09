export function buildTurnQueue(player, enemy) {

    const queue = [
      { type: "player", speed: player.speed },
      { type: "enemy", speed: enemy.speed || 2 }
    ];
  
    queue.sort((a, b) => b.speed - a.speed);
  
    return queue;
  
  }
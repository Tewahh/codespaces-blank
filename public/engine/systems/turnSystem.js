export function buildTurnQueue(player,enemies){

const queue=[]

queue.push({
type:"player",
speed:player.speed
})

enemies.forEach(e=>{
queue.push({
type:"enemy",
enemy:e,
speed:e.speed||2
})
})

queue.sort((a,b)=>b.speed-a.speed)

return queue

}
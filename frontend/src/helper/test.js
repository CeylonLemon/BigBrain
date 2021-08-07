/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minReorder = function(n, connections) {
    const stack = [0]
    let toReverse = 0
    while(stack.length){
        let curNode = stack.pop()
        connections.forEach(ele=>{
        if(ele.includes(curNode)){
            if(ele[0]===curNode){
                toReverse+=1
                stack.push(ele[1])
            }else{
                stack.push(ele[0])
            }
        }
    })
    }
    return toReverse;
};

console.log(minReorder(6,[[0,1],[1,3],[2,3],[4,0],[4,5]]))
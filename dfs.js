function bfs(start, end){
    var stack = [];
    var reset = [];

    stack.push(start);
    reset.push(start);

    while(stack.length > 0){
        var current = stack.shift();
        current.searched = true;
        if(current == end){
            //done;
            break;
        }

        if(current.neighbors.length != 0){
            current.addNeighbors(current.x, current.y);
        }

        //current.addNeighbors(current.x, current.y);
        var neighbors = current.neighbors;
        for(var i = 0; i < neighbors.length; i++){
            var neighbor = neighbors[i];
            
            if(neighbor.searched != true && neighbor.occupied == false){
                //neighbor.checked = true;
                neighbor.parent = current;
                reset.push(neighbor);
                stack.push(neighbor);

            }
        }
    }
    
    var rev = [];
    rev.push(end);
    var previous = end.parent;
    while(previous != null){
        rev.push(previous);
        previous = previous.parent;
    }
    for(var i = 0; i < reset.length; i++){
        reset[i].checked = false;
        reset[i].parent = null;
    }
    rev.pop();
    
    return rev.reverse();

}



var flatten = function(a, shallow,r){
    if(!r){ r = []}
     
  if (shallow) {
    return r.concat.apply(r,a);
    }
        
     for(var i=0; i<a.length; i++){
          if(a[i].constructor == Array){
              flatten(a[i],shallow,r);
          }else{
              r.push(a[i]);
          }
      }
      return r;
  }
  //var res = flatten(testArray);

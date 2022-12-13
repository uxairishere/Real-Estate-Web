function PredictFuture(curr, years, interst){
    var final = curr * ( 1 + (interst / 100)) ^ years
    return final
}

module.exports = {PredictFuture}
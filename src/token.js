
/**
 * 
 * @param {Object} option 配置
 * @param {number} option.total  总长度 default 21
 * @param {boolean} option.addTime 是否添加时间 default true, 大概会占据11位
 * @param {number} option.count 最后两位字符转为ascii的合 default 166
 * @param {string} option.chars 可选字符
 */
export const generateToken = function (option) {
    option = option ? option : {addTime: true}
    var totalLen = option.total || 21
    var chars = option.chars ? option.chars.split('') : '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var timeStr = ''
    if (option.addTime) {
        timeStr = new Date().getTime().toString(16)
    }
    var uuidLen = totalLen - 2 - timeStr.length
    if (timeStr.length >= totalLen) return timeStr.substr(0, totalLen)
    var uuid = [], i;
    
    for (i = 0; i < uuidLen; i++) uuid[i] = chars[0 | Math.random() * chars.length];
    var count = option.count || 166
    var tokenizer = new GenConstantSumToken(count)
    var last2 = tokenizer.generate()
    if (uuidLen >= 4) {
        return uuid.slice(0, 4).join('') + timeStr + uuid.slice(4).join('') + last2;
    }
    return uuid.join('') + timeStr + last2
    
}


function TokenCount(t) {
   this.s(t)
}
TokenCount.prototype.s = function(t) {
  this['value'] = t
}


function Range(min, max) {
    if (max < min) {
        throw new Error('Range error')
    }
    this.i(min, max)
}
Range.prototype.i = function(min, max) {
    this["range"] = {
        i: min,
        a: max
    }
}
Range.prototype.random = function() {
    var min = this["range"]["i"]
    var max = this["range"]["a"]
    return Math.floor((Math.random()*(max - min + 1))) + min
}
function CountComposition(range1, range2) {
    var args = [range1, range2]
    for (var i = 0; i < args.length; i++) {
        if (!args[i] instanceof Range) {
         throw new Error('Count Composition instance error')
        }
    }
    this.sum(args)
 }
CountComposition.prototype.sum = function(args){
    var min = 0
    var max = 0
    this["list"] =args;
    for (var i = 0; i < this["list"].length; i++) {
       min += this["list"][i]["range"]["i"]
       max += this["list"][i]["range"]["a"]
    }
    this["range"] = {
        i: min,
        a: max
    }
}
CountComposition.prototype.check = function(num) {
    if (num >= this["range"]["i"] && num <= this["range"]["a"]) {
        return true
    }
    return false
}
CountComposition.prototype.random = function(countObj) {
    var random = this.narrowRange(countObj["value"])
    return String.fromCharCode(random[0]) + String.fromCharCode(random[1])
}
CountComposition.prototype.narrowRange = function(value) {
    var range1 = this["list"][0]
    var range2 = this["list"][1]
    var range1min = range1["range"]["i"],
    range1max = range1["range"]["a"],
    range2min = range2["range"]["i"],
    range2max = range2["range"]["a"];
    var sum1 = range1["range"]["i"] + range2["range"]["a"]
    var margin1, margin2;
    if (sum1 >= value) {
        margin1 = sum1 - value
        range2max -= margin1
    } else {
        margin1 = value - sum1
        range1min += margin1
    }
    var sum2 = range1["range"]["a"] + range2["range"]["i"]
    if (sum2 >= value) {
        margin2 = sum2 - value
        range1max -= margin2
    } else {
        margin2 = value - sum2 
        range2min += margin2
    }
    var narrowedRange1 = new Range(range1min,range1max)
    var random1 = narrowedRange1.random()
    // console.log('narrowed',narrowedRange1, new Range(range2min, range2max))
    return [random1, value - random1]
}

function GenConstantSumToken(count) {
   this["count"] = new TokenCount(count)
   this["totalLength"] =  2
   var numR = new Range(48, 57)
   var lowA = new Range(65, 90)
   var highA = new Range(97, 122)
   this.base = [numR, lowA, highA]
}
GenConstantSumToken.prototype.generate = function() {
    this.comp = this.enumerateComp()
    this.availComp = []
    for (var i = 0;i < this.comp.length; i++) {
        if (this.comp[i].check(this["count"]["value"])){
            this.availComp.push(this.comp[i])
        }
    }
    var randomCompNum  = Math.random() * this.availComp.length | 0
    var randomComp = this.availComp[randomCompNum] //** */
    return randomComp.random(this["count"])
}
GenConstantSumToken.prototype.enumerateComp = function(a, idx) {
    var comp = []
   for (var i = 0; i < this.base.length; i++) {
       var range = this.base[i]
       for (var k = i; k < this.base.length; k++) {
           var range2 = this.base[k]
           comp.push(new CountComposition(range, range2))
       }
   }
   return comp
   
}
export {TokenCount, Range, CountComposition, GenConstantSumToken}
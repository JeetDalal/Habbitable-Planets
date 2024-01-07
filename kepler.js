const {parse} = require('csv-parse')
const fs = require('fs')

const items = [];
const validator = (planetList)=>{
    return planetList['koi_disposition'] === 'CONFIRMED' && planetList['koi_insol'] <1.11 && planetList['koi_prad']<1.6;
}
fs.createReadStream('kepler_data.csv').pipe(parse({
    comment:"#",
    columns: true,
    
}))
.on('data',(data)=>{
    if(validator(data)){
        items.push(data)
    }
})
.on('error',(error)=>{
    console.log(error.message)
}).on('end',()=>{
    console.log(items.length+" planets found")
    console.log(items)
})

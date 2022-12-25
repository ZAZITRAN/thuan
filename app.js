const express = require('express')
const app = express()
const port = 3001
const fs=require("fs")
const bodyParser = require('body-parser')

function checkID(req,res,next) {
  
  let {id}=req.params
  
  fs.readFile('./dev-data/dev-data/questions.json', 'utf8', function(err, data){
    if (err) {
        res.status(500).json({
          message: err.message
        })
    }
    const dataFixed=JSON.parse(data)
    let findData=dataFixed.find((e,i)=> `${e.id}`===id)
    if(!findData){
     return res.status(500).json({message:"not Question"})
    }
    next()
  
})
}
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.post('/api/v1/questions', function (req, res) {
  let {content, id, dislike, like} = req.body;
  let question={
    id,
    content,
    like: +(like),
    dislike: +(dislike),
  };
  fs.readFile('./dev-data/dev-data/questions.json', 'utf8', function(err, data){
    if (err) {
        res.status(500).json({
          message: err.message
        })
    }
    const dataFixed=JSON.parse(data)
    data.push(question)
    fs.writeFile('./dev-data/dev-data/questions.json', JSON.stringify(data),(err)=>{
      if(err){
        res.status(500).json({
          message: err.message
        })
      }
    })


    
  })
    
});

/* app.get('/', (req, res) => {
  res.send('This is home page!')
})
app.get('/ask', (req, res) => {
    res.send('This is asking page!')
})
app.get('/question-detail/:id', (req, res) => {
    res.send('This is a question detail page')
}) */
app.get('/api/v1/questions', (req, res) => {
  fs.readFile('./dev-data/dev-data/questions.json', 'utf8',(err, data)=>{
      if (err) {
          res.status(500).json({
            message: err.message
          })
      }
       const dataFixed=JSON.parse(data)
      res.send(dataFixed)
    }) 
  });   
app.get('/api/v1/questions/:id', checkID,  (req,res)=>{
  console.log(1111111111);
  let {id}=req.params;
  fs.readFile('./dev-data/dev-data/questions.json', 'utf8', function(err, data){
    if (err) {
        res.status(500).json({
          message: err.message
        })
    }
    const dataFixed=JSON.parse(data)
    let find=dataFixed.find((e,i)=>e.id==id)
   
      res.status(200).json({
        questions:find,
      })
   
    console.log(222,find);
    res.status(500).json({
      message:"not found"
    })

})
});


/* app.get('*', (req, res) => {
  res.send('Page not found')
}) */
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:3001 ${port}`)
})


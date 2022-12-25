let likeBtn=documemt.getElementById("like");
likeBtn.addElementLisstenner("click", ()=>{
    let {id,like}=question;
    fetch(baseAPI+`/${id}`,{
        method:"PUT",
        header:{
            "content-Type":"application/json",
        },
        body:JSON.stringify({like: +(like)+1})
    })
    .then((res)=>{return res.json()})
    .then((data)=>{location.href=`/question-detail/:${id}`})

})
let dislikeBtn=documemt.getElementById("dislike");
dislikeBtn.onclick=async function () {
    try{
        let res= await fetch(baseAPI + `/{id}`,{
            method:"PUT",
            header:{
                "content-Type":"application/json",
            },
            body:JSON.stringify({like: +(dislike)+1})
        });
        let data= await res.json()
        location.href=`/question-detail/:${id}`
    }catch(erro)
}

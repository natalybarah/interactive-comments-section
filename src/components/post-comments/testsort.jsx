
const data= [{name: "nataly", id:1, score: 10}, {name:"gabriel", id: 2, score:7}, {name: "belkis", score: 30}]

const TestSort=()=>{

    const compare= (a, b)=>{
        return b.score-a.score
    }

    const result=data.sort(compare)


    console.log(result, "result")
    return(
        data.map(user=>
        {/*let i= 0
            i++
            if(user.score > data[i].score){
              return user.score
            } return*/ return <div>
                    <h1> DATA TEST</h1> 
                    <p>{user.score}</p>
                </div>
        } 
         
        )
    )
}
export default TestSort;
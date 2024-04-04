const { getJson } = require("serpapi");




const updateHindex = async (nomComplet) => {
   
    return new Promise(async (resolve, reject) => {
        try {
            const id = await getChercheurId(nomComplet)
            const hindex = await getHindex(id)
            resolve(hindex)
        } catch (err) {
            reject(err)
        }
    })


}


const getChercheurId = async(nomComplet)=>{

    return new  Promise ((resoleve , reject)=>{
        getJson({
            engine: "google_scholar_profiles",
            mauthors: nomComplet,
            api_key: process.env.SERP_API_KEY
    } , (json)=>{
       
        resoleve(json["profiles"][0].author_id)
        
    }
    )
    })
    


}

const getHindex = async (id) => {
    return new Promise((resolve, reject) => {
        getJson({
            engine: "google_scholar_author",
            author_id: id,
            api_key: process.env.SERP_API_KEY
        }, (json) => {
            resolve(json["cited_by"].table[1].h_index.all)
            
        })
    })
}

module.exports = updateHindex




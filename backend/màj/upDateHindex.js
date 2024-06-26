const { getJson } = require("serpapi");




const updateHindex = async (nomComplet) => {
   
    return new Promise(async (resolve, reject) => {
        try {
            const id = await getChercheurId(nomComplet)
            const hindex = await getHindex(id)
            resolve(hindex)
        } catch (err) {
            resolve(0)
        }
    })


}


const getChercheurId = async(nomComplet)=>{

    return new  Promise ((resolve , reject)=>{
        getJson({
            engine: "google_scholar_profiles",
            mauthors: nomComplet,
            api_key: process.env.SERP_API_KEY
    } , (json)=>{
        if (json && json["profiles"]) {
            if (json["profiles"].length !== 0) {
              resolve(json["profiles"][0].author_id);
            } else {
              reject("Aucun chercheur trouvé");
            }
          } else {
            reject("Invalid response");
          }
        
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




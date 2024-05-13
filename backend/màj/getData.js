const { getJson } = require("serpapi");



const updateImageLienGoogle = async (nomComplet) => {
   
    return new Promise(async (resolve, reject) => {
        try {
            const id = await getChercheurId(nomComplet)
            const { image_path ,  GoogleScholar } = await getImageGoogleScholar(id)
            resolve({image_path , GoogleScholar })
        } catch (err) {
            resolve({image_path: '' , GoogleScholar:''})
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

const getImageGoogleScholar = async (id) => {
    return new Promise((resolve, reject) => {
        getJson({
            engine: "google_scholar_author",
            author_id: id,
            api_key: process.env.SERP_API_KEY
        }, (json) => {
            resolve({
                image_path :json["author"].thumbnail , 
                GoogleScholar: json["search_metadata"].google_scholar_author_url})
            
        })
    })
}

module.exports = updateImageLienGoogle




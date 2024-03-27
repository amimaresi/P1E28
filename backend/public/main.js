const div = document.querySelector('.publication')

const getallpublication = async()=>{
    console.log('getallpublication')
    const response = await fetch('http://localhost:3000/directeur/alldemandes')
    const data = await response.json()
    const div2 = document.createElement('div')
    div2.innerHTML = data.map((pub)=>{
        console.log(pub)
        return `
        <div>
        <h1>${pub.Titre}</h1>
        <p>${pub.pages}</p>
        <p>${pub.volume}</p>
        <p>${pub.Membres}</p>
        <p>${pub.Classement}</p>
        <p>${pub.Date}</p>
        <p>${pub.Lien}</p>
        </div>
        `
    }).join('')
    div.appendChild(div2)
}

const handlaccept = async()=>{
    console.log('accept')
    const response = await fetch('http://localhost:3000/accept',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            Date : '2021-02-02',
            Cherch : '60c6a1b8b0e3a73f1c4f5c3f',
            confJourn : '60c6a1b8b0e3a73f1c4f5c3f',
            volume : '2',
            pages : '10',
            rang : 1,
            Titre : 'titre',
            Lien : 'lien',
            Membres : ['membre1','membre2'],
            Classement : 'classement'
        })
    })
    const data = await response.json()
    console.log(data)

}
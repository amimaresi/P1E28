const Setting = require("../schema/settings");

const get_maj_time = async (req , res) => {
    const id = "maj_time";
    const time_maj = await Setting.findById(id);
    if (time_maj)
        return time_maj.split(" ");
    return -1;

}

const change_maj_time = async (req, res) => {
    const newTime = req.body;
    console.log(newTime);
    const id = "maj_tim e";
    //if faut avant creer un document pour maj_time


    if (newTime.data ==='' || newTime.selectValue === '') {
        console.log("error");
        res.status(404).json({ error: true, message: "Votre demande est impossible" });
        return;
    }
    
    const m = await Setting.findById(id)
    console.log(m)
    if (!m) {
       
        await Setting.create({ _id: id, setting_value: newTime });
        res.status(200).json({ error: false, message: "updated" });
        return;
    }

    else{

        try{
        await m.updateOne({ setting_value: newTime });
        res.status(200).json({ error: false, message: "updated" });
        }
        catch(err){
            console.log(err);
            res.status(404).json({ error: true, message: "bad request" });
            
        }


    

       
  //on utilise updateOne pour modifier le document existant ne nous permet pas envoyer res.status(200) directement

//    await  Setting.updateOne({ _id: id }, { $set: { setting_value: newTime } }, { new: true }, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(404).json({ error: true, messag: "bad request" });
//             // Handle error
//         } else {
//             // console.log("updated");
//             // console.log(result);
//             res.status(200).json({ error: false ,, message: "updated"});
//             // Handle result
//         }
//     });
}
}

module.exports = { change_maj_time, get_maj_time }
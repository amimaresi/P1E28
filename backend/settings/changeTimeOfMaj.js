const Setting = require("../schema/settings");

const get_maj_time = async () => {
    const id = "maj_time";
    const time_maj = await Setting.findById(id);
    if (time_maj)
        return time_maj.split(" ");
    return -1;

}
const change_maj_time = async (req, res) => {
    const newTime = req.body;
    const id = "maj_time";

    setting.updateOne({ _id: id }, { $set: { setting_value: newTime } }, { new: true }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(404).json({ error: true, msg: "bad request" });
            // Handle error
        } else {
            console.log(result);
            res.status(200).json({ error: false, updated: result });
            // Handle result
        }
    });
}

module.exports = { change_maj_time, get_maj_time }
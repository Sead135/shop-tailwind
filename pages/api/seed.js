import db from "../../utils/db";
import User from "../../models/User";
import data from "../../utils/data";
import Product from "../../models/Product";

/*Загрузка данных в БД*/
const handler = async (req, res) => {
    if (req.query.password === process.env.STUPID_PASSWORD) {
        await db.connect();
        await User.deleteMany();
        await User.insertMany(data.users);
        await Product.deleteMany();
        await Product.insertMany(data.products);
        await db.disconnect();
        res.send({message: "Данные загружены."});
    } else {
        res.send({message: "А ты неплох. В доступе отказано."})
    }
};

export default handler
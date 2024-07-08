import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import mongoose, { mongo } from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/userCredentials").then((ans)=>{
    console.log("Connection established");
}).catch((err)=>{
    console.log("Error in connection");
});

const Schema=mongoose.Schema;
const Schemac=new Schema({
    full_name:{
        type:String,
        required:true,
    },
    phone_no:{
        type:Number,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});
const user=mongoose.model("user",Schemac);

app.post('/login', async (req, res) => {
    try {
        const existingUser = await user.findOne({ username: req.body.username });
        if (!!existingUser) {
            res.send(`
                <script>
                    alert("Username already exists!!");
                    window.location.href = "/";
                </script>
            `);
        } else {
            var phnum=parseInt(req.body.phno);
            const loguposu = new user({
                full_name:req.body.name,
                phone_no: phnum,
                username: req.body.username,
                password: req.body.password,
            });
            await loguposu.save();
            res.send(`
                <script>
                    alert("User created successfully!");
                    window.location.href = "/";
                </script>
            `);
        }
    } catch (error) {
        console.error("Error checking username existence:", error);
        res.status(500).send("Error checking username existence");
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


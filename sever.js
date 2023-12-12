import express from 'express';
import path from 'path';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import campaignRouter from "./routes/campaign.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname); // Lấy đường dẫn hiện tại
const PORT = process.env.PORT || 9000;
app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());




// app.all(): Định nghĩa xử lý cho tất cả các phương thức HTTP
// app.use(): Áp dụng middleware cho tất cả các yêu cầu
// __dirname: thư mục cục bộ

//  express.static() được sử dụng để phục vụ các tệp tĩnh từ một thư mục cụ thể, trong trường hợp này là 'public'
// Đoạn mã này được sử dụng để phục vụ các tệp tĩnh như hình ảnh, CSS và JavaScript từ thư mục 'public'.
// app.use('/public', express.static(path.join(__dirname, '../public/')));
app.use(express.static('public'));

// Use the routes
app.use(campaignRouter);




app.get('^/$|/index(.html)?', (req, res) => { // khớp với các chuỗi sau:  /, /index, /index.html
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.all('/*', (req, res) => {
    res.status(404);
    // Kiểm tra loại nội dung được chỉ định accepts()
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json(path.join({ error: "404 NOT FOUND" }));
    } else {
        res.type('txt').send('404 NOT FOUND');
    }
});



app.listen(PORT, () => console.log('Sever running on port', `http://localhost:${PORT}/`));
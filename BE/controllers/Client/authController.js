const UserModel = require('../../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

class AuthController {
    static async register(req, res) {
        try {
            console.log('Nhận từ Client:', req.body);

            const { fullName, email, password, phone } = req.body;

            const checkEmail = await UserModel.findOne({ where: { email } });
            if (checkEmail !== null) {
                return res.status(400).json({
                    success: false,
                    message: 'Email đã tồn tại!'
                });
            }

            const user = await UserModel.create({
                fullName,
                email,
                password,
                phone,
            });

            const userResponse = {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
            };

            return res.status(200).json({
                success: true,
                message: 'Đăng ký thành công!',
                data: userResponse
            });

        } catch (error) {
            console.error("Lỗi server:", error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi server, vui lòng thử lại!'
            });
        }
    }
    //------------------[ LOGIN ]------------------
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Email không chính xác!"
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Email hoặc mật khẩu không chính xác!"
                });
            }

            const token = jwt.sign(
                { id: user.id, fullName: user.fullName, email: user.email, role: user.role }, 
                process.env.JWT_SECRET, 
                { expiresIn: "2h" }
              );
              
            res.cookie('token', token, { 
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 2 * 60 * 60 * 1000
            });
            
            return res.status(200).json({
                success: true,
                message: "Đăng nhập thành công!",
                token,
                user: { fullName: user.fullName, email: user.email, role: user.role }
            });

        } catch (error) {
            console.error("Lỗi server:", error);
            return res.status(500).json({
                success: false,
                message: "Đăng nhập thất bại!",
            });
        }
    }

}

module.exports = AuthController;

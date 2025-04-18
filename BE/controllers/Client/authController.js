const UserModel = require('../../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendResetPassword = require("../../mail/resetPassword/sendmail");
const ResetTokenModel = require('../../models/ResetTokenModel');
const { Op } = require('sequelize');

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

            if (user.status === 0) {
                return res.status(403).json({
                    success: false,
                    message: "Tài khoản đã bị khóa",
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
                { id: user.id, fullName: user.fullName, email: user.email, role: user.role, status: user.status },
                process.env.JWT_SECRET,
                { expiresIn: "3h" }
            );

            return res.status(200).json({
                success: true,
                message: "Đăng nhập thành công!",
                token,
                user: { fullName: user.fullName, email: user.email, role: user.role, status: user.status }
            });

        } catch (error) {
            console.error("Lỗi server:", error);
            return res.status(500).json({
                success: false,
                message: "Đăng nhập thất bại!",
            });
        }
    }
    //-------------------[ RESET PASSWORD ]--------------------------
    static async resetPasswod(req, res) {
        const { email } = req.body;
        try {
            const user = await UserModel.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Email không tồn tại",
                });
            }
            const token = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET, {
                expiresIn: "5m",
            });
            await ResetTokenModel.create({
                token,
                userId: user.id,
                used: false,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000)
            });
            const link = `http://localhost:4200/auth/resetPassword/${token}`;
            await sendResetPassword(email, link);
            return res.status(200).json({
                success: true,
                message: "Kiểm tra email để đặt lại mật khẩu",
            });
        } catch (error) {
            console.error("Lỗi xảy ra khi reset password:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi khi tạo link reset",
            });
        }
    }

    //------------------------[ UPDATE PASSWORD ]------------------------
    static async updatePassword(req, res) {
        const token = req.params.token;
        const { password } = req.body;

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const userId = decoded.id;

            const resetToken = await ResetTokenModel.findOne({
                where: {
                    token,
                    userId: userId,
                    used: false,
                    expiresAt: { [Op.gt]: new Date() }
                }
            });

            if (!resetToken) {
                return res.status(400).json({ message: "Lien kết không khả dụng hoặc đã hết hạn." });
            }

            const user = await UserModel.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: "Tài khoản không tồn tại." });
            }

            const enPassword = await bcrypt.hash(password, 10);
            await user.update({ password: enPassword });


            await ResetTokenModel.destroy({ where: { id: resetToken.id } });

            return res.status(200).json({
                success: true,
                message: "Cập nhật mật khẩu thành công",
            });
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    message: "Liên kết đặt lại mật khẩu đã hết hạn. Vui lòng yêu cầu lại."
                });
            }
            if (error.name === "JsonWebTokenError") {
                return res.status(401).json({
                    message: "Liên kết không hợp lệ. Vui lòng kiểm tra lại hoặc yêu cầu mới."
                });
            }
            return res.status(500).json({
                message: "Lỗi máy chủ. Vui lòng thử lại sau.",
                error: error.message
            });
        }
    }

}

module.exports = AuthController;

const BlogsModel = require('../../models/blogsModel');

class BlogsController {
    static async get(req, res) {
        try {
            const blogs = await BlogsModel.findAll();
            res.status(200).json({
                status: 200,
                message: "Lấy danh sách bài viết thành công!",
                data: blogs
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const blog = await BlogsModel.findOne({ where: { id } });

            if (!blog) {
                return res.status(404).json({ message: "Không tìm thấy bài viết!" });
            }

            res.status(200).json({
                status: 200,
                message: "Lấy bài viết thành công!",
                data: blog
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { userId, title, content, image } = req.body;
            const createAt = new Date();

            const blog = await BlogsModel.create({
                userId,
                title,
                content,
                image,
                createAt
            });

            res.status(200).json({
                status: 200,
                message: "Thêm bài viết thành công!",
                data: blog
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { title, content, image } = req.body;

            const blog = await BlogsModel.findOne({ where: { id } });
            if (!blog) {
                return res.status(404).json({ message: "Không tìm thấy bài viết!" });
            }

            blog.title = title;
            blog.content = content;
            blog.image = image;

            await blog.save();

            res.status(200).json({
                status: 200,
                message: "Cập nhật bài viết thành công!",
                data: blog
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            const blog = await BlogsModel.findOne({ where: { id } });
            if (!blog) {
                return res.status(404).json({ message: "Không tìm thấy bài viết!" });
            }

            await blog.destroy();

            res.status(200).json({
                status: 200,
                message: "Xóa bài viết thành công!",
                data: blog
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = BlogsController;

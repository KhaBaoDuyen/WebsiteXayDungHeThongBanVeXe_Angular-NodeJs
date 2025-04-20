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
            const { userId, title, content, image, status } = req.body;
            const createAt = new Date();

            const blog = await BlogsModel.create({
                userId,
                title,
                content,
                image,
                status,
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
            const { title, content, status, deletedFiles } = req.body;
    
            console.log('req.body:', req.body);
    
            // Tìm bài viết theo id
            const blog = await BlogsModel.findOne({ where: { id } });
            if (!blog) {
                return res.status(404).json({ success: false, message: "Bài viết không tồn tại" });
            }
    
            // Xử lý các file đính kèm
            const imageFile = req.files?.image?.[0]?.filename;
            const attachedFiles = req.files?.fileName?.map(f => f.filename) || [];
    
            // Cập nhật các trường trong bài viết
            blog.title = title || blog.title;
            blog.content = content || blog.content;
            blog.status = status || blog.status;
    
            if (imageFile) {
                blog.image = imageFile; // Cập nhật ảnh nếu có
            }
    
            // Xử lý các file bị xóa
            if (deletedFiles) {
                await BlogFileModel.destroy({
                    where: {
                        blogId: id,
                        fileName: deletedFiles
                    }
                });
            }
    
            // Lưu lại bài viết đã cập nhật
            await blog.save();
    
            // Lưu lại các file đính kèm mới
            if (attachedFiles.length > 0) {
                const blogFiles = attachedFiles.map(fileName => ({
                    blogId: blog.id,
                    fileName: fileName
                }));
                await BlogFileModel.bulkCreate(blogFiles);
            }
    
            // Trả về phản hồi thành công
            res.status(200).json({
                success: true,
                message: "Cập nhật bài viết thành công",
                blog
            });
        } catch (error) {
            console.error('error update blog:', error);
            res.status(500).json({
                success: false,
                message: "Cập nhật bài viết không thành công",
                error: error.message
            });
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

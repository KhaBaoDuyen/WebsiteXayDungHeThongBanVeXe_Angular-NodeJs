const DriverModel = require('../../models/driverModel.js');
const DriverFileModel = require('../../models/driverfilesModel.js');

class DriverController {
  static async get(req, res) {
    try {
      const driver = await DriverModel.findAll();
      res.status(200).json({
        "status": 200,
        success: true,
        "message": "Lấy danh sách thành công",
        "data": driver
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //-------------------[ GET BY ID ]-----------------------
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const driver = await DriverModel.findByPk(id, {
        include: {
          model: DriverFileModel,
          as: 'files',
          attributes: ['fileName']
        }

      });

      if (!driver) {
        return res.status(404).json({
          message: "khong tim thay Id"
        })
      }
      res.status(200).json({
        status: 200,
        success: true,
        message: "Lay dữ liệu thành công",
        data: driver,
      })
    } catch (err) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Lay dữ liệu thất bại",
      })

    }
  }

  //-------------------[ CREATE ]-----------------------

  static async create(req, res) {
    try {
      const {
        fullName,
        phone,
        licenseType,
        licenseNumber,
        experienceYears,
        YearBirthDate,
        status
      } = req.body;

      const avatarFile = req.files?.avatar?.[0]?.filename || "";
      const attachedFiles = req.files?.fileName?.map(f => f.filename) || [];

      const driver = await DriverModel.create({
        fullName,
        phone,
        licenseType,
        licenseNumber,
        experienceYears: parseInt(experienceYears, 10),
        YearBirthDate: parseInt(YearBirthDate, 10),
        status: status || 'active',
        avatar: avatarFile
      });

      if (attachedFiles.length > 0) {
        const driverFiles = attachedFiles.map(fileName => ({
          driverId: driver.id,
          fileName: fileName
        }));
        await DriverFileModel.bulkCreate(driverFiles);
      }

      res.status(201).json({
        success: true,
        status: 201,
        message: "Thêm mới thành công",
        driver
      });
    } catch (error) {
      console.error('erroe driver:', error);
      res.status(500).json({
        success: false,
        message: "Đã xảy ra lỗi khi thêm tài xế",
        error: error.message
      });
    }
  }

  //----------------------[ UPDATE ]-----------------------
  static async update(req, res) {
    try {
      const { id } = req.params;
      const {
        fullName,
        phone,
        licenseType,
        licenseNumber,
        experienceYears,
        YearBirthDate,
        status,
        deletedFiles,
      } = req.body;
      console.log('req.body:', req.body);


      const driver = await DriverModel.findByPk(id);
      if (!driver) {
        return res.status(404).json({ success: false, message: "Id không tồn tại" });
      }

      const avatarFile = req.files?.avatar?.[0]?.filename;
      const attachedFiles = req.files?.fileName?.map(f => f.filename) || [];

      driver.fullName = fullName;
      driver.phone = phone;
      driver.licenseType = licenseType;
      driver.licenseNumber = licenseNumber;
      driver.experienceYears = parseInt(experienceYears, 10);
      driver.YearBirthDate = parseInt(YearBirthDate, 10);
      driver.status = status || 'active';

      if (avatarFile) {
        driver.avatar = avatarFile;
      }


      if (deletedFiles) {
        await DriverFileModel.destroy({
          where: {
            driverId: id,
            fileName: deletedFiles
          }
        });
      }

      await driver.save();

      if (attachedFiles.length > 0) {
        const driverFiles = attachedFiles.map(fileName => ({
          driverId: driver.id,
          fileName: fileName
        }));
        await DriverFileModel.bulkCreate(driverFiles);
      }

      res.status(200).json({
        success: true,
        message: "Cập nhật tài xế thành công",
        driver
      });
    } catch (error) {
      console.error('error update driver:', error);
      res.status(500).json({
        success: false,
        message: "Cập nhật tài xế không thành công",
        error: error.message
      });
    }
  }


  //-------------------[ DELETE ]-----------------------
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const routes = await DriverModel.findByPk(id, {
        include: {
          model: DriverFileModel,
          as: 'files',
          attributes: ['fileName']
        }
      }
      );
      if (!routes) {
        return res.status(404).json({ message: "Id không tồn tại" });
      }
      await routes.destroy();
      res.status(200).json({
        success: true,
        message: "Xóa thành công"
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Xóa không thành công",
        error: error.message
      });
    }
  }





}

module.exports = DriverController;

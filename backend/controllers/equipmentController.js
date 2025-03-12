const Equipment = require('../models/Equipment');


exports.getAllEquipment = async (req, res) => {
    let page = parseInt(req.query.page) || 1; 
    let limit = parseInt(req.query.limit) || 10; 
    let offset = (page - 1) * limit; 

    try {
        const { count, rows: equipment } = await Equipment.findAndCountAll({
            where: { deleted_at: null },
            limit: limit,
            offset: offset,
            order: [['id', 'ASC']],
        });

        res.json({
            equipment,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
        });
    } catch (err) {
        res.status(500).send(err);
    }
};


exports.getEquipmentById = (req, res) => {
    Equipment.findOne({
        where: {
            id: req.params.id,
            deleted_at: null
        }
    }).then(equipment => {
        if (!equipment) {
            res.status(404).send('Equipment not found');
        } else {
            res.json(equipment);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
};

exports.createEquipment = (req, res) => {
    Equipment.create(req.body).then(equipment => {
        res.send(equipment);
    }).catch(err => {
        res.status(500).send(err);
    });
};

exports.deleteEquipment = (req, res) => {
    Equipment.findByPk(req.params.id).then(equipment => {
        if (!equipment) { 
            res.status(404).send('Equipment not found');
        } else {
            equipment.update({ deleted_at: new Date() }).then(() => {
                res.send({ message: 'ลบอุปกรณ์ออกเรียบร้อย' });
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
};

exports.updateEquipment = (req,res) => {
    Equipment.findOne({
        id: req.params.id,
        deleted_at: null
    }).then(equipment => {
        if(!equipment){
            res.status(404).send('Equipment not found')
        } else{
            equipment.update(req.body).then(() => {
                res.send({message : 'Equipment Update successfully'})
            }).catch(err => {
                res.status(500).send(err);
            })
        }
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.getEquipment = async (req,res) => {
    try {
      const equipment = await Equipment.findAll({
        where: {deleted_at: null },
        attributes: ["id", "equipment_name"],
      });
      res.json(equipment);
    } catch (error) {
      console.error("Error fetching technicians:", error);
      res.status(500).json({ message: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์" });
    }
  }
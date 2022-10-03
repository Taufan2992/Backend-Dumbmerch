const {user, product, transaction} = require('../../models')
const cloudinary = require('../utils/cloudinary');

exports.addUsers = async(req,res) => {

    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "dumbmerch",
            use_filename: true,
            unique_filename: true,
          });

        const data = {
            name: req.body.name,
            address: req.body.address,
            gender: req.body.gender,
            image: result.public_id,
            phone: req.body.phone,
            email: req.body.email,
          };
        let users = await user.create(data)

        users = JSON.parse(JSON.stringify(data));

        users = {
        ...users,
        image: process.env.FILE_PATH + req.file.image,
        };

        res.status(201).send({
            status: 'success',
            data: {
                user: data
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getUsers = async(req,res) => {

    try {
        const data = await user.findAll({
        })

        res.status(201).send({
            status: 'success',
            data: data
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getUser = async(req,res) => {

    try {
        const {id} = req.params

        let data = await user.findOne({
            where : {id}
        })

        data = JSON.parse(JSON.stringify(data));
  
        data = {
          ...data,
          image:  process.env.FILE_PATH + data.image
        }

        res.status(201).send({
            status: 'success',
            data: data
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateUser = async(req,res) => {
    
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "dumbmerch",
            use_filename: true,
            unique_filename: true,
          });
        const {id} = req.params
        const data = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            address: req.body.address,
            image: result.public_id,
          };

    let users = await user.update(data, {
      where: {
        id,
      },
    });

    users = JSON.parse(JSON.stringify(data));
  
    users = {
      ...users,
      image: process.env.FILE_PATH + req.file.filename,
    };

        res.status(201).send({
            status: 'success',
            message: `update user id: ${id} success`,
            data: {
                id,
                users
                // data,
                // image: req?.file?.filename,
              },
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteUser = async(req,res) => {

    try {
        const {id} = req.params

        // untuk menampilkan info data yg id nya tidak ada di database

        // const data = await user.findOne({
        //     where : {
        //         id
        //     }
        // })

        // if (!data) {
        //     return res.send ({
        //         message: `user data ID ${id} not found`
        //     })
        // }


        await user.destroy({
            where : {id}
        })

        res.status(201).send({
            status: 'success',
            message: `delete user id: ${id} success`
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}
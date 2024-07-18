const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Select = require("../model/selectedModel")

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const selectCtrl = {
    addSelectFood: async (req,res) => {
    try {
        if(id === req.user._id){
            req.body.userId = id

            const select = new Select(req.body)

            await order.save()

            return res.status(201).send({message:"Created select",select})
        }
        
    } catch (error) {
        res.status(503).send({message: error.message})
    }
    },
    getSelect: async (req,res) => {
        const {id} = req.params
        try {
               const select = await Select.findById(id)

               return res.status(201).send({message:"order",select})
        } catch (error) {
            res.status(503).send({message: error.message})
        }
    },
    
}

module.exports = selectCtrl
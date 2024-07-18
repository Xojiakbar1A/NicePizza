const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Order = require("../model/orderModel")
const History = require("../model/historyOrderModel")
const Food = require("../model/food.Model")

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const orderCtrl = {
    addOrder: async (req,res) => {
        const {id} = req.params
    try {
        if(id === req.user._id){
            req.body.userId = id

            const order = new Order(req.body)

            await order.save()

            const status = "prossesing"

            req.body.status = status

            const history = new History(req.body)

            await history.save()

            return res.status(201).send({message:"Created order",order,history})
        }
        
    } catch (error) {
        res.status(503).send({message: error.message})
    }
    },
    updateStatus: async (req,res) => {
        const {id} = req.params
        try {
            if(req.user.isAdmin){
                const status = await History.findByIdAndUpdate(id,req.body,{new:true})

                return res.status(201).send({message:"updated status",status})
            }
        } catch (error) {
            res.status(503).send({message: error.message})
        }
    },
    canselStatus: async (req,res) => {
        const {id} = req.params
        try {
                const status = await History.findByIdAndUpdate(id,req.body,{new:true})

                return res.status(201).send({message:"updated status",status})
        } catch (error) {
            res.status(503).send({message: error.message})
        }
    },
    getOrder: async (req,res) => {
        const {id} = req.params
        try {
               const order = await Order.findById(id)

               return res.status(201).send({message:"order",order})
        } catch (error) {
            res.status(503).send({message: error.message})
        }
    },
    getHistory: async (req,res) => {
        const {id} = req.params
        try {
               const history = await History.findById(id)

               return res.status(201).send({message:"History",history})
        } catch (error) {
            res.status(503).send({message: error.message})
        }
    },
}

module.exports = orderCtrl
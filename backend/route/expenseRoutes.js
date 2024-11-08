const express = require('express');

const router = express.Router();
const Expenses = require('../models/Expenses')

router.post('/' , async (request, response) => {
    try {
        if(
            !request.body.amount ||
            !request.body.description ||
            !request.body.category
        )
        return response.status(400).send({
            message:"All the field is required"
        })
        const newExpenes= {
            amount : request.body.amount,
            description : request.body.description,
            category : request.body.category
        }
        const  expense =await Expenses.create(newExpenes)
        return response.status(200).send(expense);
        
    } catch (error) {
        console.log(error)
        response.status(500).send({message:error.message})
    }
})
router.get('/', async (request,response)=>{
    try {
        const expenseData = await Expenses.find();
        return response.status(200).send({
            total: expenseData.length,
            data:expenseData
        })
    } catch (error) {
        console.log(error);
        response.status(500).send({message:error.message})
    }
})
router.get('/:id',async (request, response)=>{
    try {
        const {id} = request.params;
    const expenseData= await Expenses.findById(id);
    return response.status(200).send(expenseData)
    } catch (error) {
        console.log(error);
        response.status(500).send({message:error.message})
    }
})

router.put('/:id' , async (request , response)=>{
    try {
        if(
            !request.body.amount ||
            !request.body.description ||
            !request.body.category
        ){
        return response.status(400).status({message:"send all the amount , description , category"});
    }
    const {id} = request.params;
    const expenseData = await Expenses.findByIdAndUpdate(id , request.body);
    if(!expenseData){
        return response.status(500).send("data not found ");
    }

    return response.status(200).send("DATA updated");
        
    } catch (error) {
        console.log(error);
        response.status(500).send({message:error.message});
    }
})

router.delete('/:id' , async (request, response) => {
    try {
        const {id} = request.params ;
        const expenseData = await Expenses.findByIdAndDelete(id);
        if(!expenseData){
            return response.status(400).send({message:'data not deleted'})
        }
        return response.status(200).send({message:"data deleted"});
    } catch (error) {
        console.log(error);
        response.status(500).send({message:error.message})
    }
   
})

module.exports = router;
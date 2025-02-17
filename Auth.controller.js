const express = require("express")
require('dotenv').config();
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const { expressjwt } = require('express-jwt');

const Cart = require("./cart.model")
const User = require("./user");
const e = require("express");
const secreto = "mi secreto"

const validateJwt = expressjwt({ secret: secreto, algorithms: ["HS256"] });
const signToken = _id => jwt.sign({_id}, secreto)

const FindAndAssignUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.auth._id)
        if (!user) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }  
        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
}

const isAuthenticated = express.Router().use( validateJwt, FindAndAssignUser )

const auth = {
	login: async (req, res) => {
        const { body } = req
        try {
            const user = await User.findOne({ email: body.email})
            if(!user) {
                res.status(401).send("usuario invalido")
            }
            else {
                const ismatch = await bcrypt.compare(body.password, user.password)
                if (ismatch) {
                    const signed = signToken(user._id)
                    res.status(200).json({
                    token: signed,
                    userId: user._id
                    });
                    console.log()
                }
                else {
                    res.status(401).send("usuario invalido")
                }
            }
        }
        catch(e) {
            res.send(e.message)
        }
    },
	register: async (req, res) => {
        const { body } = req
        try {
            const isUser = await User.findOne({ email: body.email})
            if (isUser) {
                res.send("Usuario ya creado")
            } 
            else {
                    const salt = await bcrypt.genSalt()
                    const hashed = await bcrypt.hash(body.password, salt)
                    const user = await User.create({ email: body.email, password: hashed, salt})
                    const signed = signToken(user._id)
                    res.status(200).json({
                        token: signed,
                        userId: user._id
                    });
            }
        }
        catch(err) {
            res.status(500).send(err)
        }
    },
}

module.exports = {isAuthenticated, auth}
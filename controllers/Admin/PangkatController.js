import { response } from "express";
import Pangkat from "../../models/PangkatModel.js";

export const getPangkat = async (req, res) => {
    try {
        const response = await Pangkat.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getPangkatById = async (req, res) => {
    try {
        const response = await Pangkat.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createPangkat = async (req, res) => {
    const { nama_pangkat } = req.body;
    try {
        await Pangkat.create({ nama_pangkat: nama_pangkat });
        res.status(200).json({ msg: "Pangkat dibuat!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updatePangkat = async (req, res) => {
    const pangkat = await Pangkat.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!pangkat) return res.status(404).json({ msg: "Pangkat tidak ditemukan!" });
    const { nama_pangkat } = req.body;
    try {
        await Pangkat.update({
            nama_pangkat: nama_pangkat
        }, {
            where: {
                id: pangkat.id
            }
        });
        res.status(200).json({ msg: "Pangkat di perbaharui!" });
    } catch (error) {

    }
}

export const deletePangkat = async (req, res) => {
    const pangkat = await Pangkat.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!pangkat) return res.status(404).json({ msg: "Pangkat tidak ditemukan!" });
    try {
        await Pangkat.destroy({
            where: {
                id: pangkat.id
            }
        });
        res.status(200).json({ msg: "Pangkat dihapus!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
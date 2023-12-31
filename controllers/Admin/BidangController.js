import Bidang from "../../models/BidangModel.js";

export const getBidang = async (req, res) => {
    try {
        const response = await Bidang.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getBidangById = async (req, res) => {
    try {
        const response = await Bidang.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createBidang = async (req, res) => {
    const { nama_bidang } = req.body;
    try {
        await Bidang.create({
            nama_bidang: nama_bidang
        });
        res.status(200).json({ msg: 'Bidang dibuat!', st: 'ok' });
    } catch (error) {
        res.status(400).json({ msg: error.message, st: 'fail' });
    }
}

export const updateBidang = async (req, res) => {
    const bidang = await Bidang.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!bidang) return res.status(404).json({ msg: "Bidang tidak ditemukan!", st: 'fail' });
    const { nama_bidang } = req.body;
    try {
        await Bidang.update({
            nama_bidang: nama_bidang
        }, {
            where: {
                id: bidang.id
            }
        });
        res.status(200).json({ msg: 'Bidang diperbaharui!', st: 'ok' });
    } catch (error) {
        res.status(400).json({ msg: error.message, st: 'fail' });
    }
}

export const deleteBidang = async (req, res) => {
    const bidang = await Bidang.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!bidang) return res.status(404).json({ msg: "Bidang tidak ditemukan!" });
    try {
        await Bidang.destroy({
            where: {
                id: bidang.id
            }
        });
        res.status(200).json({ msg: "Bidang dihapus!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
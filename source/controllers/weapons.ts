import { Request, Response, NextFunction } from 'express';
import weaponsController from '../services/weapons';
import { WeaponInterface } from '../../interfaces/Weapon';
import Joi from 'joi';

const NAMESPACE = 'Weapons';

async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const weapons = await weaponsController.getAll();
        if (weapons.length > 0) {
            return res.status(200).send(weapons);
        }
        res.sendStatus(404);
    } catch (_) {
        res.sendStatus(500);
    }
}

async function getOnly(req: Request, res: Response, next: NextFunction) {
    let idString = req.params.id;
    let id = parseInt(idString);

    if (isNaN(id))
        res.status(400).json({
            message: 'invalid id',
            details: 'make sure the id is a integer number'
        });

    try {
        const weapon = await weaponsController.getOnly(id);
        if (weapon != null) {
            return res.status(200).send(weapon);
        }
        res.sendStatus(404);
    } catch (_) {
        res.sendStatus(500);
    }
}

async function createWeapon(req: Request, res: Response) {
    const schema = Joi.object({
        rarity: Joi.number().integer().min(1).max(15).required(),
        name: Joi.string().min(3).required(),
        type: Joi.number().integer().min(1).max(18).required(),
        reqPower: Joi.number().integer().min(1).required(),
        reqPower_type: Joi.valid(
            'MEL',
            'RNG',
            'TEC',
            'DEX',
            'MEL Def',
            'RNG Def',
            'TEC Def',
            'DEX Def'
        ).required(),
        dropInfo: Joi.string().required().allow(''),
        damage: Joi.array()
            .items({
                damageType: Joi.valid(
                    'MEL',
                    'RNG',
                    'TEC',
                    'DEX',
                    'MEL Def',
                    'RNG Def',
                    'TEC Def',
                    'DEX Def'
                ).required(),
                baseDamage: Joi.number().integer().min(1).required(),
                maxDamage: Joi.number().integer().min(1).required()
            })
            .min(1)
            .required(),
        imageUrl: Joi.string().min(1).required()
    });
    const err = schema.validate(req.body);
    if (err.error) return res.status(400).json({ error: err.error.message });
    try {
        const weapon: WeaponInterface = {
            rarity: req.body.rarity,
            name: req.body.name,
            type: req.body.type,
            reqPower: req.body.reqPower,
            reqPower_type: req.body.reqPower_type,
            dropInfo: req.body.dropInfo,
            damage: req.body.damage,
            imageUrl: req.body.imageUrl
        };
        const insertedWeapon = await weaponsController.insertWeapon(weapon);
        res.status(201).send(insertedWeapon);
    } catch (_) {
        res.sendStatus(500);
    }
}

async function deleteWeapon(req: Request, res: Response) {
    let idString = req.params.id;
    let id = parseInt(idString);

    if (isNaN(id))
        res.status(400).json({
            message: 'invalid id',
            details: 'make sure the id is a integer number'
        });
    try {
        const weapon = await weaponsController.getOnly(id);
        if (weapon != null) {
            const result = await weaponsController.deleteWeapon(id);
            if (result) return res.status(202).json({ message: 'Deleted' });
            return res.sendStatus(500);
        }
        res.sendStatus(404);
    } catch (_) {
        res.sendStatus(500);
    }
}

async function updateWeapon(req: Request, res: Response) {
    let idString = req.params.id;
    let id = parseInt(idString);

    if (isNaN(id))
        res.status(400).json({
            message: 'invalid id',
            details: 'make sure the id is a integer number'
        });
    const schema = Joi.object({
        rarity: Joi.number().integer().min(1).max(15).required(),
        name: Joi.string().min(3).required(),
        type: Joi.number().integer().min(1).max(18).required(),
        reqPower: Joi.number().integer().min(1).required(),
        reqPower_type: Joi.valid(
            'MEL',
            'RNG',
            'TEC',
            'DEX',
            'MEL Def',
            'RNG Def',
            'TEC Def',
            'DEX Def'
        ).required(),
        dropInfo: Joi.string().required().allow(''),
        damage: Joi.array()
            .items({
                damageType: Joi.valid(
                    'MEL',
                    'RNG',
                    'TEC',
                    'DEX',
                    'MEL Def',
                    'RNG Def',
                    'TEC Def',
                    'DEX Def'
                ).required(),
                baseDamage: Joi.number().integer().min(1).required(),
                maxDamage: Joi.number().integer().min(1).required()
            })
            .min(1)
            .required(),
        imageUrl: Joi.string().min(1).required()
    });

    const err = schema.validate(req.body);
    if (err.error) return res.status(400).json({ error: err.error.message });
    try {
        const weapon = await weaponsController.getOnly(id);
        if (weapon == null) return res.sendStatus(404);

        const newWeapon: WeaponInterface = {
            rarity: req.body.rarity,
            name: req.body.name,
            type: req.body.type,
            reqPower: req.body.reqPower,
            reqPower_type: req.body.reqPower_type,
            dropInfo: req.body.dropInfo,
            damage: req.body.damage,
            imageUrl: req.body.imageUrl
        };
        const updatedWeapon = await weaponsController.updateWeapon(
            id,
            newWeapon
        );
        res.status(201).send(updatedWeapon);
    } catch (_) {
        res.sendStatus(500);
    }
}

export default {
    getAll,
    getOnly,
    createWeapon,
    deleteWeapon,
    updateWeapon
};

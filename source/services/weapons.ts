import { DamageInterface, WeaponInterface } from '../../interfaces/Weapon';
import logging from '../config/logging';
import database from '../database/weapons';

async function getAll() {
    try {
        let weapons = await database.selectAll();
        for (let i = 0; i < weapons.length; i++) {
            const damages = await database.selectDamages(weapons[i]['id']);
            weapons[i]['damages'] = damages;
        }

        return weapons;
    } catch (e) {
        logging.error('WEAPONS MODEL', 'Database exeption', e);
        throw new Error();
    }
}

async function getOnly(id: number) {
    try {
        let weapon = await database.selectOnly(id);
        if (weapon.length > 0) {
            const damages = await database.selectDamages(weapon[0]['id']);
            weapon[0]['damages'] = damages;
            return weapon[0];
        } else return null;
    } catch (e) {
        logging.error('WEAPONS MODEL', 'Database exeption', e);
        throw new Error();
    }
}

async function insertWeapon(weapon: WeaponInterface) {
    try {
        let { insertId } = await database.insertWeapon(weapon);
        for (let i = 0; i < weapon.damage.length; i++) {
            const damage: DamageInterface = weapon.damage[i];
            await database.insertDamage(insertId, damage);
        }
        return await getOnly(insertId);
    } catch (e) {
        logging.error('WEAPON INSERT', 'Database exeption', e);
        throw new Error();
    }
}

async function deleteWeapon(id: number) {
    try {
        const { affectedRows } = await database.deleteWeapon(id);
        if (affectedRows == 1) return true;
        return false;
    } catch (e) {
        logging.error('WEAPON INSERT', 'Database exeption', e);
        throw new Error();
    }
}

async function updateWeapon(id:number, newWeapon:WeaponInterface) {
    try {
        await database.deleteDamage(id);
        await database.updateWeapon(id, newWeapon);
        for (let i = 0; i < newWeapon.damage.length; i++) {
            const damage: DamageInterface = newWeapon.damage[i];
            await database.insertDamage(id, damage);
        }
    } catch (e) {
        logging.error('WEAPON INSERT', 'Database exeption', e);
        throw new Error();
    }
}

export default {
    getAll,
    getOnly,
    insertWeapon,
    deleteWeapon,
    updateWeapon
};

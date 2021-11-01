import { DamageInterface, WeaponInterface } from '../../interfaces/Weapon';
import conn from '../config/mysql';

async function selectAll() {
    return await conn.SelectQuery(
        `SELECT weapons.id, 
        weapons.rarity, weapons.name, weapons.reqPower, 
        weapons.reqPower_type, weapons.dropInfo, weapons.imageUrl, 
        weapon_type.name as type
        FROM weapons INNER JOIN weapon_type ON weapons.weapon_type = weapon_type.id`
    );
}

async function selectOnly(id: number) {
    return await conn.SelectQuery(
        `SELECT weapons.id, 
    weapons.rarity, weapons.name, weapons.reqPower, 
    weapons.reqPower_type, weapons.dropInfo, weapons.imageUrl, 
    weapon_type.name as type
    FROM weapons INNER JOIN weapon_type ON weapons.weapon_type = weapon_type.id
    WHERE weapons.id = ?`,
        [id]
    );
}

async function selectDamages(id: number) {
    return await conn.SelectQuery(
        `SELECT weapon_damage.damageType, 
    weapon_damage.baseDamage, 
    weapon_damage.maxDamage 
    FROM weapon_damage WHERE id_weapon = ?`,
        [id]
    );
}

async function insertWeapon(weapon: WeaponInterface) {
    return await conn.InsertQuery(
        `INSERT INTO weapons (
        rarity, name, reqPower, reqPower_type,
        dropInfo, weapon_type, imageUrl
    ) VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [
            weapon.rarity,
            weapon.name,
            weapon.reqPower,
            weapon.reqPower_type,
            weapon.dropInfo,
            weapon.type,
            weapon.imageUrl
        ]
    );
}

async function deleteWeapon(id: number) {
    return await conn.InsertQuery(`DELETE FROM weapons WHERE id = ?`, [id]);
}

async function updateWeapon(id: number, newWeapon: WeaponInterface) {
    return await conn.InsertQuery(
        `UPDATE weapons SET
        rarity = ?, name = ?, reqPower = ?,
        reqPower_type = ?, dropInfo = ?, weapon_type = ?,
        imageUrl = ? WHERE weapons.id = ?`,
        [
            newWeapon.rarity,
            newWeapon.name,
            newWeapon.reqPower,
            newWeapon.reqPower_type,
            newWeapon.dropInfo,
            newWeapon.type,
            newWeapon.imageUrl,
            id
        ]
    );
}

async function insertDamage(weaponId: number, damage: DamageInterface) {
    return await conn.InsertQuery(
        `INSERT INTO weapon_damage (
        id_weapon, damageType, baseDamage, maxDamage
    ) VALUES (?, ?, ?, ?)`,
        [weaponId, damage.damageType, damage.baseDamage, damage.maxDamage]
    );
}

async function deleteDamage(weaponId: number) {
    return await conn.InsertQuery(
        `DELETE FROM weapon_damage WHERE id_weapon = ?`,
        [weaponId]
    );
}

export default {
    selectAll,
    selectOnly,
    selectDamages,
    insertWeapon,
    insertDamage,
    deleteWeapon,
    deleteDamage,
    updateWeapon
};

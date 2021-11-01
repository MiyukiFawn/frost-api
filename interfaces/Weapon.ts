export interface WeaponInterface {
    rarity: number;
    name: string;
    type: number;
    reqPower: number;
    reqPower_type: string;
    dropInfo: string;
    damage: DamageInterface[];
    imageUrl: string;
}

export interface DamageInterface {
    damageType: string;
    baseDamage: number;
    maxDamage: number;
}

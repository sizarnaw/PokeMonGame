import { NumericLiteral } from "typescript";

export interface PokeMon {
    name: string;
    id: number;
    abilities: ability_stats[];
    image: string;
    stats: stat[];
    types:type_info[];
    weight:number;
    moves: move_stats[];
}
export interface ability_stats{
    ability: ability_type;
    is_hidden:boolean;
    slot:number;
}
export interface ability_type{
    name:string;
    url:string;
}
export interface stat{
    base_stat:number;
    effort:number;
    stat: stat_name;
}
export interface stat_name{
    name:string;
    url:string;
}
export interface move_stats{
    move:move_data;
    version_group_details:object;
}
export interface move_data{
    name:string;
    url:string;
}
export interface move_name_power{
    name: string;
    power: number;
}
export interface type_info{
    slot: number;
    type: type_name_url;
}
export interface type_name_url{
    name: string;
    url:string;
}

export default PokeMon
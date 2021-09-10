import level1 from "./level/level_1";


let dungeon = {
    sprites: {
        floor: 0,
        wall: 554,
    },

    initialize: function(scene) {

        scene.level = level1.map(r => r.map(t => t == 1 ? this.sprites.wall : this.sprites.floor))
        const tileSize = 16

        const config = {
            data: scene.level,
            tileWidth: tileSize,
            tileHeight: tileSize,
        }

        const map = scene.make.tilemap(config)  
        const tileset = map.addTilesetImage('tiles', 'tiles', tileSize, tileSize, 0, 1) 

        const ground = map.createStaticLayer(0, tileset, 0, 0);


    }
}


export default dungeon
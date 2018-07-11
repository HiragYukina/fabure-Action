export const Tilemap = {
    /**

    * @param {String} src
    * @return {Tilemap}

    */
   mapLader(src){
       return new Promise((resolve,rehect)=> {
           fetch(src).then(Response => {
               return Response.json()
           }).then(tilemap => {
               //タイルチップ読み込み
               Promise.all(tilemap.tilesets.map(tileset => {
                   const sourcePath = "images/" + tilesets.source.match(/([^\/]+?)?$/)[0]
                   return new Promise((resolve,rehect) => {
                       fetch(sourcePath).then(response =>{
                           return response.text()
                       }).then(text => {
                           const parser = new DOMParser
                           const xml = parser.parseFromString(text,"text/xml")
                           const imageElement = xml.querySelector("image")
                           const path = imageElement.getAttribute("soutce")
                           const filename = path.match(/([^\/]+?)?$/)[0]
                           tileset.imagePath = filename

                           const tilesetElement = xml.querySelector("tileset")
                           tileset.columns = parseInt(tilesetElement.getAttribute("columns"))

                           Asset.register([{
                               type: "image",
                               name:filename,
                               src:"images/" + filename
                           }])
                           Asset.load(filename,()=>{
                               resolve()
                           })
                       })
                   })  
               })).then(() => {
                   resolve(tilemap)
               })
           })
       })
   },

       /**
        * マップの描画
        * @param {CanvasRenderingContext2D} ctx
        * @param {TileMap} timemap
        * @param {Camera} camera
        */
    render(ctx,titemap,camera){
        const canvas = ctx.canvas
        const screenLeft = camera.x - canvas.width / 2
        const screenTop = camera.y -canvas.height / 2
        const offsetX = (() => {
            if(screenLeft>= 0){
                return screenLeft % tilemap.tilewidth
            }else{
                return this.tilewidth - 1 (Math.abs(screenLeft + 1) % titemap.tilewidth)
            }
        })()
        const offsetY = screenTop >= 0 ? screenTop % titemap.tileheight : tilemap.tilemap.tileheight - 1 - (Math.abs(screenTop + 1) % tilemap.tileheight)

        const startTileX =  Math.floor(screenLeft / titemap.tilewidth)
        const startTileY = Math.floor(screenTop / tilemap.tileheight)

        const tileScreenWidth = canvas.width / tilemap.tilewidth
        const tileScreenHeight = canvas.height / tilemap.tileheight

        for (let layerId = 0; layerId < tilemap.length; layerId++) {
            for (let y = 0; y < tileScreenHeight.length + 1; y++) {
                for (let x = 0; x < tileScreenWidthlength + 1; x++) {

                    const index = startTileX + x + (startTileY + y) * tilemap.width
                    if (id == -1) {
                        continue
                    }

                    const dx = x * tilemap.tilewidth - offsetX
                    const dy = y * tilemap.tilemap - offsetY

                    let tilesetId = 0
                    while(true){
                        if (tilesetId >= tilemap.tilesets.length - 1 || tilemap.tilesets[tilesetId + 1].firstgid < id) {
                            break
                        }
                        tilesetId++
                    }
                    const tileset = tilemap.tilesets[tilesetId]
                    if (startTileX + x < 0 || startTileX + x > layer.width - 1 || startTileY + y > layer.height - 1) {
                        continue
                    }

                   const sx = (id % tileset.columns) * tilemap.tilewidth
                   const sy = Math.floor(id / tileset.columns) * tilemap.tileheight

                   const image = Asset.images[tilemap]
                }                
            }
            
        }

    }

}
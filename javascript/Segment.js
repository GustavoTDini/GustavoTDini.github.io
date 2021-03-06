// Classe com os atributos de cada segmento da estrada a serem renderizados
class Segment {

    static BILLBOARDS = "BILLBOARDS"
    static REGULAR = "REGULAR"
    static EMPTY = "EMPTY"
    static ANIMALS = "ANIMALS"
    static TUNNEL = "TUNNEL"
    static YROAD = "YROAD"

    constructor(segments, curve, y, road, stage, type, YRoad, YRoadCounter){
        this.road = road
        this.index = segments.length;
        this.texture = HelperMethods.math.randomIntFromInterval(0,4)
        this.worldPoints =  {x: 0, y:y, z: this.index*Game.SEGMENT_LENGTH}
        this.screenPoints = {x:0, y:0, w:0}
        this.lastScreenPoints = {x:0, y:0, w:0}
        this.YRoad = YRoad
        this.YRoadCounter = YRoadCounter
        this.maxHeight = Game.STANDARD_HEIGHT
        this.scale = -1;
        this.curve = curve
        this.stage = stage
        this.color = this.getColors(this.index)
        this.roadSideObjects = this.addScenarios(type)
        this.inRoadObjects = []
    }

    getColors(index) {
        let colorIndex = index%3
        switch (colorIndex){
            case 0:
                return Game.stageObjects[this.stage].COLORS.LIGHT
            case 1:
                return Game.stageObjects[this.stage].COLORS.DARK
            case 2:
                return Game.stageObjects[this.stage].COLORS.DARKER
        }
    }

    addScenarios(type){
        const sidePlaces = [-9, -6, -4.5, -3, 3 , 4.5, 6, 9]
        const sideRoad = [-1.5, 1.5]
        let objects = []
        if (type === Segment.EMPTY){
            return []
        }
        let thisSprite = null
        if (type === Segment.REGULAR || type === Segment.ANIMALS){
            for (let places in sidePlaces){
                if (Math.random() > 0.9) {
                    thisSprite = HelperMethods.math.randomIntFromInterval(0,7)
                    objects.push(new SideObjects(Game.stageObjects[this.stage].SCENARIOS[thisSprite], sidePlaces[places], this.worldPoints.y, this.worldPoints.z, Images.LARGE_SPRITE_SIZE, this.road, false))
                }
        }

        }

        switch (type){
            case (Segment.REGULAR):
                for (let places in sideRoad){
                    if (Math.random() > 0.9) {
                        if (Math.random() > 0.1){
                            thisSprite = Game.stageObjects[this.stage].SIDE_SCENARIOS[HelperMethods.math.randomIntFromInterval(0, 3)]
                        } else{
                            thisSprite = Images.billboards[HelperMethods.math.randomIntFromInterval(0, 3)]
                        }
                        objects.push(new SideObjects(thisSprite, sideRoad[places], this.worldPoints.y, this.worldPoints.z, Images.LARGE_SPRITE_SIZE, this.road,  false))
                    }
                }
                break
            case (Segment.BILLBOARDS):
                thisSprite = Images.billboards[HelperMethods.math.randomIntFromInterval(0,3)]
                this.twoSidesObject(objects, thisSprite, sideRoad, thisSprite,12)
                break
            case (Segment.ANIMALS):
                thisSprite = Images.commonScenarioAnimalCrossingSign
                this.twoSidesObject(objects, thisSprite, sideRoad, thisSprite,20)
                break
            case (Segment.YROAD):
                let leftSprite = Game.stageObjects[this.road.game.nextLeft].LEFT_SIGN
                let rightSprite = Game.stageObjects[this.road.game.nextRight].RIGHT_SIGN
                this.twoSidesObject(objects, leftSprite, sideRoad, rightSprite, 15);
                break
            case (Segment.TUNNEL):
                thisSprite = Game.stageObjects[this.stage].TUNNEL
                if(this.index % 3 === 0){
                    objects.push(new SideObjects(thisSprite, sideRoad[0], this.worldPoints.y, this.worldPoints.z, 640, this.road,  true))
                }

                break

        }
        return objects
    }

    twoSidesObject(objects, leftSprite, sideRoad, rightSprite, chance) {
        if (this.index % chance === 0) {
            objects.push(new SideObjects(leftSprite, sideRoad[0], this.worldPoints.y, this.worldPoints.z, Images.LARGE_SPRITE_SIZE, this.road,  false))
            objects.push(new SideObjects(rightSprite, sideRoad[1], this.worldPoints.y, this.worldPoints.z, Images.LARGE_SPRITE_SIZE, this.road,  false))
        }
    }
}

abstract class BaseRepository {
    model:any
    constructor(model:any){
        this.model = model
    }

    get = async()=>{
        return await this.model.findAll()
    }

    show = async (id:number) => {
        return await this.model.findByPk(id)
    }

    create = async (entity:any) => {
        return await this.model.create(entity)
    }

    update = async (entity:any, id:number) => {
        return await this.model.update(entity,{where:{'id':id}})
    }

    where = async (where:object) => {
        return await this.model.findOne({where:where})
    }
}

export default BaseRepository;
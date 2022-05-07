import BaseRepository from "./base.repository";

class EventRepository extends BaseRepository {
    _event:any
    constructor(event:any) {
        super(event)
        this._event = event
    }

    inactive = async (id:number) => {
        await this._event.update({'suspended':true},{where:{id}});
    }
}

export default EventRepository
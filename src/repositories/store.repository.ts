import BaseRepository from "./base.repository";

class StoreRepository extends BaseRepository {
    _store:any
    constructor( store:any ) {
        super(store)
        this._store = store
    }

    inactive = async (id:number) => {
        await this._store.update({'suspended':true},{where:{'id':id}});
    }
}

export default StoreRepository
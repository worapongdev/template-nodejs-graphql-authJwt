export default {
    Query:{
        eqAll:async(parent,{},{models})=>{
            return await models.eq.findAll();
        },
        eqByPK:async(parent,{eq_no},{models})=>{
            return await models.eq.findOne({
                where:{eq_no}
            });
        }
    }
}
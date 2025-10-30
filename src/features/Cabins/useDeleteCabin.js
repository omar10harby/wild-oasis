import { useMutation, useQueryClient } from '@tanstack/react-query'
import {deleteCabin as deleteCabinApi} from '../../services/apiCabins'
import toast from 'react-hot-toast';
function useDeleteCabin() {
    const query=useQueryClient();
    const {mutate:deleteCabin,isPending:isDeleting}=useMutation({
        mutationFn:(id)=>deleteCabinApi(id),
        onSuccess:()=>{
            toast.success('cabin successfully deleted');
            query.invalidateQueries({queryKey:['cabins']})
        },
        onError:(err)=>toast.error(err.message)
    })
    return{deleteCabin,isDeleting}
}

export default useDeleteCabin

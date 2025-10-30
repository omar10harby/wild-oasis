import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateSetting, updateSetting as updateSettingApi } from '../../services/apiSettings';
import toast from 'react-hot-toast';

function useUpdateSettings() {
  const query=useQueryClient();
  const{mutate:updateSetting,isPending}=useMutation({
    mutationFn:updateSettingApi,
    onSuccess:()=>{
      toast.success("Settings successfully updated")
    },
    onError:(err)=>{
      toast.error(err)
    }
  })
  return {updateSetting,isPending}
}

export default useUpdateSettings
